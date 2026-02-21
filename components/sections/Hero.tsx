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
  subline: string;
  ctas?: HeroCta[];
  variant?: "navy" | "cyan"; // 'light' is deprecated/removed
  compact?: boolean;
  accentText?: string;
  /** Nicht mehr genutzt – Berg ist überall 1:1 wie auf Home (4 Layer + Animation) */
  bergVariant?: string;
}

export function Hero({
  headline,
  subline,
  ctas,
  variant = "navy",
  compact = false,
  accentText,
  bergVariant,
}: HeroProps) {
  // Split headline
  let headlineParts: React.ReactNode = headline;
  if (accentText && headline.includes(accentText)) {
    const [before, after] = headline.split(accentText);
    headlineParts = (
      <>
        {before}
        <span className="text-cyan whitespace-nowrap">{accentText}</span>
        {after}
      </>
    );
  }

  return (
    <section className="relative min-h-[90dvh] flex flex-col justify-center overflow-hidden pt-32 pb-20 isolate">

      {/* Bergsilhouette: FESTE Höhe verhindert Layout Shift während Animation */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-end items-end pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          transform: 'translateZ(0)',
          height: '12rem', // 192px - sm Höhe fest
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 flex justify-end items-end h-full">
          <div className="relative w-full max-w-6xl pl-4 md:pl-6 h-full shrink-0">
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

      {/* 1. THE MASSIVE SHADOW NUMBER */}
      <BackdropNumber number="01" className="top-[10%] left-[5%] opacity-100" />

      {/* 2. THE CONTENT FRAME */}
      <div className="relative z-[2]">
        {/* Headline Container (Wide) */}
        <div className="container mx-auto px-4 sm:px-5 md:px-6 mb-6 sm:mb-8">
          <div className="lg:col-span-12 hero-line-reveal overflow-hidden">
            <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7rem] 2xl:text-[8rem] font-extrabold uppercase leading-[0.9] tracking-tighter text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] max-w-full text-balance break-words">
              {headlineParts}
            </h1>
          </div>
        </div>

        {/* Subline & Buttons Container (Beam Restricted) */}
        <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-6 lg:px-8 hero-line-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="mt-0 border-l-4 border-cyan pl-4 sm:pl-6">
                <p className="text-base sm:text-lg md:text-xl font-medium text-blue-100 leading-relaxed">
                  {subline}
                </p>
              </div>

              {ctas && ctas.length > 0 && (
                <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap gap-3 sm:gap-4">
                  {ctas.map((cta, i) => (
                    <Button
                      key={cta.label}
                      asChild
                      variant={cta.variant === "default" || i === 0 ? "default" : "outline-light"}
                      size="lg"
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

