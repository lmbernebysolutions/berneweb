// =============================================================================
// BERNEBY SOLUTIONS – CENTRAL DATA CONSTANTS
// =============================================================================

/** Gleiche Breite/Padding wie GridBeams – Logo und Header-Button bündig mit den Beams */
export const BEAM_CONTAINER_CLASS =
  "mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6 lg:px-8";

/** Canonical Production-URL (Sitemap, Open Graph, JSON-LD, Breadcrumbs) */
export const SITE_URL = "https://www.bernebysolutions.de" as const;

/**
 * Basis-URL für Next.js `metadataBase` (Favicons, OG-Bilder als absolute URLs).
 * Auf Vercel-Previews (`*.vercel.app`) muss das die Deployment-URL sein – sonst zeigen Browser
 * weiter das Favicon von www.bernebysolutions.de (oder einen leeren Fallback / Vercel-Standard).
 */
export function getMetadataBaseUrl(): string {
  if (process.env.VERCEL_ENV === "production") {
    return SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

// =============================================================================
// SOCIAL MEDIA LINKS – URLs hier zentral pflegen
// =============================================================================
export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bernebysolutions",
    ariaLabel: "Berneby Solutions auf Instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/bernebysolutions/",
    ariaLabel: "Berneby Solutions auf Facebook",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/4915511960927",
    ariaLabel: "Berneby Solutions per WhatsApp Business kontaktieren",
  },
  {
    label: "Google",
    href: "https://share.google/8BZjFb7920r2P0ULk",
    ariaLabel: "Berneby Solutions Google Unternehmensprofil",
  },
] as const;

export const COMPANY = {
  name: "Berneby Solutions",
  nameShort: "Berneby",
  legal: "Lennard Meyer & Daniel Hamburg Solutions GbR",
  rechtsform: "GbR",
  phone: "+49 15511 960927",
  phoneDisplay: "+49 15511 960927",
  email: "info@bernebysolutions.de",
  location: "Aue-Bad Schlema",
  streetAddress: "Altmarkt 5",
  postalCode: "08280",
  address: "Altmarkt 5, 08280 Aue-Bad Schlema",
  region: "Erzgebirgskreis",
  state: "Sachsen",
  country: "Deutschland",
  founders: [
    { name: "Lennard Meyer", role: "Technische Leitung (51%)", share: "51%" },
    { name: "Daniel Hamburg", role: "Strategie & Vertrieb (49%)", share: "49%" },
  ],
  founded: "2025",
  representation: "Jeder Gesellschafter ist einzeln vertretungsberechtigt.",
  gewerbeBehoerde: "Gemeinde Aue-Bad Schlema (Gemeindekennzahl 14521035)",
} as const;

// =============================================================================
// VISITENKARTE – RÜCKSEITE (ANSPRECHPARTNER & USPs)
// =============================================================================
export const VISITENKARTE_BACK = {
  contactName: "Daniel Hamburg",
  contactTitle: "Strategie & Vertrieb",
  uspItems: [
    "Websites, Online-Shops und konsistentes Branding.",
    "IT-Service, Automatisierung und KI-Workflows.",
    "SEO, Marketing und hohe Sichtbarkeit.",
  ],
} as const;

// =============================================================================
// NAVIGATION
// =============================================================================

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Für Handwerk", href: "/handwerk" },
  { label: "Referenzen", href: "/referenzen" },
] as const;

