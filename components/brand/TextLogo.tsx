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
  /* Fixed pixel sizes for mobile to ensure it's not too large */
  default: { iconW: 12, iconH: 26, text: "text-lg", gap: "gap-1" },
  /* Using rem for lg so it scales proportionally with the root font-size ab 1290px */
  lg: { iconW: "1.125rem", iconH: "3.75rem", text: "text-base sm:text-lg md:text-xl lg:text-2xl", gap: "gap-1.5 sm:gap-2.5" },
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
      <div className="relative shrink-0 -mt-0.5" style={{ width: s.iconW, height: s.iconH }}>
        <Image
          src="/B.svg"
          alt=""
          fill
          className="object-contain"
          aria-hidden
        />
      </div>
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
