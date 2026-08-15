import { useEffect, useState } from 'react';
import { useIntroSequence } from '@/app/hooks/useIntroSequence';

export const NAV_HEIGHT_PX = 64;

const NAV_LINKS = [
  { label: 'About us', href: '#hero' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Work', href: '#work' },
  { label: 'Contact us', href: '#contact' },
];

export function Nav() {
  const { phase, enter } = useIntroSequence();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (phase === 'wall') {
      const trigger = () => enter();
      window.addEventListener('wheel', trigger, { passive: true, once: true });
      window.addEventListener('touchstart', trigger, { passive: true, once: true });
      return () => {
        window.removeEventListener('wheel', trigger);
        window.removeEventListener('touchstart', trigger);
      };
    }
  }, [phase, enter]);

  const showWall = phase === 'wall';
  const settled = phase === 'settled';

  return (
    <>
      <button
        type="button"
        onClick={enter}
        aria-label="Enter site"
        aria-hidden={!showWall}
        tabIndex={showWall ? 0 : -1}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--gati-cream)] transition-opacity duration-700"
        style={{ opacity: showWall ? 1 : 0, pointerEvents: showWall ? 'auto' : 'none' }}
      >
        <span className="animate-pulse text-[11px] font-light uppercase tracking-[0.14em] text-[#1a1a18] opacity-70">
          Tap to enter
        </span>
      </button>

      <nav
        className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-center border-b border-white/10 bg-[var(--gati-dark)]/90 backdrop-blur transition-opacity duration-500"
        style={{ opacity: showWall ? 0 : 1 }}
      >
        <div className="flex w-full max-w-[1440px] items-center justify-between px-6 md:px-16">
          <a href="#hero" className="text-lg font-extrabold tracking-tight text-[#f05123]">
            GATI
          </a>

          <ul
            className={`hidden items-center gap-8 md:flex transition-all duration-500 ${
              settled ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
            }`}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-white/75 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span className="h-[1.5px] w-6 bg-white" />
            <span className="h-[1.5px] w-6 bg-white" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-20 flex flex-col gap-4 border-b border-white/10 bg-[var(--gati-dark)] px-6 py-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-white/75"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
