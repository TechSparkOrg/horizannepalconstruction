import { api, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Category, ServiceCategory, ServiceCategoryDetail, ProjectCategoryDetail } from "@/api/types/category.types"

export async function getCategoriesSafe(): Promise<PaginatedResponse<Category>> {
  try {
    return await api.get<PaginatedResponse<Category>>("/blog/categories/")
  } catch (err) {
    console.error("Failed to fetch categories:", err)
    return { results: [], count: 0, next: null, previous: null }
  }
}

export async function getServiceCategoriesSafe(): Promise<ServiceCategory[]> {
  try {
    return await api.get<ServiceCategory[]>("/categories/services")
  } catch (err) {
    console.error("Failed to fetch service categories:", err)
    return []
  }
}

export async function getServiceCategoryDetailSafe(slug: string): Promise<ServiceCategoryDetail | null> {
  try {
    return await api.get<ServiceCategoryDetail>(`/categories/services/${slug}`)
  } catch (err) {
    console.error("Failed to fetch service category detail:", err)
    return null
  }
}

export async function getPublicProjectCategoriesSafe(): Promise<Category[]> {
  try {
    return await api.get<Category[]>("/categories/project")
  } catch (err) {
    console.error("Failed to fetch public project categories:", err)
    return []
  }
}

export async function getProjectCategoryDetailSafe(slug: string): Promise<ProjectCategoryDetail | null> {
  try {
    return await api.get<ProjectCategoryDetail>(`/categories/project/${slug}`)
  } catch (err) {
    console.error("Failed to fetch project category detail:", err)
    return null
  }
}

export const CategoryPublic = {
  list: getCategoriesSafe,
  listSafe: getCategoriesSafe,
}
