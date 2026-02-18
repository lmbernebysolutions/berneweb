import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { PricingCards } from "@/components/sections/PricingCards";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import { TechCorners } from "@/components/ui/tech-corners";
import { IconCheck, IconCurrencyEuro, IconPhone } from "@tabler/icons-react";
import {
  getBrancheBySlug,
  getAllBranchenSlugs,
} from "@/lib/data/branchen";
import { generateFaqSchema, generateProfessionalServiceSchema } from "@/lib/seo/schema";
import { COMPANY, HANDWERK_STATS, CRAFT_PACKAGES } from "@/lib/constants";

const BASE_URL = "https://berneby.de";

export async function generateStaticParams() {
  return getAllBranchenSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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
        headline={`Website & Digitalisierung für ${branche.name}.`}
        accentText={branche.name}
        subline={`Wir unterstützen ${branche.name} im Erzgebirge mit professionellen Websites, 50+ lokalen Landingpages, KI-Telefonassistent und IT-Service. Festpreis, 4 Wochen bis Go-Live. Jetzt Erstgespräch vereinbaren.`}
        ctas={[
          { label: "Jetzt Erstgespräch buchen", href: "#pakete", variant: "default" },
          { label: "Alle Handwerks-Pakete", href: "/handwerk", variant: "outline" },
        ]}
        variant="navy"
      />

      <TrustBar items={HANDWERK_STATS} />

      {/* Problem */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline={`${branche.name} – Die Herausforderung`}
          title="Typische Probleme"
          subtitle="76% der Nutzer, die lokal suchen, besuchen innerhalb von 24 Stunden ein Geschäft. Ohne professionelle Website und lokale SEO existieren Sie für diese Kunden praktisch nicht."
          align="left"
          light
        />
        <ProblemSection
          title="Typische Probleme"
          problems={[...branche.typischeProbleme]}
          variant="red"
        />
      </Section>

      {/* Lösungen */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Unsere Lösung"
          title="Was wir für Sie tun"
          subtitle="Websites, lokale SEO, KI-Telefon – alles aus einer Hand."
          align="left"
          light
        />
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {branche.loesungen.map((loesung, i) => (
            <div
              key={loesung}
              data-animate="fade-up"
              data-animate-delay={String(i * 80)}
              className="group relative min-w-0 overflow-hidden border border-white/10 bg-brand-navy/60 p-5 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow md:p-6"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="sm" />
              <div className="relative z-10 flex min-w-0 items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10 md:h-10 md:w-10">
                  <IconCheck className="size-5 text-brand-cyan" stroke={2.5} />
                </div>
                <p className="min-w-0 break-words text-sm font-medium text-white md:text-base">{loesung}</p>
              </div>
            </div>
          ))}
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
                <IconCurrencyEuro className="size-6 text-brand-cyan" stroke={2} />
              </div>
              <h3 className="text-xl font-bold text-white md:text-2xl">
                Preise und Pakete für {branche.name}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
                {branche.preisRelevant}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <IconCheck className="size-4 shrink-0 text-brand-cyan" stroke={2.5} />
                  Alle Preise netto zzgl. MwSt.
                </li>
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
                <Button asChild size="lg" className="w-full sm:w-auto bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90">
                  <Link href="/kontakt">Jetzt Erstgespräch vereinbaren</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pakete" bg="subtle">
        <SectionHeading
          number="05"
          overline="Investition"
          title="Pakete & Preise"
          subtitle="Netto. Transparent. Ohne versteckte Kosten."
          align="left"
          light
        />
        <PricingCards
          packages={CRAFT_PACKAGES}
          comparisonRows={[
            { label: "Professionelle Website", inPackages: ["Geselle", "Meisterbetrieb", "Marktführer"] },
            { label: "50+ Landingpages", inPackages: ["Meisterbetrieb", "Marktführer"] },
            { label: "KI-Telefonassistent", inPackages: ["Marktführer"] },
          ]}
        />
      </Section>

      {/* FAQ */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="FAQ"
          title="Häufige Fragen"
          subtitle={`Antworten für ${branche.name}`}
          align="left"
          light
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
