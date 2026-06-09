'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

/**
 * useReveal — IntersectionObserver-based scroll reveal hook.
 *
 * Returns a typed `ref` to attach to the target element and a `revealed`
 * boolean that flips to `true` once the element is at least 20% visible.
 * Never resets (fade-in-once pattern).
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.2
): { ref: RefObject<T | null>; revealed: boolean } {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
