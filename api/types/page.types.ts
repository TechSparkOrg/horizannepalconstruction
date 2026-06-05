export interface PageSection {
  id: string;
  page: string;
  section_key: string;
  title_en: string;
  title_np: string;
  content_en: string;
  content_np: string;
  icon_name: string;
  images: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  title_np: string;
  slug: string;
  content: string;
  content_np: string;
  icon_name: string;
  meta_title: string;
  meta_title_np: string;
  meta_description: string;
  meta_description_np: string;
  sections: PageSection[];
  created_at: string;
  updated_at: string;
}

export type PageCreate = Omit<Page, 'id' | 'slug' | 'sections' | 'created_at' | 'updated_at'>;
export type PageUpdate = Partial<PageCreate>;
export type PageSectionCreate = Omit<PageSection, 'id' | 'created_at' | 'updated_at'>;
export type PageSectionUpdate = Partial<PageSectionCreate>;
