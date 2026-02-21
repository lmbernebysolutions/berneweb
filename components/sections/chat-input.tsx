"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isLoading = false,
  placeholder = "Ihre Frage…",
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isSubmitDisabled = disabled || isLoading || !value.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-2", className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={2}
        className="w-full resize-none rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-cyan/30 focus:outline-none focus:ring-1 focus:ring-brand-cyan/20 disabled:opacity-50"
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
        className="self-end"
      >
        {isLoading ? "Wird gesendet…" : "Senden"}
      </Button>
    </form>
  );
}
