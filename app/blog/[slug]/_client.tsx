"use client"

import dynamic from "next/dynamic"
import { BannerCarousel } from "@/components/global_ui/BannerCarousel"
import BlogMetaBar from "@/components/page_ui/BlogMetaBar.client"
import BlogProjectReference from "@/components/page_ui/BlogProjectReference"

import type { BlogPost } from "@/api/types/blog.types"
import type { MediaItem } from "@/api/types/media.types"

const BlogContent    = dynamic(() => import("@/components/page_ui/BlogContent.client"),  { ssr: false })
const VideoEmbed     = dynamic(() => import("@/components/global_ui/VideoEmbed.client"), { ssr: false })
const BlogReelStories= dynamic(() => import("@/components/page_ui/BlogReelStories.client"), { ssr: false })
const ModelViewerBlock = dynamic(() => import("@/components/global_ui/model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-xs text-[#64748b]">
      Loading 3D viewer…
    </div>
  ),
})
const RelatedArticles = dynamic(() => import("@/components/page_ui/RelatedArticles.client"), {
  ssr: false,
  loading: () => (
    <section className="bg-[#f8fafc] py-16 sm:py-24">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white border border-[#e2e8f0]">
              <div className="h-44 bg-[#e2e8f0] animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-16 rounded-full bg-[#e2e8f0] animate-pulse" />
                <div className="h-3.5 w-3/4 rounded bg-[#e2e8f0] animate-pulse" />
                <div className="h-2.5 w-1/3 rounded bg-[#e2e8f0] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
})

export function BlogDetailClient({ post, slug }: { post: BlogPost; slug: string }) {
  const bannerImages: MediaItem[] = (post.banner_images ?? []).map((b) => ({
    id: b.id,
    url: b.url,
    alt: post.title,
    title: b.name,
  }))

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[75svh] sm:min-h-[80svh] flex items-end bg-[#0f2557] overflow-hidden">

        {/* Red top accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />

        <BannerCarousel
          initialBanners={bannerImages}
          slug={slug}
          imgClassName="object-cover"
          carousel={bannerImages.length > 1}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0a1a3d 0%, rgba(15,37,87,0.5) 45%, transparent 100%)" }}
        />

        {/* Category eyebrow in hero */}
        {post.category && (
          <div className="absolute bottom-0 left-0 right-0 z-20 max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 pb-5">
            <div className="inline-flex items-center gap-2">
              <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">
                {post.category.name}
              </span>
              <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
          </div>
        )}
      </section>

      {/* ── Meta bar: title + author ── */}
      <BlogMetaBar
        title={post.title}
        author={post.author}
        authorImage={post.author_image}
        authorRole={post.author_role}
        date={post.date}
        category={post.category}
      />

      {/* ── Article content ── */}
      <BlogContent content={post.content ?? ""} />

  

      {/* ── 3D model ── */}
      {post.model_3d_block && (
        <section className="bg-[#f8fafc] py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Interactive</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-xl mb-2">3D Model</h2>
            <p className="text-[13px] text-[#64748b] mb-5">Drag to rotate · Scroll to zoom</p>
            <div className="relative w-full aspect-[16/9] max-h-[500px] rounded-2xl overflow-hidden bg-[#e8edf5] border border-[#e2e8f0]">
              <ModelViewerBlock src={post.model_3d_block} />
            </div>
          </div>
        </section>
      )}

    

      {post.video_embed_url && <VideoEmbed url={post.video_embed_url} />}

      {post.project && <BlogProjectReference project={post.project} />}

      {post.reel_blocks && post.reel_blocks.length > 0 && (
        <BlogReelStories reels={post.reel_blocks} />
      )}

      {/* ── Related articles ── */}
      <RelatedArticles slug={slug} categorySlug={post.category?.slug ?? ""} />
    </>
  )
}
