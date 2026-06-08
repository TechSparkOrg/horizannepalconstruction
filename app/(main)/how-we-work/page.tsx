import type { Metadata } from "next";
import { Suspense } from "react";
import { HowWeWorkHero } from "@/components/sections/HowWeWorkHero";
import { WelcomeText } from "@/components/sections/WelcomeText";
import { HowWeWorkProcess } from "@/components/sections/HowWeWorkProcess";
import { HowWeWorkDesignGrid } from "@/components/sections/HowWeWorkDesignGrid";
import { FAQWrapper } from "@/components/FAQWrapper";
import { QuoteBannerSecondary } from "@/components/sections/QuoteBannerSecondary";

export const metadata: Metadata = {
  title: "How We Work | Horizan Nepal",
  description:
    "Discover Horizan Nepal's step-by-step design and construction process. From consultation to handover, see how we bring your dream project to life.",
  openGraph: {
    title: "How We Work | Horizan Nepal",
    description:
      "Discover Horizan Nepal's step-by-step design and construction process from consultation to handover.",
    type: "website",
  },
};

export default function HowWeWorkPage() {
  return (
    <>
      <HowWeWorkHero />
      <WelcomeText />
      <HowWeWorkProcess />
      <HowWeWorkDesignGrid />

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <FAQWrapper />
      </Suspense>

      <QuoteBannerSecondary />
    </>
  );
}
