"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TechCorners } from "@/components/ui/tech-corners";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/sections/chat-message";
import { ChatInput } from "@/components/sections/chat-input";
import { useChatConsent } from "@/hooks/use-chat-consent";
import { MAX_INPUT_CHARS } from "@/lib/chat/constants";
import { IconArrowRight } from "@tabler/icons-react";

function getMessageText(msg: { parts?: { type: string; text?: string }[] }): string {
  if (!msg.parts?.length) return "";
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text" && "text" in p)
    .map((p) => p.text)
    .join("");
}

export interface FaqSuggestion {
  question: string;
  answer: string;
}

interface ChatSectionProps {
  sectionNumber: string;
  overline: string;
  title: string;
  subtitle?: string;
  suggestedFaq: readonly FaqSuggestion[];
  /** Hintergrund der Section für Wechsel mit vorheriger Sektion (transparent | subtle) */
  sectionBg?: "subtle" | "transparent";
}

export function ChatSection({
  sectionNumber,
  overline,
  title,
  subtitle,
  suggestedFaq,
  sectionBg = "subtle",
}: ChatSectionProps) {
  const [mounted, setMounted] = useState(false);
  const { hasConsent, openPreferences } = useChatConsent();
  const [faqInput, setFaqInput] = useState("");
  const [showSuggestedFaq, setShowSuggestedFaq] = useState(false);

  const faqTransport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { mode: "faq" },
      }),
    []
  );
  const {
    messages: faqMessages,
    sendMessage,
    status: faqStatus,
  } = useChat({ transport: faqTransport });
  const faqLoading = faqStatus === "submitted" || faqStatus === "streaming";

  const faqScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const scrollFaqToBottom = useCallback(() => {
    const el = faqScrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
  }, []);

  useEffect(() => {
    scrollFaqToBottom();
  }, [faqMessages.length, faqLoading, scrollFaqToBottom]);

  useEffect(() => {
    if (!faqLoading) return;
    const id = setInterval(scrollFaqToBottom, 150);
    return () => clearInterval(id);
  }, [faqLoading, scrollFaqToBottom]);

  const handleFaqSubmit = useCallback(() => {
    const text = faqInput.slice(0, MAX_INPUT_CHARS).trim();
    if (!text || text.length < 2) return;
    setFaqInput("");
    sendMessage({ text });
  }, [faqInput, sendMessage]);

  const handleFaqSuggestionClick = useCallback(
    (question: string) => {
      sendMessage({ text: question });
    },
    [sendMessage]
  );

  // Server und erster Client-Render: gleiches Markup wie No-Consent, damit kein Hydration-Mismatch
  if (!mounted || !hasConsent) {
    return (
      <Section bg={sectionBg}>
        <SectionHeading
          number={sectionNumber}
          overline={overline}
          title={title}
          subtitle={subtitle}
          align="left"
          light
        />
        <div className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md max-h-[min(70vh,720px)] flex flex-col">
          <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
          <div className="relative z-10 flex min-h-0 flex-1 flex-col p-8 md:p-10">
            <p className="text-white/80 mb-4">
              Um den Chat zu nutzen, bestätigen Sie bitte die Cookie-Einstellungen.
            </p>
            <Button type="button" variant="outline-light" size="sm" onClick={openPreferences}>
              Cookie-Einstellungen
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section bg={sectionBg}>
      <SectionHeading
        number={sectionNumber}
        overline={overline}
        title={title}
        subtitle={subtitle}
        align="left"
        light
      />
      <div className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow max-h-[min(70vh,720px)] flex flex-col">
        <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col p-6 md:p-8 lg:p-10">
          <p className="mb-4 text-xs text-white/60" role="status">
            Hinweis: Antworten nur auf Basis unserer Wissensbasis; keine verbindliche Beratung.{" "}
            <Link href="/datenschutz" className="text-brand-cyan hover:underline">
              Datenschutz
            </Link>
          </p>

          <div
                ref={faqScrollRef}
                role="log"
                aria-label="Chat-Verlauf"
                className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
              >
                {suggestedFaq.length > 0 && (faqMessages.length === 0 || showSuggestedFaq) && (
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/60">
                    Vorgeschlagene Fragen
                  </p>
                )}
                {suggestedFaq.length > 0 && (faqMessages.length === 0 || showSuggestedFaq) && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {suggestedFaq.map((item, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleFaqSuggestionClick(item.question)}
                          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/90 hover:border-brand-cyan/30 hover:bg-brand-cyan/5"
                        >
                          {item.question}
                          <IconArrowRight className="size-4 shrink-0" stroke={2} />
                        </button>
                      ))}
                    </div>
                    {faqMessages.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowSuggestedFaq(false)}
                        className="mt-2 text-xs text-white/50 hover:text-brand-cyan"
                      >
                        Vorgeschlagene Fragen ausblenden
                      </button>
                    )}
                  </div>
                )}
                {suggestedFaq.length > 0 && faqMessages.length > 0 && !showSuggestedFaq && (
                  <button
                    type="button"
                    onClick={() => setShowSuggestedFaq(true)}
                    className="mb-4 text-xs text-brand-cyan hover:underline"
                  >
                    Vorgeschlagene Fragen anzeigen
                  </button>
                )}
                <div className="mb-6 flex flex-col gap-3">
                  {faqMessages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      role={msg.role as "user" | "assistant"}
                      content={getMessageText(msg)}
                    />
                  ))}
                </div>
              </div>
          <div className="shrink-0">
            <ChatInput
              value={faqInput}
              onChange={setFaqInput}
              onSubmit={handleFaqSubmit}
              isLoading={faqLoading}
              placeholder="Offene Frage stellen…"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
