import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CostEstimationHero } from "@/components/sections/CostEstimationHero";
import { CostEstimationContent } from "@/components/sections/CostEstimationContent";
import { LdJson } from "@/components/JsonLd";

const CostEstimator = dynamic(() => import("@/components/sections/CostEstimator").then(m => ({ default: m.CostEstimator })));

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
      <CostEstimationHero />
      <CostEstimationContent />
      <CostEstimator />
    </>
  );
}
