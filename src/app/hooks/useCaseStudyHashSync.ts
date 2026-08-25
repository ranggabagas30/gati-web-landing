import { useCallback, useEffect, useState } from 'react';
import { isCaseStudySlug, type CaseStudySlug } from '@/app/data/caseStudyData';

function readSlugFromHash(): CaseStudySlug | null {
  const match = window.location.hash.match(/^#\/portfolio\/([a-z-]+)$/);
  const slug = match?.[1];
  return slug && isCaseStudySlug(slug) ? slug : null;
}

// The case-study overlay sits on top of the landing page (fixed, high
// z-index) without unmounting anything underneath it — Hero and the Work
// section's own gesture-capturing scroll listeners keep running unless they
// explicitly check for this. Reads the hash directly (the overlay's own
// source of truth) rather than tracking React state, so it's always
// synchronously correct inside a wheel/touch handler.
export function isCaseStudyOverlayOpen(): boolean {
  return readSlugFromHash() !== null;
}

export function useCaseStudyHashSync() {
  const [openSlug, setOpenSlug] = useState<CaseStudySlug | null>(() => readSlugFromHash());

  useEffect(() => {
    const onHashChange = () => setOpenSlug(readSlugFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const open = useCallback((slug: CaseStudySlug) => {
    window.location.hash = `#/portfolio/${slug}`;
    setOpenSlug(slug);
  }, []);

  const close = useCallback(() => {
    window.location.hash = '#/';
    setOpenSlug(null);
  }, []);

  return { openSlug, open, close };
}
