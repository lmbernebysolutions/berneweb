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

          <div
            className={cn(
              "relative z-10 p-8 md:p-10",
              isNavy && "flex flex-row gap-6 md:gap-8 items-start"
            )}
          >
            <div className={cn("relative shrink-0", isNavy ? "h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36" : "inline-block")}>
              {member.image ? (
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[2px] shadow-lg h-full w-full",
                    isNavy ? "border-2 border-white/20" : "ring-4 ring-brand-warm/70 shadow-brand-navy/15 h-20 w-20"
                  )}
                >
                  <Image
                    src={member.image}
                    alt={`Porträt ${member.name}`}
                    width={isNavy ? 144 : 80}
                    height={isNavy ? 144 : 80}
                    className="h-full w-full object-cover"
                    sizes={isNavy ? "(max-width: 640px) 112px, (max-width: 768px) 128px, 144px" : "80px"}
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex items-center justify-center text-xl font-bold font-display uppercase shadow-lg rounded-[2px] h-full w-full",
                    isNavy ? "h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 bg-white/5 border-2 border-white/20 text-white" : "h-20 w-20",
                    !isNavy && "bg-brand-navy text-brand-navy-foreground ring-4 ring-brand-warm/70 shadow-brand-navy/15"
                  )}
                >
                  {member.initials}
                </div>
              )}
            </div>

            <div className={cn("min-w-0 flex-1", isNavy && "pt-0")}>
              <h3 className={cn("text-xl font-bold font-display uppercase", isNavy ? "text-white mt-0" : "mt-6")}>
                {member.name}
              </h3>
              <p className={cn("mt-1 text-sm font-semibold text-brand-warm")}>
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
        </div>
      ))}
    </div>
  );
}
