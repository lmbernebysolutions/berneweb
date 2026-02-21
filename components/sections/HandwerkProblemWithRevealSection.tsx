"use client";

import { useRef, useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { OHNE_UNS_ROWS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Handwerk Problem-Sektion: 1:1 Home "Ohne Uns"-Karte.
 * Desktop: immer normale Problem-Karte, keine Animation.
 * Nur Mobile: Beim Runterscrollen (Karte verlässt Viewport-Mitte) erscheint "Unsere Lösungen:" im unteren Viertel;
 * beim Hochscrollen wieder die Problem-Inhalte.
 */
export function HandwerkProblemWithRevealSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onMatch = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onMatch);
    return () => mq.removeEventListener("change", onMatch);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const card = cardRef.current;
    if (!card) return;

    const check = () => {
      const rect = card.getBoundingClientRect();
      const center = window.innerHeight / 2;
      setShowHint(rect.bottom < center);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [isMobile]);

  const hintVisible = isMobile && showHint;

  return (
    <div
      ref={cardRef}
      className="group relative border-2 border-white/5 bg-black/30 p-6 sm:p-8 backdrop-blur-sm overflow-hidden transition-colors hover:border-white/10"
    >
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

      {/* Problem-Inhalt: auf Mobile ausgeblendet sobald showHint, auf Desktop immer sichtbar */}
      <div
        className={cn(
          "relative z-10 transition-opacity duration-400",
          hintVisible && "opacity-0 pointer-events-none"
        )}
      >
        <div className="mb-10 flex items-center justify-between">
          <h3 className="text-3xl font-bold uppercase tracking-tighter text-white/60">
            Ohne Uns
          </h3>
          <div className="flex h-10 w-10 items-center justify-center border-2 border-white/20 bg-white/5">
            <IconX className="size-6 text-white/40" stroke={3} />
          </div>
        </div>
        <div className="space-y-4">
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

      {/* Nur Mobile: Unteres Viertel – "Unsere Lösungen:" (Cyan), nur wenn nach unten aus Viewport-Mitte */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-10 h-1/4 flex items-center justify-center border-t border-white/10 bg-black/30 transition-opacity duration-400 md:hidden",
          hintVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <p className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-brand-cyan">
          Unsere Lösungen:
        </p>
      </div>
    </div>
  );
}
