"use client";

import { TechCorners } from "@/components/ui/tech-corners";

interface ProblemItem {
    problem: string;
    description: string;
}

interface ProblemSectionProps {
    title: string;
    subtitle?: string;
    problems: ProblemItem[];
    variant?: "red" | "cyan";
}

export function ProblemSection({
    title,
    subtitle,
    problems,
    variant = "red",
}: ProblemSectionProps) {
    const isRed = variant === "red";

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((item, i) => (
                <div
                    key={item.problem}
                    data-animate="fade-up"
                    data-animate-delay={String(i * 80)}
                    className={`group relative overflow-hidden border p-8 transition-colors ${isRed
                        ? "border-red-400/50 bg-red-950/30 hover:bg-red-950/40"
                        : "border-brand-cyan/30 bg-brand-cyan/5 hover:bg-brand-cyan/10"
                        }`}
                >
                    {/* Caution Stripes */}
                    <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 ${isRed
                        ? "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,1)_10px,rgba(239,68,68,1)_20px)]"
                        : "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(3,249,249,1)_10px,rgba(3,249,249,1)_20px)]"
                        }`} />

                    {/* Tech Corners - red for problem section, cyan for solutions */}
                    <TechCorners
                        pattern="diagonal"
                        variant={isRed ? "red" : "cyan"}
                        size="lg"
                        hoverExpand
                    />

                    <div className="relative mb-6 inline-block">
                        <TechCorners pattern="all" variant={isRed ? "red" : "cyan"} size="sm" />
                        <p className={`relative z-10 font-bold uppercase tracking-wider px-4 py-1 text-xs ${isRed ? "text-red-500" : "text-brand-cyan"
                            }`}>
                            {isRed ? `Fehlercode #${i + 1}` : `Problem #${i + 1}`}
                        </p>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.problem}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
