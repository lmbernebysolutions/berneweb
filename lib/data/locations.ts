/**
 * Location Pages – Programmatic SEO
 * Phase 3: Long-Term
 * @see TASKLIST_PHASE_3_LONG_TERM.md
 */

export interface Municipality {
  readonly name: string;
  readonly slug: string;
  readonly type: "Stadt" | "Gemeinde";
  readonly population: number;
  readonly description: string;
  readonly nearbyOrte: readonly string[];
  readonly besonderheiten: readonly string[];
  readonly entfernung: number; // km von Aue-Bad Schlema
}

// Welle 1: Top 15 + weitere 44 Orte (59 gesamt)
const MUNICIPALITIES: Municipality[] = [
  {
    name: "Aue-Bad Schlema",
    slug: "aue-bad-schlema",
    type: "Stadt",
    population: 20500,
    description:
      "Aue-Bad Schlema ist der Sitz von Berneby Solutions und eine traditionsreiche Bergbaustadt im Erzgebirge. Die Stadt entstand 2020 aus dem Zusammenschluss von Aue und Bad Schlema und bietet Handwerkern und KMU eine zentrale Lage im Erzgebirgskreis. Wir unterstützen lokale Betriebe mit Webdesign, IT-Service und digitaler Sichtbarkeit – direkt vor Ort.",
    nearbyOrte: ["Schwarzenberg", "Lößnitz", "Bockau"],
    besonderheiten: ["Sitz von Berneby Solutions", "Zentrale Lage", "Bergbautradition"],
    entfernung: 0,
  },
  {
    name: "Annaberg-Buchholz",
    slug: "annaberg-buchholz",
    type: "Stadt",
    population: 19500,
    description:
      "Annaberg-Buchholz ist die Kreisstadt des Erzgebirgskreises und bekannt für Bergbau, Weihnachtskunst und den Annaberger Wochenmarkt. Mit fast 20.000 Einwohnern ist die Stadt ein wichtiger Wirtschaftsstandort. Berneby Solutions unterstützt Handwerker und Betriebe in Annaberg-Buchholz mit professionellen Websites, lokaler SEO und IT-Service – für maximale Sichtbarkeit bei Google.",
    nearbyOrte: ["Seiffen", "Oberwiesenthal", "Thum"],
    besonderheiten: ["Kreisstadt", "Weihnachtsstadt", "Bergbau-Museum"],
    entfernung: 28,
  },
  {
    name: "Marienberg",
    slug: "marienberg",
    type: "Stadt",
    population: 17000,
    description:
      "Marienberg liegt im Herzen des Erzgebirges und ist mit rund 17.000 Einwohnern eine der größten Städte der Region. Die historische Bergstadt mit ihrem markanten Marktplatz bietet Handwerkern und Einzelhändlern ein starkes lokales Umfeld. Wir helfen Betrieben in Marienberg mit Webdesign, 50+ Landingpages und KI-Telefonassistent – für mehr Anfragen aus der Region.",
    nearbyOrte: ["Olbernhau", "Zöblitz", "Seiffen"],
    besonderheiten: ["Historischer Marktplatz", "Bergstadt", "Zinnfiguren"],
    entfernung: 35,
  },
  {
    name: "Stollberg",
    slug: "stollberg",
    type: "Stadt",
    population: 11500,
    description:
      "Stollberg/Erzgeb. ist eine lebendige Kleinstadt im westlichen Erzgebirgskreis mit starker Handwerks- und Einzelhandelsstruktur. Die Stadt liegt verkehrsgünstig an der A72 und verbindet Erzgebirge und Chemnitzer Land. Berneby Solutions bringt Stollberger Betriebe mit lokaler SEO und professionellen Websites auf Seite 1 von Google – für Elektriker, Dachdecker, Sanitär und mehr.",
    nearbyOrte: ["Oelsnitz", "Lugau", "Thalheim"],
    besonderheiten: ["Verkehrsknoten A72", "Handwerksstandort", "Stadt der Türme"],
    entfernung: 22,
  },
  {
    name: "Schwarzenberg",
    slug: "schwarzenberg",
    type: "Stadt",
    population: 16500,
    description:
      "Schwarzenberg/Erzgeb. ist eine traditionsreiche Stadt mit Schloss und historischer Altstadt. Mit rund 16.500 Einwohnern zählt sie zu den größten Städten im Erzgebirgskreis. Handwerker und Gastronomen profitieren von der touristischen Anziehungskraft. Wir erstellen für Schwarzenberger Betriebe Websites mit lokaler SEO – damit Sie bei „Elektriker Schwarzenberg“ oder „Sanitär Schwarzenberg“ gefunden werden.",
    nearbyOrte: ["Aue-Bad Schlema", "Johanngeorgenstadt", "Raschau-Markersbach"],
    besonderheiten: ["Schloss Schwarzenberg", "Historische Altstadt", "Tourismus"],
    entfernung: 8,
  },
  {
    name: "Ehrenfriedersdorf",
    slug: "ehrenfriedersdorf",
    type: "Stadt",
    population: 4600,
    description:
      "Ehrenfriedersdorf liegt zwischen Annaberg und Thum und ist bekannt für Mineralien, Bergbau und die Greifensteine. Die Kleinstadt mit rund 4.600 Einwohnern hat eine starke Handwerks- und Gewerbestruktur. Berneby Solutions unterstützt lokale Betriebe mit Webdesign und IT-Service – kurze Wege aus Aue-Bad Schlema, persönliche Beratung inklusive.",
    nearbyOrte: ["Thum", "Annaberg-Buchholz", "Geyer"],
    besonderheiten: ["Greifensteine", "Mineralien", "Bergbau"],
    entfernung: 32,
  },
  {
    name: "Zschopau",
    slug: "zschopau",
    type: "Stadt",
    population: 9000,
    description:
      "Zschopau ist die „Stadt der Motorräder“ – bekannt durch die MZ-Werke und die Zschopautalbahn. Mit rund 9.000 Einwohnern bietet die Stadt am Fuße des Erzgebirges ein stabiles Gewerbeumfeld. Wir helfen Zschopauer Handwerkern und Einzelhändlern mit professionellen Websites und lokaler SEO – für Sichtbarkeit bei „Dachdecker Zschopau“ oder „Elektriker Zschopau“.",
    nearbyOrte: ["Marienberg", "Olbernhau", "Flöha"],
    besonderheiten: ["Motorradstadt", "Zschopautalbahn", "Schloss Wildeck"],
    entfernung: 42,
  },
  {
    name: "Olbernhau",
    slug: "olbernhau",
    type: "Stadt",
    population: 10800,
    description:
      "Olbernhau liegt im oberen Flöhatal und ist bekannt für Spielzeugherstellung, Weihnachtsdekoration und die Saigerhütte. Mit über 10.000 Einwohnern ist die Stadt ein wichtiger Standort für Handwerk und Tourismus. Berneby Solutions bringt Olbernhauer Betriebe mit Webdesign und lokaler SEO ins Netz – damit Sie bei lokalen Suchanfragen gefunden werden.",
    nearbyOrte: ["Marienberg", "Seiffen", "Zschopau"],
    besonderheiten: ["Saigerhütte", "Spielzeug", "Weihnachtsdekoration"],
    entfernung: 38,
  },
  {
    name: "Thum",
    slug: "thum",
    type: "Stadt",
    population: 5200,
    description:
      "Thum ist eine Kleinstadt im mittleren Erzgebirge zwischen Annaberg und Zschopau. Die Stadt mit rund 5.200 Einwohnern hat eine lange Tradition in Handwerk und Gewerbe. Wir unterstützen Thumer Betriebe mit Websites, lokaler SEO und IT-Service – aus dem Erzgebirge für das Erzgebirge, mit kurzen Wegen und persönlicher Beratung.",
    nearbyOrte: ["Ehrenfriedersdorf", "Annaberg-Buchholz", "Geyer"],
    besonderheiten: ["Bergstadt", "Handwerkstradition", "Zentral gelegen"],
    entfernung: 30,
  },
  {
    name: "Geyer",
    slug: "geyer",
    type: "Stadt",
    population: 3500,
    description:
      "Geyer liegt am Fuße des Geyersberges und ist bekannt für Bergbau, die Geyersche Binge und traditionelles Handwerk. Mit rund 3.500 Einwohnern ist die Kleinstadt ein typischer Erzgebirgsort. Berneby Solutions hilft Geyerschen Betrieben mit Webdesign und IT – damit Handwerker und Einzelhändler bei Google sichtbar werden und mehr Kunden erreichen.",
    nearbyOrte: ["Thum", "Ehrenfriedersdorf", "Annaberg-Buchholz"],
    besonderheiten: ["Geyersche Binge", "Bergbau", "Natur"],
    entfernung: 34,
  },
  {
    name: "Seiffen",
    slug: "seiffen",
    type: "Gemeinde",
    population: 2200,
    description:
      "Seiffen ist weltbekannt für die Weihnachtskunst – Räuchermännchen, Nussknacker und Spielzeug. Die Gemeinde mit rund 2.200 Einwohnern zieht jährlich viele Touristen an. Wir unterstützen Seiffener Handwerker, Kunsthandwerker und Gastronomen mit professionellen Websites und lokaler SEO – für Sichtbarkeit in der Weihnachtsstadt.",
    nearbyOrte: ["Olbernhau", "Annaberg-Buchholz", "Marienberg"],
    besonderheiten: ["Weihnachtsdorf", "Spielzeugmuseum", "Kunsthandwerk"],
    entfernung: 42,
  },
  {
    name: "Oberwiesenthal",
    slug: "oberwiesenthal",
    type: "Stadt",
    population: 2100,
    description:
      "Oberwiesenthal ist die höchstgelegene Stadt Deutschlands und ein beliebtes Wintersportzentrum. Mit rund 2.100 Einwohnern lebt die Stadt vom Tourismus. Berneby Solutions hilft Betrieben in Oberwiesenthal mit Websites und lokaler SEO – für Skiverleihe, Gastronomie, Handwerker und Dienstleister, die Gäste und Einheimische erreichen wollen.",
    nearbyOrte: ["Annaberg-Buchholz", "Seiffen", "Jöhstadt"],
    besonderheiten: ["Höchste Stadt Deutschlands", "Wintersport", "Fichtelberg"],
    entfernung: 38,
  },
  {
    name: "Lößnitz",
    slug: "loessnitz",
    type: "Stadt",
    population: 9000,
    description:
      "Lößnitz liegt zwischen Aue und Schwarzenberg und ist eine traditionsreiche Bergstadt mit starkem Handwerks- und Gewerbestand. Mit rund 9.000 Einwohnern bietet die Stadt ein stabiles lokales Umfeld. Wir bringen Lößnitzer Betriebe mit Webdesign und lokaler SEO ins Netz – für Elektriker, Dachdecker, Sanitär und alle, die vor Ort sichtbar sein wollen.",
    nearbyOrte: ["Aue-Bad Schlema", "Schwarzenberg", "Bockau"],
    besonderheiten: ["Bergstadt", "Handwerk", "Zentrale Lage"],
    entfernung: 6,
  },
  {
    name: "Oelsnitz",
    slug: "oelsnitz",
    type: "Stadt",
    population: 11500,
    description:
      "Oelsnitz/Erzgeb. liegt im Lugau-Oelsnitzer Steinkohlerevier und hat eine starke industrielle und handwerkliche Tradition. Mit rund 11.500 Einwohnern ist die Stadt ein wichtiger Standort. Berneby Solutions unterstützt Oelsnitzer Betriebe mit Websites, IT-Service und lokaler SEO – für Handwerker, Einzelhändler und Dienstleister, die bei Google gefunden werden wollen.",
    nearbyOrte: ["Stollberg", "Lugau", "Thalheim"],
    besonderheiten: ["Steinkohlebergbau", "Bergbaumuseum", "Industriestandort"],
    entfernung: 25,
  },
  {
    name: "Lugau",
    slug: "lugau",
    type: "Gemeinde",
    population: 8000,
    description:
      "Lugau liegt im ehemaligen Steinkohlerevier und hat sich zu einem modernen Gewerbestandort entwickelt. Mit rund 8.000 Einwohnern bietet die Gemeinde ein stabiles Umfeld für Handwerk und Einzelhandel. Wir helfen Lugauer Betrieben mit Webdesign und IT – damit Sie bei lokalen Suchanfragen wie „Elektriker Lugau“ oder „Sanitär Lugau“ auf Seite 1 erscheinen.",
    nearbyOrte: ["Oelsnitz", "Stollberg", "Thalheim"],
    besonderheiten: ["Steinkohlerevier", "Gewerbegebiet", "Verkehrsanbindung"],
    entfernung: 28,
  },
  // Weitere 44 Orte (kompakt mit unique Content)
  {
    name: "Bockau",
    slug: "bockau",
    type: "Gemeinde",
    population: 2300,
    description:
      "Bockau liegt im Westerzgebirge zwischen Aue und Schwarzenberg. Die Gemeinde mit rund 2.300 Einwohnern ist bekannt für Kräuteranbau und Natur. Berneby Solutions unterstützt Bockauer Betriebe mit Webdesign und lokaler SEO.",
    nearbyOrte: ["Aue-Bad Schlema", "Lößnitz", "Schwarzenberg"],
    besonderheiten: ["Kräuterdorf", "Natur", "Westerzgebirge"],
    entfernung: 5,
  },
  {
    name: "Grünhain-Beierfeld",
    slug: "gruenhain-beierfeld",
    type: "Stadt",
    population: 6000,
    description:
      "Grünhain-Beierfeld entstand aus dem Zusammenschluss von Grünhain und Beierfeld. Die Stadt mit rund 6.000 Einwohnern liegt südlich von Schwarzenberg. Wir helfen Betrieben mit Websites und lokaler SEO.",
    nearbyOrte: ["Schwarzenberg", "Raschau-Markersbach", "Aue-Bad Schlema"],
    besonderheiten: ["Kloster Grünhain", "Industriestandort", "Natur"],
    entfernung: 12,
  },
  {
    name: "Raschau-Markersbach",
    slug: "raschau-markersbach",
    type: "Gemeinde",
    population: 5000,
    description:
      "Raschau-Markersbach liegt im mittleren Erzgebirge mit starker Handwerkstradition. Die Gemeinde mit rund 5.000 Einwohnern bietet ein stabiles Gewerbeumfeld. Berneby Solutions bringt Betriebe mit Webdesign ins Netz.",
    nearbyOrte: ["Schwarzenberg", "Grünhain-Beierfeld", "Johanngeorgenstadt"],
    besonderheiten: ["Handwerk", "Natur", "Zentrale Lage"],
    entfernung: 15,
  },
  {
    name: "Johanngeorgenstadt",
    slug: "johanngeorgenstadt",
    type: "Stadt",
    population: 4000,
    description:
      "Johanngeorgenstadt liegt an der tschechischen Grenze und ist eine traditionsreiche Bergstadt. Mit rund 4.000 Einwohnern lebt die Stadt von Tourismus und Handwerk. Wir unterstützen Betriebe mit Websites und IT-Service.",
    nearbyOrte: ["Schwarzenberg", "Raschau-Markersbach", "Eibenstock"],
    besonderheiten: ["Grenzstadt", "Bergbau", "Wintersport"],
    entfernung: 22,
  },
  {
    name: "Eibenstock",
    slug: "eibenstock",
    type: "Stadt",
    population: 7500,
    description:
      "Eibenstock liegt im Westerzgebirge und ist bekannt für Talsperre, Wintersport und Textilindustrie. Mit rund 7.500 Einwohnern ist die Stadt ein wichtiger Standort. Berneby Solutions hilft mit Webdesign und lokaler SEO.",
    nearbyOrte: ["Johanngeorgenstadt", "Schöneck", "Aue-Bad Schlema"],
    besonderheiten: ["Eibenstock-Talsperre", "Wintersport", "Textil"],
    entfernung: 30,
  },
  {
    name: "Thalheim",
    slug: "thalheim",
    type: "Stadt",
    population: 6000,
    description:
      "Thalheim/Erzgeb. liegt im westlichen Erzgebirgskreis mit guter Verkehrsanbindung. Die Stadt mit rund 6.000 Einwohnern hat eine starke Gewerbestruktur. Wir bringen Thalheimer Betriebe mit lokaler SEO auf Seite 1.",
    nearbyOrte: ["Stollberg", "Oelsnitz", "Lugau"],
    besonderheiten: ["Verkehrsknoten", "Gewerbe", "Handwerk"],
    entfernung: 26,
  },
  {
    name: "Zöblitz",
    slug: "zoeblitz",
    type: "Stadt",
    population: 2800,
    description:
      "Zöblitz ist die „Stadt des Serpentinsteins“ und bekannt für Steinverarbeitung. Die Kleinstadt mit rund 2.800 Einwohnern liegt zwischen Marienberg und Olbernhau. Berneby Solutions unterstützt mit Webdesign und IT.",
    nearbyOrte: ["Marienberg", "Olbernhau", "Seiffen"],
    besonderheiten: ["Serpentinstein", "Steinverarbeitung", "Handwerk"],
    entfernung: 40,
  },
  {
    name: "Jöhstadt",
    slug: "joehstadt",
    type: "Stadt",
    population: 2600,
    description:
      "Jöhstadt liegt im oberen Erzgebirge nahe der tschechischen Grenze. Die Kleinstadt mit rund 2.600 Einwohnern hat eine lange Bergbautradition. Wir helfen Betrieben mit Websites und lokaler Sichtbarkeit.",
    nearbyOrte: ["Annaberg-Buchholz", "Oberwiesenthal", "Seiffen"],
    besonderheiten: ["Grenznähe", "Bergbau", "Natur"],
    entfernung: 42,
  },
  {
    name: "Scheibenberg",
    slug: "scheibenberg",
    type: "Stadt",
    population: 2100,
    description:
      "Scheibenberg liegt am gleichnamigen Berg und ist bekannt für Basalt und Aussicht. Die Kleinstadt mit rund 2.100 Einwohnern bietet Handwerkern ein lokales Umfeld. Berneby Solutions unterstützt mit Webdesign.",
    nearbyOrte: ["Annaberg-Buchholz", "Oberwiesenthal", "Thum"],
    besonderheiten: ["Scheibenberg", "Basalt", "Aussicht"],
    entfernung: 30,
  },
  {
    name: "Bärenstein",
    slug: "baerenstein",
    type: "Gemeinde",
    population: 2400,
    description:
      "Bärenstein liegt zwischen Annaberg und Oberwiesenthal. Die Gemeinde mit rund 2.400 Einwohnern profitiert vom Tourismus. Wir bringen Betriebe mit lokaler SEO ins Netz.",
    nearbyOrte: ["Annaberg-Buchholz", "Oberwiesenthal", "Seiffen"],
    besonderheiten: ["Tourismus", "Natur", "Wintersport"],
    entfernung: 35,
  },
  {
    name: "Crottendorf",
    slug: "crottendorf",
    type: "Gemeinde",
    population: 4000,
    description:
      "Crottendorf liegt im oberen Erzgebirge und ist bekannt für Musikinstrumentenbau. Die Gemeinde mit rund 4.000 Einwohnern hat eine starke Handwerkstradition. Berneby Solutions hilft mit Websites und IT.",
    nearbyOrte: ["Annaberg-Buchholz", "Seiffen", "Oberwiesenthal"],
    besonderheiten: ["Musikinstrumente", "Handwerk", "Weihnachtsdekoration"],
    entfernung: 38,
  },
  {
    name: "Königswalde",
    slug: "koenigswalde",
    type: "Gemeinde",
    population: 2300,
    description:
      "Königswalde liegt nördlich von Annaberg-Buchholz. Die Gemeinde mit rund 2.300 Einwohnern bietet ein ruhiges Gewerbeumfeld. Wir unterstützen mit Webdesign und lokaler SEO.",
    nearbyOrte: ["Annaberg-Buchholz", "Thum", "Geyer"],
    besonderheiten: ["Natur", "Handwerk", "Ländlich"],
    entfernung: 32,
  },
  {
    name: "Flöha",
    slug: "floeha",
    type: "Stadt",
    population: 11000,
    description:
      "Flöha liegt am Übergang vom Erzgebirge zum Mittelsachsen. Die Stadt mit rund 11.000 Einwohnern ist ein wichtiger Verkehrsknoten. Berneby Solutions bringt Flöhaer Betriebe mit Webdesign auf Seite 1.",
    nearbyOrte: ["Zschopau", "Chemnitz", "Augustusburg"],
    besonderheiten: ["Verkehrsknoten", "Textilgeschichte", "Gewerbe"],
    entfernung: 48,
  },
  {
    name: "Augustusburg",
    slug: "augustusburg",
    type: "Stadt",
    population: 4500,
    description:
      "Augustusburg ist bekannt für das Jagdschloss und die Motorradrennbahn. Die Stadt mit rund 4.500 Einwohnern liegt am Rand des Erzgebirgskreises. Wir helfen mit Websites und lokaler SEO.",
    nearbyOrte: ["Flöha", "Zschopau", "Chemnitz"],
    besonderheiten: ["Jagdschloss", "Motorradrennbahn", "Tourismus"],
    entfernung: 52,
  },
  {
    name: "Wolkenstein",
    slug: "wolkenstein",
    type: "Stadt",
    population: 4000,
    description:
      "Wolkenstein liegt im mittleren Erzgebirge mit Schloss und historischer Altstadt. Die Stadt mit rund 4.000 Einwohnern bietet Handwerkern ein stabiles Umfeld. Berneby Solutions unterstützt mit Webdesign.",
    nearbyOrte: ["Marienberg", "Zschopau", "Olbernhau"],
    besonderheiten: ["Schloss Wolkenstein", "Historische Altstadt", "Handwerk"],
    entfernung: 38,
  },
  {
    name: "Lengefeld",
    slug: "lengefeld",
    type: "Stadt",
    population: 4200,
    description:
      "Lengefeld liegt im mittleren Erzgebirge und ist bekannt für Kalkstein und das Kalkwerk. Die Stadt mit rund 4.200 Einwohnern hat eine industrielle Tradition. Wir bringen Betriebe mit lokaler SEO ins Netz.",
    nearbyOrte: ["Marienberg", "Olbernhau", "Zschopau"],
    besonderheiten: ["Kalkwerk", "Industrie", "Natur"],
    entfernung: 40,
  },
  {
    name: "Pockau-Lengefeld",
    slug: "pockau-lengefeld",
    type: "Gemeinde",
    population: 7500,
    description:
      "Pockau-Lengefeld entstand aus dem Zusammenschluss mehrerer Orte. Die Gemeinde mit rund 7.500 Einwohnern liegt im Flöhatal. Berneby Solutions unterstützt mit Webdesign und IT-Service.",
    nearbyOrte: ["Olbernhau", "Marienberg", "Seiffen"],
    besonderheiten: ["Flöhatal", "Natur", "Handwerk"],
    entfernung: 42,
  },
  {
    name: "Neuhausen",
    slug: "neuhausen",
    type: "Gemeinde",
    population: 2700,
    description:
      "Neuhausen/Erzgeb. liegt zwischen Seiffen und Olbernhau und ist bekannt für Spielzeug und Weihnachtsdekoration. Die Gemeinde mit rund 2.700 Einwohnern lebt vom Kunsthandwerk. Wir helfen mit Websites.",
    nearbyOrte: ["Seiffen", "Olbernhau", "Marienberg"],
    besonderheiten: ["Spielzeug", "Weihnachtsdekoration", "Kunsthandwerk"],
    entfernung: 44,
  },
  {
    name: "Deutschneudorf",
    slug: "deutschneudorf",
    type: "Gemeinde",
    population: 700,
    description:
      "Deutschneudorf liegt an der tschechischen Grenze im oberen Erzgebirge. Die kleine Gemeinde mit rund 700 Einwohnern hat eine Bergbautradition. Berneby Solutions unterstützt lokale Betriebe mit Webdesign.",
    nearbyOrte: ["Olbernhau", "Seiffen", "Annaberg-Buchholz"],
    besonderheiten: ["Grenznähe", "Bergbau", "Natur"],
    entfernung: 48,
  },
  {
    name: "Heidersdorf",
    slug: "heidersdorf",
    type: "Gemeinde",
    population: 800,
    description:
      "Heidersdorf liegt im oberen Flöhatal. Die Gemeinde mit rund 800 Einwohnern bietet Handwerkern ein ruhiges Umfeld. Wir bringen Betriebe mit lokaler SEO ins Netz.",
    nearbyOrte: ["Olbernhau", "Seiffen", "Neuhausen"],
    besonderheiten: ["Flöhatal", "Natur", "Ländlich"],
    entfernung: 46,
  },
  {
    name: "Niederschmiedeberg",
    slug: "niederschmiedeberg",
    type: "Gemeinde",
    population: 900,
    description:
      "Niederschmiedeberg liegt zwischen Olbernhau und Seiffen. Die Gemeinde mit rund 900 Einwohnern hat eine Handwerkstradition. Berneby Solutions unterstützt mit Webdesign und IT.",
    nearbyOrte: ["Olbernhau", "Seiffen", "Marienberg"],
    besonderheiten: ["Handwerk", "Natur", "Weihnachtsregion"],
    entfernung: 44,
  },
  {
    name: "Großrückerswalde",
    slug: "grossrueckerswalde",
    type: "Gemeinde",
    population: 3500,
    description:
      "Großrückerswalde liegt zwischen Marienberg und Annaberg. Die Gemeinde mit rund 3.500 Einwohnern bietet ein stabiles Gewerbeumfeld. Wir helfen mit Websites und lokaler SEO.",
    nearbyOrte: ["Marienberg", "Annaberg-Buchholz", "Thum"],
    besonderheiten: ["Zentrale Lage", "Handwerk", "Natur"],
    entfernung: 36,
  },
  {
    name: "Großolbersdorf",
    slug: "grossolbersdorf",
    type: "Gemeinde",
    population: 2900,
    description:
      "Großolbersdorf liegt im mittleren Erzgebirge. Die Gemeinde mit rund 2.900 Einwohnern hat eine Handwerkstradition. Berneby Solutions bringt Betriebe mit Webdesign auf Seite 1.",
    nearbyOrte: ["Marienberg", "Zschopau", "Wolkenstein"],
    besonderheiten: ["Handwerk", "Natur", "Zentral"],
    entfernung: 40,
  },
  {
    name: "Amtsberg",
    slug: "amtsberg",
    type: "Gemeinde",
    population: 3600,
    description:
      "Amtsberg liegt am Rand des Erzgebirgskreises bei Chemnitz. Die Gemeinde mit rund 3.600 Einwohnern bietet ein Gewerbeumfeld. Wir unterstützen mit Webdesign und lokaler SEO.",
    nearbyOrte: ["Zschopau", "Flöha", "Chemnitz"],
    besonderheiten: ["Chemnitzer Umland", "Gewerbe", "Verkehrsanbindung"],
    entfernung: 50,
  },
  {
    name: "Gornau",
    slug: "gornau",
    type: "Gemeinde",
    population: 1800,
    description:
      "Gornau liegt im Zschopautal zwischen Zschopau und Flöha. Die Gemeinde mit rund 1.800 Einwohnern hat eine industrielle Tradition. Berneby Solutions hilft mit Websites und IT.",
    nearbyOrte: ["Zschopau", "Flöha", "Marienberg"],
    besonderheiten: ["Zschopautal", "Industrie", "Natur"],
    entfernung: 46,
  },
  {
    name: "Hohndorf",
    slug: "hohndorf",
    type: "Gemeinde",
    population: 3500,
    description:
      "Hohndorf liegt im westlichen Erzgebirgskreis. Die Gemeinde mit rund 3.500 Einwohnern bietet Handwerkern ein stabiles Umfeld. Wir bringen Betriebe mit lokaler SEO ins Netz.",
    nearbyOrte: ["Stollberg", "Oelsnitz", "Lugau"],
    besonderheiten: ["Handwerk", "Gewerbe", "Verkehrsanbindung"],
    entfernung: 28,
  },
  {
    name: "Hormersdorf",
    slug: "hormersdorf",
    type: "Gemeinde",
    population: 1500,
    description:
      "Hormersdorf liegt zwischen Stollberg und Thalheim. Die Gemeinde mit rund 1.500 Einwohnern hat eine Handwerkstradition. Berneby Solutions unterstützt mit Webdesign.",
    nearbyOrte: ["Stollberg", "Thalheim", "Oelsnitz"],
    besonderheiten: ["Handwerk", "Ländlich", "Natur"],
    entfernung: 26,
  },
  {
    name: "Niederwürschnitz",
    slug: "niederwuerschnitz",
    type: "Gemeinde",
    population: 2500,
    description:
      "Niederwürschnitz liegt im Lugau-Oelsnitzer Revier. Die Gemeinde mit rund 2.500 Einwohnern hat eine Bergbautradition. Wir helfen mit Websites und lokaler SEO.",
    nearbyOrte: ["Oelsnitz", "Lugau", "Stollberg"],
    besonderheiten: ["Steinkohlerevier", "Bergbau", "Gewerbe"],
    entfernung: 28,
  },
  {
    name: "Burkhardtsdorf",
    slug: "burkhardtsdorf",
    type: "Gemeinde",
    population: 6200,
    description:
      "Burkhardtsdorf liegt am Rand des Erzgebirgskreises mit guter Anbindung an Chemnitz. Die Gemeinde mit rund 6.200 Einwohnern hat eine starke Gewerbestruktur. Berneby Solutions bringt Betriebe mit Webdesign auf Seite 1.",
    nearbyOrte: ["Stollberg", "Thalheim", "Gornsdorf"],
    besonderheiten: ["Chemnitzer Umland", "Gewerbe", "Verkehr"],
    entfernung: 32,
  },
  {
    name: "Gornsdorf",
    slug: "gornsdorf",
    type: "Gemeinde",
    population: 2000,
    description:
      "Gornsdorf liegt im westlichen Erzgebirgskreis. Die Gemeinde mit rund 2.000 Einwohnern bietet Handwerkern ein lokales Umfeld. Wir unterstützen mit Webdesign und IT.",
    nearbyOrte: ["Stollberg", "Thalheim", "Burkhardtsdorf"],
    besonderheiten: ["Handwerk", "Gewerbe", "Ländlich"],
    entfernung: 28,
  },
  {
    name: "Auerbach",
    slug: "auerbach",
    type: "Gemeinde",
    population: 2500,
    description:
      "Auerbach/Erzgeb. liegt zwischen Stollberg und Zschopau. Die Gemeinde mit rund 2.500 Einwohnern hat eine industrielle Tradition. Berneby Solutions hilft mit Websites und lokaler SEO.",
    nearbyOrte: ["Stollberg", "Zschopau", "Thalheim"],
    besonderheiten: ["Industrie", "Handwerk", "Verkehr"],
    entfernung: 32,
  },
  {
    name: "Schöneck",
    slug: "schoeneck",
    type: "Stadt",
    population: 3000,
    description:
      "Schöneck/Vogtl. liegt im Westerzgebirge nahe dem Vogtland. Die Stadt mit rund 3.000 Einwohnern ist ein Wintersportort. Wir bringen Betriebe mit Webdesign ins Netz.",
    nearbyOrte: ["Eibenstock", "Aue-Bad Schlema", "Breitenbrunn"],
    besonderheiten: ["Wintersport", "Skigebiet", "Tourismus"],
    entfernung: 35,
  },
  {
    name: "Breitenbrunn",
    slug: "breitenbrunn",
    type: "Gemeinde",
    population: 5200,
    description:
      "Breitenbrunn/Erzgeb. liegt im Westerzgebirge mit Talsperre und Natur. Die Gemeinde mit rund 5.200 Einwohnern bietet Handwerkern ein stabiles Umfeld. Berneby Solutions unterstützt mit Webdesign.",
    nearbyOrte: ["Schwarzenberg", "Eibenstock", "Aue-Bad Schlema"],
    besonderheiten: ["Talsperre", "Natur", "Handwerk"],
    entfernung: 18,
  },
  {
    name: "Schneeberg",
    slug: "schneeberg",
    type: "Stadt",
    population: 14500,
    description:
      "Schneeberg ist eine traditionsreiche Bergstadt mit Silberbergbau und historischer Altstadt. Mit rund 14.500 Einwohnern zählt sie zu den größten Städten im Erzgebirgskreis. Berneby Solutions bringt Schneeberger Betriebe mit Webdesign und lokaler SEO auf Seite 1 – für Elektriker, Dachdecker, Sanitär und mehr.",
    nearbyOrte: ["Aue-Bad Schlema", "Johanngeorgenstadt", "Zwickau"],
    besonderheiten: ["Bergstadt", "Silberbergbau", "St. Wolfgangskirche"],
    entfernung: 12,
  },
  {
    name: "Zwönitz",
    slug: "zwoenitz",
    type: "Stadt",
    population: 12000,
    description:
      "Zwönitz liegt im mittleren Erzgebirge und ist bekannt für Handwerk und Gewerbe. Mit rund 12.000 Einwohnern ist die Stadt ein wichtiger Standort. Berneby Solutions unterstützt Zwönitzer Betriebe mit Websites und lokaler SEO.",
    nearbyOrte: ["Stollberg", "Aue-Bad Schlema", "Chemnitz"],
    besonderheiten: ["Handwerk", "Gewerbe", "Verkehrsknoten"],
    entfernung: 20,
  },
  {
    name: "Bernsbach",
    slug: "bernsbach",
    type: "Stadt",
    population: 4500,
    description:
      "Bernsbach liegt im Westerzgebirge zwischen Aue und Schwarzenberg. Die Stadt mit rund 4.500 Einwohnern hat eine industrielle Tradition. Wir helfen mit Webdesign und lokaler SEO.",
    nearbyOrte: ["Aue-Bad Schlema", "Schwarzenberg", "Lauter-Bernsbach"],
    besonderheiten: ["Industrie", "Handwerk", "Natur"],
    entfernung: 6,
  },
  {
    name: "Lauter",
    slug: "lauter",
    type: "Stadt",
    population: 4500,
    description:
      "Lauter-Bernsbach liegt im Westerzgebirge. Die Stadt mit rund 4.500 Einwohnern hat eine Bergbautradition. Berneby Solutions bringt Betriebe mit Webdesign ins Netz.",
    nearbyOrte: ["Aue-Bad Schlema", "Bernsbach", "Schwarzenberg"],
    besonderheiten: ["Bergbau", "Handwerk", "Natur"],
    entfernung: 8,
  },
  {
    name: "Markersbach",
    slug: "markersbach",
    type: "Gemeinde",
    population: 1500,
    description:
      "Markersbach liegt im mittleren Erzgebirge mit Pumpspeicherwerk. Die Gemeinde mit rund 1.500 Einwohnern bietet ein ruhiges Umfeld. Wir unterstützen mit Webdesign.",
    nearbyOrte: ["Raschau-Markersbach", "Schwarzenberg", "Grünhain-Beierfeld"],
    besonderheiten: ["Pumpspeicherwerk", "Natur", "Energie"],
    entfernung: 14,
  },
  {
    name: "Tannenberg",
    slug: "tannenberg",
    type: "Gemeinde",
    population: 1100,
    description:
      "Tannenberg liegt im oberen Erzgebirge. Die Gemeinde mit rund 1.100 Einwohnern hat eine Handwerkstradition. Berneby Solutions hilft mit Websites und IT.",
    nearbyOrte: ["Annaberg-Buchholz", "Seiffen", "Oberwiesenthal"],
    besonderheiten: ["Handwerk", "Natur", "Weihnachtsregion"],
    entfernung: 36,
  },
  {
    name: "Drebach",
    slug: "drebach",
    type: "Gemeinde",
    population: 5000,
    description:
      "Drebach liegt zwischen Zschopau und Thum. Die Gemeinde mit rund 5.000 Einwohnern ist bekannt für Krokusblüte und Natur. Wir bringen Betriebe mit lokaler SEO ins Netz.",
    nearbyOrte: ["Thum", "Zschopau", "Geyer"],
    besonderheiten: ["Krokusblüte", "Natur", "Tourismus"],
    entfernung: 36,
  },
  {
    name: "Venusberg",
    slug: "venusberg",
    type: "Gemeinde",
    population: 2400,
    description:
      "Venusberg liegt im mittleren Erzgebirge. Die Gemeinde mit rund 2.400 Einwohnern bietet Handwerkern ein lokales Umfeld. Berneby Solutions unterstützt mit Webdesign.",
    nearbyOrte: ["Marienberg", "Zschopau", "Wolkenstein"],
    besonderheiten: ["Handwerk", "Natur", "Ländlich"],
    entfernung: 38,
  },
  {
    name: "Waldkirchen",
    slug: "waldkirchen",
    type: "Gemeinde",
    population: 1100,
    description:
      "Waldkirchen/Erzgeb. liegt zwischen Stollberg und Zwönitz. Die Gemeinde mit rund 1.100 Einwohnern hat eine Handwerkstradition. Wir helfen mit Websites und lokaler SEO.",
    nearbyOrte: ["Stollberg", "Zwönitz", "Thalheim"],
    besonderheiten: ["Handwerk", "Natur", "Ländlich"],
    entfernung: 24,
  },
  {
    name: "Königshain-Wiederau",
    slug: "koenigshain-wiederau",
    type: "Gemeinde",
    population: 2600,
    description:
      "Königshain-Wiederau liegt im westlichen Erzgebirgskreis. Die Gemeinde mit rund 2.600 Einwohnern bietet ein Gewerbeumfeld. Berneby Solutions bringt Betriebe mit Webdesign auf Seite 1.",
    nearbyOrte: ["Stollberg", "Chemnitz", "Burkhardtsdorf"],
    besonderheiten: ["Gewerbe", "Verkehr", "Handwerk"],
    entfernung: 30,
  },
  {
    name: "Niederfrohna",
    slug: "niederfrohna",
    type: "Gemeinde",
    population: 2300,
    description:
      "Niederfrohna liegt am Rand des Erzgebirgskreises. Die Gemeinde mit rund 2.300 Einwohnern hat eine industrielle Tradition. Wir unterstützen mit Webdesign und IT.",
    nearbyOrte: ["Stollberg", "Flöha", "Burkhardtsdorf"],
    besonderheiten: ["Industrie", "Chemnitzer Umland", "Gewerbe"],
    entfernung: 42,
  },
  {
    name: "Taura",
    slug: "taura",
    type: "Gemeinde",
    population: 2400,
    description:
      "Taura liegt zwischen Chemnitz und Stollberg. Die Gemeinde mit rund 2.400 Einwohnern bietet Handwerkern ein stabiles Umfeld. Berneby Solutions hilft mit Websites und lokaler SEO.",
    nearbyOrte: ["Stollberg", "Chemnitz", "Burkhardtsdorf"],
    besonderheiten: ["Gewerbe", "Verkehr", "Handwerk"],
    entfernung: 34,
  },
  {
    name: "Pfaffroda",
    slug: "pfaffroda",
    type: "Gemeinde",
    population: 2500,
    description:
      "Pfaffroda liegt im mittleren Erzgebirge zwischen Olbernhau und Zschopau. Die Gemeinde mit rund 2.500 Einwohnern hat eine Handwerkstradition. Berneby Solutions unterstützt mit Webdesign.",
    nearbyOrte: ["Olbernhau", "Zschopau", "Marienberg"],
    besonderheiten: ["Handwerk", "Natur", "Flöhatal"],
    entfernung: 44,
  },
];

// =============================================================================
// API
// =============================================================================

export function getLocationBySlug(slug: string): Municipality | undefined {
  return MUNICIPALITIES.find((m) => m.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return MUNICIPALITIES.map((m) => m.slug);
}

export function getNearbyLocationSlugs(location: Municipality): string[] {
  return location.nearbyOrte
    .map((name) => MUNICIPALITIES.find((m) => m.name === name)?.slug)
    .filter((s): s is string => s != null);
}
