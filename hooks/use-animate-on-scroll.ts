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

      // Reset all child tech-corner-animate elements
      const corners = el.querySelectorAll(".tech-corner-animate");
      corners.forEach((corner) => {
        const htmlCorner = corner as HTMLElement;
        // Force animation reset by removing and re-adding the class
        htmlCorner.style.animation = "none";
        // Trigger reflow to reset animation
        void htmlCorner.offsetHeight;
        htmlCorner.style.animation = "";
      });
    });

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
            // Don't unobserve so animations can retrigger on route changes
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => {
      observer.observe(el);

      // Immediately trigger animation for elements already in viewport
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        const htmlEl = el as HTMLElement;
        const delay = htmlEl.dataset.animateDelay;
        if (delay) {
          htmlEl.style.transitionDelay = `${delay}ms`;
        }
        // Small delay to ensure DOM is ready
        requestAnimationFrame(() => {
          htmlEl.classList.add("is-visible");
        });
      }
    });

    return () => observer.disconnect();
  }, [pathname]); // Re-run when pathname changes
}
