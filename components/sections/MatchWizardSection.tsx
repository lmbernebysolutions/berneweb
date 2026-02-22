"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TechCorners } from "@/components/ui/tech-corners";
import { Button } from "@/components/ui/button";
import {
  getWizardSteps,
  getHomeStepSequence,
  getHandwerkStepSequence,
  getTechStepSequence,
  computeMatch,
  WIZARD_MATCHES,
  type WizardVariant,
} from "@/lib/wizard-config";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface MatchWizardSectionProps {
  variant: WizardVariant;
  sectionNumber: string;
  overline: string;
  title: string;
  subtitle?: string;
  /** Section bg – wie andere Sektionen (transparent/subtle) */
  bg?: "transparent" | "subtle";
}

export function MatchWizardSection({
  variant,
  sectionNumber,
  overline,
  title,
  subtitle,
  bg = "transparent",
}: MatchWizardSectionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"wizard" | "result">("wizard");

  const allSteps = getWizardSteps(variant);

  // Schritt-Reihenfolge: bei Home dynamisch (conditional), bei Handwerk/Tech fix
  const stepSequence = useMemo(() => {
    if (variant === "home") return getHomeStepSequence(answers);
    if (variant === "handwerk") return getHandwerkStepSequence();
    return getTechStepSequence();
  }, [variant, answers]);

  const currentStepId = stepSequence[currentIndex];
  const currentStep = allSteps.find((s) => s.id === currentStepId);

  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex >= stepSequence.length - 1;

  function handleChoice(stepId: string, value: string) {
    const next: Record<string, string> = { ...answers, [stepId]: value };
    setAnswers(next);

    if (variant === "home") {
      const nextSeq = getHomeStepSequence(next);
      if (currentIndex + 1 >= nextSeq.length) {
        setPhase("result");
        return;
      }
      setCurrentIndex((i) => i + 1);
      return;
    }

    if (currentIndex + 1 >= stepSequence.length) {
      setPhase("result");
      return;
    }
    setCurrentIndex((i) => i + 1);
  }

  function handleBack() {
    if (currentIndex <= 0) return;
    setCurrentIndex((i) => i - 1);
  }

  function handleReset() {
    setAnswers({});
    setCurrentIndex(0);
    setPhase("wizard");
  }

  const matchId = phase === "result" ? computeMatch(variant, answers) : null;
  const match = matchId ? WIZARD_MATCHES[matchId] : null;

  return (
    <Section bg={bg}>
      <SectionHeading
        number={sectionNumber}
        overline={overline}
        title={title}
        subtitle={subtitle}
        align="left"
        light
      />

      <div
        className="group relative overflow-hidden border border-white/10 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow"
        data-animate="fade-up"
      >
        <TechCorners pattern="diagonal" variant="cyan" size="lg" animate />

        <div className="relative z-10 p-8 md:p-10 lg:p-12">
          {phase === "wizard" && currentStep && (
            <>
              {/* Fortschritt: gefüllt = bereits absolvierte Schritte (currentIndex), nicht „aktueller Schritt“ – sonst 1 Schritt = 100% */}
              <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
                <div
                  className="h-full rounded-full bg-brand-cyan/60 transition-[width] duration-300 ease-out"
                  style={{
                    width: `${
                      stepSequence.length > 0
                        ? (currentIndex / stepSequence.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>

              {/* Frage */}
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white mb-2 break-words">
                {currentStep.question}
              </h3>
              {currentStep.subline && (
                <p className="text-white/60 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                  {currentStep.subline}
                </p>
              )}

              {/* Auswahl – echte Button-Varianten (outline-light auf Navy) */}
              <div className="flex flex-col gap-3">
                {currentStep.choices.map((choice) => (
                  <Button
                    key={choice.value}
                    type="button"
                    variant="outline-light"
                    size="lg"
                    className="w-full justify-between gap-2 sm:gap-4 py-3 sm:py-4 h-auto text-left min-h-14"
                    onClick={() => handleChoice(currentStep.id, choice.value)}
                  >
                    <span className="font-medium uppercase tracking-wide text-xs sm:text-sm break-words">
                      {choice.label}
                    </span>
                    <IconArrowRight className="size-5 shrink-0" stroke={2} />
                  </Button>
                ))}
              </div>

              {!isFirstStep && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-8 text-white/70 hover:text-white hover:bg-white/5"
                  onClick={handleBack}
                >
                  <IconArrowLeft className="size-4 mr-2" />
                  Zurück
                </Button>
              )}
            </>
          )}

          {phase === "result" && match && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center border border-brand-cyan bg-brand-cyan/10 px-4 py-1 text-xs font-bold text-brand-cyan uppercase tracking-widest">
                Ihr Match
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
                {match.title}
              </h3>
              <p className="text-white/80 leading-relaxed mb-6 max-w-2xl">
                {match.description}
              </p>
              {match.price && (
                <p className="text-xl font-bold text-brand-warm mb-8">
                  {match.price}
                  <span className="text-sm font-normal text-white/50 ml-2">netto</span>
                </p>
              )}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" variant="default">
                  <Link href={match.ctaHref}>{match.ctaLabel}</Link>
                </Button>
                <Button
                  type="button"
                  variant="outline-light"
                  size="lg"
                  onClick={handleReset}
                >
                  Nochmal von vorn
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
