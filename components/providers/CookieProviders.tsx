"use client";

import { useEffect } from "react";
import { CookieManager } from "react-cookie-manager";
import { initGA, revokeGA } from "@/lib/ga";

const COOKIE_MODAL_OVERRIDES = `
.cookie-manager-berneby .cookie-manager > div > div,
.cookie-manager-berneby .cookie-manager > div > div > div,
.cookie-manager > div > div,
.cookie-manager > div > div > div,
.cookie-manager-berneby .cookie-manager [class*="rounded-lg"],
.cookie-manager-berneby .cookie-manager [class*="shadow-xl"],
.cookie-manager-berneby .cookie-manager [class*="flex"][class*="gap-6"],
.cookie-manager-berneby .cookie-manager div[class*="max-w-md"],
.cookie-manager-berneby .cookie-manager div[class*="max-w-lg"],
.cookie-manager-berneby .cookie-manager > div[class*="inset-0"] > div,
.cookie-manager > div[class*="inset-0"] > div {
  background-color: #283569 !important;
  color: #fff !important;
  border-color: rgba(3, 249, 249, 0.3) !important;
}
.cookie-manager-berneby .cookie-manager > div > div button:last-of-type,
.cookie-manager > div > div button:last-of-type,
.cookie-manager-berneby .cookie-manager button.font-semibold,
.cookie-manager button.font-semibold {
  background-color: #03f9f9 !important;
  color: #283569 !important;
  border: none !important;
}
.cookie-manager-berneby .cookie-manager > div > div button:first-of-type,
.cookie-manager > div > div button:first-of-type {
  background-color: transparent !important;
  border: 1px solid rgba(255,255,255,0.3) !important;
  color: rgba(255,255,255,0.9) !important;
}
.cookie-manager-berneby .cookie-manager a,
.cookie-manager a { color: #03f9f9 !important; }
`;

type CookieCategories = { Analytics: boolean; Social: boolean; Advertising: boolean };

const COOKIE_TRANSLATIONS: Record<string, string> = {
  title: "Cookie-Einstellungen",
  message:
    "Wir verwenden Cookies, um die Nutzung der Website zu analysieren und Ihr Erlebnis zu verbessern. Notwendige Cookies sind für den Betrieb der Website erforderlich. Sie können Ihre Auswahl jederzeit anpassen.",
  buttonText: "Alle akzeptieren",
  declineButtonText: "Nur notwendige",
  manageButtonText: "Einstellungen",
  privacyPolicyText: "Datenschutzerklärung",

  manageTitle: "Cookie-Einstellungen",
  manageMessage:
    "Verwalten Sie Ihre Cookie-Präferenzen. Notwendige Cookies sind für die Funktion der Website immer aktiv.",

  manageEssentialTitle: "Notwendige Cookies",
  manageEssentialSubtitle: "Erforderlich für den Betrieb der Website",
  manageEssentialStatus: "Status: Immer aktiv",
  manageEssentialStatusButtonText: "Immer an",

  manageAnalyticsTitle: "Analyse",
  manageAnalyticsSubtitle:
    "Hilft uns zu verstehen, wie Besucher die Website nutzen (z. B. Google Analytics).",

  manageSocialTitle: "Social",
  manageSocialSubtitle: "Soziale Funktionen und Teilen",

  manageAdvertTitle: "Werbung",
  manageAdvertSubtitle: "Personalisierte Werbung und Messung",

  manageCookiesStatus: "Status: {{status}} am {{date}}",
  manageCookiesStatusConsented: "Zugestimmt",
  manageCookiesStatusDeclined: "Abgelehnt",

  manageCancelButtonText: "Abbrechen",
  manageSaveButtonText: "Einstellungen speichern",
};

/* Keine Tailwind-Arbitrary-Werte mit # – die führen beim Build zu ungültigen CSS-Selektoren. Farben kommen aus globals.css (.cookie-manager-berneby). */
const cookieClassNames = {
  bannerContainer:
    "fixed bottom-0 left-0 right-0 z-[100] border-t border-white/30 shadow-lg font-sans",
  bannerContent:
    "mx-auto max-w-6xl px-4 sm:px-5 md:px-6 lg:px-8 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
  bannerTitle: "font-bold text-white text-lg uppercase tracking-tight",
  bannerMessage: "text-sm text-white/90",
  acceptButton:
    "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2",
  declineButton:
    "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium border border-white/30 text-white/90 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  manageButton:
    "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2",
  privacyPolicyLink: "underline hover:no-underline",

  popupContainer:
    "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 font-sans",
  popupContent:
    "rounded-lg border border-white/30 p-6 shadow-xl max-w-md w-full",
  popupTitle: "font-bold text-white text-lg uppercase tracking-tight",
  popupMessage: "text-sm text-white/90",

  modalContainer:
    "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 font-sans",
  modalContent:
    "rounded-lg border border-white/30 p-6 shadow-xl max-w-md w-full",
  modalTitle: "font-bold text-white text-lg uppercase tracking-tight",
  modalMessage: "text-sm text-white/90",

  manageCookieContainer: "flex flex-col gap-6 text-white/90",
  manageCookieTitle: "font-bold text-white text-lg uppercase tracking-tight",
  manageCookieMessage: "text-sm",
  manageCookieCategory: "flex items-start justify-between gap-4",
  manageCookieCategoryTitle: "font-semibold text-white",
  manageCookieCategorySubtitle: "text-sm text-white/80",
  manageCookieStatusText: "text-sm",
  manageCookieToggle:
    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-white/30 bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  manageCookieToggleChecked: "",
  manageCancelButton:
    "rounded-md px-4 py-2 text-sm font-medium border border-white/30 text-white/90 hover:bg-white/10",
  manageSaveButton:
    "rounded-md px-4 py-2 text-sm font-semibold hover:opacity-90",

  floatingButton:
    "fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white shadow-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  floatingButtonCloseButton:
    "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white text-xs hover:bg-white/30",
  poweredByLink: "text-xs text-white/60 hover:text-white/80",
};

export function CookieProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const id = "cookie-manager-berneby-overrides";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = COOKIE_MODAL_OVERRIDES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const handleAccept = () => {
    initGA();
  };

  const handleDecline = () => {
    revokeGA();
  };

  const handleManage = (preferences?: CookieCategories) => {
    if (preferences?.Analytics) {
      initGA();
    } else {
      revokeGA();
    }
  };

  return (
    <div className="cookie-manager-berneby">
    <CookieManager
      privacyPolicyUrl="/datenschutz"
      displayType="banner"
      theme="dark"
      initialPreferences={{ Analytics: false, Social: false, Advertising: false }}
      cookieCategories={{ Analytics: true, Social: false, Advertising: false }}
      enableFloatingButton={true}
      expirationDays={365}
      translations={COOKIE_TRANSLATIONS}
      classNames={cookieClassNames}
      onAccept={handleAccept}
      onDecline={handleDecline}
      onManage={handleManage}
    >
      {children}
    </CookieManager>
    </div>
  );
}
