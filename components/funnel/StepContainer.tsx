"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StepContainerProps {
  step: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper for each funnel screen. Triggers a fade-up entry animation
 * whenever `step` changes — same CSS class used globally on the website.
 */
export function StepContainer({ step, children, className }: StepContainerProps) {
  const [visible, setVisible] = useState(false);
  const prevStep = useRef(step);

  useEffect(() => {
    // Trigger re-animation on step change
    if (prevStep.current !== step) {
      prevStep.current = step;
      let raf2: number | undefined;
      const raf1 = requestAnimationFrame(() => {
        setVisible(false);
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        if (raf2 !== undefined) {
          cancelAnimationFrame(raf2);
        }
      };
    }

    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [step]);

  return (
    <div
      className={cn(
        "flex-1 flex flex-col w-full transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}
