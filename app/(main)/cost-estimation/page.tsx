import { CostEstimationHero } from "@/components/sections/CostEstimationHero";
import { CostEstimationContent } from "@/components/sections/CostEstimationContent";
import { CostEstimator } from "@/components/sections/CostEstimator";

export default function CostEstimationPage() {
  return (
    <>
      <CostEstimationHero />
      <CostEstimationContent />
      <CostEstimator />
    </>
  );
}
