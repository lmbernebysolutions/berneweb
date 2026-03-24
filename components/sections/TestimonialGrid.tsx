"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IconStarFilled, IconCheck } from "@tabler/icons-react";
import { CONTAINER_A_NO_GLOW } from "@/lib/container-styles";
import { cn } from "@/lib/utils";

interface Testimonial {
    name: string;
    role: string;
    text: string;
    result: string;
}

interface TestimonialGridProps {
    testimonials: Testimonial[];
    title?: string;
    overline?: string;
}

function TestimonialCard({ t, i, animate = true }: { t: Testimonial; i: number; animate?: boolean }) {
    return (
        <div
            key={i}
            {...(animate && { "data-animate": "fade-up", "data-animate-delay": String(i * 120) })}
            className={cn(
                "group relative h-full min-h-0 min-w-0 w-full overflow-hidden flex flex-col",
                "p-3 sm:p-4 md:p-5 lg:p-6 transition-all",
                CONTAINER_A_NO_GLOW
            )}
        >
            <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3 md:mb-4 text-brand-warm shrink-0" aria-hidden="true">
                {[1, 2, 3, 4, 5].map(s => <IconStarFilled key={s} className="size-3 sm:size-3.5 md:size-4 shrink-0" />)}
            </div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white mb-2 sm:mb-3 md:mb-4 min-h-[3rem] sm:min-h-[4rem] md:min-h-[5.25rem] break-words flex-1">&ldquo;{t.text}&rdquo;</p>
            <div className="mb-3 sm:mb-4 md:mb-6 mt-auto self-start inline-flex items-center gap-1.5 sm:gap-2 border border-brand-warm/30 bg-brand-warm/5 px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 max-w-full flex-wrap shrink-0">
                <IconCheck className="size-2.5 sm:size-3 md:size-3.5 text-brand-warm shrink-0 max-[359px]:hidden" stroke={2} aria-hidden="true" />
                <span className="text-[0.6rem] sm:text-[0.65rem] md:text-xs font-bold text-brand-warm uppercase tracking-wider break-words">{t.result}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 border-t border-white/10 pt-2 sm:pt-3 md:pt-4 min-w-0 shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-white/5 border border-white/15 text-white font-bold flex items-center justify-center shrink-0 text-xs sm:text-sm md:text-base">
                    {t.name[0]}
                </div>
                <div className="min-w-0">
                    <div className="font-bold text-white text-xs sm:text-sm md:text-base truncate">{t.name}</div>
                    <div className="text-[0.6rem] sm:text-[0.65rem] md:text-xs text-brand-navy-muted uppercase tracking-wider truncate">{t.role}</div>
                </div>
            </div>
        </div>
    );
}

/** Swipe-Nav wie PricingCards / MobileSwipeGrid */
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

export function TestimonialGrid({
    testimonials,
    title = "Das sagt das Erzgebirge",
    overline = "Erfolgsgeschichten",
}: TestimonialGridProps) {
    const n = testimonials.length || 1;
    const useSwipeOnMobile = n >= 3;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "center",
        containScroll: "trimSnaps",
        dragFree: false,
    });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi || !useSwipeOnMobile) return;
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
    }, [emblaApi, useSwipeOnMobile]);

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Mobile: Swipe-Carousel wie Pakete & Preise, nur bei 3+ Testimonials */}
            {useSwipeOnMobile && (
                <div className="md:hidden relative px-1">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-4 touch-pan-y">
                            {testimonials.map((t, i) => (
                                <div key={i} className="flex-[0_0_78%] min-w-0 shrink-0 px-1">
                                    <TestimonialCard t={t} i={i} animate={false} />
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
            )}

            {/* Desktop: immer Grid; Mobile: nur wenn < 3 Testimonials */}
            <div
                className={cn(
                    useSwipeOnMobile ? "hidden md:grid" : "grid",
                    "gap-4 sm:gap-6 items-stretch"
                )}
                style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
            >
                {useSwipeOnMobile ? (
                    testimonials.map((t, i) => (
                        <div key={i} className="min-w-0 min-h-0 flex" data-animate="fade-up" data-animate-delay={String(i * 120)}>
                            <TestimonialCard t={t} i={i} animate={false} />
                        </div>
                    ))
                ) : (
                    testimonials.map((t, i) => (
                        <div key={i} className="min-w-0 min-h-0 flex">
                            <TestimonialCard t={t} i={i} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
