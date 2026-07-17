import { getTeam } from "@/api/services/team.service";
import { getServiceCategories } from "@/api/services/category.service";
import { getVendors } from "@/api/services/vendor-public.service";
import { getBanks } from "@/api/services/emi.service";
import { ReviewPublic } from "@/api/services/review.service";
import { CategoryPublic } from "@/api/services/category.service";
import { getFaqs } from "@/api/services/faq.service";
import { ServicesSection } from "@/components/global_ui/ServicesSection";
import { PartnersSection } from "@/components/page_ui/PartnersSection";
import type { PublicVendor } from "@/api/types/material.types";
import type { EmiBank } from "@/api/types/emi.types";
import { TestimonialsSection } from "@/components/global_ui/TestimonialsSection";
import { ConsultationForm } from "@/components/global_ui/ConsultationForm";
import FaqClient from "@/components/global_ui/FaqClient";
import { TeamSection } from "@/components/global_ui/TeamSection";

export async function AboutServicesAsync({ svgUrl }: { svgUrl?: string } = {}) {
  "use cache";
  const services = await getServiceCategories().catch((err) => { console.error("Failed to fetch services:", err); return []; });
  return <ServicesSection initialServices={services} svgUrl={svgUrl} />;
}

export async function AboutPartnersAsync({ svgUrl }: { svgUrl?: string } = {}) {
  "use cache";
  const [vRes, bRes] = await Promise.all([
    getVendors().catch((err) => { console.error("Failed to fetch vendors:", err); return { results: [] as PublicVendor[] }; }),
    getBanks().catch((err) => { console.error("Failed to fetch banks:", err); return [] as EmiBank[]; }),
  ]);
  return (
    <PartnersSection
      initialVendors={vRes.results ?? []}
      initialBanks={bRes as EmiBank[]}
      svgUrl={svgUrl}
    />
  );
}

export async function AboutReviewsAsync({ svgUrl }: { svgUrl?: string } = {}) {
  "use cache";
  const reviews = await ReviewPublic.list().catch((err) => { console.error("Failed to fetch reviews:", err); return { results: [] }; });
  return <TestimonialsSection initialReviews={reviews.results} svgUrl={svgUrl} />;
}

export async function AboutConsultAsync({ headerSvgUrl, emailSvgUrl }: { headerSvgUrl?: string; emailSvgUrl?: string } = {}) {
  "use cache";
  const cats = await CategoryPublic.list().catch((err) => { console.error("Failed to fetch categories:", err); return { results: [] }; });
  return <ConsultationForm initialCategories={cats.results} headerSvgUrl={headerSvgUrl} emailSvgUrl={emailSvgUrl} />;
}

export async function AboutFaqAsync({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 10 }).catch((err) => { console.error("Failed to fetch FAQs:", err); return { results: [] }; });
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}

export async function AboutTeamAsync({ svgUrl }: { svgUrl?: string } = {}) {
  "use cache";
  const res = await getTeam().catch((err) => { console.error("Failed to fetch team:", err); return { results: [] }; });
  return <TeamSection members={res.results} svgUrl={svgUrl} />;
}
