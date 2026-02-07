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
}

export function TechCorners({
    pattern = "diagonal",
    variant = "cyan",
    size = "lg",
    hoverExpand = true,
    groupName,
}: TechCornersProps) {
    const sizeClasses = {
        sm: "h-2 w-2",
        md: "h-3 w-3",
        lg: "h-4 w-4",
    };

    const hoverClass = groupName ? `group-hover/${groupName}` : "group-hover";

    const colorClasses = {
        cyan: {
            base: "border-brand-cyan/40",
            hover: `${hoverClass}:border-brand-cyan`,
            hidden: "border-brand-cyan/0",
        },
        red: {
            base: "border-red-500/40",
            hover: `${hoverClass}:border-red-500`,
            hidden: "border-red-500/0",
        },
        navy: {
            base: "border-brand-navy/10",
            hover: `${hoverClass}:border-brand-navy`,
            hidden: "border-brand-navy/0",
        },
    };

    const colors = colorClasses[variant];
    const sizeClass = sizeClasses[size];

    if (pattern === "all") {
        // All 4 corners always visible
        return (
            <>
                <div className={cn("absolute top-0 left-0 border-t-2 border-l-2 transition-colors z-10", sizeClass, colors.base, colors.hover)} />
                <div className={cn("absolute top-0 right-0 border-t-2 border-r-2 transition-colors z-10", sizeClass, colors.base, colors.hover)} />
                <div className={cn("absolute bottom-0 left-0 border-b-2 border-l-2 transition-colors z-10", sizeClass, colors.base, colors.hover)} />
                <div className={cn("absolute bottom-0 right-0 border-b-2 border-r-2 transition-colors z-10", sizeClass, colors.base, colors.hover)} />
            </>
        );
    }

    // Diagonal pattern: 2 corners always, 2 on hover
    return (
        <>
            {/* Always visible: top-left and bottom-right */}
            <div className={cn("absolute top-0 left-0 border-t-2 border-l-2 transition-colors z-10", sizeClass, colors.base, colors.hover)} />
            <div className={cn("absolute bottom-0 right-0 border-b-2 border-r-2 transition-colors z-10", sizeClass, colors.base, colors.hover)} />

            {/* Hover only: top-right and bottom-left */}
            {hoverExpand && (
                <>
                    <div className={cn("absolute top-0 right-0 border-t-2 border-r-2 transition-colors z-10", sizeClass, colors.hidden, colors.hover)} />
                    <div className={cn("absolute bottom-0 left-0 border-b-2 border-l-2 transition-colors z-10", sizeClass, colors.hidden, colors.hover)} />
                </>
            )}
        </>
    );
}
