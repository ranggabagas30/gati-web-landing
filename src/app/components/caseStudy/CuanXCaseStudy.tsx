import { CUANX_DATA } from '@/app/data/caseStudyData';
import {
  CaseStudyHero,
  ProblemBlock,
  ExpandableVisual,
  VisualBlock,
  FeatureGrid,
  TechList,
  ResultsBand,
  GatiStrip,
  DownloadBanner,
} from '@/app/components/caseStudy/CaseStudyShared';
import { Rise } from '@/app/components/caseStudy/Rise';

export default function CuanXCaseStudy({ onClose }: { onClose: () => void }) {
  const d = CUANX_DATA;

  return (
    <div>
      <CaseStudyHero title={d.title} subtitle={d.subtitle} tagline={d.tagline} stats={d.stats} heroImg={d.heroImg} />
      <ProblemBlock heading={d.problem.heading} body={d.problem.body} img={d.problem.img} />

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

      <Rise as="section" className="border-b-[0.5px] border-white/7 px-16 py-24">
        <span className="mb-3.5 block text-[13px] uppercase tracking-[0.18em] text-white/40">Design Process</span>
        <h2 className="mb-10 text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-tight text-white">
          Wireframed.
          <br />
          Every. Single. Flow.
        </h2>
        <p className="mb-10 max-w-[560px] text-sm font-light leading-relaxed text-white/42">{d.wireframes.body}</p>
        <ExpandableVisual
          img={d.wireframes.img}
          alt="Wireframe overview"
          aspect="aspect-[3/2]"
          placeholder="Wireframe overview — attach the screenshot to embed it"
        />
      </Rise>

      <FeatureGrid features={d.features} />

      <section className="border-b-[0.5px] border-white/7 px-16 py-24">
        <span className="mb-3.5 block text-[13px] uppercase tracking-[0.18em] text-white/40">The Ecosystem</span>
        <Rise as="h2" className="mb-12 max-w-[520px] text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-tight text-white">
          3 apps.
          <br />
          1 dashboard.
          <br />
          One real-time truth.
        </Rise>
        <Rise as="p" className="mb-12 max-w-[560px] text-sm font-light leading-relaxed text-white/42">{d.location.body}</Rise>
        <div className="grid gap-px border-[0.5px] border-white/7 bg-white/7 md:grid-cols-4">
          {d.location.nodes.map((node) => (
            <Rise key={node.role} className={`p-10 ${node.cms ? 'bg-[#111110]' : 'bg-[#0d0d0b]'}`}>
              <span className="mb-3.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#f05123]">{node.role}</span>
              <h3 className="mb-2.5 text-[clamp(17px,1.9vw,22px)] font-extrabold tracking-tight text-white">{node.name}</h3>
              <p className="text-[12.5px] font-light leading-relaxed text-white/42">{node.desc}</p>
            </Rise>
          ))}
        </div>
      </section>

      <Rise as="section" className="border-b-[0.5px] border-white/7 px-16 py-24">
        <span className="mb-3.5 block text-[13px] uppercase tracking-[0.18em] text-white/40">Admin Infrastructure</span>
        <h2 className="mb-6 text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-tight text-white">
          The CMS behind everything.
        </h2>
        <p className="max-w-[560px] text-sm font-light leading-relaxed text-white/42">{d.cms.body}</p>
        <div className="mt-10 grid gap-px border-[0.5px] border-white/7 bg-white/7 md:grid-cols-4">
          {d.cms.adminLevels.map((level) => (
            <Rise key={level.lv} className={`p-8 ${level.lv === 'lv1' ? 'bg-[#111]' : 'bg-[#0d0d0b]'}`}>
              <span
                className={`mb-3.5 inline-block rounded px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] ${
                  level.lv === 'lv1' ? 'bg-[#f05123] text-white' : level.lv === 'lv2' ? 'bg-[#f05123]/15 text-[#f05123]' : 'bg-white/7 text-white/50'
                }`}
              >
                {level.tag}
              </span>
              <h4 className="mb-2 text-base font-bold tracking-tight text-white">{level.name}</h4>
              <p className="text-xs font-light leading-relaxed text-white/38">{level.desc}</p>
            </Rise>
          ))}
        </div>
        <VisualBlock img={d.cms.img} alt="CMS Dashboard" placeholder="CMS screenshot — attach to embed" />
      </Rise>

      <TechList tech={d.tech} />
      <ResultsBand results={d.results} />
      <GatiStrip onTalkToUs={onClose} />
      <DownloadBanner download={d.download} results={d.results} />
    </div>
  );
}
