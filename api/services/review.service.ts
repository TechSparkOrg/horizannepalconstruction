import { apiGet, apiPost, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Review } from "@/api/types/review.types"

export function getReviews(page?: number): Promise<PaginatedResponse<Review>> {
  const path = page && page > 1 ? `/reviews/?page=${page}` : "/reviews/"
  return apiGet<PaginatedResponse<Review>>(path)
}

export function submitReview(data: { name: string; rating: number; description: string }): Promise<Review> {
  return apiPost<Review>("/reviews/", data)
}

export const ReviewPublic = { list: getReviews, submit: submitReview }
