import { api, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Review } from "@/api/types/review.types"

export async function getReviewsSafe(page?: number): Promise<PaginatedResponse<Review>> {
  try {
    const path = page && page > 1 ? `/reviews/?page=${page}` : "/reviews/"
    return await api.get<PaginatedResponse<Review>>(path)
  } catch (err) {
    console.error("Failed to fetch reviews:", err)
    return { results: [], count: 0, next: null, previous: null }
  }
}

export const ReviewPublic = {
  list: getReviewsSafe,
  listSafe: getReviewsSafe,
  submit: (data: { name: string; rating: number; description: string }): Promise<Review> =>
    api.post<Review>("/reviews/", data),
}
