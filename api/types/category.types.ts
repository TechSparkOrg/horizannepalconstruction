export interface CategoryService {
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  name_np: string;
  slug: string;
  icon_name: string;
  parent_id: string | null;
  services: CategoryService[];
  created_at: string;
  updated_at: string;
}

export type CategoryCreate = Pick<Category, 'name' | 'name_np' | 'icon_name' | 'parent_id' | 'services'>;
export type CategoryUpdate = Partial<CategoryCreate>;
