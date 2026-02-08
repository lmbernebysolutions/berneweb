import Image from "next/image";

/**
 * HoverSchweinchen – Easter egg element for buttons
 * Reveals a cute Schweinchen on hover - adds delight factor
 *
 * Usage:
 * <div className="group relative">
 *   <Button>Click me</Button>
 *   <HoverSchweinchen />
 * </div>
 */
export function HoverSchweinchen() {
  return (
    <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none">
      <div className="relative">
        {/* Glow aura */}
        <div className="absolute inset-0 blur-lg opacity-50 rounded-full bg-gradient-to-r from-brand-cyan/40 to-brand-cyan/20"></div>

        {/* Schweinchen container */}
        <div className="relative bg-white/95 border border-brand-cyan/40 p-1.5 inline-flex rounded-sm shadow-lg">
          <Image
            src="/Schweinchen.svg"
            alt=""
            width={28}
            height={22}
            className="brightness-110 filter drop-shadow-[0_0_4px_rgba(3,249,249,0.3)]"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
