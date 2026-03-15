"use client";

import { useState, useEffect } from "react";
import { useMapConsent } from "@/hooks/use-map-consent";
import { SectionCard } from "@/components/ui/section-card";
import { TechCorners } from "@/components/ui/tech-corners";
import { Button } from "@/components/ui/button";

const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=12.678%2C50.575%2C12.708%2C50.595&layer=mapnik&marker=50.585,12.693";

export interface ConsentMapCardProps {
  locationLabel: string;
  googleMapsHref: string;
  className?: string;
}

export function ConsentMapCard({
  locationLabel,
  googleMapsHref,
  className,
}: ConsentMapCardProps) {
  const [mounted, setMounted] = useState(false);
  const { hasConsent, openPreferences } = useMapConsent();

  useEffect(() => setMounted(true), []);

  return (
    <SectionCard
      variant="default"
      data-animate="fade-up"
      data-animate-delay="100"
      className={className}
    >
      <TechCorners pattern="diagonal" variant="cyan" size="sm" />
      <div className="relative z-10">
        <div className="border-b border-white/10 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan/60">
            Standort
          </p>
          <p className="font-semibold">{locationLabel}</p>
        </div>
        <div className="relative h-[180px] w-full overflow-hidden">
          {mounted && hasConsent ? (
            <iframe
              title="Karte Aue-Bad Schlema"
              src={MAP_EMBED_SRC}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/5 p-4 text-center">
              <p className="text-sm text-white/80">
                Um die Karte anzuzeigen, bestätigen Sie bitte die Cookie-Einstellungen.
              </p>
              <Button type="button" variant="outline-light" size="sm" onClick={openPreferences}>
                Cookie-Einstellungen
              </Button>
            </div>
          )}
        </div>
        <div className="p-3">
          <a
            href={googleMapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-brand-cyan underline underline-offset-2 hover:text-brand-cyan/80"
          >
            In Google Maps öffnen
          </a>
        </div>
      </div>
    </SectionCard>
  );
}
