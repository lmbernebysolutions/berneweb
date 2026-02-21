"use client";

import { IconX } from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { OHNE_UNS_ROWS, MIT_UNS_ROWS } from "@/lib/constants";

/**
 * Handwerk Problem-Sektion: 1:1 Home "Ohne Uns"-Karte.
 * Direkt darunter, ohne Lücke: nur der Text "Unsere Lösungen:" + die 4 Lösungspunkte (Cyan, gleiche Typo).
 * Keine zweite Solution-Karte – nur Text.
 */
export function HandwerkProblemWithRevealSection() {
  return (
    <div className="space-y-0">
      {/* 1:1 Home "Ohne Uns" Karte */}
      <div className="group relative border-2 border-white/5 bg-black/30 p-6 sm:p-8 backdrop-blur-sm overflow-hidden transition-colors hover:border-white/10">
        <TechCorners pattern="all" variant="navy" size="lg" />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
          }}
        />
        <div className="absolute top-0 right-0 border-b-2 border-l-2 border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/40 z-20">
          STATUS_OFFLINE
        </div>

        <div className="mb-10 flex items-center justify-between relative z-10">
          <h3 className="text-3xl font-bold uppercase tracking-tighter text-white/60">
            Ohne Uns
          </h3>
          <div className="flex h-10 w-10 items-center justify-center border-2 border-white/20 bg-white/5">
            <IconX className="size-6 text-white/40" stroke={3} />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          {OHNE_UNS_ROWS.map((item) => (
            <div
              key={item.label}
              className="border-l-2 border-white/10 bg-white/[0.02] p-4"
            >
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/30">
                <span>{item.label}</span>
                <span className="text-white/20">PROBLEM: {item.risk}</span>
              </div>
              <p className="mt-1 font-medium text-brand-navy-muted">{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nur Text: "Unsere Lösungen:" + 4 Punkte, keine zweite Karte, keine Lücke */}
      <div className="pt-6 sm:pt-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan/80 mb-4">
          Unsere Lösungen:
        </p>
        <div className="space-y-4">
          {MIT_UNS_ROWS.map((item) => (
            <div
              key={item.label}
              className="border-l-2 border-brand-cyan/50 bg-brand-cyan/5 p-4"
            >
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
                <span>{item.label}</span>
                <span className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 animate-pulse bg-brand-cyan rounded-full shadow-[0_0_6px_rgba(3,249,249,0.8)]" />
                  BOOST: {item.gain}
                </span>
              </div>
              <p className="mt-1 font-bold text-white">{item.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
