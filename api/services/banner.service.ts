import { apiGet } from "@/api/ServiceHelper"
import type { Banner } from "@/api/types/banner.types"

export const BannerService = {
  getBySlug: (slug: string): Promise<Banner[]> => apiGet<Banner[]>(`/media/banners/${slug}`),
}
