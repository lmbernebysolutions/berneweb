import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 clip-corner shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(3,249,249,0.2)] active:translate-y-[0px] active:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 clip-corner",
        outline:
          "border-2 border-input bg-transparent hover:bg-brand-cyan hover:text-brand-navy hover:border-brand-cyan clip-corner",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 clip-corner",
        ghost: "hover:bg-brand-cyan/10 hover:text-brand-cyan",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
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
