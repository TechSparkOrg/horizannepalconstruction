import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Page } from "@/api/types/page.types"

export function getPageBySlug(slug: string): Promise<Page> {
  return apiGet<Page>(`/pages/${slug}`)
}


