'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

/**
 * useReveal — IntersectionObserver-based scroll reveal hook.
 *
 * Returns a typed `ref` to attach to the target element and a `revealed`
 * boolean that flips to `true` once the element crosses the threshold.
 * Never resets (fade-in-once pattern).
 *
 * Aligned to original CodeStudio spec:
 *   threshold: 0.08, rootMargin: '-5%', failsafe ~1600ms.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.08
): { ref: RefObject<T | null>; revealed: boolean } {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Failsafe: force reveal after ~1600ms in case IO never fires
    const failsafe = setTimeout(() => setRevealed(true), 1600);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          clearTimeout(failsafe);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '-5%' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [threshold]);

  return { ref, revealed };
}
