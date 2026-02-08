"use client";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TechCorners } from "@/components/ui/tech-corners";

const MASCOT_TOOLTIP = "Unser Maskottchen – immer an Ihrer Seite";

export function HeroMascot() {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-40 h-40 border-2 border-cyan relative flex items-center justify-center shadow-[0_0_30px_rgba(3,249,249,0.4)] cursor-default overflow-hidden">
            <TechCorners pattern="all" variant="cyan" size="md" hoverExpand={false} />
            <Image
              src="/Schweinchen.svg"
              alt=""
              width={120}
              height={96}
              className="brightness-110 filter drop-shadow-[0_0_14px_rgba(3,249,249,0.6)] animate-partner-presence"
              aria-hidden
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          sideOffset={12}
          className="border border-brand-cyan/40 bg-brand-navy text-brand-cyan text-xs font-medium max-w-[220px] text-center [&>svg]:fill-brand-navy [&>svg]:stroke-brand-navy"
        >
          {MASCOT_TOOLTIP}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
