// =============================================================================
// BERNEBY SOLUTIONS – CENTRAL DATA CONSTANTS
// =============================================================================

export const COMPANY = {
  name: "Berneby Solutions",
  nameShort: "Berneby",
  legal: "Berneby Solutions GbR",
  rechtsform: "GbR",
  phone: "+49 15511 960927",
  phoneDisplay: "+49 15511 960927",
  email: "info@berneby.de",
  location: "Aue-Bad Schlema",
  region: "Erzgebirgskreis",
  state: "Sachsen",
  country: "Deutschland",
  founders: [
    { name: "Lennard Meyer", role: "Tech", share: "51%" },
    { name: "Daniel Hamburg", role: "Strategie", share: "49%" },
  ],
  founded: "2026",
} as const;

// =============================================================================
// NAVIGATION
// =============================================================================

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Handwerk", href: "/handwerk" },
  { label: "Tech Solutions", href: "/tech" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const FOOTER_NAV = {
  leistungen: [
    { label: "Webseiten", href: "/tech#leistungen" },
    { label: "E-Commerce", href: "/tech#leistungen" },
    { label: "Design & Branding", href: "/tech#leistungen" },
    { label: "Handwerks-Pakete", href: "/handwerk" },
    { label: "Digitaler Hausmeister", href: "/tech#leistungen" },
  ],
  unternehmen: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
} as const;

// =============================================================================
// HOME PAGE – HERO
// =============================================================================

export const HOME_HERO = {
  headline: "Technik, die Ihr Geschäft nach vorne bringt.",
  subline:
    "Berneby Solutions macht lokale Betriebe im Erzgebirge online sichtbar und automatisiert das, was Zeit frisst.",
  ctas: [
    { label: "Erstgespräch vereinbaren", href: "/kontakt", variant: "default" as const },
    { label: "Unsere Leistungen", href: "/tech", variant: "outline" as const },
  ],
} as const;

// =============================================================================
// TRUST BAR
// =============================================================================

export const TRUST_BAR = [
  { value: "100%", label: "Lokal" },
  { value: "24/7", label: "KI-Telefon" },
  { value: "50+", label: "Landingpages" },
  { value: "2", label: "Macher" },
] as const;

// =============================================================================
// TECH STACK / PARTNER (Home, Tech)
// =============================================================================

export const TECH_STACK = [
  "Next.js",
  "React",
  "Shopware",
  "Microsoft 365",
  "SEO & GEO",
  "KI-Integration",
] as const;

/** Tech-Seite: TrustBar-Kennzahlen (1:1 wie Über-uns, Inhalt angepasst) */
export const TECH_STATS = [
  { value: "Webseiten", label: "& Shops" },
  { value: "24/7", label: "IT-Support" },
  { value: "100%", label: "Erzgebirge" },
  { value: "2", label: "Macher" },
] as const;

// =============================================================================
// REFERENZEN – BRANCHEN / FÜR WEN WIR ARBEITEN (Home, Handwerk)
// =============================================================================

/** Handwerk-Seite: 4 Branchen, passen sauber in den Strip */
export const REFERENZEN_BRANCHEN = [
  "Elektrik",
  "Dachdecker",
  "Sanitär",
  "Heizungsbau",
] as const;

/** Home: 4 Branchen, passen sauber in den Strip */
export const REFERENZEN_HOME = [
  "Handwerk",
  "Einzelhandel",
  "Gastronomie",
  "Dienstleistung",
] as const;

// =============================================================================
// HOME – MINI-FAQ
// =============================================================================

export const HOME_MINI_FAQ = [
  {
    question: "Was kostet das Erstgespräch?",
    answer:
      "Nichts. Das Erstgespräch ist kostenlos und unverbindlich. Wir besprechen Ihr Anliegen und geben eine erste Einschätzung.",
  },
  {
    question: "Wie schnell kann es losgehen?",
    answer:
      "Nach dem Erstgespräch erhalten Sie ein transparentes Angebot. Je nach Projekt starten wir innerhalb von 1–2 Wochen.",
  },
  {
    question: "Arbeitet ihr nur im Erzgebirge?",
    answer:
      "Unser Fokus liegt auf dem Erzgebirge – wir kommen vor Ort. Für reine Online-Projekte arbeiten wir auch überregional.",
  },
] as const;

// =============================================================================
// TECH SEITE – TESTIMONIALS & REFERENZEN
// =============================================================================

export const TECH_TESTIMONIALS = [
  {
    name: "Stefan K.",
    role: "Heizungsbau",
    text: "Schnell, unkompliziert, faire Preise. Genau das, was wir als kleiner Betrieb brauchen.",
    result: "Website + Shop in 3 Wochen",
  },
  {
    name: "Sandra L.",
    role: "Friseursalon",
    text: "Die 10er-Karte ist Gold wert. Immer jemand erreichbar, der sich auskennt.",
    result: "Keine IT-Stress mehr",
  },
  {
    name: "Thomas M.",
    role: "Elektrikermeister",
    text: "Endlich eine IT, die versteht, was Handwerker brauchen. Kein Bullshit.",
    result: "3x mehr Anfragen",
  },
] as const;

export const TECH_REFERENCES = [
  {
    title: "Website Relaunch",
    description: "Mehrseitige Website mit SEO und lokalen Landingpages.",
    result: "3x mehr Anfragen in 4 Wochen",
  },
  {
    title: "Online-Shop",
    description: "Shop-Einrichtung und Betreuung für Handwerksbedarf.",
    result: "Live in 3 Wochen",
  },
  {
    title: "Digitaler Hausmeister",
    description: "10er-Karte für laufenden IT-Support und Office-Betreuung.",
    result: "24/7 Ruhe bei IT-Fragen",
  },
] as const;

// =============================================================================
// HANDWERK SEITE – KENNZAHLEN & GARANTIEN
// =============================================================================

export const HANDWERK_STATS = [
  { value: "4", label: "Wochen bis Go-Live" },
  { value: "24/7", label: "KI-Telefon" },
  { value: "50+", label: "Landingpages" },
  { value: "100%", label: "Lokal" },
] as const;

export const HANDWERK_GARANTIEN = [
  {
    title: "Festpreis bis Abnahme",
    description: "Keine versteckten Kosten. Was im Angebot steht, zahlen Sie.",
  },
  {
    title: "12 Monate Support inklusive",
    description: "Nach dem Launch sind wir für Sie da – im Paket bereits enthalten.",
  },
  {
    title: "Kein Kleingedrucktes",
    description: "Transparente Verträge. Sie wissen immer, wofür Sie zahlen.",
  },
] as const;

// =============================================================================
// PROBLEM → LÖSUNG
// =============================================================================

export const PROBLEMS_SOLUTIONS = [
  {
    problem: "Kunden finden Sie nicht bei Google?",
    solution:
      "Wir bringen Sie mit 50+ lokalen Landingpages auf Seite 1 – für jeden Ort, den Sie bedienen.",
    icon: "IconSearch",
  },
  {
    problem: "Anrufe gehen ins Leere?",
    solution:
      "Unser KI-Telefonassistent nimmt ab – 24 Stunden, 7 Tage. Kein Kunde geht mehr verloren.",
    icon: "IconPhone",
  },
  {
    problem: "Kein Budget für eine IT-Abteilung?",
    solution:
      "Wir sind Ihre externe IT – flexibel, stundengenau, ohne Festanstellung.",
    icon: "IconCurrencyEuro",
  },
] as const;

// =============================================================================
// ZWEI SÄULEN
// =============================================================================

export const TWO_PILLARS = {
  handwerk: {
    title: "Handwerk",
    description:
      "Speziell für Handwerker entwickelt. Website, Sichtbarkeit und Telefonservice – alles in einem Paket.",
    features: [
      "Professionelle Website",
      "50+ lokale Landingpages",
      "KI-Telefonassistent",
      "Google-Bewertungsmanagement",
    ],
    cta: { label: "Pakete ansehen", href: "/handwerk" },
  },
  general: {
    title: "Tech & Digital",
    description:
      "Excel-Probleme, Shop-Betreuung, Software-Umzug oder KI-Schulung – wir lösen jedes digitale Problem.",
    features: [
      "Webseiten & Online-Shops",
      "Office & Microsoft 365",
      "KI-Integration",
      "Digitaler Hausmeister",
    ],
    cta: { label: "Alle Leistungen", href: "/tech" },
  },
} as const;

// =============================================================================
// PROZESS
// =============================================================================

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Erstgespräch",
    description:
      "Wir lernen Ihr Geschäft kennen – kostenlos, unverbindlich, 30 Minuten. Bei Ihnen.",
  },
  {
    step: 2,
    title: "Analyse & Angebot",
    description:
      "Wir identifizieren, was Sie brauchen und erstellen ein transparentes Angebot.",
  },
  {
    step: 3,
    title: "Umsetzung",
    description:
      "Wir bauen. Sie bekommen Zwischenstände und geben Feedback.",
  },
  {
    step: 4,
    title: "Launch",
    description:
      "Ihre Lösung geht live. Wir prüfen alles und schulen Sie ein. Inkl. Support.",
  },
  {
    step: 5,
    title: "Betreuung",
    description:
      "Wir bleiben dran. Updates, Support, Optimierung – so lange Sie möchten.    ",
  },
] as const;

