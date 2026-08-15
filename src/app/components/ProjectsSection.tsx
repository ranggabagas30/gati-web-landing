import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProjectScrollSpy } from '@/app/hooks/useProjectScrollSpy';
import { NAV_HEIGHT_PX } from '@/app/components/Nav';
import type { CaseStudySlug } from '@/app/data/caseStudyData';

gsap.registerPlugin(ScrollTrigger);

type ProjectSummary = {
  slug: CaseStudySlug;
  client: string;
  year: string;
  type: string;
  status: string;
  platform: string;
  story: string;
  image: string;
};

const PROJECTS: ProjectSummary[] = [
  {
    slug: 'cuanx',
    client: 'CuanX',
    year: '2023',
    type: 'Super-App',
    status: 'Live',
    platform: 'iOS + Android',
    story:
      'Indonesians were opening 40 apps to do what should take one. We had a year to fix that. 100,000 users later, with >99% uptime and millions in daily transactions — it’s fixed.',
    image: '/images/portfolio/cuanx1.webp',
  },
  {
    slug: 'football-money',
    client: 'Football Money',
    year: '2023',
    type: 'Game Platform',
    status: 'Public Beta',
    platform: 'iOS + Android',
    story:
      'Fantasy football, but your picks actually move the market. Player prices shift in real-time during matches. Buy low, sell high, beat your friends. Concept to public beta in 6 months.',
    image: '/images/portfolio/footballmoney1.webp',
  },
  {
    slug: 'flutter-iptv',
    client: 'Flutter IPTV',
    year: '2023',
    type: 'IPTV App',
    status: 'Beta Live',
    platform: 'STB Devices',
    story:
      '15 seconds to load. 400MB RAM. Running on hardware from 2017. We had 3 months to fix all of it. We got startup down to 3 seconds. On the same hardware.',
    image: '/images/portfolio/iptv1.webp',
  },
];

export function ProjectsSection({ onViewCaseStudy }: { onViewCaseStudy: (slug: CaseStudySlug) => void }) {
  const rowRefs = useRef(PROJECTS.map(() => ({ current: null }) as React.RefObject<HTMLDivElement>));
  const activeIndex = useProjectScrollSpy(rowRefs.current);
  const active = PROJECTS[activeIndex];

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    rowRefs.current.forEach((ref, index) => {
      if (!ref.current) return;
      const tween = gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section id="work" className="bg-[var(--gati-dark)]">
      <div className="grid items-start border-t-[0.5px] border-white/8 md:grid-cols-[300px_1fr]">
        <div
          className="sticky flex flex-col border-r-[0.5px] border-white/8 px-10 py-14"
          style={{ top: `${NAV_HEIGHT_PX}px`, height: `calc(100vh - ${NAV_HEIGHT_PX}px)` }}
        >
          <span className="mb-8 text-[13px] uppercase tracking-[0.18em] text-white/55">Selected Projects</span>

          <nav className="mb-9 flex flex-col">
            {PROJECTS.map((project, index) => (
              <div
                key={project.slug}
                className={`flex items-center gap-3.5 border-b-[0.5px] border-white/6 py-2.5 first:border-t-[0.5px] ${
                  index === activeIndex ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <span className={`min-w-[22px] text-[10px] tracking-[0.1em] ${index === activeIndex ? 'text-[#f05123]' : 'text-white/20'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`text-[13px] ${index === activeIndex ? 'font-semibold text-white' : 'text-white/38'}`}>
                  {project.client}
                </span>
              </div>
            ))}
          </nav>

          <div className="mb-4 flex flex-1 flex-col overflow-hidden transition-opacity duration-200">
            <div className="mb-4 flex flex-col">
              {(
                [
                  ['Client', active.client],
                  ['Year', active.year],
                  ['Type', active.type],
                  ['Status', active.status],
                  ['Platform', active.platform],
                ] as const
              ).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between gap-3 border-b-[0.5px] border-white/5 py-1.5">
                  <span className="text-[9px] uppercase tracking-[0.14em] text-white/20">{key}</span>
                  <span className="text-right text-[10px] text-white/55">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-[12.5px] font-light leading-relaxed text-white/38">{active.story}</p>
          </div>

          <button className="mt-auto flex w-full items-center justify-between gap-2.5 border-[0.5px] border-white/12 bg-[#111] px-4 py-3 text-xs text-white transition-colors hover:border-white/35">
            Schedule a conversation <span className="text-[#f05123]">↗</span>
          </button>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
            <div
              key={project.slug}
              ref={rowRefs.current[index]}
              className="border-b-[0.5px] border-white/6 px-16 py-16 last:border-b-0"
            >
              <div className="mb-6 flex items-end justify-between">
                <h3 className="text-[clamp(26px,3vw,42px)] font-bold tracking-tight text-white">{project.client}</h3>
                <span className="pb-1.5 text-[10px] uppercase tracking-[0.14em] text-white/18">
                  {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                </span>
              </div>

              <div
                className="relative aspect-video w-full overflow-hidden border-[0.5px] border-white/7 bg-[#111210] bg-cover bg-center"
                style={{ backgroundImage: `url('${project.image}')` }}
              />

              <div className="mt-3.5 flex flex-wrap gap-0 border-t-[0.5px] border-white/6 pt-3.5">
                {(
                  [
                    `Status: ${project.status}`,
                    `Platform: ${project.platform}`,
                    `Type: ${project.type}`,
                    `Year: ${project.year}`,
                  ] as const
                ).map((item) => (
                  <span
                    key={item}
                    className="mr-4.5 border-r-[0.5px] border-white/8 pr-4.5 text-[9px] uppercase tracking-[0.1em] text-white/28 last:mr-0 last:border-r-0 last:pr-0"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onViewCaseStudy(project.slug)}
                className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#f05123] transition-opacity hover:opacity-70"
              >
                View Case Study <span className="text-[13px]">↗</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
