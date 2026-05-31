import { Suspense } from "react";
import { HowWeWorkHero } from "@/components/sections/HowWeWorkHero";
import { WelcomeText } from "@/components/sections/WelcomeText";
import { HowWeWorkProcess } from "@/components/sections/HowWeWorkProcess";
import { HowWeWorkDesignGrid } from "@/components/sections/HowWeWorkDesignGrid";
import { FAQWrapper } from "@/components/FAQWrapper";
import { QuoteBannerSecondary } from "@/components/sections/QuoteBannerSecondary";

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
