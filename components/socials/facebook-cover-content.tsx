// (keine Icons nötig) – Directional Cue entfernt

export function FacebookCoverContent() {
  return (
    <>
      {/* Value Proposition */}
      <div className="w-full">
        {/* Safe-Zone: left/right = 220px, Beams: left/right = 132px */}
        <div className="w-full flex justify-center">
          <h1
            className="font-display text-[140px] font-extrabold uppercase leading-[0.86] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
            style={{ transform: "translateX(-124px)" }}
          >
            <span className="whitespace-nowrap">DEIN DIGITALER</span>
            <br />
            <span className="whitespace-nowrap text-brand-cyan">WERKZEUGKASTEN</span>
          </h1>
        </div>
      </div>
    </>
  );
}
