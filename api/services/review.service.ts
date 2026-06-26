import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Review } from "@/api/types/review.types"

export function getReviews(): Promise<PaginatedResponse<Review>> {
  return apiGet<PaginatedResponse<Review>>("/reviews/")
}

export const ReviewPublic = { list: getReviews }
