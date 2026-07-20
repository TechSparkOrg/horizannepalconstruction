import { api } from "@/api/ServiceHelper"
import type { Banner } from "@/api/types/banner.types"

export const BannerService = {
  getBySlug: (slug: string): Promise<Banner[]> => api.get<Banner[]>(`/media/banners/${slug}`),
}
