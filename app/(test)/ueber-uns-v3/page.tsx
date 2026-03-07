// =============================================================================
// ÜBER UNS V3 — SANDBOX PAGE
// =============================================================================
// Erreichbar unter: /ueber-uns-v3
// Zweck: V3 Design System — Über-uns mit light bg Abwechslung

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { IconQuote, IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp, IconBrandGoogle } from "@tabler/icons-react";

// --- V3 Komponenten ---
import { HeroV3 } from "@/components/v3/HeroV3";
import { TeamSectionV3 } from "@/components/v3/TeamSectionV3";
import { StatementSectionV3 } from "@/components/v3/StatementSectionV3";
import { WarumBernebyV3 } from "@/components/v3/WarumBernebyV3";
import { CtaSectionV3 } from "@/components/v3/CtaSectionV3";

// --- Unveränderte Shared-Komponenten ---
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TechCorners } from "@/components/ui/tech-corners";

const FaqAccordion = dynamic(
  () => import("@/components/sections/FaqAccordion").then((m) => ({ default: m.FaqAccordion })),
  { ssr: true }
);

import {
  TEAM,
  VALUES,
  FAQ_ITEMS,
  SOCIAL_LINKS,
  WARUM_BERNEBY,
  VISION_MISSION,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Über uns V3 — Sandbox | Berneby Solutions",
  description: "Interner Design-Sandbox: V3 Über-uns-Seite mit Light-Dark-Rhythmus.",
  robots: { index: false, follow: false },
};

const UEBER_UNS_SOCIAL_ICONS = {
  Instagram: IconBrandInstagram,
  Facebook: IconBrandFacebook,
  WhatsApp: IconBrandWhatsapp,
  Google: IconBrandGoogle,
} as const;

export default function UeberUnsV3() {
  return (
    <>
      {/* 01 — HERO V3 (dark) */}
      <HeroV3
        bergVariant="ueber-uns"
        headline="EIN TEAM"
        headlineLine2="EIN ZIEL"
        accentText="EIN ZIEL"
        subline="Wir machen lokale Betriebe digital erfolgreich. Persönlich, pragmatisch, aus dem Erzgebirge."
        compact
      />
      <div className="w-full border-t border-white/10" aria-hidden="true" />

      {/* 02 — INTRO ZITAT (dark: transparent) */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Unser Versprechen"
          title="DIGITALE PRÄSENZ"
          subtitle="Unsere Philosophie für Ihren Erfolg – lokal verwurzelt, digital visionär."
          align="left"
          light
        />
        <div
          data-animate="fade-up"
          className="relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md p-8 md:p-10"
        >
          {/* V3: TechCorners — 1 auf Signifikant-Level (Zitat-Element) */}
          <TechCorners pattern="diagonal" variant="cyan" size="lg" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 flex h-14 w-14 items-center justify-center border border-white/20 bg-white/5">
              <IconQuote className="size-7 text-brand-warm" stroke={1.5} />
            </div>
            <blockquote className="text-xl font-semibold leading-relaxed text-white md:text-2xl">
              &ldquo;Wir glauben, dass jeder lokale Betrieb eine digitale
              Präsenz verdient, die funktioniert. Nicht in zehn Jahren &ndash;{" "}
              <span className="text-brand-warm">jetzt.</span>&rdquo;
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

      {/* 03 — TEAM (light bg) ohne Cyan-static */}
      <Section bg="light">
        <SectionHeading
          number="03"
          overline="Das Team"
          title="Technik trifft Strategie"
          subtitle="Eine Kombination, die funktioniert – zwei Perspektiven für ganzheitliche Lösungen."
          align="left"
          onLight
        />

        {/* Soziale Kanäle — neutral onLight */}
        <div className="-mt-8 sm:-mt-10 md:-mt-12 lg:-mt-14 xl:-mt-16 mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-brand-navy/10 pt-4">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-navy/40">
            Folgen Sie uns
          </span>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map((link) => {
              const Icon = UEBER_UNS_SOCIAL_ICONS[link.label as keyof typeof UEBER_UNS_SOCIAL_ICONS];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="group border border-brand-navy/10 bg-brand-navy/5 p-2 flex items-center justify-center transition-all hover:border-brand-navy/20 hover:bg-brand-navy/10 cursor-pointer"
                >
                  <Icon className="size-4 text-brand-navy/50 group-hover:text-brand-navy transition-colors" stroke={1.5} />
                </a>
              );
            })}
          </div>
        </div>

        {/* V3: TeamSectionV3 — quadratische Avatare, kein Online-Dot */}
        <TeamSectionV3 members={TEAM} />
      </Section>

      {/* 04 — VISION / MISSION (dark: transparent) */}
      <Section bg="transparent">
        <SectionHeading
          number="04"
          overline="Vision & Mission"
          title="Wo wir hinwollen"
          titleLine2="Was wir tun."
          subtitle="Klare Ziele für die Digitalisierung unserer Region – heute und morgen."
          align="left"
          light
        />
        <StatementSectionV3 items={VISION_MISSION} />
      </Section>

      {/* 05 — WARUM BERNEBY (light bg) */}
      <Section bg="light">
        <SectionHeading
          number="05"
          overline="Der Unterschied"
          title="Warum Berneby?"
          subtitle="Was uns von anderen unterscheidet und warum wir der richtige Partner für Sie sind."
          align="left"
          onLight
        />
        <WarumBernebyV3 items={WARUM_BERNEBY} onLight />
      </Section>

      {/* 06 — WERTE (dark: transparent) */}
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

      {/* 07 — FAQ (light bg) */}
      <Section bg="light">
        <SectionHeading
          number="07"
          overline="Fragen"
          title="Fragen über uns"
          subtitle="Antworten auf die häufigsten Fragen zu unserer Arbeitsweise und unserem Team."
          align="left"
          onLight
        />
        <FaqAccordion items={FAQ_ITEMS.filter((_, i) => [1, 4, 9].includes(i))} />
      </Section>

      <div className="w-full h-px bg-white/10 shrink-0" role="presentation" aria-hidden="true" />

      {/* CTA V3 */}
      <CtaSectionV3
        headline="Lernen Sie uns kennen."
        subline="30 Minuten, unverbindlich – wir freuen uns auf ein persönliches Gespräch."
        ctas={[
          { label: "Kontakt aufnehmen", href: "/kontakt" },
          { label: "Unsere Leistungen", href: "/tech" },
        ]}
      />
    </>
  );
}
