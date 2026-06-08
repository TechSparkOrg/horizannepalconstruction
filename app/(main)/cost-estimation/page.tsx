import type { Metadata } from "next";
import { CostEstimationHero } from "@/components/sections/CostEstimationHero";
import { CostEstimationContent } from "@/components/sections/CostEstimationContent";
import { CostEstimator } from "@/components/sections/CostEstimator";

export const metadata: Metadata = {
  title: "Cost Estimation | Horizan Nepal",
  description:
    "Estimate the cost of your construction project with Horizan Nepal's transparent costing tool. Get a detailed breakdown for materials, labor, and more.",
  openGraph: {
    title: "Cost Estimation | Horizan Nepal",
    description:
      "Estimate the cost of your construction project with Horizan Nepal's transparent costing tool.",
    type: "website",
  },
};

export default function CostEstimationPage() {
  return (
    <>
      <CostEstimationHero />
      <CostEstimationContent />
      <CostEstimator />
    </>
  );
}
