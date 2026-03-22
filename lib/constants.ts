// =============================================================================
// BERNEBY SOLUTIONS – CENTRAL DATA CONSTANTS
// =============================================================================

/** Gleiche Breite/Padding wie GridBeams – Logo und Header-Button bündig mit den Beams */
export const BEAM_CONTAINER_CLASS =
  "mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6 lg:px-8";

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
    href: "https://www.facebook.com/bernebysolutions",
    ariaLabel: "Berneby Solutions auf Facebook",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/4915511960927",
    ariaLabel: "Berneby Solutions per WhatsApp Business kontaktieren",
  },
  {
    label: "Google",
    href: "https://g.page/r/bernebysolutions",
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
// CTA-SECTION – Zitate pro Hauptseite (abwechselnd LM/Daniel, einheitliche Zeichenlänge)
// =============================================================================

export const CTA_QUOTES = {
  home: {
    quote: "Wir bauen keine Luftschlösser – wir bauen, was funktioniert.",
    author: "Lennard Meyer",
    initials: "LM",
    image: "/team/lennard-meyer.webp",
  },
  handwerk: {
    quote: "Mehr Sichtbarkeit, weniger Zeitfresser – dafür gehen wir ran.",
    author: "Daniel Hamburg",
    initials: "DH",
    image: "/team/daniel-hamburg.webp",
  },
  tech: {
    quote: "Moderne Technik muss Arbeit abnehmen. Sonst ist sie nutzlos.",
    author: "Lennard Meyer",
    initials: "LM",
    image: "/team/lennard-meyer.webp",
  },
  referenzen: {
    quote: "Echte Ergebnisse zählen. Was wir versprechen, liefern wir.",
    author: "Daniel Hamburg",
    initials: "DH",
    image: "/team/daniel-hamburg.webp",
  },
  "ueber-uns": {
    quote: "Digital-Partner von hier für hier – auf Augenhöhe, kein Blabla.",
    author: "Lennard Meyer",
    initials: "LM",
    image: "/team/lennard-meyer.webp",
  },
} as const;

// =============================================================================
// NAVIGATION
// =============================================================================

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Handwerk", href: "/handwerk" },
  { label: "Tech", href: "/tech" },
  { label: "Referenzen", href: "/referenzen" },
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
// HOME PAGE – HERO
// =============================================================================

export const HOME_HERO = {
  headline: "Technik, die dein Geschäft nach vorne bringt.",
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
  { value: "50+", label: "Orte" },
  { value: "2", label: "Ansprechpartner" },
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
  { value: "50+", label: "Projekte" },
  { value: "24/7", label: "IT-Support" },
  { value: "100%", label: "Erzgebirge" },
  { value: "2", label: "Ansprechpartner" },
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
  { value: "50+", label: "Orte" },
  { value: "100%", label: "Lokal" },
] as const;

export const HANDWERK_GARANTIEN = [
  {
    title: "Festpreis bis Abnahme",
    description: "Der Preis, den wir nennen, ist der Preis, den Sie zahlen. Keine versteckten Kosten, keine Nachforderungen – was im Angebot steht, gilt.",
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
      "Wir bieten die Projektpakete STARTKLAR (ab 600 €), SICHTBAR (1.000 €) und PARTNER (2.000 €) mit transparenten Leistungsinhalten. Alle Details finden Sie auf unserer Handwerk-Seite. Für individuelle Webprojekte erstellen wir ein unverbindliches Angebot im Erstgespräch.",
  },
  {
    question: "Arbeitet ihr nur mit Handwerkern?",
    answer:
      "Nein. Handwerk ist unser Spezialgebiet, aber wir unterstützen alle lokalen Betriebe – vom Einzelhändler bis zum Freiberufler.",
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
      "Eine 10er-Stundenkarte für 850 \u20AC. Sie rufen an, wenn etwas klemmt – Excel-Problem, Website-Frage, Software-Setup. Wir helfen. 12 Monate gültig.",
  },
  {
    question: "Bietet ihr auch Wartung an?",
    answer:
      "Ja. Wir bieten Wartung und Support in verschiedenen Varianten – von der reinen Absicherung bis inklusive Support-Stunden. Die genauen Optionen besprechen wir im Erstgespräch.",
  },
  {
    question: "Könnt ihr auch einen Online-Shop einrichten?",
    answer:
      "Ja. Wir arbeiten mit Shopify und WooCommerce. Den Umfang und die Kosten legen wir gemeinsam im Angebot fest.",
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
    price: "600",
    unit: "einmalig",
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
    price: "1.000",
    unit: "einmalig",
    description: "Erweiterter Auftritt mit Branding, SEO-Grundlagen & Social.",
    features: [
      "Alles aus STARTKLAR",
      "Logo-Entwicklung & Basis-Markendesign",
      "Analyse der Online-Sichtbarkeit",
      "SEO-Grundlagen (z. B. 3 Schlüsselseiten)",
      "Setup von bis zu 2 Social-Media-Kanälen",
    ],
    highlighted: true,
    badge: "Bestseller".trim(),
  },
  {
    name: "PARTNER",
    price: "2.000",
    unit: "einmalig",
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
    price: "350",
    description:
      "Moderne Website mit gezielten lokalen Landingpages – Ihr Betrieb wird im relevanten Umkreis besser gefunden.",
    icon: "IconMapPin",
  },
  {
    name: "KI-Empfang",
    price: "690",
    description:
      "KI-gestützter digitaler Empfang: nimmt Anfragen (Telefon, Formulare) entgegen, vorsortiert und dokumentiert.",
    icon: "IconPhoneCall",
  },
  {
    name: "5-Sterne-Plus",
    price: "290",
    description:
      "Bewertungs- und Reputationsmanagement: strukturierter Umgang mit Online-Bewertungen, Anstoß neuer Bewertungen.",
    icon: "IconStar",
  },
  {
    name: "Kennzahlen-Live",
    price: "inkl.",
    description:
      "Einfacher Zugriff auf die wichtigsten Kennzahlen (Website-Besucher, Anfragen, Bewertungen) in einem klaren Dashboard.",
    icon: "IconChartBar",
  },
] as const;

// =============================================================================
// LEISTUNGEN – SERVICE TABS
// =============================================================================

/** Nur Webseiten-Arten und Digitaler Hausmeister fürs Tech-Leistungsgrid (ohne Paketnamen) */
export const LEISTUNGSGRID_TECH = [
  {
    key: "webseiten",
    title: "Webseiten",
    items: [
      {
        title: "One-Pager",
        description: "Kompakte Website mit allen wichtigen Infos auf einer Seite.",
        price: "ab 600",
      },
      {
        title: "Mehrseitige Website",
        description: "Professioneller Webauftritt mit mehreren Unterseiten und SEO.",
        price: "ab 1.000",
      },
      {
        title: "Landing Page",
        description: "Conversion-optimierte Seite für Kampagnen und Aktionen.",
        price: "ab 690",
      },
    ],
  },
  {
    key: "hausmeister",
    title: "Digitaler Hausmeister",
    items: [
      {
        title: "10er-Karte Support",
        description: "10 Stunden Tech-Support, flexibel einsetzbar. Web, Office, Notfälle – 12 Monate gültig.",
        price: "850",
      },
    ],
  },
] as const;

export const SERVICES = {
  webseiten: {
    title: "Webseiten",
    items: [
      {
        title: "One-Pager",
        description: "Kompakte Website mit allen wichtigen Informationen auf einer Seite.",
        price: "ab 600",
      },
      {
        title: "Mehrseitige Website",
        description: "Professioneller Webauftritt mit mehreren Unterseiten und SEO.",
        price: "ab 1.000",
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
// ÜBER UNS – WARUM BERNEBY & VISION/MISSION (V3-Statement-Layout)
// =============================================================================

export const WARUM_BERNEBY = [
  { point: "Persönlich", detail: "Keine Ticketnummer. Sie sprechen direkt mit Ihren Ansprechpartnern." },
  { point: "Lokal", detail: "Aus dem Erzgebirge, für das Erzgebirge. Kurze Wege, echtes Verständnis." },
  { point: "Fair", detail: "Transparente Preise. Kein Kleingedrucktes, keine Überraschungen." },
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
    description:
      "Full-Stack-Entwicklung, Architektur und Infrastruktur. Operative Projektsteuerung, Qualitätskontrolle, Buchhaltung und Finanzen. Technische Konzeption von Automatisierungen und IT-Services (z. B. KI-Empfang, Digitaler Hausmeister).",
  },
  {
    name: "Daniel Hamburg",
    role: "Kunden & Markt / Online-Marketing",
    initials: "DH",
    image: "/team/daniel-hamburg.webp",
    description:
      "Kundenberatung, Anforderungsaufnahme und Projektplanung. Akquise und Beziehungsaufbau zu lokalen Betrieben. Entwicklung und Umsetzung von Online-Marketing-Strategien. Sicherstellung der Kundenzufriedenheit und Ausbau-Potenzial.",
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
    description: "Moderner Tech-Stack, saubere Implementierung, belastbare Ergebnisse.",
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

export const UEBER_UNS_STATS = [
  { value: "2025", label: "Gegründet" },
  { value: "2", label: "Ansprechpartner" },
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
    title: "Webdesign & IT-Service Erzgebirge | Berneby Solutions",
    description:
      "Websites, KI-Telefon & lokale SEO für Handwerker im Erzgebirge. Ab 950 € – Festpreis, 4 Wochen bis Go-Live. Kostenloses Erstgespräch.",
  },
  handwerk: {
    title: "Website für Handwerker ab 950 € | Berneby Solutions Erzgebirge",
    description:
      "Handwerker-Websites mit 50+ lokalen Landingpages, KI-Telefonassistent & Google Ads. Festpreis, 4 Wochen bis Go-Live. Jetzt Erstgespräch buchen.",
  },
  tech: {
    title: "IT-Service & Webentwicklung Erzgebirge | Berneby Solutions",
    description:
      "Webseiten, Online-Shops, Microsoft 365, KI-Schulung & IT-Support für KMU im Erzgebirge. Digitaler Hausmeister ab 850 €. Jetzt beraten lassen.",
  },
  ueberUns: {
    title: "Über Berneby Solutions – Lennard Meyer & Daniel Hamburg | Erzgebirge",
    description:
      "Lennard Meyer (Tech) und Daniel Hamburg (Strategie) – wir machen lokale Betriebe digital erfolgreich. Aus Aue-Bad Schlema im Erzgebirge.",
  },
  kontakt: {
    title: "Kontakt & Erstgespräch | Berneby Solutions Erzgebirge",
    description:
      "Kostenloses Erstgespräch vereinbaren. Rufen Sie an oder schreiben Sie uns – wir melden uns innerhalb von 24 Stunden.",
  },
  ratgeber: {
    title: "Ratgeber: Digitalisierung & IT für Handwerker | Berneby Solutions",
    description:
      "Praxis-Leitfäden zu SEO, KI-Telefonassistent, Microsoft 365, lokaler Sichtbarkeit & mehr. Aus dem Erzgebirge für Handwerker und KMU.",
  },
} as const;
