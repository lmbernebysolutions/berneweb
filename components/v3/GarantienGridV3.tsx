// V3 CHANGES (vs handwerk/page.tsx inline):
// - Light-bg: Cards bg-white/80 border-brand-navy/10
// - Keine TechCorners (human trust layer, kein tech-aesthetic)
// - Icon-Box: bg-brand-navy/5 text-brand-navy (statt bg-brand-cyan/10 text-brand-cyan)
// - Hover: border-brand-navy/20 (kein static cyan)

import { IconCheck } from "@tabler/icons-react";
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";

interface GarantieItem {
  title: string;
  description: string;
}

interface GarantienGridV3Props {
  items: readonly GarantieItem[];
}

export function GarantienGridV3({ items }: GarantienGridV3Props) {
  return (
    <MobileSwipeGrid
      gridClassName="grid gap-6 md:grid-cols-3 md:items-stretch"
      slideMinWidth="min-w-[88%] sm:min-w-[70%]"
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          data-animate="fade-up"
          data-animate-delay={String(i * 80)}
          className="group relative flex flex-col h-full min-w-0 w-full overflow-hidden border border-brand-navy/10 bg-white/80 p-4 text-center sm:p-6 transition-all hover:border-brand-navy/20"
          // V3: keine TechCorners, heller Hintergrund
        >
          <div className="relative z-10 flex flex-1 flex-col items-center gap-4">
            {/* V3: Icon-Box brand-navy/5 statt cyan/10 */}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-navy/20 bg-brand-navy/5"
              aria-hidden="true"
            >
              <IconCheck className="size-5 text-brand-navy" stroke={2.5} />
            </div>
            <div className="flex w-full max-w-prose flex-1 flex-col">
              {/* Titel + Body wie WarumBernebyV3 (Handwerk /ueber-uns) */}
              <div className="mb-1 flex min-h-[3.75rem] w-full flex-col items-center justify-center sm:min-h-[4rem] md:min-h-[4.25rem]">
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight leading-snug text-brand-navy sm:text-xl md:text-2xl">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-base leading-relaxed text-brand-navy/70 text-center">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </MobileSwipeGrid>
  );
}
