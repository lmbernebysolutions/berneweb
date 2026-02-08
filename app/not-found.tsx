import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Lost Schweinchen with animation */}
      <div className="relative mb-8">
        {/* Wiggling animation */}
        <div className="inline-flex animate-[wiggle_1s_ease-in-out_infinite]">
          <Image
            src="/Schweinchen.svg"
            alt=""
            width={120}
            height={96}
            className="brightness-110 filter drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]"
            aria-hidden
          />
        </div>

        {/* Question marks floating around */}
        <span className="absolute -top-8 -left-6 text-5xl opacity-30 animate-bounce">
          ?
        </span>
        <span className="absolute -top-4 -right-8 text-4xl opacity-20 animate-bounce [animation-delay:200ms]">
          ?
        </span>
      </div>

      {/* Tech Error Code */}
      <div className="font-mono text-sm text-brand-cyan/60 uppercase tracking-widest mb-3">
        ERR.404 – PAGE_NOT_FOUND
      </div>

      <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        Das Schweinchen kann diese Seite nicht finden. Vielleicht war es abgelenkt...
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Zurück zur Startseite</Link>
      </Button>
    </div>
  );
}
