import type { Metadata } from "next";
import { DesignHero } from "@/components/sections/DesignHero";
import { DesignServices } from "@/components/sections/DesignServices";
import { Design3DShowcase } from "@/components/sections/Design3DShowcase";
import { ConsultationForm } from "@/components/ConsultationForm";

export const metadata: Metadata = {
  title: "Design | Horizan Nepal",
  description:
    "Explore Horizan Nepal's architectural design services — from conceptual 2D floor plans to stunning 3D visualizations. Turn your vision into reality.",
  openGraph: {
    title: "Design | Horizan Nepal",
    description:
      "Explore Horizan Nepal's architectural design services — 2D plans and 3D visualizations.",
    type: "website",
  },
};

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
