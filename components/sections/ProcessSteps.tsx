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
      {/* Desktop: Industrial blueprint timeline */}
      <div className="hidden md:block">
        <div
          className="grid gap-0"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((s, i) => (
            <div
              key={s.step}
              data-animate="fade-up"
              data-animate-delay={String(i * 120)}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Connection line segment (background) */}
              <div className="absolute top-8 left-0 right-0 flex items-center" aria-hidden="true">
                <div className={cn("h-px flex-1", i === 0 ? "bg-transparent" : "bg-brand-cyan/20")} />
                <div className="w-16 shrink-0" />
                <div className={cn("h-px flex-1", i === steps.length - 1 ? "bg-transparent" : "bg-brand-cyan/20")} />
              </div>

              {/* Step number - industrial square */}
              <div className="relative z-10">
                <div className="relative flex h-16 w-16 items-center justify-center border border-brand-cyan/30 bg-brand-navy transition-all">
                  {/* Tech Corners */}
                  <TechCorners pattern="all" variant="cyan" size="sm" />

                  <span className="font-mono text-xl font-bold text-brand-cyan">
                    {String(s.step).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <h3 className="mt-6 font-bold uppercase tracking-widest text-sm">{s.title}</h3>
              {s.description && (
                <p className="mt-3 px-6 text-[0.875rem] leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              )}

              {/* Connection arrow to next step */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-8 left-[calc(50%+32px)] z-20 flex items-center justify-center"
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

      {/* Mobile: Vertical industrial timeline */}
      <div className="md:hidden">
        <div className="space-y-0">
          {steps.map((s, i) => (
            <div
              key={s.step}
              data-animate="fade-up"
              data-animate-delay={String(i * 80)}
              className="relative flex gap-6"
            >
              {/* Timeline rail + number */}
              <div className="flex flex-col items-center">
                <div className="relative z-10">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center border border-brand-cyan/30 bg-brand-navy">
                    {/* Mini tech corners */}
                    <TechCorners pattern="all" variant="cyan" size="sm" />
                    <span className="font-mono text-base font-bold text-brand-cyan">
                      {String(s.step).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px grow bg-gradient-to-b from-brand-cyan/30 to-brand-cyan/5" aria-hidden="true" />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-10", i === steps.length - 1 && "pb-0")}>
                <h3 className="mt-2 font-bold uppercase tracking-wide">{s.title}</h3>
                {s.description && (
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
