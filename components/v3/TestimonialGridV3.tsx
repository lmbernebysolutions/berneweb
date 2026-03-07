"use client";

// V3 CHANGES (vs TestimonialGridV2):
// - onLight Prop. Light: Cards bg-white/70 border-brand-navy/10
// - Avatar bei onLight: bg-brand-navy/10
// - Name/Text bei onLight: text-brand-navy
// - Erweiterte Attribution: Betrieb/Ort (separate Props)

import { IconStarFilled, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  /** Optional: Betriebsname */
  betrieb?: string;
  /** Optional: Ort */
  ort?: string;
  text: string;
  result: string;
}

interface TestimonialGridV3Props {
  testimonials: Testimonial[];
  onLight?: boolean;
}

function TestimonialCardV3({ t, i, onLight }: { t: Testimonial; i: number; onLight: boolean }) {
  return (
    <div
      data-animate="fade-up"
      data-animate-delay={String(i * 120)}
      className={cn(
        "group relative flex flex-col h-full min-w-0 w-full overflow-hidden p-4 sm:p-6 transition-all",
        onLight
          ? "border border-brand-navy/10 bg-white/70 hover:border-brand-navy/20"
          : "border border-white/10 bg-white/[0.03] hover:border-white/20"
      )}
    >
      <div
        className={cn(
          "flex gap-1 mb-3 sm:mb-4",
          onLight ? "text-brand-warm" : "text-brand-warm"
        )}
        aria-hidden="true"
      >
        {[1, 2, 3, 4, 5].map(s => <IconStarFilled key={s} className="size-3.5 sm:size-4" />)}
      </div>

      <p
        className={cn(
          "text-sm sm:text-lg mb-3 sm:mb-4 min-h-[4rem] sm:min-h-[5.25rem] break-words flex-1",
          onLight ? "text-brand-navy/80" : "text-white"
        )}
      >
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Result badge in Warm-Farbe — unverändert */}
      <div
        className={cn(
          "mb-4 sm:mb-6 mt-auto self-start inline-flex items-center gap-2 border px-2.5 py-1 sm:px-3 sm:py-1.5 max-w-full flex-wrap",
          onLight
            ? "border-brand-warm/30 bg-brand-warm/10"
            : "border-brand-warm/30 bg-brand-warm/5"
        )}
      >
        <IconCheck className="size-3 sm:size-3.5 text-brand-warm shrink-0" stroke={2} aria-hidden="true" />
        <span className="text-[0.65rem] sm:text-xs font-bold text-brand-warm uppercase tracking-wider break-words">
          {t.result}
        </span>
      </div>

      <div
        className={cn(
          "flex items-center gap-3 border-t pt-3 sm:pt-4 min-w-0",
          onLight ? "border-brand-navy/10" : "border-white/10"
        )}
      >
        {/* Avatar — bei onLight navy/10 statt white/5 */}
        <div
          className={cn(
            "w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 text-sm sm:text-base font-semibold",
            onLight
              ? "bg-brand-navy/10 border border-brand-navy/20 text-brand-navy"
              : "bg-white/5 border border-white/15 text-white/60"
          )}
        >
          {t.name[0]}
        </div>
        <div className="min-w-0">
          <div
            className={cn(
              "font-bold text-sm sm:text-base truncate",
              onLight ? "text-brand-navy" : "text-white"
            )}
          >
            {t.name}
          </div>
          {/* Erweiterte Attribution: Betrieb · Ort */}
          <div
            className={cn(
              "text-[0.65rem] sm:text-xs uppercase tracking-wider truncate",
              onLight ? "text-brand-navy/50" : "text-brand-navy-muted"
            )}
          >
            {t.betrieb ? `${t.betrieb} · ` : ""}{t.role}{t.ort ? ` · ${t.ort}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialGridV3({ testimonials, onLight = false }: TestimonialGridV3Props) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {testimonials.map((t, i) => (
        <div key={i} className="w-full md:w-[calc(33.333%-1.5rem)] max-w-sm md:max-w-none">
          <TestimonialCardV3 t={t} i={i} onLight={onLight} />
        </div>
      ))}
    </div>
  );
}
