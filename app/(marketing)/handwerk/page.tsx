import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
import { CraftToolboxGrid } from "@/components/sections/CraftToolboxGrid";
import { PricingCards } from "@/components/sections/PricingCards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  IconArrowRight,
  IconCheck,
  IconStarFilled,
} from "@tabler/icons-react";
import {
  CRAFT_PACKAGES,
  CRAFT_MODULES,
  PROCESS_STEPS,
  FAQ_ITEMS,
  PAGE_META,
  COMPANY,
  HANDWERK_STATS,
  REFERENZEN_BRANCHEN,
  HANDWERK_GARANTIEN,
} from "@/lib/constants";

import { SchweinDivider } from "@/components/ui/schweinchen-divider";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ReferenzenStrip } from "@/components/sections/ReferenzenStrip";
import { TechCorners } from "@/components/ui/tech-corners";

export const metadata: Metadata = {
  title: PAGE_META.handwerk.title,
  description: PAGE_META.handwerk.description,
  alternates: { canonical: "/handwerk" },
};

const PAIN_POINTS = [
  {
    problem: "Die Baustelle ruft. Das Telefon auch.",
    description:
      "Sie können nicht gleichzeitig Schlitze klopfen und Termine vergeben. Das kostet Umsatz.",
  },
  {
    problem: "Google kennt nur die Konkurrenz.",
    description:
      "Ohne Website existieren Sie für Neukunden unter 40 quasi nicht.",
  },
  {
    problem: "Bürokram am Wochenende.",
    description:
      "Angebote schreiben, Rechnungen prüfen... statt Erholung nur Papierkram.",
  },
];

const HANDWERK_TESTIMONIALS = [
  {
    name: "Markus W.",
    role: "Dachdecker, Marienberg",
    text: "Seit der neuen Website bekomme ich regelmäßig Anfragen aus der ganzen Region.",
    result: "5x mehr Anfragen in 8 Wochen",
  },
  {
    name: "Andreas B.",
    role: "Sanitärbetrieb, Stollberg",
    text: "Die KI-Telefonassistenz ist genial. Ich kann in Ruhe arbeiten. Absolute Empfehlung.",
    result: "Keine verpassten Anrufe mehr",
  },
  {
    name: "Thomas K.",
    role: "Elektrikermeister, Aue",
    text: "Professionell, schnell, unkompliziert. Genau so muss das sein. Weiter so!",
    result: "Website live in 10 Tagen",
  },
];

