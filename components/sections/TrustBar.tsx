interface TrustBarItem {
  value: string;
  label: string;
}

interface TrustBarProps {
  items: readonly TrustBarItem[];
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-6 md:py-8">
      {/* Subtle gradient accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {items.map((item, i) => (
            <div
              key={item.label}
              data-animate="fade-up"
              data-animate-delay={String(i * 100)}
              className="group relative text-center"
            >
              {/* Decorative number */}
              <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 text-[3rem] font-black leading-none text-brand-navy/[0.03] select-none" aria-hidden="true">
                {item.value}
              </div>

              <div className="relative">
                <div className="text-3xl font-extrabold tracking-tight text-brand-cyan md:text-4xl">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-medium text-brand-cyan">
                  {item.label}
                </div>
              </div>

              {/* Separator on non-last items (desktop) */}
              {i < items.length - 1 && (
                <div
                  className="absolute top-1/2 right-0 hidden h-8 w-px -translate-y-1/2 bg-border md:block"
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
