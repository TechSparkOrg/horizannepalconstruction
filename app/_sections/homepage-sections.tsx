import { cacheLife } from "next/cache";
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

export async function ServicesAsync() {
  "use cache";
  cacheLife("homepage");
  const services = await getServiceCategories().catch(() => []);
  return <ServicesSection initialServices={services} />;
}

export async function GalleryAsync() {
  "use cache";
  cacheLife("homepage");
  const banners = await getBanners("home-page-gallary").catch(() => []);
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

export async function FeaturedAsync() {
  "use cache";
  cacheLife("homepage");
  const projects = await getProjects().catch(() => ({ results: [] }));
  return <FeaturedProjects initialProjects={projects.results} limit={4} />;
}

export async function BlogAsync() {
  "use cache";
  cacheLife("homepage");
  const posts = await getBlogs().catch(() => ({ results: [] }));
  return <BlogSection initialPosts={posts.results} />;
}

export async function FAQAsync() {
  "use cache";
  cacheLife("homepage");
  const faqs = await getFaqs({ page_size: 10 }).catch(() => ({ results: [] }));
  return <FAQWrapper initialFaqs={faqs.results} />;
}
