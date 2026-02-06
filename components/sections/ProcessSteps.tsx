import { cn } from "@/lib/utils";

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
      {/* Desktop: Horizontal layout with dramatic styling */}
      <div className="hidden md:block">
        <div className="grid grid-cols-5 gap-0">
          {steps.map((s, i) => (
            <div
              key={s.step}
              data-animate="fade-up"
              data-animate-delay={String(i * 120)}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Connecting gradient line */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-6 left-[calc(50%+28px)] h-[2px]"
                  style={{ width: "calc(100% - 56px)" }}
                  aria-hidden="true"
                >
                  <div className="h-full w-full bg-gradient-to-r from-brand-cyan/30 to-border" />
                </div>
              )}

              {/* Step number circle with pulse ring */}
              <div className="step-number relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-brand-navy-foreground shadow-lg shadow-brand-navy/20 transition-transform duration-300 group-hover:scale-110">
                  {String(s.step).padStart(2, "0")}
                </div>
              </div>

              <h3 className="mt-5 font-bold">{s.title}</h3>
              <p className="mt-2 px-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical timeline with accent bar */}
      <div className="md:hidden">
        <div className="space-y-0">
          {steps.map((s, i) => (
            <div
              key={s.step}
              data-animate="fade-up"
              data-animate-delay={String(i * 80)}
              className="relative flex gap-5"
            >
              {/* Timeline rail + circle */}
              <div className="flex flex-col items-center">
                <div className="step-number relative z-10">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-brand-navy-foreground shadow-md shadow-brand-navy/15">
                    {String(s.step).padStart(2, "0")}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[2px] grow bg-gradient-to-b from-brand-cyan/30 to-border" aria-hidden="true" />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-10", i === steps.length - 1 && "pb-0")}>
                <h3 className="mt-1.5 font-bold">{s.title}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
