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
            className="group relative flex flex-col overflow-hidden border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md p-8 hover:border-brand-cyan transition-colors"
          >
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-cyan" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-cyan" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-cyan" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-cyan" />

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
            className="group relative flex flex-col overflow-hidden border border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md p-8 hover:border-brand-cyan transition-colors"
          >
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-cyan" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-cyan" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-cyan" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-cyan" />

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
        <div className="mx-auto max-w-4xl border border-brand-cyan/50 bg-brand-navy/80 p-1">
          {/* Header */}
          <div className="grid grid-cols-3 gap-1 mb-1">
            <div className="bg-brand-navy p-4"></div>
            <div className="bg-red-950/30 border border-red-500/30 p-4 text-center text-red-400 font-bold uppercase tracking-wider">Ohne Uns</div>
            <div className="bg-brand-cyan/20 border border-brand-cyan/50 p-4 text-center text-brand-cyan font-bold uppercase tracking-wider">Mit Uns</div>
          </div>

          {[
            { aspect: "Sichtbarkeit", without: "Unsichtbar", with: "Seite 1" },
            { aspect: "Verpasste Anrufe", without: "Geld verbrannt", with: "KI-Empfang" },
            { aspect: "Bewertungen", without: "Keine Kontrolle", with: "Automatisiert" },
            { aspect: "Design", without: "Baukasten 2010", with: "High-End" },
          ].map((row) => (
            <div key={row.aspect} className="grid grid-cols-3 gap-1 mb-1 last:mb-0">
              <div className="bg-brand-navy/50 p-4 flex items-center text-blue-200 font-medium">{row.aspect}</div>
              <div className="bg-red-950/10 p-4 flex items-center justify-center text-red-300 gap-2">
                <IconX className="size-4" /> {row.without}
              </div>
              <div className="bg-brand-cyan/10 p-4 flex items-center justify-center text-cyan-50 gap-2 font-bold shadow-[inset_0_0_10px_rgba(3,249,249,0.1)]">
                <IconCheck className="size-4 text-brand-cyan" /> {row.with}
              </div>
            </div>
          ))}
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
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Thomas M.", role: "Elektrikermeister", text: "Endlich werde ich gefunden. Die KI am Telefon ist der Wahnsinn." },
            { name: "Stefan K.", role: "Heizungsbau", text: "Kein generisches Bla-Bla. Berneby liefert ab." },
            { name: "Sandra L.", role: "Friseursalon", text: "Sieht top aus und bringt neue Kunden. Danke!" },
          ].map((t, i) => (
            <div key={i} className="border border-white/10 bg-white/5 p-6 hover:border-brand-cyan/50 transition-colors">
              <div className="flex gap-1 text-brand-cyan mb-4">
                {[1, 2, 3, 4, 5].map(s => <IconStarFilled key={s} className="size-4" />)}
              </div>
              <p className="text-lg text-white mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-cyan text-brand-navy font-bold flex items-center justify-center">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-white/50 uppercase">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

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
