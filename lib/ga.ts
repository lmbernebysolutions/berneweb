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
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-QEVDGDCV9G";
const SCRIPT_URL = "https://www.googletagmanager.com/gtag/js";

/** Gleicher Default wie `react-cookie-manager` – gespeicherte Zustimmung auslesen. */
const CONSENT_COOKIE_KEY = "cookie-consent";

let gaLoaded = false;

function ensureDataLayer(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
}

function injectGtagScript(): void {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || gaLoaded) return;
  ensureDataLayer();
  const gtag = (...args: Parameters<NonNullable<typeof window.gtag>>) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `${SCRIPT_URL}?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  gaLoaded = true;
}

/**
 * Initialize GA4 only after Analytics consent. Call from CookieManager onAccept or onManage (Analytics true).
 */
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
