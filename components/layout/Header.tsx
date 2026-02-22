"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconArrowRight } from "@tabler/icons-react";
import { TextLogo } from "@/components/brand/TextLogo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, BEAM_CONTAINER_CLASS } from "@/lib/constants";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Header() {
  const scrolled = useScroll(20);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 shadow-[0_1px_0_0_rgba(3,249,249,0.15)] backdrop-blur-xl"
          : "bg-background"
      )}
    >
      {/* Standard-Modus: fester Navy-Block deckt Grid+Grain ab */}
      {!scrolled && (
        <div
          className="absolute inset-0 -z-10 bg-[var(--background)]"
          aria-hidden
        />
      )}
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />

      {/* Gleiche Breite wie GridBeams – auf Mobile deutlich größer (Bar + Logo) */}
      <div className={cn(BEAM_CONTAINER_CLASS, "flex h-16 sm:h-[4.5rem] md:h-20 lg:h-20 min-[1920px]:h-32 items-center justify-between")}>
        <div className="shrink-0 origin-left scale-110 sm:scale-100">
          <TextLogo variant="dark" size="lg" />
        </div>

        {/* Desktop Navigation (zwischen Logo und Button) */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3.5 py-2 text-sm min-[1920px]:text-lg min-[1920px]:px-5 font-medium transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {/* Active indicator - industrial bar */}
              {pathname === item.href && (
                <span className="absolute -bottom-0.5 left-1/2 h-[2px] w-4 -translate-x-1/2 bg-brand-cyan" />
              )}
            </Link>
          ))}
          <Button asChild size="sm" className="group ml-3 shrink-0 cursor-pointer min-[1920px]:text-lg min-[1920px]:px-10 min-[1920px]:py-7 min-[1920px]:ml-8">
            <Link href="/kontakt">
              Erstgespräch
              <IconArrowRight
                className="ml-1 size-3.5 transition-transform group-hover:translate-x-0.5"
                stroke={2}
              />
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Navigation öffnen"
            >
              <IconMenu2 className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 border-l border-brand-cyan/20 bg-brand-navy pt-16">
            <SheetTitle className="sr-only">Navigation</SheetTitle>

            {/* Tech decoration */}
            <div className="absolute top-4 left-4 font-mono text-[0.6rem] text-brand-cyan/30 uppercase tracking-widest">
              NAV.SYS
            </div>

            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group relative flex items-center gap-4 border-l-2 px-4 py-3.5 text-base font-medium transition-all",
                    pathname === item.href
                      ? "border-brand-cyan bg-brand-cyan/5 text-foreground"
                      : "border-transparent text-muted-foreground hover:border-brand-cyan/50 hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-xs text-brand-cyan/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                  {pathname === item.href && (
                    <span className="ml-auto h-1.5 w-1.5 bg-brand-cyan" />
                  )}
                </Link>
              ))}
              <div className="mt-4 border-t border-white/10 pt-4 px-4">
                <Button asChild className="w-full" size="lg">
                  <Link href="/kontakt" onClick={() => setOpen(false)}>
                    <span className="hidden xs:inline">Erstgespräch vereinbaren</span>
                    <span className="xs:hidden">Erstgespräch</span>
                    <IconArrowRight className="ml-2 size-4" stroke={2} />
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
