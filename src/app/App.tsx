import { useEffect, useMemo, useState } from 'react';
import { LandingPage } from '@/app/pages/LandingPage';
import { PortfolioDetailPage } from '@/app/pages/PortfolioDetailPage';

type AppRoute =
  | { type: 'landing' }
  | { type: 'portfolio-detail'; slug: string };

function parseHashRoute(hashValue: string): AppRoute {
  if (hashValue.startsWith('#/portfolio/')) {
    const slug = hashValue.replace('#/portfolio/', '').trim();
    if (slug.length > 0) {
      return { type: 'portfolio-detail', slug };
    }
  }

  return { type: 'landing' };
}

export default function App() {
  const [hashValue, setHashValue] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const nextHashValue = window.location.hash;
      setHashValue(nextHashValue);

      const nextRoute = parseHashRoute(nextHashValue);

      if (nextRoute.type === 'portfolio-detail') {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const pendingLandingSection = sessionStorage.getItem('gati:pendingLandingSection');
      sessionStorage.removeItem('gati:canBackToLanding');

      if (!pendingLandingSection) {
        return;
      }

      sessionStorage.removeItem('gati:pendingLandingSection');

      const targetHash = `#${pendingLandingSection}`;

      if (nextHashValue !== targetHash) {
        window.history.replaceState(null, '', `/${targetHash}`);
      }

      window.requestAnimationFrame(() => {
        const targetSection = document.getElementById(pendingLandingSection);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const route = useMemo(() => parseHashRoute(hashValue), [hashValue]);

  if (route.type === 'portfolio-detail') {
    return <PortfolioDetailPage slug={route.slug} />;
  }

  return <LandingPage />;
}