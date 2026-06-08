import type { Metadata } from "next";
import { OurWorkHero } from "@/components/sections/OurWorkHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ConsultationForm } from "@/components/ConsultationForm";

export const metadata: Metadata = {
  title: "Our Work | Horizan Nepal",
  description:
    "Browse Horizan Nepal's portfolio of completed architectural and construction projects. See our finest work in residential and commercial design across Nepal.",
  openGraph: {
    title: "Our Work | Horizan Nepal",
    description:
      "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
    type: "website",
  },
};

export default function OurWorkPage() {
  return (
    <>
      <OurWorkHero />
      <ProjectGallery />
      <ConsultationForm />
    </>
  );
}
