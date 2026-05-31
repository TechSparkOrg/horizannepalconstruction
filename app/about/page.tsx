import { AboutHero } from "@/components/AboutHero";
import { AboutTabs } from "@/components/AboutTabs";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutGallery } from "@/components/AboutGallery";

import { TeamSection } from "@/components/TeamSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ConsultationForm } from "@/components/ConsultationForm";
import { LocationSection } from "@/components/LocationSection";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutTabs />
      <ServicesSection />
      <AboutGallery />
  
      <TeamSection />
      <TestimonialsSection />
      <ConsultationForm />
      <LocationSection />
    </>
  );
}
