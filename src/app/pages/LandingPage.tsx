import { Nav } from '@/app/components/Nav';
import { HeroSection } from '@/app/components/HeroSection';
import { ExpertiseSection } from '@/app/components/ExpertiseSection';
import { ProjectsSection } from '@/app/components/ProjectsSection';
import { CaseStudyOverlay } from '@/app/components/CaseStudyOverlay';
import { FooterV2 } from '@/app/components/FooterV2';
import { useCaseStudyHashSync } from '@/app/hooks/useCaseStudyHashSync';

export function LandingPage() {
  const { open } = useCaseStudyHashSync();

  return (
    <div className="min-h-screen bg-[var(--gati-dark)]">
      <Nav />
      <HeroSection />
      <ExpertiseSection />
      <ProjectsSection onViewCaseStudy={open} />
      <FooterV2 />
      <CaseStudyOverlay />
    </div>
  );
}