export const FOOTER_NAV = {
  leistungen: [
    { label: "Webseiten", href: "/leistungen#leistungen" },
    { label: "E-Commerce", href: "/leistungen#leistungen" },
    { label: "Design & Branding", href: "/leistungen#leistungen" },
    { label: "Office & IT-Support", href: "/leistungen#leistungen" },
    { label: "Online-Marketing", href: "/leistungen#leistungen" },
    { label: "Digitaler Hausmeister", href: "/leistungen#leistungen" },
  ],
  unternehmen: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Referenzen", href: "/referenzen" },
    { label: "Ratgeber", href: "/ratgeber" },
    { label: "Standorte", href: "/standorte" },
    { label: "Branchen", href: "/branchen" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
} as const;

// =============================================================================
// TRUST BAR
// =============================================================================

export const TRUST_BAR = [
  { value: "100%", label: "Lokal" },
  { value: "24/7", label: "KI-Telefon" },
  { value: "10 Tage", label: "Go-Live" },
  { value: "2", label: "Ansprechpartner" },
] as const;

// =============================================================================
// TECH STACK / PARTNER (Home, Tech)
// =============================================================================

/** Mit Kundennutzen für Nicht-Techniker (V3: Nutzenzeile unter Tech-Namen) */
export const TECH_STACK_WITH_BENEFIT = [
  { name: "Next.js", benefit: "Blitzschnelle Ladezeiten" },
  { name: "React", benefit: "Moderne, wartbare Oberflächen" },
  { name: "Cursor", benefit: "Schnellere Entwicklung mit AI-Unterstützung" },
  { name: "Microsoft 365", benefit: "Office & E-Mail aus einer Hand" },
  { name: "Adobe", benefit: "Markenstarkes Design in der Creative Cloud" },
  { name: "KI-Integration", benefit: "Telefon, Chat, Automatisierung" },
] as const;

/** Tech-Seite: TrustBar-Kennzahlen (1:1 wie Über-uns, Inhalt angepasst) */
export const TECH_STATS = [
  { value: "5+", label: "Tools" },
  { value: "On-Call", label: "IT-Support" },
  { value: "100%", label: "Erzgebirge" },
  { value: "2", label: "Ansprechpartner" },
] as const;

// =============================================================================
// REFERENZEN – BRANCHEN / FÜR WEN WIR ARBEITEN (Home, Handwerk)
// =============================================================================

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
    question: "Für wen sind eure Leistungen gedacht?",
    answer:
      "Unsere Standard-Leistungen (Webseiten, Online-Shops, Office & IT-Support, Online-Marketing) passen für Praxen, Dienstleister, Einzelhandel und KMU aller Branchen. Für Handwerksbetriebe haben wir zusätzlich spezielle Pakete – dazu der eigene Bereich „Für Handwerk“ in der Navigation.",
  },
  {
    question: "Arbeitet ihr nur im Erzgebirge?",
    answer:
      "Unser Fokus liegt auf dem Erzgebirge – wir kommen vor Ort. Unsere Wurzeln liegen tief im Erzgebirge, wie ein guter Stollen. Für reine Online-Projekte arbeiten wir auch überregional.",
  },
] as const;

// =============================================================================
// TECH SEITE – TESTIMONIALS & REFERENZEN
// =============================================================================

export const TECH_TESTIMONIALS = [
  {
    name: "Anne-Karen Voigt",
    role: "Ergotherapie",
    text: "Professionelles, nettes Team – zügig und unkompliziert. Moderne, patientenfreundliche Website. Immer wieder gerne!",
    result: "Website für Praxis",
  },
  {
    name: "Sylvia Schirmer",
    role: "Arztpraxis",
    text: "Hervorragende Arbeit: moderne, intuitive und patientenfreundliche Website. Unkomplizierte Zusammenarbeit, Änderungen umgehend. Wärmstens weiterempfehlen!",
    result: "Website-Relaunch",
  },
] as const;

// =============================================================================
// HANDWERK SEITE – KENNZAHLEN & GARANTIEN
// =============================================================================

export const HANDWERK_STATS = [
  { value: "4", label: "Wochen bis Go-Live" },
  { value: "24/7", label: "KI-Telefon" },
  { value: "50+", label: "Orte" },
  { value: "100%", label: "Lokal" },
] as const;

export const HANDWERK_GARANTIEN = [
  {
    title: "Festpreis bis Abnahme",
    description: "Klare Konditionen bis zur Abnahme. Keine versteckten Positionen, keine Nachforderungen – was im Angebot steht, gilt.",
  },
  {
    title: "12 Monate Support inklusive",
    description: "Nach dem Launch sind wir für Sie da. Updates, kleine Anpassungen und Support sind im Paket bereits enthalten – ohne Aufpreis.",
  },
  {
    title: "Kein Kleingedrucktes",
    description: "Transparente Verträge. Sie wissen immer, wofür Sie zahlen und was Sie bekommen. Keine Überraschungen.",
  },
] as const;

// =============================================================================
// OHNE UNS / MIT UNS – Home & Handwerk (4 Zeilen, Problem + Solution)
// =============================================================================

