import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isCaseStudyOverlayOpen } from '@/app/hooks/useCaseStudyHashSync';
import { NAV_HEIGHT_PX } from '@/app/components/Nav';

gsap.registerPlugin(ScrollTrigger);

const SWIPE_THRESHOLD_PX = 60;
const EASE = 'power1.inOut';
const SLIDE_DURATION = 1.1;

// The right pane is a static stack: every project is one full-pane-height card
// pinned at the same absolute inset-0 position, with only the top (active)
// card visible. Advancing does NOT translate the set — the target card stays
// exactly where it already is for the whole transition (it was always sitting
// beneath the outgoing card at the same viewport position) and is merely made
// visible as the outgoing card slides away on top of it. Forward: the current
// card slides up and off, revealing the next one already in place. Backward:
// the current card slides down and off, revealing the previous one. This is
// the "next slide stays put until the previous has fully slid out"
// choreography from the reference illustration.
//
// Unlike the GreenSock pen it's based on, this never wraps around — advancing
// past the last project or reversing past the first releases the pin with an
// explicit scrollTo into Footer/Expertise, the same "gate, don't loop" shape
// as the Hero's own gesture handling.
//
// `enabled` gates the pin to md+ (below that CLAUDE.md calls for a
// fully-stacked, simple layout, and gesture-hijacking scroll is fragile on
// touch) — the caller passes this from its own matchMedia check. This
// intentionally does NOT use ScrollTrigger.matchMedia: Hero's own effect
// calls ScrollTrigger.refresh() when it auto-retires, and that refresh was
// observed re-invoking a matchMedia condition function a second time without
// ever calling its previous cleanup — silently stacking a second pin/spacer
// on the same element and corrupting the trigger's start/end. A plain
// effect keyed on `enabled` (mirroring how Hero manages its own single
// ScrollTrigger.create directly) doesn't have that failure mode: a manual
// refresh() elsewhere just recomputes this trigger's position, since
// `enabled`/`projectCount` haven't changed.
export function useProjectSlideshow(projectCount: number, enabled: boolean) {
  const outerTriggerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);

  const outerWrapRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const activeIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const initialisedRef = useRef(false);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const setOuterWrapRef = (index: number) => (el: HTMLDivElement | null) => {
    outerWrapRefs.current[index] = el;
  };

  const gotoIndex = (index: number, direction: 1 | -1) => {
    if (index === activeIndexRef.current || animatingRef.current) return;
    if (index < 0 || index >= projectCount) return;
    animatingRef.current = true;
    const current = activeIndexRef.current;
    const currentEl = outerWrapRefs.current[current];
    const nextEl = outerWrapRefs.current[index];

    const tl = gsap.timeline({
      defaults: { duration: SLIDE_DURATION, ease: EASE },
      onComplete: () => {
        animatingRef.current = false;
      },
    });

    if (direction === 1) {
      // FORWARD: the current card slides up and off, revealing the next card
      // that was already sitting motionless beneath it (like peeling a card
      // off a stack). The outgoing card stays fully opaque the whole time —
      // the card below is exposed purely by the slide, no opacity fade.
      if (nextEl) gsap.set(nextEl, { autoAlpha: 1, zIndex: 1 });
      if (currentEl) gsap.set(currentEl, { zIndex: 2 });
      tl.to(currentEl, { yPercent: -100 }, 0)
        // After it's fully gone, park it hidden at rest and promote the
        // target to top. The target was motionless the entire time.
        .set(currentEl, { zIndex: 0, yPercent: 0, autoAlpha: 0 }, SLIDE_DURATION)
        .set(nextEl, { zIndex: 2 }, SLIDE_DURATION);
    } else {
      // REVERSE: the previous card returns to position — it slides back down
      // into place and re-covers the card that was on top. The returning card
      // was parked hidden at rest (yPercent 0); make it opaque and on top, then
      // slide it down from just above to settle back into position.
      if (nextEl) gsap.set(nextEl, { autoAlpha: 1, yPercent: 0, zIndex: 2 });
      if (currentEl) gsap.set(currentEl, { zIndex: 1 });
      tl.fromTo(nextEl, { yPercent: -100 }, { yPercent: 0 }, 0)
        .set(currentEl, { zIndex: 0 }, SLIDE_DURATION)
        .set(nextEl, { zIndex: 2 }, SLIDE_DURATION);
    }

    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  // Static bootstrap (no tween): card 0 visible on top, the rest hidden at
  // rest underneath.
  useEffect(() => {
    if (initialisedRef.current || projectCount < 1) return;
    if (outerWrapRefs.current.filter(Boolean).length < projectCount) return;
    initialisedRef.current = true;
    gsap.set(outerWrapRefs.current, { autoAlpha: 0, yPercent: 0, zIndex: 0 });
    gsap.set(outerWrapRefs.current[0], { autoAlpha: 1, zIndex: 2 });
  });

  useEffect(() => {
    if (!enabled || !outerTriggerRef.current || !paneRef.current || projectCount < 1) return;

    // Work mounts in the same synchronous effect pass as every section above
    // it, Hero included. Measuring immediately here can catch Hero's pin
    // machinery mid-setup (its pin-spacer not yet written to the DOM, its
    // own height not yet final), producing a start position far smaller
    // than the section's real location — and once a trigger's internal
    // entered/left bookkeeping latches onto a wrong boundary, later
    // ScrollTrigger.refresh() calls elsewhere (Hero calls one when it
    // retires) correct the start/end numbers but don't reliably re-sync
    // that bookkeeping against current scroll, so real scroll can end up
    // sailing straight through the "pinned" zone. Deferring creation by one
    // rAF — after the rest of this commit's mount effects have written to
    // the DOM and the browser has had a layout pass — means the very first
    // measurement is already correct, instead of needing a correction.
    const raf = requestAnimationFrame(() => {
      // Offsetting the scroller-side reference by the nav bar's height means
      // the pin locks with the section's top sitting just below the fixed nav
      // (top: NAV_HEIGHT_PX), instead of at the very top of the viewport where
      // the nav (z-20, fixed) would cover the slide's heading. GSAP pins at
      // whatever position satisfied `start`, so this holds for the whole
      // pinned duration, not just the first frame.
      //
      // end is deliberately modest (roughly one wheel tick of travel) so a
      // single un-prevented wheel at the edge reliably crosses the boundary
      // and lets GSAP unpin naturally — a full one-viewport end made real
      // scroll feel stuck/janky at the edges. It's still long enough to
      // engage the pin reliably on a normal scroll.
      // Reset the deck to the first card without animation when the user
      // re-enters the section from above (scrolling back up into Work from
      // the Footer side) — so they always start at CuanX, not wherever they
      // last left the deck.
      const resetToFirst = () => {
        if (activeIndexRef.current === 0) return;
        const prev = activeIndexRef.current;
        const prevEl = outerWrapRefs.current[prev];
        const firstEl = outerWrapRefs.current[0];
        if (firstEl) gsap.set(firstEl, { autoAlpha: 1, zIndex: 2 });
        if (prevEl) gsap.set(prevEl, { autoAlpha: 0, zIndex: 0 });
        activeIndexRef.current = 0;
        setActiveIndex(0);
      };

      pinTriggerRef.current = ScrollTrigger.create({
        trigger: outerTriggerRef.current,
        start: `top top+=${NAV_HEIGHT_PX}`,
        end: '+=150',
        pin: paneRef.current,
        onEnter: () => setIsActive(true),
        onEnterBack: () => {
          resetToFirst();
          setIsActive(true);
        },
        onLeave: () => setIsActive(false),
        onLeaveBack: () => setIsActive(false),
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      pinTriggerRef.current?.kill();
      pinTriggerRef.current = null;
      setIsActive(false);
    };
  }, [enabled, projectCount]);

  useEffect(() => {
    if (!isActive) return;

    // At the first/last slide, a wheel or swipe past the edge is NOT
    // preventDefault'd — native scroll is allowed to move. Because the pin's
    // end is only 60px past its start, a single tick at the edge reliably
    // crosses the boundary, GSAP fires onLeave/onLeaveBack and unpins
    // naturally, and real scroll carries through into Footer/Expertise. No
    // artificial scrollTo that fights GSAP's pin and feels like a janky jump.
    const onWheel = (e: WheelEvent) => {
      if (isCaseStudyOverlayOpen()) return;
      const direction: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (animatingRef.current) {
        e.preventDefault();
        return;
      }
      const current = activeIndexRef.current;
      const atForwardEdge = direction === 1 && current >= projectCount - 1;
      const atBackwardEdge = direction === -1 && current <= 0;
      if (atForwardEdge || atBackwardEdge) {
        return; // pass through — native scroll carries us out
      }
      e.preventDefault();
      gotoIndex(current + direction, direction);
    };

    let touchStartY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isCaseStudyOverlayOpen()) return;
      if (touchStartY === null) return;
      const currentY = e.touches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - currentY;
      if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
      const direction: 1 | -1 = delta > 0 ? 1 : -1;
      if (animatingRef.current) {
        e.preventDefault();
        return;
      }
      const current = activeIndexRef.current;
      const atForwardEdge = direction === 1 && current >= projectCount - 1;
      const atBackwardEdge = direction === -1 && current <= 0;
      if (atForwardEdge || atBackwardEdge) {
        touchStartY = currentY;
        return; // pass through — native scroll carries us out
      }
      e.preventDefault();
      gotoIndex(current + direction, direction);
      touchStartY = currentY;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isActive, projectCount]);

  return {
    outerTriggerRef,
    paneRef,
    setOuterWrapRef,
    activeIndex,
    gotoIndex,
  };
}
