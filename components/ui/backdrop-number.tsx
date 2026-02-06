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
                "text-[10rem] md:text-[16rem] lg:text-[20rem]",
                className
            )}
            style={{
                // Using text-stroke for the "Blueprint" feeling
                WebkitTextStroke: "2px rgba(3, 249, 249, 0.1)",
                color: "transparent",
                // Heavy shadow logic
                filter: "drop-shadow(4px 4px 0px rgba(0,0,0,0.5))"
            }}
            aria-hidden="true"
        >
            {number}
        </div>
    );
}
