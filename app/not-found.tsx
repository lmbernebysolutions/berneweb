import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BLogo } from "@/components/brand/BLogo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <BLogo size={64} className="mb-6 opacity-20" />
      <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Diese Seite existiert leider nicht.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Zurück zur Startseite</Link>
      </Button>
    </div>
  );
}
