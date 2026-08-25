import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT } from '@/app/data/contactInfo';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: CONTACT.instagramHref },
  { label: 'LinkedIn', href: CONTACT.linkedinHref },
  { label: 'WhatsApp', href: CONTACT.whatsappHref },
];

const WORDMARK_PATHS = [
  'M242.58 29.18h39.15v106.53h28.69V29.18h39.24V5.05H242.58v24.13z',
  'M364.47 5.05h28.78v130.66h-28.78z',
];

export function FooterV2() {
  const footerRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const ctaCardRef = useRef<HTMLAnchorElement>(null);

  // Magnetic pull toward the cursor — matches the draft's .s6-cta-box exactly:
  // offset from the card's own center, damped more on y (0.12) than x (0.07),
  // fast-in on move / slower ease-out on leave.
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ctaCardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.07;
    const y = (e.clientY - r.top - r.height / 2) * 0.12;
    el.style.transition = 'transform 0.1s ease, background-color 0.2s ease';
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleCtaMouseLeave = () => {
    const el = ctaCardRef.current;
    if (!el) return;
    el.style.transition = `transform 0.45s ${EASE}, background-color 0.2s ease`;
    el.style.transform = 'translate(0, 0)';
  };

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    [topRef, contactRef].forEach((ref, index) => {
      if (!ref.current) return;
      const tween = gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%' },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    if (footerRef.current && wordmarkRef.current) {
      const tween = gsap.fromTo(
        wordmarkRef.current,
        { y: 0 },
        {
          y: 36,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="border-t-[0.5px] border-white/8 bg-[var(--gati-dark)]">
      <div ref={topRef} className="grid md:grid-cols-2">
        <div className="flex flex-col justify-end border-b-[0.5px] border-white/8 px-6 py-16 md:border-b-0 md:border-r-[0.5px] md:px-16 md:py-24">
          <h2 className="text-[clamp(36px,4.5vw,64px)] font-extrabold leading-[1.05] tracking-tight text-white">
            Name it.
            <br />
            We&apos;ve made it.
          </h2>
          <p className="mt-5 text-xs font-light leading-relaxed text-white/35">
            All prices are starting points.
            <br />
            Final scope is quoted after a conversation.
          </p>
        </div>

        <div className="flex items-stretch px-6 py-12 md:px-16 md:py-24">
          <a
            ref={ctaCardRef}
            href={CONTACT.scheduleHref}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            className="flex w-full min-h-[220px] flex-col justify-between rounded-2xl bg-[#0a0a0a] p-7 text-left text-white transition-colors hover:bg-[#161616]"
          >
            <span className="self-end text-4xl leading-none">↗</span>
            <span className="text-[clamp(20px,2.2vw,28px)] font-bold leading-[1.15] tracking-tight">
              Schedule
              <br />a conversation
            </span>
          </a>
        </div>
      </div>

      <div
        ref={contactRef}
        className="flex flex-col items-start justify-between gap-4 border-b-[0.5px] border-t-[0.5px] border-white/8 px-6 py-5 md:flex-row md:items-center md:px-16"
      >
        <a href={CONTACT.emailHref} className="text-[11.5px] font-light tracking-wide text-white/35 transition-colors hover:text-white/80">
          {CONTACT.email}
        </a>
        <div className="flex items-center gap-7">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/25 transition-colors hover:text-white/75"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="pt-12 leading-none">
        <div ref={wordmarkRef}>
          <svg viewBox="0 0 393.25 135.88" className="block w-full opacity-65" xmlns="http://www.w3.org/2000/svg">
            {WORDMARK_PATHS.map((d) => (
              <path key={d} d={d} fill="#f05123" />
            ))}
            <path
              fill="#f05123"
              d="M65.9,62.62v21.28h28.74c-.89,9.4-3.96,16.41-9.23,21.02-5.26,4.61-12.48,6.92-21.64,6.92-6.45,0-11.91-1.26-16.41-3.77-4.49-2.51-8.13-5.81-10.91-9.89-2.78-4.08-4.8-8.72-6.07-13.92-1.27-5.2-1.91-10.47-1.91-15.79,0-6.03.68-11.74,2.04-17.12,1.36-5.38,3.46-10.11,6.3-14.19,2.84-4.08,6.48-7.3,10.91-9.67,4.44-2.37,9.73-3.55,15.88-3.55,3.43,0,6.64.41,9.62,1.24,2.99.83,5.68,2.06,8.07,3.68,2.4,1.63,4.45,3.7,6.16,6.21,1.71,2.52,2.99,5.46,3.81,8.83h27.23c-.83-7.04-2.81-13.28-5.94-18.72-3.14-5.44-7.13-10.02-11.98-13.75-4.85-3.72-10.42-6.56-16.72-8.51-6.3-1.95-13.02-2.93-20.18-2.93-10.11,0-19.13,1.8-27.05,5.41-7.92,3.61-14.59,8.51-20,14.72-5.41,6.21-9.54,13.47-12.37,21.78C1.42,50.22,0,59.07,0,68.47s1.54,18.76,4.61,27.01c3.07,8.25,7.38,15.38,12.91,21.38,5.53,6,12.15,10.67,19.87,14.01,7.72,3.34,16.22,5.01,25.5,5.01.41,0,.81,0,1.22,0h0s.04,0,.06,0c5.47,0,19.39-1.82,29.23-6.89,7.91-4.07,14.7-10.31,19.6-20.14,1.96-3.93,3.87-9,4.89-16.43.61-4.43.94-8.66,1.15-12.82.29-5.64.15-11.09.12-16.74l-53.27-.24Z"
            />
            <path
              fill="#f05123"
              d="M167.46,6.43l-43.1,127.9h28.47l8.76-28.56h50.28l8.5,28.56h29.09L207.05,6.43h-39.59ZM168.25,84.92l17.88-57.34h1.8l17.29,57.34h-36.97Z"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}
