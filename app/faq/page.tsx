import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LdJson } from "@/components/global_ui/JsonLd";
import { PageHero } from "@/components/global_ui/page-hero";
import { FAQTimeline } from "@/components/page_ui/FAQTimeline";
import { ConsultationForm } from "@/components/global_ui/ConsultationForm";
import { getFaqGroups } from "@/api/services/faq.service";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";

const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"))

const SLUG = "faq"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch(() => null)
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "FAQ | Horizan Nepal",
    description: page?.meta_description || "Frequently asked questions about Horizan Nepal's services, design process, construction timeline, costing, and more.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "FAQ | Horizan Nepal",
      description: page?.meta_description || "Frequently asked questions about Horizan Nepal's services and process.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function FAQPage() {
  const [pageData, faqRes] = await Promise.allSettled([
    getPageBySlug(SLUG),
    getFaqGroups(),
  ]);
  const page = pageData.status === "fulfilled" ? pageData.value : null
  const initialGroups = faqRes.status === "fulfilled" ? faqRes.value.results ?? [] : []

  return (
    <>
      <LdJson data={breadcrumbList("FAQ", "faq")} />
      <PageHero slug="faq-page-hero" badge="FAQ" minHeight='80vh' heading="Frequently Asked Questions" description="Everything you need to know about working with Horizon Nepal — from pricing to process." initialBanners={page?.banner_images} />
      <FAQTimeline initialGroups={initialGroups} />
      <ConsultationForm />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <BlogContent content={page.content} />
        </div>
      )}
    </>
  );
}
