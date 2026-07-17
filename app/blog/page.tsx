import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getPageBySlug } from "@/api/services/page.service";
import { getBlogs } from "@/api/services/blog.service";
import { getCategories } from "@/api/services/category.service";
import type { BlogPost } from "@/api/types/blog.types";
import type { Category } from "@/api/types/category.types";
import { siteUrl } from "@/lib/constants";
import { getSvgUrl } from "@/lib/svg-utils";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import { BlogPageContent } from "./_content";
const SLUG = "blog";
const blogPageP = getPageBySlug(SLUG).catch((err) => { console.error("Failed to fetch blog page:", err); return null; });

export async function generateMetadata(): Promise<Metadata> {
  const page = await blogPageP;
  const url = `${siteUrl}/${SLUG}`;
  return {
    title: page?.meta_title || "Blog | Horizan Nepal",
    description: page?.meta_description || "Insights, project stories, and practical guides from the Horizan Nepal team.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "Blog | Horizan Nepal",
      description: page?.meta_description || "Insights and stories from the Horizan Nepal team.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function BlogPage() {
  const [page, blogsRes, categoriesRes] = await Promise.all([
    blogPageP,
    getBlogs().catch((err) => { console.error("Failed to fetch blogs:", err); return { results: [] as BlogPost[] }; }),
    getCategories().catch((err) => { console.error("Failed to fetch categories:", err); return { results: [] as Category[] }; }),
  ]);

  return (
    <>
      <h1 className="sr-only">{page?.title || "Blog — Horizan Nepal"}</h1>
      {page?.banner_images?.map((b) =>
        b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null
      )}

      {/* ── Hero ── */}
      <section className="relative bg-[#0f2557] overflow-hidden" style={{ minHeight: "80vh" }}>
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-30" aria-hidden="true" />

        <div className="flex flex-col lg:flex-row" style={{ minHeight: "80vh" }}>
          <div className="relative flex-1 flex items-end min-h-[80svh] lg:min-h-0">
            <BannerCarousel slug="blog-page-hero" imgClassName="object-cover"
              initialBanners={page?.banner_images} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, #0a1a3d 0%, rgba(15,37,87,0.55) 45%, transparent 100%)" }} />
            <div className="absolute inset-y-0 right-0 w-20 hidden lg:block pointer-events-none"
              style={{ background: "linear-gradient(to left, #0f2557, transparent)" }} />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cd2028] hidden lg:block" aria-hidden="true" />

            <div className="relative z-20 px-6 sm:px-10 lg:pl-14 lg:pr-8 pb-14 lg:pb-20 pt-36 w-full">
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Our Blog</span>
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              </div>
              <h1 className="font-display font-black text-white leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)" }}>
                Insights &amp; Stories<br />
                <span className="text-[#cd2028]">From the Field</span>
              </h1>
              <div className="mt-5 flex items-start gap-3">
                <div className="w-8 h-[3px] bg-[#cd2028] shrink-0 mt-[0.65em]" />
                <p className="text-white/65 text-[15px] leading-relaxed max-w-[380px]">
                  Thought leadership, project stories, and practical guides from the Horizan Nepal team.
                </p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block lg:flex-1 bg-[#0f2557]">
            <Image src={getSvgUrl(page?.svg_items, 0, "/video-gif/Poetry.svg")} alt="" aria-hidden fill unoptimized priority
              className="object-contain object-bottom" />
            <div className="absolute inset-y-0 left-0 w-20 pointer-events-none"
              style={{ background: "linear-gradient(to right, #0f2557, transparent)" }} />
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 bg-off-white" style={{ minHeight: 1100 }} />}>
        <BlogPageContent page={page} blogs={blogsRes.results ?? []} categories={categoriesRes.results ?? []} svgItems={page?.svg_items} />
      </Suspense>
    </>
  );
}
