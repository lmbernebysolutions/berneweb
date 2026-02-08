"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedMascotProps {
  size?: "sm" | "md" | "lg" | "xl";
  animation?: "pulse" | "float" | "spin" | "bounce";
  className?: string;
}

/**
 * AnimatedMascot – Dynamic Schweinchen with various animations
 * Used for scroll-triggered and interactive moments
 */
export function AnimatedMascot({
  size = "md",
  animation = "pulse",
  className,
}: AnimatedMascotProps) {
  const sizeMap = {
    sm: { width: 32, height: 26 },
    md: { width: 48, height: 38 },
    lg: { width: 64, height: 51 },
    xl: { width: 96, height: 77 },
  };

  const { width, height } = sizeMap[size];

  const animationMap = {
    pulse: "animate-pulse opacity-80",
    float: "animate-[float_3s_ease-in-out_infinite]",
    spin: "animate-spin",
    bounce: "animate-bounce",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        animationMap[animation],
        className
      )}
    >
      <Image
        src="/Schweinchen.svg"
        alt=""
        width={width}
        height={height}
        className="brightness-110 filter drop-shadow-[0_0_8px_rgba(3,249,249,0.4)]"
        aria-hidden
      />
    </div>
  );
}
