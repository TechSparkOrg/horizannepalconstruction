import { cacheLife } from 'next/cache';
import { CategoryPublic } from '@/api/services/category.service';

export const getCategories = async () => {
  'use cache';
  cacheLife('minutes');
  return CategoryPublic.list();
};

export const getCategoryById = async (id: string) => {
  'use cache';
  cacheLife('minutes');
  return CategoryPublic.getById(id);
};
