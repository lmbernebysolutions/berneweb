"use client";

import Link from "next/link";
import { TechCorners } from "@/components/ui/tech-corners";
import { cn } from "@/lib/utils";

export interface ChatMessageSources {
  title: string;
  slug: string;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  sources?: ChatMessageSources[];
}

export function ChatMessage({ role, content, sources }: ChatMessageProps) {
  const isUser = role === "user";
  return (
    <div
      role="article"
      aria-label={isUser ? "Ihre Nachricht" : "Antwort des Assistenten"}
      className={cn(
        "group/msg relative overflow-hidden border border-white/10 bg-white/[0.03] px-4 py-3 shadow-sm",
        isUser ? "ml-0 mr-auto max-w-[85%]" : "mr-0 ml-auto max-w-[85%]"
      )}
      data-role={role}
    >
      <TechCorners pattern="diagonal" variant="cyan" size="md" groupName="msg" />
      <p className="relative z-10 text-sm sm:text-base leading-relaxed text-white/90 whitespace-pre-wrap break-words">
        {content}
      </p>
      {sources && sources.length > 0 && (
        <div className="relative z-10 mt-3 flex flex-wrap gap-2">
          {sources.map((s) => (
            <Link
              key={s.slug}
              href={`/ratgeber/${s.slug}`}
              className="text-xs font-medium uppercase tracking-wider text-brand-cyan hover:text-brand-cyan/80"
            >
              Weiterlesen: {s.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