export const OHNE_UNS_ROWS = [
  { label: "Sichtbarkeit", val: "Unsichtbar im Netz", risk: "Hoch" },
  { label: "Kundenkontakt", val: "Verpasste Anrufe = verlorenes Geld", risk: "Kritisch" },
  { label: "Online Reputation", val: "Keine Kontrolle über Bewertungen", risk: "Neutral" },
  { label: "Außendarstellung", val: "Baukasten-Design von 2010", risk: "Mittel" },
] as const;

export const MIT_UNS_ROWS = [
  { label: "Sichtbarkeit", val: "Top-Platzierung & Seite 1 Fokus", gain: "+300%" },
  { label: "Kundenkontakt", val: "KI-Empfang nimmt 24/7 Anrufe an", gain: "100%" },
  { label: "Online Reputation", val: "Automatisierte 5-Sterne-Systeme", gain: "Max" },
  { label: "Außendarstellung", val: "Premium Design & Branding", gain: "High" },
] as const;

// =============================================================================
// HOME – SEKTION 02: STANDARD-LEISTUNGEN & HANDWERK-SPEZIALBLOCK
// =============================================================================

/**
 * Auswahl der 4 SERVICES-Kategorien, die auf der Startseite in Sektion 02
 * als Standard-Leistungskatalog gezeigt werden (2×2-Grid, Card-Komponente 1:1
 * wie auf /leistungen). Reihenfolge = Anzeige-Reihenfolge.
 */
export const HOME_STANDARD_SERVICE_KEYS = [
  "webseiten",
  "ecommerce",
  "office",
  "marketing",
] as const;

/**
 * Separater „Spezialfall: Handwerk"-Block unter der Standard-Service-Grid.
 * Macht klar: Handwerk ist eine Vertikale unserer Standardleistungen, kein
 * paralleles Angebot.
 */
export const HANDWERK_SPECIALTY = {
  eyebrow: "Spezialfall",
  title: "Du bist aus dem Handwerk?",
  description:
    "Zusätzlich zu unseren Standard-Leistungen haben wir Pakete, die speziell für die Anforderungen von Handwerksbetrieben entwickelt wurden – inkl. Klick-Dominator, KI-Empfang und Bewertungs-Automation.",
  bullets: [
    "Lokale Landingpages für 50+ Orte",
    "KI-Telefonassistent für verpasste Anrufe",
    "Google-Bewertungsmanagement",
    "Klick-Dominator für lokale Sichtbarkeit",
  ],
  cta: { label: "Handwerks-Pakete ansehen", href: "/handwerk" },
} as const;

// =============================================================================
// PROZESS
// =============================================================================

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Discovery",
    description:
      "Aufnahme von Ist-Situation, Zielen und Pain Points. Kostenloses Erstgespräch – unverbindlich.",
  },
  {
    step: 2,
    title: "Konzeption",
    description:
      "Ausarbeitung eines schlanken Konzepts – z. B. Website-Struktur, Automatisierungs-Ansatz, Leistungsumfang.",
  },
  {
    step: 3,
    title: "Umsetzung",
    description:
      "Technische Realisierung (Development, Einrichtung, Integration) und Umsetzung der vereinbarten Maßnahmen.",
  },
  {
    step: 4,
    title: "Review",
    description:
      "Gemeinsame Durchsicht mit Ihnen, Feinschliff und Funktionsprüfung. Sie geben Feedback, wir setzen um.",
  },
  {
    step: 5,
    title: "Übergabe & Betrieb",
    description:
      "Go-Live sowie Aktivierung der Services. Bei laufenden Paketen: Übergang in den Regelbetrieb.",
  },
] as const;

// =============================================================================
// FAQ
// =============================================================================

