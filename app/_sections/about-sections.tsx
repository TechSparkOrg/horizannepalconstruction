import { cacheLife } from "next/cache";
import { getServiceCategories } from "@/api/services/category.service";
import { getVendors } from "@/api/services/vendor-public.service";
import { getBanks } from "@/api/services/emi.service";
import { ReviewPublic } from "@/api/services/review.service";
import { CategoryPublic } from "@/api/services/category.service";
import { ServicesSection } from "@/components/global_ui/ServicesSection";
import { PartnersSection } from "@/components/page_ui/PartnersSection";
import { TestimonialsSection } from "@/components/global_ui/TestimonialsSection";
import { ConsultationForm } from "@/components/global_ui/ConsultationForm";

export async function AboutServicesAsync() {
  "use cache";
  cacheLife("default");
  const services = await getServiceCategories().catch(() => []);
  return <ServicesSection initialServices={services} />;
}

export async function AboutPartnersAsync() {
  "use cache";
  cacheLife("default");
  const [vRes, bRes] = await Promise.all([
    getVendors().catch(() => ({ results: [] as any[] })),
    getBanks().catch(() => [] as any[]),
  ]);
  return (
    <PartnersSection
      initialVendors={vRes.results ?? []}
      initialBanks={bRes as any[]}
    />
  );
}

export async function AboutReviewsAsync() {
  "use cache";
  cacheLife("default");
  const reviews = await ReviewPublic.list().catch(() => ({ results: [] }));
  return <TestimonialsSection initialReviews={reviews.results} />;
}

export async function AboutConsultAsync() {
  "use cache";
  cacheLife("default");
  const cats = await CategoryPublic.list().catch(() => ({ results: [] }));
  return <ConsultationForm initialCategories={cats.results} />;
}
