// =============================================================================
// HOME V2 — SANDBOX PAGE
// =============================================================================
// Erreichbar unter: /home-v2
// Zweck: Visueller Vergleich aller V2-Optimierungen vs. aktueller Produktion.
// Regel: Nur V2-Komponenten aus components/v2/ verwenden (für geänderte Sections).
//        Unveränderte Sections (TrustBar, FeatureGrid, FAQ) importieren aus den
//        Original-Pfaden — das ist korrekt, da diese Sections noch nicht geändert werden.
//
// Systems angewendet:
// A — Cyan nur noch Interaction-Signal (hover/focus/active)
// B — TechCorners-Hierarchie: HERO / SIGNIFIKANT / KEINS
// C — Vocabulary Replacement: kein HUD-Jargon
// D — Human Trust Layer: neutrale Avatar-Placeholder, Founder-Element
// E — USP Dual-Layer-Naming in CraftToolboxGridV2
// F — Section Visual Rhythm
// G — Game-spezifische Elemente eliminiert
//
// Empfehlungen 1–8:
// 1 — GridBeamsV2 (weiße Beams via layout.tsx)
// 2 — Section-Spacing 3-tier: keine Änderung nötig (Section-Komponente unverändert)
// 3 — Unified Card System: ZweiWeltenCardsV2 + CraftToolboxGridV2
// 4 — Icon Container Standard: in ZweiWeltenCardsV2 + CraftToolboxGridV2 bereits
// 5 — Section Archetypes: StatementSectionV2 (Über-uns Preview)
// 6 — CTA als einziger "Gravity Well": animate-cta-pulse nur in CtaSectionV2
// 7 — Z-Index tokens: dokumentiert in V2_OPTIMIZATION_PLAN.md
// 8 — Hero dual-render: NICHT geändert (HeroV2 unverändert)
// =============================================================================

import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";

// --- V2 Komponenten (geänderte Sections) ---
import { HeroV2 } from "@/components/v2/HeroV2";
import { ZweiWeltenCardsV2 } from "@/components/v2/ZweiWeltenCardsV2";
import { ComparisonSectionV2 } from "@/components/v2/ComparisonSectionV2";
import { ProcessStepsV2 } from "@/components/v2/ProcessStepsV2";
import { TestimonialGridV2 } from "@/components/v2/TestimonialGridV2";
import { TechStackSectionV2 } from "@/components/v2/TechStackSectionV2";
import { CtaSectionV2 } from "@/components/v2/CtaSectionV2";
import { ProblemToSolutionScrollSectionV2 } from "@/components/v2/ProblemToSolutionScrollSectionV2";
import { CraftToolboxGridV2 } from "@/components/v2/CraftToolboxGridV2";
import { StatementSectionV2 } from "@/components/v2/StatementSectionV2";

// --- Unveränderte Shared-Komponenten ---
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ReferenzCard } from "@/components/sections/ReferenzenCarousel";
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
  title: "Home V2 — Sandbox | Berneby Solutions",
  description: "Interner Design-Sandbox: V2-Optimierungen — Heavy Industrial statt Cyberpunk.",
  robots: { index: false, follow: false },
};

// Über-uns Preview: Vision + Mission als StatementSection
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

