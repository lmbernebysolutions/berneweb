/**
 * Ratgeber – Topic Clusters & Pillar Pages
 * Konsolidiert: 8 starke Use-Case-Artikel (3 Pillars + Support)
 */

export interface RatgeberArticle {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  /** 2–3 Kernaussagen – sichtbar im Header statt doppeltem Description-Lead. */
  readonly keyTakeaways: readonly string[];
  readonly cluster: string;
  readonly pillarSlug: string;
  readonly content: string;
  readonly relatedSlugs: readonly string[];
  readonly datePublished: string;
  readonly dateModified: string;
  /** Optionaler Override; Default siehe RATGEBER_DEFAULT_AUTHOR. */
  readonly author?: {
    readonly name: string;
    readonly role: string;
    readonly url: string;
    readonly image?: string;
  };
}

/** Default-Autor für Ratgeber (sichtbare Box + Article-Schema). */
export const RATGEBER_DEFAULT_AUTHOR = {
  name: "Lennard Meyer",
  role: "Gründer & Tech-Lead",
  url: "/ueber-uns",
  image: "/team/lennard-meyer.webp",
} as const;

// =============================================================================
// CLUSTER 1: Digitalisierung Handwerk
// =============================================================================

const CLUSTER_1_PILLAR: RatgeberArticle = {
  slug: "digitalisierung-handwerk",
  title: "Digitalisierung im Handwerk: Der komplette Leitfaden für das Erzgebirge",
  description:
    "Was Digitalisierung im Handwerksalltag wirklich bedeutet – ohne Agentur-Sprech. Mit Feierabend-Szene, Einwand zu „genug Aufträge“ und vier klaren Hebeln.",
  keyTakeaways: [
    "Digitalisieren heißt nicht „moderne Software kaufen“ – sondern weniger Chaos und mehr qualifizierte Anfragen.",
    "Wer genug Aufträge hat, braucht trotzdem Ordnung: Sonst kommt die Flaute ungeplant – und Sie sind unsichtbar.",
    "Vier Hebel reichen zum Start: Website, Google-Profil, Erreichbarkeit am Telefon, Ordnung in E-Mail und Dateien.",
  ],
  cluster: "digitalisierung-handwerk",
  pillarSlug: "digitalisierung-handwerk",
  content: `
<h2>Donnerstag, 19:40 Uhr: Das Büro nach der Baustelle</h2>
<p>Die Arbeit auf dem Dach ist getan. Staubige Stiefel, kalter Kaffee, Handy voller verpasster Anrufe. Auf dem Schreibtisch: offene Rechnungen, eine WhatsApp vom Lieferanten, drei Zettel mit Rückrufnummern – und eine E-Mail von gestern, die Sie noch nicht gelesen haben. Irgendwo dazwischen sollte eigentlich die Steuerunterlage liegen. Das ist kein Organisationsversagen. Das ist der Alltag vieler Meister im Erzgebirge: Fachlich stark, organisatorisch am Limit. Genau hier fängt Digitalisierung an – nicht bei Buzzwords, sondern bei <strong>Entlastung</strong>.</p>
<p>Wenn Kunden morgens „Elektriker Aue“ oder „Sanitär Stollberg“ googeln und Sie nicht finden, landen <strong>qualifizierte Anfragen</strong> beim Betrieb, der online aufgeräumt wirkt. Während Sie noch die Zettel sortieren.</p>

<h2>Wir haben doch genug Aufträge – wozu digitalisieren?</h2>
<p>Genug Aufträge sind ein gutes Problem. Bis die Auftragslage kippt. Mundpropaganda schwankt. Ein Winter, ein kranker Mitarbeiter, ein Großkunde, der wegfällt – und plötzlich brauchen Sie Sichtbarkeit, die Sie vorher „nicht nötig“ hatten. Digitalisieren heißt dann nicht, mehr Arbeit neben der Baustelle zu schaffen. Es heißt: Weniger Sucherei, weniger verpasste Anrufe, klarere Unterlagen – und dass Interessenten Sie finden, wenn Sie gerade keine Zeit für Akquise haben. Wer heute aufräumt, kauft sich Ruhe für die nächste Flaute. Wer wartet, muss später unter Druck nachziehen.</p>

<h2>Hebel 1: Eine saubere Website</h2>
<p><strong>Warum:</strong> Die Website ist Ihr Betriebseingang im Netz. Wer Sie bei Google findet, will in Sekunden wissen: Was machen Sie, wo arbeiten Sie, wie erreicht man Sie? Telefon und Kontakt oben, Leistungen klar, ein paar echte Projektfotos, mobil lesbar. Keine Agentur-Show. Eine saubere Seite filtert unpassende Anfragen früher und macht passende Anrufe wahrscheinlicher – also mehr <strong>qualifizierte Anfragen</strong>, weniger Erklärungsstress.</p>
<p>Mehr dazu: <a href="/ratgeber/seo-fuer-handwerker">SEO für Handwerker</a> und <a href="/ratgeber/handwerker-online-marketing">Online-Marketing für Handwerker</a>.</p>

<h2>Hebel 2: Das Google-Unternehmensprofil</h2>
<p><strong>Warum:</strong> Viele Kunden tippen Gewerk + Ort, bevor sie jemanden anrufen. Ohne vollständiges Profil (Adresse, Telefon, Öffnungszeiten, Fotos, Kategorie) sind Sie in dieser Liste unsichtbar – egal wie gut die Arbeit auf der Baustelle ist. Bewertungen und aktuelle Fotos wirken wie Empfehlungen von Leuten, die Sie nicht persönlich kennen. Das Profil ist oft der schnellste Hebel für echte Auffindbarkeit.</p>
<p>Praxis: <a href="/ratgeber/bewertung-google-profil-handwerk">Bewertungen &amp; Google-Profil</a> und <a href="/ratgeber/seo-fuer-handwerker">SEO für Handwerker</a>.</p>

<h2>Hebel 3: Erreichbarkeit am Telefon</h2>
<p><strong>Warum:</strong> Auf dem Gerüst gehen Anrufe unter. Die Mailbox fühlt sich für Kunden nach Abweisung an. Wer nicht rangeht, verliert den Auftrag oft an den Nächsten in der Liste. Ein Assistent, der Name, Anliegen und Rückrufnummer sauber festhält, schafft <strong>Entlastung</strong> ohne 24/7-Bereitschaft – Sie rufen zurück, wenn es passt, statt den ganzen Tag mit halbem Ohr am Handy zu hängen.</p>
<p>Mehr: <a href="/ratgeber/ki-telefonassistent-handwerk">KI-Telefonassistent für Handwerker</a>.</p>

<h2>Hebel 4: Ordnung in E-Mail und Dateien</h2>
<p><strong>Warum:</strong> Verlorene Angebote, doppelte Excel-Listen und „Wo lag nochmal die Rechnung?“ kosten Feierabend. Eine klare E-Mail-Adresse der Firma, gemeinsame Ablage (statt USB-Stick und Zettel) und nachvollziehbare Ordner sparen Nerven – für Sie und für Mitarbeiter. Das ist keine IT-Spielerei. Das ist Betriebssicherheit: Weniger Suche, weniger Fehler, mehr Kopf frei für die Baustelle.</p>
<p>Einstieg: <a href="/ratgeber/cloud-baustelle-handwerk">Cloud &amp; Ordnung auf der Baustelle</a> und <a href="/ratgeber/it-sicherheit-service-handwerk">IT-Sicherheit &amp; Service</a>.</p>

<h2>So fangen Sie an – ohne alles auf einmal</h2>
<p>Nehmen Sie diese Woche nur einen Hebel: Profil lückenlos machen <em>oder</em> Website-Kontakt mobil prüfen <em>oder</em> die drei wichtigsten Ordner aufräumen. Digitalisierung im Handwerk ist kein Großprojekt mit Hochglanzfolie. Es ist die Entscheidung, dass Feierabend wieder Feierabend sein darf – und dass gute Arbeit auch gefunden wird. Wenn Sie wollen, schauen wir im <a href="/kontakt">Erstgespräch</a> gemeinsam, welcher Hebel bei Ihnen den meisten Druck rausnimmt. Unsere <a href="/handwerk">Handwerks-Pakete</a> bauen wir um genau diese Alltagsthemen.</p>
`,
  relatedSlugs: [
    "seo-fuer-handwerker",
    "handwerker-online-marketing",
    "ki-telefonassistent-handwerk",
    "bewertung-google-profil-handwerk",
  ],
  datePublished: "2026-01-15",
  dateModified: "2026-07-25",
};

