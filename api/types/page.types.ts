export interface Page {
  id: string
  slug: string
  title: string
  description?: string
  content?: string
  image?: string
  sections?: PageSection[]
  meta_title?: string
  meta_description?: string
  updated_at?: string
}

export interface PageSection {
  id: string
  page: string
  section_key: string
  title?: string
  content: string
  order?: number
}
