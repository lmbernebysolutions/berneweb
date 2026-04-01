"use client";

import { useEffect, useRef } from "react";
import { useFunnel } from "@/components/funnel/FunnelContext";
import { useRouter } from "next/navigation";

export function CheckPageClient() {
  const { state, openFunnel } = useFunnel();
  const router = useRouter();

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!state.isOpen) {
      if (!hasMounted.current) {
        hasMounted.current = true;
        openFunnel();
      } else {
        // Der User hat den Funnel über X oder ESC geschlossen
        router.push("/");
      }
    }
  }, [state.isOpen, openFunnel, router]);

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
