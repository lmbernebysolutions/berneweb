"use client";

import { useEffect } from "react";

export function useAnimateOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.animateDelay;
            if (delay) {
              el.style.transitionDelay = `${delay}ms`;
            }
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
