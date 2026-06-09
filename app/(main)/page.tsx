import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/HeroSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { getProjects } from "@/api/cached/project";
import { getFaqs } from "@/api/cached/faq";
import type { Project } from "@/api/types/project.types";

const FAQSection = dynamic(() => import("@/components/FAQSection").then((m) => ({ default: m.FAQSection })));
const HomeGallery = dynamic(() => import("@/components/HomeGallery").then((m) => ({ default: m.HomeGallery })));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Horizan Nepal",
  description:
    "Horizan Nepal — Premier architectural design and construction company in Nepal. Specializing in modern homes, residential projects, and sustainable building solutions.",
  openGraph: {
    title: "Horizan Nepal",
    description:
      "Premier architectural design and construction company in Nepal. Specializing in modern homes, residential projects, and sustainable building solutions.",
    type: "website",
    url: siteUrl,
  },
  alternates: { canonical: siteUrl },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Horizan Nepal",
  url: siteUrl,
  description: "Architecture, Engineering & Construction services across Nepal.",
};

const FALLBACK_FAQS = [
  { q: "What services does Horizon Nepal offer?", a: "We provide end-to-end architectural design, engineering, construction management, interior design, material consultation, and site supervision for residential, commercial, and heritage projects across Nepal." },
  { q: "How long does a typical project take?", a: "Timelines vary by scope. A standard residential project takes 6–12 months from design to completion. Commercial projects range from 12–24 months depending on complexity and size." },
  { q: "Do you handle government approvals and permits?", a: "Yes, we manage all necessary municipal approvals, building permits, and environmental clearances as part of our full-service offering." },
  { q: "What is the cost structure for your services?", a: "Our pricing is transparent and project-specific. We offer fixed-fee, percentage-of-project, and phased payment models. A detailed quotation is provided after the initial consultation and site assessment." },
  { q: "Can I visit ongoing projects to see your work?", a: "Absolutely. We encourage potential clients to visit our active project sites. Please contact us to schedule a visit at your convenience." },
];

export default async function Home() {
  let featuredProjects: Project[];
  try {
    const res = await getProjects();
    featuredProjects = res.results ?? [];
  } catch {
    featuredProjects = [];
  }

  let faqList: { q: string; a: string }[];
  try {
    const res = await getFaqs();
    faqList = res.results?.length > 0
      ? res.results.map((f: { question?: { en?: string }; answer?: { en?: string } }) => ({
          q: f.question?.en ?? "",
          a: f.answer?.en ?? "",
        }))
      : FALLBACK_FAQS;
  } catch {
    faqList = FALLBACK_FAQS;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList
      .filter((f) => f.q && f.a)
      .map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeroSection />
      <WhyChooseUs />
      <FeaturedProjects initialProjects={featuredProjects} />
      <HomeGallery />
      <FAQSection />
    </>
  );
}
