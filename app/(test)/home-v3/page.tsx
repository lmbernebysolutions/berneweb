// =============================================================================
// HOME V3 — SANDBOX PAGE
// =============================================================================
// Erreichbar unter: /home-v3
// Zweck: V3 Design System — Light-Dark-Rhythmus, chirurgisches Cyan
// Alle V3-Seiten sind noindex — keine Auswirkung auf Produktion.

import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { IconBrandGoogle } from "@tabler/icons-react";

// --- V3 Komponenten ---
import { HeroV3 } from "@/components/v3/HeroV3";
import { ZweiWeltenCardsV3 } from "@/components/v3/ZweiWeltenCardsV3";
import { ComparisonSectionV3 } from "@/components/v3/ComparisonSectionV3";
import { ProcessStepsV3 } from "@/components/v3/ProcessStepsV3";
import { TestimonialGridV3 } from "@/components/v3/TestimonialGridV3";
import { TechStackSectionV3 } from "@/components/v3/TechStackSectionV3";
import { CtaSectionV3 } from "@/components/v3/CtaSectionV3";
import { ProblemToSolutionScrollSectionV3 } from "@/components/v3/ProblemToSolutionScrollSectionV3";
import { CraftToolboxGridV3 } from "@/components/v3/CraftToolboxGridV3";
import { StatementSectionV3 } from "@/components/v3/StatementSectionV3";
import { ReferenzCardV3 } from "@/components/v3/ReferenzCardV3";

// --- Unveränderte Shared-Komponenten ---
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";

const ChatSection = dynamic(
  () => import("@/components/sections/chat-section").then((m) => ({ default: m.ChatSection })),
  { ssr: true }
);