export const FAQ_ITEMS = [
  {
    question: "Was kostet eine Website bei Berneby Solutions?",
    answer:
      "Wir bieten die Projektpakete STARTKLAR, SICHTBAR und PARTNER mit transparenten Leistungsinhalten. Alle Details und den passenden Umfang klären wir im unverbindlichen Erstgespräch.",
  },
  {
    question: "Arbeitet ihr nur mit Handwerkern?",
    answer:
      "Nein. Handwerk ist unser Spezialgebiet, aber wir unterstützen ebenso Praxen, Dienstleister, Einzelhandel und weitere KMU im Erzgebirge und darüber hinaus.",
  },
  {
    question: "Was ist der Klick-Dominator?",
    answer:
      "Ein Paket zur Steigerung der lokalen Sichtbarkeit: moderne Website, strukturierte Inhalte und gezielte lokale Landingpages, damit Ihr Betrieb im relevanten Umkreis besser gefunden wird.",
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
      "Ein One-Pager ist in 1–2 Wochen fertig. Größere Projekte mit Klick-Dominator (lokale Landingpages) dauern ca. 3–4 Wochen.",
  },
  {
    question: "Was ist der Digitale Hausmeister?",
    answer:
      "Eine 10er-Stundenkarte. Sie rufen an, wenn etwas klemmt – Excel-Problem, Website-Frage, Software-Setup. Wir helfen. Details und Konditionen besprechen wir im Erstgespräch.",
  },
  {
    question: "Bietet ihr auch Wartung an?",
    answer:
      "Ja. Wir bieten Wartung und Support in verschiedenen Varianten – von der reinen Absicherung bis inklusive Support-Stunden. Die genauen Optionen besprechen wir im Erstgespräch.",
  },
  {
    question: "Könnt ihr auch einen Online-Shop einrichten?",
    answer:
      "Ja. Wir arbeiten mit Shopify und WooCommerce. Umfang und Konditionen legen wir gemeinsam im Erstgespräch fest.",
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
    name: "STARTKLAR",
    price: "Erstgespräch",
    unit: "individuell",
    description: "Basis-Webauftritt für lokale Sichtbarkeit.",
    features: [
      "Basis-Strategie-Workshop",
      "Individuelles Webdesign (UI)",
      "Technische Website-Entwicklung",
      "CMS zur Inhaltspflege",
      "Google Unternehmensprofil (Setup & Optimierung)",
      "Anwenderschulung (ca. 60 Min.)",
    ],
    highlighted: false,
  },
  {
    name: "SICHTBAR",
    price: "Erstgespräch",
    unit: "individuell",
    description: "Erweiterter Auftritt mit Branding, SEO-Grundlagen & Social.",
    features: [
      "Alles aus STARTKLAR",
      "Logo-Entwicklung & Basis-Markendesign",
      "Analyse der Online-Sichtbarkeit",
      "SEO-Grundlagen (z. B. 3 Schlüsselseiten)",
      "Setup von bis zu 2 Social-Media-Kanälen",
    ],
    highlighted: true,
  },
  {
    name: "PARTNER",
    price: "Erstgespräch",
    unit: "individuell",
    description: "Komplettpaket mit Individualfunktionen & Start in die Betreuung.",
    features: [
      "Alles aus SICHTBAR",
      "Individuelle Funktionen & Logik (Backend)",
      "Anbindung eines externen Dienstes (z. B. Buchungstool)",
      "Strategische Inhaltsplanung",
      "Start mit definiertem Betreuungszeitraum",
    ],
    highlighted: false,
  },
] as const;

// =============================================================================
// HANDWERK – USP MODULE
// =============================================================================

