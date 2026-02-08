import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@tabler/icons-react";
import { BackdropNumber } from "@/components/ui/backdrop-number";
import { HeroMascot } from "@/components/sections/HeroMascot";

interface HeroCta {
  label: string;
  href: string;
  variant: "default" | "outline";
}

interface HeroProps {
  headline: string;
  subline: string;
  ctas?: HeroCta[];
  variant?: "navy" | "cyan"; // 'light' is deprecated/removed
  compact?: boolean;
  accentText?: string;
}

export function Hero({
  headline,
  subline,
  ctas,
  variant = "navy",
  compact = false,
  accentText,
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
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-32 pb-20">


      {/* 1. THE MASSIVE SHADOW NUMBER */}
      <BackdropNumber number="01" className="top-[10%] left-[-5%] opacity-100" />

      {/* 2. THE CONTENT FRAME */}
      <div className="relative z-10">
        {/* Headline Container (Wide) */}
        <div className="container mx-auto px-6 mb-8">
          <div className="lg:col-span-12 hero-line-reveal">
            <h1 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-extrabold uppercase leading-[0.9] tracking-tighter text-white drop-shadow-xl max-w-[95%] text-balance">
              {headlineParts}
            </h1>
          </div>
        </div>

        {/* Subline & Buttons Container (Beam Restricted) */}
        <div className="mx-auto max-w-6xl px-4 md:px-6 hero-line-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="mt-0 border-l-4 border-cyan pl-6">
                <p className="text-lg md:text-xl font-medium text-blue-100 leading-relaxed">
                  {subline}
                </p>
              </div>

              {ctas && ctas.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-4">
                  {ctas.map((cta, i) => (
                    <Button
                      key={cta.label}
                      asChild
                      variant={cta.variant === "default" || i === 0 ? "default" : "outline"}
                      size="lg"
                      className={cn(
                        "h-14 px-8 text-lg font-bold uppercase tracking-widest clip-corner hover-power",
                        cta.variant === "outline" && "border-2 border-white text-white hover:border-cyan hover:text-brand-navy"
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

            {/* Right Block: Schweinchen + Hover-Tooltip */}
            <div className="lg:col-span-4 hidden lg:flex flex-col justify-end items-end">
              <HeroMascot />
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

