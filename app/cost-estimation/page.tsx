import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHero } from "@/components/global_ui/page-hero";
import { CostEstimationContent } from "@/components/page_ui/CostEstimationContent";
import { getPageBySlug } from "@/api/services/page.service";
import { LdJson } from "@/components/global_ui/JsonLd";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";

const CostEstimator = dynamic(() => import("@/components/page_ui/CostEstimator").then(m => ({ default: m.CostEstimator })));
const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"))

const SLUG = "cost-estimation"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch(() => null)
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Cost Estimation | Horizan Nepal",
    description: page?.meta_description || "Estimate the cost of your construction project with Horizan Nepal's transparent costing tool. Get a detailed breakdown for materials, labor, and more.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Cost Estimation | Horizan Nepal",
      description: page?.meta_description || "Estimate the cost of your construction project with Horizan Nepal's transparent costing tool.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function CostEstimationPage() {
  const page = await getPageBySlug(SLUG).catch(() => null)

  return (
    <>
      <LdJson data={breadcrumbList("Cost Estimation", "cost-estimation")} />
      <PageHero slug="cost-estimate-page-hero" srHeading="Cost Estimation Service" heading="Cost Estimate" description="Visualize and calculate your dream construction project in 3D" minHeight="80vh" descClassName="mt-4 text-white/80 font-semibold text-lg max-w-[600px] mx-auto leading-relaxed" initialBanners={page?.banner_images} />
      <CostEstimationContent />
      <CostEstimator />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <BlogContent content={page.content} />
        </div>
      )}
    </>
  );
}
