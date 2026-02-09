"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TRUST_BAR, PROCESS_STEPS } from "@/lib/constants";
import { Work_Sans, Oswald, Barlow, Archivo_Narrow } from "next/font/google";

// Load all 10 fonts
const workSans = Work_Sans({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-work-sans"
});

const oswald = Oswald({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-oswald"
});

const barlow = Barlow({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-barlow"
});

const archivoNarrow = Archivo_Narrow({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-archivo-narrow"
});

// Font configurations
const FONTS = [
  {
    name: "Work Sans",
    value: "work-sans",
    className: workSans.variable,
    css: "'Work Sans', sans-serif",
    score: "9/10"
  },
  {
    name: "Archivo Black",
    value: "archivo-black",
    css: "'Archivo Black', sans-serif",
    score: "9.5/10",
    googleUrl: "https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
  },
  {
    name: "Anton",
    value: "anton",
    css: "'Anton', sans-serif",
    score: "8.5/10",
    googleUrl: "https://fonts.googleapis.com/css2?family=Anton&display=swap"
  },
  {
    name: "Saira Condensed",
    value: "saira-condensed",
    css: "'Saira Condensed', sans-serif",
    score: "9/10",
    googleUrl: "https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@900&display=swap"
  },
  {
    name: "Oswald",
    value: "oswald",
    className: oswald.variable,
    css: "'Oswald', sans-serif",
    score: "8/10"
  },
  {
    name: "Barlow",
    value: "barlow",
    className: barlow.variable,
    css: "'Barlow', sans-serif",
    score: "8.5/10"
  },
  {
    name: "Bebas Neue",
    value: "bebas-neue",
    css: "'Bebas Neue', sans-serif",
    score: "7.5/10",
    googleUrl: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
  },
  {
    name: "Fjalla One",
    value: "fjalla-one",
    css: "'Fjalla One', sans-serif",
    score: "8/10",
    googleUrl: "https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap"
  },
  {
    name: "Archivo Narrow",
    value: "archivo-narrow",
    className: archivoNarrow.variable,
    css: "'Archivo Narrow', sans-serif",
    score: "8.5/10"
  },
  {
    name: "Teko",
    value: "teko",
    css: "'Teko', sans-serif",
    score: "7/10",
    googleUrl: "https://fonts.googleapis.com/css2?family=Teko:wght@700&display=swap"
  },
];

