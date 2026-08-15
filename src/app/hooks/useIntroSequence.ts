import { useEffect, useState } from 'react';

export type IntroPhase = 'wall' | 'entering' | 'settled';

const SESSION_KEY = 'gati_intro_done';

export function useIntroSequence() {
  const [phase, setPhase] = useState<IntroPhase>(() =>
    sessionStorage.getItem(SESSION_KEY) === '1' ? 'settled' : 'wall'
  );

  useEffect(() => {
    if (phase !== 'entering') return;
    sessionStorage.setItem(SESSION_KEY, '1');
    const timer = setTimeout(() => setPhase('settled'), 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  const enter = () => {
    if (phase === 'wall') setPhase('entering');
  };

  return { phase, enter };
}
