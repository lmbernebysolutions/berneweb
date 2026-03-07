"use client";

// V3 CHANGES (vs PricingCards):
// - Light-bg: Cards bg-white border-brand-navy/10
// - Highlighted Card: invertiert dunkel (bg-brand-navy text-white)
// - Kein static Glow (shadow-[0_0_30px_...] entfernt)
// - Keine TechCorners (statt überall TechCorners)
// - Hover: border-brand-navy/20 für nicht-highlighted Cards

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Package {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: readonly string[];
  highlighted?: boolean;
  badge?: string;
}

interface ComparisonRow {
  label: string;
  inPackages: readonly string[];
}

interface PricingCardsV3Props {
  packages: readonly Package[];
  comparisonRows?: readonly ComparisonRow[];
}

function SinglePricingCardV3({
  pkg,
  comparisonRows,
  compact = false,
  mobileCard = false,
}: {
  pkg: Package;
  comparisonRows?: readonly ComparisonRow[];
  compact?: boolean;
  mobileCard?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col border transition-colors min-w-0 h-full overflow-visible rounded-none",
        mobileCard ? "p-4 sm:p-5 md:p-8" : "p-3 sm:p-5 md:p-8",
        pkg.badge && "pt-5 sm:pt-6 md:pt-7",
        // V3: Highlighted = invertiert dunkel; andere = weiß mit navy-Border
        pkg.highlighted
          ? "bg-brand-navy border-brand-navy text-white hover:border-brand-navy/80"
          : "bg-white border-brand-navy/10 text-brand-navy hover:border-brand-navy/20"
        // V3: kein static Glow, keine TechCorners
      )}
    >
      {/* V3: keine TechCorners */}

      {pkg.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center bg-brand-warm py-1 px-2 text-[10px] font-bold text-brand-navy uppercase tracking-widest border border-brand-warm md:text-xs md:py-1 md:px-2.5">
          Bestseller
        </div>
      )}

      <div className="relative text-center mb-2 sm:mb-4 md:mb-8">
        <h3
          className={cn(
            "text-xs sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-widest leading-tight break-words",
            pkg.highlighted ? "text-white" : "text-brand-navy"
          )}
        >
          {pkg.name}
        </h3>
        <p
          className={cn(
            "mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm line-clamp-2 md:line-clamp-none",
            pkg.highlighted ? "text-white/70" : "text-brand-navy/50"
          )}
        >
          {pkg.description}
        </p>
      </div>

      <div
        className={cn(
          "relative flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-1 mb-3 sm:mb-6 md:mb-8 border-y py-3 sm:py-4 md:py-6 text-center",
          pkg.highlighted ? "border-white/20 bg-white/5" : "border-brand-navy/10 bg-brand-navy/5"
        )}
      >
        <span
          className={cn(
            "text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-black tracking-tighter",
            pkg.highlighted ? "text-brand-warm" : "text-brand-navy"
          )}
        >
          {pkg.price} €
        </span>
        <span
          className={cn(
            "text-[10px] sm:text-xs font-mono uppercase",
            pkg.highlighted ? "text-white/40" : "text-brand-navy/40"
          )}
        >
          {pkg.unit}
        </span>
      </div>

      {compact ? (
        <details className="relative md:hidden group/details">
          <summary className="list-none cursor-pointer flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-navy/60 hover:text-brand-navy [&::-webkit-details-marker]:hidden">
            <span>Details</span>
            <IconChevronDown className="size-3 transition-transform group-open/details:rotate-180" />
          </summary>
          <ul className="relative grow space-y-2 mb-3 mt-2">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-[10px]">
                <div
                  className={cn(
                    "mt-1 w-1 h-1 shrink-0",
                    pkg.highlighted ? "bg-brand-warm" : "bg-brand-navy/30"
                  )}
                />
                <span
                  className={cn(
                    "leading-snug",
                    pkg.highlighted ? "text-white/80" : "text-brand-navy/70"
                  )}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </details>
      ) : (
        <div className="relative grow">
          <ul className="space-y-4 mb-6">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <div
                  className={cn(
                    "mt-1 w-1.5 h-1.5 shrink-0",
                    pkg.highlighted ? "bg-brand-warm" : "bg-brand-navy/30"
                  )}
                />
                <span
                  className={cn(
                    "leading-snug",
                    pkg.highlighted ? "text-white/80" : "text-brand-navy/70"
                  )}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          {comparisonRows && comparisonRows.length > 0 && (
            <div
              className={cn(
                "border-t pt-6",
                pkg.highlighted ? "border-white/10" : "border-brand-navy/10"
              )}
            >
              <p
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] mb-3",
                  pkg.highlighted ? "text-white/40" : "text-brand-navy/40"
                )}
              >
                Kernfeatures im Vergleich
              </p>
              <ul className="space-y-2">
                {comparisonRows.map((row) => {
                  const included = row.inPackages.includes(pkg.name);
                  return (
                    <li key={row.label} className="flex items-center justify-between gap-3 text-sm">
                      <span
                        className={cn(
                          pkg.highlighted ? "text-white/70" : "text-brand-navy/70"
                        )}
                      >
                        {row.label}
                      </span>
                      {included ? (
                        <span
                          className={cn(
                            "inline-flex h-5 w-5 shrink-0 items-center justify-center border text-xs",
                            pkg.highlighted
                              ? "border-brand-warm/50 bg-brand-warm/10 text-brand-warm"
                              : "border-brand-navy/30 bg-brand-navy/5 text-brand-navy"
                          )}
                        >
                          ✓
                        </span>
                      ) : (
                        <span
                          className={cn(
                            "text-xs",
                            pkg.highlighted ? "text-white/30" : "text-brand-navy/30"
                          )}
                        >
                          —
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto pt-6">
        <Button
          asChild
          variant={pkg.highlighted ? "default" : "outline"}
          size="sm"
          className={cn(
            "w-full uppercase tracking-widest font-bold text-[10px] sm:text-xs py-2 md:py-0 md:text-sm md:h-10",
            !pkg.highlighted && "border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5"
          )}
        >
          <Link href="/kontakt">Paket wählen</Link>
        </Button>
      </div>
    </div>
  );
}

function CarouselNavButtons({
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
}: {
  onPrev: () => void;
  onNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}) {
  const btnClass =
    "flex h-10 w-10 items-center justify-center border border-brand-navy/20 bg-brand-navy/5 text-brand-navy transition hover:bg-brand-navy/10 disabled:opacity-30 disabled:pointer-events-none";
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button type="button" onClick={onPrev} className={btnClass} disabled={!canScrollPrev} aria-label="Zurück">
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button type="button" onClick={onNext} className={btnClass} disabled={!canScrollNext} aria-label="Weiter">
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export function PricingCardsV3({ packages, comparisonRows }: PricingCardsV3Props) {
  const highlightedIndex = packages.findIndex((p) => p.highlighted);
  const startIndex = highlightedIndex >= 0 ? highlightedIndex : 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
    startIndex,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <>
      {/* Mobile: Carousel */}
      <div className="md:hidden relative px-1">
        <div className="overflow-hidden pt-6" ref={emblaRef}>
          <div className="flex gap-4 touch-pan-y">
            {packages.map((pkg) => (
              <div key={pkg.name} className="flex-[0_0_78%] min-w-0 shrink-0 px-1">
                <SinglePricingCardV3 pkg={pkg} comparisonRows={comparisonRows} compact={false} mobileCard />
              </div>
            ))}
          </div>
        </div>
        <CarouselNavButtons
          onPrev={scrollPrev}
          onNext={scrollNext}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
        />
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-5 min-w-0">
        {packages.map((pkg, i) => (
          <div key={pkg.name} data-animate="fade-up" data-animate-delay={String(i * 120)} className="min-w-0">
            <SinglePricingCardV3 pkg={pkg} comparisonRows={comparisonRows} compact={false} />
          </div>
        ))}
      </div>
    </>
  );
}
