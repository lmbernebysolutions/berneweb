import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
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
  RATE_LIMIT_REQUESTS,
  RATE_LIMIT_WINDOW,
  STREAM_TIMEOUT_MS,
  MIN_INPUT_CHARS,
} from "@/lib/chat/constants";
import { getFaqEntries, getRatgeberLinks, matchFaqQuery } from "@/lib/chat/knowledge";
import { getWizardChatState } from "@/lib/chat/wizard-chat";
import type { WizardVariant } from "@/lib/wizard-config";

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

const ratelimit = createRatelimit();

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }
  }

  let body: {
    mode?: "faq" | "match";
    messages?: Array<{ role: string; content?: string; parts?: unknown[] }>;
    wizardState?: { stepIndex: number; answers: Record<string, string> };
    idempotencyKey?: string;
    choice?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const mode = body.mode ?? "faq";
  const wizardVariant = (request.nextUrl.searchParams.get("variant") as WizardVariant) ?? "home";

  if (mode === "match") {
    const { wizardState, choice } = body;
    const stepIndex = wizardState?.stepIndex ?? 0;
    const answers = wizardState?.answers ?? {};
    const next = getWizardChatState(wizardVariant, stepIndex, answers, choice);
    return NextResponse.json(next);
  }

  const messages = body.messages ?? [];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const userTextRaw =
    lastUser?.content ??
    (lastUser?.parts as { type: string; text?: string }[] | undefined)?.find((p) => p.type === "text")?.text ??
    "";
  const userText = String(userTextRaw).slice(0, MAX_INPUT_CHARS).trim();
  if (userText.length < MIN_INPUT_CHARS) {
    return NextResponse.json(
      { error: "Bitte mindestens 2 Zeichen eingeben." },
      { status: 400 }
    );
  }
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => (m.content ?? (m.parts as { text?: string }[])?.[0]?.text ?? "").trim());
  const lastThree = userMessages.slice(-3);
  const allSame = lastThree.length >= 2 && lastThree.every((t) => t === lastThree[0]);
  if (allSame) {
    return NextResponse.json(
      { error: "Bitte keine identischen Wiederholungen." },
      { status: 429 }
    );
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
    return createUIMessageStreamResponse({ stream });
  }

  const faqEntries = getFaqEntries();
  const ratgeber = getRatgeberLinks();
  const contextParts = [
    "Antworte ausschließlich auf Basis der folgenden Wissensbasis. Erfinde nichts. Erfinde keine Fakten.",
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
    return result.toUIMessageStreamResponse();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      return new NextResponse("Request timeout", { status: 504 });
    }
    throw err;
  }
}