export default function HomeV2() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          01 — HERO V2
          System A: kein static cyan (border-l-2 border-white/25)
          System G: animate-cta-pulse entfernt, Deko-Linien entfernt
          Empfehlung 8: dual-render Mobile/Desktop bleibt (HeroV2 nicht refactored)
      ───────────────────────────────────────────────────────────────────── */}
      {/* Mobile */}
      <div className="sm:hidden">
        <HeroV2
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
      {/* Desktop */}
      <div className="hidden sm:block">
        <HeroV2
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
          02 — ZWEI WELTEN V2
          Empfehlung 3: Unified Card System
          Empfehlung 4: Icon Container Standard (h-12 w-12 bg-white/[0.04] border border-white/10)
          System A: kein static cyan auf Icons/Bullets/Card-Border
          System B: TechCorners BEHALTEN (SIGNIFIKANT-Level)
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
        <ZweiWeltenCardsV2 />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          03 — COMPARISON V2
          System C: kein HUD-Jargon
          System G: Gamification-Labels entfernt
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Handwerk & Digital"
          title="Ohne uns vs. Mit uns"
          subtitle="Ein direkter Vergleich: was sich ändert, wenn wir Ihren digitalen Auftritt übernehmen."
          align="left"
          light
        />
        {/* Mobile: V2 scroll section */}
        <div className="md:hidden">
          <ProblemToSolutionScrollSectionV2 />
        </div>
        {/* Desktop: V2 Comparison */}
        <div className="max-md:hidden">
          <ComparisonSectionV2 />
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          04 — PROCESS V2
          System A: cyan-Pfeile → white
          System B: TechCorners auf card wrapper entfernt
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
        <ProcessStepsV2 steps={PROCESS_STEPS} />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          05 — HANDWERK TOOLBOX V2 (Preview der /handwerk-Seite)
          System E: Dual-Layer-Naming (Brand-Label + Nutzen-Headline)
          System B: TechCorners nur auf erster Karte (Ankerpunkt-Hierarchie)
          System C: "ID.01" entfernt
          Empfehlung 3: Unified Card System
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="subtle">
        <SectionHeading
          number="05"
          overline="Handwerk-Paket"
          title="Was im Paket steckt"
          subtitle="Vier Module, die Ihren Betrieb digital sichtbar und erreichbar machen."
          align="left"
          light
        />
        <CraftToolboxGridV2 />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          06 — TESTIMONIALS V2
          System B: TechCorners entfernt
          System D: Neutral-Avatar Placeholder, Warm Result-Badge
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
        <TestimonialGridV2
          testimonials={[
            { name: "Anne-Karen Voigt", role: "Ergotherapie", text: "Professionelles, nettes Team – zügig und unkompliziert. Moderne, patientenfreundliche Website. Immer wieder gerne!", result: "Website für Praxis" },
            { name: "Sylvia Schirmer", role: "Arztpraxis", text: "Hervorragende Arbeit: moderne, intuitive und patientenfreundliche Website. Unkomplizierte Zusammenarbeit, Änderungen umgehend. Wärmstens weiterempfehlen!", result: "Website-Relaunch" },
          ]}
        />
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
          07 — ÜBER UNS — VISION & MISSION (Preview der /ueber-uns-Seite)
          Empfehlung 5: Statement-Section Archetype (Option A)
          System A: kein static Cyan — border-l-4 border-white/20
          Kein Card-Wrapper, reine Typografie
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="subtle">
        <SectionHeading
          number="07"
          overline="Über uns"
          title="Wer wir sind"
          subtitle="Unser Antrieb und was uns von einer klassischen Agentur unterscheidet."
          align="left"
          light
        />
        <StatementSectionV2 items={UEBER_UNS_STATEMENTS} />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          08 — TECH STACK V2
          System F: Dual-Layer (Tech-Name + Kundennutzen)
          System B: TechCorners entfernt
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
        <TechStackSectionV2 />
      </Section>

      {/* ─────────────────────────────────────────────────────────────────────
          09 — REFERENZEN (unverändert — Mockup als visueller Qualitätsbeweis)
      ───────────────────────────────────────────────────────────────────── */}
      <Section bg="subtle">
        <SectionHeading
          number="09"
          overline="Case Studies"
          title="Projekte &"
          titleLine2="Ergebnisse"
          subtitle="Von der ersten Idee bis zur messbaren Wirkung – transparent und direkt."
          align="left"
          light
        />
        <MobileSwipeGrid gridClassName="grid gap-6 md:grid-cols-2" slideMinWidth="min-w-[90%] sm:min-w-[75%]">
          {REFERENZEN.slice(0, 2).map((ref) => (
            <ReferenzCard key={ref.id} referenz={ref} featured={false} compact />
          ))}
        </MobileSwipeGrid>
        <p className="mt-6 text-center">
          <Link
            href="/referenzen"
            className="text-sm font-mono uppercase tracking-widest text-brand-cyan hover:text-brand-cyan/80 transition-colors"
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

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      {/* ─────────────────────────────────────────────────────────────────────
          CTA V2
          Empfehlung 6: animate-cta-pulse NUR hier (einziger erlaubter "lauter" Moment)
          System G: TRON-Floor entfernt, horizontale Beam-Linien stattdessen
          System D: Founder-Element mit Zitat + Placeholder-Foto
          max-w-6xl (von 4xl)
      ───────────────────────────────────────────────────────────────────── */}
      <CtaSectionV2
        headline="Bereit für das Upgrade?"
        subline="Lassen Sie uns Ihr Unternehmen auf das nächste Level heben."
        ctas={[
          { label: "Termin sichern", href: "/kontakt" },
        ]}
      />
    </>
  );
}
