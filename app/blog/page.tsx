import type { Metadata } from "next";
import { PageHero } from "@/components/global_ui/page-hero";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase } from "@/lib/seo-utils";
import { getBlogs } from "@/api/services/blog.service";
import { getCategories } from "@/api/services/category.service";
import type { BlogPost } from "@/api/types/blog.types";
import type { Category } from "@/api/types/category.types";
import { BlogClient } from "./_client";

const SLUG = "blog"
const blogPagePromise = getPageBySlug(SLUG).catch(() => null)

export async function generateMetadata(): Promise<Metadata> {
  const page = await blogPagePromise
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Blog | Horizan Nepal",
    description: page?.meta_description || "Insights, project stories, and practical guides from the Horizan Nepal team.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Blog | Horizan Nepal",
      description: page?.meta_description || "Insights and stories from the Horizan Nepal team.",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function BlogPage() {
  const [page, blogsRes, categoriesRes] = await Promise.all([
    blogPagePromise,
    getBlogs().catch(() => ({ results: [] as BlogPost[] })),
    getCategories().catch(() => ({ results: [] as Category[] })),
  ]);

  return (
    <>
      <h1 className="sr-only">{page?.title || "Blog — Horizan Nepal"}</h1>
      {page?.banner_images?.map((b) =>
        b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null
      )}
      <PageHero
        slug="blog-page-hero"
        badge="Our Blog"
        heading="Insights & Stories From the Field"
        description="Thought leadership, project stories, and practical guides from the Horizon Nepal team."
        minHeight="80vh"
        initialBanners={page?.banner_images}
      />
      <BlogClient
        page={page}
        blogs={blogsRes.results ?? []}
        categories={categoriesRes.results ?? []}
      />
    </>
  );
}
