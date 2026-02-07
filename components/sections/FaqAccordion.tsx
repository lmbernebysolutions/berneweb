"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BackdropNumber } from "@/components/ui/backdrop-number";
import { TechCorners } from "@/components/ui/tech-corners";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
  number?: string;
}

export function FaqAccordion({ items, number }: FaqAccordionProps) {
  return (
    <div className="relative">
      {number && (
        <BackdropNumber
          number={number}
          className="-top-16 -left-8 opacity-50"
        />
      )}
      <Accordion type="single" collapsible className="relative z-10 w-full space-y-3">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            data-animate="fade-up"
            data-animate-delay={String(i * 60)}
            className="group/faq relative overflow-hidden border border-white/10 bg-white/[0.03] px-6 shadow-sm transition-all"
          >
            {/* Tech corners - 2 corners default, 4 on open */}
            <TechCorners pattern="diagonal" variant="cyan" size="md" groupName="faq" />
            <div className="hidden group-data-[state=open]/faq:block">
              <TechCorners pattern="all" variant="cyan" size="md" />
            </div>




            <AccordionTrigger className="cursor-pointer text-left text-base font-semibold hover:no-underline [&[data-state=open]]:text-brand-cyan">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="border-t border-white/10 pt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
