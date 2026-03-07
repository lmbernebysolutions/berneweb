// =============================================================================
// HANDWERK V3 — SANDBOX PAGE
// =============================================================================
// Erreichbar unter: /handwerk-v3
// Zweck: V3 Design System — Handwerk-Seite mit light bg Abwechslung

import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { IconBrandGoogle } from "@tabler/icons-react";

// --- V3 Komponenten ---
import { HeroV3 } from "@/components/v3/HeroV3";
import { HandwerkProblemV3 } from "@/components/v3/HandwerkProblemV3";
import { CraftToolboxGridV3 } from "@/components/v3/CraftToolboxGridV3";
import { GarantienGridV3 } from "@/components/v3/GarantienGridV3";
import { FlatrateCardV3 } from "@/components/v3/FlatrateCardV3";
import { TestimonialGridV3 } from "@/components/v3/TestimonialGridV3";
import { PricingCardsV3 } from "@/components/v3/PricingCardsV3";
import { ProcessStepsV3 } from "@/components/v3/ProcessStepsV3";
import { CtaSectionV3 } from "@/components/v3/CtaSectionV3";

// --- Unveränderte Shared-Komponenten ---
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TechCorners } from "@/components/ui/tech-corners";

const ChatSection = dynamic(
  () => import("@/components/sections/chat-section").then((m) => ({ default: m.ChatSection })),
  { ssr: true }
);

import {
  CRAFT_PACKAGES,
  PROCESS_STEPS,
  FAQ_ITEMS,
  COMPANY,
  HANDWERK_STATS,
  HANDWERK_GARANTIEN,
  SOCIAL_LINKS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Handwerk V3 — Sandbox | Berneby Solutions",
  description: "Interner Design-Sandbox: V3 Handwerk-Seite mit Light-Dark-Rhythmus.",
  robots: { index: false, follow: false },
};

const HANDWERK_TESTIMONIALS = [
  {
    name: "Markus W.",
    role: "Dachdecker",
    betrieb: "Dachdeckerei Weißbach",
    ort: "Marienberg",
    text: "Seit der neuen Website bekomme ich regelmäßig Anfragen aus der ganzen Region.",
    result: "5x mehr Anfragen in 8 Wochen",
  },
  {
    name: "Andreas B.",
    role: "Sanitärtechniker",
    betrieb: "SHK Bauer",
    ort: "Stollberg",
    text: "Die KI-Telefonassistenz ist genial. Ich kann in Ruhe arbeiten. Absolute Empfehlung.",
    result: "Keine verpassten Anrufe mehr",
  },
  {
    name: "Thomas K.",
    role: "Elektrikermeister",
    betrieb: "Elektro Klar",
    ort: "Aue",
    text: "Professionell, schnell, unkompliziert. Genau so muss das sein. Weiter so!",
    result: "Website live in 10 Tagen",
  },
];

