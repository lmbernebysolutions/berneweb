import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BLogo } from "@/components/brand/BLogo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 sm:pt-28 text-center">
      <div className="relative mb-8 inline-flex animate-[wiggle_1s_ease-in-out_infinite]">
        <BLogo size={72} className="drop-shadow-[0_0_12px_rgba(3,249,249,0.4)] opacity-90" />
        <span className="absolute -top-6 -left-4 text-4xl opacity-30 animate-bounce">?</span>
        <span className="absolute -top-4 -right-6 text-3xl opacity-20 animate-bounce [animation-delay:200ms]">?</span>
      </div>

      <div className="font-mono text-sm text-brand-cyan/60 uppercase tracking-widest mb-3">
        ERR.404 – PAGE_NOT_FOUND
      </div>

      <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        Diese Seite existiert nicht. Zurück zur Startseite?
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Zurück zur Startseite</Link>
      </Button>
    </div>
  );
}
