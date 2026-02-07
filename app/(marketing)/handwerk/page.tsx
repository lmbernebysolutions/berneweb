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

import { SchweinDivider } from "@/components/ui/schweinchen-divider";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { ProblemSection } from "@/components/sections/ProblemSection";

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

const FLATRATE_PROBLEMS = [
  {
    problem: "Ständig neue IT-Probleme",
    description: "Excel-Tabelle kaputt, E-Mail funktioniert nicht, Website zeigt Fehler – jedes Mal ein neuer Dienstleister?",
  },
  {
    problem: "Unkalkulierbare Kosten",
    description: "Jede Anfrage wird einzeln abgerechnet. Am Ende des Monats wissen Sie nie, was auf Sie zukommt.",
  },
  {
    problem: "Lange Wartezeiten",
    description: "IT-Probleme kosten Zeit. Aber der Dienstleister hat erst in 2 Wochen einen Termin frei.",
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
    text: "Die KI-Telefonassistenz ist genial. Ich kann in Ruhe arbeiten.",
    result: "Keine verpassten Anrufe mehr",
  },
  {
    name: "Thomas K.",
    role: "Elektrikermeister, Aue",
    text: "Professionell, schnell, unkompliziert. Genau so muss das sein.",
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
        <FeatureGrid
          features={CRAFT_MODULES.map((m) => ({
            icon: m.icon,
            title: m.name,
            description: m.description,
          }))}
          cols={4}
        />
      </Section>

      {/* 04: FLATRATE PROBLEM */}
      <Section bg="transparent">
        <SectionHeading
          number="04"
          overline="Flatrate"
          title="Der Digitale Hausmeister"
          subtitle="10 Stunden Tech-Support für 850 € – 12 Monate gültig. Ihr IT-Partner auf Abruf."
          align="left"
          light
        />
        <ProblemSection
          title="Der Digitale Hausmeister"
          problems={FLATRATE_PROBLEMS}
          variant="cyan"
        />
      </Section>

      {/* 06: TESTIMONIALS */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Baustellentalk"
          title="Handwerker vertrauen uns"
          align="left"
          light
        />
        <TestimonialGrid testimonials={HANDWERK_TESTIMONIALS} />
      </Section>

      {/* 07: PRICING */}
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

      {/* 08: FAQ */}
      <Section bg="transparent">
        <SectionHeading
          number="08"
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
