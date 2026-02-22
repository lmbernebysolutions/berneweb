"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// SSR-safe: useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Helper: attach corner-freeze listeners
function freezeCornersOnEnd(parent: HTMLElement) {
  parent.querySelectorAll<HTMLElement>(".tech-corner-animate").forEach((corner) => {
    if (corner.classList.contains("tech-corner-done")) return;
    corner.addEventListener(
      "animationend",
      () => corner.classList.add("tech-corner-done"),
      { once: true }
    );
  });
}

// Helper: reveal one element (apply delay + is-visible)
function revealElement(el: HTMLElement, delay?: string) {
  if (el.classList.contains("is-visible")) return;

  // Force clip-reveal animation restart (CSS animation replay quirk)
  if (el.classList.contains("clip-reveal")) {
    el.style.animation = "none";
    void el.offsetHeight; // reflow
    el.style.animation = "";
  }

  if (delay) el.style.transitionDelay = `${delay}ms`;
  el.classList.add("is-visible");
  freezeCornersOnEnd(el);
}

export function useAnimateOnScroll() {
  const pathname = usePathname();

  // PHASE 1: Layout effect — synchronous before paint
  // Reveals in-viewport elements immediately with no FOUC
  useIsomorphicLayoutEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
    if (!elements.length) return;

    // Reset on route change
    elements.forEach((el) => {
      if (!el.classList.contains("is-visible")) return;

      el.classList.remove("is-visible");
      el.style.transitionDelay = "";

      // Reset TechCorner animations for replaying on new page
      const corners = el.querySelectorAll<HTMLElement>(".tech-corner-animate");
      corners.forEach((corner) => {
        corner.classList.remove("tech-corner-done");
        corner.style.animation = "none";
        void corner.offsetHeight;
        corner.style.animation = "";
      });

      // Reset clip-reveal animations
      if (el.classList.contains("clip-reveal")) {
        el.style.animation = "none";
        void el.offsetHeight;
        el.style.animation = "";
      }
    });

    // Immediately reveal in-viewport elements (synchronous, before paint)
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        revealElement(el, el.dataset.animateDelay);
      }
    });

    // Cleanup phase removed: Do not globally revert 'is-visible' on unmount.
    // This previously caused hydration mismatches / missing elements on iOS reload.
  }, [pathname]);

  // PHASE 2: Effect — sets up IntersectionObserver for below-fold elements
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            revealElement(el, el.dataset.animateDelay);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -20px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // Page restore handler (iOS/bfcache)
    const restoreVisibility = () => {
      if (document.hidden) return;
      document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight * 1.2) {
          if (!el.classList.contains("is-visible")) {
            revealElement(el, el.dataset.animateDelay);
          }
        }
      });
    };

    document.addEventListener("visibilitychange", restoreVisibility);
    window.addEventListener("pageshow", restoreVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", restoreVisibility);
      window.removeEventListener("pageshow", restoreVisibility);
    };
  }, [pathname]);
}
