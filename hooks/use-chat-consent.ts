"use client";

import { useCookieConsent } from "react-cookie-manager";

/**
 * Consent für Chat-Anzeige: Chat nur rendern, wenn Nutzer der Kategorie
 * „KI-Chat / Chatbot“ (Social) in den Cookie-Einstellungen zugestimmt hat.
 * Ohne diese Zustimmung bleibt der Chat blockiert.
 * Muss innerhalb von CookieManager/Provider genutzt werden.
 */
export function useChatConsent(): { hasConsent: boolean; openPreferences: () => void } {
  const { detailedConsent, openPreferencesModal } = useCookieConsent();
  const hasConsent = detailedConsent?.Social?.consented === true;
  return { hasConsent, openPreferences: openPreferencesModal };
}
