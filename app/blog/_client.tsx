"use client"

import dynamic from "next/dynamic"
import type { Page } from "@/api/types/page.types"
import type { BlogPost } from "@/api/types/blog.types"
import type { Category } from "@/api/types/category.types"

const BlogGrid = dynamic(() => import("@/components/page_ui/BlogGrid.client"), { ssr: false })
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"), { ssr: false })

export function BlogClient({
  page,
  blogs,
  categories,
}: {
  page: Page | null
  blogs: BlogPost[]
  categories: Category[]
}) {
  return (
    <>
      <BlogGrid posts={blogs} categories={categories} />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  )
}
