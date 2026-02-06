"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          data-animate="fade-up"
          data-animate-delay={String(i * 60)}
          className="overflow-hidden rounded-xl border border-border bg-card px-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <AccordionTrigger className="cursor-pointer text-left text-base font-semibold hover:no-underline [&[data-state=open]]:text-brand-navy">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-[0.9375rem] leading-relaxed text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
