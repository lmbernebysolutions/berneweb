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

export const REFERENZEN: Referenz[] = [
  {
    id: "elektro-wagner",
    slug: "elektro-wagner",
    kunde: "Elektro Wagner GmbH",
    branche: "Handwerk / Elektrik",
    typ: "Webseite + Google Ads",
    kategorien: ["Handwerk", "Marketing", "Webseite"],
    url: "#",
    tagline: "Von unsichtbar auf Seite 1 – in 6 Wochen.",
    beschreibung:
      "Elektro Wagner war trotz 20 Jahren Erfahrung online kaum auffindbar. Kein professioneller Auftritt, keine Strategie – nur verpasste Anfragen. Wir haben das komplett umgedreht.",
    challenge:
      "Der Betrieb erhielt kaum digitale Anfragen und konkurrierte auf einem lokalen Markt gegen besser aufgestellte Mitbewerber.",
    loesung:
      "Vollständige Webseite mit klarer Leistungsstruktur, lokaler SEO-Optimierung für Aue und Umgebung sowie einer Google Ads Kampagne für Notfallaufträge.",
    ergebnisse: [
      { metrik: "Neue Anfragen/Monat", wert: "+220%", positiv: true },
      { metrik: "Google-Position", wert: "Top 3", positiv: true },
      { metrik: "Anrufquote", wert: "×3", positiv: true },
      { metrik: "Time to Live", wert: "6 Wo.", positiv: true },
    ],
    tags: ["Next.js", "SEO", "Google Ads", "Lokales Marketing"],
    featured: true,
    mockupTheme: {
      primary: "#1a3a6e",
      accent: "#f59e0b",
      bg: "#0f1f3d",
      text: "#ffffff",
    },
    dauer: "6 Wochen",
    jahr: "2026",
    desktopImage: undefined,
    phoneImage: undefined,
  },
  {
    id: "cafe-erzgebirge",
    slug: "cafe-erzgebirge",
    kunde: "Café Erzgebirge",
    branche: "Gastronomie",
    typ: "Webseite + Reservierungssystem",
    kategorien: ["Webseite"],
    url: "#",
    tagline: "Tischreservierungen rund um die Uhr – ohne Telefonklingeln.",
    beschreibung:
      "Das Café Erzgebirge brauchte eine Webpräsenz, die genauso gemütlich wirkt wie der Laden selbst – und gleichzeitig Reservierungen automatisiert abwickelt.",
    challenge:
      "Reservierungen liefen ausschließlich per Telefon. Das kostete Personal-Zeit und schloss potenzielle Gäste außerhalb der Öffnungszeiten aus.",
    loesung:
      "Warme, einladende Website mit integriertem Online-Reservierungsformular, Speisekarte und lokaler SEO für Gastronomie-Suchanfragen.",
    ergebnisse: [
      { metrik: "Online-Reservierungen", wert: "+40%", positiv: true },
      { metrik: "Telefon-Aufwand", wert: "-60%", positiv: true },
      { metrik: "Seitenaufrufe/Monat", wert: "1.200+", positiv: true },
      { metrik: "Bounce Rate", wert: "28%", positiv: true },
    ],
    tags: ["Next.js", "Formular-Integration", "SEO", "Responsive"],
    mockupTheme: {
      primary: "#7c3f1e",
      accent: "#d4a574",
      bg: "#2c1a0e",
      text: "#fef3e2",
    },
    dauer: "3 Wochen",
    jahr: "2026",
    desktopImage: undefined,
    phoneImage: undefined,
  },
  {
    id: "sanitaer-mueller",
    slug: "sanitaer-mueller",
    kunde: "Sanitär Müller",
    branche: "Handwerk / Sanitär",
    typ: "Webseite + Voice-Guard KI-Telefon",
    kategorien: ["Handwerk", "Webseite"],
    url: "#",
    tagline: "Null verpasste Anrufe. Der KI-Assistent übernimmt.",
    beschreibung:
      "Sanitär Müller verlor täglich Aufträge durch verpasste Anrufe – besonders auf Baustellen, wo das Telefon nicht immer erreichbar ist. Unser Voice-Guard-System hat das Problem gelöst.",
    challenge:
      "Bei Alleinbetrieb ist der Chef oft auf der Baustelle. Anrufe von Neukunden blieben unbeantwortet – das Geld blieb beim Wettbewerber.",
    loesung:
      "Professionelle Handwerker-Website mit integriertem KI-Telefonassistenten, der 24/7 Anrufe entgegennimmt, Daten erfasst und per E-Mail weiterleitet.",
    ergebnisse: [
      { metrik: "Verpasste Anrufe", wert: "0", positiv: true },
      { metrik: "Neue Aufträge/Monat", wert: "+8", positiv: true },
      { metrik: "Erreichbarkeit", wert: "24/7", positiv: true },
      { metrik: "Setup-Zeit", wert: "2 Wo.", positiv: true },
    ],
    tags: ["Next.js", "Voice-Guard", "KI-Telefon", "SEO Lokal"],
    mockupTheme: {
      primary: "#1a4480",
      accent: "#03f9f9",
      bg: "#0d2040",
      text: "#e8f4fd",
    },
    dauer: "2 Wochen",
    jahr: "2026",
    desktopImage: undefined,
    phoneImage: undefined,
  },
  {
    id: "holzwerkstatt-bergmann",
    slug: "holzwerkstatt-bergmann",
    kunde: "Holzwerkstatt Bergmann",
    branche: "Einzelhandel / Handwerk",
    typ: "Shopify E-Commerce Shop",
    kategorien: ["E-Commerce", "Webseite"],
    url: "#",
    tagline: "Handgemacht online verkaufen – bundesweit.",
    beschreibung:
      "Die Holzwerkstatt Bergmann fertigt exklusive Erzgebirge-Holzprodukte – Schwibbögen, Nussknacker, Dekoartikel. Der Verkauf lief nur lokal und auf Märkten. Wir haben das Geschäft ins Netz gebracht.",
    challenge:
      "Hochwertige Handarbeit erreichte nur lokale Käufer. Kein Online-Shop, keine Möglichkeit zur bundesweiten Skalierung des Vertriebs.",
    loesung:
      "Shopify-Shop mit professioneller Produktfotografie-Beratung, Erzgebirge-Storytelling, SEO für saisonale Keywords und automatischer Bestandsverwaltung.",
    ergebnisse: [
      { metrik: "Erste 3 Monate Bestellungen", wert: "48", positiv: true },
      { metrik: "Ø Bestellwert", wert: "67 €", positiv: true },
      { metrik: "Bundesweite Reichweite", wert: "100%", positiv: true },
      { metrik: "Weihnachtssaison Umsatz", wert: "+380%", positiv: true },
    ],
    tags: ["Shopify", "E-Commerce", "SEO", "Produktfotografie-Beratung"],
    mockupTheme: {
      primary: "#4a2c0a",
      accent: "#c8860a",
      bg: "#1a0f04",
      text: "#faf0e0",
    },
    dauer: "4 Wochen",
    jahr: "2026",
    desktopImage: undefined,
    phoneImage: undefined,
  },
];

export const REFERENZEN_STATS = [
  { wert: "100%", label: "Projekte pünktlich geliefert" },
  { wert: "∅ 4 Wo.", label: "Time-to-Live" },
  { wert: "∅ +180%", label: "Anfragen-Steigerung" },
  { wert: "4.9★", label: "Kundenzufriedenheit" },
] as const;
