"use client";

// V2 CHANGES (System A + B):
// - Connecting line: bg-brand-cyan/20 → bg-white/15 (kein ambient cyan)
// - Connection arrow line: bg-brand-cyan/40 → bg-white/20
// - Connection arrow chevron: border-brand-cyan/60 → border-white/25
// - Description border: border-brand-cyan/50 → border-white/20
// - Step number: text-brand-cyan → text-white (cyan nur noch via hover, nicht static)
// - TechCorners auf card wrapper: entfernt (System B: KEINS für ProcessStep-Karten)
// - TechCorners auf step number badge: BEHALTEN (small, "all", highlights the number)
// - border-brand-cyan/30 auf step number → border-white/20 (kein static ambient cyan)

import { TechCorners } from "@/components/ui/tech-corners";
import { cn } from "@/lib/utils";

interface Step {
  step: number;
  title: string;
  description: string;
}

interface ProcessStepsV2Props {
  steps: readonly Step[];
}

export function ProcessStepsV2({ steps }: ProcessStepsV2Props) {
  return (
    <div className="relative">
      {/* Desktop */}
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
              {/* Connection line: white/15 instead of cyan/20 */}
              <div className="absolute top-14 left-0 right-0 flex items-center pointer-events-none" aria-hidden="true">
                <div className={cn("h-px flex-1", i === 0 ? "bg-transparent" : "bg-white/15")} />
                <div className="w-16 shrink-0" />
                <div className={cn("h-px flex-1", i === steps.length - 1 ? "bg-transparent" : "bg-white/15")} />
              </div>

              {/* Card: V2: TechCorners entfernt vom card wrapper */}
              <div className="relative z-10 w-full max-w-xs mx-auto overflow-hidden border border-white/10 bg-white/[0.03] px-4 sm:px-5 pt-5 sm:pt-6 pb-4 sm:pb-5 transition-all hover:border-white/20 flex flex-col h-full">

                {/* Step number badge: V2: TechCorners behalten (klein, gezielte Betonung) */}
                <div className="relative flex h-16 w-16 mx-auto items-center justify-center border border-white/20 bg-brand-navy transition-all group-hover:border-brand-cyan/30">
                  <TechCorners pattern="all" variant="cyan" size="sm" />
                  {/* V2: Zahl in Weiß — Cyan nur bei hover via TechCorners */}
                  <span className="font-mono text-xl font-bold text-white">
                    {String(s.step).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 text-xs font-semibold uppercase tracking-tight text-white md:text-[0.5rem] lg:text-[0.6rem] xl:text-xs">
                  {s.title}
                </h3>
                {s.description && (
                  <p className="mt-2 border-l-2 border-white/20 pl-3 text-left text-[0.8125rem] leading-snug text-white/80 md:text-[0.6rem] lg:text-[0.7rem] xl:text-[0.8125rem]">
                    {s.description}
                  </p>
                )}
              </div>

              {/* Connection arrow: V2: white/20 + white/25 statt cyan */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-14 left-[calc(50%+32px)] z-20 flex items-center justify-center pointer-events-none"
                  style={{ width: "calc(100% - 64px)" }}
                  aria-hidden="true"
                >
                  <div className="h-px flex-1 bg-white/20" />
                  <div className="h-1.5 w-1.5 rotate-45 border-t border-r border-white/25" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertikale Liste */}
      <div className="md:hidden space-y-3 sm:space-y-4">
        {steps.map((s, i) => (
          <div
            key={s.step}
            data-animate="fade-up"
            data-animate-delay={String(i * 80)}
            // V2: TechCorners entfernt vom card wrapper
            className="group relative flex gap-3 sm:gap-4 overflow-hidden border border-white/10 bg-white/[0.03] p-3 sm:p-4 transition-all hover:border-white/20"
          >
            <div className="flex flex-col items-center shrink-0">
              {/* Step number badge: V2: border-white/20, TechCorners behalten */}
              <div className="relative flex h-12 w-12 items-center justify-center border border-white/20 bg-brand-navy group-hover:border-brand-cyan/30">
                <TechCorners pattern="all" variant="cyan" size="sm" />
                <span className="font-mono text-base font-bold text-white">
                  {String(s.step).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="min-w-0 flex-1 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-tight text-white">
                {s.title}
              </h3>
              {s.description && (
                // V2: border-brand-cyan/50 → border-white/20
                <p className="mt-1.5 border-l-2 border-white/20 pl-3 text-[0.8125rem] leading-snug text-white/80">
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
