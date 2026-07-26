"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { trackGAEvent } from "@/lib/ga";

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

export interface FunnelUtm {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface FunnelState {
  isOpen: boolean;
  currentStep: number; // 0–7
  answers: FunnelAnswers;
  utm: FunnelUtm;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

type FunnelAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "NEXT_STEP" }
  | { type: "SET_ANSWER"; payload: Partial<FunnelAnswers> }
  | { type: "SET_UTM"; payload: FunnelUtm }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_SUBMITTED" }
  | { type: "RESET" };

const UTM_STORAGE_KEY = "berneby_digital_check_utm";

// ─── Reducer ──────────────────────────────────────────────────────────────────

const initialState: FunnelState = {
  isOpen: false,
  currentStep: 0,
  answers: {},
  utm: {},
  isSubmitting: false,
  isSubmitted: false,
};

function funnelReducer(state: FunnelState, action: FunnelAction): FunnelState {
  switch (action.type) {
    case "OPEN":
      return { ...initialState, isOpen: true, utm: state.utm };
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
    case "SET_UTM":
      return { ...state, utm: action.payload };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_SUBMITTED":
      return { ...state, isSubmitting: false, isSubmitted: true };
    case "RESET":
      return { ...initialState, utm: state.utm };
    default:
      return state;
  }
}

function readUtmFromUrl(): FunnelUtm {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source")?.trim() || undefined;
  const utmMedium = params.get("utm_medium")?.trim() || undefined;
  const utmCampaign = params.get("utm_campaign")?.trim() || undefined;
  if (!utmSource && !utmMedium && !utmCampaign) return {};
  return { utmSource, utmMedium, utmCampaign };
}

function readUtmFromStorage(): FunnelUtm {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as FunnelUtm;
    return {
      utmSource: parsed.utmSource || undefined,
      utmMedium: parsed.utmMedium || undefined,
      utmCampaign: parsed.utmCampaign || undefined,
    };
  } catch {
    return {};
  }
}

function persistUtm(utm: FunnelUtm) {
  if (typeof window === "undefined") return;
  if (!utm.utmSource && !utm.utmMedium && !utm.utmCampaign) return;
  try {
    window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // ignore quota / private mode
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
  const utmHydrated = useRef(false);

  useEffect(() => {
    if (utmHydrated.current) return;
    utmHydrated.current = true;
    const fromUrl = readUtmFromUrl();
    if (fromUrl.utmSource || fromUrl.utmMedium || fromUrl.utmCampaign) {
      persistUtm(fromUrl);
      dispatch({ type: "SET_UTM", payload: fromUrl });
      return;
    }
    const fromStorage = readUtmFromStorage();
    if (fromStorage.utmSource || fromStorage.utmMedium || fromStorage.utmCampaign) {
      dispatch({ type: "SET_UTM", payload: fromStorage });
    }
  }, []);

  const openFunnel = useCallback(() => {
    dispatch({ type: "OPEN" });
    trackGAEvent("digital_check_opened");
  }, []);

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
            ...(state.utm.utmSource ? { utmSource: state.utm.utmSource } : {}),
            ...(state.utm.utmMedium ? { utmMedium: state.utm.utmMedium } : {}),
            ...(state.utm.utmCampaign ? { utmCampaign: state.utm.utmCampaign } : {}),
          }),
        });
        if (!res.ok) throw new Error("API Error");
        dispatch({ type: "SET_SUBMITTED" });
        trackGAEvent("digital_check_lead_submitted", {
          channel,
          ...(state.utm.utmSource ? { utm_source: state.utm.utmSource } : {}),
          ...(state.utm.utmMedium ? { utm_medium: state.utm.utmMedium } : {}),
          ...(state.utm.utmCampaign ? { utm_campaign: state.utm.utmCampaign } : {}),
        });
        setTimeout(() => dispatch({ type: "NEXT_STEP" }), 300);
        return true;
      } catch {
        dispatch({ type: "SET_SUBMITTING", payload: false });
        return false;
      }
    },
    [state.answers, state.utm]
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
