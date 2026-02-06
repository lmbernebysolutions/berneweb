import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "bg-brand-navy/50 backdrop-blur-sm border border-brand-cyan/20 text-card-foreground",
        "rounded-none", // Brutalist
        "relative overflow-visible", // Allow decorations to spill
        "group/card flex flex-col gap-6 py-6",
        "has-[>img:first-child]:pt-0",
        className
      )}
      {...props}
    >
      {/* Decorative Corner Markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-cyan pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-cyan pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-brand-cyan pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-cyan pointer-events-none" />

      {props.children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col space-y-1.5 px-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-bold uppercase tracking-wide leading-none text-xl", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-cyan-100/60 font-mono mt-2", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pt-0", className)}
      {...props}
    />
  )
}

// Stub unused components to prevent breakages, but keep them minimal
const CardAction = React.Fragment

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
}
