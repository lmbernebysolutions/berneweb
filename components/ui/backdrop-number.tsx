import { cn } from "@/lib/utils";

interface BackdropNumberProps {
    number: string;
    className?: string;
    color?: string; // Optional override
}

/**
 * A massive, heavy-weight background number used for section identification.
 * This implements the "Heavy Shadow Aesthetic" requested by the user.
 * It is meant to be placed absolute behind content or sticky.
 */
export function BackdropNumber({ number, className, color }: BackdropNumberProps) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute -top-8 -left-4 z-0 select-none font-black leading-none",
                "text-[8rem] md:text-[12rem] lg:text-[16rem]",
                className
            )}
            style={{
                // Using text-stroke for the "Blueprint" feeling - GOLD for regional quality signal
                WebkitTextStroke: "1.5px rgba(255, 181, 71, 0.4)",
                color: "transparent",
                // Heavy shadow logic
                filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.5))"
            }}
            aria-hidden="true"
        >
            {number}
        </div>
    );
}
