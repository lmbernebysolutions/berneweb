import { BLogo } from "@/components/brand/BLogo";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center flex-col gap-4">
      <div className="relative inline-flex animate-pulse">
        <BLogo size={56} className="drop-shadow-[0_0_12px_rgba(3,249,249,0.4)] opacity-90" />
      </div>
      <p className="font-mono text-xs text-brand-cyan/60 uppercase tracking-widest animate-pulse">
        SYS.LOADING
      </p>
    </div>
  );
}
