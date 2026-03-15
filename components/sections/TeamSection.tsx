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
              isNavy && "flex flex-col md:flex-row md:gap-8 md:items-start"
            )}
          >
            {/* Navy: Mobile = Bild links + Name/Role rechts in einer Zeile; ab md = Bild links, Text rechts */}
            {isNavy && (
              <div className="flex flex-row gap-4 items-start md:contents">
                <div className={cn("relative shrink-0 h-20 w-20 sm:h-24 sm:w-24 md:h-36 md:w-36")}>
                  {member.image ? (
                    <div className="relative overflow-hidden rounded-[2px] shadow-lg h-full w-full border-2 border-white/20">
                      <Image
                        src={member.image}
                        alt={`Porträt ${member.name}`}
                        width={144}
                        height={144}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 144px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg md:text-xl font-bold font-display uppercase shadow-lg rounded-[2px] bg-white/5 border-2 border-white/20 text-white">
                      {member.initials}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 md:hidden">
                  <h3 className="text-lg font-bold font-display uppercase text-white mt-0">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold text-brand-warm">
                    {member.role}
                  </p>
                </div>
              </div>
            )}

            {/* Navy: Beschreibung unter Bild+Name auf Mobile; ab md Name+Role+Description rechts vom Bild */}
            {isNavy && (
              <div className="flex-1 min-w-0 mt-4 md:mt-0">
                <h3 className="hidden md:block text-xl font-bold font-display uppercase text-white mt-0">
                  {member.name}
                </h3>
                <p className="hidden md:block mt-1 text-sm font-semibold text-brand-warm">
                  {member.role}
                </p>
                <p className="mt-4 md:mt-4 text-[0.9375rem] leading-relaxed text-white/80">
                  {member.description}
                </p>
              </div>
            )}

            {/* Default variant (nicht navy): unverändert Bild/Initialen oben, darunter Name/Role/Description */}
            {!isNavy && (
              <>
                <div className="relative inline-block shrink-0">
                  {member.image ? (
                    <div className="relative overflow-hidden rounded-[2px] shadow-lg h-20 w-20 ring-4 ring-brand-warm/70 shadow-brand-navy/15">
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
                    <div className="flex h-20 w-20 items-center justify-center text-xl font-bold font-display uppercase shadow-lg rounded-[2px] bg-brand-navy text-brand-navy-foreground ring-4 ring-brand-warm/70 shadow-brand-navy/15">
                      {member.initials}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 mt-6">
                  <h3 className="text-xl font-bold font-display uppercase">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brand-warm">
                    {member.role}
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {member.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
