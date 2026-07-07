import type { Metadata } from "next";
import dynamic from "next/dynamic";
import BlogContent from "@/components/page_ui/BlogContent.client";
import { LdJson } from "@/components/global_ui/JsonLd";
import { getPageBySlug } from "@/api/services/page.service";
import { getSiteUrl, pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";

const OurWorkHero = dynamic(() => import("@/components/page_ui/OurWorkHero").then((m) => ({ default: m.OurWorkHero })));
const ProjectGalleryComponent = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then((m) => ({ default: m.ConsultationForm })));

const SLUG = "our-work"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch(() => null)
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Our Work | Horizan Nepal",
    description: page?.meta_description || "Browse Horizan Nepal's portfolio of completed architectural and construction projects.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Our Work | Horizan Nepal",
      description: page?.meta_description || "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Our Work | Horizan Nepal",
  description: "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
  url: `${getSiteUrl()}/our-work`,
};

export default async function OurWorkPage() {
  const page = await getPageBySlug(SLUG).catch(() => null)

  return (
    <>
      <LdJson data={breadcrumbList("Our Work", "our-work")} />
      <LdJson data={collectionSchema} />
      <OurWorkHero initialImages={page?.banner_images} />
      <ProjectGalleryComponent slug="project-page-gallary-list" label="Project Gallery" heading="Our Work in Pictures" description="A visual journey through our completed projects and ongoing works." />
      <ConsultationForm />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <BlogContent content={page.content} />
        </div>
      )}
    </>
  );
}
