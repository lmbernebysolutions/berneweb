import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
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
} from "@/lib/constants";

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

      {/* 02: PROBLEM */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Das Problem"
          title="Risiko: Stillstand"
          align="left"
          light
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PAIN_POINTS.map((item, i) => (
            <div
              key={item.problem}
              className="group relative overflow-hidden border border-red-500/30 bg-red-950/20 p-8 hover:bg-red-950/30 transition-colors"
            >
              {/* Caution Stripes */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ef4444_10px,#ef4444_20px)] opacity-10" />

              <p className="font-bold text-red-500 uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-3">
                Fehlercode #{i + 1}
              </p>
              <h3 className="text-xl font-bold text-white mb-3">{item.problem}</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
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
        <FeatureGrid
          features={CRAFT_MODULES.map((m) => ({
            icon: m.icon,
            title: m.name,
            description: m.description,
          }))}
          cols={4}
        />
      </Section>

      {/* 04: PRICING */}
      <Section id="pakete" bg="transparent">
        <SectionHeading
          number="04"
          overline="Investition"
          title="Pakete & Preise"
          subtitle="Netto. Transparent. Ohne versteckte Kosten."
          align="left"
          light
        />
        <PricingCards packages={CRAFT_PACKAGES} />
      </Section>

      {/* 05: PROCESS */}
      <Section bg="transparent">
        <SectionHeading
          number="05"
          overline="Bauplan"
          title="In 4 Wochen fertig"
          align="left"
          light
        />
        <ProcessSteps steps={PROCESS_STEPS} />
      </Section>

      {/* 06: SOCIAL PROOF */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Baustellentalk"
          title="Handwerker vertrauen uns"
          align="left"
          light
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              quote: "Seit der neuen Website bekomme ich regelmäßig Anfragen aus der ganzen Region.",
              name: "Markus W.",
              role: "Dachdecker, Marienberg",
            },
            {
              quote: "Die KI-Telefonassistenz ist genial. Ich kann in Ruhe arbeiten.",
              name: "Andreas B.",
              role: "Sanitärbetrieb, Stollberg",
            },
          ].map((t) => (
            <div key={t.name} className="border border-brand-cyan/20 bg-brand-navy/50 p-6 flex gap-4 items-start">
              <div className="text-6xl font-black text-brand-cyan/20 leading-[0] mt-4">“</div>
              <div>
                <p className="text-lg text-white mb-4 leading-relaxed">{t.quote}</p>
                <div className="text-brand-cyan font-bold">{t.name}</div>
                <div className="text-xs uppercase text-white/50">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 07: FAQ */}
      <Section bg="transparent" narrow>
        <SectionHeading
          number="07"
          overline="Support"
          title="Häufige Fragen"
          align="left"
          light
        />
        <FaqAccordion items={FAQ_ITEMS.slice(0, 5)} />
      </Section>

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
