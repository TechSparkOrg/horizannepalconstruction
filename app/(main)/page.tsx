import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { FAQSection } from "@/components/FAQSection";
import { HomeGallery } from "@/components/HomeGallery";

export const metadata: Metadata = {
  title: "Horizan Nepal",
  description:
    "Horizan Nepal — Premier architectural design and construction company in Nepal. Specializing in modern homes, residential projects, and sustainable building solutions.",
  openGraph: {
    title: "Horizan Nepal",
    description:
      "Premier architectural design and construction company in Nepal. Specializing in modern homes, residential projects, and sustainable building solutions.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      {/* <FeaturedProjects /> */}
      <HomeGallery />
      <FAQSection />
    </>
  );
}
