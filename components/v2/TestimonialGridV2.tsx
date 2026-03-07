"use client";

// V2 CHANGES (System B + D):
// - Avatar: bg-brand-cyan text-brand-navy → bg-white/5 border border-white/15 text-white/60
//   (Neutral placeholder; echte Fotos kommen in Phase 2)
// - Result badge: border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan
//                → border-brand-warm/30 bg-brand-warm/5 text-brand-warm
//   (Warm = Ergebnis/Erfolg; Cyan = nur für Interaction-States)
// - TechCorners: vollständig entfernt (System B: KEINS für Testimonial-Cards)
// - Hover: border-white/20 statt implizitem Cyan-hover

import { IconStarFilled, IconCheck } from "@tabler/icons-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  result: string;
}

interface TestimonialGridV2Props {
  testimonials: Testimonial[];
}

function TestimonialCardV2({ t, i }: { t: Testimonial; i: number }) {
  return (
    <div
      data-animate="fade-up"
      data-animate-delay={String(i * 120)}
      // V2: TechCorners entfernt; hover zu white/20
      className="group relative border border-white/10 bg-white/[0.03] p-4 sm:p-6 transition-all hover:border-white/20 h-full min-w-0 w-full overflow-hidden flex flex-col"
    >
      <div className="flex gap-1 mb-3 sm:mb-4 text-brand-warm" aria-hidden="true">
        {[1, 2, 3, 4, 5].map(s => <IconStarFilled key={s} className="size-3.5 sm:size-4" />)}
      </div>

      <p className="text-sm sm:text-lg text-white mb-3 sm:mb-4 min-h-[4rem] sm:min-h-[5.25rem] break-words flex-1">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* V2: Result badge in Warm-Farbe (Erfolgs-Signal, nicht Interaction-Signal) */}
      <div className="mb-4 sm:mb-6 mt-auto self-start inline-flex items-center gap-2 border border-brand-warm/30 bg-brand-warm/5 px-2.5 py-1 sm:px-3 sm:py-1.5 max-w-full flex-wrap">
        <IconCheck className="size-3 sm:size-3.5 text-brand-warm shrink-0" stroke={2} aria-hidden="true" />
        <span className="text-[0.65rem] sm:text-xs font-bold text-brand-warm uppercase tracking-wider break-words">
          {t.result}
        </span>
      </div>

      <div className="flex items-center gap-3 border-t border-white/10 pt-3 sm:pt-4 min-w-0">
        {/* V2: Neutral placeholder — bg-white/5 border border-white/15 statt Cyan-Initials */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/15 flex items-center justify-center shrink-0 text-sm sm:text-base font-semibold text-white/60">
          {t.name[0]}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-white text-sm sm:text-base truncate">{t.name}</div>
          <div className="text-[0.65rem] sm:text-xs text-brand-navy-muted uppercase tracking-wider truncate">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialGridV2({ testimonials }: TestimonialGridV2Props) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {testimonials.map((t, i) => (
        <div key={i} className="w-full md:w-[calc(33.333%-1.5rem)] max-w-sm md:max-w-none">
          <TestimonialCardV2 t={t} i={i} />
        </div>
      ))}
    </div>
  );
}
