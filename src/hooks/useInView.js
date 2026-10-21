import { useState, useEffect, useRef } from 'react';

export function useInView(options = {}) {
  const { threshold = 0, rootMargin = '100px', once = true } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    // Immediate check if element is already within viewport on mount
    try {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        setInView(true);
        if (once) return;
      }
    } catch {
      // Continue to IntersectionObserver fallback
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
