import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TextLogoProps {
  variant?: "light" | "dark";
  /** Optional – aktuell gleiche Größe für alle Einsätze */
  size?: "default" | "lg";
  className?: string;
}

const SIZE = {
  // Einheitliche Logo-Größe für Header, Hero, Footer
  default: {
    logoClass: "h-11 sm:h-12 md:h-[3.25rem] lg:h-[3.25rem]",
  },
  lg: {
    logoClass: "h-11 sm:h-12 md:h-[3.25rem] lg:h-[3.25rem]",
  },
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
  const src = variant === "light" ? "/berneby-logo-light.svg" : "/berneby-logo-dark.svg";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-90",
        variant === "light" && "hover:text-brand-cyan/90",
        variant === "dark" && "hover:text-brand-cyan",
        className
      )}
    >
      <div
        className={cn(
          "relative shrink-0 aspect-[240/48]",
          s.logoClass
        )}
      >
        <Image
          src={src}
          alt="Berneby Solutions"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 200px, 250px"
          priority={false}
        />
      </div>
    </Link>
  );
}
