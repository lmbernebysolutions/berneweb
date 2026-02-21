/**
 * Chat – Wizard-State-Maschine für Match-Modus.
 * Nutzt wizard-config: getWizardSteps, getHomeStepSequence / getHandwerkStepSequence / getTechStepSequence, computeMatch, WIZARD_MATCHES.
 * Keine LLM-Antworten; rein regelbasiert.
 */

import {
  getWizardSteps,
  getHomeStepSequence,
  getHandwerkStepSequence,
  getTechStepSequence,
  computeMatch,
  WIZARD_MATCHES,
  type WizardVariant,
  type WizardStep,
  type MatchResult,
} from "@/lib/wizard-config";

function getStepSequence(variant: WizardVariant, answers: Record<string, string>): string[] {
  if (variant === "home") return getHomeStepSequence(answers);
  if (variant === "handwerk") return getHandwerkStepSequence();
  return getTechStepSequence();
}

export type WizardChatStepOutput = {
  type: "step";
  step: WizardStep;
  stepIndex: number;
};

export type WizardChatResultOutput = {
  type: "result";
  match: MatchResult;
};

export type WizardChatOutput = WizardChatStepOutput | WizardChatResultOutput;

/**
 * Berechnet nächsten Wizard-Zustand: entweder nächster Step oder Match-Ergebnis.
 * @param variant – home | handwerk | tech
 * @param stepIndex – aktueller Schritt (0-basiert)
 * @param answers – bisherige Antworten (stepId -> value)
 * @param choice – letzte Auswahl (optional); wenn gesetzt, wird sie in answers übernommen und Fortschritt berechnet
 */
export function getWizardChatState(
  variant: WizardVariant,
  stepIndex: number,
  answers: Record<string, string>,
  choice?: string
): WizardChatOutput {
  const allSteps = getWizardSteps(variant);
  let currentAnswers = { ...answers };

  if (choice != null && choice.trim() !== "") {
    const sequence = getStepSequence(variant, currentAnswers);
    const currentStepId = sequence[stepIndex];
    const currentStep = allSteps.find((s) => s.id === currentStepId);
    if (currentStep) {
      currentAnswers = { ...currentAnswers, [currentStep.id]: choice.trim() };
    }
  }

  const sequence = getStepSequence(variant, currentAnswers);
  const nextIndex = choice != null && choice.trim() !== "" ? stepIndex + 1 : stepIndex;
  const isLastStep = nextIndex >= sequence.length;

  if (isLastStep && (choice != null && choice.trim() !== "")) {
    const matchId = computeMatch(variant, currentAnswers);
    const match = WIZARD_MATCHES[matchId];
    if (match) {
      return { type: "result", match };
    }
  }

  const nextStepId = sequence[nextIndex];
  const nextStep = allSteps.find((s) => s.id === nextStepId);
  if (!nextStep) {
    const matchId = computeMatch(variant, currentAnswers);
    const match = WIZARD_MATCHES[matchId];
    return match ? { type: "result", match } : { type: "step", step: allSteps[0]!, stepIndex: 0 };
  }

  return { type: "step", step: nextStep, stepIndex: nextIndex };
}

/** Initialer Zustand: erster Step und leere answers. */
export function getInitialWizardState(variant: WizardVariant): WizardChatStepOutput {
  const output = getWizardChatState(variant, 0, {}, undefined);
  if (output.type === "result") {
    const allSteps = getWizardSteps(variant);
    const first = allSteps[0];
    return { type: "step", step: first!, stepIndex: 0 };
  }
  return output;
}
