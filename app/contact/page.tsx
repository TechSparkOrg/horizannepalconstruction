import type { Metadata } from "next";
import dynamic from "next/dynamic";
import BlogContent from "@/components/page_ui/BlogContent.client";
import { LdJson } from "@/components/global_ui/JsonLd";
import { ContactHero } from "@/components/page_ui/ContactHero";
import { getCategories } from "@/api/services/category.service";
import { getFaqs } from "@/api/services/faq.service";
import { getPageBySlug } from "@/api/services/page.service";

const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then(m => ({ default: m.ConsultationForm })));
const LocationSection = dynamic(() => import("@/components/global_ui/LocationSection").then(m => ({ default: m.LocationSection })));

import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";

const SLUG = "contact"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch(() => null)
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Contact | Horizan Nepal",
    description: page?.meta_description || "Get in touch with Horizan Nepal. Schedule a consultation, visit our office, or reach out to discuss your dream project.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Contact | Horizan Nepal",
      description: page?.meta_description || "Get in touch with Horizan Nepal. Schedule a consultation or visit our office.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function ContactPage() {
  const [pageData, categoriesRes, faqRes] = await Promise.allSettled([
    getPageBySlug(SLUG),
    getCategories(),
    getFaqs(),
  ]);
  const page = pageData.status === "fulfilled" ? pageData.value : null
  const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value.results ?? [] : [];
  const faqItems = faqRes.status === "fulfilled" ? faqRes.value.results ?? [] : [];

  const faqPageSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question?.en ?? "",
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer?.en ?? "",
      },
    })),
  } : null;

  return (
    <>
      <LdJson data={breadcrumbList("Contact", "contact")} />
      {faqPageSchema && <LdJson data={faqPageSchema} />}
      <ContactHero initialBanners={page?.banner_images} />
      <ConsultationForm initialCategories={categories} />
      <LocationSection />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <BlogContent content={page.content} />
        </div>
      )}
    </>
  );
}
