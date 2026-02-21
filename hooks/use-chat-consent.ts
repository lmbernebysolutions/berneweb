"use client";

import { useCookieConsent } from "react-cookie-manager";

/**
 * Consent für Chat-Anzeige: Chat nur rendern, wenn Nutzer eine Cookie-Entscheidung
 * getroffen hat („Alle akzeptieren“ oder „Nur notwendige“).
 * Muss innerhalb von CookieManager/Provider genutzt werden.
 */
export function useChatConsent(): { hasConsent: boolean; openPreferences: () => void } {
  const { hasConsent: acceptedAll, isDeclined, openPreferencesModal } = useCookieConsent();
  const hasConsent = acceptedAll === true || isDeclined === true;
  return { hasConsent, openPreferences: openPreferencesModal };
}
