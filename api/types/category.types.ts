export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  section?: string
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string
}

import type { BannerImage } from "@/api/types/material.types"

export interface ServiceCategoryDetail extends ServiceCategory {
  image: string
  type: string
  section: string
  is_active: boolean
  meta_title: string
  meta_description: string
  meta_keywords: string
  banner_images: BannerImage[]
  parent_id: string | null
  faq_group_slug?: string
  roles?: Array<{ id: string; name: string }>
  attributes?: Array<{ id: string; name: string }>
  blog_categories?: { name: string; slug: string }[]
  project_categories?: { name: string; slug: string }[]
  created_at: string
  updated_at: string
}

export interface ProjectCategoryDetail {
  id: string
  name: string
  slug: string
  description: string // HTML
  image?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  faq_group_slug?: string
  banner_images?: BannerImage[]
  service_id?: string | null
  parent_id?: string | null
  section?: string
  type?: string
  is_active?: boolean
  created_at?: string
  updated_at?: string
}
