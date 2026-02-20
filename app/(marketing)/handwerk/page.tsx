import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
import { CraftToolboxGrid } from "@/components/sections/CraftToolboxGrid";
import { PricingCards } from "@/components/sections/PricingCards";
import dynamic from "next/dynamic";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaSection } from "@/components/sections/CtaSection";

const FaqAccordion = dynamic(
  () => import("@/components/sections/FaqAccordion").then((m) => ({ default: m.FaqAccordion })),
  { ssr: true }
);
const TestimonialGrid = dynamic(
  () => import("@/components/sections/TestimonialGrid").then((m) => ({ default: m.TestimonialGrid })),
  { ssr: true }
);
const MatchWizardSection = dynamic(
  () => import("@/components/sections/MatchWizardSection").then((m) => ({ default: m.MatchWizardSection })),
  { ssr: true }
);
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
  HANDWERK_GARANTIEN,
} from "@/lib/constants";
import { generateFaqSchema, generateBreadcrumbSchema, generateHowToSchema } from "@/lib/seo/schema";
import { ProblemSection } from "@/components/sections/ProblemSection";
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
        bergVariant="handwerk"
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

      {/* 02: PROBLEM – 76%-Statistik im Subtitle, Karten ausgeglichen */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Das Problem"
          title="Risiko: Stillstand"
          subtitle="Laut Google besuchen 76% der Nutzer, die lokal suchen, innerhalb von 24 Stunden ein Geschäft. Mit unseren 50+ Landingpages sorgen wir dafür, dass SIE gefunden werden."
          align="left"
          light
        />
        <ProblemSection
          title="Risiko: Stillstand"
          problems={PAIN_POINTS}
          variant="red"
        />
        <p className="mt-6 text-sm text-white/60">
          <Link href="/ratgeber/seo-fuer-handwerker" className="text-brand-cyan hover:underline">
            Wie lokale SEO funktioniert
          </Link>
          {" · "}
          <Link href="/ratgeber/ki-telefonassistent-handwerk" className="text-brand-cyan hover:underline">
            So funktioniert der KI-Telefonassistent
          </Link>
        </p>
      </Section>

      {/* 03: MODULES */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Ihr Werkzeugkasten"
          title="Digitales Rüsten"
          align="left"
          light
        />
        <CraftToolboxGrid modules={CRAFT_MODULES} />
      </Section>

      {/* 04: Match-Wizard – nur Handwerk */}
      <MatchWizardSection
        variant="handwerk"
        sectionNumber="04"
        overline="Ihr Paket-Match"
        title="Welches Paket passt?"
        subtitle="Zwei kurze Fragen – wir empfehlen Ihr passendes Handwerks-Paket."
        bg="transparent"
      />

      {/* Garantien */}
      <Section bg="subtle">
        <SectionHeading
          number="05"
          overline="Handschlag aus dem Erzgebirge"
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
              className="group relative flex flex-col overflow-hidden border border-white/10 bg-brand-navy/60 p-6 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="lg" />
              <div className="relative z-10 flex flex-1 flex-col items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10" aria-hidden="true">
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
            <div className="mb-6 inline-flex items-center border border-brand-warm bg-brand-warm px-4 py-1 text-xs font-bold text-brand-navy uppercase tracking-widest">
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
              <span className="text-4xl font-bold text-brand-warm">850 €</span>
              <span className="text-sm font-mono text-brand-navy-muted">netto / Paket</span>
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
      <Section bg="subtle">
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
        <PricingCards
          packages={CRAFT_PACKAGES}
          comparisonRows={[
            { label: "Professionelle Website", inPackages: ["Geselle", "Meisterbetrieb", "Marktführer"] },
            { label: "50+ Landingpages", inPackages: ["Meisterbetrieb", "Marktführer"] },
            { label: "KI-Telefonassistent", inPackages: ["Marktführer"] },
          ]}
        />
      </Section>

      {/* 09: PROCESS */}
      <Section bg="subtle">
        <SectionHeading
          number="09"
          overline="Ihr Bauplan – vom Fundament bis zum First"
          title="In 4 Wochen fertig"
          align="left"
          light
        />
        <ProcessSteps steps={PROCESS_STEPS} />
      </Section>

      {/* 10: FAQ – Hintergrund abwechselnd (transparent nach subtle) */}
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

      {/* CTA */}
      <CtaSection
        headline="Starten Sie das Upgrade"
        subline="Lassen Sie uns Ihren Betrieb digitalisieren. Jetzt Termin sichern."
        ctas={[
          { label: "Jetzt Termin vereinbaren", href: "/kontakt" },
          { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema(FAQ_ITEMS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Handwerk", url: "/handwerk" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateHowToSchema(
              PROCESS_STEPS.map((s) => ({ step: s.step, title: s.title, description: s.description })),
              "In 5 Schritten zum Ziel – Berneby Solutions"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            provider: { "@id": "https://berneby.de/#organization" },
            name: "Webseiten & Digitalisierung für Handwerker",
            description:
              "Mehr Aufträge, weniger Aufwand: Handwerks-Pakete mit Website, KI-Telefonassistent und Google-Sichtbarkeit.",
            areaServed: { "@type": "AdministrativeArea", name: "Erzgebirgskreis" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Handwerks-Pakete",
              itemListElement: CRAFT_PACKAGES.map((pkg) => ({
                "@type": "Offer",
                name: pkg.name,
                price: pkg.price.replace(/\./g, ""),
                priceCurrency: "EUR",
              })),
            },
          }),
        }}
      />
    </>
  );
}
