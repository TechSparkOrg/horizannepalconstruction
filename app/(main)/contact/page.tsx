import type { Metadata } from "next";
import { LdJson } from "@/components/JsonLd";
import { ContactHero } from "@/components/sections/ContactHero";
import { ConsultationForm } from "@/components/ConsultationForm";
import { LocationSection } from "@/components/LocationSection";
import { getCategories } from "@/api/cached/category";
import { getFaqs } from "@/api/cached/faq";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact | Horizan Nepal",
    description:
      "Get in touch with Horizan Nepal. Schedule a consultation, visit our office, or reach out to discuss your dream project. We're here to help you build better.",
    openGraph: {
      title: "Contact | Horizan Nepal",
      description:
        "Get in touch with Horizan Nepal. Schedule a consultation or visit our office.",
      type: "website",
    },
    alternates: { canonical: `${siteUrl}/contact` },
  };
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
  ],
};

export default async function ContactPage() {
  const [categoriesRes, faqRes] = await Promise.allSettled([
    getCategories(),
    getFaqs(),
  ]);
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
      <LdJson data={breadcrumb} />
      {faqPageSchema && <LdJson data={faqPageSchema} />}
      <ContactHero />
      <ConsultationForm initialCategories={categories} initialFaqItems={faqItems} />
      <LocationSection />
    </>
  );
}
