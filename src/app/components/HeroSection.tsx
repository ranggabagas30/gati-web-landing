import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollDrivenHero } from '@/app/hooks/useScrollDrivenHero';
import { INTRO_ENTERING_EVENT } from '@/app/hooks/useIntroSequence';
import { CONTACT } from '@/app/data/contactInfo';

const EASE = 'cubic-bezier(0.76,0,0.24,1)';

const STATEMENTS = [
  {
    words: ['Trust', 'is', 'a', 'strange', 'thing.'],
    sub: "It's the one thing that you can get addicted to — once you meet the right team.",
    inverted: false,
  },
  {
    words: ['Complicated', 'to', 'unconventional.'],
    sub: 'Our clients keep adding to the plate once they see what we can do. The brief changes. Our standards don’t.',
    inverted: false,
  },
  {
    words: ['Name', 'it.', "We've", 'made', 'it.'],
    sub: "We've been asked to build some strange things. We said yes to most of them.",
    inverted: true,
  },
];

type StatementEls = {
  words: (HTMLSpanElement | null)[];
  sub: HTMLParagraphElement | null;
};

function hideStatementInstantly(els: StatementEls) {
  const words = els.words.filter((w): w is HTMLSpanElement => !!w);
  gsap.set(words, { y: 70, opacity: 0 });
  if (els.sub) gsap.set(els.sub, { y: 18, opacity: 0 });
}

function buildExitTimeline(els: StatementEls): gsap.core.Timeline {
  const words = els.words.filter((w): w is HTMLSpanElement => !!w);
  const tl = gsap.timeline();
  tl.to(words, { y: -60, opacity: 0, duration: 0.38, ease: EASE }, 0);
  if (els.sub) tl.to(els.sub, { y: -16, opacity: 0, duration: 0.3, ease: 'power1.out' }, 0);
  return tl;
}

function buildEnterTimeline(els: StatementEls, inverted: boolean): gsap.core.Timeline {
  const words = els.words.filter((w): w is HTMLSpanElement => !!w);
  const stagger = Math.min(0.075, 0.55 / words.length);
  const tl = gsap.timeline();

  if (inverted) {
    if (els.sub) tl.to(els.sub, { y: 0, opacity: 1, duration: 0.6, ease: EASE }, 0);
    tl.to(words, { y: 0, opacity: 1, duration: 0.55, ease: EASE, stagger }, 0.5);
  } else {
    tl.to(words, { y: 0, opacity: 1, duration: 0.55, ease: EASE, stagger }, 0);
    const wordsEnd = (words.length - 1) * stagger + 0.55;
    if (els.sub) tl.to(els.sub, { y: 0, opacity: 1, duration: 0.6, ease: EASE }, wordsEnd);
  }
  return tl;
}

