import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { BlogPost } from "@/api/types/blog.types"

export async function getBlogBySlugSafe(slug: string): Promise<BlogPost | null> {
  try {
    return await apiGet<BlogPost>(`/blog/${slug}/`)
  } catch (err) {
    console.error("Failed to fetch blog post:", err)
    return null
  }
}

export async function getBlogsSafe(): Promise<BlogPost[]> {
  try {
    const res = await apiGet<PaginatedResponse<BlogPost>>("/blog/");
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    return [];
  }
}

export async function getBlogsByCategorySafe(categorySlug: string): Promise<BlogPost[]> {
  try {
    const res = await apiGet<PaginatedResponse<BlogPost>>(`/blog/?category=${categorySlug}`);
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch blogs by category:", err);
    return [];
  }
}
