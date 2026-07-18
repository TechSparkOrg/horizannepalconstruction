import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { FaqItem, FaqGroupResponse } from "@/api/types/faq.types"

export function getFaqs(params?: Record<string, string | number>): Promise<PaginatedResponse<FaqItem>> {
  const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
  return apiGet<PaginatedResponse<FaqItem>>(`/faq/${qs}`);
}

export function getFaqsByCategory(categorySlug: string, type?: string): Promise<PaginatedResponse<FaqItem>> {
  const params = new URLSearchParams({ group__category_slug: categorySlug });
  if (type) params.set("group__slug", type);
  return apiGet<PaginatedResponse<FaqItem>>(`/faq/?${params}`);
}

export async function getFaqGroupsSafe(): Promise<FaqGroupResponse[]> {
  try {
    const res = await apiGet<PaginatedResponse<FaqGroupResponse>>("/faq/groups/");
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch FAQ groups:", err);
    return [];
  }
}

export async function getFaqsSafeRaw(params?: Record<string, string | number>): Promise<FaqItem[]> {
  try {
    const res = await getFaqs(params);
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch FAQs:", err);
    return [];
  }
}

export async function getFaqsSafe(params?: Record<string, string | number>): Promise<{ q: string; a: string }[]> {
  try {
    const res = await getFaqs(params);
    return (res.results ?? []).map((item) => ({
      q: item.question?.en ?? "",
      a: item.answer?.en ?? "",
    }));
  } catch (err) {
    console.error("Failed to fetch FAQs:", err);
    return [];
  }
}