export function HeroSection() {
  const { outerRef, innerRef, activeIndex, isActive, dismissing, retired, onTransitionComplete } = useScrollDrivenHero(
    STATEMENTS.length
  );
  const elsRef = useRef<StatementEls[]>(STATEMENTS.map(() => ({ words: [], sub: null })));
  const ctaRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Play the first statement's enter animation once the intro wall actually starts
  // dismissing — not unconditionally on mount, which would run it hidden behind the
  // wall and have it already finished by the time the user ever sees the page.
  // canAdvance starts false in the hook precisely so a scroll before this fires (or
  // before it finishes) can't skip past it before onTransitionComplete runs.
  useEffect(() => {
    const play = () => {
      const tl = gsap.timeline({ onComplete: onTransitionComplete });
      tl.add(buildEnterTimeline(elsRef.current[0], STATEMENTS[0].inverted));
      timelineRef.current = tl;
    };
    window.addEventListener(INTRO_ENTERING_EVENT, play, { once: true });
    return () => window.removeEventListener(INTRO_ENTERING_EVENT, play);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    if (prevIndex === activeIndex) return;

    timelineRef.current?.kill();

    // Force any statement that isn't part of this transition back to hidden —
    // guards against stale mid-animation state from an interrupted prior transition.
    elsRef.current.forEach((els, idx) => {
      if (idx !== prevIndex && idx !== activeIndex) hideStatementInstantly(els);
    });

    const isLast = activeIndex === STATEMENTS.length - 1;

    const prevEls = elsRef.current[prevIndex];
    const nextEls = elsRef.current[activeIndex];
    const nextInverted = STATEMENTS[activeIndex].inverted;

    // onTransitionComplete unblocks scrolling as soon as the statement text itself
    // has finished entering — via master.call(), positioned right after the enter
    // step, not the timeline's own onComplete. The CTA reveal is still a step in
    // this same timeline (so its '+=0.5' delay stays relative to the enter step
    // finishing), but it no longer gates input: previously, scrolling again on the
    // last statement was silently dropped for the ~0.5s gap + 0.6s CTA fade after
    // the words settled, with no feedback that anything happened.
    const master = gsap.timeline();
    master.add(buildExitTimeline(prevEls));
    master.add(buildEnterTimeline(nextEls, nextInverted));
    master.call(onTransitionComplete);
    if (isLast && ctaRef.current) {
      master.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: EASE }, '+=0.5');
    }
    timelineRef.current = master;

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollToExpertise = () => {
    document.getElementById('expertise')?.scrollIntoView();
  };

  return (
    <div
      ref={outerRef}
      id="hero"
      className="relative overflow-hidden bg-[var(--gati-dark)]"
      style={{ height: retired ? 0 : '100vh' }}
    >
      <div
        ref={innerRef}
        className={`relative z-[5] flex flex-col items-start justify-center overflow-hidden bg-[var(--gati-dark)] px-6 py-24 md:px-16 ${
          retired ? 'h-0' : 'h-screen'
        }`}
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          // Shrink-into-a-card + delayed slide-up dismissal: margin/border-radius/
          // box-shadow start immediately (0.5s), transform is delayed 0.3s and
          // takes 0.75s — the overlap is what reads as one continuous motion
          // rather than two separate steps. Instant (no transition) otherwise, so
          // a restart snaps cleanly back instead of visibly un-crumpling.
          transition: dismissing
            ? `margin 0.5s ${EASE}, border-radius 0.5s ${EASE}, transform 0.75s ${EASE} 0.3s, box-shadow 0.5s ease`
            : 'none',
          margin: dismissing ? '28px' : '0px',
          borderRadius: dismissing ? '20px' : '0px',
          boxShadow: dismissing ? '0 24px 80px rgba(0,0,0,0.6)' : 'none',
          transform: dismissing ? 'translateY(-110%)' : 'translateY(0)',
        }}
      >
        <div className="grid w-full">
          {STATEMENTS.map((statement, index) => (
            <div key={index} className="col-start-1 row-start-1">
              {statement.inverted && (
                <p
                  ref={(el) => {
                    elsRef.current[index].sub = el;
                  }}
                  className="mb-5 text-sm text-white/40"
                  style={{ opacity: 0, transform: 'translateY(18px)' }}
                >
                  {statement.sub}
                </p>
              )}

              <h2
                className={`flex flex-wrap gap-x-3 gap-y-1 font-extrabold leading-[1.1] tracking-tight text-white ${
                  statement.inverted ? 'text-[clamp(42px,6vw,88px)]' : 'text-[clamp(32px,4.5vw,68px)]'
                }`}
              >
                {statement.words.map((word, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      elsRef.current[index].words[i] = el;
                    }}
                    className="inline-block"
                    style={{ opacity: 0, transform: 'translateY(70px)' }}
                  >
                    {word}
                  </span>
                ))}
              </h2>

              {!statement.inverted && (
                <p
                  ref={(el) => {
                    elsRef.current[index].sub = el;
                  }}
                  className="mt-6 max-w-[580px] text-base font-light leading-relaxed text-white/40"
                  style={{ opacity: 0, transform: 'translateY(18px)' }}
                >
                  {statement.sub}
                </p>
              )}
            </div>
          ))}
        </div>

        {activeIndex === STATEMENTS.length - 1 && (
          <div ref={ctaRef} className="mt-12 flex items-center gap-7" style={{ opacity: 0, transform: 'translateY(28px)' }}>
            <a
              href={CONTACT.scheduleHref}
              className="inline-flex items-center gap-2.5 border border-white/15 bg-[#111] px-5 py-3.5 text-[13px] text-white transition-colors hover:border-white/40"
            >
              Schedule a conversation <span className="text-[#f05123]">↗</span>
            </a>
            <span
              aria-hidden="true"
              className="text-[15px] text-white/28 [animation:gati-scroll-pulse_1.8s_ease-in-out_infinite]"
            >
              ↓
            </span>
          </div>
        )}

        {isActive && (
          <div className="absolute bottom-10 right-6 text-[11px] uppercase tracking-[0.1em] text-white/30 md:right-16">
            Scroll to continue — {activeIndex + 1} / {STATEMENTS.length}
          </div>
        )}
      </div>

      {isActive && (
        <div className="fixed bottom-7 left-8 z-20 flex flex-col items-start gap-2">
          <span className="max-w-[280px] text-[11px] font-light leading-[1.55] text-white/45">
            At GATI's intersection of Engineering &amp; Art,
            <br />
            we cultivate progress.
          </span>
          <button
            type="button"
            onClick={scrollToExpertise}
            className="text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-70"
          >
            Explore ↓
          </button>
        </div>
      )}
    </div>
  );
}
