import { api } from "@/api/ServiceHelper"

export type BundleResource =
  | "settings"
  | "page"
  | "services"
  | "service_detail"
  | "blogs"
  | "blog_detail"
  | "blog_categories"
  | "projects"
  | "project_detail"
  | "project_category"
  | "projects_by_category"
  | "faqs"
  | "faq_groups"
  | "vendors"
  | "banks"
  | "team"
  | "reviews"
  | "categories"
  | "materials"
  | "material_detail"
  | "unit_conversion"
  | "models"
  | "model_detail"
  | "permit"
  | "vastu_nav"

export type PageType =
  | "home"
  | "about"
  | "material"
  | "blog"
  | "unit-convert"
  | "project-details"
  | "design"
  | "building-permit"
  | "vastu-shastra"
  | "faq"
  | "cost-estimation"
  | "floor-planner"
  | "emi-calculator"
  | "reviews"
  | "request"

export interface BundleOverrides {
  include?: BundleResource[]
  faq_group_slug?: string
  faq_page_size?: number
  blog_limit?: number
  blog_page?: number
  blog_page_size?: number
  project_limit?: number
  project_page?: number
  project_page_size?: number
  faq_page?: number
  project_category?: string
  material_page?: number
  material_page_size?: number
  [key: string]: unknown
}

export type PageBundle<T extends BundleResource[] = BundleResource[]> = {
  [K in T[number]]: unknown
}

export async function getPageBundle<T = Record<string, unknown>>(
  slug: string,
  pageType: PageType,
  overrides?: BundleOverrides,
): Promise<T> {
  try {
    const params = new URLSearchParams({ page_type: pageType })
    if (overrides) {
      const { include, ...rest } = overrides
      if (include && include.length > 0) {
        params.set("include", include.join(","))
      }
      for (const [key, value] of Object.entries(rest)) {
        if (value !== undefined && value !== null) {
          params.set(key, String(value))
        }
      }
    }
    return await api.get<T>(`/page-bundle/${slug}/?${params.toString()}`)
  } catch (err) {
    console.error(`Failed to fetch page bundle for ${pageType}/${slug}:`, err)
    return {} as T
  }
}