import {
  TRUST_BAR,
  PROCESS_STEPS,
  HOME_MINI_FAQ,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { REFERENZEN } from "@/lib/data/referenzen";

export const metadata: Metadata = {
  title: "Home V3 — Sandbox | Berneby Solutions",
  description: "Interner Design-Sandbox: V3 — Light-Dark-Rhythmus, chirurgisches Cyan.",
  robots: { index: false, follow: false },
};

const UEBER_UNS_STATEMENTS = [
  {
    label: "Vision",
    headline: "Das Erzgebirge digital stark machen",
    body: "Wir glauben, dass lokale Handwerksbetriebe und Unternehmen genauso gute digitale Werkzeuge verdienen wie Großkonzerne — erschwinglich, verständlich und wirklich nützlich.",
  },
  {
    label: "Mission",
    headline: "Handfeste Lösungen. Kein Agentur-Blabla.",
    body: "Wir kommen aus der Region, kennen die Betriebe und liefern Lösungen, die im Alltag funktionieren. Kein Overhead, keine Zwischenhändler — direkt vom Macher.",
  },
];

const V3_TESTIMONIALS = [
  {
    name: "Anne-Karen Voigt",
    role: "Inhaberin",
    betrieb: "Ergotherapie Voigt",
    ort: "Aue",
    text: "Professionelles, nettes Team – zügig und unkompliziert. Moderne, patientenfreundliche Website. Immer wieder gerne!",
    result: "Website für Praxis",
  },
  {
    name: "Sylvia Schirmer",
    role: "Praxisleiterin",
    betrieb: "Arztpraxis Dr. Schirmer",
    ort: "Stollberg",
    text: "Hervorragende Arbeit: moderne, intuitive und patientenfreundliche Website. Unkomplizierte Zusammenarbeit, Änderungen umgehend. Wärmstens weiterempfehlen!",
    result: "Website-Relaunch",
  },
];

export default function HomeV3() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          01 — HERO V3 (dark)
          V3: kein Pulse auf Hero-CTAs, border-white/25
      ───────────────────────────────────────────────────────────────────── */}
      <div className="sm:hidden">
        <HeroV3
          bergVariant="home"
          headline="DEIN DIGITALER"
          headlineLine2="WERKZEUG-"
          headlineLine3="KASTEN"
          accentText={["WERKZEUG-", "KASTEN"]}
          subline="Wir digitalisieren das Erzgebirge. Handfest für Handwerker. Clever für alle anderen. Webseiten, KI-Telefon & IT-Support aus Aue."
          ctas={[
            { label: "Für Handwerker", href: "/handwerk", variant: "default" },
            { label: "Für Tech-Probleme", href: "/tech", variant: "outline" },
          ]}
        />
      </div>
      <div className="hidden sm:block">
        <HeroV3
          bergVariant="home"
          headline="DEIN DIGITALER WERKZEUGKASTEN"
          accentText="WERKZEUGKASTEN"
          subline="Wir digitalisieren das Erzgebirge. Handfest für Handwerker. Clever für alle anderen. Webseiten, KI-Telefon & IT-Support aus Aue."
          ctas={[
            { label: "Für Handwerker", href: "/handwerk", variant: "default" },
            { label: "Für Tech-Probleme", href: "/tech", variant: "outline" },
          ]}
        />
      </div>

      <TrustBar items={TRUST_BAR} />

      {/* ─────────────────────────────────────────────────────────────────────
          02 — ZWEI WELTEN V3 (dark: transparent)
          V3: TechCorners nur auf Handwerk-Card
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Einstieg"
          title="Zwei Welten. Eine Lösung."
          subtitle="Ob Handwerksbetrieb oder digitales Alltagsproblem – wählen Sie Ihren Bereich."
          align="left"
          light
        />
        <ZweiWeltenCardsV3 />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          03 — COMPARISON V3 (light bg)
          V3: kein static Glow, kein drop-shadow, Grid-Overlay white/4
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="light">
        <SectionHeading
          number="03"
          overline="Handwerk & Digital"
          title="Ohne uns vs. Mit uns"
          subtitle="Ein direkter Vergleich: was sich ändert, wenn wir Ihren digitalen Auftritt übernehmen."
          align="left"
          onLight
        />
        {/* Mobile */}
        <div className="md:hidden">
          <ProblemToSolutionScrollSectionV3 />
        </div>
        {/* Desktop */}
        <div className="max-md:hidden">
          <ComparisonSectionV3 />
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          04 — PROCESS V3 (dark: transparent)
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="transparent">
        <SectionHeading
          number="04"
          overline="Prozess"
          title="In 5 Schritten zum Ziel"
          subtitle="Von der ersten Anfrage bis zur fertigen Website – strukturiert, verbindlich und ohne Überraschungen."
          align="left"
          light
        />
        <ProcessStepsV3 steps={PROCESS_STEPS} variant="dark" />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          05 — HANDWERK TOOLBOX V3 (light bg)
          V3: TechCorners nur auf erster Karte
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="light">
        <SectionHeading
          number="05"
          overline="Handwerk-Paket"
          title="Was im Paket steckt"
          subtitle="Vier Module, die Ihren Betrieb digital sichtbar und erreichbar machen."
          align="left"
          onLight
        />
        <CraftToolboxGridV3 />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          06 — TESTIMONIALS V3 (dark: transparent)
          V3: onLight=false, erweiterte Attribution
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Success Stories"
          title="Das sagt das Erzgebirge"
          subtitle="Echte Rückmeldungen von Betrieben aus der Region, die wir begleiten durften."
          align="left"
          light
        />
        <TestimonialGridV3 testimonials={V3_TESTIMONIALS} />
        <div className="mt-6 flex justify-center">
          <a
            href={SOCIAL_LINKS[3].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SOCIAL_LINKS[3].ariaLabel}
            className="group relative overflow-hidden border border-white/10 bg-white/[0.03] px-4 py-2.5 flex items-center gap-2.5 transition-all hover:border-brand-cyan/40 hover:bg-brand-cyan/5 cursor-pointer"
          >
            <IconBrandGoogle className="size-4 text-white/50 group-hover:text-brand-cyan transition-colors shrink-0 relative z-10" stroke={1.5} />
            <span className="text-xs font-semibold uppercase tracking-widest text-white relative z-10">
              Bewertungen ansehen
            </span>
          </a>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          07 — ÜBER UNS PREVIEW V3 (light bg)
          V3: StatementSectionV3 onLight=true
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="light">
        <SectionHeading
          number="07"
          overline="Über uns"
          title="Wer wir sind"
          subtitle="Unser Antrieb und was uns von einer klassischen Agentur unterscheidet."
          align="left"
          onLight
        />
        <StatementSectionV3 items={UEBER_UNS_STATEMENTS} onLight />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          08 — TECH STACK V3 (dark: transparent)
          V3: TechCorners nur auf erster Card
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="transparent">
        <SectionHeading
          number="08"
          overline="Tech & Werkzeuge"
          title="Womit wir arbeiten"
          subtitle="Bewährte Technologien – und was sie für Ihren Betrieb bedeuten."
          align="left"
          light
        />
        <TechStackSectionV3 />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          09 — REFERENZEN V3 (light bg)
          V3: neutrale Dots, Tags ohne Cyan, KPI in Warm
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="light">
        <SectionHeading
          number="09"
          overline="Case Studies"
          title="Projekte &"
          titleLine2="Ergebnisse"
          subtitle="Von der ersten Idee bis zur messbaren Wirkung – transparent und direkt."
          align="left"
          onLight
        />
        <MobileSwipeGrid gridClassName="grid gap-6 md:grid-cols-2" slideMinWidth="min-w-[90%] sm:min-w-[75%]">
          {REFERENZEN.slice(0, 2).map((ref) => (
            <ReferenzCardV3 key={ref.id} referenz={ref} featured={false} compact />
          ))}
        </MobileSwipeGrid>
        <p className="mt-6 text-center">
          <Link
            href="/referenzen"
            className="text-sm font-mono uppercase tracking-widest text-brand-navy/60 hover:text-brand-navy transition-colors"
          >
            Alle Referenzen ansehen →
          </Link>
        </p>
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          10 — FAQ CHAT (unverändert)
      ───────────────────────────────────────────────────────────────────── */}
      <ChatSection
        sectionNumber="10"
        overline="Fragen"
        title="Unser"
        titleLine2="Experte"
        subtitle="Unser KI-Chatbot antwortet sofort – stellen Sie Ihre Frage auf Basis unserer Wissensbasis."
        suggestedFaq={HOME_MINI_FAQ}
        sectionBg="transparent"
      />

      <div className="w-full h-px bg-white/10 shrink-0" role="presentation" aria-hidden="true" />

      {/* ─────────────────────────────────────────────────────────────────────
          CTA V3 — Pulse nach 5s Idle
      ───────────────────────────────────────────────────────────────────── */}
      <CtaSectionV3
        headline="Bereit für das Upgrade?"
        subline="Lassen Sie uns Ihr Unternehmen auf das nächste Level heben."
        ctas={[
          { label: "Termin sichern", href: "/kontakt" },
        ]}
      />
    </>
  );
}
