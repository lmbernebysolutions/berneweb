import { cn } from "@/lib/utils";

interface TechCornersProps {
    /** Pattern: "diagonal" (2 corners) or "all" (4 corners) */
    pattern?: "diagonal" | "all";
    /** Color variant */
    variant?: "cyan" | "red" | "navy";
    /** Size of corners */
    size?: "sm" | "md" | "lg";
    /** Whether corners appear on hover (for diagonal pattern) */
    hoverExpand?: boolean;
    /** Group name for named groups like group/faq */
    groupName?: string;
    /** Whether to animate corners drawing on */
    animate?: boolean;
}

const SIZE = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
} as const;

// STATIC class maps - Tailwind needs these as full strings to detect them
const COLORS = {
    cyan: {
        base: "border-brand-cyan/40",
        hover: "group-hover:border-brand-cyan",
        hidden: "border-brand-cyan/0",
        hoverFaq: "group-hover/faq:border-brand-cyan",
    },
    red: {
        base: "border-red-500/40",
        hover: "group-hover:border-red-500",
        hidden: "border-red-500/0",
        hoverFaq: "group-hover/faq:border-red-500",
    },
    navy: {
        base: "border-brand-navy/10",
        hover: "group-hover:border-brand-navy",
        hidden: "border-brand-navy/0",
        hoverFaq: "group-hover/faq:border-brand-navy",
    },
} as const;

export function TechCorners({
    pattern = "diagonal",
    variant = "cyan",
    size = "lg",
    hoverExpand = true,
    groupName,
    animate = false,
}: TechCornersProps) {
    const sizeClass = SIZE[size];
    const colors = COLORS[variant];
    const hoverColor = groupName === "faq" ? colors.hoverFaq : colors.hover;
    const hiddenHover = groupName === "faq" ? colors.hoverFaq : colors.hover;
    const anim = animate ? "tech-corner-animate" : "";

    if (pattern === "all") {
        return (
            <>
                <div className={cn("absolute top-0 left-0 border-t-2 border-l-2 transition-colors z-10 tech-corner-tl", anim, sizeClass, colors.base, hoverColor)} />
                <div className={cn("absolute top-0 right-0 border-t-2 border-r-2 transition-colors z-10 tech-corner-tr", anim, sizeClass, colors.base, hoverColor)} />
                <div className={cn("absolute bottom-0 left-0 border-b-2 border-l-2 transition-colors z-10 tech-corner-bl", anim, sizeClass, colors.base, hoverColor)} />
                <div className={cn("absolute bottom-0 right-0 border-b-2 border-r-2 transition-colors z-10 tech-corner-br", anim, sizeClass, colors.base, hoverColor)} />
            </>
        );
    }

    // Diagonal pattern: 2 corners always visible, 2 appear on hover
    return (
        <>
            {/* Always visible: top-left and bottom-right */}
            <div className={cn("absolute top-0 left-0 border-t-2 border-l-2 transition-colors z-10 tech-corner-tl", anim, sizeClass, colors.base, hoverColor)} />
            <div className={cn("absolute bottom-0 right-0 border-b-2 border-r-2 transition-colors z-10 tech-corner-br", anim, sizeClass, colors.base, hoverColor)} />

            {/* Hover only: top-right and bottom-left - invisible until hover */}
            {hoverExpand && (
                <>
                    <div className={cn("absolute top-0 right-0 border-t-2 border-r-2 transition-colors z-10 tech-corner-tr", anim, sizeClass, colors.hidden, hiddenHover)} />
                    <div className={cn("absolute bottom-0 left-0 border-b-2 border-l-2 transition-colors z-10 tech-corner-bl", anim, sizeClass, colors.hidden, hiddenHover)} />
                </>
            )}
        </>
    );
}
