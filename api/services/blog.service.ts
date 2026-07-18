import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { BlogPost } from "@/api/types/blog.types"

export function getBlogs(): Promise<PaginatedResponse<BlogPost>> {
  return apiGet<PaginatedResponse<BlogPost>>("/blog/")
}

export async function getBlogBySlugSafe(slug: string): Promise<BlogPost | null> {
  try {
    return await apiGet<BlogPost>(`/blog/${slug}/`)
  } catch (err) {
    console.error("Failed to fetch blog post:", err)
    return null
  }
}

export const getBlogsByCategory = (categorySlug: string): Promise<PaginatedResponse<BlogPost>> =>
  apiGet<PaginatedResponse<BlogPost>>(`/blog/?category=${categorySlug}`)

export async function getBlogsSafe(): Promise<BlogPost[]> {
  try {
    const res = await getBlogs();
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    return [];
  }
}

export async function getBlogsByCategorySafe(categorySlug: string): Promise<BlogPost[]> {
  try {
    const res = await getBlogsByCategory(categorySlug);
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch blogs by category:", err);
    return [];
  }
}
