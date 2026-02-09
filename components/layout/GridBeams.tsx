"use client";

import { useEffect, useRef, useState } from "react";

const GRID_STYLE = {
  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
  backgroundRepeat: "repeat" as const,
};

const GRID_STYLE_MD = {
  backgroundSize: "48px 48px",
};

/** Vertikaler Offset so dass eine horizontale Gitterlinie auf der Header-Unterkante liegt (h-16=64px, md:h-[4.5rem]=72px) */
const HEADER_GRID_OFFSET_Y = 24; // 64-24=40, 72-24=48 → Linie bei 64px und 72px

export function GridBeams() {
  const beamRef = useRef<HTMLDivElement>(null);
  const [gridLeft, setGridLeft] = useState(16); // 1rem Fallback
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const update = () => {
      if (!beamRef.current) return;
      const rect = beamRef.current.getBoundingClientRect();
      const style = getComputedStyle(beamRef.current);
      const paddingLeft = parseFloat(style.paddingLeft) || 16;
      setGridLeft(rect.left + paddingLeft);
      setIsMd(window.matchMedia("(min-width: 768px)").matches);
    };

    update();
    const ro = new ResizeObserver(update);
    if (beamRef.current) ro.observe(beamRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      {/* Grid: volle Breite, Position per JS = exakt linke Beam-Kante; Y-Offset = Header-Unterkante auf Linie */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          ...GRID_STYLE,
          ...(isMd ? GRID_STYLE_MD : {}),
          backgroundPosition: `${gridLeft}px ${HEADER_GRID_OFFSET_Y}px`,
        }}
      />
      {/* Beam-Container (Ref für Messung) + vertikale Linien */}
      <div
        ref={beamRef}
        className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-6xl px-4 md:px-6"
        aria-hidden
      >
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-brand-cyan/20" />
        <div className="absolute right-4 md:right-6 top-0 bottom-0 w-px bg-brand-cyan/20" />
      </div>
    </>
  );
}
