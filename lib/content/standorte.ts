/**
 * Standort-Content – Hub-and-Spoke (5 Kernstandorte)
 * Individuelle Texte gegen Scaled-Content-/Duplicate-Risiko.
 */

export interface LocationTestimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
}

export interface LocationFaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface LocationContent {
  readonly slug: string;
  /** Individueller Einleitungstext (2–3 Sätze), nicht nur Name-Swap. */
  readonly localIntro: string;
  readonly localTestimonial: LocationTestimonial;
  /** Ortsspezifische FAQs (Anfahrt, Region, Besonderheiten). */
  readonly localFaq: readonly LocationFaqItem[];
}

/**
 * Die 5 Kern-Spokes. Reihenfolge = Priorität für Hub/Sitemap.
 * (Annaberg-Buchholz statt Zwickau – Kreisstadt, bereits in unseren Daten.)
 */
export const CORE_LOCATION_SLUGS = [
  "aue-bad-schlema",
  "schwarzenberg",
  "schneeberg",
  "stollberg",
  "annaberg-buchholz",
] as const;

export type CoreLocationSlug = (typeof CORE_LOCATION_SLUGS)[number];

const LOCATION_CONTENT: Record<CoreLocationSlug, LocationContent> = {
  "aue-bad-schlema": {
    slug: "aue-bad-schlema",
    localIntro:
      "Aue-Bad Schlema ist unser Heimathafen: Hier sitzen wir am Altmarkt und kennen die Betriebe vom Wochenmarkt bis zur Werkstatt im Stadtteil. Wer in Aue oder Bad Schlema online gefunden werden will, braucht keine Agentur aus der Großstadt – sondern jemanden, der weiß, dass „Elektriker Aue“ und „IT Aue-Bad Schlema“ unterschiedliche Suchintentionen haben. Wir bauen Websites und lokale Sichtbarkeit so, dass Anfragen aus dem Stadtgebiet und dem unmittelbaren Umland ankommen.",
    localTestimonial: {
      quote:
        "Endlich eine Website, die so klar ist wie unsere Angebote. Seit dem Relaunch melden sich Kunden aus Aue und Schlema, die uns vorher gar nicht gefunden haben.",
      name: "Torsten W.",
      role: "Sanitärbetrieb, Aue-Bad Schlema",
    },
    localFaq: [
      {
        question: "Können wir uns in Aue-Bad Schlema persönlich treffen?",
        answer:
          "Ja. Unser Büro liegt am Altmarkt 5 in Aue-Bad Schlema. Erstgespräche können vor Ort, per Video oder bei Ihnen in der Werkstatt stattfinden – je nachdem, was für Ihren Betrieb passt.",
      },
      {
        question: "Wie schnell seid ihr vor Ort, wenn etwas an der Website oder IT hakt?",
        answer:
          "Weil wir hier sitzen, sind kurze Wege die Regel. Viele Themen lösen wir remote; wenn Hardware, WLAN oder ein Vor-Ort-Check nötig sind, sind wir oft noch am selben oder nächsten Werktag da.",
      },
      {
        question: "Lohnt sich lokale SEO wirklich für einen Betrieb mitten in Aue?",
        answer:
          "Ja – gerade weil die Konkurrenz im Stadtgebiet dicht ist. Wer bei „Webdesign Aue“, Handwerk oder Praxis-Suchen nicht sichtbar ist, verliert Anfragen an Betriebe mit besserem Google-Profil und klarem Auftritt.",
      },
    ],
  },
  schwarzenberg: {
    slug: "schwarzenberg",
    localIntro:
      "Schwarzenberg lebt von Schloss, Altstadt und Besuchern – und von Handwerkern, die das ganze Jahr Aufträge brauchen, nicht nur in der Saison. Betriebe hier konkurrieren um Suchanfragen wie „Dachdecker Schwarzenberg“ oder „Elektriker Schwarzenberg“, während Tourismus und Alltagsgeschäft unterschiedliche Website-Botschaften verlangen. Wir verbinden lokalen Auftritt mit SEO und Erreichbarkeit, damit Sie sowohl Stammkunden als auch Gäste aus dem Raum Aue–Johanngeorgenstadt erreichen.",
    localTestimonial: {
      quote:
        "Unsere alte Seite wirkte wie von 2012. Jetzt finden uns Leute über Google, die extra nach Schwarzenberg suchen – und die Anfragen sind ernst gemeint.",
      name: "Anja K.",
      role: "Malerbetrieb, Schwarzenberg/Erzgeb.",
    },
    localFaq: [
      {
        question: "Wie weit ist Berneby Solutions von Schwarzenberg entfernt?",
        answer:
          "Nur etwa 8 km von Aue-Bad Schlema. Vor-Ort-Termine in Schwarzenberg sind unkompliziert möglich – oft am selben Tag planbar, wenn es um Website-Abnahme, Fotos oder IT-Checks geht.",
      },
      {
        question: "Hilft ihr auch Betrieben mit touristischem Laufkundengeschäft?",
        answer:
          "Ja. Wir trennen klar zwischen lokalem Alltagsgeschäft und saisonalen Impulsen: Google Business, Bewertungen und eine Website, die Öffnungszeiten, Leistungen und Erreichbarkeit sofort zeigt – ohne Marketing-Floskeln.",
      },
      {
        question: "Was ist der erste sinnvolle Schritt für Schwarzenberger Handwerker?",
        answer:
          "Meist: Google-Unternehmensprofil vollständig machen und eine klare Leistungsseite für Schwarzenberg plus Umland. Danach Sichtbarkeit an euren Orten und KI-Telefon, falls Anrufe auf der Baustelle verloren gehen.",
      },
    ],
  },
  schneeberg: {
    slug: "schneeberg",
    localIntro:
      "Schneeberg ist Bergstadt mit Silbergeschichte – und ein dichter Markt für Handwerk zwischen Aue und dem Raum Zwickau. Wer hier eine Baustelle hat, ist oft unterwegs; wer online nicht erreichbar ist, verliert Aufträge an Betriebe mit besserer Sichtbarkeit. Wir helfen Schneeberger Unternehmen, bei lokalen Suchen zu erscheinen und Anrufe trotz Schicht und Montage nicht zu verpassen – mit Website, SEO und optionalem KI-Telefonassistenten.",
    localTestimonial: {
      quote:
        "Früher haben wir Anrufe auf der Baustelle verpasst. Mit Website und Telefon-Assistent kommen die Anfragen jetzt sortiert bei uns an – auch aus Schneeberg und Umgebung.",
      name: "Markus H.",
      role: "Elektroinstallateur, Schneeberg",
    },
    localFaq: [
      {
        question: "Betreut ihr Schneeberg trotz Fokus auf Aue?",
        answer:
          "Selbstverständlich. Schneeberg liegt nur rund 12 km entfernt und gehört zu unseren Kernstandorten. Viele Projekte starten remote und werden bei Bedarf vor Ort abgeschlossen.",
      },
      {
        question: "Könnt ihr auch Betriebe bedienen, die Richtung Zwickau arbeiten?",
        answer:
          "Ja. Schneeberg ist oft Brücke zwischen Erzgebirge und Zwickauer Land. Wir optimieren Sichtbarkeit für Ihre echten Einsatzorte – ohne 50 austauschbare Ortsseiten, dafür mit klaren, relevanten Inhalten.",
      },
      {
        question: "Welche Besonderheit hat Local SEO in Schneeberg?",
        answer:
          "Viele suchen mit Stadtname plus Gewerk, andere nur regional. Wir kombinieren Google-Unternehmensprofil, einheitliche Kontaktdaten und eine Seite, die Schneeberg und die umliegenden Orte sinnvoll abdeckt – ohne doppelte, austauschbare Inhalte.",
      },
    ],
  },
  stollberg: {
    slug: "stollberg",
    localIntro:
      "Stollberg/Erzgeb. sitzt am Verkehrsknoten zur A72 – hier treffen Erzgebirge und Chemnitzer Land aufeinander. Betriebe gewinnen Kunden aus Stadt und Pendlerregion, verlieren sie aber schnell, wenn die Website mobil nicht funktioniert oder Google Maps veraltet ist. Wir bauen für Stollberger Handwerk und Handel Auftritte, die lokal ranken und gleichzeitig die Anbindung Richtung Chemnitz und Lugau mitdenken.",
    localTestimonial: {
      quote:
        "Wir wollten keine 08/15-Vorlage. Die neue Seite erklärt unsere Leistungen so, dass Kunden aus Stollberg und dem Umland sofort wissen, wen sie anrufen.",
      name: "Sabine L.",
      role: "Tischlerei, Stollberg/Erzgeb.",
    },
    localFaq: [
      {
        question: "Wie weit ist die Anfahrt von Aue nach Stollberg?",
        answer:
          "Etwa 22 km. Für Workshops, Shootings oder IT-Einsätze sind wir regelmäßig im Stollberger Raum unterwegs – Termine lassen sich gut mit anderen Projekten in der Region bündeln.",
      },
      {
        question: "Optimiert ihr auch auf Suchen Richtung Chemnitz?",
        answer:
          "Wenn Ihr Einzugsgebiet dahin reicht, ja – aber gezielt. Wir priorisieren Stollberg und die Orte, aus denen wirklich Anfragen kommen, statt hunderte automatisierte Stadtseiten zu erzeugen.",
      },
      {
        question: "Was bringt Local SEO einem Betrieb an der A72?",
        answer:
          "Sichtbarkeit dort, wo Entscheidungen fallen: Smartphone auf dem Weg, Maps in der Pause, Vergleich mehrerer Betriebe. Klare Leistungen, Bewertungen und schnelle Kontaktwege schlagen lange Broschürentexte.",
      },
    ],
  },
  "annaberg-buchholz": {
    slug: "annaberg-buchholz",
    localIntro:
      "Annaberg-Buchholz ist Kreisstadt – Verwaltungszentrum, Wochenmarkt und Magnet für Handwerk aus dem oberen Erzgebirge. Hier suchen Kunden bewusst nach „Dachdecker Annaberg“ oder IT-Partnern mit Bezug zur Region, nicht nach bundesweiten Plattformen. Wir unterstützen Annaberger Betriebe mit Websites und lokaler SEO, die zur Kreisstadt passen: seriös, auffindbar und mit klarer Erreichbarkeit für Kunden aus Seiffen, Thum und Oberwiesenthal.",
    localTestimonial: {
      quote:
        "Als Kreisstadt-Betrieb müssen wir professionell wirken. Berneby hat uns eine Seite gebaut, die bei Google gefunden wird und trotzdem nach Annaberg klingt – nicht nach Agentur-Deutsch.",
      name: "Daniela P.",
      role: "Praxisverwaltung, Annaberg-Buchholz",
    },
    localFaq: [
      {
        question: "Kommt ihr für Termine nach Annaberg-Buchholz?",
        answer:
          "Ja. Die Strecke aus Aue-Bad Schlema beträgt rund 28 km. Wir planen Vor-Ort-Termine gebündelt – ideal für Kick-offs, Content-Abnahme oder IT-Checks in der Kreisstadt.",
      },
      {
        question: "Unterscheidet sich SEO in der Kreisstadt von kleineren Orten?",
        answer:
          "Oft ja: mehr Wettbewerb, mehr Suchvolumen, höhere Ansprüche an Google Business und Bewertungen. Dafür lohnt sich der Aufwand – eine starke Präsenz in Annaberg strahlt aufs Umland aus.",
      },
      {
        question: "Können Umland-Orte wie Seiffen oder Thum mit abgedeckt werden?",
        answer:
          "Ja, über sinnvolle Inhalte und Ihr Leistungsgebiet – nicht über Dutzende Clone-Seiten. Wir legen fest, welche Orte wirklich zu Ihrem Betrieb passen, und bauen genau dafür Sichtbarkeit auf.",
      },
    ],
  },
};

export function isCoreLocationSlug(slug: string): slug is CoreLocationSlug {
  return (CORE_LOCATION_SLUGS as readonly string[]).includes(slug);
}

export function getLocationContent(slug: string): LocationContent | undefined {
  if (!isCoreLocationSlug(slug)) return undefined;
  return LOCATION_CONTENT[slug];
}

export function getAllLocationContent(): LocationContent[] {
  return CORE_LOCATION_SLUGS.map((slug) => LOCATION_CONTENT[slug]);
}
