import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TeamSection } from "@/components/sections/TeamSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import dynamic from "next/dynamic";
import { CtaSection } from "@/components/sections/CtaSection";
import { StatementSectionV3 } from "@/components/v3/StatementSectionV3";
import { WarumBernebyV3 } from "@/components/v3/WarumBernebyV3";
import { TrustBar } from "@/components/sections/TrustBar";

const FaqAccordion = dynamic(
  () => import("@/components/sections/FaqAccordion").then((m) => ({ default: m.FaqAccordion })),
  { ssr: true }
);
import { IconQuote, IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp, IconBrandGoogle } from "@tabler/icons-react";
import {
  TEAM,
  VALUES,
  PAGE_META,
  FAQ_ITEMS,
  SOCIAL_LINKS,
  WARUM_BERNEBY,
  VISION_MISSION,
} from "@/lib/constants";

const UEBER_UNS_SOCIAL_ICONS = {
  Instagram: IconBrandInstagram,
  Facebook: IconBrandFacebook,
  WhatsApp: IconBrandWhatsapp,
  Google: IconBrandGoogle,
} as const;
import { generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { TechCorners } from "@/components/ui/tech-corners";
import Image from "next/image";
import { CONTAINER_A, CONTAINER_B } from "@/lib/container-styles";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: PAGE_META.ueberUns.title,
  description: PAGE_META.ueberUns.description,
  alternates: { canonical: "/ueber-uns" },
};

export default function UeberUnsPage() {
  return (
    <>
      <Hero
        bergVariant="ueber-uns"
        headline="EIN TEAM"
        headlineLine2="EIN ZIEL"
        accentText="EIN ZIEL"
        subline={"Wir machen lokale Betriebe digital erfolgreich.\nPersönlich, pragmatisch, aus dem Erzgebirge."}
        variant="navy"
        compact
      />
      {/* TrustBar-Linie: wie Header-Pre-Text-Strich (neutrales Grau) */}
      <div className="w-full border-t border-white/10" aria-hidden="true" />

      {/* 02: Intro-Statement (Zitat) – GEO-Zitat integriert */}
      <Section bg="subtle">
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
          className={cn(
            "group relative overflow-hidden p-8 md:p-10",
            CONTAINER_B
          )}
        >
          <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 flex h-14 w-14 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/10">
              <IconQuote className="size-7 text-brand-warm" stroke={1.5} />
            </div>
            <blockquote className="text-xl font-semibold leading-relaxed text-white md:text-2xl">
              &ldquo;Wir glauben, dass jeder lokale Betrieb eine digitale
              Präsenz verdient, die funktioniert.
              <br />
              Nicht in zehn Jahren &ndash; <span className="text-brand-cyan">jetzt.</span>&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              &mdash; Lennard &amp; Daniel, Gründer von Berneby Solutions
            </p>
          </div>
        </div>
      </Section>

      {/* 03: Team */}
      <Section bg="transparent">
        <SectionHeading
          number="03"
          overline="Das Team"
          title="Technik trifft Strategie"
          subtitle="Eine Kombination, die funktioniert – zwei Perspektiven für ganzheitliche Lösungen."
          align="left"
          light
        />

        {/* Soziale Kanäle – wie im Footer (CONTAINER_A, nur Icon, keine TechCorners) */}
        <div className="-mt-8 sm:-mt-10 md:-mt-12 lg:-mt-14 xl:-mt-16 mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-navy-muted">
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
                  className={cn(
                    "group tap-target relative overflow-hidden p-2 flex items-center justify-center cursor-pointer",
                    CONTAINER_A
                  )}
                >
                  <Icon className="size-4 text-brand-cyan relative z-10" stroke={1.5} />
                </a>
              );
            })}
          </div>
        </div>

        <TeamSection members={TEAM} variant="navy" />
      </Section>

      {/* 04: Vision / Mission – Statement ohne Karten (V3-Layout) */}
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

      {/* 07: Warum Berneby – horizontal (V3-Layout) */}
      <Section bg="subtle">
        <SectionHeading
          number="07"
          overline="Der Unterschied"
          title="Warum Berneby?"
          subtitle="Was uns von anderen unterscheidet und warum wir der richtige Partner für Sie sind."
          align="left"
          light

        />
        <WarumBernebyV3 items={WARUM_BERNEBY} />
      </Section>

      {/* 08: FAQ – overflow-visible damit Backdrop „08“ nicht abgeschnitten wird */}
      <div className="relative">
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 overflow-visible">
          <div className="relative py-20 md:py-28 lg:py-32 overflow-visible">
            <SectionHeading
              number="08"
              overline="Fragen"
              title="Fragen über uns"
              subtitle="Antworten auf die häufigsten Fragen zu unserer Arbeitsweise und unserem Team."
              align="left"
              light
            />
            <FaqAccordion items={FAQ_ITEMS.filter((_, i) => [1, 4, 9].includes(i))} />
          </div>
        </div>
        <div className="w-full h-px bg-white/10 shrink-0" role="presentation" aria-hidden="true" />
      </div>

      <CtaSection
        headline="Lernen Sie uns kennen."
        subline="30 Minuten, unverbindlich – wir freuen uns auf ein persönliches Gespräch."
        ctas={[
          { label: "Kontakt aufnehmen", href: "/kontakt" },
          { label: "Unsere Leistungen", href: "/leistungen" },
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