// =============================================================================
// FAQ
// =============================================================================

export const FAQ_ITEMS = [
  {
    question: "Was kostet eine Website bei Berneby Solutions?",
    answer:
      "Unsere Webseiten starten bei 950 \u20AC für einen professionellen One-Pager. Umfangreichere Projekte mit Suchmaschinen-Optimierung beginnen bei 1.950 \u20AC. Alle Preise verstehen sich netto zzgl. MwSt.",
  },
  {
    question: "Arbeitet ihr nur mit Handwerkern?",
    answer:
      "Nein. Handwerk ist unser Spezialgebiet, aber wir unterstützen alle lokalen Betriebe – vom Einzelhändler bis zum Freiberufler.",
  },
  {
    question: "Was ist der Geo-Net Dominator?",
    answer:
      "Wir erstellen 50 lokale Landingpages, die Ihren Betrieb für Suchbegriffe wie 'Elektriker Annaberg' oder 'Installateur Marienberg' sichtbar machen.",
  },
  {
    question: "Wie funktioniert die KI-Telefonassistenz?",
    answer:
      "Ein trainierter KI-Assistent nimmt Anrufe entgegen, wenn Sie beschäftigt sind. Er erfasst Name, Anliegen und Rückrufnummer – und Sie erhalten alles per Nachricht.",
  },
  {
    question: "Brauche ich technisches Wissen?",
    answer:
      "Nein. Wir erklären alles verständlich und übernehmen die Technik komplett. Sie müssen sich um nichts kümmern.",
  },
  {
    question: "Wie lange dauert eine Website?",
    answer:
      "Ein One-Pager ist in 1–2 Wochen fertig. Größere Projekte mit Geo-Net dauern ca. 3–4 Wochen.",
  },
  {
    question: "Was ist der Digitale Hausmeister?",
    answer:
      "Eine 10er-Stundenkarte für 850 \u20AC. Sie rufen an, wenn etwas klemmt – Excel-Problem, Website-Frage, Software-Setup. Wir helfen. 12 Monate gültig.",
  },
  {
    question: "Bietet ihr auch Wartung an?",
    answer:
      "Ja. Ab 45 \u20AC/Monat halten wir Ihre Website sicher und aktuell. Oder ab 180 \u20AC/Monat inklusive 2 Stunden Support.",
  },
  {
    question: "Könnt ihr auch einen Online-Shop einrichten?",
    answer:
      "Ja. Wir arbeiten mit Shopify und WooCommerce. Ein Basis-Shop startet bei 1.200 \u20AC.",
  },
  {
    question: "Wo sitzt ihr?",
    answer:
      "In Aue-Bad Schlema im Erzgebirgskreis. Wir arbeiten remote und vor Ort – kurze Wege, persönlicher Kontakt.",
  },
] as const;

