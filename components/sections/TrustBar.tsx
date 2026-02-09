"use client";

import { useEffect, useRef, useState } from "react";

interface TrustBarItem {
  value: string;
  label?: string;
}

interface TrustBarProps {
  items: readonly TrustBarItem[];
}

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const numericMatch = value.match(/^(\d+)/);
    if (!numericMatch) return;

    const target = parseInt(numericMatch[1], 10);
    const suffix = value.slice(numericMatch[1].length);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();

          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setDisplay(`${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl font-black tracking-tighter text-brand-warm md:text-5xl tabular-nums">
      {display}
    </div>
  );
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="relative overflow-hidden border-y border-brand-cyan/20 bg-background py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {items.map((item, i) => (
            <div
              key={item.value + (item.label || "")}
              data-animate="fade-up"
              data-animate-delay={String(i * 100)}
              className="group relative text-center"
            >
              {/* Large background ghost number */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
                aria-hidden="true"
              >
                <span
                  className="font-black text-[5rem] leading-none md:text-[6rem] tabular-nums"
                  style={{
                    WebkitTextStroke: "1px rgba(3, 249, 249, 0.06)",
                    color: "transparent",
                  }}
                >
                  {item.value}
                </span>
              </div>

              <div className="relative">
                <AnimatedValue value={item.value} />
                {item.label ? (
                  <div className="mt-1.5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </div>
                ) : null}
              </div>

              {/* Separator on non-last items (desktop) */}
              {i < items.length - 1 && (
                <div
                  className="absolute top-1/2 right-0 hidden h-10 w-px -translate-y-1/2 bg-brand-cyan/15 md:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
