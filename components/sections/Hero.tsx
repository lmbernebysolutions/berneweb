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
const BERG_ALL_LAYER_INDICES = [0, 1, 2, 3] as const;

type BergVariantConfig = {
  layerIndices: readonly number[];
};

const BERG_VARIANTS: Record<string, BergVariantConfig> = {
  default: {
    layerIndices: BERG_ALL_LAYER_INDICES,
  },
  home: {
    layerIndices: BERG_ALL_LAYER_INDICES,
  },
  // Hauptseiten: Außer Home wird jeweils genau 1 Layer entfernt.
  tech: {
    layerIndices: [1, 2, 3], // gelöscht: Berg1
  },
  handwerk: {
    layerIndices: [0, 2, 3], // gelöscht: Berg2
  },
  referenzen: {
    layerIndices: [0, 1, 3], // gelöscht: Berg3
  },
  kontakt: {
    layerIndices: [0, 2], // gelöscht: Berg2 + Berg4
  },
  "ueber-uns": {
    layerIndices: [1, 2, 3], // gelöscht: Berg1
  },
  // Nicht-Hauptseiten behalten alle Layer.
  branchen: {
    layerIndices: BERG_ALL_LAYER_INDICES,
  },
  standorte: {
    layerIndices: BERG_ALL_LAYER_INDICES,
  },
};

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
  const bergConfig = BERG_VARIANTS[bergVariant ?? "default"] ?? BERG_VARIANTS.default;
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
                <span key={`${accent}-${i}`} className="text-brand-cyan text-[1.06em] whitespace-normal sm:whitespace-nowrap">
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
      "relative flex flex-col overflow-x-clip overflow-y-visible isolate",
      /* Mobile: Abstand unter Navbar = Abstand Überschrift→Subline (jeweils 1.5rem ab Header h-16); ab sm wie bisher */
      "justify-start pt-[calc(4rem+1.5rem)] sm:justify-center sm:pt-32 md:pt-36",
      "pb-12 sm:pb-16 md:pb-20",
      compact ? "min-h-[50svh] sm:min-h-[60svh] lg:min-h-[70svh]" : "min-h-[70svh] sm:min-h-[80svh] lg:min-h-[90svh]"
    )}>
      {/* overflow-x-clip: Berg wird abgeschnitten ohne Scroll-Container; overflow-y-visible: keine Scrollleiste im Hero */}

      {/* Bergsilhouette: NUR mobile größer + links; Desktop wieder Standard */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] flex justify-center overflow-x-visible overflow-y-visible"
        aria-hidden="true"
      >
        <div className="relative h-[clamp(28.5rem,80vw,54rem)] sm:h-[clamp(10rem,24vw,18rem)] w-[169vw] sm:w-full sm:max-w-6xl max-w-none shrink-0 overflow-visible">
          <div className="absolute inset-0 -translate-x-[28vw] sm:translate-x-0">
          {bergConfig.layerIndices.map((layerIdx) => (
            <Image
              key={BERG_LAYERS[layerIdx]}
              src={BERG_LAYERS[layerIdx]}
              alt=""
              fill
              sizes="(max-width: 640px) 169vw, (max-width: 1024px) 90vw, 1152px"
              className={cn(
                "object-cover object-bottom select-none berg-layer-grow",
                BERG_LAYER_DELAYS[layerIdx]
              )}
              style={{ transformOrigin: "bottom center" }}
              priority={layerIdx >= 1}
              fetchPriority={layerIdx >= 1 ? "high" : undefined}
              loading={layerIdx === 0 ? "lazy" : "eager"}
              unoptimized
              aria-hidden
            />
          ))}
          </div>
        </div>
      </div>

      {/* 2. THE CONTENT FRAME – z-[3] damit Subline vor dem Berg-SVG (z-[2]) liegt; Berg bleibt vollständig sichtbar */}
      <div className="relative z-[3] mx-auto max-w-6xl w-full">
        {/* 1. THE MASSIVE SHADOW NUMBER – remain inside beams < 1290px, blueprint overlap ab 1290px */}
        <BackdropNumber number="01" className="hero-backdrop-overlap top-[-10%] sm:top-[-15%] lg:top-[-20%] left-2 sm:left-4 md:left-6 lg:left-8 opacity-100" />

        {/* Headline: nur max-sm größer (clamp+vw); ab sm wie bisher. px-3 max-sm = etwas mehr Zeilenbreite. */}
        <div className="px-3 sm:px-5 md:px-6 lg:px-8 mb-6 sm:mb-6 md:mb-8 min-w-0 pr-11 sm:pr-14 md:pr-16">
          <div className="hero-line-reveal min-w-0 overflow-visible">
            <h1
              className={cn(
                "hero-heading-overlap font-display font-extrabold uppercase leading-[0.95] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] max-w-full text-balance break-words min-w-0 max-sm:pb-0 pb-4 ml-[-0.05em] sm:ml-[-0.1em] md:ml-0 lg:ml-0 overflow-visible tracking-tighter max-sm:tracking-[-0.04em]",
                "max-sm:text-[length:clamp(2.8rem,6.1vw+1.68rem,3.75rem)] sm:text-5xl md:text-6xl lg:text-[5.625rem] xl:text-[7rem] 2xl:text-8xl"
              )}
            >
              {headlineParts}
            </h1>
          </div>
        </div>

        {/* Subline & Buttons – etwas größer Mobile + Desktop */}
        <div className="mx-auto max-w-6xl w-full px-3 sm:px-5 md:px-6 lg:px-8 hero-line-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 min-w-0">
              <div className="mt-0 border-l-2 border-white/25 pl-3 sm:pl-6">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-blue-100 leading-relaxed max-w-full">
                  {subline
                    .replace(/\\n/g, "\n")
                    .split("\n")
                    .map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 ? <br /> : null}
                      </span>
                    ))}
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
                      className={cn(
                        "text-sm sm:text-base"
                      )}
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

      {/* 3. BOTTOM DECORATION – Linie bündig unten (bottom-0) */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-white/10" aria-hidden="true" />

    </section>
  );
}
