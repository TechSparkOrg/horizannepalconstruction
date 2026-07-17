import type { Metadata } from "next";
import dynamic from "next/dynamic";
import BlogContent from "@/components/page_ui/BlogContent.client";
import { LdJson } from "@/components/global_ui/JsonLd";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";

const HowWeWorkHero = dynamic(() => import("@/components/page_ui/HowWeWorkHero").then((m) => ({ default: m.HowWeWorkHero })));
const WelcomeText = dynamic(() => import("@/components/page_ui/WelcomeText").then((m) => ({ default: m.WelcomeText })));
const HowWeWorkProcess = dynamic(() => import("@/components/page_ui/HowWeWorkProcess").then((m) => ({ default: m.HowWeWorkProcess })));
const HowWeWorkDesignGrid = dynamic(() => import("@/components/page_ui/HowWeWorkDesignGrid").then((m) => ({ default: m.HowWeWorkDesignGrid })));
const FAQAccordion = dynamic(() => import("@/components/global_ui/faq-accordion").then((m) => ({ default: m.FAQWrapper })));
const QuoteBannerSecondary = dynamic(() => import("@/components/page_ui/QuoteBannerSecondary").then((m) => ({ default: m.QuoteBannerSecondary })));

const SLUG = "how-we-work"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch((err) => { console.error("Failed to fetch how-we-work page:", err); return null; })
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "How We Work | Horizan Nepal",
    description: page?.meta_description || "Discover Horizan Nepal's step-by-step design and construction process. From consultation to handover, see how we bring your dream project to life.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "How We Work | Horizan Nepal",
      description: page?.meta_description || "Discover Horizan Nepal's step-by-step design and construction process from consultation to handover.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function HowWeWorkPage() {
  const page = await getPageBySlug(SLUG).catch((err) => { console.error("Failed to fetch how-we-work page:", err); return null; })

  return (
    <>
      <LdJson data={breadcrumbList("How We Work", "how-we-work")} />
      <HowWeWorkHero initialBanners={page?.banner_images} />
      <WelcomeText />
      <HowWeWorkProcess />
      <HowWeWorkDesignGrid />
      <FAQAccordion />
      <QuoteBannerSecondary />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <BlogContent content={page.content} />
        </div>
      )}
    </>
  );
}
