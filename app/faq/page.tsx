import { FAQHero } from "@/components/sections/FAQHero";
import { FAQTimeline } from "@/components/sections/FAQTimeline";
import { ConsultationForm } from "@/components/ConsultationForm";

export default function FAQPage() {
  return (
    <>
      <FAQHero />
      <FAQTimeline />
      <ConsultationForm />
    </>
  );
}
