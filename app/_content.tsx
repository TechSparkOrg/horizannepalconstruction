import { getSvgUrl } from "@/lib/svg-utils";
import { siteUrl } from "@/lib/constants";
import { LdJson } from "@/components/global_ui/JsonLd";
import { QuoteBannerSecondary } from "@/components/page_ui/QuoteBannerSecondary";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { ServicesSection } from "@/components/global_ui/ServicesSection";
import { ImageGrid } from "@/components/global_ui/image-grid";
import { FeaturedProjects } from "@/components/global_ui/FeaturedProjects";
import { BlogSection } from "@/components/global_ui/BlogSection";
import { FAQWrapper } from "@/components/global_ui/faq-accordion";
import ParsedContent from "@/lib/ParseContent.server";
import type { Page } from "@/api/types/page.types";
import type { ServiceCategory } from "@/api/types/category.types";
import type { Project } from "@/api/types/project.types";
import type { BlogPost } from "@/api/types/blog.types";
import type { FaqItem } from "@/api/types/faq.types";

interface Props {
  page: Page | null;
  services: ServiceCategory[];
  projects: Project[];
  blogs: BlogPost[];
  faqs: FaqItem[];
}

export function HomeContent({ page, services, projects, blogs, faqs }: Props) {
  const svgItems = page?.svg_items;

  return (
    <>
      <LdJson data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Horizan Nepal Engineering Research & Construction",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: getSvgUrl(svgItems, 0, "/video-gif/construnction-bull-dozer.svg"),
        description: page?.meta_description || "Trusted architecture, engineering, and construction firm in Nepal.",
        priceRange: "NPR",
      }} />
      <ServicesSection initialServices={services} svgUrl={getSvgUrl(svgItems, 1, "/video-gif/in-progress.svg")} />
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-off-white min-h-[600px]" />}>
        <ImageGrid
          slug="home-page-gallary"
          initialItems={page?.banner_images ?? []}
          label="Our Gallery"
          heading="Photo Gallery"
          description="Explore our portfolio of completed projects and ongoing works across Nepal."
        />
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[600px]" />}>
        <FeaturedProjects initialProjects={projects} limit={4} svgUrl={getSvgUrl(svgItems, 2, "/video-gif/Rumble.svg")} />
      </ViewportSection>
      <QuoteBannerSecondary />
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[400px]" />}>
        <BlogSection initialPosts={blogs} />
      </ViewportSection>
      <ViewportSection fallback={<div className="py-20 bg-[#f5f8ff] min-h-[500px]" />}>
        <FAQWrapper initialFaqs={faqs} svgUrl={getSvgUrl(svgItems, 3, "/video-gif/Live-chatbot.svg")} />
      </ViewportSection>
      {page?.content && (
        <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </section>
      )}
    </>
  );
}
