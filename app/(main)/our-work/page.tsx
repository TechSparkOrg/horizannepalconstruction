import type { Metadata } from "next";
import { OurWorkHero } from "@/components/sections/OurWorkHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ConsultationForm } from "@/components/ConsultationForm";
import { getBanners } from "@/api/cached/banner";
import { getCategories } from "@/api/cached/category";
import { getFaqs } from "@/api/cached/faq";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Our Work | Horizan Nepal",
  description:
    "Browse Horizan Nepal's portfolio of completed architectural and construction projects. See our finest work in residential and commercial design across Nepal.",
  openGraph: {
    title: "Our Work | Horizan Nepal",
    description:
      "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
    type: "website",
    url: `${siteUrl}/our-work`,
  },
  alternates: { canonical: `${siteUrl}/our-work` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Our Work", item: `${siteUrl}/our-work` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Our Work | Horizan Nepal",
  description: "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
  url: `${siteUrl}/our-work`,
};

export default async function OurWorkPage() {
  const [heroBannersRes, categoriesRes, faqRes] = await Promise.allSettled([
    getBanners("our-work-page-hero"),
    getCategories(),
    getFaqs(),
  ]);
  const heroBanners = heroBannersRes.status === "fulfilled" ? heroBannersRes.value : [];
  const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value.results ?? [] : [];
  const faqItems = faqRes.status === "fulfilled" ? faqRes.value.results ?? [] : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <OurWorkHero initialImages={heroBanners} />
      <ProjectGallery />
      <ConsultationForm initialCategories={categories} initialFaqItems={faqItems} />
    </>
  );
}
