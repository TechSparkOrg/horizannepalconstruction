import dynamic from "next/dynamic";
import { PageHero } from "@/components/global_ui/page-hero";
import { getBlogs } from "@/api/services/blog.service";
import { getCategories } from "@/api/services/category.service";
import type { BlogPost } from "@/api/types/blog.types";
import type { Category } from "@/api/types/category.types";

const BlogGrid = dynamic(
  () => import("@/components/page_ui/BlogGrid.client"),
  {
    loading: () => (
      <section className="bg-white py-16 sm:py-28">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-[10px] border border-[#e2e8f0] overflow-hidden bg-white">
                <div className="h-[180px] bg-[#e2e8f0] animate-pulse" />
                <div className="p-[18px] space-y-3">
                  <div className="h-2.5 w-16 rounded-full bg-[#e2e8f0] animate-pulse" />
                  <div className="h-4 w-3/4 rounded bg-[#e2e8f0] animate-pulse" />
                  <div className="h-3 w-full rounded bg-[#e2e8f0] animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-[#e2e8f0] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

export default async function BlogPage() {
  const [blogsRes, categoriesRes] = await Promise.allSettled([
    getBlogs(),
    getCategories(),
  ]);
  const blogs: BlogPost[] = blogsRes.status === "fulfilled" ? blogsRes.value.results ?? [] : [];
  const categories: Category[] = categoriesRes.status === "fulfilled" ? categoriesRes.value.results ?? [] : [];

  return (
    <>
      <PageHero
        slug="blog-page-hero"
        badge="Our Blog"
        heading="Insights & Stories From the Field"
        description="Thought leadership, project stories, and practical guides from the Horizon Nepal team."
        minHeight="70vh"
      />
      
      <BlogGrid posts={blogs} categories={categories} />
    </>
  );
}
