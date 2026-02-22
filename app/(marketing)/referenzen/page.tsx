"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import { ReferenzenCarousel } from "@/components/sections/ReferenzenCarousel";
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";
import { TechCorners } from "@/components/ui/tech-corners";
import {
  IconCircleCheck,
  IconTrendingUp,
  IconClock,
  IconBuildingStore,
} from "@tabler/icons-react";
import { TRUST_BAR } from "@/lib/constants";
import { REFERENZEN, type ReferenzKategorie } from "@/lib/data/referenzen";

// =============================================================================
// FILTER TABS
// =============================================================================
const KATEGORIEN: ReferenzKategorie[] = [
  "Alle",
  "Handwerk",
  "Webseite",
  "E-Commerce",
  "Marketing",
];

// =============================================================================
// PAGE
// =============================================================================
export default function ReferenzenPage() {
  const [activeKategorie, setActiveKategorie] = useState<ReferenzKategorie>("Alle");

  const gefilterteReferenzen =
    activeKategorie === "Alle"
      ? REFERENZEN
      : REFERENZEN.filter((r) => r.kategorien.includes(activeKategorie));

  return (
    <>
      <Hero
        bergVariant="referenzen"
        headline="UNSERE"
        headlineLine2="REFERENZEN"
        accentText="REFERENZEN"
        subline="Echte Projekte. Echte Ergebnisse. Für Betriebe aus dem Erzgebirge und darüber hinaus."
        ctas={[
          { label: "Projekt anfragen", href: "/kontakt", variant: "default" },
          { label: "Leistungen entdecken", href: "/tech", variant: "outline" },
        ]}
        variant="navy"
      />

      <TrustBar items={TRUST_BAR} />

      {/* ─── CASE STUDIES SLIDESHOW ──────────────────────────────────── */}
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

        {/* Category Filter Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Projekt-Kategorien">
          {KATEGORIEN.map((kat) => (
            <button
              key={kat}
              role="tab"
              aria-selected={activeKategorie === kat}
              onClick={() => setActiveKategorie(kat)}
              className={`relative border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-150 cursor-pointer ${
                activeKategorie === kat
                  ? "border-brand-cyan bg-brand-cyan/10 text-brand-cyan shadow-[0_0_20px_rgba(3,249,249,0.2)]"
                  : "border-white/10 bg-transparent text-white/40 hover:border-brand-cyan/30 hover:text-white/70"
              }`}
            >
              {activeKategorie === kat && (
                <span className="absolute -top-px left-0 right-0 h-px bg-brand-cyan" />
              )}
              {kat}
            </button>
          ))}
        </div>

        {/* Case Studies Carousel */}
        {gefilterteReferenzen.length === 0 ? (
          <div className="border border-brand-cyan/10 bg-brand-cyan/5 px-8 py-16 text-center">
            <p className="text-white/40 font-mono text-sm">Keine Projekte in dieser Kategorie vorhanden.</p>
          </div>
        ) : (
          <ReferenzenCarousel referenzen={gefilterteReferenzen} />
        )}
      </Section>

      {/* ─── PROCESS / WHY US ────────────────────────────────────── */}
      <Section bg="subtle">
        <SectionHeading
          number="03"
          overline="Unser Versprechen"
          title="Was jedes Projekt"
          titleLine2="auszeichnet"
          subtitle="Qualität, Transparenz und lokale Verbundenheit sind der Kern unserer Arbeit."
          forceBreak
          align="left"
          light
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
              className="group relative overflow-hidden border border-brand-cyan/20 bg-brand-navy/60 p-4 sm:p-6 transition-all hover:border-brand-cyan/40 hover:shadow-[0_0_40px_rgba(3,249,249,0.08)] h-full min-w-0 w-full"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="md" animate />

              <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center border border-brand-cyan/20 bg-brand-cyan/10">
                <item.icon className="size-5 text-brand-cyan" stroke={1.5} />
              </div>

              <h3 className="mb-2 text-base font-bold uppercase tracking-tight text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/55">
                {item.text}
              </p>
            </div>
          ))}
        </MobileSwipeGrid>
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <CtaSection
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
