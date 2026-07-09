export interface Category {
  id: string
  name: string
  slug: string
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
  created_at: string
  updated_at: string
}
