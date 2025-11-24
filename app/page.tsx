import { HeroSection } from "@/components/home-sections/hero-section";
import { FeaturesSection } from "@/components/home-sections/features-section";
import { ServicesSection } from "@/components/home-sections/images";
import { WhyNewrroSection } from "@/components/home-sections/why-newrro-section";
import { CollaborationSection } from "@/components/home-sections/collaboration-section";
import { ReviewsSection } from "@/components/home-sections/reviews-section";
import { CTASection } from "@/components/home-sections/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <WhyNewrroSection />
      <CollaborationSection />
      <ReviewsSection />
      <CTASection />
    </div>
  );
}