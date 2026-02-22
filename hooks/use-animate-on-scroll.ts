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

      // Reset TechCorner animations so they replay on the new page
      const corners = el.querySelectorAll<HTMLElement>(".tech-corner-animate");
      corners.forEach((corner) => {
        corner.classList.remove("tech-corner-done");
        corner.style.animation = "none";
        void corner.offsetHeight;
        corner.style.animation = "";
      });

      // Reset clip-reveal animations (force browser to restart keyframe)
      if ((el as HTMLElement).classList.contains("clip-reveal")) {
        (el as HTMLElement).style.animation = "none";
        void (el as HTMLElement).offsetHeight;
        (el as HTMLElement).style.animation = "";
      }
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

      // Force clip-reveal animation restart (CSS animation replay quirk)
      if (el.classList.contains("clip-reveal")) {
        el.style.animation = "none";
        void el.offsetHeight; // reflow
        el.style.animation = "";
      }

      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add("is-visible");
      freezeCornersOnEnd(el);
    };

    // ─── IMMEDIATE: reveal elements already in viewport ──────────────────────
    // Runs synchronously in useEffect (after React hydration) to prevent
    // flash of invisible content — root fix for "animations only on page switch".
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const rect = htmlEl.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
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
      { threshold: 0.12, rootMargin: "0px 0px -20px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // ─── PAGE RESTORE: re-apply is-visible after tab switch / phone lock ─────
    // On iOS, backgrounded pages can lose compositor layers (will-change removed
    // from CSS to mitigate, but this listener adds a belt-and-suspenders safety net).
    const restoreVisibility = () => {
      if (document.hidden) return;
      document.querySelectorAll("[data-animate]").forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        // Re-apply is-visible to all elements currently in/above viewport
        if (rect.bottom > 0 && rect.top < window.innerHeight * 1.2) {
          if (!htmlEl.classList.contains("is-visible")) {
            revealElement(htmlEl, htmlEl.dataset.animateDelay);
          }
        }
      });
    };

    document.addEventListener("visibilitychange", restoreVisibility);
    // pageshow fires on bfcache restore (back/forward navigation)
    window.addEventListener("pageshow", restoreVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", restoreVisibility);
      window.removeEventListener("pageshow", restoreVisibility);
    };
  }, [pathname]);
}
