import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSection } from "@/components/sections/ProblemSection";
import dynamic from "next/dynamic";
import { PricingCards } from "@/components/sections/PricingCards";
import { CtaSection } from "@/components/sections/CtaSection";

const FaqAccordion = dynamic(
  () => import("@/components/sections/FaqAccordion").then((m) => ({ default: m.FaqAccordion })),
  { ssr: true }
);
import { Button } from "@/components/ui/button";
import { TechCorners } from "@/components/ui/tech-corners";
import { IconCheck, IconPhone } from "@tabler/icons-react";
import { WarumBernebyV3 } from "@/components/v3/WarumBernebyV3";
import {
  getBrancheBySlug,
  getAllBranchenSlugs,
} from "@/lib/data/branchen";
import { generateFaqSchema, generateProfessionalServiceSchema } from "@/lib/seo/schema";
import { COMPANY, HANDWERK_STATS, CRAFT_PACKAGES } from "@/lib/constants";
import { ROUTE_VISIBILITY } from "@/lib/route-visibility";

function toSingleWordHeading(text: string): string {
  const cleaned = text
    .replace(/[„“"'.:,;!?()]/g, " ")
    .trim();
  const firstWord = cleaned.split(/\s+/).find(Boolean);
  const upper = firstWord ? firstWord.toUpperCase() : "LÖSUNG";
  if (upper === "BEWERTUNGSMANAGEMENT" || upper === "BEWERTUNGSMANAGEMENTS") {
    return "BEWERTUNGS-\nMANAGEMENT";
  }
  return upper;
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

  return {
    title: `Website & Digitalisierung für ${branche.name} | Berneby Solutions`,
    description: `${branche.description.slice(0, 155)}... Professionelle Websites, lokale SEO und KI-Telefon für ${branche.name} im Erzgebirge. Jetzt Erstgespräch vereinbaren.`,
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
  });

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

      {/* Problem */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Die Herausforderung"
          title="Typische Probleme"
          subtitle="76% der Nutzer, die lokal suchen, besuchen innerhalb von 24 Stunden ein Geschäft. Ohne professionelle Website und lokale SEO existieren Sie für diese Kunden praktisch nicht."
          align="left"
          light
          compactTitle
        />
        <ProblemSection
          title="Typische Probleme"
          problems={[...branche.typischeProbleme]}
          variant="red"
        />
      </Section>

      {/* Lösungen – identisches Layout wie Garantien auf /handwerk, nur Inhalte branchenspezifisch */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Unsere Lösung"
          title="Was wir für Sie tun"
          subtitle="Websites, lokale SEO, KI-Telefon – alles aus einer Hand."
          align="left"
          light
          compactTitle
        />
        <WarumBernebyV3
          items={branche.loesungen.map((loesung) => ({
            point: toSingleWordHeading(loesung),
            detail: loesung,
          }))}
        />
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

      {/* Pricing – wie /handwerk: gleiche Paketnamen & Vergleich, Preise ausgeblendet (kein „Erstgespräch“ als Preiszeile) */}
      <Section id="pakete" bg="subtle">
        <SectionHeading
          number="05"
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
          number="06"
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
    </>
  );
}
