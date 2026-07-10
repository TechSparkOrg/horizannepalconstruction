export interface Model3D {
  id: string
  slug: string
  title: string
  url: string
  description?: string
  image?: string
  updated_at?: string
}

export interface DesignModel {
  id: string
  title: string
  slug: string
  url: string
  description: string
  project: { slug: string; name: string } | null
  category: { id: string; slug: string; name: string } | null
}
