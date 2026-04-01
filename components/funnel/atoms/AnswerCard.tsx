import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { TechCorners } from "@/components/ui/tech-corners";
import { CONTAINER_A_NO_GLOW } from "@/lib/container-styles";

interface AnswerCardProps {
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

export function AnswerCard({
  label,
  sublabel,
  icon,
  selected = false,
  onClick,
  className,
}: AnswerCardProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className={cn(
        "relative w-full text-left p-5 transition-all duration-200 cursor-pointer overflow-hidden",
        "tap-target group shadow-sm flex items-center gap-4",
        CONTAINER_A_NO_GLOW,
        // Selected state: override background
        selected && "border-brand-cyan/40 bg-brand-cyan/5 text-brand-cyan",
        // Active press feedback
        pressed && "scale-[0.98] opacity-90",
        className
      )}
    >
      <TechCorners pattern="diagonal" variant="cyan" size="md" hoverExpand={!selected} />
      
      {/* Show all 4 corners when selected */}
      {selected && (
        <TechCorners pattern="all" variant="cyan" size="md" hoverExpand={false} />
      )}

      {icon && (
        <span
          className={cn(
            "shrink-0 text-brand-cyan/60 transition-colors",
            "group-hover:text-brand-cyan",
            selected && "text-brand-cyan"
          )}
        >
          {icon}
        </span>
      )}
      
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p
          className={cn(
            "text-base font-semibold leading-relaxed transition-colors",
            "text-white group-hover:text-brand-cyan",
            selected && "text-brand-cyan"
          )}
        >
          {label}
        </p>
        {sublabel && (
          <p className="mt-1 text-sm text-brand-navy-muted leading-snug">{sublabel}</p>
        )}
      </div>
      {/* Selection indicator */}
      <span
        className={cn(
          "shrink-0 w-5 h-5 border-2 border-brand-cyan/30 transition-all rounded-sm",
          "flex items-center justify-center ml-2",
          selected && "border-brand-cyan bg-brand-cyan/20"
        )}
      >
        {selected && (
          <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="#03f9f9"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
