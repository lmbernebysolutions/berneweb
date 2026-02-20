/**
 * Ratgeber – Topic Clusters & Pillar Pages
 * Phase 2: Mid-Term SEO/GEO Content
 * @see TASKLIST_PHASE_2_MID_TERM.md
 */

export interface RatgeberArticle {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly cluster: string;
  readonly pillarSlug: string;
  readonly content: string;
  readonly relatedSlugs: readonly string[];
  readonly datePublished: string;
  readonly dateModified: string;
}

// =============================================================================
// CLUSTER 1: Digitalisierung Handwerk
// =============================================================================

const CLUSTER_1_PILLAR: RatgeberArticle = {
  slug: "digitalisierung-handwerk",
  title: "Digitalisierung im Handwerk: Der komplette Leitfaden für das Erzgebirge",
  description:
    "Warum Handwerksbetriebe digital werden müssen und wie Sie in 4 Schritten starten. Mit Praxis-Tipps für SEO, Website und lokale Sichtbarkeit.",
  cluster: "digitalisierung-handwerk",
  pillarSlug: "digitalisierung-handwerk",
  content: `
<h2>Was bedeutet Digitalisierung im Handwerk?</h2>
<p><strong>Digitalisierung im Handwerk</strong> bezeichnet die Nutzung digitaler Technologien, um betriebliche Abläufe zu optimieren, Kunden zu gewinnen und sichtbar zu bleiben. Laut einer Studie des Zentralverbands des Deutschen Handwerks (ZDH) nutzen 76% der Handwerksbetriebe bereits digitale Tools – aber nur wenige setzen sie strategisch ein.</p>

<h2>Warum ist Digitalisierung für Handwerker wichtig?</h2>
<p>Google zeigt: 76% der Nutzer, die lokal suchen (z.B. „Elektriker Annaberg“), besuchen innerhalb von 24 Stunden ein Geschäft. Ohne professionelle Website und lokale SEO existieren Sie für diese Kunden praktisch nicht. Die Konkurrenz steht bereits auf Seite 1.</p>

<h2>Die 4 Säulen der Handwerks-Digitalisierung</h2>
<ol>
<li><strong>Professionelle Website</strong> – Ihr digitaler Schaufenster. Ein One-Pager reicht oft nicht; Mehrseitige Websites mit lokalen Landingpages bringen Sie bei Google nach vorne.</li>
<li><strong>Lokale SEO</strong> – 50+ Landingpages für jeden Ort, den Sie bedienen. So ranken Sie für „Dachdecker Marienberg“ oder „Sanitär Stollberg“.</li>
<li><strong>Google Business Profil</strong> – Ihr Eintrag in der lokalen Suche. Bewertungen, Öffnungszeiten, Fotos – alles zählt.</li>
<li><strong>KI-Telefonassistent</strong> – Nimmt Anrufe entgegen, wenn Sie auf der Baustelle sind. Kein Kunde geht mehr verloren.</li>
</ol>

<h2>Wie starten Sie die Digitalisierung?</h2>
<p>Beginnen Sie mit einer Bestandsaufnahme: Haben Sie eine Website? Ist Ihr Google-Business-Profil vollständig? Wie viele Anrufe verpassen Sie pro Woche? Aus dieser Analyse leiten Sie Prioritäten ab. Ein <a href="/handwerk">Handwerks-Paket</a> mit Website, SEO und KI-Telefon bringt Sie in 4 Wochen live.</p>

<h2>Fazit</h2>
<p>Digitalisierung im Handwerk ist kein Luxus, sondern Überlebensstrategie. Wer heute nicht sichtbar ist, wird morgen nicht angerufen. Starten Sie mit den Basics – Website, lokale SEO, Google Business – und bauen Sie schrittweise aus.</p>
`,
  relatedSlugs: [
    "website-fuer-handwerker",
    "seo-fuer-handwerker",
    "ki-telefonassistent-handwerk",
    "google-business-profil-handwerker",
  ],
  datePublished: "2026-01-15",
  dateModified: "2026-02-01",
};

