import { useEffect, useRef, useState } from 'react';

export function useInView(options?: IntersectionObserverInit, once: boolean = true) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.15, ...(options || {}) });

    observer.observe(node);
    return () => observer.disconnect();
  }, [options, once]);

  return { ref, inView } as const;
}
