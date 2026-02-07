interface TrustBarItem {
  value: string;
  label: string;
}

interface TrustBarProps {
  items: readonly TrustBarItem[];
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="relative overflow-hidden border-y border-brand-cyan/20 bg-background py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {items.map((item, i) => (
            <div
              key={item.label}
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
                  className="font-black text-[5rem] leading-none md:text-[6rem]"
                  style={{
                    WebkitTextStroke: "1px rgba(3, 249, 249, 0.06)",
                    color: "transparent",
                  }}
                >
                  {item.value}
                </span>
              </div>

              <div className="relative">
                <div className="text-4xl font-black tracking-tighter text-brand-cyan md:text-5xl">
                  {item.value}
                </div>
                <div className="mt-1.5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </div>
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
