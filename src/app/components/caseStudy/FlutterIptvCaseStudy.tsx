import { FLUTTER_IPTV_DATA } from '@/app/data/caseStudyData';
import {
  CaseStudyHero,
  ProblemBlock,
  FeatureGrid,
  TechList,
  ResultsBand,
  GatiStrip,
  DownloadBanner,
} from '@/app/components/caseStudy/CaseStudyShared';

export default function FlutterIptvCaseStudy({ onClose }: { onClose: () => void }) {
  const d = FLUTTER_IPTV_DATA;

  return (
    <div>
      <CaseStudyHero title={d.title} subtitle={d.subtitle} tagline={d.tagline} stats={d.stats} heroImg={d.heroImg} />
      <ProblemBlock heading={d.problem.heading} body={d.problem.body} img={d.problem.img} />
      <FeatureGrid features={d.features} />
      <TechList tech={d.tech} />
      <ResultsBand results={d.results} />
      <GatiStrip onTalkToUs={onClose} />
      <DownloadBanner download={d.download} results={d.results} />
    </div>
  );
}
