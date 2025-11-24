'use client';

import { HeroSection } from "@/components/RICK-sections/hero-section";
import { IntelligenceFeatures } from "@/components/RICK-sections/intelligence-features";
import { SpecificationSection } from "@/components/RICK-sections/specification-section";
import { AcademicSection } from "@/components/RICK-sections/academic-section";
import { ReviewsSectionArjuna } from "@/components/Arjuna-sections/review";

export default function RICKPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <IntelligenceFeatures />
      <SpecificationSection />
      <AcademicSection />
      <ReviewsSectionArjuna />
    </div>
  );
}
