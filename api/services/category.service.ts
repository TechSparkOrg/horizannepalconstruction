import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Category } from "@/api/types/category.types"

export function getCategories(): Promise<PaginatedResponse<Category>> {
  return apiGet<PaginatedResponse<Category>>("/blog/categories/")
}

export const CategoryPublic = { list: getCategories }
