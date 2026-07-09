import { Suspense } from "react";
import dynamic from "next/dynamic";
import { cacheLife } from "next/cache";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqs } from "@/api/services/faq.service";
import BlogMetaBar from "@/components/page_ui/BlogMetaBar.client";
import BlogProjectReference from "@/components/page_ui/BlogProjectReference";
import type { BlogPost } from "@/api/types/blog.types";

const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"));
const VideoEmbed = dynamic(() => import("@/components/global_ui/VideoEmbed.client"));
const BlogReelStories = dynamic(() => import("@/components/page_ui/BlogReelStories.client"));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
const ModelViewerBlock = dynamic(() => import("@/components/global_ui/model-viewer"), {
  loading: () => <div className="w-full h-full flex items-center justify-center text-xs text-[#64748b]">Loading 3D viewer…</div>,
});
const RelatedArticles = dynamic(() => import("@/components/page_ui/RelatedArticles.client"), {
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
});

interface Props {
  post: BlogPost;
  slug: string;
}

export function BlogPostInner({ post, slug }: Props) {
  const faqSlug = post.faq_group_slug ?? "blog";
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <BlogMetaBar title={post.title} author={post.author} authorImage={post.author_image}
        authorRole={post.author_role} date={post.date} category={post.category} />

      <BlogContent content={post.content ?? ""} />

      {post.model_3d_block && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-[#f8fafc] min-h-[400px]")}>
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
        </ViewportSection>
      )}

      {post.video_embed_url && (
        <ViewportSection fallback={F("py-10 bg-white min-h-[300px]")}>
          <VideoEmbed url={post.video_embed_url} />
        </ViewportSection>
      )}

      {post.project && (
        <ViewportSection fallback={F("py-10 bg-white min-h-[200px]")}>
          <BlogProjectReference project={post.project} />
        </ViewportSection>
      )}

      {post.reel_blocks && post.reel_blocks.length > 0 && (
        <ViewportSection fallback={F("py-10 bg-white min-h-[300px]")}>
          <BlogReelStories reels={post.reel_blocks} />
        </ViewportSection>
      )}

      <ViewportSection fallback={F("py-10 bg-[#f8fafc] min-h-[300px]")}>
        <RelatedArticles slug={slug} categorySlug={post.category?.slug ?? ""} />
      </ViewportSection>

      <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
        <BlogPostFaqInner faqSlug={faqSlug} />
      </Suspense>
    </>
  );
}

async function BlogPostFaqInner({ faqSlug }: { faqSlug: string }) {
  "use cache";
  cacheLife("default");
  const res = await getFaqs({ group__slug: faqSlug, page_size: 20 }).catch(() => ({ results: [] }));
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqSlug} initialFaqs={faqs} />;
}
