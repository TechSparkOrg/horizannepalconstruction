import type { Metadata } from "next";
import { LdJson } from "@/components/global_ui/JsonLd";
import { PageHero } from "@/components/global_ui/page-hero";
import { FAQTimeline } from "@/components/page_ui/FAQTimeline";
import { ConsultationForm } from "@/components/global_ui/ConsultationForm";
import { getFaqGroups } from "@/api/services/faq.service";

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

export default async function FAQPage() {
  let initialGroups: Awaited<ReturnType<typeof getFaqGroups>>["results"] = [];
  try {
    const res = await getFaqGroups();
    initialGroups = res.results ?? [];
  } catch {
    // groups will be empty, FAQTimeline renders empty state
  }

  return (
    <>
      <LdJson data={breadcrumb} />
      <PageHero slug="faq-page-hero" badge="FAQ" minHeight='80vh' heading="Frequently Asked Questions" description="Everything you need to know about working with Horizon Nepal — from pricing to process." />
      <FAQTimeline initialGroups={initialGroups} />
      <ConsultationForm />
    </>
  );
}
