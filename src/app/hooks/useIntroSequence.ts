import { useEffect, useState } from 'react';
import { HERO_RESTART_EVENT } from '@/app/hooks/useScrollDrivenHero';

export type IntroPhase = 'wall' | 'entering' | 'settled';

// Fired once, the moment the wall starts dismissing — HeroSection waits for this
// before playing its own first-statement reveal, instead of animating it hidden
// behind the wall where the user would never see it.
export const INTRO_ENTERING_EVENT = 'gati:intro-entering';

export function useIntroSequence() {
  // No sessionStorage persistence — every fresh page load (including a plain
  // browser refresh) starts back at the wall, by design.
  const [phase, setPhase] = useState<IntroPhase>('wall');

  useEffect(() => {
    if (phase !== 'entering') return;

    // The intro wall always opens onto the hero's first statement. Two things
    // can otherwise break that on a browser refresh: (a) the hero's ScrollTrigger
    // pin, created while scroll is still 0, fires onLeave the instant browser
    // scroll restoration jumps the page deep past the hero (while the wall is
    // up) — silently collapsing the hero before the user ever sees it; and (b)
    // the leftover deep scroll position. Restarting the hero re-arms it for the
    // statement-one reveal, and the explicit scroll-to-top guarantees GSAP
    // measures the trigger from the top so it doesn't re-fire onLeave.
    //
    // Order matters: scrollTo first, THEN the restart event — the restart
    // handler (useScrollDrivenHero) also scrolls to 0, and its effect's
    // synchronous ScrollTrigger.refresh() must measure a settled top position
    // (see the comment at the top of that handler). Dispatching the restart
    // here runs both in the same task, which the previous version relied on to
    // revive a hero retired by onLeave-on-load; it was removed for the
    // scroll-lock bug and is being restored now that the lock's root cause is
    // fixed elsewhere (the retired guard in the wheel/touch handlers).
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event(HERO_RESTART_EVENT));
    window.dispatchEvent(new Event(INTRO_ENTERING_EVENT));
    const timer = setTimeout(() => setPhase('settled'), 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    document.body.style.overflow = phase === 'wall' ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  const enter = () => {
    if (phase === 'wall') setPhase('entering');
  };

  return { phase, enter };
}
