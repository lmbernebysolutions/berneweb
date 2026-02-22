"use client";

import { IconStarFilled, IconCheck } from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { MobileSwipeGrid } from "@/components/sections/MobileSwipeGrid";

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

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
    return (
        <div
            key={i}
            data-animate="fade-up"
            data-animate-delay={String(i * 120)}
            className="group relative border border-white/10 bg-white/[0.03] p-4 sm:p-6 transition-all h-full min-w-0 w-full overflow-hidden flex flex-col"
        >
            <TechCorners pattern="diagonal" variant="cyan" size="md" />
            <div className="flex gap-1 mb-3 sm:mb-4 text-brand-warm" aria-hidden="true">
                {[1, 2, 3, 4, 5].map(s => <IconStarFilled key={s} className="size-3.5 sm:size-4" />)}
            </div>
            <p className="text-sm sm:text-lg text-white mb-3 sm:mb-4 min-h-[4rem] sm:min-h-[5.25rem] break-words flex-1">&ldquo;{t.text}&rdquo;</p>
            <div className="mb-4 sm:mb-6 mt-auto self-start inline-flex items-center gap-2 border border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-1 sm:px-3 sm:py-1.5 max-w-full flex-wrap">
                <IconCheck className="size-3 sm:size-3.5 text-brand-cyan shrink-0" stroke={2} aria-hidden="true" />
                <span className="text-[0.65rem] sm:text-xs font-bold text-brand-cyan uppercase tracking-wider break-words">{t.result}</span>
            </div>
            <div className="flex items-center gap-3 border-t border-white/10 pt-3 sm:pt-4 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-brand-cyan text-brand-navy font-bold flex items-center justify-center shrink-0 text-sm sm:text-base">
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

export function TestimonialGrid({
    testimonials,
    title = "Das sagt das Erzgebirge",
    overline = "Success Stories",
}: TestimonialGridProps) {
    const isDual = testimonials.length === 2;
    const gridClass = isDual
        ? "grid gap-6 md:grid-cols-2 justify-center max-w-4xl mx-auto"
        : "grid gap-6 md:grid-cols-3";

    return (
        <MobileSwipeGrid gridClassName={gridClass}>
            {testimonials.map((t, i) => (
                <TestimonialCard key={i} t={t} i={i} />
            ))}
        </MobileSwipeGrid>
    );
}
