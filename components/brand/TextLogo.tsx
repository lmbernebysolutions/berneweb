import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TextLogoProps {
  variant?: "light" | "dark";
  /** Größere Darstellung für Header/Footer */
  size?: "default" | "lg";
  className?: string;
}

const SIZE = {
  default: { iconW: 16, iconH: 34, text: "text-lg", gap: "gap-1" },
  lg: { iconW: 22, iconH: 44, text: "text-base sm:text-lg md:text-xl lg:text-2xl", gap: "gap-1.5 sm:gap-2" },
} as const;

/**
 * TextLogo – Pure Berneby Text Brand (B + „erneby Solutions“)
 * Theme: klare Typo, optional Hover-Akzent in Brand-Cyan.
 */
export function TextLogo({
  variant = "dark",
  size = "lg",
  className,
}: TextLogoProps) {
  const s = SIZE[size];
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center transition-colors hover:opacity-90",
        variant === "light" && "hover:text-brand-cyan/90",
        variant === "dark" && "hover:text-brand-cyan",
        s.gap,
        className
      )}
    >
      <Image
        src="/B.svg"
        alt=""
        width={s.iconW}
        height={s.iconH}
        className="relative shrink-0"
        aria-hidden
      />
      <span
        className={cn(
          "font-bold tracking-tight",
          s.text,
          variant === "light" ? "text-white" : "text-foreground"
        )}
      >
        erneby
      </span>
      <span
        className={cn(
          "font-normal tracking-tight",
          s.text,
          variant === "light" ? "text-white/80" : "text-foreground/70"
        )}
      >
        Solutions
      </span>
    </Link>
  );
}
