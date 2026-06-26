import { ServicesSection } from "@/components/global_ui/ServicesSection";
import { ImageGrid } from "@/components/global_ui/image-grid";
import { FeaturedProjects } from "@/components/global_ui/FeaturedProjects";
import { QuoteBannerSecondary } from "@/components/page_ui/QuoteBannerSecondary";
import { BlogSection } from "@/components/global_ui/BlogSection";
import { FAQWrapper } from "@/components/global_ui/faq-accordion";

export default function HomepagePage() {
  return (
    <>
      <ServicesSection />
      <ImageGrid
        slug="asdfasfsa-sf-sf"
        label="Our Gallery"
        heading="Photo Gallery"
        description="Explore our portfolio of completed projects and ongoing works across Nepal."
      />
      <FeaturedProjects limit={4} />
      <QuoteBannerSecondary />
      <BlogSection />
      <FAQWrapper />
    </>
  );
}
