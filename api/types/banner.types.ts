export interface Banner {
  id: string
  url: string
  alt: string
  title: string
  slug?: string
  meta_title?: string
  meta_description?: string
  keywords?: string
  group_title?: string
  banner?: boolean
  is_active?: boolean
  project_link?: string
  custom_fields?: unknown[]
  created_at?: string
  updated_at?: string
}

export interface BannerGroup {
  slug: string
  title: string
  alt: string
  meta_title: string
  meta_description: string
  keywords: string
  is_active: boolean
  image_count: number
  images: Array<{ id: string; url: string }>
}