export const CRAFT_MODULES = [
  {
    name: "Klick-Dominator",
    price: "Erstgespräch",
    description:
      "Moderne Website mit gezielten lokalen Landingpages – Ihr Betrieb wird im relevanten Umkreis besser gefunden.",
    icon: "IconMapPin",
  },
  {
    name: "KI-Empfang",
    price: "Erstgespräch",
    description:
      "KI-gestützter digitaler Empfang: nimmt Anfragen (Telefon, Formulare) entgegen, vorsortiert und dokumentiert.",
    icon: "IconPhoneCall",
  },
  {
    name: "5-Sterne-Plus",
    price: "Erstgespräch",
    description:
      "Bewertungs- und Reputationsmanagement: strukturierter Umgang mit Online-Bewertungen, Anstoß neuer Bewertungen.",
    icon: "IconStar",
  },
  {
    name: "Kennzahlen-Live",
    price: "Im Erstgespräch",
    description:
      "Einfacher Zugriff auf die wichtigsten Kennzahlen (Website-Besucher, Anfragen, Bewertungen) in einem klaren Dashboard.",
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
        price: "Erstgespräch",
      },
      {
        title: "Mehrseitige Website",
        description: "Professioneller Webauftritt mit mehreren Unterseiten und SEO.",
        price: "Erstgespräch",
      },
      {
        title: "Landing Page",
        description: "Conversion-optimierte Seite für Kampagnen und Aktionen.",
        price: "Erstgespräch",
      },
    ],
  },
  ecommerce: {
    title: "E-Commerce",
    items: [
      {
        title: "Shopify Shop",
        description: "Professioneller Online-Shop mit Shopify – schnell, skalierbar, sicher.",
        price: "Erstgespräch",
      },
      {
        title: "WooCommerce Shop",
        description: "WordPress-basierter Online-Shop mit voller Flexibilität.",
        price: "Erstgespräch",
      },
    ],
  },
  design: {
    title: "Design & Branding",
    items: [
      {
        title: "Logo Design",
        description: "Einzigartiges Logo, das Ihren Betrieb repräsentiert.",
        price: "Erstgespräch",
      },
      {
        title: "Corporate Design",
        description: "Visitenkarten, Briefpapier, Fahrzeugbeschriftung – alles aus einem Guss.",
        price: "Erstgespräch",
      },
    ],
  },
  office: {
    title: "Office & KI",
    items: [
      {
        title: "Microsoft 365 Setup",
        description: "E-Mail, Teams, OneDrive – professionell eingerichtet und erklärt.",
        price: "Erstgespräch",
      },
      {
        title: "KI-Schulung",
        description: "Wie Sie ChatGPT, Copilot und andere KI-Tools produktiv nutzen.",
        price: "Erstgespräch",
      },
      {
        title: "Digitaler Hausmeister",
        description:
          "10 Stunden Tech-Support, flexibel einsetzbar. Wie ein Hausmeister – aber für Ihre IT.",
        price: "Erstgespräch",
      },
    ],
  },
  marketing: {
    title: "Marketing",
    items: [
      {
        title: "Google Ads",
        description: "Bezahlte Anzeigen, die sofort Kunden bringen.",
        price: "Erstgespräch",
      },
      {
        title: "Social Recruiting",
        description: "Mitarbeiter finden über Social Media – dort, wo sie sich aufhalten.",
        price: "Erstgespräch",
      },
    ],
  },
  wartung: {
    title: "Wartung",
    items: [
      {
        title: "Basis-Wartung",
        description: "Updates, Backups, Monitoring – Ihre Website bleibt sicher.",
        price: "Erstgespräch",
      },
      {
        title: "Premium-Wartung",
        description: "Alles aus Basis plus 2 Stunden Support und Content-Updates.",
        price: "Erstgespräch",
      },
    ],
  },
} as const;

// =============================================================================
// ÜBER UNS – WARUM BERNEBY & VISION/MISSION (V3-Statement-Layout)
// =============================================================================

export const WARUM_BERNEBY = [
  { point: "Persönlich", detail: "Keine Ticketnummer. Sie sprechen direkt mit Ihren Ansprechpartnern." },
  { point: "Lokal", detail: "Aus dem Erzgebirge, für das Erzgebirge. Kurze Wege, echtes Verständnis." },
  { point: "Fair", detail: "Transparente Konditionen. Kein Kleingedrucktes, keine Überraschungen." },
  { point: "Ganzheitlich", detail: "Von der Website über SEO bis zum KI-Telefon – alles aus einer Hand." },
] as const;

export const VISION_MISSION = [
  {
    label: "Vision",
    headline: "Digitalisierung als strategischer Vorteil",
    body: "Die Digitalisierung des regionalen Mittelstands von einer Hürde in einen strategischen Vorteil verwandeln – durch ehrliche Beratung, messbare Ergebnisse und modernste Technologie.",
  },
  {
    label: "Mission",
    headline: "Sichtbar machen. Zeitfresser automatisieren.",
    body: "Lokale Betriebe im Erzgebirge online sichtbar machen und zeitfressende Prozesse automatisieren – mit Web, SEO, IT-Service und KI aus einer Hand.",
  },
] as const;

// =============================================================================
// TEAM
// =============================================================================

