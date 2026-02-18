"use client";

/**
 * Grid and beams aligned with main content via CSS only (same max-w-6xl mx-auto px-4 md:px-6).
 * No JS-driven position so first paint matches layout – avoids CLS from post-hydration shift.
 */
const GRID_IMAGE = `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`;

/** Vertikaler Offset so dass eine horizontale Gitterlinie auf der Header-Unterkante liegt */
const HEADER_GRID_OFFSET_Y = 24;

export function GridBeams() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-6xl bg-repeat px-4 md:px-6 bg-[length:40px_40px] md:bg-[length:48px_48px]"
      aria-hidden
      style={{
        backgroundImage: GRID_IMAGE,
        backgroundPosition: `0 ${HEADER_GRID_OFFSET_Y}px`,
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
    </div>
  );
}
