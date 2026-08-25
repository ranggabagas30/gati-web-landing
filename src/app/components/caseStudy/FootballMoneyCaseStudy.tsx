import { FOOTBALL_MONEY_DATA } from '@/app/data/caseStudyData';
import {
  CaseStudyHero,
  ProblemBlock,
  ExpandableVisual,
  FeatureGrid,
  TechList,
  ResultsBand,
  GatiStrip,
  DownloadBanner,
} from '@/app/components/caseStudy/CaseStudyShared';
import { Rise } from '@/app/components/caseStudy/Rise';

export default function FootballMoneyCaseStudy({ onClose }: { onClose: () => void }) {
  const d = FOOTBALL_MONEY_DATA;

  return (
    <div>
      <CaseStudyHero title={d.title} subtitle={d.subtitle} tagline={d.tagline} stats={d.stats} heroImg={d.heroImg} />

      <Rise as="section" className="border-b-[0.5px] border-white/7 bg-[#111110] px-16 py-20">
        <span className="mb-3.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#f05123]">The Opportunity</span>
        <h2 className="mb-12 text-[clamp(30px,3.8vw,50px)] font-extrabold leading-[1.05] tracking-tight text-white">
          {d.market.heading}
        </h2>
        <div className="grid gap-px border-[0.5px] border-white/7 bg-white/7 md:grid-cols-4">
          {d.market.stats.map((stat) => (
            <div key={stat.lbl} className="bg-[#0d0d0b] p-8">
              <span className="mb-2.5 block text-[clamp(26px,3.2vw,44px)] font-extrabold tracking-tight text-white">{stat.val}</span>
              <span className="text-[11px] leading-normal text-white/35">{stat.lbl}</span>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-[620px] text-[clamp(14px,1.5vw,17px)] font-light leading-relaxed text-white/45">
          {d.market.body}
        </p>
      </Rise>

      <ProblemBlock heading={d.problem.heading} body={d.problem.body} img={d.problem.img} />

      <Rise as="section" className="border-b-[0.5px] border-white/7 px-16 py-24">
        <span className="mb-3.5 block text-[13px] uppercase tracking-[0.18em] text-white/40">Game Mechanics</span>
        <h2 className="mb-6 text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-tight text-white">
          {d.mechanics.heading}
        </h2>
        <p className="mb-12 max-w-[560px] text-sm font-light leading-relaxed text-white/42">{d.mechanics.body}</p>
        <div className="grid gap-px border-[0.5px] border-white/7 bg-white/7 md:grid-cols-3">
          {d.mechanics.rules.map((rule) => (
            <div key={rule.label} className="bg-[#0d0d0b] p-8">
              <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/30">{rule.label}</span>
              <span className="text-[clamp(16px,1.8vw,22px)] font-extrabold tracking-tight text-[#f05123]">{rule.value}</span>
            </div>
          ))}
        </div>
      </Rise>

      <Rise as="section" className="border-b-[0.5px] border-white/7 px-16 py-24">
        <span className="mb-3.5 block text-[13px] uppercase tracking-[0.18em] text-white/40">Our Approach</span>
        <h2 className="mb-10 text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-tight text-white">
          We planned before we built.
        </h2>
        <p className="mb-10 max-w-[560px] text-sm font-light leading-relaxed text-white/42">{d.timeline.body}</p>
        <ExpandableVisual
          img={d.timeline.img}
          alt="Project Roadmap"
          aspect="aspect-video"
          placeholder="Roadmap image — attach the screenshot to embed it"
        />
      </Rise>

      <FeatureGrid features={d.features} />

      <Rise as="section" className="border-b-[0.5px] border-white/7 px-16 py-24">
        <span className="mb-3.5 block text-[13px] uppercase tracking-[0.18em] text-white/40">Why It's Different</span>
        <h2 className="mb-6 text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-tight text-white">
          Built different.
          <br />
          By design.
        </h2>
        <div className="mt-8">
          {d.differentiators.map((item, index) => (
            <div key={item.name} className="grid gap-10 border-t-[0.5px] border-white/7 py-7 last:border-b-[0.5px] md:grid-cols-[1fr_2fr]">
              <div>
                <span className="mb-2 block text-[10px] font-bold tracking-[0.12em] text-[#f05123]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="text-[clamp(15px,1.6vw,18px)] font-bold text-white">{item.name}</h4>
              </div>
              <p className="text-[13px] font-light leading-relaxed text-white/38">{item.desc}</p>
            </div>
          ))}
        </div>
      </Rise>

      <TechList tech={d.tech} />
      <ResultsBand results={d.results} />
      <GatiStrip onTalkToUs={onClose} />
      <DownloadBanner download={d.download} results={d.results} />
    </div>
  );
}
