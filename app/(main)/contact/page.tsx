import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LdJson } from "@/components/JsonLd";
import { ContactHero } from "@/components/sections/ContactHero";
import { getCategories } from "@/api/cached/category";
import { getFaqs } from "@/api/cached/faq";
import { getBanners } from "@/api/cached/banner";

const ConsultationForm = dynamic(() => import("@/components/ConsultationForm").then(m => ({ default: m.ConsultationForm })));
const LocationSection = dynamic(() => import("@/components/LocationSection").then(m => ({ default: m.LocationSection })));

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

  const banners = await getBanners("contact-us-page-hero").catch(() => null);
  return (
    <>
      {banners?.map((b) =>
        b.url ? <link rel="preload" as="image" href={b.url} key={b.id} /> : null
      )}
      <LdJson data={breadcrumb} />
      {faqPageSchema && <LdJson data={faqPageSchema} />}
      <ContactHero initialBanners={banners ?? undefined} />
      <ConsultationForm initialCategories={categories} />
      <LocationSection />
    </>
  );
}
