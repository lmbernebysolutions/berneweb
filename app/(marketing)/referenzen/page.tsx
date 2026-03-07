"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import { ReferenzenCarousel } from "@/components/sections/ReferenzenCarousel";
import { WarumBernebyV3 } from "@/components/v3/WarumBernebyV3";
import { TRUST_BAR } from "@/lib/constants";
import { REFERENZEN, type ReferenzKategorie } from "@/lib/data/referenzen";
import { CONTAINER_A_NO_GLOW } from "@/lib/container-styles";
import { cn } from "@/lib/utils";

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

        {/* Case Studies Carousel – Desktop: schmalere Anzeige */}
        {gefilterteReferenzen.length === 0 ? (
          <div className={cn("px-8 py-16 text-center", CONTAINER_A_NO_GLOW)}>
            <p className="text-white/40 font-mono text-sm">Keine Projekte in dieser Kategorie vorhanden.</p>
          </div>
        ) : (
          <div className="md:max-w-2xl lg:max-w-3xl md:mx-auto">
            <ReferenzenCarousel referenzen={gefilterteReferenzen} />
          </div>
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
        <WarumBernebyV3
          items={[
            { point: "Termingerecht", detail: "Jedes Projekt wird zum vereinbarten Termin geliefert – kein Wenn und Aber. Unser Festpreismodell schützt Sie vor Überraschungen." },
            { point: "Messbar", detail: "Wir liefern keine Webseiten ins Nirgendwo. Jedes Projekt hat klare KPIs – wir tracken den Erfolg gemeinsam mit Ihnen." },
            { point: "Transparent", detail: "Kein Fachjargon, keine versteckten Kosten. Sie wissen zu jedem Zeitpunkt, was gemacht wird und warum – ehrlich und klar." },
            { point: "Lokal verankert", detail: "Wir kennen das Erzgebirge. Regionale Suchbegriffe, lokales Kaufverhalten, Kundschaft aus der Nachbarschaft – Ihr Vorteil." },
          ]}
        />
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
