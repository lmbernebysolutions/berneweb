"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
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
import {
  getWizardChatState,
  getInitialWizardState,
  type WizardChatOutput,
} from "@/lib/chat/wizard-chat";
import { MAX_INPUT_CHARS } from "@/lib/chat/constants";
import type { WizardVariant } from "@/lib/wizard-config";
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
  wizardVariant: WizardVariant;
  suggestedFaq: readonly FaqSuggestion[];
}

type ChatMode = "faq" | "match";

export function ChatSection({
  sectionNumber,
  overline,
  title,
  subtitle,
  wizardVariant,
  suggestedFaq,
}: ChatSectionProps) {
  const [mounted, setMounted] = useState(false);
  const { hasConsent, openPreferences } = useChatConsent();
  const [mode, setMode] = useState<ChatMode>("faq");
  const [faqInput, setFaqInput] = useState("");

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

  const [matchState, setMatchState] = useState<WizardChatOutput>(() =>
    getInitialWizardState(wizardVariant)
  );
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string>>({});

  useEffect(() => setMounted(true), []);

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

  const handleMatchChoice = useCallback(
    (choice: string) => {
      if (matchState.type !== "step") return;
      const newAnswers = { ...matchAnswers, [matchState.step.id]: choice };
      setMatchAnswers(newAnswers);
      const next = getWizardChatState(
        wizardVariant,
        matchState.stepIndex,
        newAnswers,
        choice
      );
      setMatchState(next);
    },
    [matchState, matchAnswers, wizardVariant]
  );

  const handleMatchReset = useCallback(() => {
    setMatchState(getInitialWizardState(wizardVariant));
    setMatchAnswers({});
  }, [wizardVariant]);

  // Server und erster Client-Render: gleiches Markup wie No-Consent, damit kein Hydration-Mismatch
  if (!mounted || !hasConsent) {
    return (
      <Section bg="subtle">
        <SectionHeading
          number={sectionNumber}
          overline={overline}
          title={title}
          subtitle={subtitle}
          align="left"
          light
        />
        <div className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md">
          <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
          <div className="relative z-10 p-8 md:p-10">
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
    <Section bg="subtle">
      <SectionHeading
        number={sectionNumber}
        overline={overline}
        title={title}
        subtitle={subtitle}
        align="left"
        light
      />
      <div className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow">
        <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />
        <div className="relative z-10 p-6 md:p-8 lg:p-10">
          {/* Modus-Umschaltung */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Button
              type="button"
              variant={mode === "faq" ? "default" : "outline-light"}
              size="sm"
              onClick={() => setMode("faq")}
            >
              FAQ – Kurz gefragt
            </Button>
            <Button
              type="button"
              variant={mode === "match" ? "default" : "outline-light"}
              size="sm"
              onClick={() => {
                setMode("match");
                setMatchState(getInitialWizardState(wizardVariant));
                setMatchAnswers({});
              }}
            >
              Ihr Match
            </Button>
          </div>

          {mode === "faq" && (
            <>
              {suggestedFaq.length > 0 && faqMessages.length === 0 && (
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/60">
                  Vorgeschlagene Fragen
                </p>
              )}
              {suggestedFaq.length > 0 && faqMessages.length === 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
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
              <ChatInput
                value={faqInput}
                onChange={setFaqInput}
                onSubmit={handleFaqSubmit}
                isLoading={faqLoading}
                placeholder="Offene Frage stellen…"
              />
            </>
          )}

          {mode === "match" && (
            <>
              {matchState.type === "step" && (
                <>
                  <div className="mb-6">
                    <ChatMessage
                      role="assistant"
                      content={
                        matchState.step.subline
                          ? `${matchState.step.question}\n\n${matchState.step.subline}`
                          : matchState.step.question
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    {matchState.step.choices.map((choice) => (
                      <Button
                        key={choice.value}
                        type="button"
                        variant="outline-light"
                        size="lg"
                        className="w-full justify-between gap-2 py-3 h-auto text-left min-h-14"
                        onClick={() => handleMatchChoice(choice.value)}
                      >
                        <span className="font-medium uppercase tracking-wide text-xs sm:text-sm">
                          {choice.label}
                        </span>
                        <IconArrowRight className="size-5 shrink-0" stroke={2} />
                      </Button>
                    ))}
                  </div>
                </>
              )}
              {matchState.type === "result" && (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 inline-flex items-center border border-brand-cyan bg-brand-cyan/10 px-4 py-1 text-xs font-bold text-brand-cyan uppercase tracking-widest">
                    Ihr Match
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
                    {matchState.match.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-6 max-w-2xl">
                    {matchState.match.description}
                  </p>
                  {matchState.match.price && (
                    <p className="text-xl font-bold text-brand-warm mb-8">
                      {matchState.match.price}
                      <span className="text-sm font-normal text-white/50 ml-2">netto</span>
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button asChild size="lg" variant="default">
                      <Link href={matchState.match.ctaHref}>
                        {matchState.match.ctaLabel}
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      variant="outline-light"
                      size="lg"
                      onClick={handleMatchReset}
                    >
                      Nochmal von vorn
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
