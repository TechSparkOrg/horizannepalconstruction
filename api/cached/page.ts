import { cacheLife } from 'next/cache';
import { PagePublic } from '@/api/services/page.service';

export const getPages = async () => {
  'use cache';
  cacheLife('minutes');
  return PagePublic.list();
};

export const getPageBySlug = async (slug: string) => {
  'use cache';
  cacheLife('minutes');
  return PagePublic.getBySlug(slug);
};
