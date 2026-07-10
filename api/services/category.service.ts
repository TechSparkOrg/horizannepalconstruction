import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Category, ServiceCategory, ServiceCategoryDetail, ProjectCategoryDetail } from "@/api/types/category.types"

export function getCategories(): Promise<PaginatedResponse<Category>> {
  return apiGet<PaginatedResponse<Category>>("/blog/categories/")
}

export function getServiceCategories(): Promise<ServiceCategory[]> {
  return apiGet<ServiceCategory[]>("/categories/services")
}

export function getServiceCategoryDetail(slug: string): Promise<ServiceCategoryDetail> {
  return apiGet<ServiceCategoryDetail>(`/categories/services/${slug}`)
}

export function getPublicBlogCategories(): Promise<Category[]> {
  return apiGet<Category[]>("/categories/blog")
}

export function getPublicProjectCategories(): Promise<Category[]> {
  return apiGet<Category[]>("/categories/project")
}

export function getProjectCategoryDetail(slug: string): Promise<ProjectCategoryDetail> {
  return apiGet<ProjectCategoryDetail>(`/categories/project/${slug}`)
}

export const CategoryPublic = { list: getCategories }
