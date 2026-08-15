import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePriceScramble } from '@/app/hooks/usePriceScramble';

gsap.registerPlugin(ScrollTrigger);

type ExpertiseCard = {
  number: string;
  title: string;
  price: number;
  description: string;
  hoverImage: string;
};

const EXPERTISE_CARDS: ExpertiseCard[] = [
  {
    number: '01',
    title: 'Super-App Platforms',
    price: 10000,
    description:
      'One app to replace forty. Built for scale from day one, designed for people who don’t have time to wait.',
    hoverImage: '/images/expertise/superapp_hover.png',
  },
  {
    number: '02',
    title: 'Complex Interactive Platforms',
    price: 5000,
    description: 'Real-time, high-stakes, deeply interactive. The kind of build most studios won’t touch. We start there.',
    hoverImage: '/images/expertise/interactive_hover.png',
  },
  {
    number: '03',
    title: 'Brand Websites',
    price: 2000,
    description: 'First impressions that hold up. Fast, precise, and built to say exactly what you mean — nothing more.',
    hoverImage: '/images/expertise/brand_hover.png',
  },
];

function ExpertiseCardItem({ card }: { card: ExpertiseCard }) {
  const { displayValue, onMouseEnter, onMouseLeave } = usePriceScramble(card.price);

  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden border-[0.5px] border-white/10 bg-[var(--gati-dark-surface)] p-9 pb-9 transition-colors duration-300 hover:border-[#f05123]/35"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] tracking-[0.1em] text-[#f05123]">{card.number}</span>
          <div className="text-right">
            <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.14em] text-white/40 transition-colors group-hover:text-white/40">
              typically starts at
            </span>
            <span className="block text-sm font-extrabold tracking-tight text-white/15 transition-colors group-hover:text-[#f05123] tabular-nums">
              {displayValue}
            </span>
          </div>
        </div>

        <h3 className="text-[clamp(20px,1.8vw,26px)] font-bold leading-[1.15] tracking-tight text-white">
          {card.title}
        </h3>
        <p className="mt-1 text-[13px] font-light leading-relaxed text-white/40">{card.description}</p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[80%] translate-y-full flex-col justify-end overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 [@media(hover:none)]:translate-y-[65%] [@media(hover:none)]:opacity-70">
        <div
          className="absolute inset-0 bg-cover bg-top opacity-45 transition-opacity duration-400 group-hover:opacity-55"
          style={{ backgroundImage: `url('${card.hoverImage}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(21,21,19,1) 0%, rgba(21,21,19,0.88) 38%, rgba(21,21,19,0.35) 70%, transparent 100%)',
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left scale-x-0 bg-[#f05123] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
    </article>
  );
}

export function ExpertiseSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (headerRef.current) {
      const tween = gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const tween = gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay: index * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section id="expertise" className="bg-[var(--gati-dark)] px-6 py-24 md:px-16">
      <div
        ref={headerRef}
        className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-start"
      >
        <span className="text-[13px] uppercase tracking-[0.18em] text-white/55">Expertise</span>
        <p className="max-w-[260px] text-[13px] font-light leading-relaxed text-white/35 md:text-right">
          Our clients started with one.
          <br />
          Most came back with three.
        </p>
      </div>

      <div className="grid grid-cols-1 border-[0.5px] border-white/10 md:grid-cols-3">
        {EXPERTISE_CARDS.map((card, index) => (
          <div key={card.number} ref={(el) => (cardsRef.current[index] = el)}>
            <ExpertiseCardItem card={card} />
          </div>
        ))}
      </div>
    </section>
  );
}
