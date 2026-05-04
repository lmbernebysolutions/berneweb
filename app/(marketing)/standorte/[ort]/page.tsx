import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContactForm } from "@/components/sections/ContactForm";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProblemToSolutionScrollSection } from "@/components/sections/ProblemToSolutionScrollSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ReferenzCard } from "@/components/sections/ReferenzenCarousel";
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { TechCorners } from "@/components/ui/tech-corners";
import {
  IconMapPin,
  IconCheck,
  IconCurrencyEuro,
  IconStar,
  IconBrandWhatsapp,
  IconBrandGoogle,
  IconArrowRight,
  IconX,
  IconDeviceDesktop,
  IconShoppingCart,
  IconTool,
  IconChartBar,
} from "@tabler/icons-react";
import {
  getLocationBySlug,
  getAllLocationSlugs,
  getNearbyLocationSlugs,
} from "@/lib/data/locations";
import { getAllBranchenSlugs, getBrancheBySlug } from "@/lib/data/branchen";
import { REFERENZEN } from "@/lib/data/referenzen";
import { generateBreadcrumbSchema, generateFaqSchema, generateLocalBusinessSchema } from "@/lib/seo/schema";
import {
  COMPANY,
  HANDWERK_STATS,
  SOCIAL_LINKS,
  SERVICES,
  HOME_STANDARD_SERVICE_KEYS,
  PROCESS_STEPS,
  OHNE_UNS_ROWS,
  MIT_UNS_ROWS,
} from "@/lib/constants";
import { ROUTE_VISIBILITY } from "@/lib/route-visibility";
import { CONTAINER_A_STATIC, CONTAINER_B } from "@/lib/container-styles";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  if (!ROUTE_VISIBILITY.standorte) {
    return [];
  }

  return getAllLocationSlugs().map((ort) => ({ ort }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ort: string }>;
}): Promise<Metadata> {
  if (!ROUTE_VISIBILITY.standorte) {
    return {
      title: "Standort nicht gefunden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { ort } = await params;
  const location = getLocationBySlug(ort);
  if (!location) return { title: "Standort nicht gefunden" };
  const variants = getLocationSearchVariants(location.name);

  return {
    title: `Webdesign & IT-Service in ${location.name} | Berneby Solutions`,
    description: `Professionelle Websites, lokale SEO und IT-Service für ${location.name} und Umgebung. ${location.population.toLocaleString("de-DE")} Einwohner – wir bringen Ihren Betrieb auf Seite 1. Jetzt Erstgespräch vereinbaren.`,
    alternates: { canonical: `/standorte/${location.slug}` },
    keywords: [
      location.name,
      ...variants,
      ...location.nearbyOrte.slice(0, 3),
      `Webdesign ${location.name}`,
      `SEO ${location.name}`,
    ],
  };
}

const LOCATION_SERVICE_ICONS = {
  webseiten: IconDeviceDesktop,
  ecommerce: IconShoppingCart,
  office: IconTool,
  marketing: IconChartBar,
} as const satisfies Record<(typeof HOME_STANDARD_SERVICE_KEYS)[number], typeof IconDeviceDesktop>;

const UMLAUT_FALLBACKS: Record<string, string> = {
  ä: "ae",
  ö: "oe",
  ü: "ue",
  Ä: "Ae",
  Ö: "Oe",
  Ü: "Ue",
  ß: "ss",
};

function toAsciiVariant(value: string): string {
  return value.replace(/[äöüÄÖÜß]/g, (char) => UMLAUT_FALLBACKS[char] ?? char);
}

function getLocationSearchVariants(name: string): string[] {
  const variants = new Set<string>();
  const cleaned = name
    .replace(/\/Erzgeb(?:irge)?\.?/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  variants.add(name);
  variants.add(cleaned);
  variants.add(`${cleaned} Erzgebirge`);
  variants.add(toAsciiVariant(cleaned));

  if (cleaned.includes("-")) {
    cleaned
      .split("-")
      .map((part) => part.trim())
      .filter((part) => part.length > 2)
      .forEach((part) => variants.add(part));
  }

  if (cleaned === "Aue-Bad Schlema") {
    variants.add("Aue");
    variants.add("Bad Schlema");
    variants.add("Aue (Sachsen)");
    variants.add("Bad Schlema Erzgebirge");
  }

  return Array.from(variants).filter(Boolean);
}

function buildLocationGeoContext(location: {
  name: string;
  nearbyOrte: readonly string[];
  besonderheiten: readonly string[];
}) {
  const variants = getLocationSearchVariants(location.name);
  const nearby = location.nearbyOrte.slice(0, 3);
  const highlights = location.besonderheiten.slice(0, 3);

  return {
    variants,
    nearby,
    highlights,
  };
}

const BRANCH_KEYWORDS: ReadonlyArray<{
  readonly slug: string;
  readonly keywords: readonly string[];
}> = [
  { slug: "gastronomie", keywords: ["tourismus", "wintersport", "weihnachts", "altstadt"] },
  { slug: "einzelhandel", keywords: ["marktplatz", "gewerbe", "industriestandort"] },
  { slug: "kfz-werkstatt", keywords: ["verkehr", "a72", "verkehrsknoten"] },
  { slug: "freiberufler", keywords: ["kreisstadt", "zentrale lage"] },
];

function getRelevantBranchenLinks(location: {
  name: string;
  besonderheiten: readonly string[];
}) {
  const terms = location.besonderheiten.join(" ").toLowerCase();
  const dynamicMatches = BRANCH_KEYWORDS.filter((entry) =>
    entry.keywords.some((keyword) => terms.includes(keyword))
  )
    .map((entry) => entry.slug)
    .slice(0, 2);

  const fallback = ["elektriker", "sanitaer-heizung", "dachdecker"];
  const uniqueSlugs = Array.from(new Set([...dynamicMatches, ...fallback])).slice(0, 3);

  return uniqueSlugs
    .map((slug) => getBrancheBySlug(slug))
    .filter((branche): branche is NonNullable<ReturnType<typeof getBrancheBySlug>> => Boolean(branche))
    .map((branche) => ({
      slug: branche.slug,
      name: branche.name,
      summary: branche.typischeProbleme[0]?.problem ?? `Digitale Sichtbarkeit für ${branche.name}`,
    }));
}

function buildLocationFaqItems(location: {
  name: string;
  nearbyOrte: readonly string[];
  entfernung: number;
}) {
  const neighbors = location.nearbyOrte.slice(0, 2).join(" und ") || "dem Erzgebirgskreis";
  return [
    {
      question: `Wie schnell kann ein Projekt in ${location.name} starten?`,
      answer:
        "Nach dem Erstgespräch starten wir in der Regel innerhalb weniger Werktage mit Struktur, Inhalten und Prioritäten. Erste sichtbare Ergebnisse sehen Sie meist bereits in den ersten zwei Wochen.",
    },
    {
      question: `Unterstützt Berneby Solutions auch Betriebe außerhalb von ${location.name}?`,
      answer: `Ja. Wir betreuen neben ${location.name} auch Unternehmen in ${neighbors}. Durch klare Prozesse und feste Ansprechpartner bleibt die Zusammenarbeit effizient und persönlich.`,
    },
    {
      question: "Welche Leistungen bringen die schnellste Wirkung für lokale Anfragen?",
      answer:
        "In den meisten Fällen wirken eine klar positionierte Website, lokale Landingpages und ein optimiertes Google-Unternehmensprofil am schnellsten. Ergänzend sorgt strukturierter Content für dauerhaft stabile Sichtbarkeit.",
    },
    {
      question: `Ist Vor-Ort-Beratung in ${location.name} möglich?`,
      answer:
        location.entfernung === 0
          ? `Ja, wir sitzen direkt in ${COMPANY.location} und beraten auch persönlich vor Ort.`
          : `Ja. Mit nur ${location.entfernung} km Entfernung sind auch Vor-Ort-Termine in ${location.name} möglich, wenn sie sinnvoll sind.`,
    },
  ] as const;
}

function getLocationReferenzen(location: {
  name: string;
  nearbyOrte: readonly string[];
}): { referenzen: typeof REFERENZEN; hasLocalMatch: boolean } {
  const tokens = [location.name, ...location.nearbyOrte.slice(0, 2)].map((entry) => entry.toLowerCase());
  const matches = REFERENZEN.filter((ref) => {
    const corpus = `${ref.tagline} ${ref.beschreibung} ${ref.challenge} ${ref.loesung}`.toLowerCase();
    return tokens.some((token) => corpus.includes(token));
  });

  return {
    referenzen: (matches.length > 0 ? matches : REFERENZEN).slice(0, 2),
    hasLocalMatch: matches.length > 0,
  };
}

export default async function StandortPage({
  params,
}: {
  params: Promise<{ ort: string }>;
}) {
  if (!ROUTE_VISIBILITY.standorte) {
    notFound();
  }

  const { ort } = await params;
  const location = getLocationBySlug(ort);
  if (!location) notFound();

  const nearbySlugs = getNearbyLocationSlugs(location);
  const { variants: locationSearchVariants, nearby: locationNearbyNames, highlights: locationHighlights } =
    buildLocationGeoContext(location);
  const relatedBranchen = getRelevantBranchenLinks(location);
  const locationFaqItems = buildLocationFaqItems(location);
  const topBranchenLinks = getAllBranchenSlugs().slice(0, 4);
  const { referenzen: locationReferenzen, hasLocalMatch: referenzenHasLocalMatch } = getLocationReferenzen(location);

  const localBusinessSchemaBase = generateLocalBusinessSchema({
    name: "Berneby Solutions",
    description: `Webdesign, IT-Service und lokale SEO für ${location.name} und den Erzgebirgskreis.`,
    areaServed: location.name,
    serviceRadiusKm: 30,
    addressLocality: "Aue-Bad Schlema",
    addressRegion: "Sachsen",
  });
  const localBusinessSchema = {
    ...localBusinessSchemaBase,
    alternateName: locationSearchVariants,
  };
  const faqSchema = generateFaqSchema(locationFaqItems);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: "Standorte", url: "/standorte" },
    { name: location.name, url: `/standorte/${location.slug}` },
  ]);

  return (
    <>
      <Hero
        bergVariant="standorte"
        headline="Webdesign & IT in"
        headlineLine2={`${location.name}.`}
        accentText={location.name}
        compactHeadline
        subline={`Wir unterstützen Handwerker und Betriebe in ${location.name} (${location.population.toLocaleString("de-DE")} Einwohner) mit professionellen Websites, lokaler SEO und IT-Service. Aus Aue-Bad Schlema (Aue) – ${location.entfernung === 0 ? "direkt vor Ort" : `nur ${location.entfernung} km entfernt`}.`}
        ctas={[
          { label: "Jetzt Erstgespräch buchen", href: "#kontakt", variant: "default" },
          { label: "Handwerks-Pakete", href: "/handwerk", variant: "outline" },
        ]}
        variant="navy"
      />

      <TrustBar items={HANDWERK_STATS} />

      {/* 02: Lokaler Bezug – Karten-Layout wie Branchen/Hauptseiten */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline={`Standort ${location.name}`}
          title={`Webdesign & IT-Service für ${location.name}`}
          subtitle={`In ${location.name} mit ${location.population.toLocaleString("de-DE")} Einwohnern unterstützen wir Handwerker, Einzelhändler und KMU mit professionellen Websites und digitaler Sichtbarkeit.`}
          align="left"
          light
          compactTitle
        />

        {/* Lead: Ortsbeschreibung */}
        <div
          data-animate="fade-up"
          className="relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md p-8 md:p-10 mb-8 md:mb-12"
        >
          <TechCorners pattern="diagonal" variant="cyan" size="lg" />
          <p className="relative z-10 text-[0.9375rem] leading-relaxed text-white/85 break-words md:text-base">
            {location.description}
          </p>
          <p className="relative z-10 mt-4 text-sm leading-relaxed text-white/75 break-words md:text-[0.9375rem]">
            Fokus in {location.name}: klare Positionierung, verlässlicher Auftritt und planbare Anfragen.
          </p>
        </div>

        {/* Zwei Karten: Warum Berneby + Besonderheiten – rechte Karte vertikal zur linken zentriert */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div
            data-animate="fade-left"
            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 p-8 md:p-10">
              <h3 className="text-xl font-bold text-white md:text-2xl">
                Warum Berneby Solutions in {location.name}?
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
                Website, lokale Sichtbarkeit, KI-Telefon und IT-Service aus einer Hand. Festpreis, klare
                Umsetzung in etwa 4 Wochen, 12 Monate Support. Für Betriebe in {location.name} und
                Umgebung.
                {location.entfernung === 0 && " Wir sitzen direkt vor Ort – kurze Wege, persönliche Beratung."}
              </p>
            </div>
          </div>

          <div
            data-animate="fade-right"
            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow flex flex-col items-center justify-center"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 p-5 md:p-6 w-full flex flex-col items-center text-center">
              <h3 className="text-base font-bold text-white md:text-lg uppercase tracking-wide">
                Besonderheiten von {location.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                {location.besonderheiten.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 rounded border border-brand-cyan/30 bg-brand-cyan/5 px-2.5 py-1 text-xs font-medium text-brand-cyan"
                  >
                    <IconStar className="size-3 shrink-0" stroke={2} aria-hidden="true" />
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leistungen für [Ort] – volle Breite */}
        <div
          data-animate="fade-up"
          className="group relative mt-8 md:mt-12 overflow-hidden border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/40 card-hover-glow"
        >
          <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
          <div className="relative z-10 p-8 md:p-10">
            <div className="mb-3 flex h-12 w-12 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10" aria-hidden="true">
              <IconCurrencyEuro className="size-6 text-brand-cyan" stroke={2} />
            </div>
            <h3 className="text-xl font-bold text-white md:text-2xl">
              Unsere Leistungen für {location.name}
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
              Professionelle Websites, lokale Landingpages, KI-Telefon und IT-Service. Alles auf
              Betriebe in {location.name} ausgerichtet, mit klaren Paketen und nachvollziehbarer
              Umsetzung.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
                Festpreis bis Abnahme
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
                12 Monate Support inklusive
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
                Kostenloses Erstgespräch
              </li>
            </ul>
          </div>
        </div>

        {/* Umgebung + CTA */}
        <div className="mt-8 md:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-12 min-w-0">
          {nearbySlugs.length > 0 && (
            <div
              data-animate="fade-left"
              className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md p-8 md:p-10 transition-all hover:border-brand-cyan/20 card-hover-glow"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white">
                  Webdesign in der Umgebung
                </h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  Wir unterstützen auch Betriebe in den Nachbarorten. Webdesign in{" "}
                  {nearbySlugs.slice(0, 5).map((slug, i) => {
                    const loc = getLocationBySlug(slug);
                    if (!loc) return null;
                    return (
                      <span key={slug}>
                        {i > 0 && ", "}
                        <Link
                          href={`/standorte/${slug}`}
                          className="text-brand-cyan hover:underline"
                        >
                          {loc.name}
                        </Link>
                      </span>
                    );
                  })}{" "}
                  – gleiche Qualität, kurze Wege.
                </p>
              </div>
            </div>
          )}

          <div
            data-animate="fade-right"
            className={`group relative overflow-hidden border border-brand-cyan/30 bg-brand-cyan/5 backdrop-blur-md p-5 sm:p-6 md:p-10 transition-all hover:border-brand-cyan/40 card-hover-glow min-w-0 ${nearbySlugs.length === 0 ? "md:col-span-2" : ""}`}
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 min-w-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10" aria-hidden="true">
                <IconMapPin className="size-5 sm:size-6 text-brand-cyan" stroke={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white text-sm sm:text-base">
                  {location.entfernung === 0
                    ? "Sitz von Berneby Solutions – wir sind vor Ort."
                    : `Nur ${location.entfernung} km von Aue-Bad Schlema (Aue).`}
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Kostenloses Erstgespräch, 30 Minuten, unverbindlich.
                </p>
                <Button asChild size="lg" className="mt-4 w-full text-center text-sm sm:w-auto sm:text-base">
                  <Link href="#kontakt">Erstgespräch vereinbaren</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Services – wie Startseite, aber lokalisiert auf den Ort */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline={`Leistungen in ${location.name}`}
          title="Digitales Leistungs-Set"
          subtitle={`Die gleichen Kernleistungen wie auf unserer Startseite – ausgerichtet auf Betriebe in ${location.name} und Umgebung.`}
          align="left"
          light
          compactTitle
        />
        <div className="grid gap-6 md:grid-cols-2">
          {HOME_STANDARD_SERVICE_KEYS.map((key, i) => {
            const category = SERVICES[key];
            const Icon = LOCATION_SERVICE_ICONS[key];
            const visibleItems = category.items.filter((item) => item.title !== "Digitaler Hausmeister");

            return (
              <div
                key={key}
                data-animate="fade-up"
                data-animate-delay={String(i * 80)}
                className={cn("group relative flex flex-col overflow-hidden", CONTAINER_B)}
              >
                <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

                <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
                  <Icon className="size-24 text-white" />
                </div>

                <div className="border-b border-white/5 p-6 flex items-center gap-4 relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center bg-brand-cyan/10 text-brand-cyan">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white uppercase tracking-wider break-words">{category.title}</h3>
                </div>

                <div className="p-6 flex flex-col grow gap-4 relative z-10">
                  <p className="text-sm text-white/70 leading-relaxed break-words">
                    Für {location.name}: {category.title.toLowerCase()} mit Fokus auf lokale Sichtbarkeit und messbare
                    Anfragen.
                  </p>
                  {visibleItems.map((item) => (
                    <div key={item.title} className="group/item relative">
                      <TechCorners pattern="all" variant="cyan" size="sm" />
                      <div className="flex justify-between items-baseline px-4 py-2 transition-colors group-hover/item:bg-brand-cyan/5">
                        <h4 className="font-medium text-xs text-white/90 uppercase tracking-wider break-words">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto p-6 pt-0 relative z-10">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-between text-brand-navy-muted hover:text-brand-cyan hover:bg-transparent px-0 uppercase tracking-widest text-xs"
                  >
                    <Link href="#kontakt">
                      Erstgespräch buchen <IconArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Prozess – wie auf Startseite/Leistungen, lokal kontextualisiert */}
      <Section bg="transparent">
        <SectionHeading
          number="04"
          overline="Ablauf"
          title="In 5 Schritten zur Umsetzung"
          subtitle={`Von der Anfrage aus ${location.name} bis zum Go-Live: klarer Ablauf, feste Ansprechpartner, transparente Übergaben.`}
          align="left"
          light
          compactTitle
        />
        <ProcessSteps steps={PROCESS_STEPS} />
      </Section>

      <Section bg="subtle">
        <SectionHeading
          number="05"
          overline="Systemwechsel"
          title={`Vorher vs. Nachher in ${location.name}`}
          subtitle="Nicht nur Design: klarer Unterschied bei Sichtbarkeit, Anfragen und digitalen Prozessen."
          align="left"
          light
          compactTitle
        />
        <div className="md:hidden">
          <ProblemToSolutionScrollSection />
        </div>
        <div className="max-md:hidden grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
          <div className={cn("relative overflow-hidden p-6 sm:p-8 backdrop-blur-sm", CONTAINER_A_STATIC)} data-animate="fade-left">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white/60">Ohne uns</h3>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-white/20 bg-white/5" aria-hidden="true">
                <IconX className="size-6 text-white/40" stroke={3} />
              </div>
            </div>
            <div className="relative z-10 space-y-4">
              {OHNE_UNS_ROWS.slice(0, 4).map((item) => (
                <div key={`without-${item.label}`} className="border-l-2 border-white/10 bg-white/[0.02] p-4">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/35">
                    <span>{item.label}</span>
                    <span className="text-white/20">— {item.risk}</span>
                  </div>
                  <p className="mt-1 font-medium text-brand-navy-muted">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={cn("group relative overflow-hidden p-6 sm:p-8 backdrop-blur-sm", CONTAINER_B)} data-animate="fade-right">
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-brand-cyan">Mit uns</h3>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-brand-cyan bg-brand-cyan/20 shadow-[0_0_20px_rgba(3,249,249,0.4)]" aria-hidden="true">
                <IconCheck className="size-6 text-brand-cyan" stroke={3} />
              </div>
            </div>
            <div className="relative z-10 space-y-4">
              {MIT_UNS_ROWS.slice(0, 4).map((item) => (
                <div key={`with-${item.label}`} className="relative border-l-2 border-brand-cyan bg-brand-cyan/10 p-4">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
                    <span>{item.label}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-cyan shadow-[0_0_6px_rgba(3,249,249,0.8)]" />
                      ↑ {item.gain}
                    </span>
                  </div>
                  <p className="mt-1 font-bold text-white">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Ergebnisse"
          title={referenzenHasLocalMatch ? `Referenzen aus der Region um ${location.name}` : "Ausgewählte Referenzen"}
          subtitle="Design, Struktur und Conversion in der Praxis: ausgewählte Projekte mit messbarer Wirkung."
          align="left"
          light
          compactTitle
        />
        <div className="md:max-w-4xl lg:max-w-5xl md:mx-auto">
          <div className="md:hidden">
            <MobileSwipeGrid gridClassName="grid gap-6" slideMinWidth="min-w-[90%] sm:min-w-[75%]">
              {locationReferenzen.map((ref) => (
                <ReferenzCard key={`mobile-${ref.id}`} referenz={ref} featured={false} compact />
              ))}
            </MobileSwipeGrid>
          </div>
          <div className="hidden md:grid md:grid-cols-2 md:gap-6">
            {locationReferenzen.map((ref) => (
              <ReferenzCard key={`desktop-${ref.id}`} referenz={ref} featured={false} compact />
            ))}
          </div>
        </div>
        <p className="mt-6 text-center">
          <Link
            href="/referenzen"
            className="text-sm font-mono uppercase tracking-widest text-brand-cyan transition-colors hover:text-brand-cyan/80"
          >
            Alle Referenzen ansehen <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Section>

      <Section bg="subtle">
        <SectionHeading
          number="07"
          overline={`Branchen in ${location.name}`}
          title="Typische Betriebe, die wir hier begleiten"
          subtitle={`Passende Einstiege für Betriebe in ${location.name}: verständlich aufgebaut und nah am Arbeitsalltag.`}
          align="left"
          light
          compactTitle
        />
        <div className="grid gap-6 md:grid-cols-3">
          {relatedBranchen.map((branche, index) => (
            <div
              key={branche.slug}
              data-animate="fade-up"
              data-animate-delay={String(index * 80)}
              className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 p-6 backdrop-blur-md transition-all hover:border-brand-cyan/30"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="md" animate />
              <p className="relative z-10 text-xs font-mono uppercase tracking-widest text-brand-cyan/70">
                {location.name}
              </p>
              <h3 className="relative z-10 mt-3 text-lg font-bold text-white">{branche.name}</h3>
              <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/75 break-words">
                Fokus: {branche.summary}
              </p>
              <Button asChild variant="ghost" className="relative z-10 mt-5 w-full justify-between px-0 text-xs uppercase tracking-wider text-brand-navy-muted hover:bg-transparent hover:text-brand-cyan">
                <Link href={`/branchen/${branche.slug}`}>
                  Branche ansehen <IconArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <nav aria-label="Weitere Branchen links" className="mt-6 flex flex-wrap gap-2">
          {topBranchenLinks.map((slug) => {
            const branche = getBrancheBySlug(slug);
            if (!branche) return null;
            return (
              <Link
                key={slug}
                href={`/branchen/${slug}`}
                className="inline-flex items-center rounded border border-brand-cyan/25 bg-brand-cyan/5 px-3 py-1.5 text-xs font-medium text-brand-cyan transition-colors hover:bg-brand-cyan/10"
              >
                {branche.name} im Erzgebirge
              </Link>
            );
          })}
          <Link
            href="/branchen"
            className="inline-flex items-center rounded border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-brand-cyan/30 hover:text-brand-cyan"
          >
            Alle Branchen ansehen
          </Link>
        </nav>
      </Section>

      <Section bg="transparent">
        <SectionHeading
          number="08"
          overline="Regional aktiv"
          title={`Im Umkreis von ${location.name} unterwegs`}
          subtitle="Nach den Kernleistungen: wo wir konkret unterstützen und wie die Zusammenarbeit regional funktioniert."
          align="left"
          light
          compactTitle
        />
        <div
          data-animate="fade-up"
          className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 p-6 md:p-8 backdrop-blur-md"
        >
          <TechCorners pattern="diagonal" variant="cyan" size="md" animate />
          <h3 className="relative z-10 text-base font-bold uppercase tracking-wide text-white">
            Umgebung & lokale Merkmale
          </h3>
          <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/75">
            Wir betreuen in und um {location.name} auch Betriebe in{" "}
            {locationNearbyNames.map((name, index) => (
              <span key={`${name}-${index}`}>
                {index > 0 ? ", " : ""}
                {name}
              </span>
            ))}
            . Inhalte und Schwerpunkte werden auf regionale Merkmale wie {locationHighlights.join(", ")} abgestimmt.
          </p>
          <ul className="relative z-10 mt-4 grid gap-2 text-sm text-white/70 md:grid-cols-2">
            <li className="flex items-center gap-2">
              <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
              Kurze Wege für Abstimmung und Umsetzung
            </li>
            <li className="flex items-center gap-2">
              <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
              Fester Ansprechpartner statt Ticketsystem
            </li>
            <li className="flex items-center gap-2">
              <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
              Klare Prioritäten für lokale Anfragen
            </li>
            <li className="flex items-center gap-2">
              <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
              Messbare Schritte statt Bauchgefühl
            </li>
          </ul>
          <div className="relative z-10 mt-4 flex flex-wrap gap-2">
            {nearbySlugs.slice(0, 4).map((slug) => {
              const loc = getLocationBySlug(slug);
              if (!loc) return null;
              return (
                <Link
                  key={slug}
                  href={`/standorte/${slug}`}
                  className="rounded border border-brand-cyan/25 bg-brand-cyan/5 px-3 py-1 text-xs font-medium text-brand-cyan transition-colors hover:bg-brand-cyan/10"
                >
                  {loc.name}
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      <Section bg="transparent">
        <SectionHeading
          number="09"
          overline="Häufige Fragen"
          title={`FAQ für Betriebe in ${location.name}`}
          subtitle="Kurz beantwortet: Umsetzung, Zusammenarbeit und lokaler Fokus."
          align="left"
          light
          compactTitle
        />
        <FaqAccordion items={locationFaqItems} />
      </Section>

      {/* Kontakt */}
      <Section id="kontakt" bg="transparent">
        <SectionHeading
          number="10"
          overline="Kontakt"
          title="Erstgespräch vereinbaren"
          subtitle="Kostenlos und unverbindlich – wir melden uns persönlich bei Ihnen."
          align="left"
          light
          compactTitle
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-white/80 mb-6">
              Sie haben Fragen zu Webdesign, IT-Service oder unseren Handwerks-Paketen für{" "}
              {location.name}? Schreiben Sie uns – wir melden uns zeitnah persönlich zurück.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-white/60">
                Telefon:{" "}
                <a href={`tel:${COMPANY.phone}`} className="text-brand-cyan hover:underline">
                  {COMPANY.phoneDisplay}
                </a>
              </p>
              <p className="text-sm text-white/60">
                E-Mail:{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-brand-cyan hover:underline">
                  {COMPANY.email}
                </a>
              </p>
            </div>

            {/* Direkt-Kanäle: WhatsApp + Google (lokal relevant) */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 shrink-0">
                Oder direkt:
              </span>
              <div className="flex gap-2">
                {SOCIAL_LINKS.filter((link) => link.label === "WhatsApp" || link.label === "Google").slice(0, 2).map((link) => {
                  const Icon = link.label === "WhatsApp" ? IconBrandWhatsapp : IconBrandGoogle;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className="group relative overflow-hidden border border-white/10 bg-white/[0.03] px-3 py-2 flex items-center gap-2 transition-all hover:border-brand-cyan/40 hover:bg-brand-cyan/5 cursor-pointer"
                    >
                      <Icon className="size-4 text-brand-cyan relative z-10 shrink-0" stroke={1.5} />
                      <span className="text-xs font-semibold text-brand-navy-muted relative z-10">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <SectionCard variant="default" className="flex-1 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-wide">Nachricht schreiben</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Alle Felder mit * sind Pflichtfelder.
                </p>
              </div>
              <div className="hidden font-mono text-[0.6rem] text-brand-cyan/30 uppercase tracking-widest sm:block">
                FORM.SYS
              </div>
            </div>
            <ContactForm />
          </SectionCard>
        </div>
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <CtaSection
        headline="Bereit für das Upgrade?"
        subline={`Lassen Sie uns über Ihre Digitalisierung in ${location.name} sprechen.`}
        ctas={[
          { label: "Jetzt Termin vereinbaren", href: "#kontakt" },
          { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
