import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TeamSection } from "@/components/sections/TeamSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { IconCheck, IconArrowRight, IconQuote } from "@tabler/icons-react";
import { TEAM, VALUES, PAGE_META, COMPANY, FAQ_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: PAGE_META.ueberUns.title,
  description: PAGE_META.ueberUns.description,
  alternates: { canonical: "/ueber-uns" },
};

const TIMELINE = [
  { year: "2024", event: "Erste gemeinsame Projekte", description: "Lennard und Daniel starten erste Kundenprojekte nebenberuflich." },
  { year: "2025", event: "Die Idee nimmt Form an", description: "Aus Einzelprojekten wird ein System – die Module werden entwickelt." },
  { year: "2026", event: "Berneby Solutions GbR", description: "Offizielle Gründung. Alles aus einer Hand für lokale Betriebe." },
];

export default function UeberUnsPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        headline="Zwei Macher. Ein Ziel."
        accentText="Ein Ziel"
        subline="Wir machen lokale Betriebe digital erfolgreich. Persönlich, pragmatisch, aus dem Erzgebirge."
        variant="navy"
        compact
      />

      {/* 2. Intro-Statement */}
      <Section narrow>
        <div data-animate="fade-up" className="text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cyan-muted">
            <IconQuote className="size-7 text-brand-navy" stroke={1.5} />
          </div>
          <blockquote className="text-xl font-semibold leading-relaxed md:text-2xl">
            &ldquo;Wir glauben, dass jeder lokale Betrieb eine digitale Präsenz verdient, die funktioniert.
            Nicht in zehn Jahren &ndash; <span className="text-gradient-brand">jetzt.</span>&rdquo;
          </blockquote>
          <p className="mt-4 text-muted-foreground">
            &mdash; Lennard &amp; Daniel, Gründer von Berneby Solutions
          </p>
        </div>
      </Section>

      {/* 3. Team */}
      <Section bg="alt">
        <SectionHeading
          overline="Das Team"
          title="Technik trifft Strategie"
          subtitle="Eine Kombination, die funktioniert – zwei Perspektiven für ganzheitliche Lösungen."
          align="center"
        />
        <TeamSection members={TEAM} />
      </Section>

      {/* 4. Vision / Mission – Split Layout */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div
            data-animate="fade-left"
            className="card-hover relative overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-navy to-brand-navy/40" />
            <div className="p-8 md:p-10">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-cyan">
                Vision
              </div>
              <h2 className="text-2xl font-extrabold md:text-3xl">Wo wir hinwollen</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Jeder lokale Betrieb im Erzgebirge verdient eine digitale Präsenz,
                die funktioniert. Wir glauben, dass Technologie nicht kompliziert
                sein muss, und dass persönlicher Kontakt den Unterschied macht.
              </p>
            </div>
          </div>

          <div
            data-animate="fade-right"
            className="card-hover relative overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-cyan/40 to-brand-cyan" />
            <div className="p-8 md:p-10">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-cyan">
                Mission
              </div>
              <h2 className="text-2xl font-extrabold md:text-3xl">Was wir tun</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Wir bringen lokale Betriebe ins Netz – mit ehrlicher Beratung,
                sauberer Technik und Lösungen, die sich rechnen. Ohne
                Fachchinesisch, ohne Vertragsfallen.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Timeline */}
      <Section bg="navy">
        <SectionHeading
          overline="Unsere Geschichte"
          title="Von der Idee zum Unternehmen"
          align="center"
        />
        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-brand-cyan/50 via-white/20 to-transparent md:left-1/2 md:-translate-x-px" />

          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              data-animate="fade-up"
              data-animate-delay={String(i * 150)}
              className={`relative mb-10 flex items-start gap-6 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-cyan/40 bg-brand-navy shadow-lg shadow-brand-cyan/10 md:absolute md:left-1/2 md:-translate-x-1/2">
                <span className="text-xs font-extrabold text-brand-cyan">{item.year}</span>
              </div>

              {/* Content card */}
              <div className={`rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm ${
                i % 2 === 0 ? "md:mr-auto md:w-[calc(50%-3rem)]" : "md:ml-auto md:w-[calc(50%-3rem)]"
              }`}>
                <h3 className="font-bold text-brand-navy-foreground">{item.event}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Werte */}
      <Section>
        <SectionHeading
          overline="Unsere Werte"
          title="Wofür wir stehen"
          subtitle="Vier Prinzipien, die unsere Arbeit leiten – jeden Tag."
          align="center"
        />
        <FeatureGrid features={VALUES} cols={4} />
      </Section>

      {/* 7. Warum wir – Differenzierung */}
      <Section bg="alt" narrow>
        <SectionHeading
          overline="Der Unterschied"
          title="Warum Berneby?"
          align="center"
        />
        <div className="space-y-4">
          {[
            { point: "Persönlich", detail: "Keine Ticketnummer. Sie sprechen direkt mit den Machern." },
            { point: "Lokal", detail: "Aus dem Erzgebirge, für das Erzgebirge. Kurze Wege, echtes Verständnis." },
            { point: "Fair", detail: "Transparente Preise. Kein Kleingedrucktes, keine Überraschungen." },
            { point: "Ganzheitlich", detail: "Von der Website über SEO bis zum KI-Telefon – alles aus einer Hand." },
          ].map((item, i) => (
            <div
              key={item.point}
              data-animate="fade-up"
              data-animate-delay={String(i * 80)}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-cyan-muted">
                <IconCheck className="size-4 text-brand-navy" stroke={2.5} />
              </div>
              <div>
                <p className="font-bold">{item.point}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. FAQ */}
      <Section narrow>
        <SectionHeading
          overline="FAQ"
          title="Fragen über uns"
          align="center"
        />
        <FaqAccordion items={FAQ_ITEMS.filter((_, i) => [1, 4, 9].includes(i))} />
      </Section>

      {/* 9. CTA */}
      <CtaSection
        headline="Lernen Sie uns kennen."
        subline="30 Minuten, unverbindlich – wir freuen uns auf ein persönliches Gespräch."
        ctas={[
          { label: "Kontakt aufnehmen", href: "/kontakt" },
          { label: "Unsere Leistungen", href: "/leistungen" },
        ]}
      />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Organization",
              name: "Berneby Solutions",
              founder: TEAM.map((m) => ({
                "@type": "Person",
                name: m.name,
                jobTitle: m.role,
              })),
              foundingDate: "2026",
              foundingLocation: {
                "@type": "Place",
                name: "Aue-Bad Schlema, Erzgebirgskreis",
              },
            },
          }),
        }}
      />
    </>
  );
}
