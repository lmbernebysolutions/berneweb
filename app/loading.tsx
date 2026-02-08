import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center flex-col gap-4">
      {/* Animated Schweinchen with glow */}
      <div className="relative">
        <div className="absolute inset-0 animate-pulse opacity-60">
          <div className="inline-flex">
            <Image
              src="/Schweinchen.svg"
              alt=""
              width={80}
              height={64}
              className="brightness-110 filter drop-shadow-[0_0_12px_rgba(3,249,249,0.6)]"
              aria-hidden
            />
          </div>
        </div>
        <div className="relative inline-flex">
          <Image
            src="/Schweinchen.svg"
            alt=""
            width={80}
            height={64}
            className="brightness-110 filter drop-shadow-[0_0_8px_rgba(3,249,249,0.4)]"
            aria-hidden
          />
        </div>
      </div>

      {/* Tech Loading Label */}
      <p className="font-mono text-xs text-brand-cyan/60 uppercase tracking-widest animate-pulse">
        SYS.LOADING
      </p>
    </div>
  );
}
