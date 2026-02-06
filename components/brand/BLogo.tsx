import Image from "next/image";

interface BLogoProps {
  size?: number;
  className?: string;
}

export function BLogo({ size = 24, className }: BLogoProps) {
  return (
    <Image
      src="/B.svg"
      alt=""
      width={Math.round(size * (15 / 48))}
      height={size}
      className={className}
      aria-hidden
    />
  );
}
