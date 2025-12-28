import { Header } from "./components/Header";
import { ManifestoSection } from "./components/ManifestoSection";
import { ServicesSection } from "./components/ServicesSection";
import { TeamSection } from "./components/TeamSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { ExpertiseSection } from "./components/ExpertiseSection";
import { ServicesListSection } from "./components/ServicesListSection";
import { PricingSection } from "./components/PricingSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <ManifestoSection />
      <ServicesSection />
      <TeamSection />
      <PortfolioSection />
      {/*<ExpertiseSection />*/}
      {/*<ServicesListSection />*/}
      <PricingSection />
      <Footer />
    </div>
  );
}