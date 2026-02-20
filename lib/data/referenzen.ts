// =============================================================================
// BERNEBY SOLUTIONS – REFERENZEN DATA
// =============================================================================

export type ReferenzKategorie =
  | "Alle"
  | "Webseite"
  | "E-Commerce"
  | "Handwerk"
  | "Marketing";

export interface ReferenzMetrik {
  wert: string;
  label: string;
}

export interface ReferenzResult {
  metrik: string;
  wert: string;
  positiv: boolean;
}

export interface Referenz {
  id: string;
  slug: string;
  kunde: string;
  branche: string;
  typ: string;
  kategorien: ReferenzKategorie[];
  url?: string;
  /** Short tagline shown on card */
  tagline: string;
  /** Detailed description for case study */
  beschreibung: string;
  /** Key challenge the client had */
  challenge: string;
  /** What we built/delivered */
  loesung: string;
  /** Measured results */
  ergebnisse: ReferenzResult[];
  /** Tech stack tags */
  tags: string[];
  /** Featured case (shown large) */
  featured?: boolean;
  /** Mockup color theme */
  mockupTheme: {
    primary: string;
    accent: string;
    bg: string;
    text: string;
  };
  /** Approximate timeline */
  dauer: string;
  /** Year */
  jahr: string;
  /** Optional: Pfad zum Desktop-Screenshot. Datei in public/referenzen/ legen, z.B. /referenzen/elektro-wagner-desktop.png */
  desktopImage?: string;
  /** Optional: Pfad zum Mobile-Screenshot. Datei in public/referenzen/ legen, z.B. /referenzen/elektro-wagner-phone.png */
  phoneImage?: string;
}

