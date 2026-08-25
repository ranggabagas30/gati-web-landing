import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProjectScrollSpy } from '@/app/hooks/useProjectScrollSpy';
import { useProjectSlideshow } from '@/app/hooks/useProjectSlideshow';
import { NAV_HEIGHT_PX } from '@/app/components/Nav';
import type { CaseStudySlug } from '@/app/data/caseStudyData';
import { CONTACT } from '@/app/data/contactInfo';

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
    image: '/images/portfolio/cuanx_project_thumbnail.png',
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
    image: '/images/portfolio/footballmoney_project_thumbnail.png',
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
    image: '/images/portfolio/iptv_project_thumbnail.png',
  },
];

const TAGS = (project: ProjectSummary) =>
  [`Status: ${project.status}`, `Platform: ${project.platform}`, `Type: ${project.type}`, `Year: ${project.year}`] as const;

// The pinned slideshow only applies at md+ (see useProjectSlideshow's own
// ScrollTrigger.matchMedia gate); below that, the section keeps its original
// scrollable-stack behavior untouched. This tracks which one should drive
// the shared sidebar's active project.
function useIsDesktopViewport() {
  const query = '(min-width: 768px)';
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return matches;
}

export function ProjectsSection({ onViewCaseStudy }: { onViewCaseStudy: (slug: CaseStudySlug) => void }) {
  const isDesktop = useIsDesktopViewport();

  const slideshow = useProjectSlideshow(PROJECTS.length, isDesktop);

  const rowRefs = useRef(PROJECTS.map(() => ({ current: null }) as React.RefObject<HTMLDivElement>));
  const scrollSpyIndex = useProjectScrollSpy(rowRefs.current);

  const activeIndex = isDesktop ? slideshow.activeIndex : scrollSpyIndex;
  const active = PROJECTS[activeIndex];

  const handleRailClick = (index: number) => {
    if (isDesktop) {
      slideshow.gotoIndex(index, index > slideshow.activeIndex ? 1 : -1);
    } else {
      rowRefs.current[index].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Mobile/tablet entrance fade — unchanged from before the desktop section
  // grew its own curtain-reveal transitions.
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
              <button
                key={project.slug}
                type="button"
                onClick={() => handleRailClick(index)}
                className={`flex items-center gap-3.5 border-b-[0.5px] border-white/6 py-2.5 text-left first:border-t-[0.5px] ${
                  index === activeIndex ? 'opacity-100' : 'opacity-60 hover:opacity-85'
                }`}
              >
                <span className={`min-w-[22px] text-[10px] tracking-[0.1em] ${index === activeIndex ? 'text-[#f05123]' : 'text-white/20'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`text-[13px] ${index === activeIndex ? 'font-semibold text-white' : 'text-white/38'}`}>
                  {project.client}
                </span>
              </button>
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

          <a
            href={CONTACT.scheduleHref}
            className="mt-auto flex w-full items-center justify-between gap-2.5 border-[0.5px] border-white/12 bg-[#111] px-4 py-3 text-xs text-white transition-colors hover:border-white/35"
          >
            Schedule a conversation <span className="text-[#f05123]">↗</span>
          </a>
        </div>

        {/* Desktop (md+): pinned, gesture-driven static-deck slideshow — every
            project is one full-pane-height card stacked at the same inset-0
            position, and only the top (active) card is visible. Advancing
            slides the outgoing card away, revealing the next card that was
            already sitting motionless in place underneath. */}
        <div ref={slideshow.outerTriggerRef} className="relative hidden md:block">
          <div
            ref={slideshow.paneRef}
            className="relative w-full overflow-hidden"
            style={{ height: `calc(100vh - ${NAV_HEIGHT_PX}px)` }}
          >
            {PROJECTS.map((project, index) => (
              <div
                key={project.slug}
                ref={slideshow.setOuterWrapRef(index)}
                className="absolute inset-0 flex w-full flex-col justify-center bg-[var(--gati-dark)] px-16"
              >
                {/* mb-6 gives each card's content a 24px margin below it that
                    travels with the card during the peel — a consistent
                    per-card bottom margin, unlike bottom-6 which pinned the
                    card bottom and stretched the visible gap while sliding. */}
                <div className="mb-6 mt-16 bg-blue-500">
                  <div className="mb-6 flex items-end justify-between">
                    <h3 className="text-[clamp(26px,3vw,42px)] font-bold tracking-tight text-white">{project.client}</h3>
                    <span className="pb-1.5 text-[10px] uppercase tracking-[0.14em] text-white/18">
                      {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="relative aspect-video w-full overflow-hidden border-[0.5px] border-white/7 bg-[#111210]">
                    <div
                      className="absolute inset-0 h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    />
                  </div>

                  <div className="mt-3.5 flex flex-wrap gap-0 border-t-[0.5px] border-white/6 pt-3.5">
                    {TAGS(project).map((item) => (
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
                    className="mt-5 inline-flex w-fit items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#f05123] transition-opacity hover:opacity-70"
                  >
                    View Case Study <span className="text-[13px]">↗</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/tablet (< md): original scrollable stack, unchanged. */}
        <div className="flex flex-col md:hidden">
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
                {TAGS(project).map((item) => (
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
