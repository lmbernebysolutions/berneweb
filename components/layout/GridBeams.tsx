"use client";

import { cn } from "@/lib/utils";
import { BEAM_CONTAINER_CLASS } from "@/lib/constants";

/**
 * Grid and beams – gleiche Breite wie Header (BEAM_CONTAINER_CLASS).
 * Logo und Header-Button schließen mit den vertikalen Beams ab.
 */
const GRID_IMAGE = `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`;

/** Vertikaler Offset so dass eine horizontale Gitterlinie auf der Header-Unterkante liegt */
const HEADER_GRID_OFFSET_Y = 24;

export function GridBeams() {
  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-1/2 -translate-x-1/2 z-0 w-full max-w-[1920px] bg-repeat bg-[length:40px_40px] md:bg-[length:48px_48px]"
      aria-hidden
      style={{
        backgroundImage: GRID_IMAGE,
        backgroundPosition: `0 ${HEADER_GRID_OFFSET_Y}px`,
      }}
    >
      {/* Inner container für Beams - mehr Abstand zum Viewport */}
      <div className={cn("relative h-full", BEAM_CONTAINER_CLASS)}>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
      </div>
    </div>
  );
}
