"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { CONTAINER_B_STATIC } from "@/lib/container-styles";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  description: string;
  image?: string;
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
              ? CONTAINER_B_STATIC
              : "card-hover-glow rounded-2xl border border-border bg-card"
          )}
        >
          {isNavy ? (
            null
          ) : (
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-navy via-brand-navy to-brand-cyan/40" />
          )}

          <div className="relative z-10 p-8 md:p-10">
            <div className="relative inline-block">
              {member.image ? (
                <div
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-[2px] shadow-lg",
                    isNavy ? "border-2 border-white/20" : "ring-4 ring-brand-warm/70 shadow-brand-navy/15"
                  )}
                >
                  <Image
                    src={member.image}
                    alt={`Porträt ${member.name}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                    sizes="80px"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex h-20 w-20 items-center justify-center text-xl font-bold font-display uppercase shadow-lg rounded-[2px]",
                    isNavy
                      ? "bg-white/5 border-2 border-white/20 text-white"
                      : "bg-brand-navy text-brand-navy-foreground ring-4 ring-brand-warm/70 shadow-brand-navy/15"
                  )}
                >
                  {member.initials}
                </div>
              )}
            </div>

            <h3 className={cn("mt-6 text-xl font-bold font-display uppercase", isNavy && "text-white")}>
              {member.name}
            </h3>
            <p
              className={cn(
                "mt-1 text-sm font-semibold text-brand-warm"
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
