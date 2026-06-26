import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { FaqItem } from "@/api/types/faq.types"

export function getFaqs(): Promise<PaginatedResponse<FaqItem>> {
  return apiGet<PaginatedResponse<FaqItem>>("/faq/")
}

export const FaqPublic = { list: getFaqs }
