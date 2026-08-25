import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isCaseStudyOverlayOpen } from '@/app/hooks/useCaseStudyHashSync';

gsap.registerPlugin(ScrollTrigger);

export const HERO_RESTART_EVENT = 'gati:restart-hero';

const SWIPE_THRESHOLD_PX = 60;
// Matches the draft's collapseS2: margin/border-radius/box-shadow animate over
// 0.5s starting immediately, transform (the actual slide-up) is delayed 0.3s
// and takes 0.75s — the two overlapping windows are what make "shrink into a
// floating card" and "slide away" read as one continuous motion. The hero's
// real layout height doesn't collapse (and scroll doesn't unlock) until this
// finishes, matching the draft's own sequencing.
const DISMISS_MS = 1200;
// Minimum time between accepted scroll steps, in ms. A single physical wheel
// gesture emits a burst of events; without a floor, a fast flick lands several
// events after the statement transition has finished (canAdvance true again)
// and rockets through multiple statements. This cooldown coalesces a burst
// into one step.
const STEP_COOLDOWN_MS = 700;
// The draft's own startS2() literally waits 3000ms per statement, but its
// actual on-screen pacing (measured directly) is ~6s/~4.8s per hold once
// entrance and transition overhead are counted — noticeably slower than what
// felt right here. 2s is a deliberate reduction from the raw 3000ms wait,
// not a port of the draft's number. Unlike the draft, any user gesture
// cancels this permanently rather than skipping straight to the end —
// manual up/down keeps working exactly as it always has, this only ever
// stops the *automatic* timer.
const AUTO_ADVANCE_MS = 2000;

