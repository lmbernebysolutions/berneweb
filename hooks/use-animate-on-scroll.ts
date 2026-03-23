"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Use useEffect (not useLayoutEffect) so we run after React hydration. Adding
// "is-visible" before hydration completes causes a hydration mismatch.
const useRevealEffect = useEffect;

/**
 * Defer work until after the current React commit + hydration (incl. concurrent
 * selective hydration and HMR). Prevents mutating [data-animate] nodes before
 * their owning Client Components have hydrated → avoids className mismatch.
 */
function scheduleAfterHydration(task: () => void | (() => void)): () => void {
  let innerCleanup: void | (() => void);
  let cancelled = false;
  let raf1 = 0;
  let raf2 = 0;

  const timeoutId = window.setTimeout(() => {
    if (cancelled) return;
    raf1 = requestAnimationFrame(() => {
      if (cancelled) return;
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return;
        innerCleanup = task();
      });
    });
  }, 0);

  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
    if (typeof innerCleanup === "function") innerCleanup();
  };
}

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

  // PHASE 1: Deferred so we never add "is-visible" before owning components hydrate.
  useRevealEffect(() => {
    return scheduleAfterHydration(() => {
      document.documentElement.classList.add("js-animate");
      const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
      if (!elements.length) return;

      // Reset on route change
      elements.forEach((el) => {
        if (!el.classList.contains("is-visible")) return;

        el.classList.remove("is-visible");
        el.style.transitionDelay = "";

        const corners = el.querySelectorAll<HTMLElement>(".tech-corner-animate");
        corners.forEach((corner) => {
          corner.classList.remove("tech-corner-done");
          corner.style.animation = "none";
          void corner.offsetHeight;
          corner.style.animation = "";
        });

        if (el.classList.contains("clip-reveal")) {
          el.style.animation = "none";
          void el.offsetHeight;
          el.style.animation = "";
        }
      });

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          revealElement(el, el.dataset.animateDelay);
        }
      });
    });
  }, [pathname]);

  // PHASE 2: IntersectionObserver — also deferred so observe() cannot fire before hydration.
  useEffect(() => {
    return scheduleAfterHydration(() => {
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

      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;
            const directAnimated = node.matches?.("[data-animate]") ? [node] : [];
            const nestedAnimated = Array.from(node.querySelectorAll?.("[data-animate]") ?? []);
            const animatedNodes = [...directAnimated, ...nestedAnimated] as HTMLElement[];
            animatedNodes.forEach((el) => observer.observe(el));
          });
        });
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
        document.removeEventListener("visibilitychange", restoreVisibility);
        window.removeEventListener("pageshow", restoreVisibility);
      };
    });
  }, [pathname]);
}
