import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

// ─── Validation Schema ────────────────────────────────────────────────────────

const FunnelLeadBaseSchema = z.object({
  painPoint: z.enum(["telefon", "fachkraefte", "sichtbarkeit", "it-chaos"]).optional(),
  painLabel: z.string().max(200).optional(),
  consequence: z.string().max(500).optional(),
  teamSize: z.string().max(50).optional(),
  gdprAccepted: z.literal(true),
});

const FunnelLeadSchema = z.discriminatedUnion("channel", [
  FunnelLeadBaseSchema.extend({
    channel: z.literal("email"),
    contact: z.string().email("Ungültige E-Mail").max(300),
  }),
  FunnelLeadBaseSchema.extend({
    channel: z.literal("whatsapp"),
    contact: z
      .string()
      .regex(/^\+?[0-9\s\-()]{7,30}$/, "Ungültige Telefonnummer"),
  }),
]);

const RATE_LIMIT_WINDOW = "10 m";
const RATE_LIMIT_MAX_REQUESTS = 10;
const NOTION_TIMEOUT_MS = 8_000;

function getClientIp(request: NextRequest): string {
  const requestIp = (request as NextRequest & { ip?: string }).ip;
  if (requestIp) {
    return requestIp;
  }

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",");
    return ips[ips.length - 1]?.trim() ?? "anonymous";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "anonymous";
}

function createRatelimit(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const redis = new Redis({ url, token });
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW as "10 m"),
  });
}

const ratelimit = createRatelimit();
if (!ratelimit) {
  console.warn(
    "[funnel] Rate limiting is disabled: missing UPSTASH_REDIS_REST_URL/TOKEN"
  );
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (ratelimit) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: "Zu viele Anfragen. Bitte später erneut versuchen." },
          { status: 429 }
        );
      }
    }

    // ── 1. Parse & validate ────────────────────────────────────────────────
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
    }

    const parsed = FunnelLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Eingabe ungültig" }, { status: 400 });
    }

    const { painPoint, painLabel, consequence, teamSize, contact, channel } = parsed.data;

    // ── 2. Check credentials ───────────────────────────────────────────────
    const notionToken = process.env.NOTION_API_TOKEN;
    const databaseId = process.env.NOTION_FUNNEL_DATABASE_ID;

    if (!notionToken || !databaseId) {
      console.error("[funnel] Notion credentials missing");
      return NextResponse.json({ error: "Serverkonfigurationsfehler" }, { status: 500 });
    }

    // ── 3. Write lead to Notion ────────────────────────────────────────────
    // Notion DB Spalten:
    //   Name          → Title
    //   Kanal         → Select (whatsapp | email)
    //   Schmerzpunkt  → Select (telefon | fachkraefte | sichtbarkeit | it-chaos)
    //   SchmerzLabel  → Rich Text
    //   Konsequenz    → Rich Text
    //   Teamgröße     → Rich Text
    //   Datum         → Date
    //   Status        → Select (Neu | Kontaktiert | Qualifiziert)

    const properties: Record<string, unknown> = {
      Name: {
        title: [{ text: { content: contact } }],
      },
      Kanal: {
        select: { name: channel },
      },
      Datum: {
        date: { start: new Date().toISOString().split("T")[0] },
      },
      Status: {
        select: { name: "Neu" },
      },
    };

    if (painPoint) {
      properties.Schmerzpunkt = { select: { name: painPoint } };
    }
    if (painLabel) {
      properties.SchmerzLabel = { rich_text: [{ text: { content: painLabel } }] };
    }
    if (consequence) {
      properties.Konsequenz = { rich_text: [{ text: { content: consequence } }] };
    }
    if (teamSize) {
      properties.Teamgroesse = { rich_text: [{ text: { content: teamSize } }] };
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
        console.error("[funnel] Notion request timed out");
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
      console.error("[funnel] Notion API error", {
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
    console.error("[funnel] Unexpected error:", err);
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}
