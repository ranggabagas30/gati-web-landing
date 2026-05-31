import { Header } from '@/app/components/Header';
import { ManifestoSection } from '@/app/components/ManifestoSection';
import { ServicesSection } from '@/app/components/ServicesSection';
import { TeamSection } from '@/app/components/TeamSection';
import { ExpertiseSection } from '@/app/components/ExpertiseSection';
import { PortfolioSection } from '@/app/components/PortfolioSection';
import { PricingSection } from '@/app/components/PricingSection';
import { Footer } from '@/app/components/Footer';

export function LandingPage() {
  const hideSelectedSections = true;

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#000000_41%,#FFFFFF_77%)]">
      <Header />
      <ManifestoSection />
      {!hideSelectedSections && <ServicesSection />}
      {!hideSelectedSections && <TeamSection />}
      <ExpertiseSection />
      <PortfolioSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
