import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Category, ServiceCategory, ServiceCategoryDetail } from "@/api/types/category.types"

export function getCategories(): Promise<PaginatedResponse<Category>> {
  return apiGet<PaginatedResponse<Category>>("/blog/categories/")
}

export function getServiceCategories(): Promise<ServiceCategory[]> {
  return apiGet<ServiceCategory[]>("/categories/services")
}

export function getServiceCategoryDetail(slug: string): Promise<ServiceCategoryDetail> {
  return apiGet<ServiceCategoryDetail>(`/categories/services/${slug}`)
}

export const CategoryPublic = { list: getCategories }
