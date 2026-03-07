"use client";

// =============================================================================
// REFERENZEN V3 — SANDBOX PAGE
// =============================================================================
// Erreichbar unter: /referenzen-v3
// Zweck: V3 Design System — Referenzen mit neutralen Dots, Warm KPIs

import { useState } from "react";
import type { Metadata } from "next";

// --- V3 Komponenten ---
import { HeroV3 } from "@/components/v3/HeroV3";
import { ReferenzCardV3, ReferenzenCarouselV3 } from "@/components/v3/ReferenzCardV3";
import { CtaSectionV3 } from "@/components/v3/CtaSectionV3";

// --- Unveränderte Shared-Komponenten ---
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";
import {
  IconCircleCheck,
  IconTrendingUp,
  IconClock,
  IconBuildingStore,
} from "@tabler/icons-react";

import { TRUST_BAR } from "@/lib/constants";
import { REFERENZEN, type ReferenzKategorie } from "@/lib/data/referenzen";

const KATEGORIEN: ReferenzKategorie[] = [
  "Alle",
  "Handwerk",
  "Webseite",
  "E-Commerce",
  "Marketing",
];

export default function ReferenzenV3() {
  const [activeKategorie, setActiveKategorie] = useState<ReferenzKategorie>("Alle");

  const gefilterteReferenzen =
    activeKategorie === "Alle"
      ? REFERENZEN
      : REFERENZEN.filter((r) => r.kategorien.includes(activeKategorie));

  return (
    <>
      {/* 01 — HERO V3 (dark) */}
      <HeroV3
        bergVariant="referenzen"
        headline="UNSERE"
        headlineLine2="REFERENZEN"
        accentText="REFERENZEN"
        subline="Echte Projekte. Echte Ergebnisse. Für Betriebe aus dem Erzgebirge und darüber hinaus."
        ctas={[
          { label: "Projekt anfragen", href: "/kontakt", variant: "default" },
          { label: "Leistungen entdecken", href: "/tech", variant: "outline" },
        ]}
      />

      <TrustBar items={TRUST_BAR} />

      {/* 02 — CASE STUDIES (dark: transparent) */}
      <Section bg="transparent">
        <SectionHeading
          number="02"
          overline="Case Studies"
          title="Projekte &"
          titleLine2="Ergebnisse"
          subtitle="Von der ersten Idee bis zur messbaren Wirkung – transparent und direkt."
          align="left"
          light
        />

        {/* Category Filter Tabs — V3: neutral, kein Cyan-Glow */}
        <div className="mb-12 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Projekt-Kategorien">
          {KATEGORIEN.map((kat) => (
            <button
              key={kat}
              role="tab"
              aria-selected={activeKategorie === kat}
              onClick={() => setActiveKategorie(kat)}
              className={`relative border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-150 cursor-pointer ${
                activeKategorie === kat
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/10 bg-transparent text-white/40 hover:border-white/20 hover:text-white/70"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* V3 Carousel — neutrale Dots, Tags ohne Cyan, KPI in Warm */}
        {gefilterteReferenzen.length === 0 ? (
          <div className="border border-white/10 bg-white/5 px-8 py-16 text-center">
            <p className="text-white/40 font-mono text-sm">Keine Projekte in dieser Kategorie vorhanden.</p>
          </div>
        ) : (
          <ReferenzenCarouselV3 referenzen={gefilterteReferenzen} />
        )}
      </Section>

      {/* 03 — WARUM QUALITÄT (light bg) */}
      <Section bg="light">
        <SectionHeading
          number="03"
          overline="Unser Versprechen"
          title="Was jedes Projekt"
          titleLine2="auszeichnet"
          subtitle="Qualität, Transparenz und lokale Verbundenheit sind der Kern unserer Arbeit."
          forceBreak
          align="left"
          onLight
        />
        <MobileSwipeGrid gridClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" slideMinWidth="min-w-[88%] sm:min-w-[60%]">
          {[
            {
              icon: IconClock,
              title: "Termingerecht",
              text: "Jedes Projekt wird zum vereinbarten Termin geliefert – kein Wenn und Aber. Unser Festpreismodell schützt Sie vor Überraschungen.",
            },
            {
              icon: IconTrendingUp,
              title: "Messbar",
              text: "Wir liefern keine Webseiten ins Nirgendwo. Jedes Projekt hat klare KPIs – wir tracken den Erfolg gemeinsam mit Ihnen.",
            },
            {
              icon: IconCircleCheck,
              title: "Transparent",
              text: "Kein Fachjargon, keine versteckten Kosten. Sie wissen zu jedem Zeitpunkt, was gemacht wird und warum – ehrlich und klar.",
            },
            {
              icon: IconBuildingStore,
              title: "Lokal verankert",
              text: "Wir kennen das Erzgebirge. Regionale Suchbegriffe, lokales Kaufverhalten, Kundschaft aus der Nachbarschaft – Ihr Vorteil.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              data-animate="fade-up"
              data-animate-delay={String(i * 80)}
              className="group relative overflow-hidden border border-brand-navy/10 bg-white/80 p-4 sm:p-6 transition-all hover:border-brand-navy/20 h-full min-w-0 w-full"
            >
              <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center border border-brand-navy/20 bg-brand-navy/5">
                <item.icon className="size-5 text-brand-navy" stroke={1.5} />
              </div>
              <h3 className="mb-2 text-base font-bold uppercase tracking-tight text-brand-navy">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-navy/60">
                {item.text}
              </p>
            </div>
          ))}
        </MobileSwipeGrid>
      </Section>

      <div className="w-full h-px bg-white/10 shrink-0" role="presentation" aria-hidden="true" />

      {/* CTA V3 */}
      <CtaSectionV3
        headline="Bereit für Ihr Projekt?"
        subline="Erzählen Sie uns von Ihrem Betrieb – wir zeigen Ihnen, was möglich ist."
        ctas={[
          { label: "Jetzt anfragen", href: "/kontakt" },
          { label: "Handwerk-Pakete", href: "/handwerk" },
        ]}
      />
    </>
  );
}
