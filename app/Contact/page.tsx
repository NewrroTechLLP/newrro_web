'use client';

import { ContactHeroSection } from "@/components/contact-sections/contact-hero-section";
import { ContactFormSection } from "@/components/contact-sections/contact-form-section";
import { ContactInfoSection } from "@/components/contact-sections/contact-info-section";
import { MapSection } from "@/components/contact-sections/map-section";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white" suppressHydrationWarning>
      <ContactHeroSection />
      <ContactFormSection />
      <ContactInfoSection />
      <MapSection />
    </div>
  );
}
