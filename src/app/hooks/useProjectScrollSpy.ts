import { useEffect, useState, type RefObject } from 'react';

export function useProjectScrollSpy(rowRefs: RefObject<HTMLDivElement>[]): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = rowRefs.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) setActiveIndex(index);
        });
      },
      { threshold: 0.5 }
    );

    rowRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [rowRefs]);

  return activeIndex;
}
