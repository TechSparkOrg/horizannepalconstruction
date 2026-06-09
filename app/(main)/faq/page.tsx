import type { Metadata } from "next";
import { FAQHero } from "@/components/sections/FAQHero";
import { FAQTimeline } from "@/components/sections/FAQTimeline";
import { ConsultationForm } from "@/components/ConsultationForm";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
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

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteUrl}/faq` },
  ],
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

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FAQHero />
      <FAQTimeline />
      <ConsultationForm />
    </>
  );
}