// =============================================================================
// HANDWERK – PAKETE
// =============================================================================

export const CRAFT_PACKAGES = [
  {
    name: "Geselle",
    price: "950",
    unit: "einmalig",
    description: "Der solide Start für Ihren Betrieb ins Netz.",
    features: [
      "Professioneller One-Pager",
      "Mobile-optimiert",
      "Kontaktformular",
      "Google Maps Integration",
      "SSL-Zertifikat",
    ],
    highlighted: false,
  },
  {
    name: "Meisterbetrieb",
    price: "1.950",
    unit: "einmalig",
    description: "Für Betriebe, die bei Google gefunden werden wollen.",
    features: [
      "Mehrseitige Website",
      "Geo-Net: 50+ lokale Landingpages",
      "SEO-Optimierung",
      "Google Business Einrichtung",
      "Kontaktformular + Rückruf",
      "3 Monate Betreuung",
    ],
    highlighted: true,
    badge: "Bestseller",
  },
  {
    name: "Marktführer",
    price: "2.800",
    unit: "einmalig",
    description: "Das Komplettpaket für maximale Sichtbarkeit.",
    features: [
      "Alles aus Meisterbetrieb",
      "KI-Telefonassistent (Voice-Guard)",
      "Bewertungsmanagement (Review-Radar)",
      "Live-Dashboard (Live-Pulse)",
      "Google Ads Setup",
      "6 Monate Betreuung",
    ],
    highlighted: false,
  },
] as const;

