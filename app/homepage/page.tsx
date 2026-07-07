import dynamic from "next/dynamic";
import { ServicesSection } from "@/components/global_ui/ServicesSection";
import { ImageGrid } from "@/components/global_ui/image-grid";
import { FeaturedProjects } from "@/components/global_ui/FeaturedProjects";
import { QuoteBannerSecondary } from "@/components/page_ui/QuoteBannerSecondary";
import { BlogSection } from "@/components/global_ui/BlogSection";
import { FAQWrapper } from "@/components/global_ui/faq-accordion";

const ParsedContent = dynamic(() => import("@/lib/Parse-Content"))

export default function HomepagePage({ description }: { description?: string }) {
  return (
    <>
      <ServicesSection />
      <ImageGrid
        slug="home-page-gallary"
        label="Our Gallery"
        heading="Photo Gallery"
        description="Explore our portfolio of completed projects and ongoing works across Nepal."
      />
      <FeaturedProjects limit={4} />
      <QuoteBannerSecondary />
      <BlogSection />
      <FAQWrapper />
      {description && (
        <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={description} />
        </section>
      )}
    </>
  );
}
