"use client";

import { useEffect, useRef, useState } from "react";

interface RevealOptions {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * Reveal-on-scroll hook with zero animation library overhead. Returns a ref
 * to attach to the element plus a boolean that flips to true the first time
 * the element enters the viewport. Pair with CSS transitions (e.g. the
 * `.reveal` class in globals.css) for the actual visual change — keeps the
 * animation on the browser's compositor thread instead of a JS rAF loop.
 */
export function useRevealOnScroll<T extends HTMLElement>(
  options: RevealOptions = {},
) {
  const { rootMargin = "-10% 0px", threshold = 0, once = true } = options;
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) io.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, revealed] as const;
}
