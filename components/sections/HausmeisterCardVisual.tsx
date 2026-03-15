"use client";

import { cn } from "@/lib/utils";
import { TechCorners } from "@/components/ui/tech-corners";

/**
 * Feste Visualisierung der "10er Karte Support" (Digitaler Hausmeister).
 * Entspricht branding.md: Heavy Industrial, Brand Navy/Cyan/Warm, harte Kanten, Tech Corners, UPPERCASE.
 * Ersetzt den bisherigen Platzhalter mit "SOLD"-Text durch eine konsistente, wiederholbare Grafik.
 */
export function HausmeisterCardVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full max-w-[16rem] aspect-[64/80]",
        "border-2 border-white/10 bg-brand-navy",
        "shadow-[4px_4px_0px_rgba(0,0,0,0.5)]",
        "min-h-[20rem]",
        className
      )}
      aria-hidden
    >
      <TechCorners pattern="all" variant="cyan" size="lg" animate />

      {/* Karten-Inhalt: Titelbereich */}
      <div className="absolute top-4 left-4 right-4 h-24 border border-white/10 bg-white/5 p-3 flex flex-col justify-center">
        <span className="font-display font-black text-4xl text-brand-cyan uppercase tracking-tighter leading-none">
          10
        </span>
        <span className="font-display text-xs font-bold text-white/80 uppercase tracking-widest mt-1">
          Stunden · Support
        </span>
      </div>

      {/* Barcode-ähnliche Linien (technische Ästhetik) */}
      <div className="absolute bottom-14 left-4 right-4 h-2 flex gap-0.5" aria-hidden>
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 min-w-[2px] bg-brand-cyan/50"
            style={{ height: i % 3 === 0 ? "100%" : "60%" }}
          />
        ))}
      </div>
      <div className="absolute bottom-10 left-4 right-4 flex gap-2">
        <div className="h-0.5 w-8 bg-white/20" />
        <div className="h-0.5 w-8 bg-white/20" />
      </div>

      {/* Preis-Label unten */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="font-mono text-[10px] text-brand-navy-muted uppercase">Netto / Paket</span>
        <span className="font-display font-black text-lg text-brand-warm uppercase">850 €</span>
      </div>

      {/* SOLD-Stempel (branding: Cyan-Rahmen, Navy, UPPERCASE, leichte Rotation) */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "border-4 border-brand-cyan bg-brand-navy px-5 py-3",
          "font-display font-black text-3xl uppercase tracking-tighter text-brand-cyan",
          "shadow-[0_0_20px_rgba(3,249,249,0.4)]",
          "rotate-[-12deg]",
          "motion-reduce:rotate-0"
        )}
      >
        SOLD
      </div>
    </div>
  );
}
