import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProblemToSolutionScrollSection } from "@/components/sections/ProblemToSolutionScrollSection";
import { PricingCards } from "@/components/sections/PricingCards";
import { CtaSection } from "@/components/sections/CtaSection";
import { ReferenzCard } from "@/components/sections/ReferenzenCarousel";
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Button } from "@/components/ui/button";
import { TechCorners } from "@/components/ui/tech-corners";
import {
  IconCheck,
  IconPhone,
  IconArrowRight,
  IconX,
  IconDeviceDesktop,
  IconShoppingCart,
  IconTool,
  IconChartBar,
} from "@tabler/icons-react";
import {
  getBrancheBySlug,
  getAllBranchenSlugs,
} from "@/lib/data/branchen";
import { REFERENZEN } from "@/lib/data/referenzen";
import { generateBreadcrumbSchema, generateFaqSchema, generateProfessionalServiceSchema } from "@/lib/seo/schema";
import {
  COMPANY,
  HANDWERK_STATS,
  CRAFT_PACKAGES,
  SITE_URL,
  SERVICES,
  HOME_STANDARD_SERVICE_KEYS,
  PROCESS_STEPS,
} from "@/lib/constants";
import { ROUTE_VISIBILITY } from "@/lib/route-visibility";
import { CONTAINER_A_STATIC, CONTAINER_B } from "@/lib/container-styles";
import { cn } from "@/lib/utils";

const BRANCHE_SERVICE_ICONS = {
  webseiten: IconDeviceDesktop,
  ecommerce: IconShoppingCart,
  office: IconTool,
  marketing: IconChartBar,
} as const satisfies Record<(typeof HOME_STANDARD_SERVICE_KEYS)[number], typeof IconDeviceDesktop>;

function getBrancheReferenzen(branche: {
  name: string;
  slug: string;
  suchbegriffe: readonly string[];
}): { referenzen: typeof REFERENZEN; hasBrancheMatch: boolean } {
  const tokens = [branche.name, branche.slug, ...branche.suchbegriffe.slice(0, 3)].map((entry) =>
    entry.toLowerCase()
  );
  const matches = REFERENZEN.filter((ref) => {
    const corpus = `${ref.branche} ${ref.tagline} ${ref.beschreibung} ${ref.challenge} ${ref.loesung}`.toLowerCase();
    return tokens.some((token) => corpus.includes(token));
  });

  return {
    referenzen: (matches.length > 0 ? matches : REFERENZEN).slice(0, 2),
    hasBrancheMatch: matches.length > 0,
  };
}

