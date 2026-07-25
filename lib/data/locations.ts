/**
 * Location Pages – Hub-and-Spoke (5 Kernstandorte)
 * Basis-Metadaten; individueller Fließtext liegt in `lib/content/standorte.ts`.
 */

import { CORE_LOCATION_SLUGS, isCoreLocationSlug } from "@/lib/content/standorte";

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

const MUNICIPALITIES: Municipality[] = [
  {
    name: "Aue-Bad Schlema",
    slug: "aue-bad-schlema",
    type: "Stadt",
    population: 20500,
    description:
      "Aue-Bad Schlema ist der Sitz von Berneby Solutions und eine traditionsreiche Bergbaustadt im Erzgebirge. Die Stadt entstand 2020 aus dem Zusammenschluss von Aue und Bad Schlema und bietet Handwerkern und KMU eine zentrale Lage im Erzgebirgskreis.",
    nearbyOrte: ["Schwarzenberg", "Schneeberg", "Stollberg"],
    besonderheiten: ["Sitz von Berneby Solutions", "Zentrale Lage", "Bergbautradition"],
    entfernung: 0,
  },
  {
    name: "Schwarzenberg",
    slug: "schwarzenberg",
    type: "Stadt",
    population: 16500,
    description:
      "Schwarzenberg/Erzgeb. ist eine traditionsreiche Stadt mit Schloss und historischer Altstadt. Handwerker und Gastronomen profitieren von Tourismus und lokalem Alltaggeschäft.",
    nearbyOrte: ["Aue-Bad Schlema", "Schneeberg", "Annaberg-Buchholz"],
    besonderheiten: ["Schloss Schwarzenberg", "Historische Altstadt", "Tourismus"],
    entfernung: 8,
  },
  {
    name: "Schneeberg",
    slug: "schneeberg",
    type: "Stadt",
    population: 14500,
    description:
      "Schneeberg ist eine traditionsreiche Bergstadt mit Silberbergbau und historischer Altstadt – Brücke zwischen Erzgebirge und dem Raum Richtung Zwickau.",
    nearbyOrte: ["Aue-Bad Schlema", "Schwarzenberg", "Stollberg"],
    besonderheiten: ["Bergstadt", "Silberbergbau", "St. Wolfgangskirche"],
    entfernung: 12,
  },
  {
    name: "Stollberg",
    slug: "stollberg",
    type: "Stadt",
    population: 11500,
    description:
      "Stollberg/Erzgeb. liegt verkehrsgünstig an der A72 und verbindet Erzgebirge und Chemnitzer Land – starkes Handwerks- und Einzelhandelsumfeld.",
    nearbyOrte: ["Aue-Bad Schlema", "Schneeberg", "Annaberg-Buchholz"],
    besonderheiten: ["Verkehrsknoten A72", "Handwerksstandort", "Stadt der Türme"],
    entfernung: 22,
  },
  {
    name: "Annaberg-Buchholz",
    slug: "annaberg-buchholz",
    type: "Stadt",
    population: 19500,
    description:
      "Annaberg-Buchholz ist die Kreisstadt des Erzgebirgskreises – Verwaltungszentrum, Wochenmarkt und Magnet für Handwerk aus dem oberen Erzgebirge.",
    nearbyOrte: ["Schwarzenberg", "Stollberg", "Aue-Bad Schlema"],
    besonderheiten: ["Kreisstadt", "Weihnachtsstadt", "Bergbau-Museum"],
    entfernung: 28,
  },
];

// Guard: Datenquelle und Content-Spokes müssen synchron bleiben.
const municipalitySlugs = new Set(MUNICIPALITIES.map((m) => m.slug));
for (const slug of CORE_LOCATION_SLUGS) {
  if (!municipalitySlugs.has(slug)) {
    throw new Error(`CORE_LOCATION_SLUGS enthält unbekannten Slug: ${slug}`);
  }
}

export function getLocationBySlug(slug: string): Municipality | undefined {
  if (!isCoreLocationSlug(slug)) return undefined;
  return MUNICIPALITIES.find((m) => m.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return [...CORE_LOCATION_SLUGS];
}

export function getNearbyLocationSlugs(location: Municipality): string[] {
  return location.nearbyOrte
    .map((name) => MUNICIPALITIES.find((m) => m.name === name || m.name.startsWith(name))?.slug)
    .filter((s): s is string => s != null);
}
