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
import { NAV_ITEMS } from "@/lib/constants";
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
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 shadow-[0_1px_0_0_rgba(3,249,249,0.15)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-[4.5rem] md:px-6">
        <TextLogo variant="dark" />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3.5 py-2 text-sm font-medium transition-colors",
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
          <Button asChild size="sm" className="group ml-3 cursor-pointer">
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
              className="md:hidden"
              aria-label="Navigation öffnen"
            >
              <IconMenu2 className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 border-l border-brand-cyan/20 bg-brand-navy">
            <SheetTitle className="sr-only">Navigation</SheetTitle>

            {/* Tech decoration */}
            <div className="absolute top-4 right-4 font-mono text-[0.6rem] text-brand-cyan/30 uppercase tracking-widest">
              NAV.SYS
            </div>

            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile Navigation">
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
              <div className="mt-4 border-t border-white/10 pt-4">
                <Button asChild className="w-full" size="lg">
                  <Link href="/kontakt" onClick={() => setOpen(false)}>
                    Erstgespräch vereinbaren
                    <IconArrowRight className="ml-1 size-4" stroke={2} />
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
