import { HeroSection } from "@/components/HeroSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { FAQSection } from "@/components/FAQSection";
import { BlogSection } from "@/components/BlogSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <FeaturedProjects />
      <FAQSection />
      <BlogSection />
    </>
  );
}
