"use client";

import { useFunnel } from "@/components/funnel/FunnelContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FunnelTriggerButtonProps {
  label?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "outline-light" | "secondary" | "ghost" | "link";
}

/**
 * Client-Wrapper: Öffnet den Digital-Check Funnel als Fullscreen-Modal.
 * Kann in beliebigen Server- und Client-Komponenten als Drop-In verwendet werden.
 */
export function FunnelTriggerButton({
  label = "POTENZIAL PRÜFEN",
  className,
  size = "lg",
  variant = "default",
}: FunnelTriggerButtonProps) {
  const { openFunnel } = useFunnel();

  return (
    <Button
      onClick={openFunnel}
      size={size}
      variant={variant}
      className={cn("animate-cta-pulse font-black tracking-widest", className)}
    >
      {label}
    </Button>
  );
}
