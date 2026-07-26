import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { postInboundLead } from "@/lib/crm/inbound-lead";

const ContactSchema = z.object({
  name: z.string().min(2, "Name zu kurz").max(100),
  email: z.string().email("Ungültige E-Mail").max(200),
  phone: z.string().max(50).optional(),
  message: z.string().min(10, "Nachricht zu kurz").max(2000),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 2_000;

type RateLimitEntry = { count: number; resetAt: number };

const globalRateLimitStore = globalThis as typeof globalThis & {
  __contactRateLimit?: Map<string, RateLimitEntry>;
};

const contactRateLimitStore =
  globalRateLimitStore.__contactRateLimit ?? new Map<string, RateLimitEntry>();

if (!globalRateLimitStore.__contactRateLimit) {
  globalRateLimitStore.__contactRateLimit = contactRateLimitStore;
}

function getClientIdentifier(req: NextRequest): string {
  const requestIp = (req as NextRequest & { ip?: string }).ip;
  if (requestIp) return requestIp;
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return "unknown";
}

function pruneRateLimitStore(now: number) {
  for (const [key, entry] of contactRateLimitStore) {
    if (entry.resetAt <= now) contactRateLimitStore.delete(key);
  }
  if (contactRateLimitStore.size <= RATE_LIMIT_MAX_ENTRIES) return;
  const overflow = contactRateLimitStore.size - RATE_LIMIT_MAX_ENTRIES;
  let removed = 0;
  for (const key of contactRateLimitStore.keys()) {
    contactRateLimitStore.delete(key);
    removed += 1;
    if (removed >= overflow) break;
  }
}

function enforceRateLimit(clientId: string) {
  const now = Date.now();
  pruneRateLimitStore(now);
  const currentEntry = contactRateLimitStore.get(clientId);
  if (!currentEntry || currentEntry.resetAt <= now) {
    contactRateLimitStore.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true as const };
  }
  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false as const,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((currentEntry.resetAt - now) / 1000)
      ),
    };
  }
  contactRateLimitStore.set(clientId, {
    ...currentEntry,
    count: currentEntry.count + 1,
  });
  return { allowed: true as const };
}

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientIdentifier(req);
    const rateLimit = enforceRateLimit(clientId);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte später erneut versuchen." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Eingabe ungültig" }, { status: 400 });
    }

    const { name, email, phone, message } = parsed.data;

    const result = await postInboundLead({
      name,
      email,
      ...(phone ? { phone } : {}),
      message,
      channel: "form",
    });

    if (!result.ok) {
      console.error("[contact] inbound-lead failed", result);
      if (result.status === 504) {
        return NextResponse.json(
          { error: "Zeitüberschreitung beim Verarbeiten der Anfrage" },
          { status: 504 }
        );
      }
      return NextResponse.json(
        { error: "Datenbankfehler – bitte versuchen Sie es erneut" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}
