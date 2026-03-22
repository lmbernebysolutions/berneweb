"use client";

import { cn } from "@/lib/utils";
import { TechCorners } from "@/components/ui/tech-corners";

/**
 * Feste Visualisierung der "10er Karte Support" (Digitaler Hausmeister).
 * Entspricht branding.md: Heavy Industrial, Brand Navy/Cyan/Warm, harte Kanten, Tech Corners, UPPERCASE.
 * Ersetzt den bisherigen Platzhalter mit "SOLD"-Text durch eine konsistente, wiederholbare Grafik.
 */
export function HausmeisterCardVisual({
  className,
  mode = "default",
  features,
}: {
  className?: string;
  mode?: "default" | "story";
  features?: string[];
}) {
  const resolvedFeatures =
    features ??
    (mode === "story"
      ? [
          "10 STUNDEN SUPPORT INKLUSIVE",
          "WEB, OFFICE, DESIGN & NOTFÄLLE",
          "EXPRESS-TICKET BEI PROBLEMEN",
        ]
      : ["FIXER KONTAKT", "KURZE WEGE", "TRANSPARENT"]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center border-2 border-white/10 bg-brand-navy",
        mode === "story"
          ? "w-full h-[320px] shadow-none"
          : "w-full max-w-[20rem] min-h-[26rem] shadow-[4px_4px_0px_rgba(0,0,0,0.5)]",
        className
      )}
      aria-hidden
    >
      {mode !== "story" && (
        <TechCorners pattern="all" variant="cyan" size="lg" animate />
      )}

      {/* Karten-Inhalt: Titelbereich */}
      <div className={cn(
        "absolute left-5 right-5 z-10 flex flex-col justify-center border border-white/10 bg-white/5 p-4",
        mode === "story" ? "top-4 h-[84px]" : "top-5 h-[6.5rem]"
      )}>
        {mode === "story" ? (
          <div className="h-full flex items-center justify-center text-center relative">
            <div className="absolute inset-0 pointer-events-none">
              <TechCorners pattern="all" variant="cyan" size="sm" hoverExpand={false} />
            </div>
            <span className="font-display font-black uppercase tracking-[0.06em] leading-[1.05] text-brand-cyan text-[18px]">
              HAUSMEISTER TICKET
            </span>
          </div>
        ) : (
          <>
            <span
              className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-brand-cyan sm:text-6xl"
            >
              10
            </span>
            <span className="font-display mt-1 text-sm font-bold uppercase tracking-widest text-white/80">
              Stunden · Support
            </span>
          </>
        )}
      </div>

      {/* Bottom area: Barcodes/Price (Default) + Stamp (Story/Default) */}
      <div
        className={cn(
          "absolute left-5 right-5 z-0 flex h-2 gap-0.5 pointer-events-none",
          mode === "story" ? "bottom-6" : "bottom-12"
        )}
        aria-hidden={false}
        style={{ opacity: 1 }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 min-w-[2px] bg-brand-cyan/50"
            style={{ height: i % 3 === 0 ? "100%" : "60%" }}
          />
        ))}
      </div>
      <div
        className={cn(
          "absolute left-5 right-5 z-0 flex gap-2 pointer-events-none",
          mode === "story" ? "bottom-3" : "bottom-6"
        )}
      >
        <div className="h-0.5 w-8 bg-white/20" />
        <div className="h-0.5 w-8 bg-white/20" />
      </div>

      {mode === "story" ? (
        <div className="absolute top-[120px] left-4 right-4 bottom-[104px] z-10">
          <ul className="flex flex-col gap-2.5">
            {resolvedFeatures.slice(0, 3).map((t) => (
              <li
                key={t}
                className="border-l-2 border-brand-cyan pl-3 py-0.5 font-sans font-medium uppercase tracking-[0.06em] text-white text-[10px] leading-[1.15]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "border-[5px] border-brand-cyan bg-brand-navy px-6 py-4",
            "font-display text-4xl font-black uppercase tracking-tighter text-brand-cyan sm:text-5xl",
            "shadow-[0_0_24px_rgba(3,249,249,0.45)]",
            "rotate-[-12deg]",
            "motion-reduce:rotate-0"
          )}
        >
          SOLD
        </div>
      )}

      {mode === "story" && (
        <div className="absolute bottom-[76px] left-4 right-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy-muted z-10">
          GÜLTIG FÜR 12 MONATE
        </div>
      )}
    </div>
  );
}
