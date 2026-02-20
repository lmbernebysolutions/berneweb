/**
 * GA4 consent-aware loader. Only loads gtag when user has given Analytics consent.
 * IP anonymization enabled for DSGVO compliance.
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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SCRIPT_URL = "https://www.googletagmanager.com/gtag/js";

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
