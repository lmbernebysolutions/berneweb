"use client";

import React from "react";
import { useFunnel } from "../FunnelContext";
import { Button } from "@/components/ui/button";
import { TechCorners } from "@/components/ui/tech-corners";

export function Screen1Hook() {
  const { nextStep } = useFunnel();

  return (
    <div className="flex flex-col gap-6 min-h-full">
      {/* Hero Section */}
      <div className="flex flex-col gap-4 pt-0">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight leading-[0.95] text-white">
          WO VERLIERT{" "}
          <span className="text-brand-cyan">DEIN BETRIEB</span>
          <br />
          AKTUELL GELD
          <br />
          UND ZEIT?
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-sm mt-2">
          Der 90-Sekunden Digital-Check für Handwerk &amp; Dienstleistung im Erzgebirge.
          Keine Agentur-Phrasen. Nur harte Fakten für deinen Wachstumshebel.
        </p>
      </div>

      {/* Trust Signals */}
      <div className="flex flex-col gap-3">
        {[
          "85 % der Betriebe spüren massiven Erreichbarkeitsdruck (Bitkom 2025)",
          "100 % kostenfrei — Dauer ca. 90 Sekunden",
          "Keine Agentur-Phrasen. Kein Spam. DSGVO-konform.",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="mt-1 shrink-0 w-5 h-5 flex items-center justify-center border border-brand-cyan/40">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="#03f9f9"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </span>
            <span className="text-base text-white/80 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="pb-safe">
        <p className="text-center text-xs font-mono text-white/40 mb-3 uppercase tracking-widest">
          Kein Konto. Kein Risiko.
        </p>
        <Button
          onClick={nextStep}
          size="lg"
          className="w-full"
        >
          JETZT POTENZIAL PRÜFEN
        </Button>
      </div>
    </div>
  );
}
