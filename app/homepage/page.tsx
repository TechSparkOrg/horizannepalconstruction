import { Suspense } from "react";
import { QuoteBannerSecondary } from "@/components/page_ui/QuoteBannerSecondary";
import { ViewportSection } from "../_components/ViewportSection";
import {
  ServicesAsync,
  GalleryAsync,
  FeaturedAsync,
  BlogAsync,
  FAQAsync,
} from "../_sections/homepage-sections";

export default function HomepagePage() {
  return (
    <>
      <Suspense fallback={null}>
        <ServicesAsync />
      </Suspense>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-off-white" />}>
        <Suspense fallback={null}>
          <GalleryAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff]" />}>
        <Suspense fallback={null}>
          <FeaturedAsync />
        </Suspense>
      </ViewportSection>
      <QuoteBannerSecondary />
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff]" />}>
        <Suspense fallback={null}>
          <BlogAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-20 bg-[#f5f8ff]" />}>
        <Suspense fallback={null}>
          <FAQAsync />
        </Suspense>
      </ViewportSection>
    </>
  );
}
