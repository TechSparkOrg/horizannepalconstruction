import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { FaqItem, FaqGroupResponse } from "@/api/types/faq.types"

export function getFaqs(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<FaqItem>> {
  const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
  return apiGet<PaginatedResponse<FaqItem>>(`/faq/${qs}`);
}

export function getFaqsByCategory(categorySlug: string, type?: string): Promise<PaginatedResponse<FaqItem>> {
  const params = new URLSearchParams({ group__category_slug: categorySlug });
  if (type) params.set("group__slug", type);
  return apiGet<PaginatedResponse<FaqItem>>(`/faq/?${params}`);
}

export function getFaqGroups(): Promise<PaginatedResponse<FaqGroupResponse>> {
  return apiGet<PaginatedResponse<FaqGroupResponse>>("/faq/groups/");
}
