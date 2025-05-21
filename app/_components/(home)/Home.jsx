
import FeatureCards from "./FeatureCards";
import HeroSection from "./HeroSection";
import PricingPlans from "./PricingPlans";
import ProductShowcase from "./ProductShowcase";
import SiteFooter from "./SiteFooter";
import WhySection from "./WhySection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      {/* Rest of your page content */}
      <ProductShowcase />
      <WhySection />
      <FeatureCards />
      <PricingPlans />
      <SiteFooter />
    </div>
  );
}