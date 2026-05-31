import { ContactHero } from "@/components/sections/ContactHero";
import { ConsultationForm } from "@/components/ConsultationForm";
import { LocationSection } from "@/components/LocationSection";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ConsultationForm />
      <LocationSection />
    </>
  );
}
