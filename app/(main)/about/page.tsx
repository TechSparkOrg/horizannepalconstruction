import type { Metadata } from "next";
import { AboutHero } from "@/components/AboutHero";
import { AboutTabs } from "@/components/AboutTabs";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutGallery } from "@/components/AboutGallery";
import { TeamSection } from "@/components/TeamSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ConsultationForm } from "@/components/ConsultationForm";
import { LocationSection } from "@/components/LocationSection";
import { getTeam } from "@/api/cached/team";
import { getReviews } from "@/api/cached/review";
import { getCategories } from "@/api/cached/category";
import { getFaqs } from "@/api/cached/faq";
import { getBanners } from "@/api/cached/banner";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "About | Horizan Nepal",
  description:
    "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal since 1999.",
  openGraph: {
    title: "About | Horizan Nepal",
    description:
      "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal.",
    type: "website",
    url: `${siteUrl}/about`,
  },
  alternates: { canonical: `${siteUrl}/about` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Horizan Nepal",
  description: "Architecture, Engineering & Construction services across Nepal since 1999.",
};

export default async function AboutPage() {
  const [teamRes, reviewsRes, categoriesRes, faqRes, galleryRes] = await Promise.allSettled([
    getTeam(),
    getReviews(),
    getCategories(),
    getFaqs(),
    getBanners("about-page-gallary-list"),
  ]);
  const team = teamRes.status === "fulfilled" ? teamRes.value.results ?? [] : [];
  const reviews = reviewsRes.status === "fulfilled" ? reviewsRes.value.results ?? [] : [];
  const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value.results ?? [] : [];
  const faqItems = faqRes.status === "fulfilled" ? faqRes.value.results ?? [] : [];
  const galleryImages = galleryRes.status === "fulfilled" ? galleryRes.value : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <AboutHero />
      <AboutTabs />
      <ServicesSection />
      <AboutGallery initialImages={galleryImages} />
      <TeamSection initialMembers={team} />
      <TestimonialsSection initialReviews={reviews} />
      <ConsultationForm initialCategories={categories} initialFaqItems={faqItems} />
      <LocationSection />
    </>
  );
}
