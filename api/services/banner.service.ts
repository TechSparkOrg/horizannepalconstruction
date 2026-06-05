import { apiPublic } from '../ServiceHelper/index';
import type { MediaItem } from '../types/media.types';

export const BannerService = {
  getBySlug: (slug: string) =>
    apiPublic.get<MediaItem[]>(`/banners/${slug}/`).then(r => r.data),
};
