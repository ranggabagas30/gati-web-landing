import { useEffect, useRef, useState } from 'react';
import { useIntroSequence } from '@/app/hooks/useIntroSequence';
import { HERO_RESTART_EVENT } from '@/app/hooks/useScrollDrivenHero';
import { GatiLogoMark } from '@/app/components/GatiLogoMark';

export const NAV_HEIGHT_PX = 64;

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

const NAV_LINKS = [
  { label: 'About us', href: '#hero' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Work', href: '#work' },
  { label: 'Contact us', href: '#contact' },
];

export function Nav() {
  const { phase, enter } = useIntroSequence();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navSlotRef = useRef<HTMLAnchorElement>(null);
  const bigLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === 'wall') {
      const trigger = () => enter();
      window.addEventListener('wheel', trigger, { passive: true, once: true });
      window.addEventListener('touchstart', trigger, { passive: true, once: true });
      window.addEventListener('keydown', trigger, { once: true });
      return () => {
        window.removeEventListener('wheel', trigger);
        window.removeEventListener('touchstart', trigger);
        window.removeEventListener('keydown', trigger);
      };
    }
  }, [phase, enter]);

  // The wall button is focusable while the wall is up, and becomes
  // `aria-hidden` + `tabIndex=-1` the instant it dismisses. If the button
  // still has focus when that happens (e.g. the user activated it with the
  // keyboard/Enter), the browser warns "Blocked aria-hidden on an element
  // because its descendant retained focus" and AT gets confused. Blur it
  // whenever the wall stops showing (phase leaves 'wall'), so no focused
  // element ever sits under aria-hidden — regardless of how the wall was
  // dismissed (click, wheel, touch, keydown).
  useEffect(() => {
    if (phase === 'wall') return;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [phase]);

  // The big centered logo physically flies to the small nav slot as the wall
  // dismisses — same technique as the draft: measure the slot's landing rect,
  // then transition top/left/width/transform to it from the logo's current
  // (CSS-centered) position.
  useEffect(() => {
    if (phase !== 'entering') return;
    const slot = navSlotRef.current;
    const big = bigLogoRef.current;
    if (!slot || !big) return;

    let cancelled = false;

    // Wait for webfonts before measuring the landing rect — Plus Jakarta Sans
    // renders the nav links at a different width than the fallback font
    // (measured ~8px shift in the slot's position on a cold load), which
    // shifts where the centered logo+links group actually settles. Measuring
    // before the swap freezes the flying logo at a stale target, so it
    // visibly jumps the instant the real, correctly-positioned slot fades in.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      const rect = slot.getBoundingClientRect();
      // The centering classes (-translate-x-1/2 -translate-y-1/2) apply via the
      // standalone CSS `translate` property, not `transform` — overriding
      // `transform` alone (as this used to) leaves that -50%/-50% offset fully
      // active, so the logo always lands half its own width/height off from
      // `top`/`left`, regardless of font timing. `translate` must be included
      // in the transition list too, so cancelling it animates smoothly with
      // top/left/width instead of snapping on the first frame.
      big.style.transition = `top .85s ${EASE}, left .85s ${EASE}, width .85s ${EASE}, translate .85s ${EASE}`;
      // Force a reflow so the transition above is registered before the next style change.
      void big.getBoundingClientRect();
      big.style.top = `${rect.top}px`;
      big.style.left = `${rect.left}px`;
      big.style.translate = '0px 0px';
      big.style.width = `${slot.offsetWidth}px`;
    });

    return () => {
      cancelled = true;
    };
  }, [phase]);

  // Keeps the flying logo mounted slightly past `settled` — the draft's own
  // runEntrance() does the same, with the exact comment "Show slot first,
  // then remove flying logo after slot has faded in — no flicker": the real
  // slot's opacity fade is 200ms, so removing the flying logo at the same
  // instant `settled` flips (before that fade finishes) leaves a gap where
  // neither is fully visible — a blink. Delaying removal by 220ms guarantees
  // the crossfade has completed first.
  const [bigLogoDone, setBigLogoDone] = useState(false);
  useEffect(() => {
    if (phase !== 'settled') return;
    const timer = setTimeout(() => setBigLogoDone(true), 220);
    return () => clearTimeout(timer);
  }, [phase]);

  const showWall = phase === 'wall';
  const settled = phase === 'settled';

  const restartHero = () => {
    window.dispatchEvent(new Event(HERO_RESTART_EVENT));
  };

  return (
    <>
      <button
        type="button"
        onClick={enter}
        aria-label="Enter site"
        aria-hidden={!showWall}
        tabIndex={showWall ? 0 : -1}
        className="fixed inset-0 z-[100] bg-[var(--gati-cream)] transition-opacity duration-700"
        style={{ opacity: showWall ? 1 : 0, pointerEvents: showWall ? 'auto' : 'none' }}
      />

      {!settled && (
        <span
          aria-hidden="true"
          className={`pointer-events-none fixed left-1/2 z-[105] -translate-x-1/2 whitespace-nowrap text-[11px] font-light uppercase tracking-[0.14em] text-[#1a1a18] transition-opacity duration-300 ${
            showWall ? 'animate-pulse opacity-35' : 'opacity-0'
          }`}
          style={{ top: 'calc(50% + clamp(52px, 7vw, 88px))' }}
        >
          Tap to enter
        </span>
      )}

      {!bigLogoDone && (
        <div
          ref={bigLogoRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-1/2 top-1/2 z-[150] w-[clamp(160px,22vw,260px)] -translate-x-1/2 -translate-y-1/2 select-none"
        >
          <GatiLogoMark className="block w-full" />
        </div>
      )}

      <nav
        className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-center border-b border-white/10 bg-[var(--gati-dark)]/90 backdrop-blur transition-opacity duration-500"
        style={{ opacity: showWall ? 0 : 1 }}
      >
        <div className="flex w-full items-center justify-between px-6 md:justify-center md:gap-9 md:px-16">
          <a
            href="#hero"
            onClick={restartHero}
            ref={navSlotRef}
            aria-label="GATI — back to top"
            className="block w-[72px] transition-opacity duration-200"
            style={{ opacity: settled ? 1 : 0 }}
          >
            <GatiLogoMark className="block w-full" />
          </a>

          <ul
            className={`hidden items-center gap-8 md:flex transition-all duration-500 ${
              settled ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
            }`}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={link.href === '#hero' ? restartHero : undefined}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span className="h-[1.5px] w-6 bg-white" />
            <span className="h-[1.5px] w-6 bg-white" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-20 flex flex-col gap-4 border-b border-white/10 bg-[var(--gati-dark)] px-6 py-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setMobileOpen(false);
                if (link.href === '#hero') restartHero();
              }}
              className="text-sm text-white/75"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
