/**
 * GA4 consent-aware loader. Only loads gtag when user has given Analytics consent
 * (Cookie-Banner → initGA). IP-Anonymisierung bei config.
 *
 * Kein manuelles Snippet im <head> nötig — doppeltes Laden vermeiden.
 * Optional: NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local / Vercel setzen, um die ID zu überschreiben.
 */

declare global {
  interface Window {
    gtag?: (
      command: "config" | "consent" | "event" | "js",
      targetIdOrDate: string | Date,
      config?: Record<string, unknown>
    ) => void;
    /** Queue for gtag.js — Arguments objects from gtag() plus GTM event objects. */
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = (
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-QEVDGDCV9G"
).trim();
const SCRIPT_URL = "https://www.googletagmanager.com/gtag/js";

/** Gleicher Default wie `react-cookie-manager` – gespeicherte Zustimmung auslesen. */
const CONSENT_COOKIE_KEY = "cookie-consent";

let gaLoaded = false;

/**
 * Official gtag stub: MUST push `arguments` (Arguments object), not a rest-array.
 * Google’s gtag.js only treats Arguments-like queue entries as API commands.
 * Pushing a plain Array leaves window.gtag as a dead stub and never sends hits.
 */
function installGtagStub(): void {
  window.dataLayer = window.dataLayer ?? [];
  if (typeof window.gtag === "function") return;
  // Official snippet shape: push the Arguments object, never a rest-array.
  // Rest-params would recreate the previous bug (array queue entries).
  window.gtag = function gtag(): void {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as NonNullable<Window["gtag"]>;
}

function injectGtagScript(): void {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || gaLoaded) return;

  installGtagStub();
  window.gtag!("js", new Date());
  window.gtag!("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src^="${SCRIPT_URL}"]`
  );
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `${SCRIPT_URL}?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  }

  gaLoaded = true;
}

/**
 * Beim Seitenaufruf: Wenn bereits eine gültige Analytics-Zustimmung im Cookie
 * liegt (z. B. wiederkehrende Besucher), GA laden – ohne Snippet im `<head>`.
 * Entspricht dem Format von `react-cookie-manager` (Analytics.consented).
 */
export function tryInitGAFromStoredConsent(): void {
  if (typeof document === "undefined" || !GA_MEASUREMENT_ID) return;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE_KEY}=([^;]*)`)
  );
  if (!match?.[1]) return;
  try {
    let raw: string;
    try {
      raw = decodeURIComponent(match[1]);
    } catch {
      raw = match[1];
    }
    const parsed = JSON.parse(raw) as {
      Analytics?: { consented?: boolean };
    };
    if (parsed?.Analytics?.consented === true) {
      initGA();
    }
  } catch {
    // Ungültiges Cookie ignorieren
  }
}

/**
 * Initialize GA4 only after Analytics consent. Call from CookieManager onAccept or onManage (Analytics true).
 */
export function initGA(): void {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined") return;
  if (!gaLoaded) {
    injectGtagScript();
  }
  window.gtag?.("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
}

/**
 * Fire a GA4 event if gtag is available (after consent). No-ops otherwise.
 */
export function trackGAEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, params);
}

/**
 * Revoke analytics consent. Call on decline or when user disables Analytics in preferences.
 */
export function revokeGA(): void {
  if (typeof window === "undefined") return;
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}
