"use client";

import { cn } from "@/lib/utils";

/**
 * Grid and beams – gleiche Breite wie Header und Sections.
 * Beams sind bei absolute left/right-0 des inneren Containers.
 *
 * Ab 1920px: Container wächst proportional auf 60vw, damit die
 * wahrgenommene Größe auf allen Screens gleich bleibt.
 * 60vw @ 1920px = 1152px = max-w-6xl (nahtloser Übergang).
 * 60vw @ 2560px = 1536px (gleiche 60% Proportion).
 */
const GRID_IMAGE = `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`;
const HEADER_GRID_OFFSET_Y = 24;

export function GridBeams() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-repeat bg-[length:40px_40px] md:bg-[length:48px_48px]"
      aria-hidden
      style={{
        backgroundImage: GRID_IMAGE,
        backgroundPosition: `0 ${HEADER_GRID_OFFSET_Y}px`,
      }}
    >
      {/* Beam-Container: exakt gleiche Breite wie Sections und Header */}
      <div className="relative h-full mx-auto w-full max-w-6xl min-[1920px]:max-w-[60vw] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
      </div>
    </div>
  );
}
