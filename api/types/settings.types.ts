export interface SiteSettings {
  id: string
  site_name?: string
  site_description?: string
  logo?: string
  favicon?: string
  contact_info?: {
    phone?: string
    email?: string
    address?: string
    whatsappNumber?: string
    mapEmbed?: string
  }
  company_info?: {
    name?: string
    description?: string
  }
  social_links?: Array<{
    url?: string
    label?: string
    platform?: string
  }>
  seo?: {
    title?: string
    description?: string
  }
  scripts?: {
    head?: string
    body?: string
  }
}
