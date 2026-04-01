"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface FunnelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FunnelInput = React.forwardRef<HTMLInputElement, FunnelInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2"
          >
            {label}
          </label>
        )}
        <Input
          ref={ref}
          id={id}
          className={cn(
            "min-h-[3rem] px-4",
            error && "border-red-500 aria-invalid:border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

FunnelInput.displayName = "FunnelInput";
