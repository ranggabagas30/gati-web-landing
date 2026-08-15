import { useCallback, useRef, useState } from 'react';

const DIGITS = '0123456789';

function formatPrice(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

export function usePriceScramble(targetValue: number) {
  const [displayValue, setDisplayValue] = useState(() => formatPrice(targetValue));
  const rafRef = useRef<number | null>(null);

  const cancel = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const onMouseEnter = useCallback(() => {
    cancel();
    const targetStr = formatPrice(targetValue);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / 900, 1);
      if (progress >= 1) {
        setDisplayValue(targetStr);
        rafRef.current = null;
        return;
      }
      const scrambled = targetStr
        .split('')
        .map((char) => {
          if (char === '$' || char === ',') return char;
          return Math.random() < progress * progress ? char : DIGITS[Math.floor(Math.random() * 10)];
        })
        .join('');
      setDisplayValue(scrambled);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [targetValue, cancel]);

  const onMouseLeave = useCallback(() => {
    cancel();
    setDisplayValue(formatPrice(targetValue));
  }, [targetValue, cancel]);

  return { displayValue, onMouseEnter, onMouseLeave };
}
