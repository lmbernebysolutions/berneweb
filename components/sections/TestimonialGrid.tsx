import { IconStarFilled, IconCheck } from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";

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

export function TestimonialGrid({
    testimonials,
    title = "Das sagt das Erzgebirge",
    overline = "Success Stories",
}: TestimonialGridProps) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
                <div
                    key={i}
                    data-animate="fade-up"
                    data-animate-delay={String(i * 120)}
                    className="group relative border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-brand-cyan/50 hover:shadow-[0_0_20px_rgba(3,249,249,0.06)]"
                >
                    {/* Tech corners - 2→4 diagonal pattern */}
                    <TechCorners pattern="diagonal" variant="cyan" size="md" />

                    <div className="flex gap-1 text-brand-cyan mb-4">
                        {[1, 2, 3, 4, 5].map(s => <IconStarFilled key={s} className="size-4" />)}
                    </div>
                    <p className="text-lg text-white mb-4">&ldquo;{t.text}&rdquo;</p>

                    {/* Result badge */}
                    <div className="mb-6 inline-flex items-center gap-2 border border-brand-cyan/20 bg-brand-cyan/5 px-3 py-1.5">
                        <IconCheck className="size-3.5 text-brand-cyan" stroke={2} />
                        <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">{t.result}</span>
                    </div>

                    <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                        <div className="w-10 h-10 bg-brand-cyan text-brand-navy font-bold flex items-center justify-center">
                            {t.name[0]}
                        </div>
                        <div>
                            <div className="font-bold text-white">{t.name}</div>
                            <div className="text-xs text-white/50 uppercase tracking-wider">{t.role}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
