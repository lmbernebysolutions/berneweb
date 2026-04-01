"use client";

import { useEffect } from "react";
import { useFunnel } from "@/components/funnel/FunnelContext";
import { useRouter } from "next/navigation";

export function CheckPageClient() {
  const { state, openFunnel } = useFunnel();
  const router = useRouter();

  useEffect(() => {
    if (!state.isOpen) {
      openFunnel();
    }
  }, [state.isOpen, openFunnel]);

  // Wenn der Funnel vom User aktiv geschlossen wird (z. B. über ESC oder X), 
  // leiten wir den Nutzer nach einer kurzen Verzögerung zurück auf die Startseite.
  useEffect(() => {
    // Hier können wir optional eine Logik einbauen.
    // Da state.isOpen initial false ist, schließt er sich sonst sofort.
    // Daher machen wir das Routing lieber so, dass er im Hintergrund "läuft".
  }, [state.isOpen]);

  // Hintergrund-Design, solange das Modal offen ist 
  // (oder falls es geschlossen wird und man wartet)
  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-white/50 animate-pulse font-mono tracking-widest uppercase text-xs">
          Lade Digital-Check...
        </p>
      </div>
    </div>
  );
}
