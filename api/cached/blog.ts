import { cacheLife } from 'next/cache';
import { BlogPublic } from '@/api/services/blog.service';

export const getBlogs = async () => {
  'use cache';
  cacheLife('minutes');
  return BlogPublic.list();
};

export const getBlogBySlug = async (slug: string) => {
  'use cache';
  cacheLife('minutes');
  return BlogPublic.getBySlug(slug);
};
