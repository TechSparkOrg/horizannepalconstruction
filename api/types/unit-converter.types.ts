export interface BannerImage {
  id: string;
  url: string;
  name: string;
  isPrimary?: boolean;
}

export interface ConversionRule {
  to: string;
  factor: number;
}

export interface PublicUnitConversionItem {
  title: string;
  slug: string;
  description: string;
  base_unit: string;
  conversions: ConversionRule[];
  banner_url?: string;
  faq_group_slug: string;
  created_at: string;
}

export interface PublicUnitConversionDetail {
  title: string;
  slug: string;
  description: string;
  base_unit: string;
  conversions: ConversionRule[];
  faq_category: {
    id: string;
    slug: string;
    name: string;
  } | null;
  faq_group_slug: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  banner_images: BannerImage[];
  video_url: string;
  created_at: string;
}
