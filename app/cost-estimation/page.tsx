import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHero } from "@/components/global_ui/page-hero";
import { CostEstimationContent } from "@/components/page_ui/CostEstimationContent";
import { LdJson } from "@/components/global_ui/JsonLd";

const CostEstimator = dynamic(() => import("@/components/page_ui/CostEstimator").then(m => ({ default: m.CostEstimator })));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Cost Estimation | Horizan Nepal",
  description:
    "Estimate the cost of your construction project with Horizan Nepal's transparent costing tool. Get a detailed breakdown for materials, labor, and more.",
  openGraph: {
    title: "Cost Estimation | Horizan Nepal",
    description:
      "Estimate the cost of your construction project with Horizan Nepal's transparent costing tool.",
    type: "website",
    url: `${siteUrl}/cost-estimation`,
  },
  alternates: { canonical: `${siteUrl}/cost-estimation` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Cost Estimation", item: `${siteUrl}/cost-estimation` },
  ],
};

export default function CostEstimationPage() {
  return (
    <>
      <LdJson data={breadcrumb} />
      <PageHero slug="cost-estimate-page-hero" srHeading="Cost Estimation Service" heading="Cost Estimate" description="Visualize and calculate your dream construction project in 3D" minHeight="80vh" descClassName="mt-4 text-white/80 font-semibold text-lg max-w-[600px] mx-auto leading-relaxed" />
      <CostEstimationContent />
      <CostEstimator />
    </>
  );
}
