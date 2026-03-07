"use client";

/**
 * Nur die vertikalen Beams (Linien) – gleiche Breite wie Header und Sections.
 * Kein Grid-Hintergrund mehr (nur Grain in globals.css).
 */
export function GridBeams() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="relative h-full mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
      </div>
    </div>
  );
}
