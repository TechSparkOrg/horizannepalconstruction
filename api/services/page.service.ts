import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Page, PageSection } from "@/api/types/page.types"

export function getPages(): Promise<PaginatedResponse<Page>> {
  return apiGet<PaginatedResponse<Page>>("/pages/")
}

export function getPageBySlug(slug: string): Promise<Page> {
  return apiGet<Page>(`/pages/${slug}/`)
}

export function getPageSections(): Promise<PageSection[]> {
  return apiGet<PageSection[]>("/pages/sections/")
}
