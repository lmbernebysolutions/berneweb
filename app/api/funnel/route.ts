import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import {
  buildFunnelBridgeMessage,
  mapFunnelContact,
  postInboundLead,
} from "@/lib/crm/inbound-lead";

const UtmSchema = z.string().max(100).optional();

const FunnelLeadBaseSchema = z.object({
  painPoint: z
    .enum(["telefon", "fachkraefte", "sichtbarkeit", "it-chaos"])
    .optional(),
  painLabel: z.string().max(200).optional(),
  consequence: z.string().max(500).optional(),
  teamSize: z.string().max(50).optional(),
  gdprAccepted: z.literal(true),
  utmSource: UtmSchema,
  utmMedium: UtmSchema,
  utmCampaign: UtmSchema,
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

function getClientIp(request: NextRequest): string {
  const requestIp = (request as NextRequest & { ip?: string }).ip;
  if (requestIp) return requestIp;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",").pop()?.trim() ?? "anonymous";
  }
  return request.headers.get("x-real-ip") ?? "anonymous";
}

function createRatelimit(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(
      RATE_LIMIT_MAX_REQUESTS,
      RATE_LIMIT_WINDOW as "10 m"
    ),
  });
}

const ratelimit = createRatelimit();

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

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
    }

    // Button channel may not match the contact shape (e.g. WhatsApp-CTA + E-Mail).
    // Detect email/phone from `contact` so Zod does not 400 wrongly.
    const raw = body as Record<string, unknown>;
    const contactRaw = typeof raw.contact === "string" ? raw.contact.trim() : "";
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactRaw);
    const looksPhone = /^\+?[0-9\s\-()]{7,30}$/.test(contactRaw);
    const buttonChannel =
      raw.channel === "whatsapp" || raw.channel === "email"
        ? raw.channel
        : undefined;
    const resolvedChannel = looksEmail
      ? "email"
      : looksPhone
        ? "whatsapp"
        : buttonChannel;

    const parsed = FunnelLeadSchema.safeParse({
      ...raw,
      contact: contactRaw,
      channel: resolvedChannel,
    });
    if (!parsed.success) {
      console.warn("[funnel] validation failed", parsed.error.flatten());
      return NextResponse.json(
        {
          error: "Eingabe ungültig",
          hint: "Bitte eine gültige E-Mail oder Telefonnummer angeben.",
        },
        { status: 400 }
      );
    }

    const {
      painPoint,
      painLabel,
      consequence,
      teamSize,
      contact,
      channel: uiChannel,
      utmSource,
      utmMedium,
      utmCampaign,
    } = parsed.data;

    const identity = mapFunnelContact(contact, uiChannel);

    const twentyPayload = {
      ...identity,
      ...(painPoint ? { painPoint } : {}),
      ...(consequence ? { consequence } : {}),
      ...(teamSize ? { teamSize } : {}),
      ...(utmSource ? { utmSource } : {}),
      ...(utmMedium ? { utmMedium } : {}),
      ...(utmCampaign ? { utmCampaign } : {}),
      channel: "funnel" as const,
      contactChannel: uiChannel,
      ...(painLabel ? { painLabel } : {}),
      message: buildFunnelBridgeMessage({
        painPoint,
        painLabel,
        consequence,
        teamSize,
        contactChannel: uiChannel,
        utmSource,
        utmMedium,
        utmCampaign,
      }),
    };

    const result = await postInboundLead(twentyPayload);

    if (!result.ok) {
      console.error("[funnel] inbound-lead failed", result);
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
    console.error("[funnel] Unexpected error:", err);
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}
