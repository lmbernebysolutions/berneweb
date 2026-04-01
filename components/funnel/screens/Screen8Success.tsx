"use client";

import React from "react";
import { useFunnel } from "../FunnelContext";
import { Button } from "@/components/ui/button";
import { CONTAINER_A_NO_GLOW } from "@/lib/container-styles";
import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/daniel-berneby/15min"; // TODO: Echten Link eintragen

export function Screen8Success() {
  const { closeFunnel } = useFunnel();

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Success Header */}
      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        {/* Icon */}
        <div className="w-14 h-14 border-2 border-brand-cyan flex items-center justify-center">
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
            <path
              d="M2 10L8.5 17L22 2"
              stroke="#03f9f9"
              strokeWidth="2.5"
              strokeLinecap="square"
            />
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-white mt-4">
          Dein Report
          <br />
          <span className="text-brand-cyan">ist unterwegs.</span>
        </h2>

        <p className="text-base text-white/70 max-w-sm leading-relaxed mt-2">
          Daniel schaut sich deine Antworten persönlich an und meldet sich in Kürze
          bei dir.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs font-mono text-white/40 uppercase tracking-widest shrink-0">
          Oder direkt zum Termin
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Calendly Upsell */}
      <div className={cn("flex flex-col gap-5 p-6 relative group", CONTAINER_A_NO_GLOW)}>
        <div>
          <p className="text-base font-display font-black uppercase tracking-wide text-white">
            Keine Lust zu warten?
          </p>
          <p className="text-sm text-white/60 mt-2 leading-relaxed">
            Buche dir jetzt direkt einen kostenlosen 15-Minuten-Slot mit Daniel — und besprich
            den Plan für deinen Betrieb live.
          </p>
        </div>

        <Button
          onClick={() => window.open(CALENDLY_URL, "_blank", "noopener")}
          size="lg"
          className="w-full"
        >
          15-MIN TERMIN BUCHEN
        </Button>

        <p className="text-xs font-mono text-white/40 text-center uppercase tracking-widest">
          Kostenlos · Kein Verkaufsgespräch · Direkte Ergebnisse
        </p>
      </div>

      {/* Close */}
      <Button
        onClick={closeFunnel}
        variant="outline"
        size="lg"
        className="w-full mt-2"
      >
        Schließen
      </Button>
    </div>
  );
}
