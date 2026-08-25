import { lazy, Suspense, useEffect } from 'react';
import { useCaseStudyHashSync } from '@/app/hooks/useCaseStudyHashSync';
import { getCaseStudyBySlug } from '@/app/data/caseStudyData';

const CuanXCaseStudy = lazy(() => import('@/app/components/caseStudy/CuanXCaseStudy'));
const FootballMoneyCaseStudy = lazy(() => import('@/app/components/caseStudy/FootballMoneyCaseStudy'));
const FlutterIptvCaseStudy = lazy(() => import('@/app/components/caseStudy/FlutterIptvCaseStudy'));

export function CaseStudyOverlay() {
  const { openSlug, close } = useCaseStudyHashSync();
  const isOpen = openSlug !== null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const label = openSlug ? getCaseStudyBySlug(openSlug)?.label ?? '' : '';

  return (
    <div
      id="case-study-scroll"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[500] overflow-y-auto overflow-x-hidden bg-[var(--gati-dark)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b-[0.5px] border-white/7 bg-[var(--gati-dark)]/90 px-12 py-4.5 backdrop-blur-md">
        <button
          type="button"
          onClick={close}
          className="group inline-flex items-center gap-0 px-0.5 py-1.5 transition-all"
        >
          <span className="text-xl font-bold text-[#f05123] transition-transform group-hover:-translate-x-1">
            ←
          </span>
          <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-xs text-white/65 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[220px]">
            Back to Selected Works
          </span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#f05123]">GATI</span>
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/28">{label}</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-[0.5px] border-white/18 text-white/50 transition-colors hover:border-white/45 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {isOpen && (
        <Suspense fallback={<div className="px-12 py-24 text-white/40">Loading case study…</div>}>
          {openSlug === 'cuanx' && <CuanXCaseStudy onClose={close} />}
          {openSlug === 'football-money' && <FootballMoneyCaseStudy onClose={close} />}
          {openSlug === 'flutter-iptv' && <FlutterIptvCaseStudy onClose={close} />}
        </Suspense>
      )}
    </div>
  );
}
