import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { BlogPost } from "@/api/types/blog.types"

export function getBlogs(): Promise<PaginatedResponse<BlogPost>> {
  return apiGet<PaginatedResponse<BlogPost>>("/blog/")
}

export function getBlogBySlug(slug: string): Promise<BlogPost> {
  return apiGet<BlogPost>(`/blog/${slug}/`)
}

export const getBlogsByCategory = (categorySlug: string): Promise<PaginatedResponse<BlogPost>> =>
  apiGet<PaginatedResponse<BlogPost>>(`/blog/?category=${categorySlug}`)
