import { Nav } from '@/app/components/Nav';
import { HeroSection } from '@/app/components/HeroSection';
import { ExpertiseSection } from '@/app/components/ExpertiseSection';
import { ProjectsSection } from '@/app/components/ProjectsSection';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--gati-dark)]">
      <Nav />
      <HeroSection />
      <ExpertiseSection />
      <ProjectsSection onViewCaseStudy={(slug) => console.log('open', slug)} />
    </div>
  );
}
