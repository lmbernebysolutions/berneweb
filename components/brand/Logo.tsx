import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src="/Schweinchen.svg"
        alt="Berneby Solutions Logo"
        width={40}
        height={32}
        className={variant === "light" ? "brightness-0 invert" : ""}
        priority
      />
      <span className="flex items-baseline gap-1">
        <span
          className={`text-lg font-bold ${
            variant === "light" ? "text-white" : "text-foreground"
          }`}
        >
          Berneby
        </span>
        <span
          className={`text-lg font-normal ${
            variant === "light" ? "text-white/80" : "text-foreground/70"
          }`}
        >
          Solutions
        </span>
      </span>
    </Link>
  );
}
