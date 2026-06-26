import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LdJson } from "@/components/global_ui/JsonLd";

const HowWeWorkHero = dynamic(() => import("@/components/page_ui/HowWeWorkHero").then((m) => ({ default: m.HowWeWorkHero })));
const WelcomeText = dynamic(() => import("@/components/page_ui/WelcomeText").then((m) => ({ default: m.WelcomeText })));
const HowWeWorkProcess = dynamic(() => import("@/components/page_ui/HowWeWorkProcess").then((m) => ({ default: m.HowWeWorkProcess })));
const HowWeWorkDesignGrid = dynamic(() => import("@/components/page_ui/HowWeWorkDesignGrid").then((m) => ({ default: m.HowWeWorkDesignGrid })));
const FAQAccordion = dynamic(() => import("@/components/global_ui/faq-accordion").then((m) => ({ default: m.FAQWrapper })));
const QuoteBannerSecondary = dynamic(() => import("@/components/page_ui/QuoteBannerSecondary").then((m) => ({ default: m.QuoteBannerSecondary })));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How We Work | Horizan Nepal",
    description:
      "Discover Horizan Nepal's step-by-step design and construction process. From consultation to handover, see how we bring your dream project to life.",
    openGraph: {
      title: "How We Work | Horizan Nepal",
      description:
        "Discover Horizan Nepal's step-by-step design and construction process from consultation to handover.",
      type: "website",
      url: `${siteUrl}/how-we-work`,
    },
    alternates: { canonical: `${siteUrl}/how-we-work` },
  };
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "How We Work", item: `${siteUrl}/how-we-work` },
  ],
};

export default function HowWeWorkPage() {
  return (
    <>
      <LdJson data={breadcrumb} />
      <HowWeWorkHero />
      <WelcomeText />
      <HowWeWorkProcess />
      <HowWeWorkDesignGrid />
      <FAQAccordion />
      <QuoteBannerSecondary />
    </>
  );
}
