export interface ClientRef {
  id: string;
  name: string;
  location: string;
  profession: string;
  document_id: string | null;
  contract_value: number;
}

export interface BlogProjectRef {
  id: string;
  slug: string;
  name: string;
  description?: string;
  status?: string;
  clients?: ClientRef[];
  img?: string;
}

export interface BlogPost {
  slug: string
  title: string
  faq_group_slug?: string
  image?: string
  category: { id: string; slug: string; name: string } | null
  project: BlogProjectRef | null
  date?: string
  author?: string
  author_image?: string
  author_role?: string
  content?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  banner_images?: { id: string; url: string; name: string; isPrimary?: boolean }[]
  model_3d_block?: string
  video_block_url?: string
  video_embed_url?: string
  reel_blocks?: { url: string }[]
  updated_at?: string
}
