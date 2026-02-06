import { BLogo } from "@/components/brand/BLogo";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <BLogo size={48} className="animate-pulse" />
    </div>
  );
}
