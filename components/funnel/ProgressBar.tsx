"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number; // 0–7
  totalSteps?: number;
}

/** Zeigt ab Step 1 (Screen 2) — Goal-Gradient-Effekt */
export function ProgressBar({ currentStep, totalSteps = 7 }: ProgressBarProps) {
  // Screen 0 = kein ProgressBar (Landing)
  if (currentStep === 0) return null;

  // Sinnvolle Prozentwerte, damit der Fortschritt logisch ansteigt und bei "Fast fertig" nicht wieder sinkt
  let pct = 0;
  if (currentStep === 1) pct = 25;
  else if (currentStep === 2) pct = 50;
  else if (currentStep === 3) pct = 75;
  else if (currentStep === 4) pct = 90;
  else if (currentStep === 5) pct = 95; // Analyse läuft
  else if (currentStep === 6) pct = 98; // Fast fertig
  else if (currentStep >= 7) pct = 100;

  return (
    <div className="w-full px-0">
      {/* Track */}
      <div className="h-[2px] w-full bg-slate-800 relative overflow-hidden">
        {/* Fill */}
        <div
          className="h-full bg-brand-cyan transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
        {/* Glow on leading edge */}
        <div
          className="absolute top-0 h-full w-6 -translate-x-3"
          style={{
            left: `${pct}%`,
            background:
              "linear-gradient(90deg, transparent, rgba(3,249,249,0.6), transparent)",
          }}
        />
      </div>
      {/* Step indicator */}
      <div className="flex items-center justify-between mt-3 px-1 pb-1">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/40">
          {currentStep < 5
            ? `Schritt ${currentStep} / 4`
            : currentStep === 5
            ? "Analyse läuft"
            : currentStep === 6
            ? "Fast fertig"
            : "Abgeschlossen"}
        </span>
        <span className="text-xs font-mono font-bold text-brand-cyan/80">{pct}%</span>
      </div>
    </div>
  );
}
