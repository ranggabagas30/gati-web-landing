import { useScrollDrivenHero } from '@/app/hooks/useScrollDrivenHero';

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

export function HeroSection() {
  const { activeIndex, pinned } = useScrollDrivenHero(STATEMENTS.length);
  const statement = STATEMENTS[activeIndex];
  const isLast = activeIndex === STATEMENTS.length - 1;

  return (
    <section
      id="hero"
      className={`flex flex-col items-start justify-center bg-[var(--gati-dark)] px-6 py-24 md:px-16 ${
        pinned ? 'fixed inset-0 z-[5]' : 'relative'
      }`}
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="w-full">
        {statement.inverted && (
          <p className="mb-5 text-sm text-white/40 transition-opacity duration-300">{statement.sub}</p>
        )}

        <h2 className="flex flex-wrap gap-x-3 gap-y-1 text-[clamp(32px,4.5vw,68px)] font-extrabold leading-[1.1] tracking-tight text-white">
          {statement.words.map((word, i) => (
            <span
              key={`${activeIndex}-${i}`}
              className="inline-block transition-all duration-300"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {word}
            </span>
          ))}
        </h2>

        {!statement.inverted && (
          <p className="mt-6 max-w-[580px] text-base font-light leading-relaxed text-white/40 transition-opacity duration-300">
            {statement.sub}
          </p>
        )}
      </div>

      {isLast && (
        <div className="mt-12 flex items-center gap-7">
          <button className="inline-flex items-center gap-2.5 border border-white/15 bg-[#111] px-5 py-3.5 text-[13px] text-white transition-colors hover:border-white/40">
            Schedule a conversation <span className="text-[#f05123]">↗</span>
          </button>
        </div>
      )}

      {pinned && (
        <div className="absolute bottom-10 left-6 text-[11px] uppercase tracking-[0.1em] text-white/30 md:left-16">
          Scroll to continue — {activeIndex + 1} / {STATEMENTS.length}
        </div>
      )}
    </section>
  );
}
