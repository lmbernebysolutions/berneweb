"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { Button } from "@/components/ui/button";
import {
  IconArrowUpRight,
  IconCircleCheck,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import type { Referenz } from "@/lib/data/referenzen";
import { cn } from "@/lib/utils";

// =============================================================================
// DEVICE MOCKUPS
// =============================================================================
function BrowserMockup({
  theme,
  url = "www.example.de",
  imageSrc,
}: {
  theme: Referenz["mockupTheme"];
  url?: string;
  imageSrc?: string;
}) {
  return (
    <div className="relative overflow-hidden border border-brand-cyan/30 shadow-[0_0_40px_rgba(3,249,249,0.08)]">
      <TechCorners pattern="all" variant="cyan" size="sm" />
      <div className="flex items-center gap-2 px-3 py-2 bg-black/50 border-b border-brand-cyan/20 backdrop-blur-sm">
        <div className="flex gap-1.5 shrink-0">
          <div className="h-2 w-2 rounded-full bg-red-400/70" />
          <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <div className="h-2 w-2 rounded-full bg-green-400/70" />
        </div>
        <div className="flex flex-1 items-center gap-1.5 mx-2 px-2.5 py-1 bg-white/5 border border-white/10 min-w-0">
          <div className="h-1.5 w-1.5 rounded-full bg-brand-cyan/60 shrink-0" />
          <span className="text-[10px] font-mono text-white/30 truncate leading-none">{url}</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <div className="h-1.5 w-1.5 bg-white/20 rounded-full" />
          <div className="h-1.5 w-1.5 bg-white/20 rounded-full" />
        </div>
      </div>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Desktop-Ansicht der Referenz"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center px-4 text-center"
            style={{ background: theme.bg }}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-white/40">
              Desktop-Screenshot hinzufügen
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneMockup({
  theme,
  imageSrc,
}: {
  theme: Referenz["mockupTheme"];
  imageSrc?: string;
}) {
  return (
    <div
      className="relative overflow-hidden border-2 border-brand-cyan/30 bg-black shadow-[0_0_30px_rgba(3,249,249,0.12)]"
      style={{ borderRadius: "16px", width: "100%", maxWidth: "240px" }}
    >
      {/* Status bar: only time, original visual height restored */}
      <div
        className="flex items-center justify-center px-3 py-1.5"
        style={{ background: `${theme.primary}ee` }}
      >
        <span className="text-[7px] font-mono opacity-60" style={{ color: theme.text }}>09:41</span>
      </div>
      <div className="relative aspect-[9/19] w-full overflow-hidden" style={{ background: theme.bg }}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Mobile-Ansicht der Referenz"
            fill
            className="object-cover object-top"
            sizes="240px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-2 text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 leading-tight">
              Mobile-Screenshot hinzufügen
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-center py-2" style={{ background: theme.bg }}>
        <div className="h-0.5 w-10 rounded-full opacity-30" style={{ background: theme.text }} />
      </div>
    </div>
  );
}

function ErgebnisBadge({ result }: { result: { wert: string; metrik: string; positiv: boolean } }) {
  return (
    <div className="flex flex-col items-center justify-center border border-brand-cyan/20 bg-brand-cyan/5 p-3 text-center">
      <span className="font-display text-xl font-extrabold text-brand-cyan leading-none">
        {result.wert}
      </span>
      <span className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50 leading-tight">
        {result.metrik}
      </span>
    </div>
  );
}

export function ReferenzCard({
  referenz,
  featured = false,
  compact = false,
}: {
  referenz: Referenz;
  featured?: boolean;
  /** Für Home-Swipe: Beschreibung und 4 Ergebnis-Boxen ausblenden */
  compact?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden border border-brand-cyan/20 bg-brand-navy/40 backdrop-blur-md transition-all hover:border-brand-cyan/40 hover:shadow-[0_0_60px_rgba(3,249,249,0.1)] min-w-0 max-w-full w-full ${
        featured ? "col-span-full" : ""
      }`}
      data-animate="fade-up"
    >
      {/* Tech Corners wie CraftToolboxGrid/Design-System – diagonal, sichtbar über dem Inhalt */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
      </div>
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 border-b border-x border-brand-cyan/40 bg-brand-cyan/10 px-6 py-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
            Featured Case
          </span>
        </div>
      )}
      <div className={featured ? "lg:grid lg:grid-cols-12 lg:gap-0" : ""}>
        <div
          className={`relative ${featured ? "lg:col-span-7" : ""} bg-black/40 p-6 md:p-8`}
        >
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(3,249,249,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(3,249,249,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative flex items-end justify-center gap-0 md:gap-4">
            <div className="w-full max-w-sm md:max-w-none">
              <BrowserMockup
                theme={referenz.mockupTheme}
                url={
                  referenz.url === "#"
                    ? `www.${referenz.kunde.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}.de`
                    : referenz.url
                }
                imageSrc={referenz.desktopImage}
              />
            </div>
            <div
              className={`relative z-10 shrink-0 self-end -ml-6 md:-ml-8 ${
                featured ? "hidden sm:block" : "hidden md:block"
              }`}
              style={{ transform: "translateY(1rem)" }}
            >
              <PhoneMockup theme={referenz.mockupTheme} imageSrc={referenz.phoneImage} />
            </div>
          </div>
          <div className="relative z-10 mt-6 flex flex-wrap gap-2">
            {referenz.tags.map((tag) => (
              <span
                key={tag}
                className="border border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-cyan/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div
          className={`${
            featured ? "lg:col-span-5 lg:border-l lg:border-brand-cyan/20" : ""
          } flex flex-col p-6 md:p-8`}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-brand-cyan/60">
                {referenz.branche} · {referenz.jahr}
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white md:text-2xl">
                {referenz.kunde}
              </h2>
              <p className="mt-1 text-sm text-white/50">{referenz.typ}</p>
            </div>
            <div className="shrink-0 border border-brand-warm/30 bg-brand-warm/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-warm">
              {referenz.dauer}
            </div>
          </div>
          <blockquote className={cn("border-l-2 border-brand-cyan pl-4", compact ? "mb-4" : "mb-6")}>
            <p className="text-base font-medium italic text-white/80 leading-relaxed">
              &ldquo;{referenz.tagline}&rdquo;
            </p>
          </blockquote>
          {!compact && (
            <p className="mb-4 text-sm text-white/60 leading-relaxed">
              {referenz.beschreibung}
            </p>
          )}
          {featured && !compact && (
            <div className="mb-6 space-y-3">
              <div className="border border-white/5 bg-white/[0.03] p-3">
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-red-400/70">
                  Challenge
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{referenz.challenge}</p>
              </div>
              <div className="border border-brand-cyan/10 bg-brand-cyan/[0.03] p-3">
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-brand-cyan/70">
                  Lösung
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{referenz.loesung}</p>
              </div>
            </div>
          )}
          {!compact && (
            <div className="mb-6 grid grid-cols-2 gap-2">
              {referenz.ergebnisse.map((r) => (
                <ErgebnisBadge key={r.metrik} result={r} />
              ))}
            </div>
          )}
          <div className={compact ? "mt-4 flex flex-wrap gap-3" : "mt-auto flex flex-wrap gap-3"}>
            {referenz.url && referenz.url !== "#" ? (
              <Button asChild size="sm">
                <Link href={referenz.url} target="_blank" rel="noopener noreferrer">
                  <IconArrowUpRight className="mr-1.5 size-4" />
                  Live ansehen
                </Link>
              </Button>
            ) : (
              <Button size="sm" variant="secondary" disabled>
                <IconCircleCheck className="mr-1.5 size-4" />
                Projekt abgeschlossen
              </Button>
            )}
            <Button asChild variant="outline" size="sm">
              <Link href="/kontakt">Ähnliches Projekt anfragen</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

// =============================================================================
// GRID – 2 Karten nebeneinander (für Home)
// =============================================================================
export function ReferenzenGrid({
  referenzen,
  limit = 2,
}: {
  referenzen: Referenz[];
  limit?: number;
}) {
  const items = referenzen.slice(0, limit);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((ref) => (
        <ReferenzCard key={ref.id} referenz={ref} featured={false} />
      ))}
    </div>
  );
}

// =============================================================================
// CAROUSEL (exported)
// =============================================================================
export function ReferenzenCarousel({ referenzen }: { referenzen: Referenz[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return undefined;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 md:gap-8">
          {referenzen.map((ref) => (
            <div
              key={ref.id}
              className="min-w-0 flex-[0_0_100%] md:flex-[0_0_100%] lg:flex-[0_0_100%]"
            >
              <ReferenzCard referenz={ref} featured={false} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={scrollPrev}
          className="flex h-12 w-12 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan transition-all hover:border-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[0_0_20px_rgba(3,249,249,0.15)]"
          aria-label="Vorherige Referenz"
        >
          <IconChevronLeft className="size-6" stroke={2} />
        </button>
        <div className="flex items-center gap-1.5">
          {referenzen.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 shrink-0 rounded-full transition-all ${
                i === selectedIndex
                  ? "w-6 bg-brand-cyan shadow-[0_0_8px_rgba(3,249,249,0.5)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Zu Referenz ${i + 1}`}
              aria-current={i === selectedIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={scrollNext}
          className="flex h-12 w-12 items-center justify-center border border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan transition-all hover:border-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[0_0_20px_rgba(3,249,249,0.15)]"
          aria-label="Nächste Referenz"
        >
          <IconChevronRight className="size-6" stroke={2} />
        </button>
      </div>
    </div>
  );
}
