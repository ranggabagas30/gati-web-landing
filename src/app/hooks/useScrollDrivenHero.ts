import { useEffect, useRef, useState } from 'react';

const ADVANCE_THRESHOLD = 60; // accumulated deltaY before advancing one step
const COOLDOWN_MS = 200;

export function useScrollDrivenHero(statementCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinned, setPinned] = useState(true);
  const accumulatedDelta = useRef(0);
  const lastAdvanceAt = useRef(0);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!pinned) return;

    const tryAdvance = (direction: 1 | -1) => {
      const now = Date.now();
      if (now - lastAdvanceAt.current < COOLDOWN_MS) return;
      lastAdvanceAt.current = now;

      setActiveIndex((current) => {
        const next = current + direction;
        if (next >= statementCount) {
          setPinned(false);
          return current;
        }
        return Math.max(0, Math.min(statementCount - 1, next));
      });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulatedDelta.current += e.deltaY;
      if (Math.abs(accumulatedDelta.current) >= ADVANCE_THRESHOLD) {
        tryAdvance(accumulatedDelta.current > 0 ? 1 : -1);
        accumulatedDelta.current = 0;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const currentY = e.touches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - currentY;
      if (Math.abs(delta) >= ADVANCE_THRESHOLD) {
        tryAdvance(delta > 0 ? 1 : -1);
        touchStartY.current = currentY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [pinned, statementCount]);

  useEffect(() => {
    if (pinned) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [pinned]);

  return { activeIndex, pinned };
}
