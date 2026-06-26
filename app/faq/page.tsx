import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LdJson } from "@/components/global_ui/JsonLd";

const PageHeroComponent = dynamic(() => import("@/components/global_ui/page-hero").then((m) => ({ default: m.PageHero })));
const FAQTimeline = dynamic(() => import("@/components/page_ui/FAQTimeline").then((m) => ({ default: m.FAQTimeline })));
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then((m) => ({ default: m.ConsultationForm })));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQ | Horizan Nepal",
    description:
      "Frequently asked questions about Horizan Nepal's services, design process, construction timeline, costing, and more. Find answers to common queries.",
    openGraph: {
      title: "FAQ | Horizan Nepal",
      description:
        "Frequently asked questions about Horizan Nepal's services, design process, and construction timeline.",
      type: "website",
      url: `${siteUrl}/faq`,
    },
    alternates: { canonical: `${siteUrl}/faq` },
  };
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteUrl}/faq` },
  ],
};

export default function FAQPage() {
  return (
    <>
      <LdJson data={breadcrumb} />
      <PageHeroComponent slug="faq-page-hero" badge="FAQ" heading="Frequently Asked Questions" description="Everything you need to know about working with Horizon Nepal — from pricing to process." />
      <FAQTimeline />
      <ConsultationForm />
    </>
  );
}
