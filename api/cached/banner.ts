import { cacheLife } from 'next/cache';
import { BannerService } from '@/api/services/banner.service';

export const getBanners = async (slug: string) => {
  'use cache';
  cacheLife('minutes');
  return BannerService.getBySlug(slug);
};
