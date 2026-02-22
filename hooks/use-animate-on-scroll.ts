"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useAnimateOnScroll() {
  const pathname = usePathname(); // Trigger re-run on route change

  useEffect(() => {
    // Reset all animations on route change
    const previouslyVisible = document.querySelectorAll(".is-visible[data-animate]");
    previouslyVisible.forEach((el) => {
      el.classList.remove("is-visible");

      // Reset all child tech-corner-animate elements so they can animate again on the new page
      const corners = el.querySelectorAll<HTMLElement>(".tech-corner-animate");
      corners.forEach((corner) => {
        corner.classList.remove("tech-corner-done");
        corner.style.animation = "none";
        void corner.offsetHeight;
        corner.style.animation = "";
      });
    });

    const elements = document.querySelectorAll("[data-animate]");
    if (!elements.length) return;

    // Helper: attach corner-freeze listeners
    const freezeCornersOnEnd = (parent: HTMLElement) => {
      parent.querySelectorAll<HTMLElement>(".tech-corner-animate").forEach((corner) => {
        if (corner.classList.contains("tech-corner-done")) return;
        corner.addEventListener(
          "animationend",
          () => corner.classList.add("tech-corner-done"),
          { once: true }
        );
      });
    };

    // Helper: reveal one element (apply delay + is-visible)
    const revealElement = (el: HTMLElement, delay?: string) => {
      if (el.classList.contains("is-visible")) return;
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add("is-visible");
      freezeCornersOnEnd(el);
    };

    // ─── IMMEDIATE: reveal elements already in viewport ──────────────────────
    // Runs synchronously in useEffect (after React hydration) to avoid a flash
    // of invisible content that the async IntersectionObserver would otherwise cause.
    // This is the root fix for "animations only visible on page switch".
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const rect = htmlEl.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport) {
        revealElement(htmlEl, htmlEl.dataset.animateDelay);
      }
    });

    // ─── SCROLL: IntersectionObserver for below-fold elements ────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            revealElement(el, el.dataset.animateDelay);
          }
        });
      },
      // Slightly more lenient threshold + smaller dead-zone for fast mobile scrollers
      { threshold: 0.12, rootMargin: "0px 0px -20px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]); // Re-run when pathname changes
}
