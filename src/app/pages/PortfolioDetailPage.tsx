import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronLeft } from 'lucide-react';
import { getPortfolioProjectBySlug, type DetailVisual } from '@/app/portfolioData';
import { FooterV2 } from '@/app/components/FooterV2';

interface PortfolioDetailPageProps {
  slug: string;
}

type ZoomLevel = 'fit' | 'zoom150' | 'zoom200';

function getNextZoomLevel(currentLevel: ZoomLevel | null): ZoomLevel {
  if (!currentLevel) {
    return 'fit';
  }

  if (currentLevel === 'fit') {
    return 'zoom150';
  }

  if (currentLevel === 'zoom150') {
    return 'zoom200';
  }

  return 'fit';
}

function VisualBlock({ visual, reduceImageSize = false }: { visual: DetailVisual; reduceImageSize?: boolean }) {
  if (visual.kind === 'image') {
    const [zoomLevel, setZoomLevel] = useState<ZoomLevel | null>(null);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const zoomedImageRef = useRef<HTMLImageElement | null>(null);
    const panRafRef = useRef<number | null>(null);
    const pendingPanRef = useRef<{ x: number; y: number } | null>(null);
    const dragStateRef = useRef({
      pointerId: -1,
      startX: 0,
      startY: 0,
      originX: 0,
      originY: 0,
      moved: false,
    });

    const isZoomEnabled = visual.src === '/images/portfolio/cuanx_jira.png';
    const singleColumnClassName = visual.singleColumnClassName ?? 'h-[384px]';
    const inlineImageClassName = reduceImageSize
      ? `block ${singleColumnClassName} w-auto max-w-full rounded-lg object-contain`
      : 'block h-[384px] w-auto max-w-full rounded-lg object-contain lg:h-auto lg:w-full';
    const isZoomOpen = zoomLevel !== null;
    const scaleByLevel: Record<ZoomLevel, number> = {
      fit: 1,
      zoom150: 1.5,
      zoom200: 2,
    };
    const zoomScale = zoomLevel ? scaleByLevel[zoomLevel] : 1;
    const canPan = zoomLevel === 'zoom150' || zoomLevel === 'zoom200';

    const resetPan = () => {
      setPanOffset({ x: 0, y: 0 });
      pendingPanRef.current = null;
      dragStateRef.current.moved = false;
    };

    const closeZoom = () => {
      setZoomLevel(null);
      resetPan();
      setIsDragging(false);
    };

    const getBoundedPan = (nextX: number, nextY: number, nextScale: number) => {
      const viewportEl = viewportRef.current;
      const imageEl = zoomedImageRef.current;

      if (!viewportEl || !imageEl) {
        return { x: nextX, y: nextY };
      }

      const viewportWidth = viewportEl.clientWidth;
      const viewportHeight = viewportEl.clientHeight;
      const baseImageWidth = imageEl.offsetWidth;
      const baseImageHeight = imageEl.offsetHeight;
      const maxX = Math.max(0, (baseImageWidth * nextScale - viewportWidth) / 2);
      const maxY = Math.max(0, (baseImageHeight * nextScale - viewportHeight) / 2);

      return {
        x: Math.min(maxX, Math.max(-maxX, nextX)),
        y: Math.min(maxY, Math.max(-maxY, nextY)),
      };
    };

    const stepDownOrClose = () => {
      setZoomLevel((currentLevel) => {
        if (currentLevel === 'zoom200') {
          return 'zoom150';
        }

        if (currentLevel === 'zoom150') {
          return 'fit';
        }

        return null;
      });

      resetPan();
      setIsDragging(false);
    };

    const handleInlineImageClick = () => {
      setZoomLevel('fit');
      resetPan();
      setIsDragging(false);
    };

    const handleZoomedImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
      if (dragStateRef.current.moved) {
        dragStateRef.current.moved = false;
        return;
      }

      const currentLevel = zoomLevel;
      const nextLevel = getNextZoomLevel(currentLevel);

      if (!currentLevel) {
        setZoomLevel(nextLevel);
        resetPan();
        setIsDragging(false);
        return;
      }

      if (nextLevel === 'fit') {
        setZoomLevel(nextLevel);
        resetPan();
        setIsDragging(false);
        return;
      }

      const currentScale = scaleByLevel[currentLevel];
      const nextScale = scaleByLevel[nextLevel];
      const zoomedImage = zoomedImageRef.current;

      if (!zoomedImage) {
        setZoomLevel(nextLevel);
        return;
      }

      const rect = zoomedImage.getBoundingClientRect();
      const imageCenterX = rect.left + rect.width / 2;
      const imageCenterY = rect.top + rect.height / 2;
      const pointerDeltaX = event.clientX - imageCenterX;
      const pointerDeltaY = event.clientY - imageCenterY;
      const scaleRatio = nextScale / currentScale;
      const currentPan = pendingPanRef.current ?? panOffset;

      const nextPan = getBoundedPan(
        currentPan.x + pointerDeltaX * (1 - scaleRatio),
        currentPan.y + pointerDeltaY * (1 - scaleRatio),
        nextScale,
      );

      setPanOffset(nextPan);
      pendingPanRef.current = nextPan;
      setZoomLevel(nextLevel);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
      if (!canPan) {
        return;
      }

      event.preventDefault();

      dragStateRef.current.pointerId = event.pointerId;
      dragStateRef.current.startX = event.clientX;
      dragStateRef.current.startY = event.clientY;
      dragStateRef.current.originX = panOffset.x;
      dragStateRef.current.originY = panOffset.y;
      dragStateRef.current.moved = false;

      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
      if (!canPan || !isDragging || dragStateRef.current.pointerId !== event.pointerId) {
        return;
      }

      event.preventDefault();

      const deltaX = event.clientX - dragStateRef.current.startX;
      const deltaY = event.clientY - dragStateRef.current.startY;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        dragStateRef.current.moved = true;
      }

      const boundedPan = getBoundedPan(
        dragStateRef.current.originX + deltaX,
        dragStateRef.current.originY + deltaY,
        zoomScale,
      );

      pendingPanRef.current = boundedPan;

      if (panRafRef.current !== null) {
        return;
      }

      panRafRef.current = window.requestAnimationFrame(() => {
        if (pendingPanRef.current) {
          setPanOffset(pendingPanRef.current);
        }

        panRafRef.current = null;
      });
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
      if (dragStateRef.current.pointerId !== event.pointerId) {
        return;
      }

      setIsDragging(false);
      dragStateRef.current.pointerId = -1;
      event.currentTarget.releasePointerCapture(event.pointerId);
    };

    const handleDialogOpenChange = (open: boolean) => {
      if (!open) {
        closeZoom();
      }
    };

    useEffect(() => {
      if (!isZoomOpen) {
        return;
      }

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') {
          return;
        }

        event.preventDefault();
        stepDownOrClose();
      };

      window.addEventListener('keydown', handleEscape, true);

      return () => {
        window.removeEventListener('keydown', handleEscape, true);
      };
    }, [isZoomOpen, zoomLevel]);

    useEffect(() => {
      return () => {
        if (panRafRef.current !== null) {
          window.cancelAnimationFrame(panRafRef.current);
        }
      };
    }, []);

    if (!isZoomEnabled) {
      return (
        <div className={reduceImageSize ? 'flex justify-center' : 'flex justify-center lg:block'}>
          <img src={visual.src} alt={visual.alt} className={inlineImageClassName} loading="lazy" />
        </div>
      );
    }

    return (
      <div className={reduceImageSize ? 'flex justify-center' : 'flex justify-center lg:block'}>
        <button
          type="button"
          onClick={handleInlineImageClick}
          aria-label="Zoom in image"
          className="inline-block cursor-pointer cursor-zoom-in focus:outline-none"
        >
          <img
            src={visual.src}
            alt={visual.alt}
            className={`${inlineImageClassName} transition-transform duration-200 ease-out hover:scale-[1.01]`}
            loading="lazy"
          />
        </button>

        <DialogPrimitive.Root open={isZoomOpen} onOpenChange={handleDialogOpenChange}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <DialogPrimitive.Content
              aria-describedby={undefined}
              onEscapeKeyDown={(event) => {
                event.preventDefault();
              }}
              className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            >
              <DialogPrimitive.Title className="sr-only">Zoomed image preview</DialogPrimitive.Title>

              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  onClick={closeZoom}
                  aria-label="Close zoom"
                  className="absolute right-3 top-3 z-10 rounded-full bg-black/45 px-3 py-1 text-base font-semibold text-white hover:bg-black/65"
                >
                  x
                </button>
              </DialogPrimitive.Close>

              <div ref={viewportRef} className="flex h-[90vh] w-[90vw] items-center justify-center overflow-hidden">
                <img
                  ref={zoomedImageRef}
                  src={visual.src}
                  alt={visual.alt}
                  onClick={handleZoomedImageClick}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className={`max-h-[90vh] w-auto max-w-[90vw] select-none rounded-lg object-contain will-change-transform ${
                    isDragging ? 'transition-none' : 'transition-transform duration-200 ease-out'
                  } ${
                    canPan ? (isDragging ? 'cursor-grabbing touch-none' : 'cursor-grab touch-none') : 'cursor-zoom-out'
                  }`}
                  style={{ transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomScale})` }}
                />
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
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

  const navigateToLandingSection = (sectionId: 'work' | 'contact') => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const canBackToLanding = sessionStorage.getItem('gati:canBackToLanding') === '1';
    sessionStorage.setItem('gati:pendingLandingSection', sectionId);

    if (canBackToLanding && window.history.length > 1) {
      sessionStorage.removeItem('gati:canBackToLanding');
      window.history.back();
      return;
    }

    window.location.hash = `#${sectionId}`;
  };

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

  const isStyledDownloadSection = project.slug === 'cuanx' || project.slug === 'football-money';
  const isFootballMoney = project.slug === 'football-money';
  const downloadBackgroundImage = isFootballMoney
    ? '/images/portfolio/footballmoney_download_background.png'
    : '/images/portfolio/cuanx_download_background.png';
  const downloadTitle = isFootballMoney ? 'Download Football Money App' : 'Download CuanX App';
  const downloadStats = isFootballMoney ? project.detail.meta : cuanxStats;
  const downloadPrimaryColumnClassName = isFootballMoney
    ? 'order-2 max-w-md lg:order-1 lg:w-[70%] lg:max-w-none'
    : 'order-2 max-w-md lg:order-1';
  const downloadStatsColumnClassName = isFootballMoney
    ? 'order-1 flex flex-wrap items-start justify-start gap-x-5 gap-y-3 sm:gap-x-6 lg:order-2 lg:w-[30%] lg:flex-col lg:gap-4 lg:pl-6'
    : 'order-1 flex flex-wrap items-start justify-start gap-x-5 gap-y-3 sm:gap-x-6 lg:order-2 lg:gap-x-8';

  return (
    <main
      className="bg-white text-[#0f0f0f]"
      style={{ fontFamily: "'Plus Jakarta Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <header className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-[120px]">
          <div className="flex h-20 items-center justify-between gap-4">
            <div className="group flex h-20 w-[420px] max-w-[calc(100vw-2rem)] items-center">
              <a
                href="/#work"
                onClick={navigateToLandingSection('work')}
                aria-label="Back to Selected Works"
                className="inline-flex h-10 w-10 items-center overflow-hidden rounded-full border border-[#e5e5e5] bg-white text-sm font-medium text-[#0f0f0f] transition-[width,color,border-color] duration-300 ease-out group-hover:w-[230px] group-hover:border-[#f05123] group-hover:text-[#f05123] group-focus-within:w-[230px] group-focus-within:border-[#f05123] group-focus-within:text-[#f05123] focus-visible:w-[230px] focus-visible:border-[#f05123] focus-visible:text-[#f05123]"
              >
                <span className="ml-2.5 shrink-0">
                  <ChevronLeft size={18} aria-hidden="true" />
                </span>
                <span className="ml-2 whitespace-nowrap pr-4 opacity-0 transition-[opacity,max-width,transform] duration-300 ease-out max-w-0 -translate-x-1 group-hover:max-w-[180px] group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:max-w-[180px] group-focus-within:translate-x-0 group-focus-within:opacity-100">
                  Back to Selected Works
                </span>
              </a>
            </div>

            <div className="flex items-center gap-6 lg:gap-8">
              <a href="#" className="flex items-center">
                <img src="/images/logo/gati_logo_transparent.svg" alt="GATI" className="h-6 w-auto" />
              </a>

              <nav className="hidden items-center gap-6 md:flex lg:gap-8">
                <a href="#about" className="text-sm text-[#0f0f0f] transition-colors duration-300 hover:text-[#f05123]">
                  About us
                </a>
                <a
                  href="#work"
                  onClick={navigateToLandingSection('work')}
                  className="text-sm text-[#0f0f0f] transition-colors duration-300 hover:text-[#f05123]"
                >
                  Work
                </a>
                <a
                  href="#contact"
                  onClick={navigateToLandingSection('contact')}
                  className="text-sm text-[#0f0f0f] transition-colors duration-300 hover:text-[#f05123]"
                >
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
                <VisualBlock visual={section.visual} reduceImageSize={forceSingleColumn} />
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
                <VisualBlock visual={feature.visual} reduceImageSize={isSingleColumn} />
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
        {isStyledDownloadSection ? (
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${downloadBackgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-8 md:p-10 lg:flex-row lg:items-start lg:justify-between lg:p-12">
              <div className={downloadPrimaryColumnClassName}>
                <h4 className="text-[1.5rem] font-extrabold text-[#0e4c4c] sm:text-[1.8rem]">{downloadTitle}</h4>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-x-5 sm:gap-y-0">
                  {project.playStoreUrl ? (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                      aria-label={`Download ${project.title} on Google Play`}
                    >
                      <img src="/images/portfolio/google_play_button.png" alt="Get it on Google Play" className="h-14 w-auto sm:h-16" loading="lazy" />
                    </a>
                  ) : null}
                  {project.appStoreUrl ? (
                    <a
                      href={project.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                      aria-label={`Download ${project.title} on the App Store`}
                    >
                      <img src="/images/portfolio/app_store_button.png" alt="Download on the App Store" className="h-14 w-auto sm:h-16" loading="lazy" />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className={downloadStatsColumnClassName}>
                {downloadStats.map((stat) => (
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

      <FooterV2 />
    </main>
  );
}
