// V3 CHANGES (vs TeamSection):
// - Avatar: quadratisch (kein rounded-full → keine rounded class)
// - Online-Dot entfernen (kein -right-0.5 -bottom-0.5 Dot)
// - Rolle text-brand-warm statt text-brand-cyan
// - Name uppercase

import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  description: string;
}

interface TeamSectionV3Props {
  members: readonly TeamMember[];
}

export function TeamSectionV3({ members }: TeamSectionV3Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
      {members.map((member, i) => (
        <div
          key={member.name}
          data-animate={i === 0 ? "fade-left" : "fade-right"}
          className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-white/20"
        >
          <div className="relative z-10 p-8 md:p-10">
            {/* Avatar: quadratisch, kein rounded-full, kein Online-Dot */}
            <div className="relative inline-block">
              <div
                className="flex h-20 w-20 items-center justify-center text-xl font-bold bg-brand-navy text-brand-navy-foreground border-4 border-brand-warm/70"
                // V3: kein rounded-full → viereckig
              >
                {member.initials}
              </div>
              {/* V3: Online-Dot entfernt */}
            </div>

            {/* V3: Name uppercase */}
            <h3 className="mt-6 text-xl font-bold uppercase tracking-wider text-white">
              {member.name}
            </h3>
            {/* V3: Rolle text-brand-warm statt text-brand-cyan */}
            <p className="mt-1 text-sm font-semibold text-brand-warm">
              {member.role}
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
              {member.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
