"use client";

import React, { useEffect } from "react";
import { useFunnel } from "./FunnelContext";
import { ProgressBar } from "./ProgressBar";
import { StepContainer } from "./StepContainer";
import { Screen1Hook } from "./screens/Screen1Hook";
import { QuizScreen } from "./screens/QuizScreen";
import { Screen6LaborIllusion } from "./screens/Screen6LaborIllusion";
import { Screen7LeadCapture } from "./screens/Screen7LeadCapture";
import { Screen8Success } from "./screens/Screen8Success";
import { PainPointKey } from "./FunnelContext";
import { cn } from "@/lib/utils";
import { TextLogo } from "@/components/brand/TextLogo";

// ─── Quiz-Daten ───────────────────────────────────────────────────────────────

const QUIZ_SCREENS = [
  // Screen 2: Micro-Commitment
  {
    step: 1,
    question: "Wie würdest du eure aktuelle digitale Aufstellung ehrlich bewerten?",
    answerKey: "step1" as const,
    options: [
      { value: "solide", label: "Solide, wir haben alles im Griff." },
      { value: "luft", label: "Da ist definitiv noch Luft nach oben." },
      { value: "flickenteppich", label: "Ehrlich gesagt: Es ist ein Flickenteppich." },
      { value: "unsichtbar", label: "Wir existieren online praktisch nicht." },
    ],
  },
  // Screen 3: Diagnose + Variable-Mapping
  {
    step: 2,
    question: "Was ist aktuell der größte Zeitfresser oder Schmerzpunkt im Alltag?",
    answerKey: "step2PainPoint" as const,
    options: [
      {
        value: "telefon" as PainPointKey,
        label: "Das Telefon klingelt ständig — wir kommen kaum zum Arbeiten.",
        sublabel: "→ Erreichbarkeit & KI-Empfang",
        meta: { label: "das ständige Telefonklingeln", product: "KI-Empfang" },
      },
      {
        value: "fachkraefte" as PainPointKey,
        label: "Gute Leute finden — Fachkräftemangel bremst uns aus.",
        sublabel: "→ Recruiting & Sichtbarkeit",
        meta: { label: "den Fachkräftemangel", product: "Web/Karriere" },
      },
      {
        value: "sichtbarkeit" as PainPointKey,
        label: "Wir sind regional unsichtbar — Mitbewerber schnappen uns Aufträge weg.",
        sublabel: "→ Lokales Marketing",
        meta: { label: "die fehlende regionale Sichtbarkeit", product: "Klick-Dominator" },
      },
      {
        value: "it-chaos" as PainPointKey,
        label: "Unsere IT und Website ist veraltet und macht nur Probleme.",
        sublabel: "→ Digitale Infrastruktur",
        meta: { label: "das IT- und Bürokratie-Chaos", product: "Hausmeister" },
      },
    ],
  },
  // Screen 4: Loss Aversion
  {
    step: 3,
    question: "Was passiert, wenn ihr dieses Problem die nächsten 12 Monate nicht löst?",
    answerKey: "step3Consequence" as const,
    options: [
      { value: "umsatz", label: "Wir lassen potenziellen Umsatz auf der Straße liegen." },
      { value: "limit", label: "Ich als Inhaber arbeite weiterhin am absoluten Limit." },
      { value: "wettbewerb", label: "Wettbewerber ziehen digital gnadenlos an uns vorbei." },
    ],
  },
  // Screen 5: Segmentierung
  {
    step: 4,
    question: "Wie groß ist euer Team aktuell?",
    answerKey: "step4TeamSize" as const,
    options: [
      { value: "1-5", label: "1–5 Mitarbeiter", sublabel: "Solo- oder Kleinbetrieb" },
      { value: "6-15", label: "6–15 Mitarbeiter" },
      { value: "16-50", label: "16–50 Mitarbeiter" },
      { value: "50+", label: "50+ Mitarbeiter" },
    ],
  },
];

// ─── Modal ────────────────────────────────────────────────────────────────────

export function FunnelModal() {
  const { state, closeFunnel, setAnswerAndAdvance, nextStep } = useFunnel();
  const { isOpen, currentStep } = state;
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-Scroll to Top on Step Change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [currentStep]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentStep < 6) closeFunnel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, currentStep, closeFunnel]);

  if (!isOpen) return null;

  const currentQuiz = QUIZ_SCREENS.find((q) => q.step === currentStep);

  return (
    // Backdrop
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Berneby Digital-Check"
      className={cn(
        "fixed inset-0 z-[9000] flex flex-col items-center",
        "bg-brand-navy"
      )}
    >
      {/* Grain overlay (matches body::after on main site) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid Beams (Desktop only) framing the max-w-xl container */}
      <div className="hidden md:block absolute inset-0 mx-auto w-full max-w-xl pointer-events-none z-[5]" aria-hidden>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-brand-cyan/20" />
      </div>

      {/* Header bar */}
      <div className="relative z-10 w-full max-w-xl flex items-center justify-between px-4 pt-4 pb-4 mb-4 shrink-0">
        {/* Logo */}
        <div className="w-32 h-8 relative">
           <TextLogo variant="dark" size="default" />
        </div>

        {/* Close button — only visible before Screen 6 (Labor Illusion) */}
        {currentStep < 6 && (
          <button
            type="button"
            onClick={closeFunnel}
            aria-label="Funnel schließen"
            className={cn(
              "w-10 h-10 flex items-center justify-center",
              "border border-brand-cyan/20 hover:border-brand-cyan/60",
              "text-white/50 hover:text-white transition-colors tap-target"
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {currentStep > 0 && (
        <div className="relative z-10 w-full max-w-xl shrink-0 mt-3 px-4">
          <ProgressBar currentStep={currentStep} />
        </div>
      )}

      {/* Screen content */}
      <div 
        ref={scrollRef}
        className="relative z-10 flex-1 flex flex-col w-full max-w-xl overflow-y-auto overflow-x-hidden"
      >
        <StepContainer step={currentStep} className="px-4 py-4">
          {currentStep === 0 && <Screen1Hook />}

          {currentQuiz && (
            <QuizScreen
              question={currentQuiz.question}
              options={currentQuiz.options}
              answerKey={currentQuiz.answerKey}
            />
          )}

          {currentStep === 5 && <Screen6LaborIllusion onComplete={nextStep} />}

          {currentStep === 6 && <Screen7LeadCapture />}

          {currentStep === 7 && <Screen8Success />}
        </StepContainer>
      </div>
    </div>
  );
}
