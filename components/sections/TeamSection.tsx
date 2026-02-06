interface TeamMember {
  name: string;
  role: string;
  initials: string;
  description: string;
}

interface TeamSectionProps {
  members: readonly TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
      {members.map((member, i) => (
        <div
          key={member.name}
          data-animate={i === 0 ? "fade-left" : "fade-right"}
          className="card-hover-glow group relative overflow-hidden rounded-2xl border border-border bg-card"
        >
          {/* Decorative gradient at top */}
          <div className="h-1.5 w-full bg-gradient-to-r from-brand-navy via-brand-navy to-brand-cyan/40" />

          <div className="p-8 md:p-10">
            {/* Avatar with ring */}
            <div className="relative inline-block">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-navy text-xl font-bold text-brand-navy-foreground shadow-lg shadow-brand-navy/15 ring-4 ring-background">
                {member.initials}
              </div>
              {/* Status dot */}
              <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 border-background bg-brand-cyan" />
            </div>

            <h3 className="mt-6 text-xl font-bold">{member.name}</h3>
            <p className="mt-1 text-sm font-semibold text-brand-cyan">
              {member.role}
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {member.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
