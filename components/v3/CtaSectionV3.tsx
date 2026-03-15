"use client";

// V3 CHANGES (vs CtaSectionV2):
// - Pulse nur nach 5s idle: useEffect mit mousemove/scroll listener
// - Wenn Nutzer aktiv ist → kein Pulse; nach 5s Inaktivität → Pulse startet
// - Founder-Element beibehalten (Human Trust Layer)

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BackdropNumber } from "@/components/ui/backdrop-number";
import { COMPANY } from "@/lib/constants";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CtaCta {
  label: string;
  href: string;
  variant?: "default" | "outline";
}

interface CtaSectionV3Props {
  headline: string;
  subline?: string;
  ctas: CtaCta[];
}

export function CtaSectionV3({ headline, subline, ctas }: CtaSectionV3Props) {
  // V3: Pulse nur nach 5s Idle-Zeit
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), 5000);
    };

    // Starte den Timer sofort
    timer = setTimeout(() => setIsIdle(true), 5000);

    window.addEventListener("mousemove", resetTimer, { passive: true });
    window.addEventListener("scroll", resetTimer, { passive: true });
    window.addEventListener("keydown", resetTimer, { passive: true });
    window.addEventListener("touchstart", resetTimer, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 sm:py-32 text-brand-navy-foreground">

      {/* Horizontale Beam-Linie oben */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-cyan/20 pointer-events-none" aria-hidden="true" />

      <BackdropNumber number="GO" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 text-[20vw]" />

      {/* Hauptcontent */}
      <div className="relative z-10 mx-auto max-w-6xl min-w-0 overflow-hidden" data-animate>
        <div className="px-4 text-center md:px-6 clip-reveal">
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-tighter text-white mb-6 drop-shadow-2xl text-balance break-words max-w-full">
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
                // V3: Pulse nur wenn idle (nach 5s ohne Interaktion)
                className={i === 0 && isIdle ? "animate-cta-pulse" : undefined}
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

      {/* V3: Founder-Element beibehalten */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 mt-20">
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Gründer-Foto (WebP) */}
            <div className="shrink-0">
              <Image
                src="/team/lennard-meyer.webp"
                alt={`Porträt ${COMPANY.founders[0].name}, Berneby Solutions`}
                width={96}
                height={96}
                className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-white/20 object-cover"
                sizes="96px"
              />
            </div>

            {/* Zitat + Attribution */}
            <blockquote className="text-center sm:text-left">
              <p className="text-base sm:text-lg md:text-xl font-medium text-blue-100 leading-relaxed italic">
                &ldquo;Wir kommen aus dem Erzgebirge und bauen Lösungen, die hier wirklich funktionieren — nicht aus einer Großstadt-Agentur, die Handwerk vom Hörensagen kennt.&rdquo;
              </p>
              <footer className="mt-4">
                <cite className="not-italic">
                  <span className="block text-sm font-bold text-white uppercase tracking-wider">
                    {COMPANY.founders[0].name}
                  </span>
                  <span className="block text-xs text-white/50 uppercase tracking-widest mt-0.5">
                    Gründer · {COMPANY.name}
                  </span>
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Horizontale Beam-Linie unten */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-cyan/20 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
