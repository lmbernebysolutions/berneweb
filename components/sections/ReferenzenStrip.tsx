"use client";

import { TechCorners } from "@/components/ui/tech-corners";

interface ReferenzenStripProps {
  items: readonly string[];
}

const TAG_CLASS =
  "shrink-0 whitespace-nowrap border border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-brand-cyan sm:px-3 sm:py-2 sm:text-[0.75rem]";

export function ReferenzenStrip({ items }: ReferenzenStripProps) {
  const showStatic = items.length <= 4;
  const duplicated = [...items, ...items];

  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden border border-white/10 bg-brand-navy/60 py-4 backdrop-blur-md">
      <TechCorners pattern="diagonal" variant="cyan" size="lg" />
      <div className="relative z-10 min-w-0 overflow-hidden px-4 md:px-5">
        {showStatic ? (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {items.map((label, i) => (
              <span key={`${label}-${i}`} className={TAG_CLASS}>
                {label}
              </span>
            ))}
          </div>
        ) : (
          <>
            <div className="flex w-max min-w-full animate-referenzen-marquee gap-2 sm:gap-3 md:gap-4">
              {duplicated.map((label, i) => (
                <span key={`${label}-${i}`} className={TAG_CLASS}>
                  {label}
                </span>
              ))}
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-brand-navy/60 to-transparent sm:w-12"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-brand-navy/60 to-transparent sm:w-12"
              aria-hidden
            />
          </>
        )}
      </div>
    </div>
  );
}
