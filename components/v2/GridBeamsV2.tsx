"use client";

/**
 * V2 BEAM OVERRIDE (Empfehlung 1)
 *
 * Verwendet in: app/(test)/layout.tsx
 * Zweck: Überblendet die globalen Cyan-Beams (GridBeams.tsx z-0) mit weißen,
 *        strukturellen Linien ohne Cyan-Ambient-Signal.
 *
 * Technik:
 * - Sitzt auf z-[1] (zwischen GridBeams z-0 und main z-10)
 * - bg-[#283569] Divs decken die alten bg-brand-cyan/20 Beams pixelgenau ab
 * - bg-white/[0.04] Divs ersetzen sie — kaum sichtbar, strukturell spürbar
 *
 * In Produktion würde direkt GridBeams.tsx geändert (1 Zeile Diff):
 *   bg-brand-cyan/20 → bg-white/[0.04]
 * Für den Sandbox ist das die non-destructive Lösung ohne Production-Touch.
 */
export function GridBeamsV2() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    >
      {/* Exakt gleiche Container-Breite wie GridBeams + Sections */}
      <div className="relative h-full mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Überblenden der alten Cyan-Beams mit Hintergrundfarbe */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#283569]" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-[#283569]" />
        {/* Neue White Beams — nur strukturell, kein Cyan-Signal */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white" />
      </div>
    </div>
  );
}
