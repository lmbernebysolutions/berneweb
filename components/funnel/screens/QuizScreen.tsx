"use client";

import React from "react";
import { useFunnel, FunnelAnswers, PainPointKey } from "../FunnelContext";
import { AnswerCard } from "../atoms/AnswerCard";

interface QuizOption {
  value: string;
  label: string;
  sublabel?: string;
  /** Only for Step 2 PainPoint mapping */
  meta?: { label: string; product: string };
}

interface QuizScreenProps {
  question: string;
  options: QuizOption[];
  answerKey: keyof FunnelAnswers;
}

export function QuizScreen({ question, options, answerKey }: QuizScreenProps) {
  const { state, setAnswerAndAdvance } = useFunnel();
  const selectedValue = state.answers[answerKey] as string | undefined;

  const handleSelect = (option: QuizOption) => {
    if (answerKey === "step2PainPoint" && option.meta) {
      // Step 2: store PainPoint key + human-readable label + target product
      setAnswerAndAdvance({
        step2PainPoint: option.value as PainPointKey,
        step2Label: option.meta.label,
        step2Product: option.meta.product,
      });
    } else {
      setAnswerAndAdvance({ [answerKey]: option.value });
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Question */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight leading-tight text-white shadow-sm">
          {question}
        </h2>
        <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
          Tippe auf eine Antwort
        </p>
      </div>

      {/* Answer Options */}
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => (
          <AnswerCard
            key={opt.value}
            label={opt.label}
            sublabel={opt.sublabel}
            selected={selectedValue === opt.value}
            onClick={() => handleSelect(opt)}
          />
        ))}
      </div>
    </div>
  );
}
