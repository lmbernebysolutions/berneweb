"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { TechCorners } from "@/components/ui/tech-corners";

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

interface PricingCardsProps {
  packages: readonly Package[];
  comparisonRows?: readonly ComparisonRow[];
}

function SinglePricingCard({
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
        "group relative flex flex-col border transition-colors min-w-0 h-full overflow-visible",
        mobileCard ? "p-4 sm:p-5 md:p-8" : "p-3 sm:p-5 md:p-8",
        pkg.badge && "pt-5 sm:pt-6 md:pt-7",
        "rounded-none",
        pkg.highlighted
          ? "bg-brand-navy border-brand-cyan shadow-[0_0_30px_rgba(3,249,249,0.1)] hover:shadow-[0_0_40px_rgba(3,249,249,0.15)]"
          : "bg-brand-navy/60 backdrop-blur-md border-white/10"
      )}
    >
      <TechCorners pattern="diagonal" variant="cyan" size="lg" hoverExpand />

      {pkg.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center bg-brand-cyan py-1 px-2 text-[10px] font-bold text-brand-navy uppercase tracking-widest border border-brand-cyan md:text-xs md:py-1 md:px-2.5">
          Bestseller
        </div>
      )}

      <div className="relative text-center mb-2 sm:mb-4 md:mb-8">
        <h3
          className={cn(
            "text-xs sm:text-lg md:text-2xl font-black uppercase tracking-widest leading-tight",
            pkg.highlighted ? "text-white" : "text-white"
          )}
        >
          {pkg.name}
        </h3>
        <p
          className={cn(
            "mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm line-clamp-2 md:line-clamp-none",
            pkg.highlighted ? "text-brand-cyan/80" : "text-brand-navy-muted"
          )}
        >
          {pkg.description}
        </p>
      </div>

      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-1 mb-3 sm:mb-6 md:mb-8 border-y border-white/10 py-3 sm:py-4 md:py-6 bg-black/20 text-center">
        <span
          className={cn(
            "text-4xl md:text-5xl font-black tracking-tighter",
            pkg.highlighted ? "text-brand-warm" : "text-white"
          )}
        >
          {pkg.price} €
        </span>
        <span className="text-[10px] sm:text-xs font-mono text-white/40 uppercase">
          {pkg.unit}
        </span>
      </div>

      {compact ? (
        <details className="relative md:hidden group/details">
          <summary className="list-none cursor-pointer flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-cyan/80 hover:text-brand-cyan [&::-webkit-details-marker]:hidden">
            <span>Details</span>
            <IconChevronDown className="size-3 transition-transform group-open/details:rotate-180" />
          </summary>
          <ul className="relative grow space-y-2 mb-3 mt-2">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-[10px]">
                <div className={cn("mt-1 w-1 h-1 shrink-0", pkg.highlighted ? "bg-brand-cyan" : "bg-white/30")} />
                <span className="text-white/80 leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
          {comparisonRows && comparisonRows.length > 0 && (
            <div className="relative mb-4 border-t border-white/10 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cyan/60 mb-2">Kernfeatures</p>
              <ul className="space-y-1.5">
                {comparisonRows.map((row) => {
                  const included = row.inPackages.includes(pkg.name);
                  return (
                    <li key={row.label} className="flex items-center justify-between gap-2 text-[10px]">
                      <span className="text-white/70 truncate">{row.label}</span>
                      {included ? (
                        <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border border-brand-cyan/50 bg-brand-cyan/10 text-brand-cyan text-[10px]">✓</span>
                      ) : (
                        <span className="text-white/30 text-[10px]">—</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </details>
      ) : (
        <div className="relative grow">
          <ul className="space-y-4 mb-6">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <div className={cn("mt-1 w-1.5 h-1.5 shrink-0", pkg.highlighted ? "bg-brand-cyan" : "bg-white/30")} />
                <span className="text-white/80 leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
          {comparisonRows && comparisonRows.length > 0 && (
            <div className="border-t border-white/10 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cyan/60 mb-3">Kernfeatures im Vergleich</p>
              <ul className="space-y-2">
                {comparisonRows.map((row) => {
                  const included = row.inPackages.includes(pkg.name);
                  return (
                    <li key={row.label} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-white/70">{row.label}</span>
                      {included ? (
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-brand-cyan/50 bg-brand-cyan/10 text-brand-cyan text-xs">✓</span>
                      ) : (
                        <span className="text-white/30 text-xs">—</span>
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
            !pkg.highlighted && "border-white/20 text-white hover:bg-white/10"
          )}
        >
          <Link href="/kontakt">Paket wählen</Link>
        </Button>
      </div>
    </div>
  );
}

/** Swipe-Buttons wie MobileSwipeGrid (Cyan-Rand, gleiches Design) */
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
    "flex h-10 w-10 items-center justify-center rounded border border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan transition hover:bg-brand-cyan/10 disabled:opacity-30 disabled:pointer-events-none";
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

export function PricingCards({ packages, comparisonRows }: PricingCardsProps) {
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
      {/* Mobile: Carousel – pt-6 am Viewport, damit Badge nicht abgeschnitten wird */}
      <div className="md:hidden relative px-1">
        <div className="overflow-hidden pt-6" ref={emblaRef}>
          <div className="flex gap-4 touch-pan-y">
            {packages.map((pkg) => (
              <div key={pkg.name} className="flex-[0_0_78%] min-w-0 shrink-0 px-1">
                <SinglePricingCard pkg={pkg} comparisonRows={comparisonRows} compact={false} mobileCard />
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

      {/* Desktop: Grid wie bisher */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-5 min-w-0">
        {packages.map((pkg, i) => (
          <div key={pkg.name} data-animate="fade-up" data-animate-delay={String(i * 120)} className="min-w-0">
            <SinglePricingCard pkg={pkg} comparisonRows={comparisonRows} compact={false} />
          </div>
        ))}
      </div>
    </>
  );
}
