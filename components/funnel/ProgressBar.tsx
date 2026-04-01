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

  // Screen 6 = Laden (100% simuliert)
  const effectiveStep = currentStep === 5 ? totalSteps : currentStep;
  const pct = Math.round((effectiveStep / totalSteps) * 100);

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
