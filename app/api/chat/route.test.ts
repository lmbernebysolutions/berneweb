import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

const BASE = "http://localhost:3000/api/chat";

function postRequest(body: unknown, searchParams?: string): NextRequest {
  const url = searchParams ? `${BASE}?${searchParams}` : BASE;
  return new NextRequest(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/chat", () => {
  const origGemini = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const origGeminiAlt = process.env.GEMINI_API_KEY;
  const origOpen = process.env.OPENAI_API_KEY;

  afterEach(() => {
    if (origGemini !== undefined) process.env.GOOGLE_GENERATIVE_AI_API_KEY = origGemini;
    else delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (origGeminiAlt !== undefined) process.env.GEMINI_API_KEY = origGeminiAlt;
    else delete process.env.GEMINI_API_KEY;
    if (origOpen !== undefined) process.env.OPENAI_API_KEY = origOpen;
    else delete process.env.OPENAI_API_KEY;
  });

  it("returns 400 for invalid body (invalid structure)", async () => {
    const req = postRequest({ messages: "not an array" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Ungültige Anfrage.");
    expect(JSON.stringify(json)).not.toMatch(/stack|OPENAI|GEMINI|API_KEY/i);
  });

  it("returns 400 for non-JSON body", async () => {
    const req = new NextRequest(BASE, {
      method: "POST",
      body: "not json",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Ungültige Anfrage.");
  });

  it("returns 400 when user message is shorter than MIN_INPUT_CHARS", async () => {
    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    const req = postRequest({
      mode: "faq",
      messages: [{ role: "user", content: "x" }],
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("mindestens 2 Zeichen");
  });

  it("returns 429 for spam (same user message repeated)", async () => {
    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    const same = "Was kostet eine Website?";
    const req = postRequest({
      mode: "faq",
      messages: [
        { role: "user", content: same },
        { role: "assistant", content: "Antwort" },
        { role: "user", content: same },
        { role: "assistant", content: "Antwort" },
        { role: "user", content: same },
      ],
    });
    const res = await POST(req);
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toMatch(/Wiederholung|warten/i);
  });

  it("returns 200 for match mode with valid wizardState (no LLM)", async () => {
    const req = postRequest(
      {
        mode: "match",
        wizardState: { stepIndex: 0, answers: {} },
        choice: "handwerk",
      },
      "variant=home"
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty("type");
    expect(["step", "result"]).toContain(json.type);
    if (json.type === "step") {
      expect(json).toHaveProperty("step");
      expect(json).toHaveProperty("stepIndex");
    } else {
      expect(json).toHaveProperty("match");
    }
  });

  it("returns fallback answer when no LLM keys are set (FAQ mode)", async () => {
    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    const req = postRequest({
      mode: "faq",
      messages: [{ role: "user", content: "Was bietet Berneby?" }],
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/stream|text|json/i);
    const text = await res.text();
    expect(text).not.toMatch(/OPENAI|GEMINI|API_KEY|stack/i);
    // Fallback stream contains at least some text (UIMessage stream or plain text)
    expect(text.length).toBeGreaterThan(0);
  });

  it("error responses do not expose secrets or stack traces", async () => {
    const req = postRequest({ messages: "not an array" });
    const res = await POST(req);
    const json = await res.json();
    const str = JSON.stringify(json);
    expect(str).not.toMatch(/OPENAI|GEMINI|API_KEY|GOOGLE|stack|at\s+\w+/i);
  });

  it("FAQ fallback returns knowledge-base answer when query matches FAQ", async () => {
    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    const req = postRequest({
      mode: "faq",
      messages: [{ role: "user", content: "Was kostet eine Website bei Berneby Solutions?" }],
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain("Handwerker");
    expect(text).toContain("Pakete");
  });
});
