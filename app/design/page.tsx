import { DesignHero } from "@/components/sections/DesignHero";
import { DesignServices } from "@/components/sections/DesignServices";
import { Design3DShowcase } from "@/components/sections/Design3DShowcase";
import { ConsultationForm } from "@/components/ConsultationForm";

export default function DesignPage() {
  return (
    <>
      <DesignHero />
      <DesignServices />
      <Design3DShowcase />
      <ConsultationForm />
    </>
  );
}
