import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@tabler/icons-react";
import { BackdropNumber } from "@/components/ui/backdrop-number";

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
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

          {/* Left Block: Massive Type */}
          <div className="lg:col-span-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white drop-shadow-xl">
              {headlineParts}
            </h1>

            <div className="mt-8 max-w-2xl border-l-4 border-cyan pl-6">
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

          {/* Right Block: Technical Decoration */}
          <div className="lg:col-span-4 hidden lg:flex flex-col justify-end items-end opacity-50">
            <div className="text-right font-mono text-xs text-cyan space-y-1">
              <p>SYS.STATUS: ONLINE</p>
              <p>LOC: ERZGEBIRGE</p>
              <p>V.2024.0.1</p>
            </div>
            <div className="mt-4 w-24 h-24 border border-cyan/30 relative animate-spin-slow">
              <div className="absolute top-0 left-0 w-2 h-2 bg-cyan"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan"></div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM DECORATION */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan/20"></div>
      <div className="absolute bottom-0 left-10 w-px h-20 bg-cyan/20"></div>
      <div className="absolute bottom-0 right-10 w-px h-20 bg-cyan/20"></div>

    </section>
  );
}

