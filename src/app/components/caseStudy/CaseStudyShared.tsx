import type { CaseStudyStat, CaseStudyFeature, CaseStudyTech, CaseStudyResult, CaseStudyDownload } from '@/app/data/caseStudyData';
import { Rise } from '@/app/components/caseStudy/Rise';

export function CaseStudyHero({
  title,
  subtitle,
  tagline,
  stats,
  heroImg,
}: {
  title: string;
  subtitle: string;
  tagline: string;
  stats: CaseStudyStat[];
  heroImg: string;
}) {
  const bgText = title.split(' ')[0];

  return (
    <div className="grid min-h-[86vh] border-b-[0.5px] border-white/7 md:grid-cols-2">
      <div className="flex flex-col justify-end border-r-[0.5px] border-white/7 px-16 py-20">
        <span className="mb-8 inline-block w-fit rounded-full border-[0.5px] border-[#f05123]/35 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#f05123]">
          Portfolio Case Study
        </span>
        <h1 className="mb-5 text-[clamp(52px,6.5vw,96px)] font-extrabold leading-[0.93] tracking-tight text-white">
          {title}
        </h1>
        <p className="mb-16 max-w-[400px] text-base font-light leading-relaxed text-white/42">{subtitle}</p>
        <p className="mb-10 max-w-[400px] text-sm font-light leading-relaxed text-white/50">{tagline}</p>

        <div className="flex border-t-[0.5px] border-white/10">
          {stats.map((stat) => (
            <div key={stat.lbl} className="flex-1 border-r-[0.5px] border-white/7 pt-4.5 last:border-r-0">
              <span className="mb-1.5 block text-[9px] uppercase tracking-[0.14em] text-white/28">{stat.lbl}</span>
              <span className="block text-[clamp(15px,1.6vw,19px)] font-bold tracking-tight text-[#f05123]">{stat.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden bg-[#111110]">
        {heroImg ? (
          <img src={heroImg} alt={title} className="w-[62%] rounded-3xl border-[0.5px] border-white/8 object-contain" />
        ) : (
          <div className="flex aspect-[9/18] w-[62%] items-center justify-center rounded-3xl border-[0.5px] border-white/8 bg-[linear-gradient(145deg,#1a1a18,#222220)] px-6 text-center text-[10px] uppercase tracking-[0.1em] text-white/15">
            App mockup — coming soon
          </div>
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-5 -right-2.5 select-none whitespace-nowrap text-[clamp(100px,14vw,180px)] font-extrabold leading-none tracking-[-0.06em] text-white/[0.03]"
        >
          {bgText}
        </span>
      </div>
    </div>
  );
}

export function ProblemBlock({ heading, body, img }: { heading: string; body: string; img?: string }) {
  return (
    <section className="border-b-[0.5px] border-white/7 px-16 py-24">
      <div className="grid items-center gap-[72px] md:grid-cols-2">
        <Rise>
          <span className="mb-3.5 block text-[13px] uppercase tracking-[0.18em] text-white/40">The Challenge</span>
          <h2 className="mb-6 text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-tight text-white">
            {heading}
          </h2>
          <p className="max-w-[560px] text-sm font-light leading-relaxed text-white/42">{body}</p>
        </Rise>
        <Rise className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl border-[0.5px] border-white/7 bg-[#111110]">
          {img ? (
            <img src={img} alt="" className="w-[75%] rounded-2xl" />
          ) : (
            <span className="px-6 text-center text-[10px] uppercase tracking-[0.1em] text-white/15">
              Screen visual — coming soon
            </span>
          )}
        </Rise>
      </div>
    </section>
  );
}

export function ExpandableVisual({
  img,
  alt,
  aspect,
  placeholder,
}: {
  img?: string;
  alt: string;
  aspect: string;
  placeholder: string;
}) {
  return (
    <div className={`group relative cursor-zoom-in overflow-hidden rounded-xl border-[0.5px] border-white/8 ${aspect}`}>
      {img ? (
        <img src={img} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#1a1a18,#222220)] px-6 text-center text-[10px] uppercase tracking-[0.1em] text-white/15">
          {placeholder}
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="rounded-full border-[0.5px] border-white/20 bg-black/60 px-4.5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-white backdrop-blur-md">
          Click to expand
        </span>
      </div>
    </div>
  );
}

export function VisualBlock({ img, alt, placeholder }: { img?: string; alt: string; placeholder: string }) {
  return (
    <div className="mt-10 aspect-video overflow-hidden rounded-xl border-[0.5px] border-white/7">
      {img ? (
        <img src={img} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#1a1a18,#222220)] px-6 text-center text-[10px] uppercase tracking-[0.1em] text-white/15">
          {placeholder}
        </div>
      )}
    </div>
  );
}

export function FeatureGrid({ features }: { features: CaseStudyFeature[] }) {
  return (
    <div className="border-b-[0.5px] border-white/7 px-16 pb-24">
      <div className="pb-14 pt-24">
        <span className="mb-3.5 block text-[13px] uppercase tracking-[0.18em] text-white/40">What We Built</span>
        <h2 className="max-w-[600px] text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-tight text-white">
          Every piece of the puzzle, accounted for.
        </h2>
      </div>
      <div className="grid gap-px border-[0.5px] border-white/7 bg-white/7 md:grid-cols-3">
        {features.map((feature) => (
          <Rise key={feature.name} className="flex flex-col gap-3.5 bg-[#0d0d0b] p-11">
            <div className="mb-1.5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[10px] border-[0.5px] border-white/6 bg-[linear-gradient(145deg,#161614,#1e1e1c)]">
              {feature.visual ? (
                <img src={feature.visual} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="px-4 text-center text-[10px] uppercase tracking-[0.1em] text-white/12">
                  Visual — coming soon
                </span>
              )}
            </div>
            <h3 className="text-[17px] font-bold tracking-tight text-white">{feature.name}</h3>
            <p className="text-[12.5px] font-light leading-relaxed text-white/38">{feature.desc}</p>
            <span className="mt-auto pt-2 text-[11px] font-semibold tracking-wide text-[#f05123]">↗ {feature.stat}</span>
          </Rise>
        ))}
      </div>
    </div>
  );
}

export function TechList({ tech }: { tech: CaseStudyTech[] }) {
  return (
    <div className="border-b-[0.5px] border-white/7 px-16 py-24">
      <span className="mb-3.5 block text-[13px] uppercase tracking-[0.18em] text-white/40">Tech Stack</span>
      <Rise as="h2" className="text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-tight text-white">
        Why each choice mattered.
      </Rise>
      <div className="mt-14">
        {tech.map((item) => (
          <Rise
            key={item.name}
            className="grid gap-10 border-t-[0.5px] border-white/7 py-7 last:border-b-[0.5px] md:grid-cols-[140px_1fr_2fr]"
          >
            <span className="pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f05123]">{item.cat}</span>
            <h4 className="text-[clamp(17px,1.8vw,21px)] font-bold tracking-tight text-white">{item.name}</h4>
            <p className="text-[13px] font-light leading-relaxed text-white/38">{item.desc}</p>
          </Rise>
        ))}
      </div>
    </div>
  );
}

export function ResultsBand({ results }: { results: CaseStudyResult[] }) {
  return (
    <div className="grid border-b-[0.5px] border-white/7 bg-[#111110] px-16 py-24 md:grid-cols-3">
      {results.map((result) => (
        <Rise key={result.lbl} className="border-r-[0.5px] border-white/8 px-12 text-center first:pl-0 first:text-left last:border-r-0 last:pr-0 last:text-right">
          <span className="mb-2.5 block text-[clamp(52px,6.5vw,88px)] font-extrabold leading-none tracking-tight text-white">
            {result.num}
          </span>
          <span className="text-[11px] font-light uppercase tracking-[0.1em] text-white/32">{result.lbl}</span>
        </Rise>
      ))}
    </div>
  );
}

export function GatiStrip({ onTalkToUs }: { onTalkToUs: () => void }) {
  const handleClick = () => {
    onTalkToUs();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-8 border-t-[0.5px] border-white/7 bg-[#0a0a09] px-16 py-[72px]">
      <div>
        <span className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#f05123]">
          Built by GATI
        </span>
        <p className="text-[clamp(22px,2.8vw,36px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
          Have a product idea?
          <br />
          <span className="text-[#f05123]">We make it happen.</span>
        </p>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex shrink-0 items-center gap-2.5 rounded-[4px] bg-[#f05123] px-[26px] py-3.5 text-[13px] font-bold tracking-[0.02em] text-white transition-opacity hover:opacity-85"
      >
        Talk to us ↗
      </button>
    </div>
  );
}

export function DownloadBanner({ download, results }: { download: CaseStudyDownload; results: CaseStudyResult[] }) {
  return (
    <div className="relative grid min-h-[240px] gap-10 overflow-hidden bg-[linear-gradient(120deg,#0a2e2e_0%,#0d3d3a_40%,#0e4040_70%,#093535_100%)] px-6 py-14 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0 md:px-0">
      <Rise className="flex flex-col justify-center md:py-14 md:pl-16 md:pr-12">
        <h3 className="mb-6 text-[clamp(22px,2.4vw,32px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
          {download.title}
        </h3>
        {download.sub && <p className="mb-6 text-sm text-white/60">{download.sub}</p>}
        <div className="flex flex-wrap items-center gap-3.5">
          {download.playUrl && (
            <a
              href={download.playUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <img src="/images/portfolio/google_play_button.png" alt="Get it on Google Play" className="h-[46px] w-auto" />
            </a>
          )}
          {download.appleUrl && (
            <a
              href={download.appleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <img src="/images/portfolio/app_store_button.png" alt="Download on the App Store" className="h-[46px] w-auto" />
            </a>
          )}
        </div>
      </Rise>

      <div className="flex w-[180px] shrink-0 justify-self-center md:justify-self-auto md:self-end">
        {download.phoneImg ? (
          <img src={download.phoneImg} alt="" className="w-full" />
        ) : (
          <div className="flex aspect-[9/17] w-full items-center justify-center rounded-t-3xl border-[0.5px] border-b-0 border-white/12 bg-[linear-gradient(170deg,#1a3535,#0a2020)] text-center text-[9px] uppercase tracking-[0.08em] text-white/20">
            Phone mockup
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center gap-5 md:py-14 md:pl-12 md:pr-16">
        {results.map((result) => (
          <div key={result.lbl} className="flex flex-col gap-0.5">
            <span className="inline-block w-fit rounded-md bg-white/12 px-2.5 py-0.5 text-[clamp(24px,2.8vw,36px)] font-extrabold tracking-tight text-white">
              {result.num}
            </span>
            <span className="pl-0.5 text-[11px] font-light tracking-wide text-white/50">{result.lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
