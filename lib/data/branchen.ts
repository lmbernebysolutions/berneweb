/**
 * Branchen Pages – Programmatic SEO
 * Phase 3: Long-Term
 * @see TASKLIST_PHASE_3_LONG_TERM.md
 */

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface Branche {
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly typischeProbleme: readonly { problem: string; description: string }[];
  readonly loesungen: readonly string[];
  readonly suchbegriffe: readonly string[];
  readonly preisRelevant: string;
  readonly faqItems: readonly FaqItem[];
}

const BRANCHEN: Branche[] = [
  {
    name: "Elektriker",
    slug: "elektriker",
    description:
      "Elektriker im Erzgebirge stehen vor der Herausforderung, bei lokalen Suchanfragen wie „Elektriker Annaberg“ oder „Elektroinstallation Marienberg“ gefunden zu werden. 76% der Nutzer, die lokal suchen, besuchen innerhalb von 24 Stunden ein Geschäft – ohne professionelle Website und lokale SEO existieren Sie für diese Kunden praktisch nicht. Berneby Solutions unterstützt Elektrikermeister und -betriebe mit Websites, 50+ Landingpages und KI-Telefonassistent. Aus Aue-Bad Schlema für das gesamte Erzgebirge.",
    typischeProbleme: [
      {
        problem: "Auf der Baustelle – Anrufe gehen ins Leere",
        description:
          "Wenn Sie verkabeln oder Schaltkästen montieren, können Sie nicht rangehen. Jeder verpasste Anruf ist ein verlorener Auftrag. Kunden wählen den nächsten Elektriker.",
      },
      {
        problem: "Google kennt nur die Konkurrenz",
        description:
          "Ohne Website und lokale SEO ranken andere für „Elektriker Aue“ oder „Elektro Stollberg“. Sie sind unsichtbar – obwohl Sie vor Ort sind.",
      },
      {
        problem: "Bewertungen fehlen oder sind veraltet",
        description:
          "Kunden vertrauen Google-Bewertungen. Ohne aktives Bewertungsmanagement bleiben Sie hinter der Konkurrenz zurück.",
      },
    ],
    loesungen: [
      "50+ lokale Landingpages für jeden Ort im Einzugsgebiet",
      "KI-Telefonassistent für 24/7 Anrufannahme",
      "Google Business Profil optimiert",
      "Bewertungsmanagement (Review-Radar)",
    ],
    suchbegriffe: ["Elektriker Erzgebirge", "Elektroinstallation", "Elektrikermeister"],
    preisRelevant: "Handwerks-Pakete ab 950 € – Meisterbetrieb mit 50+ Landingpages ab 1.950 €.",
    faqItems: [
      {
        question: "Was kostet eine Website für Elektriker?",
        answer:
          "Unser Geselle-Paket (One-Pager) startet bei 950 € netto. Das Meisterbetrieb-Paket mit 50+ lokalen Landingpages und SEO kostet 1.950 €. Der Marktführer inkl. KI-Telefonassistent liegt bei 2.800 €.",
      },
      {
        question: "Wie lange dauert die Umsetzung?",
        answer:
          "Ein One-Pager ist in 1–2 Wochen fertig. Das Meisterbetrieb-Paket mit 50+ Landingpages dauert etwa 4 Wochen bis Go-Live.",
      },
      {
        question: "Funktioniert der KI-Telefonassistent für Notdienste?",
        answer:
          "Der Assistent nimmt Anrufe entgegen, erfasst Name, Anliegen und Rückrufnummer. Sie erhalten alles per Nachricht und rufen zurück. Ideal auch für Notdienst-Rufbereitschaft.",
      },
    ],
  },
  {
    name: "Dachdecker",
    slug: "dachdecker",
    description:
      "Dachdecker im Erzgebirge arbeiten oft auf dem Dach – wenn das Telefon klingelt, können sie nicht rangehen. Gleichzeitig suchen Hausbesitzer nach „Dachdecker Marienberg“ oder „Dachsanierung Annaberg“. Ohne Website und lokale SEO gehen Aufträge an die Konkurrenz. Berneby Solutions bringt Dachdeckerbetriebe mit professionellen Websites, 50+ Landingpages und KI-Telefonassistent ins Netz. Festpreis, 4 Wochen bis Go-Live, aus dem Erzgebirge.",
    typischeProbleme: [
      {
        problem: "Auf dem Dach – kein Empfang, keine Zeit",
        description:
          "Auf der Baustelle haben Sie weder Zeit noch oft Empfang. Anrufe verpuffen. Kunden wählen den nächsten Dachdecker.",
      },
      {
        problem: "Sichtbarkeit bei Sturm- und Hagelschäden",
        description:
          "Nach Unwetter suchen viele nach Dachdeckern. Wer nicht bei Google steht, bekommt keine Anfragen.",
      },
      {
        problem: "Angebote und Verwaltung neben der Arbeit",
        description:
          "Angebote schreiben, Termine koordinieren – das frisst Zeit. Ohne digitale Prozesse bleibt wenig für die eigentliche Arbeit.",
      },
    ],
    loesungen: [
      "Website mit lokalen Landingpages für jeden Ort",
      "KI-Telefonassistent nimmt Anrufe entgegen",
      "Google Business Profil für lokale Sichtbarkeit",
      "Bewertungsmanagement für mehr 5-Sterne-Bewertungen",
    ],
    suchbegriffe: ["Dachdecker Erzgebirge", "Dachsanierung", "Dachdecker Marienberg"],
    preisRelevant: "Pakete ab 950 € – Meisterbetrieb mit 50+ Landingpages ab 1.950 €.",
    faqItems: [
      {
        question: "Was bringt eine Website für Dachdecker?",
        answer:
          "76% der Nutzer, die lokal suchen, besuchen innerhalb von 24 Stunden ein Geschäft. Mit 50+ Landingpages ranken Sie für „Dachdecker [Ort]“ in Ihrer Region und bekommen mehr Anfragen.",
      },
      {
        question: "Kann der KI-Telefonassistent Notfälle erkennen?",
        answer:
          "Der Assistent erfasst Anliegen und leitet Sie per Nachricht weiter. Bei dringenden Fällen können Sie priorisieren und schnell zurückrufen.",
      },
    ],
  },
  {
    name: "Sanitär & Heizung",
    slug: "sanitaer-heizung",
    description:
      "Sanitär- und Heizungsbetriebe im Erzgebirge werden bei „Installateur Stollberg“ oder „Heizungsbau Schwarzenberg“ gesucht. Ohne Website und lokale SEO bleiben Sie unsichtbar. Berneby Solutions unterstützt mit professionellen Websites, 50+ Landingpages und KI-Telefonassistent – damit Sie Anrufe nicht verpassen, wenn Sie bei Kunden sind. Aus Aue-Bad Schlema für Sanitär, Heizung und Klempner im gesamten Erzgebirgskreis.",
    typischeProbleme: [
      {
        problem: "Bei Kunden – Anrufe gehen daneben",
        description:
          "Wenn Sie eine Heizung warten oder ein Bad installieren, können Sie nicht immer rangehen. Verpasste Anrufe = verlorene Aufträge.",
      },
      {
        problem: "Notdienst-Rufbereitschaft ohne digitale Präsenz",
        description:
          "Bei Rohrbruch oder Heizungsausfall suchen Kunden schnell. Wer nicht bei Google steht, wird nicht angerufen.",
      },
      {
        problem: "Angebote und Abrechnung am Abend",
        description:
          "Bürokram nach Feierabend kostet Zeit. Digitale Prozesse entlasten – von der Website bis zur Terminverwaltung.",
      },
    ],
    loesungen: [
      "50+ Landingpages für Sanitär, Heizung, Klempner",
      "KI-Telefonassistent für 24/7 Anrufannahme",
      "Google Business Profil optimiert",
      "Bewertungsmanagement",
    ],
    suchbegriffe: ["Sanitär Erzgebirge", "Heizungsbau", "Installateur"],
    preisRelevant: "Pakete ab 950 € – Meisterbetrieb ab 1.950 €, Marktführer mit KI-Telefon ab 2.800 €.",
    faqItems: [
      {
        question: "Was kostet eine Website für Sanitär/Heizung?",
        answer:
          "Ab 950 € für einen One-Pager. Das Meisterbetrieb-Paket mit 50+ Landingpages und SEO kostet 1.950 €. Inkl. Google Business und Bewertungsmanagement.",
      },
      {
        question: "Wie funktioniert der KI-Telefonassistent bei Notfällen?",
        answer:
          "Der Assistent nimmt ab, erfasst Anliegen und Rückrufnummer. Sie erhalten eine Nachricht und rufen zurück – auch bei dringenden Fällen schnell erreichbar.",
      },
    ],
  },
  {
    name: "Maler & Lackierer",
    slug: "maler-lackierer",
    description:
      "Maler und Lackierer im Erzgebirge werden bei „Maler Annaberg“ oder „Lackierer Stollberg“ gesucht. Viele Betriebe haben keine Website – und verschenken damit Kunden. Berneby Solutions bringt Malerbetriebe mit professionellen Websites, lokaler SEO und KI-Telefonassistent ins Netz. Damit Sie gefunden werden, wenn Kunden nach Renovierung, Fassadenanstrich oder Innenausbau suchen.",
    typischeProbleme: [
      {
        problem: "Auf der Baustelle – Telefon klingelt",
        description:
          "Beim Streichen oder Tapezieren können Sie nicht rangehen. Jeder verpasste Anruf ist ein verlorener Auftrag.",
      },
      {
        problem: "Keine Online-Sichtbarkeit",
        description:
          "Ohne Website ranken Sie nicht für „Maler [Ort]“. Die Konkurrenz mit Website bekommt die Anfragen.",
      },
      {
        problem: "Saisonale Auftragsspitzen nutzen",
        description:
          "Im Frühjahr und Sommer suchen viele nach Malern. Wer dann sichtbar ist, füllt den Kalender.",
      },
    ],
    loesungen: [
      "Website mit lokalen Landingpages",
      "KI-Telefonassistent für Anrufannahme",
      "Google Business Profil",
      "Bewertungsmanagement",
    ],
    suchbegriffe: ["Maler Erzgebirge", "Lackierer", "Malermeister"],
    preisRelevant: "Pakete ab 950 € – Meisterbetrieb ab 1.950 €.",
    faqItems: [
      {
        question: "Lohnt sich eine Website für Maler?",
        answer:
          "Ja. 76% der Nutzer, die lokal suchen, besuchen innerhalb von 24 Stunden ein Geschäft. Mit Website und lokaler SEO werden Sie bei „Maler [Ort]“ gefunden.",
      },
    ],
  },
  {
    name: "Tischler",
    slug: "tischler",
    description:
      "Tischler und Schreinereien im Erzgebirge fertigen Möbel, Fenster und Innenausbau. Bei „Tischler Marienberg“ oder „Schreiner Annaberg“ suchen Kunden nach Handwerksbetrieben. Ohne Website bleiben Sie unsichtbar. Berneby Solutions unterstützt Tischler mit Websites, lokaler SEO und KI-Telefonassistent – für mehr Anfragen aus der Region.",
    typischeProbleme: [
      {
        problem: "In der Werkstatt – Anrufe verpasst",
        description:
          "Beim Hobeln oder Montieren können Sie nicht rangehen. Kunden mit Küchenwunsch oder Möbelanfrage wählen den nächsten Tischler.",
      },
      {
        problem: "Keine digitale Präsenz",
        description:
          "Viele Tischler haben keine Website. Bei lokaler Suche gewinnt, wer sichtbar ist.",
      },
      {
        problem: "Angebote und Planung",
        description:
          "Individuelle Angebote brauchen Zeit. Eine Website mit Referenzen und Leistungen spart Erklärungsaufwand.",
      },
    ],
    loesungen: [
      "Website mit Referenzen und Leistungen",
      "50+ lokale Landingpages",
      "KI-Telefonassistent",
      "Google Business Profil",
    ],
    suchbegriffe: ["Tischler Erzgebirge", "Schreiner", "Möbelbau"],
    preisRelevant: "Pakete ab 950 € – Meisterbetrieb ab 1.950 €.",
    faqItems: [
      {
        question: "Was bringt eine Website für Tischler?",
        answer:
          "Kunden suchen online nach Tischlern. Mit Website und lokaler SEO werden Sie bei „Tischler [Ort]“ gefunden. Referenzen und Leistungen bauen Vertrauen auf.",
      },
    ],
  },
  {
    name: "KFZ-Werkstatt",
    slug: "kfz-werkstatt",
    description:
      "KFZ-Werkstätten im Erzgebirge werden bei „Werkstatt Annaberg“ oder „Autowerkstatt Stollberg“ gesucht. Kunden vergleichen online – wer keine Website hat, wirkt veraltet. Berneby Solutions unterstützt KFZ-Betriebe mit Websites, lokaler SEO und KI-Telefonassistent. Damit Sie gefunden werden und Anrufe nicht verpassen, wenn Sie in der Werkstatt sind.",
    typischeProbleme: [
      {
        problem: "In der Werkstatt – Kunden rufen an",
        description:
          "Beim Reparieren oder Prüfen können Sie nicht immer rangehen. Verpasste Anrufe = verlorene Termine.",
      },
      {
        problem: "Keine Online-Sichtbarkeit",
        description:
          "Kunden suchen „Werkstatt in der Nähe“ oder „AU [Ort]“. Ohne Website ranken Sie nicht.",
      },
      {
        problem: "Terminverwaltung und Rückrufe",
        description:
          "Der KI-Telefonassistent erfasst Anliegen und Rückrufnummer – Sie rufen zurück, wenn es passt.",
      },
    ],
    loesungen: [
      "Website mit Leistungen und Öffnungszeiten",
      "50+ lokale Landingpages",
      "KI-Telefonassistent",
      "Google Business Profil",
    ],
    suchbegriffe: ["KFZ-Werkstatt Erzgebirge", "Autowerkstatt", "Werkstatt"],
    preisRelevant: "Pakete ab 950 € – Meisterbetrieb ab 1.950 €.",
    faqItems: [
      {
        question: "Was kostet eine Website für eine KFZ-Werkstatt?",
        answer:
          "Ab 950 € für einen One-Pager. Das Meisterbetrieb-Paket mit 50+ Landingpages und SEO kostet 1.950 €. Inkl. Google Business und Bewertungsmanagement.",
      },
    ],
  },
  {
    name: "Friseur",
    slug: "friseur",
    description:
      "Friseursalons im Erzgebirge brauchen Online-Sichtbarkeit für „Friseur Annaberg“ oder „Haarsalon Marienberg“. Viele Kunden buchen online oder suchen Bewertungen. Berneby Solutions unterstützt Friseure mit Websites, lokaler SEO und optionaler Online-Terminbuchung. Damit Sie gefunden werden und mehr Kunden anziehen.",
    typischeProbleme: [
      {
        problem: "Beim Kunden – Telefon klingelt",
        description:
          "Während des Schneidens oder Färbens können Sie nicht rangehen. Terminanfragen gehen verloren.",
      },
      {
        problem: "Keine Bewertungen, keine Sichtbarkeit",
        description:
          "Google-Bewertungen entscheiden oft über die Wahl. Ohne aktives Bewertungsmanagement bleiben Sie unsichtbar.",
      },
      {
        problem: "Online-Buchung gewünscht",
        description:
          "Viele Kunden buchen lieber online. Eine Website mit Terminbuchung spart Telefonate.",
      },
    ],
    loesungen: [
      "Website mit Leistungen und Preisen",
      "Lokale SEO für „Friseur [Ort]“",
      "Bewertungsmanagement",
      "Optional: Online-Terminbuchung",
    ],
    suchbegriffe: ["Friseur Erzgebirge", "Haarsalon", "Friseursalon"],
    preisRelevant: "Pakete ab 950 € – individuell anpassbar für Friseure.",
    faqItems: [
      {
        question: "Was bringt eine Website für Friseure?",
        answer:
          "Kunden suchen online nach Friseuren in der Nähe. Mit Website und lokaler SEO werden Sie bei „Friseur [Ort]“ gefunden. Bewertungsmanagement bringt mehr 5-Sterne-Bewertungen.",
      },
    ],
  },
  {
    name: "Gastronomie",
    slug: "gastronomie",
    description:
      "Restaurants, Cafés und Gaststätten im Erzgebirge werden bei „Restaurant Annaberg“ oder „Café Marienberg“ gesucht. Öffnungszeiten, Speisekarte und Bewertungen entscheiden. Berneby Solutions unterstützt Gastronomen mit Websites, lokaler SEO und Bewertungsmanagement. Damit Gäste Sie finden und buchen.",
    typischeProbleme: [
      {
        problem: "Keine oder veraltete Website",
        description:
          "Gäste suchen Öffnungszeiten, Speisekarte und Reservierung. Ohne Website wirken Sie veraltet.",
      },
      {
        problem: "Bewertungen entscheiden",
        description:
          "Google-Bewertungen beeinflussen die Wahl. Aktives Bewertungsmanagement bringt mehr 5-Sterne-Bewertungen.",
      },
      {
        problem: "Reservierungen und Anfragen",
        description:
          "Der KI-Telefonassistent kann Anrufe entgegennehmen, wenn Sie in der Küche sind.",
      },
    ],
    loesungen: [
      "Website mit Speisekarte und Öffnungszeiten",
      "Lokale SEO für „Restaurant [Ort]“",
      "Bewertungsmanagement",
      "Optional: Reservierungssystem",
    ],
    suchbegriffe: ["Restaurant Erzgebirge", "Café", "Gastronomie"],
    preisRelevant: "Pakete ab 950 € – individuell für Gastronomie.",
    faqItems: [
      {
        question: "Was kostet eine Website für ein Restaurant?",
        answer:
          "Ab 950 € für einen One-Pager mit Speisekarte und Öffnungszeiten. Größere Projekte mit Reservierung ab 1.950 €.",
      },
    ],
  },
  {
    name: "Einzelhandel",
    slug: "einzelhandel",
    description:
      "Einzelhändler im Erzgebirge konkurrieren mit Online-Shops. Lokale Sichtbarkeit bei „Geschäft Annaberg“ oder „Laden Marienberg“ bringt Kunden in den Laden. Berneby Solutions unterstützt mit Websites, lokaler SEO und optionalen Online-Shops. Damit Sie gefunden werden und Kunden wissen, was Sie anbieten.",
    typischeProbleme: [
      {
        problem: "Keine Online-Präsenz",
        description:
          "Kunden suchen Öffnungszeiten, Sortiment und Lage. Ohne Website bleiben Sie unsichtbar.",
      },
      {
        problem: "Konkurrenz durch Online-Handel",
        description:
          "Lokale Sichtbarkeit und Bewertungen helfen, Kunden in den Laden zu holen.",
      },
      {
        problem: "Anrufe während des Verkaufs",
        description:
          "Der KI-Telefonassistent nimmt Anrufe entgegen, wenn Sie mit Kunden beschäftigt sind.",
      },
    ],
    loesungen: [
      "Website mit Sortiment und Öffnungszeiten",
      "Lokale SEO",
      "Bewertungsmanagement",
      "Optional: Online-Shop",
    ],
    suchbegriffe: ["Einzelhandel Erzgebirge", "Laden", "Geschäft"],
    preisRelevant: "Pakete ab 950 € – Online-Shop ab 1.200 €.",
    faqItems: [
      {
        question: "Lohnt sich eine Website für Einzelhändler?",
        answer:
          "Ja. Kunden suchen online nach Geschäften, Öffnungszeiten und Bewertungen. Mit Website und lokaler SEO werden Sie gefunden.",
      },
    ],
  },
  {
    name: "Freiberufler",
    slug: "freiberufler",
    description:
      "Freiberufler – Steuerberater, Architekten, Berater – im Erzgebirge brauchen professionelle Websites für Vertrauen und Sichtbarkeit. Bei „Steuerberater Annaberg“ oder „Architekt Marienberg“ suchen Kunden online. Berneby Solutions unterstützt Freiberufler mit Websites, lokaler SEO und IT-Service. Damit Sie gefunden werden und seriös wirken.",
    typischeProbleme: [
      {
        problem: "Keine oder veraltete Website",
        description:
          "Freiberufler ohne Website wirken weniger seriös. Kunden recherchieren vor dem ersten Kontakt.",
      },
      {
        problem: "Lokale Sichtbarkeit",
        description:
          "Bei „[Beruf] [Ort]“ suchen Kunden. Ohne SEO ranken Sie nicht.",
      },
      {
        problem: "IT und Verwaltung",
        description:
          "Der Digitale Hausmeister (10 Stunden für 850 €) hilft bei Office, E-Mail und Software.",
      },
    ],
    loesungen: [
      "Professionelle Website",
      "Lokale SEO",
      "IT-Service (Digitaler Hausmeister)",
      "Optional: KI-Schulung",
    ],
    suchbegriffe: ["Freiberufler Erzgebirge", "Steuerberater", "Architekt"],
    preisRelevant: "Websites ab 950 € – Digitaler Hausmeister 850 €.",
    faqItems: [
      {
        question: "Was kostet eine Website für Freiberufler?",
        answer:
          "Ab 950 € für einen professionellen One-Pager. Mehrseitige Websites mit SEO ab 1.950 €. Der Digitale Hausmeister (IT-Support) kostet 850 € für 10 Stunden.",
      },
    ],
  },
];

// =============================================================================
// API
// =============================================================================

export function getBrancheBySlug(slug: string): Branche | undefined {
  return BRANCHEN.find((b) => b.slug === slug);
}

export function getAllBranchenSlugs(): string[] {
  return BRANCHEN.map((b) => b.slug);
}
