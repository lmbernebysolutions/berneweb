import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 tap-target",
  {
    variants: {
      variant: {
        default:
          "bg-brand-cyan text-brand-navy hover:bg-brand-warm hover:text-brand-navy clip-corner shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(255,181,71,0.4)] active:translate-y-[2px] active:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 clip-corner",
        outline:
          "border-2 border-brand-cyan bg-transparent text-brand-cyan hover:bg-brand-cyan hover:text-brand-navy clip-corner hover:shadow-[4px_4px_0_0_rgba(3,249,249,0.2)]",
        "outline-light":
          "border-2 border-white bg-transparent text-white hover:bg-brand-cyan hover:border-brand-cyan hover:text-brand-navy clip-corner hover:shadow-[4px_4px_0_0_rgba(3,249,249,0.3)] transition-all hover:translate-y-[-2px]",
        secondary:
          "bg-brand-navy border border-brand-cyan/30 text-brand-cyan hover:bg-brand-navy/80 clip-corner",
        ghost: "hover:bg-brand-cyan/10 hover:text-brand-cyan",
        link: "text-brand-cyan underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-12 px-8 py-2",
        sm: "min-h-11 px-4 text-xs",
        lg: "min-h-14 px-10 text-base",
        icon: "min-h-11 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
