"use client";

// V3 CHANGES (vs ProcessStepsV2):
// - variant="light" | "dark" Prop
// - Light: text-brand-navy, Linien bg-brand-navy/10, Cards bg-white/60 border-brand-navy/10
// - Dark: identisch mit ProcessStepsV2 (white-Farben)
// - TechCorners auf Step-Badge: bei light → border-brand-navy/30 Hover statt brand-cyan/30

import { TechCorners } from "@/components/ui/tech-corners";
import { cn } from "@/lib/utils";

interface Step {
  step: number;
  title: string;
  description: string;
}

interface ProcessStepsV3Props {
  steps: readonly Step[];
  variant?: "light" | "dark";
}

export function ProcessStepsV3({ steps, variant = "dark" }: ProcessStepsV3Props) {
  const isLight = variant === "light";

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
              {/* Connection line */}
              <div className="absolute top-14 left-0 right-0 flex items-center pointer-events-none" aria-hidden="true">
                <div
                  className={cn(
                    "h-px flex-1",
                    i === 0 ? "bg-transparent" : (isLight ? "bg-brand-navy/10" : "bg-white/15")
                  )}
                />
                <div className="w-16 shrink-0" />
                <div
                  className={cn(
                    "h-px flex-1",
                    i === steps.length - 1 ? "bg-transparent" : (isLight ? "bg-brand-navy/10" : "bg-white/15")
                  )}
                />
              </div>

              {/* Card */}
              <div
                className={cn(
                  "relative z-10 w-full max-w-xs mx-auto overflow-hidden px-4 sm:px-5 pt-5 sm:pt-6 pb-4 sm:pb-5 transition-all flex flex-col h-full",
                  isLight
                    ? "border border-brand-navy/10 bg-white/60 hover:border-brand-navy/20"
                    : "border border-white/10 bg-white/[0.03] hover:border-white/20"
                )}
              >
                {/* Step number badge */}
                <div
                  className={cn(
                    "relative flex h-16 w-16 mx-auto items-center justify-center border transition-all",
                    isLight
                      ? "border-brand-navy/20 bg-brand-light group-hover:border-brand-navy/40"
                      : "border-white/20 bg-brand-navy group-hover:border-brand-cyan/30"
                  )}
                >
                  <TechCorners pattern="all" variant="cyan" size="sm" />
                  <span
                    className={cn(
                      "font-mono text-xl font-bold",
                      isLight ? "text-brand-navy" : "text-white"
                    )}
                  >
                    {String(s.step).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className={cn(
                    "mt-4 text-xs font-semibold uppercase tracking-tight md:text-[0.5rem] lg:text-[0.6rem] xl:text-xs",
                    isLight ? "text-brand-navy" : "text-white"
                  )}
                >
                  {s.title}
                </h3>
                {s.description && (
                  <p
                    className={cn(
                      "mt-2 border-l-2 pl-3 text-left text-[0.8125rem] leading-snug md:text-[0.6rem] lg:text-[0.7rem] xl:text-[0.8125rem]",
                      isLight
                        ? "border-brand-navy/20 text-brand-navy/70"
                        : "border-white/20 text-white/80"
                    )}
                  >
                    {s.description}
                  </p>
                )}
              </div>

              {/* Connection arrow */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-14 left-[calc(50%+32px)] z-20 flex items-center justify-center pointer-events-none"
                  style={{ width: "calc(100% - 64px)" }}
                  aria-hidden="true"
                >
                  <div
                    className={cn(
                      "h-px flex-1",
                      isLight ? "bg-brand-navy/20" : "bg-white/20"
                    )}
                  />
                  <div
                    className={cn(
                      "h-1.5 w-1.5 rotate-45 border-t border-r",
                      isLight ? "border-brand-navy/25" : "border-white/25"
                    )}
                  />
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
            className={cn(
              "group relative flex gap-3 sm:gap-4 overflow-hidden p-3 sm:p-4 transition-all",
              isLight
                ? "border border-brand-navy/10 bg-white/60 hover:border-brand-navy/20"
                : "border border-white/10 bg-white/[0.03] hover:border-white/20"
            )}
          >
            <div className="flex flex-col items-center shrink-0">
              <div
                className={cn(
                  "relative flex h-12 w-12 items-center justify-center border transition-all",
                  isLight
                    ? "border-brand-navy/20 bg-brand-light group-hover:border-brand-navy/40"
                    : "border-white/20 bg-brand-navy group-hover:border-brand-cyan/30"
                )}
              >
                <TechCorners pattern="all" variant="cyan" size="sm" />
                <span
                  className={cn(
                    "font-mono text-base font-bold",
                    isLight ? "text-brand-navy" : "text-white"
                  )}
                >
                  {String(s.step).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="min-w-0 flex-1 pb-0">
              <h3
                className={cn(
                  "text-xs font-semibold uppercase tracking-tight",
                  isLight ? "text-brand-navy" : "text-white"
                )}
              >
                {s.title}
              </h3>
              {s.description && (
                <p
                  className={cn(
                    "mt-1.5 border-l-2 pl-3 text-[0.8125rem] leading-snug",
                    isLight
                      ? "border-brand-navy/20 text-brand-navy/70"
                      : "border-white/20 text-white/80"
                  )}
                >
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
