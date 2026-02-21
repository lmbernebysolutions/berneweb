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

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6 min-w-0 overflow-hidden">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-tighter text-white mb-6 drop-shadow-2xl text-balance break-words max-w-full">
          {headline}
        </h2>

        {subline && (
          <p className="mt-6 text-xl md:text-2xl font-light text-blue-100 max-w-2xl mx-auto">
            {subline}
          </p>
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

      {/* Decorative Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(to_bottom,transparent,rgba(3,249,249,0.05)_1px,transparent_1px)] bg-[length:100%_4px] [transform:perspective(500px)_rotateX(60deg)_scale(2)] origin-bottom opacity-50 pointer-events-none" />

    </section>
  );
}
