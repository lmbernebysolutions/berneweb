"use client";

import { useCookieConsent } from "react-cookie-manager";

/**
 * Consent für Karten-Widget (z. B. OpenStreetMap iframe): Karte nur anzeigen,
 * wenn der Nutzer „Alle akzeptieren“ gewählt hat (externe Inhalte).
 * Muss innerhalb von CookieManager/Provider genutzt werden.
 */
export function useMapConsent(): { hasConsent: boolean; openPreferences: () => void } {
  const { hasConsent: acceptedAll, openPreferencesModal } = useCookieConsent();
  return { hasConsent: acceptedAll === true, openPreferences: openPreferencesModal };
}
