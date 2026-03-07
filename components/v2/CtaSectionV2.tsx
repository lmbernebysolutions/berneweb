import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackdropNumber } from "@/components/ui/backdrop-number";
import { COMPANY } from "@/lib/constants";

// V2 CHANGES (System G + D):
// - TRON-Perspektivgitter-Floor entfernt (perspective(500px) rotateX(60deg) scale(2))
//   Ersatz: horizontale h-px Beam-Linie oben + unten (konsistent mit GridBeams-System)
// - animate-cta-pulse auf CTA-Button: entfernt (nur auf expliziten End-CTAs, nicht hier)
// - Founder-Element hinzugefügt: Foto-Placeholder + Gründer-Zitat + Name
//   (Phase 1: neutraler Placeholder; Phase 2: echtes Foto nach Fotoshooting)

interface CtaCta {
  label: string;
  href: string;
  variant?: "default" | "outline";
}

interface CtaSectionV2Props {
  headline: string;
  subline?: string;
  ctas: CtaCta[];
}

export function CtaSectionV2({ headline, subline, ctas }: CtaSectionV2Props) {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 sm:py-32 text-brand-navy-foreground">

      {/* V2: Horizontale Beam-Linie oben — integriert mit GridBeams-System (h-px, cyan/20) */}
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
                // V2: animate-cta-pulse NUR hier — einziger erlaubter "lauter" Moment der Seite
                className={i === 0 ? "animate-cta-pulse" : undefined}
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

      {/* V2: Founder-Element — menschliche Note, "Heavy Industrial" nicht "faceless agency" */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 mt-20">
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Foto-Placeholder — Phase 2: echtes Foto einfügen */}
            <div className="shrink-0">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 border border-white/15 flex items-center justify-center text-2xl font-bold text-white/40"
                aria-label={`Foto ${COMPANY.founders[0].name} — folgt nach Fotoshooting`}
              >
                LM
              </div>
              {/* Phase 2: Ersetze <div> durch:
              <Image
                src="/team/lennard-meyer.jpg"
                alt="Lennard Meyer, Berneby Solutions"
                width={96}
                height={96}
                className="border-2 border-white/20 object-cover"
              /> */}
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

      {/* V2: Horizontale Beam-Linie unten */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-cyan/20 pointer-events-none" aria-hidden="true" />

      {/* V2: TRON-Perspektivgitter entfernt */}

    </section>
  );
}