/** Alle von dir geschickten Projekte – mit Screenshots. */
export const REFERENZEN: Referenz[] = [
  {
    id: "gesund-schoen",
    slug: "gesund-schoen",
    kunde: "Gesund & Schön im Marktgässchen",
    branche: "Kosmetikstudio / Beauty",
    typ: "Webseite",
    kategorien: ["Webseite", "Marketing"],
    url: "https://www.gesundschoen-aue.de",
    tagline: "Ihr Kosmetikstudio & Cosmetic Point in Aue – Auszeit für Körper und Seele.",
    beschreibung:
      "Als exklusives Kosmetikstudio in Aue vereint Gesund & Schön fachliche Kompetenz mit Wohlfühl-Ambiente. Wir haben eine moderne, einladende Website mit klarer Struktur, Termin-CTA und Leistungsübersicht umgesetzt.",
    challenge:
      "Der Betrieb brauchte einen professionellen Online-Auftritt, der Vertrauen schafft und Terminanfragen einfach macht – ohne bestehende Website.",
    loesung:
      "Neue Website mit markanter Typografie, großzügiger Bildsprache, klaren Call-to-Actions (Termin vereinbaren, Leistungen entdecken) und lokaler SEO für Aue und Umgebung.",
    ergebnisse: [
      { metrik: "Neue Website", wert: "Live", positiv: true },
      { metrik: "Responsive", wert: "Desktop & Mobile", positiv: true },
      { metrik: "Standort", wert: "Aue", positiv: true },
      { metrik: "Fokus", wert: "Termine & Leistungen", positiv: true },
    ],
    tags: ["Webseite", "SEO", "Responsive", "Lokales Marketing"],
    featured: true,
    mockupTheme: {
      primary: "#d4c574",
      accent: "#1a4480",
      bg: "#fefcf7",
      text: "#2c2416",
    },
    dauer: "2025",
    jahr: "2025",
    desktopImage: "/referenzen/gesund-schoen-desktop.png",
    phoneImage: "/referenzen/gesund-schoen-phone.png",
  },
  {
    id: "hc-immobilien",
    slug: "hc-immobilien",
    kunde: "HC.Immobilien GmbH",
    branche: "Baudienstleistungen",
    typ: "Webseite",
    kategorien: ["Webseite", "Handwerk", "Marketing"],
    url: "https://hcimmobiliengmbh.de",
    tagline: "Ihr Partner für Baudienstleistungen in Sachsen – von der Planung bis zur Fertigstellung.",
    beschreibung:
      "HC.Immobilien GmbH bietet Baudienstleistungen in Sachsen. Wir haben die Website relauncht: klare Botschaft, Angebot anfordern, WhatsApp-Integration und Trust-Elemente wie Bewertungen sowie 500+ zufriedene Kunden.",
    challenge:
      "Die bestehende Webpräsenz war veraltet und sprach Neukunden nicht klar an. Anfragen und Vertrauen sollten gesteigert werden.",
    loesung:
      "Relaunch mit Hero-Bereich, klaren CTAs (Angebot anfordern, WhatsApp), Trust-Box mit Google-Bewertung und Kennzahlen (500+ Kunden, 10+ Jahre Erfahrung). Responsive und conversion-orientiert.",
    ergebnisse: [
      { metrik: "Relaunch", wert: "Live", positiv: true },
      { metrik: "Trust-Elemente", wert: "Bewertung + Kennzahlen", positiv: true },
      { metrik: "WhatsApp", wert: "Integriert", positiv: true },
      { metrik: "Fokus", wert: "Sachsen", positiv: true },
    ],
    tags: ["Webseite", "Relaunch", "SEO", "Responsive", "WhatsApp"],
    mockupTheme: {
      primary: "#1e3a5f",
      accent: "#22c55e",
      bg: "#0f172a",
      text: "#f1f5f9",
    },
    dauer: "2025",
    jahr: "2025",
    desktopImage: "/referenzen/hc-immobilien-desktop.png",
    phoneImage: "/referenzen/hc-immobilien-phone.png",
  },
  {
    id: "ergotherapie-voigt",
    slug: "ergotherapie-voigt",
    kunde: "Ergotherapie Voigt",
    branche: "Gesundheit / Ergotherapie",
    typ: "Webseite",
    kategorien: ["Webseite", "Marketing"],
    url: "https://www.ergo-voigt.de",
    tagline: "Der Mensch steht im Mittelpunkt – an 3 Standorten im Erzgebirge.",
    beschreibung:
      "Ergotherapie Voigt hat drei Praxen im Erzgebirge. Wir haben die Website relauncht: klare Botschaft, Fähigkeiten fördern und Lebensqualität verbessern, Praxen entdecken, Fachbereiche und Bildergalerie mit Standort-Tipp.",
    challenge:
      "Die alte Website war nicht mehr zeitgemäß. Die drei Standorte und das Therapieangebot sollten übersichtlich und vertrauensvoll dargestellt werden.",
    loesung:
      "Relaunch mit modernem Layout, Hero mit Unterstreichung „Mittelpunkt“, CTAs (Praxen entdecken, Fachbereiche), Bildergalerie mit Praxis-Location und klarer Navigation (Start, FAQ, Praxis, Leistungen, Therapieangebote, Team, Kontakt).",
    ergebnisse: [
      { metrik: "Relaunch", wert: "Live", positiv: true },
      { metrik: "Standorte", wert: "3 im Erzgebirge", positiv: true },
      { metrik: "Responsive", wert: "Desktop & Mobile", positiv: true },
      { metrik: "Fokus", wert: "Mensch & Qualität", positiv: true },
    ],
    tags: ["Webseite", "Relaunch", "SEO", "Responsive", "Mehrere Standorte"],
    mockupTheme: {
      primary: "#0ea5e9",
      accent: "#0c4a6e",
      bg: "#f0f9ff",
      text: "#0f172a",
    },
    dauer: "2025",
    jahr: "2025",
    desktopImage: "/referenzen/ergotherapie-voigt-desktop.png",
    phoneImage: "/referenzen/ergotherapie-voigt-phone.png",
  },
];

export const REFERENZEN_STATS = [
  { wert: "100%", label: "Projekte pünktlich geliefert" },
  { wert: "∅ 4 Wo.", label: "Time-to-Live" },
  { wert: "∅ +180%", label: "Anfragen-Steigerung" },
  { wert: "4.9★", label: "Kundenzufriedenheit" },
] as const;
