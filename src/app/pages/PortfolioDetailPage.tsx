import { useMemo } from 'react';
import { getPortfolioProjectBySlug, type DetailVisual } from '@/app/portfolioData';
import { Footer } from '@/app/components/Footer';

interface PortfolioDetailPageProps {
  slug: string;
}

function VisualBlock({ visual }: { visual: DetailVisual }) {
  if (visual.kind === 'image') {
    return (
      <div>
        <img src={visual.src} alt={visual.alt} className="block w-full rounded-lg object-contain" loading="lazy" />
      </div>
    );
  }

  if (visual.kind === 'image-row') {
    return (
      <div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {visual.items.map((item) => (
            <div key={item.src} className="overflow-hidden rounded-lg bg-[#f9f9f9]">
              <img src={item.src} alt={item.alt} className="block w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d9dde5] bg-[#f7f8fb] p-6 text-center">
      <p className="text-base font-semibold text-[#0f0f0f]">{visual.label}</p>
      <p className="mt-2 text-sm text-[#6b6b6b]">{visual.description}</p>
    </div>
  );
}

export function PortfolioDetailPage({ slug }: PortfolioDetailPageProps) {
  const project = useMemo(() => getPortfolioProjectBySlug(slug), [slug]);

  if (!project) {
    return (
      <main className="min-h-screen bg-[#f9f9f9] px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#e5e5e5] bg-white p-8 text-center shadow-sm md:p-12">
          <h1 className="text-3xl font-bold text-[#0f0f0f]">Portfolio case study not found</h1>
          <p className="mt-4 text-base text-[#6b6b6b]">The requested project does not exist. Return to the landing page and open a card from Selected Works.</p>
          <a
            href="#/"
            className="mt-8 inline-flex rounded-full border border-[#f05123] px-6 py-3 text-sm font-semibold text-[#f05123] transition-colors hover:bg-[#f05123] hover:text-white"
          >
            Back to Landing Page
          </a>
        </div>
      </main>
    );
  }

  const cuanxStats = ['Users', 'Rating', 'Uptime']
    .map((label) => project.detail.meta.find((item) => item.label.toLowerCase() === label.toLowerCase()))
    .filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <main
      className="bg-white text-[#0f0f0f]"
      style={{ fontFamily: "'Plus Jakarta Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <header className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-[120px]">
          <div className="flex h-20 items-center justify-between gap-4">
            <a
              href="#/work"
              className="inline-flex rounded-full border border-[#e5e5e5] bg-white px-4 py-2 text-sm font-medium text-[#0f0f0f] transition-colors hover:border-[#f05123] hover:text-[#f05123]"
            >
              Back to Selected Works
            </a>

            <div className="flex items-center gap-6 lg:gap-8">
              <a href="#/" className="flex items-center">
                <img src="/images/logo/gati_logo_transparent.svg" alt="GATI" className="h-6 w-auto" />
              </a>

              <nav className="hidden items-center gap-6 md:flex lg:gap-8">
                <a href="#about" className="text-sm text-[#0f0f0f] transition-colors duration-300 hover:text-[#f05123]">
                  About us
                </a>
                <a href="#work" className="text-sm text-[#0f0f0f] transition-colors duration-300 hover:text-[#f05123]">
                  Work
                </a>
                <a href="#contact" className="text-sm text-[#0f0f0f] transition-colors duration-300 hover:text-[#f05123]">
                  Contact us
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f8fb] to-white px-4 pb-14 pt-32 md:px-8 md:pt-36 min-[900px]:px-14 lg:px-[120px] lg:pt-40">
        <div className="mx-auto max-w-[1200px]">
          <span className="inline-block rounded-full bg-[#f05123] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white">
            Portfolio Case Study
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{project.detail.heroTitle}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6b6b6b] md:text-lg">{project.detail.heroSubtitle}</p>

          <div className="mt-10 grid gap-6 border-t-2 border-[#e5e5e5] pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {project.detail.meta.map((metaItem) => (
              <div key={metaItem.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6b6b6b]">{metaItem.label}</p>
                <p className="mt-2 text-2xl font-bold text-[#f05123]">{metaItem.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 lg:px-[120px] lg:py-20">
        <div className="space-y-16 md:space-y-20">
          {project.detail.sections.map((section, sectionIndex) => {
            const forceSingleColumn = sectionIndex !== 0;

            return (
              <article
                key={section.title}
                className={`grid items-center gap-8 lg:gap-12 ${forceSingleColumn ? 'grid-cols-1' : 'lg:grid-cols-2'}`}
              >
                <div className={forceSingleColumn ? 'order-1' : section.reverse ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}>
                <h2 className="text-3xl font-bold">{section.title}</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#6b6b6b]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-[#6b6b6b]">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={forceSingleColumn ? 'order-2' : section.reverse ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}>
                <VisualBlock visual={section.visual} />
              </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-6 lg:px-[120px]">
        <h2 className="text-3xl font-bold">{project.detail.whatWeBuiltTitle}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6b6b6b]">
          {project.detail.whatWeBuiltIntro}
        </p>
        <div className="mt-10 space-y-12">
          {project.detail.features.map((feature) => {
            const isSingleColumn = true;

            return (
              <article
                key={feature.title}
                className={`grid items-center gap-8 lg:gap-12 ${isSingleColumn ? 'grid-cols-1' : 'lg:grid-cols-2'}`}
              >
                <div
                  className={
                    feature.visual.kind === 'image-row'
                      ? 'order-1'
                      : 'order-1'
                  }
                >
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-[#6b6b6b]">{feature.description}</p>
              </div>
              <div
                className={
                  feature.visual.kind === 'image-row'
                    ? 'order-2'
                    : 'order-2'
                }
              >
                <VisualBlock visual={feature.visual} />
              </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-6 lg:px-[120px]">
        <h3 className="text-3xl font-bold">{project.detail.techTitle}</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {project.detail.tech.map((techItem) => (
            <article key={`${techItem.layer}-${techItem.name}`} className="rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#f05123]">{techItem.layer}</p>
              <h4 className="mt-2 text-xl font-bold text-[#0f0f0f]">{techItem.name}</h4>
              <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b]">{techItem.reason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] border-t-2 border-[#e5e5e5] px-4 pb-16 pt-12 md:px-6 lg:px-[120px] lg:pb-20">
        {project.slug === 'cuanx' ? (
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/portfolio/cuanx_download_background.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-8 md:p-10 lg:flex-row lg:items-start lg:justify-between lg:p-12">
              <div className="order-2 max-w-md lg:order-1">
                <h4 className="text-[1.5rem] font-extrabold text-[#0e4c4c] sm:text-[1.8rem]">Download CuanX App</h4>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-x-5 sm:gap-y-0">
                  <a
                    href="https://play.google.com/store/apps/details?id=co.id.cuanx.customer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                    aria-label="Download CuanX on Google Play"
                  >
                    <img src="/images/portfolio/google_play_button.png" alt="Get it on Google Play" className="h-14 w-auto sm:h-16" loading="lazy" />
                  </a>
                  <a
                    href="https://apps.apple.com/us/app/cuanx/id6754905079"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                    aria-label="Download CuanX on the App Store"
                  >
                    <img src="/images/portfolio/app_store_button.png" alt="Download on the App Store" className="h-14 w-auto sm:h-16" loading="lazy" />
                  </a>
                </div>
              </div>

              <div className="order-1 flex flex-wrap items-start justify-start gap-x-5 gap-y-3 sm:gap-x-6 lg:order-2 lg:gap-x-8">
                {cuanxStats.map((stat) => (
                  <div key={stat.label} className="text-left">
                    <p className="text-[0.8rem] font-extrabold leading-none text-[#0e4c4c] sm:text-[1.05rem]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[0.46rem] font-semibold text-[#0e4c4c] sm:text-[0.52rem]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[220px] items-center justify-center rounded-xl border-2 border-dashed border-[#d9dde5] bg-[#f7f8fb] p-6 text-center">
            <p className="text-sm font-semibold text-[#6b6b6b]">
              {project.detail.resultsEmbedTitle}
              <br />
              <small style={{ color: '#999999', fontSize: '0.85rem' }}>{project.detail.resultsEmbedNote}</small>
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
