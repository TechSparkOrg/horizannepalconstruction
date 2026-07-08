"use client"

import dynamic from "next/dynamic"
import type { Page } from "@/api/types/page.types"
import type { Review } from "@/api/types/review.types"

const ReviewList = dynamic(() => import("@/components/page_ui/ReviewList").then((m) => ({ default: m.ReviewList })), { ssr: false })
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"), { ssr: false })

export function ReviewsClient({
  page,
  reviews,
  total,
}: {
  page: Page | null
  reviews: Review[]
  total: number
}) {
  return (
    <>
      <ReviewList initialReviews={reviews} initialTotal={total} />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  )
}
