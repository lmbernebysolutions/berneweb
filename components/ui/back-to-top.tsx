"use client";

import { useEffect, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#main-content"
      className="fixed bottom-8 right-6 z-50 flex size-12 items-center justify-center rounded-full text-brand-cyan no-underline opacity-90 transition hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
      style={{
        boxShadow: "0 0 20px rgba(3, 249, 249, 0.35)",
      }}
      aria-label="Nach oben scrollen"
    >
      <IconArrowUp className="size-6" stroke={2.5} aria-hidden />
    </a>
  );
}
