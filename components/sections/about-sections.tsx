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

export async function AboutServicesAsync() {
  "use cache";
  const services = await getServiceCategories().catch(() => []);
  return <ServicesSection initialServices={services} />;
}

export async function AboutPartnersAsync() {
  "use cache";
  const [vRes, bRes] = await Promise.all([
    getVendors().catch(() => ({ results: [] as PublicVendor[] })),
    getBanks().catch(() => [] as EmiBank[]),
  ]);
  return (
    <PartnersSection
      initialVendors={vRes.results ?? []}
      initialBanks={bRes as EmiBank[]}
    />
  );
}

export async function AboutReviewsAsync() {
  "use cache";
  const reviews = await ReviewPublic.list().catch(() => ({ results: [] }));
  return <TestimonialsSection initialReviews={reviews.results} />;
}

export async function AboutConsultAsync() {
  "use cache";
  const cats = await CategoryPublic.list().catch(() => ({ results: [] }));
  return <ConsultationForm initialCategories={cats.results} />;
}

export async function AboutFaqAsync({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 10 }).catch(() => ({ results: [] }));
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}

export async function AboutTeamAsync() {
  "use cache";
  const res = await getTeam().catch(() => ({ results: [] }));
  return <TeamSection members={res.results} />;
}
