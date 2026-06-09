import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/HeroSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FeaturedProjects } from "@/components/FeaturedProjects";

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Horizon Nepal offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide end-to-end architectural design, engineering, construction management, interior design, material consultation, and site supervision for residential, commercial, and heritage projects across Nepal.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timelines vary by scope. A standard residential project takes 6–12 months from design to completion. Commercial projects range from 12–24 months depending on complexity and size.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle government approvals and permits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we manage all necessary municipal approvals, building permits, and environmental clearances as part of our full-service offering.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cost structure for your services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our pricing is transparent and project-specific. We offer fixed-fee, percentage-of-project, and phased payment models. A detailed quotation is provided after the initial consultation and site assessment.",
      },
    },
    {
      "@type": "Question",
      name: "Can I visit ongoing projects to see your work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We encourage potential clients to visit our active project sites. Please contact us to schedule a visit at your convenience.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeroSection />
      <WhyChooseUs />
      <FeaturedProjects />
      <HomeGallery />
      <FAQSection />
    </>
  );
}
