export interface ProjectSpec {
  label: string
  value: string
}

export interface ProjectMaterial {
  name: string
  desc: string
}

export interface ProjectCostItem {
  item: string
  amount: string
}

export interface ProjectSocialLink {
  platform: string
  url: string
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  location?: string
  completion?: string
  thumbnail?: string
  images?: string[]
  file?: string
  specs?: ProjectSpec[]
  materials?: ProjectMaterial[]
  cost_estimation?: ProjectCostItem[]
  gallery?: string[]
  social_links?: ProjectSocialLink[]
  updated_at?: string
  category_id?: string
  category_name?: string
}