// =============================================================================
// HANDWERK – USP MODULE
// =============================================================================

export const CRAFT_MODULES = [
  {
    name: "Geo-Net Dominator",
    price: "350",
    description:
      "50+ lokale Landingpages für maximale Google-Sichtbarkeit in Ihrer Region.",
    icon: "IconMapPin",
  },
  {
    name: "Voice-Guard 24/7",
    price: "690",
    description:
      "KI-Telefonassistent, der Anrufe entgegennimmt, wenn Sie arbeiten.",
    icon: "IconPhoneCall",
  },
  {
    name: "Review-Radar",
    price: "290",
    description:
      "Automatisches Bewertungsmanagement – mehr 5-Sterne-Bewertungen, weniger Aufwand.",
    icon: "IconStar",
  },
  {
    name: "Live-Pulse Dashboard",
    price: "inkl.",
    description:
      "Echtzeit-Überblick über Website-Besucher, Anrufe und Bewertungen.",
    icon: "IconChartBar",
  },
] as const;

// =============================================================================
// LEISTUNGEN – SERVICE TABS
// =============================================================================

export const SERVICES = {
  webseiten: {
    title: "Webseiten",
    items: [
      {
        title: "One-Pager",
        description: "Kompakte Website mit allen wichtigen Informationen auf einer Seite.",
        price: "ab 950",
      },
      {
        title: "Mehrseitige Website",
        description: "Professioneller Webauftritt mit mehreren Unterseiten und SEO.",
        price: "ab 1.950",
      },
      {
        title: "Landing Page",
        description: "Conversion-optimierte Seite für Kampagnen und Aktionen.",
        price: "ab 690",
      },
    ],
  },
  ecommerce: {
    title: "E-Commerce",
    items: [
      {
        title: "Shopify Shop",
        description: "Professioneller Online-Shop mit Shopify – schnell, skalierbar, sicher.",
        price: "ab 1.200",
      },
      {
        title: "WooCommerce Shop",
        description: "WordPress-basierter Online-Shop mit voller Flexibilität.",
        price: "ab 1.500",
      },
    ],
  },
  design: {
    title: "Design & Branding",
    items: [
      {
        title: "Logo Design",
        description: "Einzigartiges Logo, das Ihren Betrieb repräsentiert.",
        price: "ab 450",
      },
      {
        title: "Corporate Design",
        description: "Visitenkarten, Briefpapier, Fahrzeugbeschriftung – alles aus einem Guss.",
        price: "ab 890",
      },
    ],
  },
  office: {
    title: "Office & KI",
    items: [
      {
        title: "Microsoft 365 Setup",
        description: "E-Mail, Teams, OneDrive – professionell eingerichtet und erklärt.",
        price: "ab 290",
      },
      {
        title: "KI-Schulung",
        description: "Wie Sie ChatGPT, Copilot und andere KI-Tools produktiv nutzen.",
        price: "ab 190",
      },
      {
        title: "Digitaler Hausmeister",
        description:
          "10 Stunden Tech-Support, flexibel einsetzbar. Wie ein Hausmeister – aber für Ihre IT.",
        price: "850",
      },
    ],
  },
  marketing: {
    title: "Marketing",
    items: [
      {
        title: "Google Ads",
        description: "Bezahlte Anzeigen, die sofort Kunden bringen.",
        price: "ab 490",
      },
      {
        title: "Social Recruiting",
        description: "Mitarbeiter finden über Social Media – dort, wo sie sich aufhalten.",
        price: "ab 690",
      },
    ],
  },
  wartung: {
    title: "Wartung",
    items: [
      {
        title: "Basis-Wartung",
        description: "Updates, Backups, Monitoring – Ihre Website bleibt sicher.",
        price: "ab 45/Monat",
      },
      {
        title: "Premium-Wartung",
        description: "Alles aus Basis plus 2 Stunden Support und Content-Updates.",
        price: "ab 180/Monat",
      },
    ],
  },
} as const;

