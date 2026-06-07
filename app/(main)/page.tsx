import { HeroSection } from "@/components/HeroSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { FAQSection } from "@/components/FAQSection";
import { HomeGallery } from "@/components/HomeGallery";

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
