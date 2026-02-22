"use client";

import { cn } from "@/lib/utils";
import { BEAM_CONTAINER_CLASS } from "@/lib/constants";

/**
 * Grid and beams – gleiche Breite wie Header (BEAM_CONTAINER_CLASS).
 * Logo und Header-Button schließen mit den vertikalen Beams ab.
 *
 * Ultra-wide fix: fixed-Elements ignorieren max-width des Parents völlig.
 * Lösung: left/right via CSS calc() + max() berechnen:
 *   - Auf Screens ≤ 1920px: max(0px, negative) = 0 → volle Breite
 *   - Auf Screens > 1920px: z.B. 2560px → 50vw=1280px, 1280-960=320px
 *     → left: 320px, right: 320px → Element ist exakt 1920px breit, zentriert
 */
const GRID_IMAGE = `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`;

/** Vertikaler Offset so dass eine horizontale Gitterlinie auf der Header-Unterkante liegt */
const HEADER_GRID_OFFSET_Y = 24;

export function GridBeams() {
  return (
    <div
      className="pointer-events-none fixed top-0 bottom-0 z-0 bg-repeat bg-[length:40px_40px] md:bg-[length:48px_48px]"
      aria-hidden
      style={{
        left: "max(0px, calc(50vw - 960px))",
        right: "max(0px, calc(50vw - 960px))",
        backgroundImage: GRID_IMAGE,
        backgroundPosition: `0 ${HEADER_GRID_OFFSET_Y}px`,
      }}
    >
      {/* Inner container für Beams */}
      <div className={cn("relative h-full", BEAM_CONTAINER_CLASS)}>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
      </div>
    </div>
  );
}
