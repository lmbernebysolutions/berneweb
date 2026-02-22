import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TeamSection } from "@/components/sections/TeamSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import dynamic from "next/dynamic";
import { CtaSection } from "@/components/sections/CtaSection";
import { TrustBar } from "@/components/sections/TrustBar";

const FaqAccordion = dynamic(
  () => import("@/components/sections/FaqAccordion").then((m) => ({ default: m.FaqAccordion })),
  { ssr: true }
);
import { IconQuote } from "@tabler/icons-react";
import {
  TEAM,
  VALUES,
  PAGE_META,
  COMPANY,
  FAQ_ITEMS,
} from "@/lib/constants";
import { generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { TechCorners } from "@/components/ui/tech-corners";
import Image from "next/image";

export const metadata: Metadata = {
  title: PAGE_META.ueberUns.title,
  description: PAGE_META.ueberUns.description,
  alternates: { canonical: "/ueber-uns" },
};

const WARUM_BERNEBY = [
  {
    point: "Persönlich",
    detail: "Keine Ticketnummer. Sie sprechen direkt mit Ihren Ansprechpartnern.",
  },
  {
    point: "Lokal",
    detail:
      "Aus dem Erzgebirge, für das Erzgebirge. Kurze Wege, echtes Verständnis.",
  },
  {
    point: "Fair",
    detail: "Transparente Preise. Kein Kleingedrucktes, keine Überraschungen.",
  },
  {
    point: "Ganzheitlich",
    detail:
      "Von der Website über SEO bis zum KI-Telefon – alles aus einer Hand.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <Hero
        bergVariant="ueber-uns"
        headline="EIN TEAM"
        headlineLine2="EIN ZIEL"
        accentText="EIN ZIEL"
        subline="Wir machen lokale Betriebe digital erfolgreich. Persönlich, pragmatisch, aus dem Erzgebirge."
        variant="navy"
        compact
      />
      {/* TrustBar-Linie: Berg steht darauf */}
      <div className="w-full border-t border-brand-cyan/20" aria-hidden="true" />

      {/* 02: Intro-Statement (Zitat) – GEO-Zitat integriert */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Unser Versprechen"
          title="DIGITALE PRÄSENZ"
          align="left"
          light
        />
        <div
          data-animate="fade-up"
          className="relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md p-8 md:p-10"
        >
          <TechCorners pattern="diagonal" variant="cyan" size="lg" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 flex h-14 w-14 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
              <IconQuote className="size-7 text-brand-warm" stroke={1.5} />
            </div>
            <blockquote className="text-xl font-semibold leading-relaxed text-white md:text-2xl">
              &ldquo;Wir glauben, dass jeder lokale Betrieb eine digitale
              Präsenz verdient, die funktioniert. Nicht in zehn Jahren &ndash;{" "}
              <span className="text-brand-cyan">jetzt.</span>&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xl">
              Wie die Deutsche Handwerks-Zeitung berichtet: &ldquo;SEO für Handwerker ist in Zeiten von KI wichtiger denn je.&rdquo; Genau das ist unser Spezialgebiet.
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              &mdash; Lennard &amp; Daniel, Gründer von Berneby Solutions
            </p>
          </div>
        </div>
      </Section>

      {/* 03: Team */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Das Team"
          title="Technik trifft Strategie"
          subtitle="Eine Kombination, die funktioniert – zwei Perspektiven für ganzheitliche Lösungen."
          align="left"
          light
        />
        <TeamSection members={TEAM} variant="navy" />
      </Section>

      {/* 04: Vision / Mission */}
      <Section bg="transparent">
        <SectionHeading
          number="04"
          overline="Vision & Mission"
          title="Wo wir hinwollen"
          titleLine2="Was wir tun."
          align="left"
          light
        />
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div
            data-animate="fade-left"
            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 p-8 md:p-10">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-cyan">
                Vision
              </div>
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                Wo wir hinwollen
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
                Jeder lokale Betrieb im Erzgebirge verdient eine digitale
                Präsenz, die funktioniert. Wir glauben, dass Technologie nicht
                kompliziert sein muss, und dass persönlicher Kontakt den
                Unterschied macht.
              </p>
            </div>
          </div>

          <div
            data-animate="fade-right"
            className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
            <div className="relative z-10 p-8 md:p-10">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-brand-cyan">
                Mission
              </div>
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                Was wir tun
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
                Wir bringen lokale Betriebe ins Netz – mit ehrlicher Beratung,
                sauberer Technik und Lösungen, die sich rechnen. Ohne
                Fachchinesisch, ohne Vertragsfallen.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 06: Werte */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Unsere Werte"
          title="Wofür wir"
          titleLine2="stehen"
          subtitle="Vier Prinzipien, die unsere Arbeit leiten – jeden Tag. Verwurzelt im Erzgebirge."
          align="left"
          light
        />
        <FeatureGrid features={VALUES} cols={4} light swipeOnMobile />
      </Section>

      {/* 07: Warum Berneby */}
      <Section bg="subtle">
        <SectionHeading
          number="07"
          overline="Der Unterschied"
          title="Warum Berneby?"
          align="left"
          light
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {WARUM_BERNEBY.map((item, i) => (
            <div
              key={item.point}
              data-animate="fade-up"
              data-animate-delay={String(i * 80)}
              className="group relative flex gap-6 overflow-hidden border border-white/10 bg-brand-navy/60 p-6 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10 font-mono text-xl font-bold text-brand-cyan">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="relative z-10 min-w-0">
                <p className="font-bold uppercase tracking-tight text-white">
                  {item.point}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 08: FAQ – overflow-visible damit Backdrop „08“ nicht abgeschnitten wird */}
      <div className="relative">
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 overflow-visible">
          <div className="relative py-20 md:py-28 lg:py-32 overflow-visible">
            <SectionHeading
              number="08"
              overline="FAQ"
              title="Fragen über uns"
              align="left"
              light
            />
            <FaqAccordion items={FAQ_ITEMS.filter((_, i) => [1, 4, 9].includes(i))} />
          </div>
        </div>
        <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />
      </div>

      <CtaSection
        headline="Lernen Sie uns kennen."
        subline="30 Minuten, unverbindlich – wir freuen uns auf ein persönliches Gespräch."
        ctas={[
          { label: "Kontakt aufnehmen", href: "/kontakt" },
          { label: "Unsere Leistungen", href: "/tech" },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema(FAQ_ITEMS.filter((_, i) => [1, 4, 9].includes(i)))),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Über uns", url: "/ueber-uns" },
          ])),
        }}
      />
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
