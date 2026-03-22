"use client";

import { useMemo } from "react";
import { useCookieConsent } from "react-cookie-manager";

/** Gleicher Key wie im CookieManager (react-cookie-manager Default). */
const COOKIE_KEY = "cookie-consent";

/**
 * Altes Cookie-Format mit flachen Booleans: nur **Analytics** zählt für die Karte
 * (nicht Social/KI-Chat).
 */
function readLegacyAnalyticsFromDocumentCookie(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_KEY}=([^;]*)`));
  if (!match?.[1]) return false;
  try {
    const decoded = decodeURIComponent(match[1].trim());
    const raw: unknown = JSON.parse(decoded);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return false;
    const o = raw as Record<string, unknown>;
    const a = o.Analytics;
    // Neues detailliertes Format – vom Context abgedeckt
    if (a !== null && typeof a === "object" && !Array.isArray(a) && "consented" in a) {
      return false;
    }
    return a === true;
  } catch {
    return false;
  }
}

/**
 * Einwilligung für eingebettete Karte (OpenStreetMap iframe).
 * Nur bei **Analyse** („Analyse & Karte“) – nicht bei KI-Chat/Social allein.
 */
export function useMapConsent(): { hasConsent: boolean; openPreferences: () => void } {
  const { detailedConsent, openPreferencesModal } = useCookieConsent();

  const hasConsent = useMemo(() => {
    if (detailedConsent?.Analytics?.consented === true) return true;
    return readLegacyAnalyticsFromDocumentCookie();
  }, [detailedConsent]);

  return { hasConsent, openPreferences: openPreferencesModal };
}
