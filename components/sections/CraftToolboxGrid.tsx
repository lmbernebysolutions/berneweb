"use client";

import Link from "next/link";
import {
  IconMapPin,
  IconPhoneCall,
  IconStar,
  IconChartBar,
} from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { CONTAINER_B } from "@/lib/container-styles";
import { cn } from "@/lib/utils";

const CRAFT_ICON_MAP = {
  IconMapPin,
  IconPhoneCall,
  IconStar,
  IconChartBar,
} as const;

interface CraftModule {
  name: string;
  price: string;
  description: string;
  icon: keyof typeof CRAFT_ICON_MAP;
}

interface CraftToolboxGridProps {
  modules: readonly CraftModule[];
}

export function CraftToolboxGrid({ modules }: CraftToolboxGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {modules.map((module, i) => {
        const Icon = CRAFT_ICON_MAP[module.icon];

        return (
          <div
            key={module.name}
            data-animate="fade-up"
            data-animate-delay={String(i * 80)}
            className={cn(
              "group relative flex flex-col overflow-hidden",
              CONTAINER_B
            )}
          >
            <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

            {/* 01, 02 … top right, light grey */}
            <div
              className="absolute top-0 right-0 p-4 font-mono text-[10px] font-bold uppercase tracking-tighter text-white/40 select-none pointer-events-none z-10"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Header: Icon-Box + Titel (Icon bleibt immer) */}
            <div className="border-b border-white/5 p-6 flex items-center gap-4 relative z-10">
              {Icon && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-brand-cyan/10 text-brand-cyan">
                  <Icon className="size-6" stroke={1.5} />
                </div>
              )}
              <h3 className="font-bold text-lg text-white uppercase tracking-wider">
                {module.name}
              </h3>
            </div>

            {/* Body: description */}
            <div className="p-6 flex flex-col grow relative z-10">
              <p className="text-[0.9375rem] leading-relaxed text-white/80">
                {module.description}
              </p>
            </div>

            {/* Footer: CTA wie Tech-Katalog */}
            <div className="mt-auto p-6 pt-0 relative z-10">
              <Button
                asChild
                variant="ghost"
                className="w-full justify-between text-brand-navy-muted hover:text-brand-cyan hover:bg-transparent px-0 uppercase tracking-widest text-xs"
              >
                <Link href="/kontakt">
                  Jetzt anfragen <IconArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
