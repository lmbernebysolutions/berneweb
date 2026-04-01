"use client";

import React, { useEffect, useState } from "react";

interface LaborStep {
  delay: number; // ms from start
  text: string;
}

const LABOR_STEPS: LaborStep[] = [
  { delay: 500, text: "> Initialisiere regionale Marktdaten..." },
  { delay: 2200, text: "> Gleiche Betriebsstruktur ab (Ø 75 Tage Verlust/Jahr, HWK 2025)..." },
  { delay: 4100, text: "> Kalkuliere Marktdruck: >25% der Inhaber im Erzgebirge über 60 (ZDH)..." },
  { delay: 6000, text: "✓ Individueller Wachstumsplan erfolgreich generiert." },
];

const TOTAL_DURATION = 6500; // ms before advancing

interface Screen6Props {
  onComplete: () => void;
}

export function Screen6LaborIllusion({ onComplete }: Screen6Props) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LABOR_STEPS.forEach(({ delay, text }) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, text]);
          if (text.startsWith("✓")) setDone(true);
        }, delay)
      );
    });

    timers.push(setTimeout(onComplete, TOTAL_DURATION));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 py-8">
      {/* Spinner */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer rotating ring */}
        <div
          className={`absolute inset-0 border-2 border-brand-cyan/20 border-t-brand-cyan transition-all duration-700 ${
            done ? "border-brand-cyan" : "animate-spin"
          }`}
          style={{ animationDuration: "1.2s", animationTimingFunction: "linear" }}
        />
        {/* Inner static square */}
        <div className="w-4 h-4 bg-brand-cyan/20 border border-brand-cyan/40" />
        {/* Done checkmark */}
        {done && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              className="animate-[fade-in_0.3s_ease_forwards]"
            >
              <path
                d="M1 8L7 14L19 1"
                stroke="#03f9f9"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Terminal log */}
      <div className="w-full max-w-sm border border-brand-cyan/20 bg-slate-900 p-4 font-mono text-sm">
        {/* Terminal title bar */}
        <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-brand-cyan/10">
          <span className="w-2 h-2 bg-white/10" />
          <span className="w-2 h-2 bg-white/10" />
          <span className="w-2 h-2 bg-brand-cyan/40" />
          <span className="ml-2 text-xs text-white/40 uppercase tracking-widest">
            berneby.analyse
          </span>
        </div>

        {/* Log lines */}
        <div className="flex flex-col gap-2 min-h-[80px]">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className={`leading-snug transition-all duration-300 ${
                line.startsWith("✓")
                  ? "text-brand-cyan font-bold"
                  : "text-white/60"
              }`}
            >
              {line}
              {i === visibleLines.length - 1 && !done && (
                <span className="inline-block w-[6px] h-[12px] bg-brand-cyan/70 ml-1 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm font-mono text-white/40 uppercase tracking-widest text-center mt-4">
        Einen Moment — wir bereiten deine Ergebnisse vor
      </p>
    </div>
  );
}
