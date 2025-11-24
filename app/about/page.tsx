import { HeroSection } from "@/components/about-us/hero-section";
import { MissionVisionSection } from "@/components/about-us/mission-vision-section";
import { JourneyTimeline } from "@/components/about-us/journey-timeline";
import { ClientTrustSection } from "@/components/about-us/client-trust-section";
import { ExpertiseSection } from "@/components/about-us/expertise-section";
import { TeamSection } from "@/components/about-us/team-section";
import { TestimonialsSection } from "@/components/about-us/testimonials-section";
import { FinalCTA } from "@/components/about-us/final-cta";

export default function AboutPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <HeroSection />
      <MissionVisionSection />
      <JourneyTimeline />
      <ClientTrustSection />
      <ExpertiseSection />
      <TeamSection />
      <TestimonialsSection />
      <FinalCTA />
    </main>
  );
}