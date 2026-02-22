"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

/**
 * Auf Mobile: horizontaler Swipe (Embla Carousel).
 * Ab md: normales Grid.
 * Nutzt embla-carousel-react (stabile, weit verbreitete Library).
 */
export function MobileSwipeGrid({
  children,
  gridClassName,
  slideMinWidth = "min-w-[85%] sm:min-w-[75%]",
  className,
}: {
  children: ReactNode;
  gridClassName: string;
  slideMinWidth?: string;
  className?: string;
}) {
  const slides = Array.isArray(children) ? children : [children];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const updateButtons = () => {
      if (!prevBtnRef.current || !nextBtnRef.current) return;
      prevBtnRef.current.disabled = !emblaApi.canScrollPrev();
      nextBtnRef.current.disabled = !emblaApi.canScrollNext();
    };
    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi]);

  return (
    <div className={cn("relative", className)}>
      {/* Mobile: Swipe-Carousel – nur ein sichtbarer Slide, keine Dopplung; Slides viewportgerecht */}
      <div className="md:hidden overflow-hidden">
        <div className="overflow-hidden touch-pan-y" ref={emblaRef}>
          <div className="flex gap-3">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={cn(
                  "flex-[0_0_auto] min-w-0 max-w-[calc(100vw-2rem)] w-[82vw] sm:w-[78vw]",
                  "overflow-hidden [&>*]:min-w-0 [&>*]:max-w-full"
                )}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
        {slides.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              ref={prevBtnRef}
              type="button"
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded border border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan transition hover:bg-brand-cyan/10 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Zurück"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded border border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan transition hover:bg-brand-cyan/10 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Weiter"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Desktop: Grid – auf Mobile komplett ausblenden (max-md:hidden), sonst doppelte Darstellung unter dem Swipe */}
      <div className={cn("max-md:hidden", gridClassName)}>{children}</div>
    </div>
  );
}
