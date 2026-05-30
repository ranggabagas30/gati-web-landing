import { Header } from '@/app/components/Header';
import { ManifestoSection } from '@/app/components/ManifestoSection';
import { ServicesSection } from '@/app/components/ServicesSection';
import { TeamSection } from '@/app/components/TeamSection';
import { PortfolioSection } from '@/app/components/PortfolioSection';
import { PricingSection } from '@/app/components/PricingSection';
import { Footer } from '@/app/components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ManifestoSection />
      <ServicesSection />
      <TeamSection />
      <PortfolioSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
