import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  IconArrowRight,
  IconHammer,
  IconDeviceDesktop,
  IconCheck,
  IconX,
  IconPhone,
  IconSearch,
  IconCurrencyEuro,
  IconStarFilled,
} from "@tabler/icons-react";
import {
  HOME_HERO,
  TRUST_BAR,
  PROBLEMS_SOLUTIONS,
  TWO_PILLARS,
  PROCESS_STEPS,
  FAQ_ITEMS,
  COMPANY,
} from "@/lib/constants";
import { SchweinDivider } from "@/components/ui/schweinchen-divider";
import { TechCorners } from "@/components/ui/tech-corners";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";

export const metadata: Metadata = {
  title: "Berneby Solutions – Ihr Digital-Partner im Erzgebirge",
  description:
    "Berneby Solutions macht lokale Betriebe im Erzgebirge online sichtbar und automatisiert das, was Zeit frisst. Webseiten, KI-Telefon, SEO – alles aus einer Hand.",
  alternates: { canonical: "/" },
};

const ICON_MAP: Record<string, React.ElementType> = {
  IconSearch,
  IconPhone,
  IconCurrencyEuro,
};

export default function Home() {
  return (
    <>
      <Hero
        headline="DEIN DIGITALER WERKZEUGKASTEN."
        accentText="WERKZEUGKASTEN."
        subline="Wir digitalisieren das Erzgebirge. Handfest für Handwerker. Clever für alle anderen. Webseiten, KI-Telefon & IT-Support aus Aue."
        ctas={[
          { label: "Für Handwerker", href: "/handwerk", variant: "default" },
          { label: "Für Tech-Probleme", href: "/tech", variant: "outline" },
        ]}
        variant="navy"
      />

      <TrustBar items={TRUST_BAR} />

      {/* 02: SELECTION */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Einstieg"
          title="Zwei Welten. Eine Lösung."
          subtitle="Ob Handwerksbetrieb oder digitales Alltagsproblem – wählen Sie Ihren Bereich."
          align="left"
          light // Because background is navy (transparent on body)
        />
        <div className="grid gap-8 md:grid-cols-2">
          {/* Handwerk */}
          <div
            data-animate="fade-left"
            className="group relative flex flex-col overflow-hidden border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md p-8 transition-colors"
          >
            {/* Tech Corners - 2→4 diagonal pattern */}
            <TechCorners pattern="diagonal" variant="cyan" size="lg" />

            <div className="mb-6 flex h-14 w-14 items-center justify-center bg-brand-navy shadow-[4px_4px_0_0_rgba(3,249,249,0.2)]">
              <IconHammer className="size-8 text-brand-cyan" stroke={1.5} />
            </div>

            <h3 className="text-2xl text-white mb-2">{TWO_PILLARS.handwerk.title}</h3>
            <p className="text-blue-200 mb-6 leading-relaxed">
              {TWO_PILLARS.handwerk.description}
            </p>

            <ul className="space-y-3 mb-8 grow">
              {TWO_PILLARS.handwerk.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 bg-brand-cyan" />
                  {f}
                </li>
              ))}
            </ul>

            <Button asChild className="w-full">
              <Link href={TWO_PILLARS.handwerk.cta.href}>
                {TWO_PILLARS.handwerk.cta.label}
              </Link>
            </Button>
          </div>

          {/* General Tech */}
          <div
            data-animate="fade-right"
            className="group relative flex flex-col overflow-hidden border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md p-8 transition-colors"
          >
            {/* Tech Corners - 2→4 diagonal pattern */}
            <TechCorners pattern="diagonal" variant="cyan" size="lg" />

            <div className="mb-6 flex h-14 w-14 items-center justify-center bg-brand-navy shadow-[4px_4px_0_0_rgba(3,249,249,0.2)]">
              <IconDeviceDesktop className="size-8 text-brand-cyan" stroke={1.5} />
            </div>

            <h3 className="text-2xl text-white mb-2">{TWO_PILLARS.general.title}</h3>
            <p className="text-blue-200 mb-6 leading-relaxed">
              {TWO_PILLARS.general.description}
            </p>

            <ul className="space-y-3 mb-8 grow">
              {TWO_PILLARS.general.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 bg-brand-cyan" />
                  {f}
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" className="w-full border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-navy">
              <Link href={TWO_PILLARS.general.cta.href}>
                {TWO_PILLARS.general.cta.label}
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 03: COMPARISON */}
      <Section bg="transparent">
        <SectionHeading
          number="03"
          overline="Der Unterschied"
          title="Ohne uns vs. Mit uns"
          align="left"
          light
        />
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Legacy System: Ohne Uns */}
          <div className="relative border border-red-950/40 bg-red-950/5 p-8 backdrop-blur-sm overflow-hidden" data-animate="fade-left">
            {/* Tech Corners - all 4 corners pattern */}
            <TechCorners pattern="all" variant="red" size="lg" />

            {/* Corner Labels */}
            <div className="absolute top-0 right-0 border-b border-l border-red-500/20 bg-red-950/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-red-400 z-20">
              STATUS_CRITICAL
            </div>

            <div className="mb-10 flex items-center justify-between">
              <h3 className="text-3xl font-bold uppercase tracking-tighter text-red-400">Ohne Uns</h3>
              <div className="flex h-10 w-10 items-center justify-center border border-red-500/30">
                <IconX className="size-6 text-red-500" />
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: "Sichtbarkeit", val: "Unsichtbar im Netz", risk: "Hoch" },
                { label: "Kundenkontakt", val: "Verpasste Anrufe = verlorenes Geld", risk: "Kritisch" },
                { label: "Online Reputation", val: "Keine Kontrolle über Bewertungen", risk: "Neutral" },
                { label: "Außendarstellung", val: "Baukasten-Design von 2010", risk: "Mittel" },
              ].map((item) => (
                <div key={item.label} className="group border-l-2 border-red-500/20 bg-red-500/5 p-4 transition-colors hover:border-red-500/50">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-red-400/60 transition-colors group-hover:text-red-400">
                    <span>{item.label}</span>
                    <span>RISIKO: {item.risk}</span>
                  </div>
                  <p className="mt-1 font-medium text-red-100/80">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Optimized System: Mit Uns */}
          <div className="relative border border-brand-cyan/40 bg-brand-cyan/5 p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(3,249,249,0.05)] overflow-hidden" data-animate="fade-right">
            {/* Tech Corners - all 4 corners pattern */}
            <TechCorners pattern="all" variant="cyan" size="lg" />

            {/* Corner Labels */}
            <div className="absolute top-0 right-0 border-b border-l border-brand-cyan/20 bg-brand-cyan/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-cyan z-20">
              SYSTEM_READY
            </div>

            <div className="mb-10 flex items-center justify-between">
              <h3 className="text-3xl font-bold uppercase tracking-tighter text-brand-cyan">Mit Uns</h3>
              <div className="flex h-10 w-10 items-center justify-center border border-brand-cyan/50 bg-brand-cyan/20 shadow-[0_0_15px_rgba(3,249,249,0.3)]">
                <IconCheck className="size-6 text-brand-cyan" stroke={2.5} />
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: "Sichtbarkeit", val: "Top-Platzierung & Seite 1 Fokus", gain: "+300%" },
                { label: "Kundenkontakt", val: "KI-Empfäng nimmt 24/7 Anrufe an", gain: "100%" },
                { label: "Online Reputation", val: "Automatisierte 5-Sterne-Systeme", gain: "Max" },
                { label: "Außendarstellung", val: "Premium Design & Branding", gain: "High" },
              ].map((item) => (
                <div key={item.label} className="group relative border-l-2 border-brand-cyan bg-brand-cyan/10 p-4 transition-colors hover:bg-brand-cyan/20">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
                    <span>{item.label}</span>
                    <span className="flex items-center gap-1">
                      <div className="h-1 w-1 animate-pulse bg-brand-cyan" />
                      EFFEKT: {item.gain}
                    </span>
                  </div>
                  <p className="mt-1 font-bold text-white">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 04: PROCESS */}
      <Section bg="transparent">
        <SectionHeading
          number="04"
          overline="Prozess"
          title="In 5 Schritten zum Ziel"
          align="left"
          light
        />
        <ProcessSteps steps={PROCESS_STEPS} />
      </Section>

      {/* 05: TESTIMONIALS */}
      <Section bg="transparent">
        <SectionHeading
          number="05"
          overline="Success Stories"
          title="Das sagt das Erzgebirge"
          align="left"
          light
        />
        <TestimonialGrid
          testimonials={[
            { name: "Thomas M.", role: "Elektrikermeister", text: "Endlich werde ich gefunden. Die KI am Telefon ist der Wahnsinn.", result: "3x mehr Anfragen in 4 Wochen" },
            { name: "Stefan K.", role: "Heizungsbau", text: "Kein generisches Bla-Bla. Berneby liefert ab.", result: "Website live in 2 Wochen" },
            { name: "Sandra L.", role: "Friseursalon", text: "Sieht top aus und bringt neue Kunden. Danke!", result: "40% mehr Online-Buchungen" },
          ]}
        />
      </Section>

      {/* Organic Divider - Schweinchen DNA */}
      <SchweinDivider />

      {/* CTA Section */}
      <CtaSection
        headline="Bereit für das Upgrade?"
        subline="Lassen Sie uns Ihr Unternehmen auf das nächste Level heben."
        ctas={[
          { label: "Termin sichern", href: "/kontakt" },
        ]}
      />
    </>
  );
}
