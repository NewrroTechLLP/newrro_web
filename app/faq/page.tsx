'use client';

import { FAQHeroSection } from "@/components/faq-sections/faq-hero-section";
import { FAQAccordionSection } from "@/components/faq-sections/faq-accordion-section";
import { FAQCTASection } from "@/components/faq-sections/faq-cta-section";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white" suppressHydrationWarning>
      <FAQHeroSection />
      <FAQAccordionSection />
      <FAQCTASection />
    </div>
  );
}
