"use client";

import { TechCorners } from "@/components/ui/tech-corners";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  description: string;
}

interface TeamSectionProps {
  members: readonly TeamMember[];
  /** Use "navy" on dark/transparent sections (Über-uns) for consistent cards with TechCorners */
  variant?: "default" | "navy";
}

export function TeamSection({ members, variant = "default" }: TeamSectionProps) {
  const isNavy = variant === "navy";

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
      {members.map((member, i) => (
        <div
          key={member.name}
          data-animate={i === 0 ? "fade-left" : "fade-right"}
          className={cn(
            "group relative overflow-hidden transition-all",
            isNavy
              ? "border border-white/10 bg-brand-navy/60 backdrop-blur-md"
              : "card-hover-glow rounded-2xl border border-border bg-card"
          )}
        >
          {isNavy ? (
            <TechCorners pattern="diagonal" variant="cyan" size="lg" />
          ) : (
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-navy via-brand-navy to-brand-cyan/40" />
          )}

          <div className="relative z-10 p-8 md:p-10">
            <div className="relative inline-block">
              <div
                className={cn(
                  "flex h-20 w-20 items-center justify-center text-xl font-bold shadow-lg rounded-full",
                  isNavy
                    ? "bg-brand-navy text-brand-navy-foreground ring-4 ring-white/10"
                    : "bg-brand-navy text-brand-navy-foreground ring-4 ring-background shadow-brand-navy/15"
                )}
              >
                {member.initials}
              </div>
              <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 border-background bg-brand-cyan" />
            </div>

            <h3 className={cn("mt-6 text-xl font-bold", isNavy && "text-white")}>
              {member.name}
            </h3>
            <p
              className={cn(
                "mt-1 text-sm font-semibold text-brand-cyan"
              )}
            >
              {member.role}
            </p>
            <p
              className={cn(
                "mt-4 text-[0.9375rem] leading-relaxed",
                isNavy ? "text-white/80" : "text-muted-foreground"
              )}
            >
              {member.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
