"use client";

import { useEffect, useState } from "react";

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
      className="fixed bottom-8 right-6 z-50 flex items-center justify-center text-brand-cyan no-underline opacity-90 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none"
      aria-label="Nach oben scrollen"
    >
      <span
        className="font-sans text-5xl font-semibold leading-none select-none"
        style={{
          filter:
            "drop-shadow(0 0 8px rgba(3,249,249,0.9)) drop-shadow(0 0 20px rgba(3,249,249,0.5))",
        }}
        aria-hidden
      >
        ^
      </span>
    </a>
  );
}
