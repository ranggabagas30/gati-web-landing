import { useCallback, useEffect, useState } from 'react';
import { isCaseStudySlug, type CaseStudySlug } from '@/app/data/caseStudyData';

function readSlugFromHash(): CaseStudySlug | null {
  const match = window.location.hash.match(/^#\/portfolio\/([a-z-]+)$/);
  const slug = match?.[1];
  return slug && isCaseStudySlug(slug) ? slug : null;
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
