import { apiGet } from "@/api/ServiceHelper"
import type { Banner } from "@/api/types/banner.types"

export function getBanners(slug: string): Promise<Banner[]> {
  return apiGet<Banner[]>(`/media/banners/${slug}`)
}

export const BannerService = { getBySlug: getBanners }
