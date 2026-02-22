import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BackdropNumber } from "@/components/ui/backdrop-number";

interface HeroCta {
  label: string;
  href: string;
  variant: "default" | "outline" | "outline-light";
}

/** Überall 4 Berg-Layer wie auf Home; hinten→vorne: Berg1, Berg2, Berg3, Berg4 (Berg4 ganz vorn); Animation 4→2→3→1 */
const BERG_LAYERS = ["/icons/Berg1.svg", "/icons/Berg2.svg", "/icons/Berg3.svg", "/icons/Berg4.svg"] as const;
const BERG_LAYER_DELAYS = ["berg-layer-grow-delay-3", "berg-layer-grow-delay-1", "berg-layer-grow-delay-2", "berg-layer-grow-delay-0"] as const;

interface HeroProps {
  headline: string;
  /** Zweite Zeile der Headline – für kontrollierten Umbruch */
  headlineLine2?: string;
  /** Dritte Zeile der Headline – für kontrollierten Umbruch auf Mobile */
  headlineLine3?: string;
  subline: string;
  ctas?: HeroCta[];
  variant?: "navy" | "cyan";
  compact?: boolean;
  accentText?: string | string[];
  bergVariant?: string;
}

export function Hero({
  headline,
  headlineLine2,
  headlineLine3,
  subline,
  ctas,
  variant = "navy",
  compact = false,
  accentText,
  bergVariant,
}: HeroProps) {
  const accents = Array.isArray(accentText) ? accentText : [accentText].filter(Boolean) as string[];

  const applyAccents = (text: string) => {
    if (!text) return text;
    if (!accents.length) return text;

    let result: React.ReactNode[] = [text];

    for (const accent of accents) {
      if (!accent) continue;
      result = result.flatMap(chunk => {
        if (typeof chunk === 'string' && chunk.includes(accent)) {
          const parts = chunk.split(accent);
          return parts.reduce((acc: React.ReactNode[], part, i) => {
            acc.push(part);
            if (i < parts.length - 1) {
              acc.push(
                <span key={`${accent}-${i}`} className="text-cyan text-[1.06em] whitespace-normal sm:whitespace-nowrap">
                  {accent}
                </span>
              );
            }
            return acc;
          }, []);
        }
        return [chunk];
      });
    }
    return result.length === 1 && typeof result[0] === 'string' ? result[0] : result;
  };

  let headlineParts: React.ReactNode = applyAccents(headline);

  if (headlineLine2 != null && headlineLine2 !== "") {
    headlineParts = (
      <>
        {headlineParts}
        <br />
        {applyAccents(headlineLine2)}
      </>
    );
  }
  if (headlineLine3 != null && headlineLine3 !== "") {
    headlineParts = (
      <>
        {headlineParts}
        <br />
        {applyAccents(headlineLine3)}
      </>
    );
  }

  return (
    <section className={cn(
      "relative flex flex-col justify-center overflow-x-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20 isolate",
      compact ? "min-h-[50svh] sm:min-h-[60svh] lg:min-h-[70svh]" : "min-h-[70svh] sm:min-h-[80svh] lg:min-h-[90svh]"
    )}>
      {/* overflow-x-hidden statt overflow-hidden, damit der Berg unten nicht abgeschnitten wird */}

      {/* Bergsilhouette: höher + overflow-visible, damit nichts abgeschnitten wird */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-end items-end pointer-events-none z-[2] overflow-visible"
        aria-hidden="true"
        style={{
          transform: "translateZ(0)",
          height: "clamp(10rem, 24vw, 18rem)",
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end h-full overflow-visible">
          <div className="relative w-full max-w-6xl h-full shrink-0 overflow-visible px-4 sm:px-5 md:px-6 lg:px-8">
            {BERG_LAYERS.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
                className={cn(
                  "object-cover object-bottom select-none berg-layer-grow",
                  BERG_LAYER_DELAYS[i]
                )}
                style={{ transformOrigin: "bottom center" }}
                priority={i >= 1 && i <= 2}
                fetchPriority={i >= 1 && i <= 2 ? "high" : undefined}
                loading={i === 0 || i === 3 ? "lazy" : "eager"}
                unoptimized
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. THE CONTENT FRAME – unter dem Berg (z-[1]), damit die Silhouette sichtbar bleibt */}
      <div className="relative z-[1] mx-auto max-w-6xl w-full">
        {/* 1. THE MASSIVE SHADOW NUMBER – restored blueprint offset for desktop, matches section style on mobile/tablet */}
        <BackdropNumber number="01" className="top-[-10%] sm:top-[-15%] lg:top-[-20%] left-2 sm:left-4 md:left-6 lg:left-[-5%] opacity-100" />

        {/* Headline: Accent auf Mobile umbruchfähig damit nichts abgeschnitten wird */}
        <div className="px-4 sm:px-5 md:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-8 min-w-0 pr-12 sm:pr-14 md:pr-16">
          <div className="hero-line-reveal min-w-0">
            <h1 className="font-display text-[2.5rem] min-[360px]:text-[2.75rem] min-[400px]:text-[3.125rem] sm:text-5xl md:text-6xl lg:text-[5.625rem] xl:text-[7rem] 2xl:text-8xl font-extrabold uppercase leading-[0.95] tracking-tighter text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] max-w-full text-balance break-words min-w-0 pb-4 ml-[-0.05em] sm:ml-[-0.1em] md:ml-0 lg:ml-0 xl:ml-0 min-[1290px]:-ml-[0.66em]">
              {headlineParts}
            </h1>
          </div>
        </div>

        {/* Subline & Buttons – etwas größer Mobile + Desktop */}
        <div className="mx-auto max-w-6xl w-full px-4 sm:px-5 md:px-6 lg:px-8 hero-line-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 min-w-0">
              <div className="mt-0 border-l-4 border-cyan pl-3 sm:pl-6">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-blue-100 leading-relaxed max-w-full">
                  {subline}
                </p>
              </div>

              {ctas && ctas.length > 0 && (
                <div className="mt-6 sm:mt-8 lg:mt-12 flex flex-wrap gap-2 sm:gap-4">
                  {ctas.map((cta, i) => (
                    <Button
                      key={cta.label}
                      asChild
                      variant={cta.variant === "default" || i === 0 ? "default" : "outline-light"}
                      size="lg"
                      className="text-sm sm:text-base"
                    >
                      <Link href={cta.href}>
                        {cta.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM DECORATION – Linie bündig unten (bottom-0, keine Anhebung) */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-cyan/20" aria-hidden="true" />
      <div className="absolute left-10 bottom-0 h-20 w-px bg-cyan/20" aria-hidden="true" />
      <div className="absolute right-10 bottom-0 h-20 w-px bg-cyan/20" aria-hidden="true" />

    </section>
  );
}
