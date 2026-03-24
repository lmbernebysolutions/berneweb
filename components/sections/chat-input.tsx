"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  mobilePlaceholder?: string;
  mobilePlaceholderBreakpoint?: number;
  className?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isLoading = false,
  placeholder = "Ihre Frage…",
  mobilePlaceholder,
  mobilePlaceholderBreakpoint = 370,
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMobilePlaceholder, setIsMobilePlaceholder] = useState(false);
  const isSubmitDisabled = disabled || isLoading || !value.trim();

  useEffect(() => {
    if (!mobilePlaceholder) return;

    const mediaQuery = window.matchMedia(`(max-width: ${mobilePlaceholderBreakpoint}px)`);
    const update = () => setIsMobilePlaceholder(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [mobilePlaceholder, mobilePlaceholderBreakpoint]);

  const resolvedPlaceholder = isMobilePlaceholder && mobilePlaceholder ? mobilePlaceholder : placeholder;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex items-end gap-2", className)}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={resolvedPlaceholder}
        disabled={disabled}
        rows={1}
        aria-label="Ihre Nachricht an den Assistenten"
        className="min-h-[44px] w-full min-w-0 flex-1 resize-none rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-brand-cyan/30 focus:outline-none focus:ring-1 focus:ring-brand-cyan/20 disabled:opacity-50"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!isSubmitDisabled) onSubmit();
          }
        }}
      />
      <Button
        type="submit"
        variant="outline-light"
        size="sm"
        disabled={isSubmitDisabled}
        className="shrink-0"
        aria-label={isLoading ? "Wird gesendet" : "Nachricht senden"}
      >
        {isLoading ? "…" : "Senden"}
      </Button>
    </form>
  );
}
