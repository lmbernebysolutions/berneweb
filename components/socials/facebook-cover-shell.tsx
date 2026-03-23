import Image from "next/image";

// Nur für Facebook-Cover: Berg1 wieder rein, Berg3 bleibt entfernt
const BERG_LAYERS = ["/icons/Berg1.svg", "/icons/Berg2.svg", "/icons/Berg4.svg"] as const;

interface FacebookCoverShellProps {
  children: React.ReactNode;
}

/**
 * Facebook Cover Master Canvas
 * - Fixed 1640x624 output
 * - Critical content stays in central safe zone
 * - Decorative layers (grid/noise/beams/mountains) around it
 */
export function FacebookCoverShell({ children }: FacebookCoverShellProps) {
  return (
    <div
      data-export-target="facebook-cover"
      className="relative h-[624px] w-[1640px] shrink-0 overflow-hidden border border-white/10 bg-brand-navy shadow-2xl"
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Vertical beams (decorative) */}
      <div className="pointer-events-none absolute bottom-0 left-[132px] top-0 z-[2] w-px bg-brand-cyan/20" />
      <div className="pointer-events-none absolute bottom-0 right-[132px] top-0 z-[2] w-px bg-brand-cyan/20" />

      {/* Mountains (decorative only) */}
      <div className="pointer-events-none absolute bottom-0 left-[132px] right-[132px] z-[2] h-[260px] overflow-hidden">
        <div className="relative h-full w-full">
          {BERG_LAYERS.map((src) => (
            <Image key={src} src={src} alt="" fill className="object-cover object-bottom opacity-80" unoptimized />
          ))}
        </div>
      </div>

      {/* Safe-zone content */}
      <div className="absolute left-[220px] right-[220px] top-[92px] bottom-[90px] z-[30] flex flex-col">
        {children}
      </div>
    </div>
  );
}
