import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import {
  MAX_INPUT_CHARS,
  MAX_OUTPUT_TOKENS,
  MAX_MESSAGES_PER_REQUEST,
  RATE_LIMIT_REQUESTS,
  RATE_LIMIT_WINDOW,
  STREAM_TIMEOUT_MS,
  MIN_INPUT_CHARS,
  IDEMPOTENCY_TTL_SECONDS,
} from "@/lib/chat/constants";
import { getFaqEntries, getRatgeberLinks, matchFaqQuery } from "@/lib/chat/knowledge";

const chatBodySchema = z.object({
  mode: z.literal("faq").optional().default("faq"),
  messages: z
    .array(
      z.object({
        role: z.string(),
        content: z.string().optional(),
        parts: z.array(z.record(z.string(), z.unknown())).optional(),
      })
    )
    .max(MAX_MESSAGES_PER_REQUEST)
    .optional()
    .default([]),
  idempotencyKey: z.string().max(128).optional(),
});

type ChatBody = z.infer<typeof chatBodySchema>;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "anonymous";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "anonymous";
}

function createRatelimit(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const redis = new Redis({ url, token });
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW as "1 m"),
  });
}

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const ratelimit = createRatelimit();

/** Strukturiertes Logging ohne personenbezogene oder nutzererzeugte Inhalte. */
function logChatEvent(
  event: "rate_limit" | "spam" | "timeout" | "error" | "validation_error",
  detail?: Record<string, unknown>
): void {
  const payload = { event, ...detail };
  if (event === "error") {
    console.error("[chat]", JSON.stringify(payload));
  } else {
    console.warn("[chat]", JSON.stringify(payload));
  }
}

/** Normalisiert User-Input: Trim, NFKC, entfernt Steuerzeichen (0x00–0x1F außer Tab/LF/CR). */
function normalizeInput(raw: string): string {
  return raw
    .trim()
    .normalize("NFKC")
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "")
    .slice(0, MAX_INPUT_CHARS);
}

/** Response mit restriktiven CORS-Headern (nur gleiche Origin oder konfigurierte Production-Origin). */
function withCors(response: Response, request: NextRequest): Response {
  const origin = request.headers.get("origin");
  const allowed =
    !origin ||
    origin === request.nextUrl.origin ||
    (process.env.VERCEL_URL && origin === `https://${process.env.VERCEL_URL}`);
  const headers = new Headers(response.headers);
  if (allowed && origin) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function OPTIONS(request: NextRequest) {
  const res = new Response(null, { status: 204 });
  return withCors(res, request);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      logChatEvent("rate_limit", { ip: ip === "anonymous" ? undefined : "present" });
      const res = NextResponse.json(
        { error: "Zu viele Anfragen. Bitte kurz warten." },
        { status: 429 }
      );
      return withCors(res, request);
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    const res = NextResponse.json(
      { error: "Ungültige Anfrage." },
      { status: 400 }
    );
    return withCors(res, request);
  }

  const parsed = chatBodySchema.safeParse(body);
  if (!parsed.success) {
    logChatEvent("validation_error", { reason: "schema" });
    const res = NextResponse.json(
      { error: "Ungültige Anfrage." },
      { status: 400 }
    );
    return withCors(res, request);
  }
  const { messages: rawMessages, idempotencyKey } = parsed.data as ChatBody;

  const messages = rawMessages.slice(-MAX_MESSAGES_PER_REQUEST);
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const userTextRaw =
    lastUser?.content ??
    (lastUser?.parts as { type: string; text?: string }[] | undefined)?.find(
      (p) => p.type === "text"
    )?.text ??
    "";
  const userText = normalizeInput(String(userTextRaw));
  if (userText.length < MIN_INPUT_CHARS) {
    const res = NextResponse.json(
      { error: "Bitte mindestens 2 Zeichen eingeben." },
      { status: 400 }
    );
    return withCors(res, request);
  }

  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) =>
      normalizeInput(
        (m.content ?? (m.parts as { text?: string }[])?.[0]?.text ?? "") as string
      )
    );
  const lastThree = userMessages.slice(-3);
  const allSame = lastThree.length >= 2 && lastThree.every((t) => t === lastThree[0]);
  if (allSame) {
    logChatEvent("spam", { ip: ip === "anonymous" ? undefined : "present" });
    const res = NextResponse.json(
      { error: "Bitte keine identischen Wiederholungen." },
      { status: 429 }
    );
    return withCors(res, request);
  }

  if (idempotencyKey) {
    const redis = getRedis();
    if (redis) {
      const key = `chat:idempotency:${idempotencyKey}`;
      const set = await redis.set(key, "1", { nx: true, ex: IDEMPOTENCY_TTL_SECONDS });
      if (!set) {
        const res = NextResponse.json(
          { error: "Doppelte Anfrage. Bitte nicht erneut senden." },
          { status: 409 }
        );
        return withCors(res, request);
      }
    }
  }

  const faqMatch = matchFaqQuery(userText);
  const geminiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  const hasLLM = Boolean(geminiKey || openAiKey);

  const fallbackAnswer =
    faqMatch?.answer ??
    "Dazu habe ich leider keine passende Antwort in unserer Wissensbasis. Stellen Sie gern eine andere Frage oder schauen Sie in unseren Ratgeber-Artikeln.";

  if (!hasLLM) {
    const id = crypto.randomUUID();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue({ type: "text-start" as const, id });
        controller.enqueue({ type: "text-delta" as const, id, delta: fallbackAnswer });
        controller.enqueue({ type: "text-end" as const, id });
        controller.enqueue({ type: "finish" as const });
        controller.close();
      },
    });
    const res = createUIMessageStreamResponse({ stream });
    return withCors(res, request);
  }

  const faqEntries = getFaqEntries();
  const ratgeber = getRatgeberLinks();
  const contextParts = [
    "Antworte ausschließlich auf Basis der folgenden Wissensbasis. Erfinde nichts. Erfinde keine Fakten. Bei Themen außerhalb unserer Angebote (Handwerk, Web, IT, Erzgebirge) verweise auf Kontakt oder Impressum.",
    "--- FAQ ---",
    ...faqEntries.map((e) => `F: ${e.question}\nA: ${e.answer}`),
    "--- Ratgeber (nur als Weiterlesen-Link nennen) ---",
    ...ratgeber.map((r) => `${r.title}: /ratgeber/${r.slug} – ${r.description}`),
  ];
  const systemPrompt = contextParts.join("\n\n");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), STREAM_TIMEOUT_MS);

  const model = geminiKey
    ? google("gemini-2.0-flash")
    : openai("gpt-4o-mini");

  try {
    const modelMessages = await convertToModelMessages(
      messages as import("ai").UIMessage[]
    );
    const result = streamText({
      model,
      system: systemPrompt,
      messages: modelMessages,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      abortSignal: controller.signal,
    });
    clearTimeout(timeoutId);
    const res = result.toUIMessageStreamResponse();
    return withCors(res, request);
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      logChatEvent("timeout", {});
      const res = NextResponse.json(
        { error: "Die Anfrage hat zu lange gedauert. Bitte erneut versuchen." },
        { status: 504 }
      );
      return withCors(res, request);
    }
    logChatEvent("error", {
      message: err instanceof Error ? err.message : "Unknown error",
    });
    const res = NextResponse.json(
      { error: "Ein Fehler ist aufgetreten." },
      { status: 500 }
    );
    return withCors(res, request);
  }
}
