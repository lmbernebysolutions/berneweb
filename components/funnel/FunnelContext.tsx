"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PainPointKey = "telefon" | "fachkraefte" | "sichtbarkeit" | "it-chaos";

export interface FunnelAnswers {
  step1?: string;
  step2PainPoint?: PainPointKey;
  step2Label?: string;
  step2Product?: string;
  step3Consequence?: string;
  step4TeamSize?: string;
}

export interface FunnelState {
  isOpen: boolean;
  currentStep: number; // 0–7
  answers: FunnelAnswers;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

type FunnelAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "NEXT_STEP" }
  | { type: "SET_ANSWER"; payload: Partial<FunnelAnswers> }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_SUBMITTED" }
  | { type: "RESET" };

// ─── Reducer ──────────────────────────────────────────────────────────────────

const initialState: FunnelState = {
  isOpen: false,
  currentStep: 0,
  answers: {},
  isSubmitting: false,
  isSubmitted: false,
};

function funnelReducer(state: FunnelState, action: FunnelAction): FunnelState {
  switch (action.type) {
    case "OPEN":
      return { ...initialState, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 7),
      };
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, ...action.payload },
      };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_SUBMITTED":
      return { ...state, isSubmitting: false, isSubmitted: true };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface FunnelContextValue {
  state: FunnelState;
  openFunnel: () => void;
  closeFunnel: () => void;
  nextStep: () => void;
  setAnswer: (payload: Partial<FunnelAnswers>) => void;
  setAnswerAndAdvance: (payload: Partial<FunnelAnswers>) => void;
  submitLead: (contact: string, channel: "whatsapp" | "email") => Promise<boolean>;
}

const FunnelContext = createContext<FunnelContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function FunnelProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(funnelReducer, initialState);

  const openFunnel = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeFunnel = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const nextStep = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
  const setAnswer = useCallback(
    (payload: Partial<FunnelAnswers>) => dispatch({ type: "SET_ANSWER", payload }),
    []
  );

  /** Speichert Antwort und wechselt nach 150ms (taktiles Feedback) zum nächsten Screen */
  const setAnswerAndAdvance = useCallback(
    (payload: Partial<FunnelAnswers>) => {
      dispatch({ type: "SET_ANSWER", payload });
      setTimeout(() => dispatch({ type: "NEXT_STEP" }), 150);
    },
    []
  );

  const submitLead = useCallback(
    async (contact: string, channel: "whatsapp" | "email"): Promise<boolean> => {
      dispatch({ type: "SET_SUBMITTING", payload: true });
      try {
        const res = await fetch("/api/funnel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            painPoint: state.answers.step2PainPoint,
            painLabel: state.answers.step2Label,
            consequence: state.answers.step3Consequence,
            teamSize: state.answers.step4TeamSize,
            contact,
            channel,
            gdprAccepted: true,
          }),
        });
        if (!res.ok) throw new Error("API Error");
        dispatch({ type: "SET_SUBMITTED" });
        setTimeout(() => dispatch({ type: "NEXT_STEP" }), 300);
        return true;
      } catch {
        dispatch({ type: "SET_SUBMITTING", payload: false });
        return false;
      }
    },
    [state.answers]
  );

  return (
    <FunnelContext.Provider
      value={{ state, openFunnel, closeFunnel, nextStep, setAnswer, setAnswerAndAdvance, submitLead }}
    >
      {children}
    </FunnelContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useFunnel(): FunnelContextValue {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useFunnel must be used within a FunnelProvider");
  return ctx;
}
