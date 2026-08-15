import { Nav } from '@/app/components/Nav';
import { HeroSection } from '@/app/components/HeroSection';
import { ExpertiseSection } from '@/app/components/ExpertiseSection';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--gati-dark)]">
      <Nav />
      <HeroSection />
      <ExpertiseSection />
    </div>
  );
}
