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

            // Freeze tech corners after animation ends so they never disappear (stable on long sessions)
            const corners = el.querySelectorAll<HTMLElement>(".tech-corner-animate");
            corners.forEach((corner) => {
              if (corner.classList.contains("tech-corner-done")) return;
              const onEnd = () => {
                corner.classList.add("tech-corner-done");
                corner.removeEventListener("animationend", onEnd);
              };
              corner.addEventListener("animationend", onEnd, { once: true });
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // Do not mutate "already in viewport" here: that can run before React hydrates (e.g. TrustBar),
    // causing "server HTML didn't match client" (we'd add is-visible to DOM before hydration).
    // Above-the-fold sections that need immediate reveal (e.g. TrustBar) use their own state;
    // everything else gets is-visible from the IntersectionObserver when it enters view.
    return () => observer.disconnect();
  }, [pathname]); // Re-run when pathname changes
}