export const TEAM = [
  {
    name: "Lennard Meyer",
    role: "Technik & Betrieb",
    initials: "LM",
    image: "/team/lennard-meyer.webp",
    responsibilities: [
      "Kundenberatung und technische Projektplanung.",
      "Full-Stack-Entwicklung, Architektur und Infrastruktur.",
      "Projektsteuerung und Qualitätskontrolle.",
    ],
  },
  {
    name: "Daniel Hamburg",
    role: "Kunden & Markt / Online-Marketing",
    initials: "DH",
    image: "/team/daniel-hamburg.webp",
    responsibilities: [
      "Kundenberatung und Projektplanung.",
      "Akquise und Betreuung lokaler Betriebe.",
      "Online-Marketing für Sichtbarkeit und Anfragen.",
    ],
  },
] as const;

// =============================================================================
// WERTE
// =============================================================================

export const VALUES = [
  {
    title: "Radikale Praxisnähe",
    description: "Keine Buzzwords, sondern eingesparte Stunden und gewonnene Kunden.",
    icon: "IconTool",
  },
  {
    title: "Lokale Verbundenheit",
    description: "Partner auf Augenhöhe – „von hier für hier“ im Erzgebirge.",
    icon: "IconMapPin",
  },
  {
    title: "Maschinelle Präzision",
    description: "Moderne Technik-Basis, saubere Implementierung, belastbare Ergebnisse.",
    icon: "IconShield",
  },
  {
    title: "Automatisierungs-Fokus",
    description: "Jede Lösung soll Arbeit abnehmen, nicht neue Arbeit erzeugen.",
    icon: "IconHeart",
  },
] as const;

// =============================================================================
// ÜBER UNS – KENNZAHLEN & STANDORT
// =============================================================================

export const EINZUGSGEBIET_ORTE = [
  "Aue-Bad Schlema",
  "Annaberg-Buchholz",
  "Stollberg",
  "Schwarzenberg",
  "Marienberg",
  "Erzgebirgskreis",
  "Schneeberg",
  "Zwönitz",
  "Lößnitz",
  "Oelsnitz",
  "Zschopau",
  "Olbernhau",
] as const;

// =============================================================================
// KONTAKT – ANFAHRT
// =============================================================================

// =============================================================================
// KONTAKT – BETREFF-OPTIONEN
// =============================================================================

// =============================================================================
// META-DATA PER PAGE
// =============================================================================

export const PAGE_META = {
  home: {
    title: "Webdesign & IT-Service Erzgebirge | Berneby Solutions",
    description:
      "Webseiten, Online-Shops, Office & IT-Support, Online-Marketing und KI-Telefon für KMU im Erzgebirge – mit speziellen Paketen für Handwerksbetriebe. Kostenloses Erstgespräch.",
  },
  handwerk: {
    title: "Webdesign & Digitalisierung für Handwerk",
    description:
      "Webdesign, KI-Telefon und lokale Sichtbarkeit fuer Handwerksbetriebe im Erzgebirge. Transparent geplant und im Erstgespraech passend auf Ihren Betrieb abgestimmt.",
  },
  leistungen: {
    title: "IT-Service & Webentwicklung Erzgebirge | Berneby Solutions",
    description:
      "Webseiten, Online-Shops, Microsoft 365, KI-Schulung & IT-Support für KMU im Erzgebirge. Digitaler Hausmeister inklusive Erstgespräch. Jetzt beraten lassen.",
  },
  ueberUns: {
    title: "Über Berneby Solutions – Lennard Meyer & Daniel Hamburg | Erzgebirge",
    description:
      "Lennard Meyer (Tech) und Daniel Hamburg (Strategie) – wir machen lokale Betriebe digital erfolgreich. Aus Aue-Bad Schlema im Erzgebirge.",
  },
  kontakt: {
    title: "Kontakt & Erstgespräch | Berneby Solutions Erzgebirge",
    description:
      "Kostenloses Erstgespräch vereinbaren. Rufen Sie an oder schreiben Sie uns – wir melden uns zeitnah persönlich zurück.",
  },
  ratgeber: {
    title: "Ratgeber: IT & Digitalisierung | Berneby Solutions",
    description:
      "Praxis-Leitfäden zu SEO, KI-Telefonassistent, Microsoft 365, lokaler Sichtbarkeit & mehr. Aus dem Erzgebirge für Handwerker und KMU.",
  },
} as const;