export default function FontTestPage() {
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);

  return (
    <>
      {/* Load Google Fonts that aren't loaded via next/font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@700&display=swap');

        /* Apply selected font to all headlines */
        .font-test-active h1,
        .font-test-active h2,
        .font-test-active h3,
        .font-test-active .headline {
          font-family: ${selectedFont.css} !important;
          font-weight: 800 !important;
        }
      `}</style>

      <div className={`font-test-active ${workSans.variable} ${oswald.variable} ${barlow.variable} ${archivoNarrow.variable}`}>
        {/* Font Switcher UI - Fixed Top */}
        <div className="fixed top-20 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-md border-b border-brand-cyan/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-cyan">
                Font Tester: {selectedFont.name} ({selectedFont.score})
              </h2>
              <div className="text-xs text-white/50 font-mono">
                Scroll to see font in action
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {FONTS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => setSelectedFont(font)}
                  className={`
                    px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all
                    border-2
                    ${selectedFont.value === font.value
                      ? 'bg-brand-warm text-brand-navy border-brand-warm shadow-[0_0_10px_rgba(255,181,71,0.3)]'
                      : 'bg-transparent text-white/70 border-white/20 hover:border-brand-cyan/50 hover:text-brand-cyan'
                    }
                  `}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add spacing for fixed header */}
        <div className="h-32" />

        {/* Hero - 1:1 from Home */}
        <Hero
          headline="DEIN DIGITALER WERKZEUGKASTEN."
          accentText="WERKZEUGKASTEN."
          subline="Wir digitalisieren das Erzgebirge. Handfest für Handwerker. Clever für alle anderen. Webseiten, KI-Telefon & IT-Support aus Aue."
          ctas={[
            { label: "Für Handwerker", href: "/handwerk", variant: "default" },
            { label: "Für Tech-Probleme", href: "/tech", variant: "outline" },
          ]}
          variant="navy"
        />

        {/* TrustBar */}
        <TrustBar items={TRUST_BAR} />

        {/* Section 02 - Headline Test */}
        <Section bg="transparent">
          <SectionHeading
            number="02"
            overline="Typography Test"
            title="So sieht die Schrift aus"
            titleLine2="In echten Headlines."
            subtitle="Scrollen Sie und sehen Sie wie die verschiedenen Fonts wirken. Jede Schriftart hat ihre eigene Persönlichkeit."
            align="left"
            light
          />
        </Section>

        {/* Section 03 - Process Steps */}
        <Section bg="subtle">
          <SectionHeading
            number="03"
            overline="Prozess"
            title="Headline in Kontext"
            subtitle="So würden die Headlines in echten Sektionen aussehen."
            align="left"
            light
          />
          <ProcessSteps steps={PROCESS_STEPS} />
        </Section>

        {/* Section 04 - Typography Comparison */}
        <Section bg="transparent">
          <SectionHeading
            number="04"
            overline="Vergleich"
            title="Verschiedene Größen"
            titleLine2="Und Stile"
            subtitle="Headlines funktionieren in verschiedenen Größen unterschiedlich."
            align="left"
            light
          />

          <div className="space-y-12">
            {/* Large Headline */}
            <div className="border border-white/10 bg-white/[0.03] p-8">
              <div className="text-xs text-brand-cyan mb-4 font-bold uppercase tracking-widest">
                Sehr große Headline (Hero-Größe)
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight">
                Werkzeugkasten
              </h1>
            </div>

            {/* Medium Headline */}
            <div className="border border-white/10 bg-white/[0.03] p-8">
              <div className="text-xs text-brand-cyan mb-4 font-bold uppercase tracking-widest">
                Mittlere Headline (Section-Größe)
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Digitalisierung im Erzgebirge
              </h2>
            </div>

            {/* Small Headline */}
            <div className="border border-white/10 bg-white/[0.03] p-8">
              <div className="text-xs text-brand-cyan mb-4 font-bold uppercase tracking-widest">
                Kleine Headline (Subsection-Größe)
              </div>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
                Aus Aue-Bad Schlema für das Erzgebirge
              </h3>
            </div>

            {/* Uppercase with Tracking */}
            <div className="border border-white/10 bg-white/[0.03] p-8">
              <div className="text-xs text-brand-cyan mb-4 font-bold uppercase tracking-widest">
                Mit tracking-widest (wie CTA Buttons)
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest">
                Jetzt Anfragen
              </h3>
            </div>

            {/* German Characters Test */}
            <div className="border border-white/10 bg-white/[0.03] p-8">
              <div className="text-xs text-brand-cyan mb-4 font-bold uppercase tracking-widest">
                Deutsche Umlaute Test (Ä Ö Ü ẞ)
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Qualität für alle Größen
              </h2>
              <p className="text-xl mt-4 text-white/80">
                Ähnlich, Größer, Üblich, Straße
              </p>
            </div>
          </div>
        </Section>

        {/* Info Section */}
        <Section bg="subtle">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
              Hinweis zur Auswahl
            </h3>
            <p className="text-white/70 leading-relaxed">
              Achten Sie darauf, wie gut die Schrift bei verschiedenen Größen lesbar ist,
              ob sie zum industriellen Charakter der Marke passt, und ob deutsche Sonderzeichen
              (Ä, Ö, Ü) gut dargestellt werden. Die Schrift sollte professionell, aber nicht
              zu kalt wirken – sie spricht Handwerker über 40 an.
            </p>
          </div>
        </Section>
      </div>
    </>
  );
}