// =============================================================================
// TEAM
// =============================================================================

export const TEAM = [
  {
    name: "Lennard Meyer",
    role: "Tech & Entwicklung",
    initials: "LM",
    description:
      "Full-Stack-Entwickler mit Leidenschaft für sauberen Code und durchdachte Lösungen. Verantwortlich für Webentwicklung, KI-Integration und technische Infrastruktur.",
  },
  {
    name: "Daniel Hamburg",
    role: "Strategie & Kundenbeziehung",
    initials: "DH",
    description:
      "Stratege mit Blick fürs Wesentliche. Verantwortlich für Kundenberatung, Projektplanung und die Verbindung zwischen Technik und Geschäftserfolg.",
  },
] as const;

// =============================================================================
// WERTE
// =============================================================================

export const VALUES = [
  {
    title: "Ehrlichkeit",
    description: "Wir sagen, was geht – und was nicht. Keine leeren Versprechen.",
    icon: "IconHeart",
  },
  {
    title: "Pragmatismus",
    description: "Die beste Lösung ist die, die funktioniert. Nicht die komplizierteste.",
    icon: "IconTool",
  },
  {
    title: "Nähe",
    description: "Wir sind vor Ort, sprechen Ihre Sprache und verstehen Ihre Branche.",
    icon: "IconMapPin",
  },
  {
    title: "Verlässlichkeit",
    description: "Was wir zusagen, halten wir. Termine, Preise, Ergebnisse.",
    icon: "IconShield",
  },
] as const;

// =============================================================================
// ÜBER UNS – KENNZAHLEN & STANDORT
// =============================================================================

export const UEBER_UNS_STATS = [
  { value: "2026", label: "Gegründet" },
  { value: "2", label: "Macher" },
  { value: "100%", label: "Erzgebirge" },
  { value: "24/7", label: "KI-Telefon" },
] as const;

export const EINZUGSGEBIET_ORTE = [
  "Aue-Bad Schlema",
  "Annaberg-Buchholz",
  "Stollberg",
  "Schwarzenberg",
  "Marienberg",
  "Erzgebirgskreis",
] as const;

// =============================================================================
// KONTAKT – ANFAHRT
// =============================================================================

export const ANFAHRT = {
  auto: "Kostenlose Parkmöglichkeiten in der Nähe. Wir arbeiten überwiegend remote und kommen zu Ihnen – kurze Wege im gesamten Erzgebirgskreis.",
  oepnv: "Aue-Bad Schlema ist mit Bus und Bahn erreichbar. Für ein persönliches Treffen vereinbaren wir einen Termin – wir kommen auch zu Ihnen.",
  hinweis: "Wir arbeiten digital und persönlich. Kurze Wege im gesamten Erzgebirgskreis – wir kommen zu Ihnen.",
} as const;

// =============================================================================
// KONTAKT – BETREFF-OPTIONEN
// =============================================================================

export const CONTACT_SUBJECTS = [
  "Webseite erstellen",
  "Online-Shop",
  "Handwerks-Paket",
  "Digitaler Hausmeister",
  "Design & Branding",
  "Sonstiges",
] as const;

// =============================================================================
// META-DATA PER PAGE
// =============================================================================

export const PAGE_META = {
  home: {
    title: "Berneby Solutions – Ihr Digital-Partner im Erzgebirge",
    description:
      "Berneby Solutions macht lokale Betriebe im Erzgebirge online sichtbar und automatisiert das, was Zeit frisst. Webseiten, KI-Telefon, SEO – alles aus einer Hand.",
  },
  handwerk: {
    title: "Webseiten & Digitalisierung für Handwerker",
    description:
      "Mehr Aufträge, weniger Aufwand: Handwerks-Pakete mit Website, KI-Telefonassistent und Google-Sichtbarkeit. Ab 950 \u20AC.",
  },
  ueberUns: {
    title: "Über uns – Zwei Macher, ein Ziel",
    description:
      "Lennard Meyer (Tech) und Daniel Hamburg (Strategie) – wir machen lokale Betriebe digital erfolgreich. Aus Aue-Bad Schlema im Erzgebirge.",
  },
  kontakt: {
    title: "Kontakt – Sprechen Sie mit uns",
    description:
      "Kostenloses Erstgespräch vereinbaren. Rufen Sie an oder schreiben Sie uns – wir melden uns innerhalb von 24 Stunden.",
  },
} as const;