export function useScrollDrivenHero(statementCount: number) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [dismissing, setDismissing] = useState(false);
  const [retired, setRetired] = useState(false);

  const activeIndexRef = useRef(0);
  // Starts blocked: the first statement plays a real enter animation on mount
  // (see HeroSection), and a scroll arriving before it finishes must be dropped
  // just like any other mid-transition input. HeroSection's onTransitionComplete
  // flips this true once that animation actually completes.
  const canAdvanceRef = useRef(false);
  // On the last statement, retiring into Expertise takes TWO forward scrolls:
  // the first only arms this flag (no visible change), the second actually
  // retires. This keeps the "Schedule a conversation" CTA on screen for a
  // moment rather than the first scroll after it appears skipping straight out.
  const retireArmedRef = useRef(false);
  const nextStepAtRef = useRef(0);
  const dismissingRef = useRef(false);
  const dismissTimeoutRef = useRef<number | null>(null);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);
  const autoAdvanceTimeoutRef = useRef<number | null>(null);
  const autoAdvanceCancelledRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const clearAutoAdvance = () => {
    if (autoAdvanceTimeoutRef.current !== null) {
      window.clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }
  };

  // Any wheel/touch input cancels the auto-advance cycle for good — it does
  // not resume. Called from the gesture handlers below regardless of whether
  // the gesture actually advances anything (e.g. dropped mid-transition),
  // since the user's intent to control it manually is what matters.
  const cancelAutoAdvance = () => {
    if (autoAdvanceCancelledRef.current) return;
    autoAdvanceCancelledRef.current = true;
    clearAutoAdvance();
  };

  // Plays the shrink-into-a-card + delayed slide-up dismissal, then — only once
  // it's fully finished — actually collapses the hero's layout height and
  // corrects scroll. Shared by the explicit wheel-driven "finished last
  // statement, scroll again" retirement and the ScrollTrigger onLeave fallback
  // (direct jumps via Explore/nav links that bypass wheel handling entirely).
  const retireHero = () => {
    if (dismissingRef.current || retired) return;
    clearAutoAdvance();
    dismissingRef.current = true;
    setIsActive(false);
    setDismissing(true);

    // Release the pin immediately so it isn't fighting the dismiss transition
    // for control of the inner element's position/transform.
    pinTriggerRef.current?.kill();
    pinTriggerRef.current = null;

    // Scroll stays blocked for the whole dismiss animation via the effect-managed
    // wheel/touch handlers below (kept alive through `dismissing` by the guard
    // change in that effect), NOT a throwaway pair of listeners here. The hero's
    // real layout height hasn't changed yet (only its visual transform/margin
    // has), so a scroll landing mid-animation would reach Expertise's entrance
    // gate before ScrollTrigger.refresh() has seen the hero's true (collapsed)
    // layout — the same race already fixed once for the instant-collapse path.
    //
    // The throwaway pair WAS the scroll-lock bug: onRestart and the unmount
    // cleanup both clear this timeout without removing those listeners, so any
    // restart that landed inside the dismiss window (e.g. the intro wall
    // dispatching HERO_RESTART_EVENT on a browser refresh) leaked a permanent
    // wheel/touch preventDefault and froze the page.
    dismissTimeoutRef.current = window.setTimeout(() => {
      dismissingRef.current = false;
      dismissTimeoutRef.current = null;
      setDismissing(false);
      setRetired(true);
      const target = outerRef.current;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (target) window.scrollTo({ top: target.offsetTop, behavior: 'auto' });
        });
      });
    }, DISMISS_MS);
  };

  // Shared by gesture handlers and the auto-advance timer — advancing past
  // the last statement retires the hero; stepping backward from the first
  // statement is a no-op.
  const tryAdvance = (direction: 1 | -1) => {
    if (retired || dismissingRef.current) return;
    if (!canAdvanceRef.current) return; // animation still playing — drop this input
    const current = activeIndexRef.current;

    if (direction === 1 && current >= statementCount - 1) {
      retireHero();
      return;
    }
    const next = Math.max(0, Math.min(statementCount - 1, current + direction));
    if (next === current) return; // already at the first statement, nothing to do

    canAdvanceRef.current = false;
    setActiveIndex(next);
  };

  // Schedules the next automatic advance 3s after the current statement has
  // finished entering — mirrors the draft's startS2 timing (wait, switch,
  // only start the next wait once that switch's own animation has finished).
  // Stops scheduling on its own once the last statement is reached; it never
  // auto-retires the hero (the last statement's CTA is meant to be seen).
  const scheduleAutoAdvance = () => {
    if (autoAdvanceCancelledRef.current || retired || dismissingRef.current) return;
    if (activeIndexRef.current >= statementCount - 1) return;
    clearAutoAdvance();
    autoAdvanceTimeoutRef.current = window.setTimeout(() => {
      autoAdvanceTimeoutRef.current = null;
      tryAdvance(1);
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    // Collapsing/restoring the hero resizes its container, which shifts every
    // section below it. Other ScrollTriggers on the page (Expertise, Projects)
    // cache their own trigger positions and don't know about that shift unless
    // told to — without this, their entrance animations can get stuck at their
    // initial hidden state forever. Called synchronously (not deferred to a
    // requestAnimationFrame) because the style change is already committed to the
    // DOM by the time this effect runs — GSAP's measurement will be accurate
    // immediately, and deferring it a frame opened a real race: a fast follow-up
    // scroll could be processed by the browser before Expertise's gate listener
    // (armed inside this refresh) was even attached.
    ScrollTrigger.refresh();

    if (retired || !outerRef.current || !innerRef.current || statementCount < 2) {
      return;
    }

    // This pin is a visual lock only, not a timing mechanism — advancement is
    // driven entirely by gated wheel/touch events below. A flat one-viewport
    // distance is just enough room for GSAP to track pin state; it's normally
    // never reached during a wheel-driven cascade, since every wheel/touch event
    // is preventDefault'd while active and real scrollY never moves. It only
    // matters as a fallback for direct jumps (Explore button, nav links) that
    // skip past the hero via scrollIntoView without going through wheel logic.
    //
    // On a fresh page load (or a restart), scrollY may briefly be non-zero
    // (browser scroll restoration, or the intro's scroll interaction) while this
    // trigger is created. If scrollY is already past the hero's end, ScrollTrigger
    // fires onLeave immediately on creation, retiring the hero the instant it
    // mounts and permanently locking the page (hero collapsed to 0 height,
    // wheel handler still attached, scroll stuck). Guard against that: if we're
    // not at the top when creating the pin, force scroll to 0 and defer the
    // trigger creation one rAF so it measures after the jump has settled.
    const createPin = () => {
      const trigger = ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top',
        end: '+=100%',
        pin: innerRef.current,
        onEnter: () => setIsActive(true),
        onEnterBack: () => setIsActive(true),
        onLeave: () => retireHero(),
        onLeaveBack: () => setIsActive(true),
      });
      pinTriggerRef.current = trigger;
    };

    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
      const raf = requestAnimationFrame(() => requestAnimationFrame(createPin));
      return () => {
        cancelAnimationFrame(raf);
        pinTriggerRef.current?.kill();
        pinTriggerRef.current = null;
      };
    }

    createPin();

    return () => {
      pinTriggerRef.current?.kill();
      pinTriggerRef.current = null;
    };
  }, [statementCount, retired]);

  useEffect(() => {
    if (retired) return;

    // The case-study overlay covers the page without unmounting Hero — its
    // own scrollable content needs these events untouched, so this hook
    // must not intercept (or preventDefault) anything while it's open.
    const onWheel = (e: WheelEvent) => {
      if (isCaseStudyOverlayOpen()) return;
      if (retired) return;
      // During the dismiss animation, keep swallowing every wheel event so the
      // page can't scroll underneath the pinned hero before it collapses (see
      // retireHero). This is what the throwaway blockWheel listeners used to do
      // — but as part of this effect's own lifecycle, so it's always torn down
      // by React rather than left dangling when a restart cancels the timeout.
      if (dismissingRef.current) {
        e.preventDefault();
        return;
      }
      // A real wheel gesture is a burst of events (momentum). Intercept every
      // one while the hero is active so the page never scrolls underneath the
      // pinned hero, and coalesce the burst into a single step via the
      // cooldown below. Dropping (rather than buffering) plus the cooldown is
      // what stops a fast flick from rocketing through every statement.
      e.preventDefault();
      cancelAutoAdvance();
      const direction = e.deltaY > 0 ? 1 : -1;
      const now = performance.now();

      // On the last statement, retiring takes two forward scrolls: the first
      // arms it, the second retires. This keeps the "Schedule a conversation"
      // CTA visible for a moment after the third wording finishes.
      if (direction === 1 && activeIndexRef.current >= statementCount - 1) {
        if (now < nextStepAtRef.current) return; // still within the burst cooldown
        nextStepAtRef.current = now + STEP_COOLDOWN_MS;
        if (retireArmedRef.current) {
          retireArmedRef.current = false;
          retireHero();
        } else {
          retireArmedRef.current = true;
        }
        return;
      }
      // A backward scroll while armed (but not yet retired) simply un-arms,
      // so the user can step back through the statements.
      retireArmedRef.current = false;

      if (!canAdvanceRef.current) return; // transition still playing — drop this input
      if (now < nextStepAtRef.current) return; // within cooldown — coalesce the burst
      nextStepAtRef.current = now + STEP_COOLDOWN_MS;
      tryAdvance(direction);
    };

    let touchStartY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isCaseStudyOverlayOpen()) return;
      if (retired) return;
      if (dismissingRef.current) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      if (touchStartY === null) return;
      const currentY = e.touches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - currentY;
      if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) {
        cancelAutoAdvance();
        const direction = delta > 0 ? 1 : -1;
        const now = performance.now();
        if (direction === 1 && activeIndexRef.current >= statementCount - 1) {
          if (now < nextStepAtRef.current) {
            touchStartY = currentY;
            return;
          }
          nextStepAtRef.current = now + STEP_COOLDOWN_MS;
          if (retireArmedRef.current) {
            retireArmedRef.current = false;
            retireHero();
          } else {
            retireArmedRef.current = true;
          }
          touchStartY = currentY;
          return;
        }
        retireArmedRef.current = false;
        if (!canAdvanceRef.current) {
          // transition still playing — drop this input
        } else if (now >= nextStepAtRef.current) {
          nextStepAtRef.current = now + STEP_COOLDOWN_MS;
          tryAdvance(direction);
        }
        touchStartY = currentY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [retired, statementCount]);

  useEffect(() => {
    const onRestart = () => {
      // Cancel a pending dismiss: without this, a restart triggered mid-animation
      // (e.g. the nav logo clicked while the hero is still sliding away) would
      // leave the timeout alive to fire later, re-collapsing the just-restored hero.
      if (dismissTimeoutRef.current !== null) {
        window.clearTimeout(dismissTimeoutRef.current);
        dismissTimeoutRef.current = null;
      }
      dismissingRef.current = false;
      setDismissing(false);

      // Re-arm auto-advance for the fresh cycle.
      autoAdvanceCancelledRef.current = false;
      retireArmedRef.current = false;
      clearAutoAdvance();

      // Reset scroll to the top BEFORE flipping `retired` — the effect above creates
      // a fresh ScrollTrigger synchronously once `retired` becomes false, and GSAP
      // evaluates the current scroll position during that synchronous creation. If
      // the page is still scrolled deep down (e.g. clicked from the footer) when the
      // trigger is created, GSAP sees progress already past its end and immediately
      // re-fires onLeave, undoing the restore before it's ever visible.
      window.scrollTo({ top: 0, behavior: 'auto' });
      // Only block if this will actually trigger a reset transition (i.e. we're not
      // already on the first statement) — HeroSection's onTransitionComplete is what
      // unblocks it, and that only fires when a real transition plays. Blocking
      // unconditionally here would deadlock scrolling forever if already on statement 0.
      if (activeIndexRef.current !== 0) {
        canAdvanceRef.current = false;
      }
      setActiveIndex(0);
      setIsActive(true);
      setRetired(false);
    };
    window.addEventListener(HERO_RESTART_EVENT, onRestart);
    return () => window.removeEventListener(HERO_RESTART_EVENT, onRestart);
  }, []);

  // Clears any pending timers on unmount so they can't fire against a stale
  // outerRef/scrollTo after the component is gone.
  useEffect(() => {
    return () => {
      if (dismissTimeoutRef.current !== null) {
        window.clearTimeout(dismissTimeoutRef.current);
      }
      clearAutoAdvance();
    };
  }, []);

  const onTransitionComplete = () => {
    canAdvanceRef.current = true;
    retireArmedRef.current = false;
    scheduleAutoAdvance();
  };

  return { outerRef, innerRef, activeIndex, isActive, dismissing, retired, onTransitionComplete };
}
