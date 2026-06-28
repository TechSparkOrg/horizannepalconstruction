export interface BannerImage {
  id: string;
  url: string;
  name: string;
  isPrimary?: boolean;
}

export interface VariantItem {
  id: string;
  img: string;
  price: number;
  market_name: string;
}

export interface PublicVendor {
  id: string;
  name: string;
  slug: string;
  logo: string;
}

export interface PublicMaterialItem {
  name: string;
  slug: string;
  description: string;
  logo: string;
  unit_value: string;
  price_per_unit: string;
  banner_url?: string;
  faq_group_slug: string;
  created_at: string;
}

export interface PublicMaterialDetail {
  name: string;
  slug: string;
  description: string;
  logo: string;
  unit_value: string;
  price_per_unit: string;
  variants: VariantItem[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  banner_images: BannerImage[];
  video_url: string;
  faq_group_slug: string;
  created_at: string;
  company: {
    id: string;
    name: string;
    slug: string;
    logo: string;
  } | null;
  faq_category: {
    id: string;
    slug: string;
    name: string;
  } | null;
}
