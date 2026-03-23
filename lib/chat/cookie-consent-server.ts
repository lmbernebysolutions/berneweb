/**
 * Serverseitige Auswertung der KI-Chat-Einwilligung aus dem Cookie `cookie-consent`,
 * analog zu `useChatConsent` (react-cookie-manager): `detailedConsent.Social.consented === true`.
 */

const COOKIE_NAME = "cookie-consent";

function parseConsentPayload(raw: string): boolean {
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    /* Cookie-Wert kann bereits decodiert sein */
  }
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return false;
  }
  const social = data.Social;
  if (typeof social === "boolean") return social === true;
  if (social !== null && typeof social === "object" && !Array.isArray(social) && "consented" in social) {
    return (social as { consented?: boolean }).consented === true;
  }
  return false;
}

/** Aus dem `Cookie`-Request-Header (roh), wie ihn NextRequest mitsendet. */
export function hasKiChatConsentFromCookieHeader(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  for (const part of parts) {
    if (!part.startsWith(`${COOKIE_NAME}=`)) continue;
    const value = part.slice(COOKIE_NAME.length + 1);
    return parseConsentPayload(value);
  }
  return false;
}
