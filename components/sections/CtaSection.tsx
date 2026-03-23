import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackdropNumber } from "@/components/ui/backdrop-number";
import { IconArrowRight } from "@tabler/icons-react";

interface CtaCta {
  label: string;
  href: string;
  variant?: "default" | "outline";
}

interface CtaSectionProps {
  headline: string;
  subline?: string;
  ctas: CtaCta[];
  /** Auf Ratgeber-Seiten ausblenden – Link wäre redundant. Standard: true */
  showRatgeberLink?: boolean;
}

export function CtaSection({ headline, subline, ctas, showRatgeberLink = true }: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-32 text-brand-navy-foreground">
      <BackdropNumber number="GO" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

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

          {showRatgeberLink && (
            <div className="mt-10 flex justify-center">
              <Link
                href="/ratgeber"
                className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-brand-cyan hover:text-brand-cyan/90 transition-colors"
              >
                Ratgeber: Praxiswissen &amp; Tipps
                <IconArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" stroke={2} aria-hidden />
              </Link>
            </div>
          )}

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
