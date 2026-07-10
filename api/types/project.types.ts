export interface ProjectBannerImage {
  id: string
  url: string
  name?: string
  isPrimary?: boolean
}

export interface ProjectClient {
  id: string
  name: string
  location?: string
  contract_value?: number
  profession?: string
  document_id?: string
}

export interface ProjectMilestoneImage {
  id: string
  url: string
  name?: string
}

export interface ProjectMilestoneVideoEmbed {
  id: string
  url: string
  platform?: string
}

export interface ProjectMilestone {
  id: string
  images?: ProjectMilestoneImage[]
  video_url?: string
  description?: string
  date_started?: string
  estimated_end?: string
  completed_date?: string
  model_3d_url?: string
  video_embed_urls?: ProjectMilestoneVideoEmbed[]
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string // HTML
  category?: { id: string; slug: string; name: string }
  status?: string // ongoing | completed | paused
  pause_reason?: string
  priority?: string
  thumbnail?: string
  banner_images?: ProjectBannerImage[]
  clients?: ProjectClient[]
  milestones?: ProjectMilestone[]
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  is_published?: boolean
  faq_group_slug?: string
  boq_slug?: string
  author?: string
  author_image?: string
  author_role?: string
  created_at?: string
  updated_at?: string

  // Legacy fields still consumed by list cards / design page
  location?: string
  completion?: string
  images?: string[]
  file?: string
}
