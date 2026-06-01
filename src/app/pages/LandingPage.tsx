import { Header } from '@/app/components/Header';
import { ManifestoSection } from '@/app/components/ManifestoSection';
import { ServicesSection } from '@/app/components/ServicesSection';
import { TeamSection } from '@/app/components/TeamSection';
import { ExpertiseSection } from '@/app/components/ExpertiseSection';
import { PortfolioSection } from '@/app/components/PortfolioSection';
import { PricingSection } from '@/app/components/PricingSection';
import { FooterV2 } from '@/app/components/FooterV2';

export function LandingPage() {
  const hideSelectedSections = true;

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#000000_32%,#1F1F1F_58%,#B8B9BB_84%,#FFFFFF_100%)]">
      <Header />
      <ManifestoSection />
      {!hideSelectedSections && <ServicesSection />}
      {!hideSelectedSections && <TeamSection />}
      <ExpertiseSection />
      <PortfolioSection />
      <PricingSection />
      <FooterV2 />
    </div>
  );
}
