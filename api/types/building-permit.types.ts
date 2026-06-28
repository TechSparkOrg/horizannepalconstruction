export interface BilingualPair {
  en: string
  np: string
}

export interface WorkflowStep {
  name: string
  description: BilingualPair
  duration: string
  requiredDocs: { name: string; imageUrl: string }[]
}

export interface RegulationItem {
  name: string
  items: BilingualPair[]
}

export interface MunicipalityItem {
  district: string
  phone: string
  location: string
}

export interface BannerItem {
  url: string
  name: string
}

export interface BuildingPermitConfig {
  id: string
  title: string
  slug: string
  is_active: boolean
  workflow_steps: WorkflowStep[]
  regulation_items: RegulationItem[]
  municipality_items: MunicipalityItem[]
  banners: BannerItem[]
  meta_title: string
  meta_keywords: string
  meta_description: string
  created_at: string
  updated_at: string
}
