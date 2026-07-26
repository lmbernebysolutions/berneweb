/**
 * Shared Twenty inbound-lead client for berneweb → mira.
 *
 * Auth matches voice-agent: HMAC over `${timestamp}.${canonicalJson(body)}`
 * plus legacy Bearer / X-Webhook-Secret fallback on the server.
 */

import { createHmac, randomUUID } from "node:crypto";

export type InboundContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  channel: "form";
};

export type InboundFunnelPayload = {
  name: string;
  email?: string;
  phone?: string;
  painPoint?: string;
  consequence?: string;
  teamSize?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  /** Always "funnel" for Digital-Check (not the UI email/whatsapp choice). */
  channel: "funnel";
  /**
   * Optional until pipeline accepts email-only funnel without message.
   * Safe to omit once mira accepts painPoint/consequence/teamSize alone.
   */
  message?: string;
  /** UI contact preference: email | whatsapp */
  contactChannel?: "email" | "whatsapp";
  painLabel?: string;
};

export type InboundLeadPayload = InboundContactPayload | InboundFunnelPayload;

const DEFAULT_TIMEOUT_MS = 8_000;

/** Canonical JSON matching berneby-crm webhook-auth / voice-agent signing. */
export function canonicalJsonBody(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalJsonBody(item)).join(",")}]`;
  }
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).sort();
  return `{${keys
    .map((key) => `${JSON.stringify(key)}:${canonicalJsonBody(record[key])}`)
    .join(",")}}`;
}

export function buildInboundLeadHeaders(
  secret: string,
  body: InboundLeadPayload
): HeadersInit {
  const timestamp = String(Date.now());
  const payload = canonicalJsonBody(body);
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");

  return {
    "Content-Type": "application/json",
    "X-Webhook-Timestamp": timestamp,
    "X-Webhook-Signature": signature,
    "X-Webhook-Nonce": randomUUID().replace(/-/g, ""),
  };
}

export type PostInboundLeadResult =
  | { ok: true; status: number; body: unknown }
  | { ok: false; status: number; error: string; body?: unknown };

/**
 * POST to mira inbound-lead. Does not throw on HTTP errors — caller maps status.
 */
export async function postInboundLead(
  body: InboundLeadPayload,
  options?: { timeoutMs?: number }
): Promise<PostInboundLeadResult> {
  const url = process.env.TWENTY_INBOUND_LEAD_URL?.trim();
  const secret = process.env.TWENTY_INBOUND_WEBHOOK_SECRET?.trim();

  if (!url || !secret) {
    return {
      ok: false,
      status: 500,
      error: "missing_twenty_env",
    };
  }

  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const abort = new AbortController();
  const timeoutId = setTimeout(() => abort.abort(), timeoutMs);

  try {
    // Sign and send the same canonical bytes the server verifies against.
    const canonical = canonicalJsonBody(body);
    const res = await fetch(url, {
      method: "POST",
      headers: buildInboundLeadHeaders(secret, body),
      body: canonical,
      signal: abort.signal,
    });

    const text = await res.text().catch(() => "");
    let parsed: unknown = text;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      /* keep raw text */
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: "twenty_http_error",
        body: typeof parsed === "string" ? parsed.slice(0, 2_000) : parsed,
      };
    }

    // Twenty HTTP Logic Functions often return HTTP 200 with
    // { statusCode: 401|500, body: { error|success } }. Auth/signature
    // failures must not be treated as CRM writes.
    const envelope =
      parsed && typeof parsed === "object"
        ? (parsed as {
            statusCode?: unknown;
            success?: unknown;
            body?: { success?: unknown };
          })
        : null;
    const nestedStatus =
      typeof envelope?.statusCode === "number" ? envelope.statusCode : res.status;
    const successFlag =
      envelope?.success ??
      (envelope?.body && typeof envelope.body === "object"
        ? envelope.body.success
        : undefined);
    if (nestedStatus !== 200 || successFlag !== true) {
      return {
        ok: false,
        status: nestedStatus >= 400 ? nestedStatus : 502,
        error: "twenty_success_false",
        body: parsed,
      };
    }

    return { ok: true, status: nestedStatus, body: parsed };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, status: 504, error: "twenty_timeout" };
    }
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : "twenty_fetch_failed",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Derive name/email/phone from Digital-Check UI contact + channel. */
export function mapFunnelContact(
  contact: string,
  uiChannel: "email" | "whatsapp"
): Pick<InboundFunnelPayload, "name" | "email" | "phone"> {
  const trimmed = contact.trim();
  if (uiChannel === "email") {
    const local = trimmed.split("@")[0] || "Digital-Check";
    return {
      name: local,
      email: trimmed,
    };
  }
  return {
    name: "Digital-Check Lead",
    phone: trimmed,
  };
}

/** Temporary message so current mira parser (message|phone required) accepts funnel. */
export function buildFunnelBridgeMessage(input: {
  painPoint?: string;
  painLabel?: string;
  consequence?: string;
  teamSize?: string;
  contactChannel?: "email" | "whatsapp";
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}): string {
  const lines = [
    "Digital-Check Lead",
    input.painPoint ? `painPoint: ${input.painPoint}` : null,
    input.painLabel ? `painLabel: ${input.painLabel}` : null,
    input.consequence ? `consequence: ${input.consequence}` : null,
    input.teamSize ? `teamSize: ${input.teamSize}` : null,
    input.contactChannel ? `contactChannel: ${input.contactChannel}` : null,
    input.utmSource ? `utmSource: ${input.utmSource}` : null,
    input.utmMedium ? `utmMedium: ${input.utmMedium}` : null,
    input.utmCampaign ? `utmCampaign: ${input.utmCampaign}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}
