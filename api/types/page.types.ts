import type { MediaItem } from "./media.types"

export interface PageSvgItem {
  id: string
  url: string
  name: string
  lazy_spinner: boolean
  sort_order: number
}

export interface Page {
  id: string
  slug: string
  title: string
  content?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  is_active?: boolean
  is_published?: boolean
  publish_date?: string | null
  banner_images?: MediaItem[]
  svg_items?: PageSvgItem[]
  author_name?: string
  author_image?: string
  author_team_id?: string
  faq_group_slug?: string
  created_at?: string
  updated_at?: string
}