const CLUSTER_1_ARTICLES: RatgeberArticle[] = [
  {
    slug: "seo-fuer-handwerker",
    title: "SEO für Handwerker: So werden Sie bei Google gefunden",
    description:
      "Warum Handwerker im Erzgebirge bei Google gefunden werden müssen – ohne Agentur-Sprech. Mit Alltagsszene, Einwand zu Mundpropaganda und drei klaren Schritten.",
    keyTakeaways: [
      "Wer bei Gewerk + Ort nicht gefunden wird, verliert Aufträge an den, der erscheint – oft noch am selben Tag.",
      "Mundpropaganda reicht nicht mehr allein: Viele Kunden prüfen zuerst Google, dann den Betrieb.",
      "Drei Hebel reichen zum Start: Google-Profil, eine starke Website, echte lokale Inhalte – keine Fake-Ortsseiten.",
    ],
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Montagmorgen in Annaberg: Der Auftrag, den Sie nie gesehen haben</h2>
<p>Stellen Sie sich vor: Ein Hausbesitzer in Annaberg googelt um 7:40 Uhr „Dachdecker Annaberg“. Er braucht jemanden für die undichte Stelle – zuverlässig, aus der Region, schnell erreichbar. Google zeigt drei Betriebe mit Fotos, Öffnungszeiten und Bewertungen. Ihren Namen sieht er nicht. Er ruft den Zweiten in der Liste an. Der Konkurrent ist fachlich nicht besser als Sie – aber er war sichtbar. Am Abend fragen Sie sich, warum weniger Anrufe reinkommen. Die Antwort ist oft simpel: <strong>Sie wurden nicht gefunden.</strong></p>
<p>Das gleiche Spiel in Aue, Schwarzenberg oder Stollberg. Wer auf der Baustelle steckt und online unsichtbar ist, verschenkt <strong>qualifizierte Anfragen</strong> an Betriebe, die digital aufräumen – nicht an bessere Handwerker.</p>

<h2>Was passiert, wenn Sie nichts ändern?</h2>
<p>Mundpropaganda bleibt wertvoll. Aber sie kommt unregelmäßig. Die nächste Flaute, der nächste Winter, der nächste Großauftrag des Nachbarn – und plötzlich merken Sie: Die Anrufe kommen woanders an. Jeder Tag ohne klares Google-Profil und ohne verständliche Website bedeutet: Interessenten entscheiden sich, ohne Sie überhaupt in Betracht zu ziehen. Das kostet nicht nur Umsatz. Es kostet <strong>Entlastung</strong> – weil Sie später mehr nachlaufen müssen, statt aus einer ruhigen, planbaren Anfragelage zu wählen.</p>

<h2>Reicht Mundpropaganda nicht?</h2>
<p>Mundpropaganda ist Vertrauen. Google ist die kurze Liste, bevor jemand überhaupt anruft. Viele Kunden fragen Nachbarn <em>und</em> tippen parallel den Gewerk-Namen plus Ort. Wenn Sie online fehlen, wirkt der Betrieb unsicher – auch wenn die Arbeit auf der Baustelle erstklassig ist. Mundpropaganda und Auffindbarkeit gehören zusammen: Die Empfehlung bringt den Namen, Google bestätigt, dass Sie erreichbar und seriös wirken. Ohne den zweiten Schritt bleibt die Empfehlung oft folgenlos – der Kunde „checkt kurz“ und landet beim Sichtbaren.</p>

<h2>Schritt 1: Google-Unternehmensprofil vollständig machen</h2>
<p>Das ist der schnellste Hebel. Firmenname, Adresse, Telefon, Kategorie (z.&nbsp;B. Dachdecker), Öffnungszeiten, Leistungsgebiet, Website-Link. Dazu echte Fotos von Baustellen und Team – keine Stockbilder. Bewertungen sammeln Sie systematisch nach sauber abgeschlossenen Aufträgen, ohne Kunden zu nerven. Wenn Name, Adresse und Telefon überall gleich geschrieben sind (Schild, Visitenkarte, Website, Google), wirkt der Betrieb vertrauenswürdig. Ein lückenhaftes Profil ist wie ein leeres Schaufenster in der Fußgängerzone.</p>

<h2>Schritt 2: Eine starke Website – klar, mobil, zum Anrufen gebaut</h2>
<p>Sie brauchen keine Agentur-Show. Sie brauchen eine Seite, die in 10 Sekunden sagt: Was machen Sie, wo arbeiten Sie, wie erreicht man Sie. Telefonnummer und Kontakt oben, Leistungen verständlich, ein paar Referenzen oder Projektfotos, mobil lesbar. Die Website ist Ihr digitaler Betriebseingang: Wer Sie bei Google findet, will sofort wissen, ob Sie der Richtige sind – und dann anrufen oder schreiben. Eine starke Website erzeugt <strong>qualifizierte Anfragen</strong>, weil unpassende Interessenten früher abspringen und passende schneller Kontakt aufnehmen.</p>

<h2>Schritt 3: Echte lokale Inhalte statt Fake-Ortsseiten</h2>
<p>Schreiben Sie über die Orte, in denen Sie wirklich arbeiten – Aue-Bad Schlema, Schwarzenberg, Schneeberg, Stollberg, Annaberg-Buchholz und Ihr konkretes Umland. Ein ehrlicher Absatz zu Anfahrt, typischen Aufträgen in der Region oder warum Kunden aus dem Erzgebirge Sie wählen, wirkt stärker als Dutzende austauschbare Stadtseiten mit nur vertauschtem Ortsnamen. Google und Menschen merken den Unterschied. Lieber wenige, glaubwürdige Seiten und ein gepflegtes Profil als Massen-Text, der niemandem hilft und Sie später in Erklärungsnot bringt.</p>

<h2>So starten Sie diese Woche</h2>
<p>Öffnen Sie Ihr Google-Profil und schließen Sie die Lücken. Prüfen Sie, ob die Website auf dem Handy sofort die Telefonnummer zeigt. Streichen Sie aus Ihrer To-do-Liste alles, was nach „50 Ortsseiten“ klingt – und investieren Sie die Zeit in Fotos, Bewertungen und einen klaren Text. Wenn Sie Unterstützung wollen: Im <a href="/kontakt">Erstgespräch</a> schauen wir gemeinsam, wo Sie heute unsichtbar sind und welche drei Schritte für Ihren Betrieb die meiste <strong>Entlastung</strong> bringen. Mehr zum Profil und zu Bewertungen: <a href="/ratgeber/bewertung-google-profil-handwerk">Bewertungen &amp; Google-Profil</a>. Zum Überblick: <a href="/ratgeber/digitalisierung-handwerk">Digitalisierung im Handwerk</a>.</p>
`,
    relatedSlugs: [
      "digitalisierung-handwerk",
      "bewertung-google-profil-handwerk",
      "handwerker-online-marketing",
    ],
    datePublished: "2026-01-17",
    dateModified: "2026-07-25",
  },
  {
    slug: "handwerker-online-marketing",
    title: "Online-Marketing für Handwerker: Die wichtigsten Kanäle",
    description:
      "Woher kommen die nächsten Aufträge, wenn Sie den ganzen Tag auf der Baustelle sind? Prioritäten ohne Agentur-Sprech – für Handwerker im Erzgebirge.",
    keyTakeaways: [
      "Abends müde Facebook-Posts tippen bringt weniger als ein vollständiges Google-Profil und eine klare Website.",
      "Social Media ist optional – Auffindbarkeit bei Google ist Pflicht, wenn Kunden Gewerk + Ort suchen.",
      "Am Anfang bewusst weglassen: Ads-Dauerfeuer, tägliche Reels, fünf Kanäle parallel – das frisst Entlastung.",
    ],
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>21:15 Uhr: Noch schnell einen Post – oder endlich gefunden werden?</h2>
<p>Der Meister sitzt auf der Couch, Rücken durch. Am Handy die Frage: Noch einen Facebook-Beitrag tippen, damit „was online passiert“? Oder das Google-Profil fertigmachen, das seit Monaten halb leer ist? Die Wahrheit ist unbequem: Während Sie Posts formulieren, googelt jemand in Schwarzenberg „Maler Schwarzenberg“ – und ruft den Betrieb an, der mit Fotos, Telefonnummer und Bewertungen da steht. Nicht den mit dem nettesten Status. Wenn Sie den ganzen Tag auf der Baustelle sind, brauchen Sie keine Hobby-Agentur im Wohnzimmer. Sie brauchen <strong>Sichtbarkeit</strong>, die ohne ständiges Tippen arbeitet – und <strong>Entlastung</strong> statt noch einer Abendschicht am Handy.</p>

<h2>Social Media muss ich doch auch machen, oder?</h2>
<p>Nein – jedenfalls nicht zuerst. Social Media kann Vertrauen und Einblicke in die Arbeit zeigen. Es ersetzt nicht die kurze Liste bei Google, wenn jemand ein Leck, einen Kurzschluss oder ein Dachproblem hat und <em>jetzt</em> jemanden braucht. Viele Handwerker starten mit Instagram und merken nach Wochen: Viel Zeit, wenig <strong>qualifizierte Anfragen</strong>. Dann ist die Motivation weg – und das Profil immer noch lückenhaft. Erst gefunden werden, dann optional zeigen, wie Sie arbeiten. Umgekehrt ist die Reihenfolge, die Feierabende frisst.</p>

<h2>Priorität 1: Google-Unternehmensprofil</h2>
<p>Das ist Ihre digitale Haustür für lokale Suche. Name, Adresse, Telefon, Kategorie, Öffnungszeiten, echte Baustellenfotos, Bewertungen. Wer das nicht pflegt, spielt Verstecken – egal wie gut die Arbeit ist. Ein vollständiges Profil arbeitet, während Sie auf dem Gerüst stehen. Mehr Praxis: <a href="/ratgeber/bewertung-google-profil-handwerk">Bewertungen &amp; Google-Profil</a>.</p>

<h2>Priorität 2: Eine klare Website</h2>
<p>Eine Seite, die mobil sofort sagt, was Sie tun und wie man Sie erreicht. Kein Hochglanz. Kontakt oben, Leistungen verständlich, ein paar Referenzen. Die Website bestätigt dem Suchenden: Das ist ein echter Betrieb. Zusammen mit dem Google-Profil entsteht die Basis für <strong>qualifizierte Anfragen</strong> – Menschen, die schon wissen, wen sie vor sich haben. Details: <a href="/ratgeber/seo-fuer-handwerker">SEO für Handwerker</a>.</p>

<h2>Priorität 3: Social Media – nur wenn Kapazität übrig ist</h2>
<p>Wenn Profil und Website stehen, kann Social Media sinnvoll sein: Vorher-Nachher, Team, Einblicke von der Baustelle. Ein Beitrag alle ein bis zwei Wochen schlägt täglich gehetzte Posts. Nutzen Sie es als Schaufenster, nicht als Hauptkanal für Notfall-Anfragen. Bewertungen und Weiterempfehlungen bleiben oft wirkungsvoller als der nächste Reel.</p>

<h2>Was Sie am Anfang bewusst weglassen können</h2>
<p>Um Zeit und Nerven zu sparen, streichen Sie vorerst:</p>
<ul>
<li>Tägliche Content-Pflicht auf Instagram, Facebook und TikTok gleichzeitig</li>
<li>Bezahlte Anzeigen, bevor Profil und Website stimmen</li>
<li>Fünf Tools, Newsletter und „Markenstrategie“-Workshops ohne konkreten Nutzen für Ihren Kalender</li>
<li>Ortsseiten-Massenproduktion und Agentur-Pakete, die nach Aktivität aussehen, aber keinen Anruf erzeugen</li>
</ul>
<p>Weglassen ist keine Schwäche. Es ist Handwerkslogik: Erst das Fundament, dann die Fassade. Wer im Erzgebirge den ganzen Tag liefert, verdient abends Ruhe – und ein System, das <strong>Sichtbarkeit</strong> ohne Dauerposten schafft.</p>

<h2>Ihr nächster Schritt</h2>
<p>Heute Abend: Kein Post. Stattdessen 20 Minuten Google-Profil oder Website-Kontakt auf dem Handy prüfen. Wenn beides steht, erst dann über Social Media nachdenken. Brauchen Sie einen Blick von außen: Im <a href="/kontakt">Erstgespräch</a> priorisieren wir mit Ihnen, was wirklich Anrufe bringt – und was Sie getrost bleiben lassen. Überblick zu den Alltagshebeln: <a href="/ratgeber/digitalisierung-handwerk">Digitalisierung im Handwerk</a>.</p>
`,
    relatedSlugs: [
      "digitalisierung-handwerk",
      "seo-fuer-handwerker",
      "bewertung-google-profil-handwerk",
    ],
    datePublished: "2026-01-21",
    dateModified: "2026-07-25",
  },
  {
    slug: "ki-telefonassistent-handwerk",
    title: "KI-Telefonassistent für Handwerker: Anrufe auf dem Dach nicht verlieren",
    description:
      "Handy vibriert auf dem Dach – und der Auftrag geht an den Nächsten. Wann KI-Telefon hilft, wann Online-Buchung reicht, und was gegen „zu unpersönlich“ spricht.",
    keyTakeaways: [
      "Auf dem Gerüst verpasste Anrufe landen oft beim Konkurrenten – nicht bei Ihrer Mailbox.",
      "Der Assistent hält Name, Anliegen und Rückrufnummer fest; Sie rufen zurück, wenn es passt.",
      "Online-Buchung für planbare Termine, KI-Telefon wenn Kunden sofort sprechen wollen.",
    ],
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Das Handy vibriert – Sie stehen auf dem Dach</h2>
<p>Wind, Handschuhe, Schraube zwischen den Zähnen. Das Handy vibriert in der Hosentasche. Sie wissen: Wenn Sie jetzt rangehen, riskieren Sie den Fokus – und vielleicht den Tritt. Wenn Sie nicht rangehen, hört der Interessent zwei Klingeln, legt auf und tippt den nächsten Betrieb in der Liste an. Abends liegt die verpasste Nummer da wie ein stiller Vorwurf. Das ist kein Organisationsfehler. Das ist Handwerksalltag im Erzgebirge – und genau dort hilft ein Assistent, der abnimmt, zuhört und Ihnen die Essenz schickt: Name, Anliegen, Rückrufnummer. <strong>Entlastung</strong>, ohne dass Sie 24/7 am Ohr hängen.</p>

<h2>Was der Assistent wirklich macht – und was nicht</h2>
<p>Er ersetzt Sie nicht als Meister. Er verhindert, dass Anrufe im Leeren verhallen. Wenn Sie beschäftigt sind, nimmt er höflich entgegen, stellt die richtigen Fragen und schickt Ihnen die Zusammenfassung. Sie entscheiden, wann Sie zurückrufen – mit klarem Kopf, nicht mit halbem Ohr auf dem Gerüst. So bleiben <strong>qualifizierte Anfragen</strong> im Betrieb, statt beim Nächsten in Google Maps.</p>

<h2>Online-Terminbuchung oder KI-Telefon?</h2>
<p>Beides hat seinen Platz – aber selten gleichzeitig als Erstlösung.</p>
<ul>
<li><strong>Online-Buchung</strong> passt, wenn Kunden Zeit haben zu planen: Beratung, Wartung, Besichtigung. Weniger Telefon hin und her, klare Slots.</li>
<li><strong>KI-Telefon</strong> passt, wenn jemand <em>jetzt</em> sprechen will: Leck, Kurzschluss, Sturmschaden. Dann wirkt ein Kalenderformular wie eine Absage.</li>
</ul>
<p>Viele Betriebe starten mit dem Telefon-Assistenten und ergänzen Buchung später für ruhige, planbare Aufträge. Umgekehrt: Wer nur Online-Buchung hat, verliert oft die Sofort-Anrufe.</p>

<h2>„KI ist mir zu unpersönlich“</h2>
<p>Verständlich. Niemand will, dass Kunden sich abgewimmelt fühlen. Der Unterschied zur alten Mailbox: Der Assistent stellt gezielte Fragen und gibt dem Kunden das Gefühl, gehört zu werden – statt „Sprechen Sie nach dem Signalton“. Und persönlich wird es danach: beim Rückruf durch Sie. Unpersönlich ist, wenn niemand abnimmt und der Auftrag still verschwindet. Persönlich ist, wenn Sie abends mit vollständigen Infos zurückrufen und sagen: „Ich habe Ihr Anliegen – wann passt es?“</p>

<h2>So starten Sie ohne Drama</h2>
<p>Klären Sie, welche Anrufe Sie heute verlieren (Baustelle, Feierabend, Wochenende). Legen Sie fest, welche Infos der Assistent immer braucht. Trainieren Sie kurze Antworten zu Ihren Leistungen und Orten. Nach einer Woche prüfen Sie: Kommen Rückrufe zustande? Wirken die Zusammenfassungen brauchbar? Im <a href="/kontakt">Erstgespräch</a> schauen wir, ob Telefon-Assistent, Online-Buchung oder beides zu Ihrem Alltag passt. Überblick: <a href="/ratgeber/digitalisierung-handwerk">Digitalisierung im Handwerk</a>.</p>
`,
    relatedSlugs: [
      "digitalisierung-handwerk",
      "handwerker-online-marketing",
      "seo-fuer-handwerker",
    ],
    datePublished: "2026-01-18",
    dateModified: "2026-07-25",
  },
  {
    slug: "bewertung-google-profil-handwerk",
    title: "Bewertungen & Google-Profil: Warum der Nachbar den Auftrag bekommt",
    description:
      "Konkurrent mit 4,8 Sternen gewinnt – obwohl Sie besser bauen. Wie Profil und Bewertungen zusammenwirken, ohne Kunden zu nerven.",
    keyTakeaways: [
      "Viele Kunden wählen den Betrieb mit klaren Sternen und vollständigen Infos – bevor sie anrufen.",
      "Profil und Bewertungen gehören zusammen: Lücken kosten Vertrauen und Sichtbarkeit.",
      "Systematisch bitten, ohne zu nerven – und auf Kritik sachlich antworten.",
    ],
    cluster: "digitalisierung-handwerk",
    pillarSlug: "digitalisierung-handwerk",
    content: `
<h2>Der Nachbar hat 4,8 Sterne – und den Auftrag</h2>
<p>Sie kennen die Arbeit des Kollegen. Fachlich sind Sie mindestens auf Augenhöhe. Trotzdem ruft der Hausbesitzer ihn an. Warum? Weil Google ihn mit Fotos, Öffnungszeiten und 4,8 Sternen zeigt – und Sie mit einem halb leeren Profil und drei alten Bewertungen. Der Kunde denkt nicht „Wer ist der bessere Handwerker?“. Er denkt: „Wer wirkt erreichbar und vertrauenswürdig?“ In dem Moment verlieren Sie den Auftrag nicht auf der Baustelle. Sie verlieren ihn in der kurzen Liste auf dem Handy.</p>

<h2>Zuerst einfach gefunden werden</h2>
<p>Firmenname, Adresse, Telefon, Kategorie, Öffnungszeiten, Website-Link – überall gleich geschrieben. Dazu echte Fotos von Baustellen und Team. Das klingt banal. Es ist der Unterschied zwischen „unsichtbar“ und „anrufbar“. Wenn Name, Adresse und Telefon auf Schild, Visitenkarte, Website und Google auseinanderlaufen, wirkt der Betrieb unordentlich – und Google traut dem Eintrag weniger. Ziel: <strong>einfach gefunden werden</strong>, ohne Agentur-Zauber.</p>

<h2>Bewertungen: System statt Zufall</h2>
<p>Zufriedenheit allein reicht nicht. Zufriedene Kunden bewerten selten von allein. Nach einem sauber abgeschlossenen Auftrag: freundlich fragen, direkten Link schicken, fertig. Nicht täglich nachhaken. Nicht peinlich drängen. Ein klarer Ablauf – z.&nbsp;B. am Tag der Abnahme – bringt mehr als sporadisches Hoffen. So wächst das Profil mit echten Stimmen, und <strong>qualifizierte Anfragen</strong> landen eher bei Ihnen als beim Lautesten in der Liste.</p>

<h2>„Kunden nerven wegen Bewertungen will ich nicht“</h2>
<p>Dann bitten Sie richtig: einmal, zum richtigen Zeitpunkt, mit Respekt. „Wenn Sie zufrieden waren, freuen wir uns über eine kurze Bewertung – hier der Link.“ Das ist Höflichkeit, kein Spam. Und bei Kritik: sachlich antworten, Lösung anbieten, nicht streiten. Eine beantwortete 3-Sterne-Bewertung wirkt oft professioneller als Schweigen. Fake-Bewertungen können Sie bei Google melden – der Rest ist Handwerk: zuhören und nachbessern.</p>

<h2>Diese Woche: Profil + eine Bitte</h2>
<p>Schließen Sie die Lücken im Google-Profil. Bitten Sie den nächsten zufriedenen Kunden um eine Bewertung. Mehr zur Auffindbarkeit: <a href="/ratgeber/seo-fuer-handwerker">SEO für Handwerker</a>. Zum Überblick: <a href="/ratgeber/digitalisierung-handwerk">Digitalisierung im Handwerk</a>. Unterstützung im <a href="/kontakt">Erstgespräch</a>.</p>
`,
    relatedSlugs: [
      "digitalisierung-handwerk",
      "seo-fuer-handwerker",
      "handwerker-online-marketing",
    ],
    datePublished: "2026-01-19",
    dateModified: "2026-07-25",
  },
];

// =============================================================================
// CLUSTER 2: IT-Service Handwerk
// =============================================================================

const CLUSTER_2_PILLAR: RatgeberArticle = {
  slug: "it-sicherheit-service-handwerk",
  title: "IT-Sicherheit & Service für Handwerk: Wenn der Server streikt",
  description:
    "Rechnung schreiben geht nicht – der Rechner hängt. Was Handwerksbetriebe wirklich brauchen: Absicherung, Hilfe bei Alltagshaken und klare Ansprechpartner.",
  keyTakeaways: [
    "Wenn IT ausfällt, steht nicht nur Technik still – auch Rechnungen, Angebote und Planung.",
    "Sicherheit heißt Backups, Updates und klare Zugänge – nicht teure Konzern-Lösungen.",
    "Ein Ansprechpartner für Alltagshaken entlastet mehr als fünf Support-Hotlines.",
  ],
  cluster: "it-service-handwerk",
  pillarSlug: "it-sicherheit-service-handwerk",
  content: `
<h2>Freitag, 16:10 Uhr: Die Rechnung muss raus – der Rechner nicht</h2>
<p>Der Kunde wartet auf die Rechnung. Sie sitzen im Büro, klicken, warten, klicken nochmal. Der Server hängt. Oder der Laptop. Oder die Verbindung zur Cloud. Ohne System keine Rechnung, kein Angebot, keine Planung für Montag. Die Baustelle war erledigt – das Büro blockiert den Feierabend. Genau das ist der Moment, in dem „IT-Service“ aufhört, abstrakt zu klingen. Es geht um Betriebsfähigkeit: dass Sie arbeiten können, wenn das Handwerk getan ist.</p>

<h2>Was im Alltag wirklich hakt</h2>
<p>Nicht die große Cyber-Story aus der Zeitung. Sondern: Passwörter auf Zetteln, keine Backups, veraltete Windows-Versionen, ein USB-Stick als „Datensicherung“, E-Mails, die niemand außer dem Chef öffnen kann. Wenn dann etwas passiert – Diebstahl, Defekt, Erpressungstrojaner – fehlt die <strong>Entlastung</strong>, die Sie sich mit Ordnung und Backups hätten kaufen können. Sicherheit im Handwerk heißt: Daten wiederherstellbar, Zugänge klar, Updates gemacht.</p>

<h2>Hausmeister-Logik statt Ticketnummer</h2>
<p>Große Systemhäuser sind oft zu teuer und zu fern. Der Neffe vom Chef hat keine Zeit. Was fehlt, ist jemand, den Sie anrufen können, wenn Excel spinnt, die Website hakt oder Microsoft 365 neu eingerichtet werden muss – ohne drei Wochen Wartezeit. Digitaler Hausmeister heißt: Stundenkontingent, klare Sprache, vor Ort oder remote. Weniger Chaos, mehr Kopf frei für die Baustelle.</p>

<h2>„Wir sind zu klein für IT-Sicherheit“</h2>
<p>Kleine Betriebe sind oft lohnendere Ziele – genau weil niemand Absicherung erwartet. Sie brauchen keinen Konzern-Bunker. Sie brauchen: automatische Backups, starke Passwörter (oder einen Passwort-Manager), aktuelle Systeme, und dass kritische Dateien nicht nur auf einem einzigen Laptop liegen. Das ist Handwerksschutz für Ihre Unterlagen – vergleichbar mit dem, dass Sie Werkzeug nicht unversichert im offenen Transporter lassen.</p>

<h2>Nächster Schritt</h2>
<p>Prüfen Sie diese Woche: Gibt es ein Backup, das Sie schon einmal erfolgreich zurückgespielt haben? Wissen Mitarbeiter, wohin Dateien gehören? Wenn nein: genau dort anfangen. Mehr zu Ordnung und Cloud: <a href="/ratgeber/cloud-baustelle-handwerk">Cloud &amp; Baustelle</a>. Überblick Digitalisierung: <a href="/ratgeber/digitalisierung-handwerk">Digitalisierung im Handwerk</a>. Im <a href="/kontakt">Erstgespräch</a> klären wir, was bei Ihnen den größten Druck rausnimmt.</p>
`,
  relatedSlugs: ["cloud-baustelle-handwerk", "digitalisierung-handwerk", "ki-im-handwerk"],
  datePublished: "2026-01-25",
  dateModified: "2026-07-25",
};

const CLUSTER_2_ARTICLES: RatgeberArticle[] = [
  {
    slug: "cloud-baustelle-handwerk",
    title: "Cloud & Ordnung: Nasse Notizen abends nicht mehr abtippen",
    description:
      "Abends im Büro nasse Baustellen-Zettel tippen? Wie Cloud und Microsoft 365 Handwerkern Feierabend zurückgeben – ohne IT-Vortrag.",
    keyTakeaways: [
      "Nasse Zettel und USB-Sticks kosten Feierabend und erzeugen doppelte Arbeit.",
      "Eine gemeinsame Ablage und klare E-Mail machen Teams handlungsfähig – auch wenn der Chef auf der Baustelle ist.",
      "Cloud heißt nicht „alles online teilen“, sondern: Dateien wiederfinden und von unterwegs erreichen.",
    ],
    cluster: "it-service-handwerk",
    pillarSlug: "it-sicherheit-service-handwerk",
    content: `
<h2>20:45 Uhr: Nasse Notizen, kalter Kaffee, noch tippen</h2>
<p>Regen auf der Baustelle. Der Block im Auto ist feucht, die Schrift verwischt. Im Büro tippen Sie ab, was Sie tagsüber notiert haben – Maße, Material, Rückrufe. Morgen ist die Hälfte wieder unklar. Das ist kein Fleiß. Das ist doppelte Arbeit. Cloud und eine klare Office-Einrichtung ändern genau das: Infos landen einmal – und sind dann dort, wo sie hingehören. <strong>Entlastung</strong> statt Abendschicht am Schreibtisch.</p>

<h2>Was „Cloud“ im Handwerk konkret heißt</h2>
<p>Nicht: alles öffentlich im Internet. Sondern: gemeinsame Ablage für Angebote, Rechnungen, Pläne und Fotos. E-Mail der Firma statt privater Gmail. Kalender, die das Team sieht. Wenn der Meister auf dem Dach steht, kann das Büro trotzdem die richtige Datei finden. Wenn der Laptop kaputtgeht, sind die Unterlagen nicht weg. Das schafft Ruhe – und weniger „Wo war nochmal…?“.</p>

<h2>Microsoft 365 – ohne Schulungs-Marathon</h2>
<p>E-Mail, OneDrive, Teams oder SharePoint: Sinnvoll eingerichtet und kurz erklärt. Nicht 40 Funktionen auf einmal. Sondern: Wo liegen Angebote? Wie teilen wir Baustellenfotos? Wer hat Zugriff? Ein klarer Ordnerbaum schlägt jedes Tool-Chaos. Danach wächst der Nutzen mit – statt dass Software neue Arbeit erzeugt.</p>

<h2>„Das ist mir zu kompliziert / zu unsicher“</h2>
<p>Unsicheren ist der USB-Stick in der Hosentasche und die einzige Kopie auf dem alten Laptop. Cloud mit Login und Backup ist oft sicherer als der Status quo – wenn Zugänge klar und Passwörter stark sind. Kompliziert wird es nur, wenn niemand die Struktur festlegt. Deshalb: erst Ordnung, dann Tools. Mehr zur Absicherung: <a href="/ratgeber/it-sicherheit-service-handwerk">IT-Sicherheit &amp; Service</a>.</p>

<h2>Diese Woche ein Ordner</h2>
<p>Legen Sie drei klare Orte fest: Angebote, Rechnungen, Baustellenfotos. Wandern Sie die wichtigsten Dateien dorthin. Prüfen Sie, ob das Büro von einem zweiten Gerät darauf zugreifen kann. Hilfe bei Setup und Alltag: <a href="/leistungen">Leistungen</a> und <a href="/kontakt">Erstgespräch</a>.</p>
`,
    relatedSlugs: [
      "it-sicherheit-service-handwerk",
      "digitalisierung-handwerk",
      "ki-im-handwerk",
    ],
    datePublished: "2026-01-28",
    dateModified: "2026-07-25",
  },
];

// =============================================================================
// CLUSTER 3: KI im Handwerk
// =============================================================================

const CLUSTER_3_PILLAR: RatgeberArticle = {
  slug: "ki-im-handwerk",
  title: "KI im Handwerk: Büro entlasten – nicht Roboter auf der Baustelle",
  description:
    "Angebote in fünf Minuten statt zwei Stunden. Wie Handwerker KI sinnvoll im Büro nutzen – mit Szene, Einwand und klaren Grenzen.",
  keyTakeaways: [
    "KI entlastet das Büro: Texte, Angebote, Antworten – nicht die handwerkliche Arbeit auf der Baustelle.",
    "Ein gutes Angebot in Minuten entwirft die KI; Sie prüfen Preise, Ton und lokale Besonderheiten.",
    "Regeln und Datenschutz ernst nehmen – ohne Panik vor Buzzwords.",
  ],
  cluster: "ki-im-handwerk",
  pillarSlug: "ki-im-handwerk",
  content: `
<h2>Das Angebot, das zwei Stunden frisst</h2>
<p>Feierabend. Die Baustelle ist klar. Im Büro wartet noch das Angebot: Formulierungen, Positionen, höflicher Einstieg, Leistungsumfang. Zwei Stunden später ist der Text fertig – und Sie sind fertig. Stellen Sie sich vor, der erste Entwurf steht in fünf Minuten: Struktur, Formulierungen, Checkliste. Sie prüfen Zahlen und Ton, passen an, schicken ab. Das ist KI im Handwerk, wie sie Sinn ergibt: <strong>Entlastung</strong> im Büro – nicht der Traum vom Roboter-Dachdecker.</p>

<h2>Was KI gut kann – und was Sie behalten</h2>
<p>Gut: E-Mails formulieren, Angebotsentwürfe, Checklisten, kurze Erklärungen für Kunden, Ideen für Antworten auf Bewertungen. Schlecht ohne Kontrolle: Preise erfinden, Zusagen machen, rechtliche Feinheiten. Die KI kennt Ihren Betrieb und Ihre Region nicht so gut wie Sie. Deshalb: Entwurf von der Maschine, Verantwortung bei Ihnen. So entstehen schneller <strong>qualifizierte Anfragen</strong>-Antworten – ohne dass Sie nachts tippen.</p>

<h2>ChatGPT &amp; Co. im Meisterbetrieb</h2>
<p>Starten Sie mit einem konkreten Anwendungsfall: „Schreibe einen höflichen Angebotsentwurf für eine Dachreparatur in Aue, Ton: klar und bodenständig.“ Dann schärfen Sie nach. Speichern Sie gute Prompts. Schulen Sie das Team kurz – nicht mit Theorie, sondern mit dem nächsten echten Angebot. Wer KI nur ausprobiert und nie in den Ablauf einbaut, hat Spielerei statt Entlastung.</p>

<h2>„Dürfen wir das überhaupt? / EU AI Act“</h2>
<p>Kurz: Ja, mit Verstand. Kundendaten nicht unnötig in öffentliche Tools kopieren. Keine geheimen Kalkulationen in fremde Chats. Interne Regeln festlegen: Was darf rein, was bleibt intern. Der EU AI Act ist kein Grund zur Panik für einen Handwerksbetrieb, der Texte entwirft – aber ein Anlass, bewusst zu arbeiten. Bei Unsicherheit: lieber anonymisierte Beispiele nutzen und sensible Daten weglassen.</p>

<h2>Nächster Schritt</h2>
<p>Nehmen Sie das nächste Angebot und lassen Sie einen Entwurf erzeugen. Stoppuhr. Prüfen. Anpassen. Wenn das Büro so leichter wird, bauen Sie den Ablauf fest ein. Mehr zu Telefon-Entlastung: <a href="/ratgeber/ki-telefonassistent-handwerk">KI-Telefonassistent</a>. IT-Grundlagen: <a href="/ratgeber/it-sicherheit-service-handwerk">IT-Sicherheit &amp; Service</a>. Im <a href="/kontakt">Erstgespräch</a> zeigen wir praxisnah, wo KI bei Ihnen Stunden spart – und wo nicht.</p>
`,
  relatedSlugs: [
    "ki-telefonassistent-handwerk",
    "digitalisierung-handwerk",
    "it-sicherheit-service-handwerk",
  ],
  datePublished: "2026-02-01",
  dateModified: "2026-07-25",
};

// =============================================================================
// ALL ARTICLES
// =============================================================================

const ALL_ARTICLES: RatgeberArticle[] = [
  CLUSTER_1_PILLAR,
  ...CLUSTER_1_ARTICLES,
  CLUSTER_2_PILLAR,
  ...CLUSTER_2_ARTICLES,
  CLUSTER_3_PILLAR,
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

function getArticlesByCluster(cluster: string): RatgeberArticle[] {
  return ALL_ARTICLES.filter((a) => a.cluster === cluster);
}

function getPillarArticles(): RatgeberArticle[] {
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