const CLUSTER_1_ARTICLES: RatgeberArticle[] = [
  {
    slug: "website-fuer-handwerker",
    title: "Website für Handwerker: Was Sie wirklich brauchen",
    description:
      "One-Pager oder Mehrseiter? Was eine Handwerker-Website enthalten muss und warum lokale Landingpages den Unterschied machen.",
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Was braucht eine Handwerker-Website?</h2>
<p>Eine <strong>Website für Handwerker</strong> muss drei Dinge erfüllen: Sie muss gefunden werden (SEO), Vertrauen schaffen (Referenzen, Bewertungen) und zum Handeln einladen (Kontakt, Rückruf). Ein One-Pager reicht für den Start – aber für echte Sichtbarkeit brauchen Sie lokale Landingpages.</p>

<h2>One-Pager vs. Mehrseitige Website</h2>
<p>Ein One-Pager kostet weniger und geht schneller live. Ideal für kleine Betriebe mit begrenztem Einzugsgebiet. Eine mehrseitige Website mit 50+ lokalen Landingpages (z.B. für jeden Ort im Erzgebirgskreis) bringt Sie bei Suchanfragen wie „Elektriker Aue“ oder „Dachdecker Schwarzenberg“ auf Seite 1. Der Unterschied: 3x mehr Anfragen laut unserer Erfahrung.</p>

<h2>Must-Haves auf jeder Handwerker-Website</h2>
<ul>
<li>Kontaktformular und Telefonnummer prominent</li>
<li>Google Maps Integration</li>
<li>Leistungen und Referenzen</li>
<li>Mobile-optimiert (die meisten suchen unterwegs)</li>
<li>SSL-Zertifikat (sicher, gut für SEO)</li>
</ul>

<h2>Wie lange dauert der Aufbau?</h2>
<p>Ein professioneller One-Pager ist in 1–2 Wochen fertig. Ein Paket mit 50+ Landingpages und SEO dauert etwa 4 Wochen. <a href="/handwerk">Unsere Handwerks-Pakete</a> starten bei 950 € netto.</p>
`,
    relatedSlugs: ["digitalisierung-handwerk", "seo-fuer-handwerker", "google-business-profil-handwerker"],
    datePublished: "2026-01-16",
    dateModified: "2026-02-01",
  },
  {
    slug: "seo-fuer-handwerker",
    title: "SEO für Handwerker: So werden Sie bei Google gefunden",
    description:
      "Lokale SEO für Handwerksbetriebe – Keywords, Landingpages und Google Business. Praxis-Leitfaden für das Erzgebirge.",
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Was ist SEO für Handwerker?</h2>
<p><strong>SEO für Handwerker</strong> (Suchmaschinenoptimierung) bedeutet, Ihre Website so zu optimieren, dass Sie bei Suchanfragen wie „Elektriker Erzgebirge“ oder „Sanitär Marienberg“ gefunden werden. 53% des Website-Traffics kommt über organische Suche – ohne SEO verschenken Sie die Hälfte Ihrer potenziellen Kunden.</p>

<h2>Wie funktioniert lokale SEO?</h2>
<p>Google priorisiert lokale Ergebnisse. Wenn jemand „Dachdecker Annaberg“ sucht, zeigt Google Betriebe in der Nähe. Dafür brauchen Sie: (1) eine Website mit lokalen Landingpages, (2) ein vollständiges Google-Business-Profil, (3) NAP-Konsistenz (Name, Adresse, Telefon überall gleich).</p>

<h2>50+ Landingpages: Der Geo-Net-Ansatz</h2>
<p>Statt einer Seite für „Elektriker Erzgebirge“ erstellen wir 50+ Seiten – je eine pro Ort: Aue, Annaberg, Marienberg, Stollberg, Schwarzenberg usw. So ranken Sie für jede lokale Suchanfrage. Das ist der Kern unseres <a href="/handwerk#pakete">Meisterbetrieb-Pakets</a>.</p>

<h2>Erste Schritte</h2>
<p>Starten Sie mit dem Google-Business-Profil: Vollständig ausfüllen, Fotos hochladen, Bewertungen sammeln. Parallel: Website mit lokalen Inhalten. Mehr dazu: <a href="/ratgeber/google-business-profil-handwerker">Google Business Profil für Handwerker</a>.</p>
`,
    relatedSlugs: ["digitalisierung-handwerk", "website-fuer-handwerker", "google-business-profil-handwerker"],
    datePublished: "2026-01-17",
    dateModified: "2026-02-01",
  },
  {
    slug: "ki-telefonassistent-handwerk",
    title: "KI-Telefonassistent für Handwerker: So funktioniert's",
    description:
      "Der KI-Telefonassistent nimmt Anrufe entgegen, wenn Sie auf der Baustelle sind. Kein Kunde geht mehr verloren – 24/7.",
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Was ist ein KI-Telefonassistent?</h2>
<p>Ein <strong>KI-Telefonassistent</strong> ist eine künstliche Intelligenz, die Anrufe entgegennimmt, wenn Sie nicht erreichbar sind. Er erfasst Name, Anliegen und Rückrufnummer – und Sie erhalten alles per Nachricht. Kein Kunde hört mehr ein Besetztzeichen oder eine Mailbox.</p>

<h2>Warum brauchen Handwerker das?</h2>
<p>Handwerker sind oft auf der Baustelle. Wenn das Telefon klingelt, können Sie nicht immer rangehen. Jeder verpasste Anruf ist ein verlorener Auftrag. Ein KI-Assistent nimmt 24/7 ab – auch nachts und am Wochenende.</p>

<h2>Wie funktioniert die Einrichtung?</h2>
<p>Wir trainieren den Assistenten auf Ihre Leistungen und Ihre Region. Er spricht natürlich, erfasst alle relevanten Daten und leitet Sie per Push-Nachricht weiter. Sie rufen zurück, wenn es passt. Die Einrichtung dauert etwa 1 Woche.</p>

<h2>Kosten und Pakete</h2>
<p>Der KI-Telefonassistent ist Teil unseres <a href="/handwerk#pakete">Marktführer-Pakets</a> (2.800 €) oder einzeln als Modul buchbar. Mehr Vergleiche: <a href="/ratgeber/ki-telefonassistent-vergleich">KI-Telefonassistent im Vergleich</a>.</p>
`,
    relatedSlugs: ["digitalisierung-handwerk", "ki-telefonassistent-vergleich", "online-terminbuchung-handwerk"],
    datePublished: "2026-01-18",
    dateModified: "2026-02-01",
  },
  {
    slug: "google-business-profil-handwerker",
    title: "Google Business Profil für Handwerker: Komplett-Anleitung",
    description:
      "So richten Sie Ihr Google-Business-Profil optimal ein. Bewertungen, Fotos, Öffnungszeiten – was wirklich zählt.",
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Was ist das Google Business Profil?</h2>
<p>Das <strong>Google Business Profil</strong> (früher Google My Business) ist Ihr Eintrag in der lokalen Google-Suche und auf Google Maps. Wenn jemand „Elektriker Aue“ sucht, erscheinen die Betriebe mit vollständigem Profil zuerst.</p>

<h2>Was müssen Sie ausfüllen?</h2>
<p>Vollständig: Firmenname, Adresse, Telefon, Website, Kategorie (z.B. „Elektriker“), Öffnungszeiten, Leistungsgebiet. Fotos von Projekten und Team erhöhen die Klickrate. Bewertungen sind der stärkste Ranking-Faktor – deshalb lohnt sich <a href="/ratgeber/bewertungsmanagement-handwerker">Bewertungsmanagement</a>.</p>

<h2>Typische Fehler</h2>
<p>Unvollständige Profile ranken schlechter. Falsche oder inkonsistente NAP-Daten (Name, Adresse, Telefon) verwirren Google. Fehlende Fotos wirken unprofessionell. Wir richten das Profil im Rahmen unserer <a href="/handwerk#pakete">Handwerks-Pakete</a> ein.</p>
`,
    relatedSlugs: ["digitalisierung-handwerk", "seo-fuer-handwerker", "bewertungsmanagement-handwerker"],
    datePublished: "2026-01-19",
    dateModified: "2026-02-01",
  },
  {
    slug: "online-terminbuchung-handwerk",
    title: "Online-Terminbuchung für Handwerker: Vor- und Nachteile",
    description:
      "Sollen Handwerker Termine online buchbar machen? Was bringt es, was kostet es – und wann lohnt es sich?",
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Was ist Online-Terminbuchung?</h2>
<p><strong>Online-Terminbuchung</strong> ermöglicht Kunden, Termine direkt auf Ihrer Website zu buchen – ohne Anruf. Kalender-Integration, Verfügbarkeitsprüfung, Bestätigung per E-Mail.</p>

<h2>Vorteile für Handwerker</h2>
<p>Weniger Telefonate, weniger verpasste Anrufe. Kunden buchen auch außerhalb Ihrer Geschäftszeiten. Sie sparen Zeit bei der Terminkoordination. Besonders sinnvoll für wiederkehrende Services (z.B. Wartung).</p>

<h2>Wann lohnt es sich?</h2>
<p>Für Notdienste oder stark saisonale Betriebe ist ein <a href="/ratgeber/ki-telefonassistent-handwerk">KI-Telefonassistent</a> oft sinnvoller – Kunden wollen sofort sprechen. Für planbare Aufträge (z.B. Renovierung, Beratung) kann Online-Buchung gut funktionieren.</p>
`,
    relatedSlugs: ["digitalisierung-handwerk", "ki-telefonassistent-handwerk", "handwerker-online-marketing"],
    datePublished: "2026-01-20",
    dateModified: "2026-02-01",
  },
  {
    slug: "handwerker-online-marketing",
    title: "Online-Marketing für Handwerker: Die wichtigsten Kanäle",
    description:
      "Website, Google Ads, Social Media – welche Kanäle bringen Handwerker wirklich Kunden? Fokus auf ROI.",
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Welche Kanäle zahlen sich aus?</h2>
<p>Für Handwerker im Erzgebirge: (1) <strong>Lokale SEO</strong> – langfristig der stärkste Kanal. (2) <strong>Google Business</strong> – kostenlos, hohe Sichtbarkeit. (3) <strong>Google Ads</strong> – wenn Sie schnell sichtbar sein wollen. Social Media ist für Handwerker oft zweitrangig – außer für Referenzen und Vertrauen.</p>

<h2>Priorität: SEO zuerst</h2>
<p>Organische Suche kostet nichts pro Klick. Eine gut optimierte Website mit <a href="/ratgeber/seo-fuer-handwerker">lokalen Landingpages</a> bringt dauerhaft Traffic. Google Ads ergänzt – nicht ersetzt – SEO.</p>

<h2>Budget-Empfehlung</h2>
<p>Für Website und lokale SEO bieten wir feste Handwerks-Pakete mit transparenten Preisen. Für Google Ads und weitere Kanäle beraten wir Sie im <a href="/kontakt">Erstgespräch</a> zu Ihren Optionen.</p>
`,
    relatedSlugs: ["digitalisierung-handwerk", "seo-fuer-handwerker", "bewertungsmanagement-handwerker"],
    datePublished: "2026-01-21",
    dateModified: "2026-02-01",
  },
  {
    slug: "bewertungsmanagement-handwerker",
    title: "Bewertungsmanagement für Handwerker: Mehr 5-Sterne-Bewertungen",
    description:
      "Wie Sie mehr Google-Bewertungen bekommen – ehrlich, systematisch und ohne Stress. Mit Review-Radar-Modul.",
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Warum sind Bewertungen wichtig?</h2>
<p>Google-Bewertungen beeinflussen Ihr Ranking und die Klickrate. 5 Sterne + viele Bewertungen = mehr Sichtbarkeit. Kunden vertrauen Bewertungen mehr als Ihrer eigenen Website.</p>

<h2>Wie bekommen Sie mehr Bewertungen?</h2>
<p>Nach jedem abgeschlossenen Auftrag: Kunde freundlich um Bewertung bitten – per Link (direkt zu Google) oder QR-Code. Nicht nerven, aber dranbleiben. Unser <a href="/handwerk">Review-Radar-Modul</a> automatisiert die Anfrage per E-Mail oder SMS.</p>

<h2>Was tun bei negativen Bewertungen?</h2>
<p>Sachlich antworten, Fehler eingestehen, Lösung anbieten. Nie emotional reagieren. Bei Fake-Bewertungen: Google melden. Ein professionelles <a href="/ratgeber/google-business-profil-handwerker">Google-Business-Profil</a> hilft, das Gesamtbild zu stärken.</p>
`,
    relatedSlugs: ["digitalisierung-handwerk", "google-business-profil-handwerker", "handwerker-online-marketing"],
    datePublished: "2026-01-22",
    dateModified: "2026-02-01",
  },
];

// =============================================================================
// CLUSTER 2: IT-Service KMU
// =============================================================================

const CLUSTER_2_PILLAR: RatgeberArticle = {
  slug: "it-service-kmu",
  title: "IT-Service für KMU: Der komplette Leitfaden für kleine Betriebe",
  description:
    "Externe IT, Microsoft 365, Cloud, Sicherheit – was kleine Betriebe wirklich brauchen. Ohne Festanstellung, mit klaren Preisen.",
  cluster: "it-service-kmu",
  pillarSlug: "it-service-kmu",
  content: `
<h2>Was ist IT-Service für KMU?</h2>
<p><strong>IT-Service für KMU</strong> umfasst die Betreuung von Hard- und Software, Netzwerken, Cloud-Lösungen und IT-Sicherheit – ohne eigene IT-Abteilung. Kleine Betriebe nutzen externe Partner wie den <a href="/tech">Digitalen Hausmeister</a>, der stundengenau und flexibel arbeitet.</p>

<h2>Warum externe IT statt Festanstellung?</h2>
<p>Eine Vollzeit-IT-Kraft kostet 50.000 €+ pro Jahr. Für die meisten KMU reicht das nicht. Externe IT: Sie zahlen nur, wenn Sie Hilfe brauchen. 10 Stunden Support für 850 € – 12 Monate gültig. Kein Festgehalt, keine Urlaubsvertretung.</p>

<h2>Die wichtigsten IT-Themen für KMU</h2>
<ol>
<li><strong>Microsoft 365</strong> – E-Mail, Teams, OneDrive, Office. Standard für viele Betriebe.</li>
<li><strong>Cloud-Lösungen</strong> – Daten sichern, von überall zugreifen.</li>
<li><strong>IT-Sicherheit</strong> – Backups, Updates, Phishing-Schutz.</li>
<li><strong>Web & E-Commerce</strong> – Website, Shop, Hosting.</li>
</ol>

<h2>Wie finden Sie den richtigen IT-Partner?</h2>
<p>Lokal, erreichbar, verständlich. Kein Fachchinesisch. Transparente Preise. Wir sind aus dem Erzgebirge – <a href="/kontakt">Erstgespräch vereinbaren</a>.</p>
`,
  relatedSlugs: [
    "microsoft-365-fuer-handwerker",
    "digitaler-hausmeister-erklaert",
    "it-sicherheit-kleine-betriebe",
  ],
  datePublished: "2026-01-23",
  dateModified: "2026-02-01",
};

const CLUSTER_2_ARTICLES: RatgeberArticle[] = [
  {
    slug: "microsoft-365-fuer-handwerker",
    title: "Microsoft 365 für Handwerker: Einstieg und Nutzen",
    description:
      "E-Mail, Teams, OneDrive – was Microsoft 365 Handwerkern bringt. Lizenzmodelle, Kosten, Einrichtung.",
    cluster: "it-service-kmu",
    pillarSlug: "it-service-kmu",
    content: `
<h2>Was ist Microsoft 365?</h2>
<p><strong>Microsoft 365</strong> (früher Office 365) umfasst E-Mail (Outlook), Teams (Chat, Videokonferenz), OneDrive (Cloud-Speicher), Word, Excel, PowerPoint. Alles in einem Abo – von überall nutzbar.</p>

<h2>Warum für Handwerker?</h2>
<p>Professionelle E-Mail (@ihrefirma.de), gemeinsame Dateien im Team, Videocalls mit Kunden. Keine lokalen Server mehr – alles in der Cloud. Ideal für kleine Teams.</p>

<h2>Kosten und Lizenzen</h2>
<p>Business Basic ab ca. 5 €/User/Monat. Business Standard mit Desktop-Apps ab ca. 12 €. Wir beraten Sie und übernehmen die Einrichtung – inkl. Migration von alten E-Mail-Postfächern.</p>

<p>Mehr: <a href="/ratgeber/digitaler-hausmeister-erklaert">Digitaler Hausmeister</a> – Ihr IT-Partner auf Abruf.</p>
`,
    relatedSlugs: ["it-service-kmu", "digitaler-hausmeister-erklaert", "cloud-loesungen-handwerk"],
    datePublished: "2026-01-24",
    dateModified: "2026-02-01",
  },
  {
    slug: "digitaler-hausmeister-erklaert",
    title: "Digitaler Hausmeister: Was ist das und für wen?",
    description:
      "10 Stunden IT-Support für 850 € – 12 Monate gültig. So funktioniert der Digitale Hausmeister von Berneby Solutions.",
    cluster: "it-service-kmu",
    pillarSlug: "it-service-kmu",
    content: `
<h2>Was ist der Digitale Hausmeister?</h2>
<p>Der <strong>Digitale Hausmeister</strong> ist eine 10er-Stundenkarte für IT-Support. Sie rufen an oder schreiben, wenn etwas klemmt: Excel-Problem, E-Mail-Einrichtung, Website-Frage, Software-Setup. Wir helfen – 10 Stunden inklusive, 12 Monate gültig.</p>

<h2>Für wen ist das gedacht?</h2>
<p>Für KMU ohne eigene IT: Handwerker, Einzelhändler, Freiberufler. Wer nicht 50.000 €/Jahr für eine IT-Kraft ausgeben will, aber trotzdem jemanden braucht, der sich auskennt.</p>

<h2>Was ist inklusive?</h2>
<p>Web, Office, Design, Notfälle. Express-Ticket bei dringenden Problemen. Persönlicher Ansprechpartner – keine Ticketnummer. <a href="/tech">Jetzt Karte sichern</a>.</p>
`,
    relatedSlugs: ["it-service-kmu", "microsoft-365-fuer-handwerker", "it-sicherheit-kleine-betriebe"],
    datePublished: "2026-01-25",
    dateModified: "2026-02-01",
  },
  {
    slug: "ki-schulung-unternehmen",
    title: "KI-Schulung für Unternehmen: ChatGPT, Copilot & Co.",
    description:
      "Wie Sie KI im Betrieb nutzen – praktische Schulungen für Teams. ChatGPT, Microsoft Copilot, EU AI Act.",
    cluster: "it-service-kmu",
    pillarSlug: "it-service-kmu",
    content: `
<h2>Warum KI-Schulung?</h2>
<p>KI-Tools wie ChatGPT und Microsoft Copilot können Texte schreiben, E-Mails formulieren, Angebote vorbereiten. Wer sie nutzt, spart Zeit. Wer sie nicht kennt, bleibt zurück.</p>

<h2>Was lernen Ihre Mitarbeiter?</h2>
<p>Praktische Anwendungen: Angebote schreiben, E-Mails formulieren, Recherche. Keine Theorie – Hands-on. Auch: Grenzen, Datenschutz, EU AI Act.</p>

<h2>Formate</h2>
<p>Halbtags-Workshop vor Ort oder online. Individuell auf Ihre Branche zugeschnitten. <a href="/kontakt">Anfrage senden</a>.</p>
`,
    relatedSlugs: ["it-service-kmu", "ki-im-handwerk", "ki-angebote-schreiben"],
    datePublished: "2026-01-26",
    dateModified: "2026-02-01",
  },
  {
    slug: "it-sicherheit-kleine-betriebe",
    title: "IT-Sicherheit für kleine Betriebe: Die Basics",
    description:
      "Backup, Updates, Phishing – was kleine Betriebe tun müssen, um sicher zu bleiben. Ohne teure Security-Suiten.",
    cluster: "it-service-kmu",
    pillarSlug: "it-service-kmu",
    content: `
<h2>Die 3 wichtigsten Maßnahmen</h2>
<ol>
<li><strong>Backup</strong> – Regelmäßig, automatisch, außerhalb des Büros (Cloud). 3-2-1-Regel: 3 Kopien, 2 Medien, 1 offsite.</li>
<li><strong>Updates</strong> – Windows, Office, Browser immer aktuell. Viele Angriffe nutzen bekannte Lücken.</li>
<li><strong>Phishing</strong> – Verdächtige E-Mails nicht öffnen. Links prüfen. Bei Unsicherheit: anrufen statt klicken.</li>
</ol>

<h2>Brauchen Sie eine Firewall?</h2>
<p>Für die meisten kleinen Betriebe reichen Router-Firewall + Antivirus. Wichtig: Backups und Awareness. Wir beraten im <a href="/tech">Digitalen Hausmeister</a>-Paket.</p>
`,
    relatedSlugs: ["it-service-kmu", "digitaler-hausmeister-erklaert", "cloud-loesungen-handwerk"],
    datePublished: "2026-01-27",
    dateModified: "2026-02-01",
  },
  {
    slug: "cloud-loesungen-handwerk",
    title: "Cloud-Lösungen für Handwerksbetriebe",
    description:
      "OneDrive, Google Drive, Dropbox – welche Cloud passt? Backup, Zusammenarbeit, Zugriff von der Baustelle.",
    cluster: "it-service-kmu",
    pillarSlug: "it-service-kmu",
    content: `
<h2>Warum Cloud für Handwerker?</h2>
<p>Dateien von überall – Büro, Baustelle, Zuhause. Kein USB-Stick mehr. Team-Zugriff auf Angebote, Fotos, Pläne. Automatisches Backup.</p>

<h2>Welche Cloud?</h2>
<p>Microsoft 365 mit OneDrive: Wenn Sie ohnehin Outlook und Office nutzen. Google Drive: Für Kollaboration. Dropbox: Einfach, universell. Wir helfen bei der Auswahl und Einrichtung – <a href="/ratgeber/microsoft-365-fuer-handwerker">Microsoft 365 für Handwerker</a>.</p>
`,
    relatedSlugs: ["it-service-kmu", "microsoft-365-fuer-handwerker", "it-sicherheit-kleine-betriebe"],
    datePublished: "2026-01-28",
    dateModified: "2026-02-01",
  },
];

// =============================================================================
// CLUSTER 3: KI im Handwerk
// =============================================================================

const CLUSTER_3_PILLAR: RatgeberArticle = {
  slug: "ki-im-handwerk",
  title: "KI im Handwerk: Chancen, Tools und Praxis",
  description:
    "ChatGPT, KI-Telefonassistent, Automatisierung – wie Handwerker von KI profitieren. Mit Praxis-Tipps und EU AI Act.",
  cluster: "ki-im-handwerk",
  pillarSlug: "ki-im-handwerk",
  content: `
<h2>Was bedeutet KI im Handwerk?</h2>
<p><strong>KI im Handwerk</strong> umfasst den Einsatz künstlicher Intelligenz für betriebliche Aufgaben: KI-Telefonassistenten für Anrufe, ChatGPT für Texte und Angebote, Automatisierung für repetitive Prozesse. KI ist kein Ersatz für Handwerksarbeit – sie entlastet bei Verwaltung und Kundenkontakt.</p>

<h2>Die 3 wichtigsten KI-Anwendungen</h2>
<ol>
<li><strong>KI-Telefonassistent</strong> – Nimmt Anrufe entgegen, wenn Sie auf der Baustelle sind. Kein Kunde geht verloren.</li>
<li><strong>ChatGPT & Copilot</strong> – Für Angebote, E-Mails, Texte. Spart Zeit bei Büroarbeit.</li>
<li><strong>Automatisierung</strong> – Wiederkehrende Abläufe: Terminerinnerungen, Bewertungsanfragen, Rechnungsstellung.</li>
</ol>

<h2>EU AI Act: Was müssen Handwerker wissen?</h2>
<p>Der EU AI Act reguliert KI-Systeme. Für KI-Telefonassistenten und ChatGPT im Büro gelten meist geringe Anforderungen. Risiko-Kategorien: „minimal“ bis „unannehmbar“. Wir beraten bei der Einordnung – <a href="/ratgeber/ki-schulung-eu-ai-act">KI-Schulung & EU AI Act</a>.</p>

<h2>Erste Schritte</h2>
<p>Starten Sie mit dem KI-Telefonassistenten – der größte Impact bei wenig Aufwand. Parallel: ChatGPT oder Copilot für Ihre eigenen Texte testen. <a href="/handwerk">Handwerks-Pakete</a> mit KI-Telefon ab 2.800 €.</p>
`,
  relatedSlugs: [
    "ki-telefonassistent-vergleich",
    "chatgpt-fuer-handwerker",
    "ki-angebote-schreiben",
  ],
  datePublished: "2026-01-29",
  dateModified: "2026-02-01",
};

const CLUSTER_3_ARTICLES: RatgeberArticle[] = [
  {
    slug: "ki-telefonassistent-vergleich",
    title: "KI-Telefonassistent im Vergleich: Anbieter und Features",
    description:
      "Welche KI-Telefonassistenten gibt es für Handwerker? Kosten, Features, Einrichtung – der Überblick.",
    cluster: "ki-im-handwerk",
    pillarSlug: "ki-im-handwerk",
    content: `
<h2>Was leistet ein KI-Telefonassistent?</h2>
<p>Er nimmt Anrufe entgegen, erfasst Name, Anliegen und Rückrufnummer, leitet Sie per Nachricht weiter. 24/7, keine Warteschleife, keine Mailbox.</p>

<h2>Anbieter für Handwerker</h2>
<p>Es gibt verschiedene Anbieter – von günstigen Standardlösungen bis zu maßgeschneiderten Trainings. Wir setzen auf individuelle Anpassung: Der Assistent kennt Ihre Leistungen, Ihre Region, Ihre Sprache. <a href="/ratgeber/ki-telefonassistent-handwerk">So funktioniert der KI-Telefonassistent</a>.</p>

<h2>Kosten</h2>
<p>Als Modul ab ca. 690 € oder im <a href="/handwerk#pakete">Marktführer-Paket</a> inklusive. Monatliche Gebühren je nach Anbieter.</p>
`,
    relatedSlugs: ["ki-im-handwerk", "ki-telefonassistent-handwerk", "automatisierung-handwerksbetrieb"],
    datePublished: "2026-01-30",
    dateModified: "2026-02-01",
  },
  {
    slug: "chatgpt-fuer-handwerker",
    title: "ChatGPT für Handwerker: Praktische Anwendungen",
    description:
      "Angebote schreiben, E-Mails formulieren, Recherche – wie Handwerker ChatGPT im Alltag nutzen.",
    cluster: "ki-im-handwerk",
    pillarSlug: "ki-im-handwerk",
    content: `
<h2>Wofür nutzen Handwerker ChatGPT?</h2>
<p>Angebote: Texte vorbereiten, Preise einfügen. E-Mails: Formulierungen, Rückfragen. Recherche: Normen, Materialien. Kein Ersatz für Fachwissen – aber Zeitersparnis bei Formulierung.</p>

<h2>Datenschutz beachten</h2>
<p>Keine sensiblen Kundendaten in ChatGPT eingeben. Für Firmennutzung: ChatGPT Team oder Microsoft Copilot mit Business-Lizenz – dann sind Daten besser geschützt.</p>

<h2>Schulung</h2>
<p>Wir bieten <a href="/ratgeber/ki-schulung-unternehmen">KI-Schulungen</a> für Teams – praktisch, branchenspezifisch.</p>
`,
    relatedSlugs: ["ki-im-handwerk", "ki-angebote-schreiben", "ki-schulung-eu-ai-act"],
    datePublished: "2026-01-31",
    dateModified: "2026-02-01",
  },
  {
    slug: "ki-schulung-eu-ai-act",
    title: "KI-Schulung und EU AI Act: Was Unternehmen wissen müssen",
    description:
      "Der EU AI Act reguliert KI-Systeme. Welche Anforderungen gelten für Handwerker? Schulung und Compliance.",
    cluster: "ki-im-handwerk",
    pillarSlug: "ki-im-handwerk",
    content: `
<h2>Was ist der EU AI Act?</h2>
<p>Der <strong>EU AI Act</strong> ist eine EU-Verordnung, die KI-Systeme nach Risiko-Kategorien einteilt. „Minimales Risiko“ (z.B. ChatGPT für Texte, KI-Telefon): geringe Anforderungen. „Hohes Risiko“: strenge Auflagen. Die meisten Handwerker-Anwendungen fallen in „minimal“.</p>

<h2>Was müssen Sie tun?</h2>
<p>Für Standard-KI: meist nichts Spezielles. Transparenz: Kunden sollten wissen, wenn sie mit KI sprechen (z.B. am Telefon). Wir beraten in der <a href="/ratgeber/ki-schulung-unternehmen">KI-Schulung</a>.</p>
`,
    relatedSlugs: ["ki-im-handwerk", "ki-schulung-unternehmen", "chatgpt-fuer-handwerker"],
    datePublished: "2026-02-01",
    dateModified: "2026-02-01",
  },
  {
    slug: "automatisierung-handwerksbetrieb",
    title: "Automatisierung im Handwerksbetrieb",
    description:
      "Welche Prozesse können Handwerker automatisieren? Termine, Bewertungen, Rechnungen – ohne teure Software.",
    cluster: "ki-im-handwerk",
    pillarSlug: "ki-im-handwerk",
    content: `
<h2>Was lässt sich automatisieren?</h2>
<p>Terminerinnerungen, Bewertungsanfragen nach Auftragsabschluss, Rechnungsstellung, E-Mail-Signaturen. Vieles läuft über Microsoft 365, Zapier oder eigene Tools.</p>

<h2>Wo starten?</h2>
<p>Bewertungsanfragen: Unser <a href="/handwerk">Review-Radar</a> macht das automatisch. Termine: Kalender-Integration. Rechnungen: Buchhaltungssoftware mit Vorlagen. Schritt für Schritt – nicht alles auf einmal.</p>
`,
    relatedSlugs: ["ki-im-handwerk", "bewertungsmanagement-handwerker", "ki-telefonassistent-handwerk"],
    datePublished: "2026-02-02",
    dateModified: "2026-02-01",
  },
  {
    slug: "ki-angebote-schreiben",
    title: "KI beim Angebote schreiben: Tipps und Grenzen",
    description:
      "ChatGPT und Copilot können Angebotstexte vorbereiten. Wie Sie KI nutzen – und wo Sie trotzdem selbst ran müssen.",
    cluster: "ki-im-handwerk",
    pillarSlug: "ki-im-handwerk",
    content: `
<h2>Wie hilft KI beim Angebot?</h2>
<p>Vorformulierte Texte für Leistungsbeschreibungen, Standardpassagen, Einleitung. Sie geben die Eckdaten ein, KI liefert den Text. Sie prüfen und passen an – Fachwissen bleibt bei Ihnen.</p>

<h2>Grenzen</h2>
<p>KI kennt keine spezifischen Preise, keine lokalen Besonderheiten. Sie müssen prüfen: Stimmen die Zahlen? Passt der Ton? Kein Copy-Paste ohne Kontrolle.</p>

<h2>Tools</h2>
<p>ChatGPT, Microsoft Copilot, oder spezialisierte Angebots-Software mit KI. Wir schulen in <a href="/ratgeber/chatgpt-fuer-handwerker">ChatGPT für Handwerker</a>.</p>
`,
    relatedSlugs: ["ki-im-handwerk", "chatgpt-fuer-handwerker", "ki-schulung-unternehmen"],
    datePublished: "2026-02-03",
    dateModified: "2026-02-01",
  },
];

// =============================================================================
// ALL ARTICLES
// =============================================================================

const ALL_ARTICLES: RatgeberArticle[] = [
  CLUSTER_1_PILLAR,
  ...CLUSTER_1_ARTICLES,
  CLUSTER_2_PILLAR,
  ...CLUSTER_2_ARTICLES,
  CLUSTER_3_PILLAR,
  ...CLUSTER_3_ARTICLES,
];

// =============================================================================
// API
// =============================================================================

export function getArticleBySlug(slug: string): RatgeberArticle | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return ALL_ARTICLES.map((a) => a.slug);
}

export function getArticlesByCluster(cluster: string): RatgeberArticle[] {
  return ALL_ARTICLES.filter((a) => a.cluster === cluster);
}

export function getPillarArticles(): RatgeberArticle[] {
  return ALL_ARTICLES.filter((a) => a.slug === a.pillarSlug);
}

export function getClusterOverview(): { slug: string; title: string; articleCount: number }[] {
  const pillars = getPillarArticles();
  return pillars.map((p) => ({
    slug: p.slug,
    title: p.title,
    articleCount: getArticlesByCluster(p.cluster).length,
  }));
}
