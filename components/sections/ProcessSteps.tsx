"use client";

import { cn } from "@/lib/utils";
import { CONTAINER_A_NO_GLOW } from "@/lib/container-styles";
import { TechCorners } from "@/components/ui/tech-corners";

interface Step {
  step: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: readonly Step[];
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="relative">
      {/* Desktop: Steps in cards with TechCorners, connecting line kept */}
      <div className="hidden md:block">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((s, i) => (
            <div
              key={s.step}
              data-animate="fade-up"
              data-animate-delay={String(i * 120)}
              className="group relative flex flex-col items-center text-center h-full"
            >
              {/* Connection line segment with light dots: centered on step number (pt-6 + half of h-16 = 56px) */}
              <div className="absolute top-14 left-0 right-0 flex items-center pointer-events-none" aria-hidden="true">
                <div className={cn("h-px flex-1", i === 0 ? "bg-transparent" : "bg-brand-cyan/50")} />
                <div className="w-16 shrink-0" />
                <div className={cn("h-px flex-1", i === steps.length - 1 ? "bg-transparent" : "bg-brand-cyan/50")} />
              </div>

              {/* Card: FAQ/Kontakt style */}
              <div className={cn("relative z-10 w-full max-w-xs mx-auto overflow-hidden px-4 sm:px-5 pt-5 sm:pt-6 pb-4 sm:pb-5 flex flex-col h-full", CONTAINER_A_NO_GLOW)}>
                {/* Step number: TechCorners diagonal, bei Hover alle 4 */}
                <div className="relative overflow-hidden flex h-16 w-16 mx-auto items-center justify-center border border-white/25 bg-brand-navy transition-all group-hover:border-brand-cyan/30">
                  <TechCorners pattern="diagonal" variant="cyan" size="sm" hoverExpand />
                  <span className="font-mono text-xl font-bold text-white relative z-10">
                    {String(s.step).padStart(2, "0")}
                  </span>
                </div>

                {/* Titel: lesbar, proportional zu Section-Überschriften; 5 Spalten → moderate Stufen */}
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-tight text-white md:text-xs lg:text-sm xl:text-base">
                  {s.title}
                </h3>
                {/* Beschreibung bewusst kompakt (nur Überschriften vergrößert) */}
                {s.description && (
                  <p className="mt-2 border-l-2 border-white/25 pl-3 text-left text-[0.8125rem] leading-snug text-white/80 md:text-[0.6rem] lg:text-[0.7rem] xl:text-[0.8125rem]">
                    {s.description}
                  </p>
                )}
              </div>

              {/* Connection arrow to next step (same vertical center as line) */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-14 left-[calc(50%+32px)] z-20 flex items-center justify-center pointer-events-none"
                  style={{ width: "calc(100% - 64px)" }}
                  aria-hidden="true"
                >
                  <div className="h-px flex-1 bg-brand-cyan/50" />
                  <div className="h-1.5 w-1.5 rotate-45 border-t border-r border-brand-cyan/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertikale Liste ohne Verbindungslinie */}
      <div className="md:hidden space-y-3 sm:space-y-4">
        {steps.map((s, i) => (
          <div
            key={s.step}
            data-animate="fade-up"
            data-animate-delay={String(i * 80)}
            className={cn("group relative flex gap-3 sm:gap-4 overflow-hidden p-3 sm:p-4 transition-all", CONTAINER_A_NO_GLOW)}
          >
            <div className="flex flex-col items-center shrink-0">
              <div className="relative overflow-hidden flex h-12 w-12 items-center justify-center border border-white/25 bg-brand-navy transition-all group-hover:border-brand-cyan/30">
                <TechCorners pattern="diagonal" variant="cyan" size="sm" hoverExpand />
                <span className="font-mono text-base font-bold text-white relative z-10">
                  {String(s.step).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="min-w-0 flex-1 pb-0">
              <h3 className="text-sm font-semibold uppercase tracking-tight text-white sm:text-base">
                {s.title}
              </h3>
              {s.description && (
                <p className="mt-1.5 border-l-2 border-white/25 pl-3 text-[0.8125rem] leading-snug text-white/80">
                  {s.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
