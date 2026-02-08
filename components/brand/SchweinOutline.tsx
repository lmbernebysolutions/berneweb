import Image from "next/image";

interface SchweinOutlineProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * SchweinOutline – Outline/Stroke variant of the mascot
 * Used in dividers, hover states, and subtle placements where
 * the full-filled version would be too heavy.
 *
 * CSS approach: SVG with stroke styling via filter
 */
export function SchweinOutline({ size = "md", className }: SchweinOutlineProps) {
  const sizeMap = {
    sm: { width: 32, height: 26 },
    md: { width: 44, height: 36 },
    lg: { width: 60, height: 48 },
  };

  const { width, height } = sizeMap[size];

  return (
    <Image
      src="/Schweinchen.svg"
      alt=""
      width={width}
      height={height}
      className={`
        brightness-130
        contrast-125
        filter drop-shadow-[0_0_6px_rgba(3,249,249,0.5)]
        ${className ?? ""}
      `}
      aria-hidden
      style={{
        filter: `
          brightness(1.3)
          contrast(1.25)
          drop-shadow(0 0 6px rgba(3, 249, 249, 0.5))
        `,
      }}
    />
  );
}
