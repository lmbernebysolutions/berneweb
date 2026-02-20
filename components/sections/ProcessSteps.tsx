"use client";

import { cn } from "@/lib/utils";
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
              className="group relative flex flex-col items-center text-center"
            >
              {/* Connection line segment with light dots: centered on step number (pt-6 + half of h-16 = 56px) */}
              <div className="absolute top-14 left-0 right-0 flex items-center pointer-events-none" aria-hidden="true">
                <div className={cn("h-px flex-1", i === 0 ? "bg-transparent" : "bg-brand-cyan/20")} />
                <div className="w-16 shrink-0" />
                <div className={cn("h-px flex-1", i === steps.length - 1 ? "bg-transparent" : "bg-brand-cyan/20")} />
              </div>

              {/* Card: FAQ/Kontakt style */}
              <div className="relative z-10 w-full max-w-xs mx-auto overflow-hidden border border-white/10 bg-white/[0.03] px-4 sm:px-5 pt-5 sm:pt-6 pb-4 sm:pb-5 transition-all hover:border-brand-cyan/20">
                <TechCorners pattern="diagonal" variant="cyan" size="md" />

                {/* Step number - unchanged */}
                <div className="relative flex h-16 w-16 mx-auto items-center justify-center border border-brand-cyan/30 bg-brand-navy transition-all">
                  <TechCorners pattern="all" variant="cyan" size="sm" />
                  <span className="font-mono text-xl font-bold text-brand-cyan">
                    {String(s.step).padStart(2, "0")}
                  </span>
                </div>

                {/* Title: smaller, tighter */}
                <h3 className="mt-4 text-xs font-semibold uppercase tracking-tight text-white">
                  {s.title}
                </h3>
                {/* Description: cyan accent, less blocky */}
                {s.description && (
                  <p className="mt-2 border-l-2 border-brand-cyan/50 pl-3 text-left text-[0.8125rem] leading-snug text-white/80">
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
                  <div className="h-px flex-1 bg-brand-cyan/40" />
                  <div className="h-1.5 w-1.5 rotate-45 border-t border-r border-brand-cyan/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical timeline, same card + reduced typo */}
      <div className="md:hidden space-y-3 sm:space-y-4">
        {steps.map((s, i) => (
          <div
            key={s.step}
            data-animate="fade-up"
            data-animate-delay={String(i * 80)}
            className="group relative flex gap-3 sm:gap-4 overflow-hidden border border-white/10 bg-white/[0.03] p-3 sm:p-4 transition-all"
          >
            <TechCorners pattern="diagonal" variant="cyan" size="md" />

            {/* Timeline rail + number */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative flex h-12 w-12 items-center justify-center border border-brand-cyan/30 bg-brand-navy">
                <TechCorners pattern="all" variant="cyan" size="sm" />
                <span className="font-mono text-base font-bold text-brand-cyan">
                  {String(s.step).padStart(2, "0")}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-px grow min-h-2 bg-gradient-to-b from-brand-cyan/30 to-brand-cyan/5" aria-hidden="true" />
              )}
            </div>

            {/* Content: reduced typo */}
            <div className={cn("min-w-0 pb-2", i === steps.length - 1 && "pb-0")}>
              <h3 className="text-xs font-semibold uppercase tracking-tight text-white">
                {s.title}
              </h3>
              {s.description && (
                <p className="mt-1.5 border-l-2 border-brand-cyan/50 pl-3 text-[0.8125rem] leading-snug text-white/80">
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
