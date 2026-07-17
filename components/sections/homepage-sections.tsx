import { getServiceCategories } from "@/api/services/category.service";
import { getBlogs } from "@/api/services/blog.service";
import { getProjects } from "@/api/services/project.service";
import { getFaqs } from "@/api/services/faq.service";
import { getBanners } from "@/api/services/banner.service";
import { ServicesSection } from "@/components/global_ui/ServicesSection";
import { ImageGrid } from "@/components/global_ui/image-grid";
import { FeaturedProjects } from "@/components/global_ui/FeaturedProjects";
import { BlogSection } from "@/components/global_ui/BlogSection";
import { FAQWrapper } from "@/components/global_ui/faq-accordion";

export async function ServicesAsync({ svgUrl }: { svgUrl?: string }) {
  "use cache";
  const services = await getServiceCategories().catch((err) => { console.error("Failed to fetch services:", err); return []; });
  return <ServicesSection initialServices={services} svgUrl={svgUrl} />;
}

export async function GalleryAsync() {
  "use cache";
  const banners = await getBanners("home-page-gallary").catch((err) => { console.error("Failed to fetch banners:", err); return []; });
  return (
    <ImageGrid
      slug="home-page-gallary"
      initialItems={banners}
      label="Our Gallery"
      heading="Photo Gallery"
      description="Explore our portfolio of completed projects and ongoing works across Nepal."
    />
  );
}

export async function FeaturedAsync({ svgUrl }: { svgUrl?: string }) {
  "use cache";
  const projects = await getProjects().catch((err) => { console.error("Failed to fetch projects:", err); return { results: [] }; });
  return <FeaturedProjects initialProjects={projects.results} limit={4} svgUrl={svgUrl} />;
}

export async function BlogAsync() {
  "use cache";
  const posts = await getBlogs().catch((err) => { console.error("Failed to fetch blogs:", err); return { results: [] }; });
  return <BlogSection initialPosts={posts.results} />;
}

export async function FAQAsync({ svgUrl }: { svgUrl?: string }) {
  "use cache";
  const faqs = await getFaqs({ page_size: 10 }).catch((err) => { console.error("Failed to fetch FAQs:", err); return { results: [] }; });
  return <FAQWrapper initialFaqs={faqs.results} svgUrl={svgUrl} />;
}
