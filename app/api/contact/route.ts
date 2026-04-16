import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Validation Schema ────────────────────────────────────────────────────────
const ContactSchema = z.object({
  name: z.string().min(2, "Name zu kurz").max(100),
  email: z.string().email("Ungültige E-Mail").max(200),
  phone: z.string().max(50).optional(),
  message: z.string().min(10, "Nachricht zu kurz").max(2000),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 2_000;
const NOTION_TIMEOUT_MS = 8_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimitStore = globalThis as typeof globalThis & {
  __contactRateLimit?: Map<string, RateLimitEntry>;
};

const contactRateLimitStore =
  globalRateLimitStore.__contactRateLimit ?? new Map<string, RateLimitEntry>();

if (!globalRateLimitStore.__contactRateLimit) {
  globalRateLimitStore.__contactRateLimit = contactRateLimitStore;
}

// ─── Notion Database Schema ───────────────────────────────────────────────────
// Erwartete Spalten in der Notion-Datenbank:
//   Name     → Title
//   Email    → Email
//   Telefon  → Phone number
//   Nachricht → Text (Rich text)
//   Datum    → Date
//   Status   → Select (Optionen: Neu | In Bearbeitung | Erledigt)

function getClientIdentifier(req: NextRequest): string {
  const requestIp = (req as NextRequest & { ip?: string }).ip;
  if (requestIp) {
    return requestIp;
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",");
    return ips[0]?.trim() || "unknown";
  }

  return "unknown";
}

function pruneRateLimitStore(now: number) {
  for (const [key, entry] of contactRateLimitStore) {
    if (entry.resetAt <= now) {
      contactRateLimitStore.delete(key);
    }
  }

  if (contactRateLimitStore.size <= RATE_LIMIT_MAX_ENTRIES) {
    return;
  }

  // Remove oldest entries if the store still grows beyond the cap.
  const overflow = contactRateLimitStore.size - RATE_LIMIT_MAX_ENTRIES;
  let removed = 0;
  for (const key of contactRateLimitStore.keys()) {
    contactRateLimitStore.delete(key);
    removed += 1;
    if (removed >= overflow) {
      break;
    }
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
    return { allowed: true };
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((currentEntry.resetAt - now) / 1000)
    );
    return { allowed: false, retryAfterSeconds };
  }

  contactRateLimitStore.set(clientId, {
    ...currentEntry,
    count: currentEntry.count + 1,
  });

  return { allowed: true };
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
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    // ── 1. Parse & validate input ──────────────────────────────────────────
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Eingabe ungültig" }, { status: 400 });
    }

    const { name, email, phone, message } = parsed.data;

    // ── 2. Check credentials ───────────────────────────────────────────────
    const notionToken = process.env.NOTION_API_TOKEN;
    const databaseId = process.env.NOTION_CONTACT_DATABASE_ID;

    if (!notionToken || !databaseId) {
      console.error("[contact] Notion credentials missing");
      return NextResponse.json(
        { error: "Serverkonfigurationsfehler" },
        { status: 500 }
      );
    }

    // ── 3. Write to Notion ─────────────────────────────────────────────────
    // Build properties object — omit optional fields when empty to avoid Notion 400s
    const properties: Record<string, unknown> = {
      Name: {
        title: [{ text: { content: name } }],
      },
      Email: {
        email: email,
      },
      Nachricht: {
        rich_text: [{ text: { content: message } }],
      },
      Datum: {
        date: { start: new Date().toISOString().split("T")[0] },
      },
      Status: {
        select: { name: "Neu" },
      },
    };

    // Only include Telefon if provided (Notion rejects phone_number: null)
    if (phone) {
      properties.Telefon = { phone_number: phone };
    }

    const notionAbortController = new AbortController();
    const timeoutId = setTimeout(() => {
      notionAbortController.abort();
    }, NOTION_TIMEOUT_MS);

    let notionRes: Response;
    try {
      notionRes = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notionToken}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parent: { database_id: databaseId },
          properties,
        }),
        signal: notionAbortController.signal,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.error("[contact] Notion request timed out");
        return NextResponse.json(
          { error: "Zeitüberschreitung beim Verarbeiten der Anfrage" },
          { status: 504 }
        );
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!notionRes.ok) {
      const notionErrorBody = await notionRes.text().catch(() => "");
      console.error("[contact] Notion API error", {
        status: notionRes.status,
        body: notionErrorBody.slice(0, 2_000),
      });
      return NextResponse.json(
        { error: "Datenbankfehler – bitte versuchen Sie es erneut" },
        { status: 500 }
      );
    }

    // ── 4. Success ─────────────────────────────────────────────────────────
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}
