"use client";

// V2 CHANGES (System C + G — Mobile Version):
// - "SYSTEM_ONLINE" / "STATUS_OFFLINE" Badges → entfernt
// - "BOOST: ${item.gain}" → "↑ ${item.gain}"
// - "PROBLEM: ${item.risk}" → "— ${item.risk}"
// - TechCorners auf "solution"-State: BEHALTEN (semantisch korrekt: selected/active)
// - Animate-pulse Dot auf Solution-Zeilen: entfernt

import { useRef, useState, useEffect } from "react";
import { TechCorners } from "@/components/ui/tech-corners";
import { IconCheck, IconX } from "@tabler/icons-react";
import { OHNE_UNS_ROWS, MIT_UNS_ROWS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ProblemToSolutionScrollSectionV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const height = rect.height;
      const raw = (center - rect.top) / height;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-[80vh] md:hidden">
      <div
        className={cn(
          "sticky top-24 left-0 right-0 transition-all duration-300",
          progress > 0.5
            ? "border-2 border-brand-cyan/30 bg-brand-cyan/5 shadow-[0_0_60px_rgba(3,249,249,0.15)]"
            : "border-2 border-white/5 bg-black/30"
        )}
      >
        {/* TechCorners: nur im Solution-State (Cyan ist Interaction/Selected-Signal) */}
        {progress > 0.5 && (
          <TechCorners
            pattern="all"
            variant="cyan"
            size="lg"
          />
        )}

        {progress <= 0.5 && (
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
            }}
          />
        )}
        {progress > 0.5 && (
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(3,249,249,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,249,249,0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        )}

        {/* V2: "SYSTEM_ONLINE" / "STATUS_OFFLINE" Badge entfernt */}

        <div className="relative z-10 p-6 sm:p-8">
          <div className="mb-10 flex items-center justify-between">
            <h3
              className={cn(
                "text-3xl sm:text-3xl font-bold uppercase tracking-tighter transition-colors duration-300",
                progress > 0.5 ? "text-brand-cyan drop-shadow-[0_0_10px_rgba(3,249,249,0.5)]" : "text-white/60"
              )}
            >
              {progress > 0.5 ? "Mit Uns" : "Ohne Uns"}
            </h3>
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center border-2 transition-colors duration-300",
                progress > 0.5
                  ? "border-brand-cyan bg-brand-cyan/20 shadow-[0_0_20px_rgba(3,249,249,0.4)]"
                  : "border-white/20 bg-white/5"
              )}
            >
              {progress > 0.5 ? (
                <IconCheck className="size-6 text-brand-cyan" stroke={3} />
              ) : (
                <IconX className="size-6 text-white/40" stroke={3} />
              )}
            </div>
          </div>

          <div className="space-y-4">
            {OHNE_UNS_ROWS.map((item, i) => {
              const sol = MIT_UNS_ROWS[i];
              return (
                <div
                  key={item.label}
                  className="relative"
                  style={{ minHeight: "4.5rem" }}
                >
                  {/* Problem row */}
                  <div
                    className={cn(
                      "absolute inset-0 border-l-2 bg-white/[0.02] p-4 transition-opacity duration-300",
                      progress > 0.5 ? "opacity-0 pointer-events-none border-white/10" : "opacity-100"
                    )}
                  >
                    <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/30">
                      <span>{item.label}</span>
                      {/* V2: "PROBLEM: Hoch" → "— Hoch" */}
                      <span className="text-white/20">— {item.risk}</span>
                    </div>
                    <p className="mt-1 font-medium text-brand-navy-muted">{item.val}</p>
                  </div>
                  {/* Solution row */}
                  <div
                    className={cn(
                      "absolute inset-0 border-l-2 border-brand-cyan bg-brand-cyan/10 p-4 transition-opacity duration-300",
                      progress > 0.5 ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                  >
                    <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
                      <span>{sol.label}</span>
                      {/* V2: "BOOST: +300%" → "↑ +300%" */}
                      <span>↑ {sol.gain}</span>
                    </div>
                    <p className="mt-1 font-bold text-white">{sol.val}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
