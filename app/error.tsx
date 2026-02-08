"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Distressed Schweinchen with animation */}
      <div className="relative mb-8">
        {/* Shaking animation */}
        <div className="inline-flex animate-[shake_0.5s_ease-in-out_infinite]">
          <Image
            src="/Schweinchen.svg"
            alt=""
            width={140}
            height={112}
            className="brightness-110 filter drop-shadow-[0_0_14px_rgba(3,249,249,0.5)] opacity-80"
            aria-hidden
          />
        </div>

        {/* Exclamation marks bouncing */}
        <span className="absolute -top-8 -left-8 text-6xl opacity-40 animate-bounce">
          !
        </span>
        <span className="absolute -top-6 -right-10 text-5xl opacity-30 animate-bounce [animation-delay:150ms]">
          !
        </span>
      </div>

      {/* Tech Error Code */}
      <div className="font-mono text-sm text-red-400/60 uppercase tracking-widest mb-3">
        ERR.500 – SYSTEM_ERROR
      </div>

      <h1 className="text-6xl font-extrabold tracking-tight">500</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        Etwas ist schiefgelaufen. Das Schweinchen scheint in Panik zu sein!
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
