import { cacheLife } from 'next/cache';
import { PageSectionPublic } from '@/api/services/page-section.service';

export const getPageSections = async (pageSlug?: string) => {
  'use cache';
  cacheLife('minutes');
  return PageSectionPublic.list(pageSlug);
};

export const getPageSection = async (id: string) => {
  'use cache';
  cacheLife('minutes');
  return PageSectionPublic.get(id);
};
