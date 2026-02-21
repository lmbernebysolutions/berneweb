"use client";

import { Button } from "@/components/ui/button";
import { BLogo } from "@/components/brand/BLogo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 sm:pt-28 text-center">
      <div className="relative mb-8 inline-flex animate-[shake_0.5s_ease-in-out_infinite]">
        <BLogo size={80} className="drop-shadow-[0_0_14px_rgba(3,249,249,0.4)] opacity-90" />
        <span className="absolute -top-6 -left-6 text-5xl opacity-40 animate-bounce">!</span>
        <span className="absolute -top-4 -right-6 text-4xl opacity-30 animate-bounce [animation-delay:150ms]">!</span>
      </div>

      <div className="font-mono text-sm text-red-400/60 uppercase tracking-widest mb-3">
        ERR.500 – SYSTEM_ERROR
      </div>

      <h1 className="text-6xl font-extrabold tracking-tight">500</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        Etwas ist schiefgelaufen. Unser Team wurde benachrichtigt.
      </p>
      <p className="mt-2 text-sm text-muted-foreground/60">
        Unser Team wurde benachrichtigt. Bitte versuchen Sie es in einer Minute erneut.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={() => reset()}>
          Erneut versuchen
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="/">Zur Startseite</a>
        </Button>
      </div>
    </div>
  );
}