export default function HandwerkV3() {
  return (
    <>
      {/* 01 — HERO V3 (dark) */}
      <HeroV3
        bergVariant="handwerk"
        headline="AUFTRAG VOLL? BÜRO LEER"
        accentText="BÜRO LEER"
        subline="Wir digitalisieren das Erzgebirge. Handfest für Handwerker. Clever für alle anderen. Webseiten, KI-Telefon & IT-Support aus Aue."
        ctas={[
          { label: "Projekt anfragen", href: "/kontakt", variant: "default" },
          { label: "Pakete ansehen", href: "#pakete", variant: "outline" },
        ]}
      />

      <TrustBar items={HANDWERK_STATS} />

      {/* 02 — PROBLEM (dark: transparent) */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Das Problem"
          title="Risiko: Stillstand"
          subtitle="Laut Google besuchen 76% der Nutzer, die lokal suchen, innerhalb von 24 Stunden ein Geschäft. Mit unseren 50+ Landingpages sorgen wir dafür, dass SIE gefunden werden."
          align="left"
          light
        />
        <HandwerkProblemV3 />
        <p className="mt-6 text-sm text-white/60">
          <Link href="/ratgeber/seo-fuer-handwerker" className="hover:text-brand-cyan transition-colors">
            Wie lokale SEO funktioniert
          </Link>
          {" · "}
          <Link href="/ratgeber/ki-telefonassistent-handwerk" className="hover:text-brand-cyan transition-colors">
            So funktioniert der KI-Telefonassistent
          </Link>
        </p>
      </Section>

      {/* 03 — WERKZEUGKASTEN (light bg) */}
      <Section bg="light">
        <SectionHeading
          number="03"
          overline="Ihr Werkzeugkasten"
          title="Digitales Rüsten"
          subtitle="Alles, was Ihr Betrieb digital braucht – in einem verständlichen Paket zusammengefasst."
          align="left"
          onLight
        />
        <CraftToolboxGridV3 />
      </Section>

      {/* 04 — FAQ CHAT (dark: transparent) */}
      <ChatSection
        sectionNumber="04"
        overline="Fragen"
        title="Unser"
        titleLine2="Experte"
        subtitle="Unser KI-Chatbot antwortet sofort – stellen Sie Ihre Frage auf Basis unserer Wissensbasis."
        suggestedFaq={FAQ_ITEMS}
        sectionBg="transparent"
      />

      {/* 05 — GARANTIEN (light bg) */}
      <Section bg="light">
        <SectionHeading
          number="05"
          overline="Handschlag ausm Erzgebirge"
          title="Garantien & Transparenz"
          subtitle="Festpreis, inkludierter Support, kein Kleingedrucktes."
          align="left"
          onLight
        />
        <GarantienGridV3 items={HANDWERK_GARANTIEN} />
      </Section>

      {/* 06 — FLATRATE (dark: transparent) */}
      <Section bg="transparent">
        <SectionHeading
          number="06"
          overline="Flatrate"
          title="Der Digitale Hausmeister"
          subtitle="10 Stunden Tech-Support für 850 € – 12 Monate gültig. Ihr IT-Partner auf Abruf."
          align="left"
          light
        />
        <FlatrateCardV3 />
      </Section>

      {/* 07 — TESTIMONIALS (light bg) */}
      <Section bg="light">
        <SectionHeading
          number="07"
          overline="Baustellentalk"
          title="Handwerker"
          titleLine2="vertrauen"
          titleLine3="uns"
          subtitle="Was Betriebe aus dem Erzgebirge über die Zusammenarbeit mit uns sagen."
          align="left"
          onLight
        />
        <TestimonialGridV3 testimonials={HANDWERK_TESTIMONIALS} onLight />

        {/* Google-Profil */}
        <div className="mt-6 flex justify-center">
          <a
            href={SOCIAL_LINKS[3].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SOCIAL_LINKS[3].ariaLabel}
            className="group relative overflow-hidden border border-brand-navy/10 bg-brand-navy/5 px-4 py-2.5 flex items-center gap-2.5 transition-all hover:border-brand-navy/20 cursor-pointer"
          >
            <IconBrandGoogle className="size-4 text-brand-navy shrink-0 relative z-10" stroke={1.5} />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy relative z-10">
              Bewertungen ansehen
            </span>
          </a>
        </div>
      </Section>

      {/* 08 — PRICING (dark: transparent) */}
      <Section id="pakete" bg="transparent">
        <SectionHeading
          number="08"
          overline="Investition"
          title="PAKETE"
          titleLine2="& PREISE"
          subtitle="Netto. Transparent. Ohne versteckte Kosten."
          align="left"
          light
        />
        <PricingCardsV3
          packages={CRAFT_PACKAGES}
          comparisonRows={[
            { label: "Professionelle Website", inPackages: ["Geselle", "Meisterbetrieb", "Marktführer"] },
            { label: "50+ Landingpages", inPackages: ["Meisterbetrieb", "Marktführer"] },
            { label: "KI-Telefonassistent", inPackages: ["Marktführer"] },
          ]}
        />
      </Section>

      {/* 09 — PROCESS (light bg) */}
      <Section bg="light">
        <SectionHeading
          number="09"
          overline="Ihr Bauplan"
          title="In 4 Wochen fertig"
          subtitle="Klarer Ablauf, verbindlicher Zeitplan – von der Anfrage bis zur fertigen Website."
          align="left"
          onLight
        />
        <ProcessStepsV3 steps={PROCESS_STEPS} variant="light" />
      </Section>

      <div className="w-full h-px bg-white/10 shrink-0" role="presentation" aria-hidden="true" />

      {/* CTA V3 */}
      <CtaSectionV3
        headline="Starten Sie das Upgrade"
        subline="Lassen Sie uns Ihren Betrieb digitalisieren. Jetzt Termin sichern."
        ctas={[
          { label: "Jetzt Termin vereinbaren", href: "/kontakt" },
          { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
        ]}
      />
    </>
  );
}