export async function generateStaticParams() {
  if (!ROUTE_VISIBILITY.branchen) {
    return [];
  }

  return getAllBranchenSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  if (!ROUTE_VISIBILITY.branchen) {
    return {
      title: "Branche nicht gefunden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { slug } = await params;
  const branche = getBrancheBySlug(slug);
  if (!branche) return { title: "Branche nicht gefunden" };
  const metaLead =
    branche.description.length > 155
      ? branche.description.slice(0, branche.description.lastIndexOf(" ", 155)).trim()
      : branche.description;

  return {
    title: `Website & Digitalisierung für ${branche.name} | Berneby Solutions`,
    description: `${metaLead}. Professionelle Websites, lokale SEO und KI-Telefon für ${branche.name} im Erzgebirge. Jetzt Erstgespräch vereinbaren.`,
    alternates: { canonical: `/branchen/${branche.slug}` },
  };
}

export default async function BranchePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!ROUTE_VISIBILITY.branchen) {
    notFound();
  }

  const { slug } = await params;
  const branche = getBrancheBySlug(slug);
  if (!branche) notFound();

  const professionalServiceSchema = generateProfessionalServiceSchema({
    name: `Berneby Solutions – Website & Digitalisierung für ${branche.name}`,
    description: branche.description,
    serviceType: `Website & Digitalisierung für ${branche.name}`,
    telephone: COMPANY.phone,
    priceRange: "auf Anfrage",
    imageUrl: `${SITE_URL}/berneby-logo-light.png`,
    address: {
      streetAddress: COMPANY.streetAddress,
      postalCode: COMPANY.postalCode,
      addressLocality: COMPANY.location,
      addressRegion: COMPANY.state,
      addressCountry: "DE",
    },
  });
  const { referenzen: brancheReferenzen, hasBrancheMatch } = getBrancheReferenzen(branche);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: "Branchen", url: "/branchen" },
    { name: branche.name, url: `/branchen/${branche.slug}` },
  ]);

  return (
    <>
      <Hero
        bergVariant="branchen"
        headline="Website & Digitalisierung für"
        headlineLine2={`${branche.name}.`}
        accentText={branche.name}
        compactHeadline
        subline={`Wir unterstützen ${branche.name} im Erzgebirge mit professionellen Websites, 50+ lokalen Landingpages, KI-Telefonassistent und IT-Service. Festpreis, 4 Wochen bis Go-Live. Jetzt Erstgespräch vereinbaren.`}
        ctas={[
          { label: "Erstgespräch vereinbaren", mobileLabel: "Erstgespräch", href: "#pakete", variant: "default" },
          { label: "Alle Handwerks-Pakete", href: "/handwerk", variant: "outline" },
        ]}
        variant="navy"
      />

      <TrustBar items={HANDWERK_STATS} />

      {/* 02: Problem -> Loesung */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Problem -> Lösung"
          title={`Vom Engpass zur klaren Struktur in ${branche.name}`}
          subtitle="Alte Reibungsverluste raus, klare Prozesse und bessere Auffindbarkeit rein."
          align="left"
          light
          compactTitle
        />
        <div className="md:hidden">
          <ProblemToSolutionScrollSection />
        </div>
        <div className="max-md:hidden grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
          <div
            className={cn("relative overflow-hidden p-6 sm:p-8 backdrop-blur-sm", CONTAINER_A_STATIC)}
            data-animate="fade-left"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white/60">Ohne uns</h3>
              <div
                className="flex h-10 w-10 items-center justify-center border-2 border-white/20 bg-white/5"
                aria-hidden="true"
              >
                <IconX className="size-6 text-white/40" stroke={3} />
              </div>
            </div>
            <div className="relative z-10 space-y-4">
              {branche.typischeProbleme.slice(0, 4).map((item, index) => (
                <div key={`without-${item.problem}`} className="border-l-2 border-white/10 bg-white/[0.02] p-4">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/35">
                    <span>Problem {index + 1}</span>
                    <span className="text-white/20">- {item.problem}</span>
                  </div>
                  <p className="mt-1 font-medium text-brand-navy-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn("group relative overflow-hidden p-6 sm:p-8 backdrop-blur-sm", CONTAINER_B)}
            data-animate="fade-right"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-brand-cyan">Mit uns</h3>
              <div
                className="flex h-10 w-10 items-center justify-center border-2 border-brand-cyan bg-brand-cyan/20 shadow-[0_0_20px_rgba(3,249,249,0.4)]"
                aria-hidden="true"
              >
                <IconCheck className="size-6 text-brand-cyan" stroke={3} />
              </div>
            </div>
            <div className="relative z-10 space-y-4">
              {branche.loesungen.slice(0, 4).map((item, index) => (
                <div key={`with-${item}`} className="relative border-l-2 border-brand-cyan bg-brand-cyan/10 p-4">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
                    <span>Lösung {index + 1}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-cyan shadow-[0_0_6px_rgba(3,249,249,0.8)]" />
                      ↑ klar
                    </span>
                  </div>
                  <p className="mt-1 font-bold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 03: Leistungsgrid */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline={`Leistungen für ${branche.name}`}
          title="Digitales Leistungs-Set"
          subtitle={`Leistungen mit Fokus auf Sichtbarkeit, Anfragen und klare digitale Prozesse für ${branche.name}.`}
          align="left"
          light
          compactTitle
        />
        <div className="grid gap-6 md:grid-cols-2">
          {HOME_STANDARD_SERVICE_KEYS.map((key, i) => {
            const category = SERVICES[key];
            const Icon = BRANCHE_SERVICE_ICONS[key];
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

                <div className="relative z-10 flex items-center gap-4 border-b border-white/5 p-6">
                  <div className="flex h-12 w-12 items-center justify-center bg-brand-cyan/10 text-brand-cyan">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white">{category.title}</h3>
                </div>

                <div className="relative z-10 flex grow flex-col gap-4 p-6">
                  <p className="text-sm leading-relaxed text-white/75">
                    Für {branche.name}: {category.title.toLowerCase()} mit Fokus auf lokale Sichtbarkeit und
                    messbare Anfragen.
                  </p>
                  {visibleItems.map((item) => (
                    <div key={item.title} className="group/item relative">
                      <TechCorners pattern="all" variant="cyan" size="sm" />
                      <div className="flex items-baseline justify-between px-4 py-2 transition-colors group-hover/item:bg-brand-cyan/5">
                        <h4 className="text-xs font-medium uppercase tracking-wider text-white/90">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 mt-auto p-6 pt-0">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-between px-0 text-xs uppercase tracking-widest text-brand-navy-muted hover:bg-transparent hover:text-brand-cyan"
                  >
                    <Link href="/kontakt">
                      Erstgespräch buchen <IconArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 04: Ausführlicher Content – in Karten wie auf Hauptseiten */}
      <Section bg="transparent">
        <SectionHeading
          number="04"
          overline={`Für ${branche.name}`}
          title="Warum digitale Sichtbarkeit zählt"
          subtitle="76% der Nutzer, die lokal suchen, besuchen innerhalb von 24 Stunden ein Geschäft. Ohne starke Präsenz bleiben Sie unsichtbar."
          align="left"
          light
          compactTitle
        />
        {/* Lead: Beschreibung in einer Karte */}
        <div
          data-animate="fade-up"
          className="relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md p-8 md:p-10 mb-8 md:mb-12"
        >
          <TechCorners pattern="diagonal" variant="cyan" size="lg" />
          <p className="relative z-10 text-[0.9375rem] leading-relaxed text-white/85 md:text-base">
            {branche.description}
          </p>
        </div>

        {/* Zwei Karten: Warum profitieren + Preise (wie Über-uns Vision/Mission) */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div
            data-animate="fade-left"
            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 p-8 md:p-10">
              <div className="mb-3 flex h-12 w-12 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10" aria-hidden="true">
                <IconPhone className="size-6 text-brand-cyan" stroke={2} />
              </div>
              <h3 className="text-xl font-bold text-white md:text-2xl">
                Warum {branche.name} von Berneby profitieren
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
                {branche.name} im Erzgebirge stehen vor ähnlichen Herausforderungen: Sichtbarkeit bei
                Google, Anrufannahme wenn Sie beschäftigt sind, Bewertungsmanagement. Wir haben
                speziell für Handwerker und lokale Betriebe Pakete entwickelt – mit 50+ lokalen
                Landingpages für jeden Ort im Einzugsgebiet. So ranken Sie für Suchanfragen wie
                „{branche.suchbegriffe[0]}“ oder „{branche.name} [Ort]“. Der KI-Telefonassistent nimmt
                Anrufe entgegen, wenn Sie auf der Baustelle, in der Werkstatt oder beim Kunden sind.
                Kein Kunde geht mehr verloren.
              </p>
              {branche.suchbegriffe.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {branche.suchbegriffe.slice(0, 4).map((begriff) => (
                    <span
                      key={begriff}
                      className="rounded border border-brand-cyan/30 bg-brand-cyan/5 px-3 py-1 text-xs font-medium text-brand-cyan"
                    >
                      {begriff}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            data-animate="fade-right"
            className="group relative overflow-hidden border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/40 card-hover-glow"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 flex flex-col p-8 md:p-10">
              <div className="mb-3 flex h-12 w-12 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10" aria-hidden="true">
                <IconCheck className="size-6 text-brand-cyan" stroke={2} />
              </div>
              <h3 className="text-xl font-bold text-white md:text-2xl">
                Pakete und Einordnung für {branche.name}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
                {branche.preisRelevant}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
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
                  Kostenloses Erstgespräch – 30 Min, unverbindlich
                </li>
              </ul>
              <div className="mt-8">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/kontakt">
                    <span className="sm:hidden">Erstgespräch</span>
                    <span className="hidden sm:inline">Jetzt Erstgespräch vereinbaren</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="transparent">
        <SectionHeading
          number="05"
          overline="Ablauf"
          title="In 5 Schritten zur Umsetzung"
          subtitle={`Für ${branche.name}: von der ersten Anfrage bis zum Go-Live mit klarem Ablauf und festen Ansprechpartnern.`}
          align="left"
          light
          compactTitle
        />
        <ProcessSteps steps={PROCESS_STEPS} />
      </Section>

      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Ergebnisse"
          title={hasBrancheMatch ? `Referenzen für ${branche.name}` : "Ausgewählte Referenzen"}
          subtitle="Design, Struktur und Conversion in der Praxis: ausgewählte Projekte mit messbarer Wirkung."
          align="left"
          light
          compactTitle
        />
        <div className="md:max-w-4xl lg:max-w-5xl md:mx-auto">
          <div className="md:hidden">
            <MobileSwipeGrid gridClassName="grid gap-6" slideMinWidth="min-w-[90%] sm:min-w-[75%]">
              {brancheReferenzen.map((ref) => (
                <ReferenzCard key={`mobile-${ref.id}`} referenz={ref} featured={false} compact />
              ))}
            </MobileSwipeGrid>
          </div>
          <div className="hidden md:grid md:grid-cols-2 md:gap-6">
            {brancheReferenzen.map((ref) => (
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

      <Section id="pakete" bg="subtle">
        <SectionHeading
          number="07"
          overline="Investition"
          title="PAKETE"
          titleLine2="& LÖSUNGEN"
          subtitle="Transparente Leistungen – konkretes Angebot im persönlichen Gespräch."
          align="left"
          light
          compactTitle
        />
        <PricingCards
          hidePrices
          packages={CRAFT_PACKAGES}
          comparisonRows={[
            { label: "Professionelle Website", inPackages: ["STARTKLAR", "SICHTBAR", "PARTNER"] },
            { label: "50+ Landingpages", inPackages: ["SICHTBAR", "PARTNER"] },
            { label: "KI-Telefonassistent", inPackages: ["PARTNER"] },
          ]}
        />
      </Section>

      {/* FAQ */}
      <Section bg="transparent">
        <SectionHeading
          number="08"
          overline="Fragen"
          title="HÄUFIGE"
          titleLine2="FRAGEN"
          subtitle={`Antworten für ${branche.name}`}
          align="left"
          light
          compactTitle
        />
        <FaqAccordion items={branche.faqItems} />
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <CtaSection
        headline="Bereit für das Upgrade?"
        subline={`Lassen Sie uns über Ihre Digitalisierung als ${branche.name} sprechen.`}
        ctas={[
          { label: "Jetzt Termin vereinbaren", href: "/kontakt" },
          { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema(branche.faqItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
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
