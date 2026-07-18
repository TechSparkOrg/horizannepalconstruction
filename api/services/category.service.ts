import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Category, ServiceCategory, ServiceCategoryDetail, ProjectCategoryDetail } from "@/api/types/category.types"

export function getCategories(): Promise<PaginatedResponse<Category>> {
  return apiGet<PaginatedResponse<Category>>("/blog/categories/")
}

export function getServiceCategories(): Promise<ServiceCategory[]> {
  return apiGet<ServiceCategory[]>("/categories/services")
}

export async function getServiceCategoryDetailSafe(slug: string): Promise<ServiceCategoryDetail | null> {
  try {
    return await apiGet<ServiceCategoryDetail>(`/categories/services/${slug}`)
  } catch (err) {
    console.error("Failed to fetch service category detail:", err)
    return null
  }
}

export function getPublicProjectCategories(): Promise<Category[]> {
  return apiGet<Category[]>("/categories/project")
}

export async function getProjectCategoryDetailSafe(slug: string): Promise<ProjectCategoryDetail | null> {
  try {
    return await apiGet<ProjectCategoryDetail>(`/categories/project/${slug}`)
  } catch (err) {
    console.error("Failed to fetch project category detail:", err)
    return null
  }
}

export const CategoryPublic = { list: getCategories }
