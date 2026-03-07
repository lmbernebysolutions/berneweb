import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { BackdropNumber } from "@/components/ui/backdrop-number";

interface CtaCta {
  label: string;
  href: string;
  variant?: "default" | "outline"; // Added variant
}

interface CtaSectionProps {
  headline: string;
  subline?: string;
  ctas: CtaCta[];
}

export function CtaSection({ headline, subline, ctas }: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-32 text-brand-navy-foreground">

      <BackdropNumber number="GO" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 text-[20vw]" />

      {/* overflow-hidden removed: combining overflow-hidden + clip-path animation on the same
          element causes Safari to never render the animation. Use a wrapper instead. */}
      <div className="relative z-10 mx-auto max-w-4xl min-w-0 overflow-hidden" data-animate>
      <div className="px-4 text-center md:px-6 clip-reveal">
        <h2 className="font-display text-4xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-tighter text-white mb-6 drop-shadow-2xl text-balance break-words max-w-full">
          {headline}
        </h2>

        {subline && (
          <p className="mt-6 text-xl md:text-2xl font-light text-blue-100 max-w-2xl mx-auto">
            {subline}
          </p>
        )}

        {/* Founder-Element (Phase 1: Placeholder, Phase 2: echtes Foto) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-white/5 border-2 border-white/20 flex items-center justify-center text-white/60 font-display text-2xl font-bold uppercase"
            aria-hidden="true"
          >
            LM
          </div>
          <div>
            <p className="text-sm sm:text-base text-white/80 italic">&ldquo;Wir bauen keine Luftschlösser – wir bauen, was funktioniert.&rdquo;</p>
            <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-cyan">Lennard Meyer · Berneby Solutions</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {ctas.map((cta, i) => (
            <Button
              key={cta.label}
              variant={i === 0 ? "default" : "outline"}
              size="lg"
              asChild
            >
              <Link href={cta.href}>
                {cta.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      </div>

    </section>
  );
}
