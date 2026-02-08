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
            className="group/faq relative overflow-hidden border border-white/10 bg-white/[0.03] px-6 shadow-sm transition-colors data-[state=open]:border-brand-cyan/30 data-[state=open]:bg-brand-cyan/5"
          >
            {/* Tech corners - diagonal pattern, expands to all 4 on hover */}
            <TechCorners pattern="diagonal" variant="cyan" size="md" hoverExpand groupName="faq" />

            {/* Show all 4 corners when open */}
            <div className="hidden group-data-[state=open]/faq:block">
              <TechCorners pattern="all" variant="cyan" size="md" />
            </div>




            <AccordionTrigger className="cursor-pointer flex items-center gap-4 py-5 text-base font-semibold hover:no-underline [&[data-state=open]]:text-brand-cyan">
              <span className="flex-1 flex justify-center text-center min-w-0">
                {item.question}
              </span>
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