export default function HandwerkPage() {
  return (
    <>
      <Hero
        headline="AUFTRAG VOLL? BÜRO LEER."
        accentText="BÜRO LEER."
        subline="Wir digitalisieren das Erzgebirge. Handfest für Handwerker. Clever für alle anderen. Webseiten, KI-Telefon & IT-Support aus Aue."
        ctas={[
          { label: "Pakete ansehen", href: "#pakete", variant: "default" },
          { label: "Kostenlos beraten lassen", href: "/kontakt", variant: "outline" },
        ]}
        variant="navy"
      />

      <TrustBar items={HANDWERK_STATS} />

      {/* 02: PROBLEM */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Das Problem"
          title="Risiko: Stillstand"
          align="left"
          light
        />
        <ProblemSection
          title="Risiko: Stillstand"
          problems={PAIN_POINTS}
          variant="red"
        />
      </Section>

      {/* 03: MODULES */}
      <Section bg="transparent">
        <SectionHeading
          number="03"
          overline="Ihr Werkzeugkasten"
          title="Digitales Rüsten"
          align="left"
          light
        />
        <CraftToolboxGrid modules={CRAFT_MODULES} />
      </Section>

      {/* Referenzen – Für wen wir arbeiten */}
      <Section bg="transparent">
        <SectionHeading
          number="04"
          overline="Vertrauen"
          title="Für wen wir arbeiten"
          subtitle="Elektriker, Dachdecker, Sanitär und mehr – aus dem Erzgebirge."
          align="left"
          light
        />
        <ReferenzenStrip items={REFERENZEN_BRANCHEN} />
      </Section>

      {/* Garantien */}
      <Section bg="transparent">
        <SectionHeading
          number="05"
          overline="Sicherheit"
          title="Garantien & Transparenz"
          subtitle="Festpreis, inkludierter Support, kein Kleingedrucktes."
          align="left"
          light
        />
        <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
          {HANDWERK_GARANTIEN.map((item, i) => (
            <div
              key={item.title}
              data-animate="fade-up"
              data-animate-delay={String(i * 80)}
              className="group relative flex flex-col overflow-hidden border border-white/10 bg-brand-navy/60 p-6 backdrop-blur-md transition-all hover:border-brand-cyan/20"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="lg" />
              <div className="relative z-10 flex flex-1 flex-col items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
                  <IconCheck className="size-5 text-brand-cyan" stroke={2.5} />
                </div>
                <div className="min-h-[4.5rem] flex-1">
                  <h3 className="font-bold uppercase tracking-wider text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 06: Flatrate – Der Digitale Hausmeister (Angebot) */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Flatrate"
          title="Der Digitale Hausmeister"
          subtitle="10 Stunden Tech-Support für 850 € – 12 Monate gültig. Ihr IT-Partner auf Abruf."
          align="left"
          light
        />
        <div className="grid md:grid-cols-2 gap-12 items-center border border-brand-cyan/30 bg-brand-cyan/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center border border-brand-cyan bg-brand-cyan/20 px-4 py-1 text-xs font-bold text-brand-cyan uppercase tracking-widest">
              Best Seller
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none mb-6">
              10er Karte<br />Support
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                "10 Stunden Support inklusive",
                "Gültig für 12 Monate",
                "Web, Office, Design & Notfälle",
                "Express-Ticket bei Problemen",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 text-white text-lg">
                  <div className="w-1.5 h-1.5 bg-brand-cyan shadow-[0_0_10px_#03f9f9]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-brand-cyan">850 €</span>
              <span className="text-sm font-mono text-white/50">netto / Paket</span>
            </div>
            <Button asChild size="lg" className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 w-full md:w-auto">
              <Link href="/kontakt">Karte sichern</Link>
            </Button>
          </div>

          <div className="relative z-10 hidden md:flex items-center justify-center">
            <div className="w-64 h-80 border-2 border-white/10 relative">
              <div className="absolute top-4 left-4 right-4 h-32 bg-white/5" />
              <div className="absolute bottom-4 left-4 right-4 h-2 bg-brand-cyan/50" />
              <div className="absolute bottom-8 left-4 w-12 h-1 bg-white/10" />
              <div className="absolute bottom-8 left-18 w-12 h-1 bg-white/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] border-4 border-brand-cyan p-4 bg-brand-navy text-brand-cyan font-black text-4xl uppercase tracking-tighter">
                SOLD
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 07: TESTIMONIALS */}
      <Section bg="transparent">
        <SectionHeading
          number="07"
          overline="Baustellentalk"
          title="Handwerker vertrauen uns"
          align="left"
          light
        />
        <TestimonialGrid testimonials={HANDWERK_TESTIMONIALS} />
      </Section>

      {/* 08: PRICING */}
      <Section id="pakete" bg="transparent">
        <SectionHeading
          number="08"
          overline="Investition"
          title="Pakete & Preise"
          subtitle="Netto. Transparent. Ohne versteckte Kosten."
          align="left"
          light
        />
        <PricingCards packages={CRAFT_PACKAGES} />
      </Section>

      {/* 09: PROCESS */}
      <Section bg="transparent">
        <SectionHeading
          number="09"
          overline="Bauplan"
          title="In 4 Wochen fertig"
          align="left"
          light
        />
        <ProcessSteps steps={PROCESS_STEPS} />
      </Section>

      {/* 10: FAQ */}
      <Section bg="transparent">
        <SectionHeading
          number="10"
          overline="Support"
          title="Häufige Fragen"
          align="left"
          light
        />
        <FaqAccordion items={FAQ_ITEMS} />
      </Section>

      <SchweinDivider />

      {/* CTA */}
      <CtaSection
        headline="Starten Sie das Upgrade"
        subline="Lassen Sie uns Ihren Betrieb digitalisieren. Jetzt Termin sichern."
        ctas={[
          { label: "Jetzt Termin vereinbaren", href: "/kontakt" },
          { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
        ]}
      />

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Handwerks-Pakete von Berneby Solutions",
            itemListElement: CRAFT_PACKAGES.map((pkg, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Product",
                name: pkg.name,
                description: pkg.description,
                offers: {
                  "@type": "Offer",
                  price: pkg.price.replace(".", ""),
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                },
              },
            })),
          }),
        }}
      />
    </>
  );
}
