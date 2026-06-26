import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import { getBlogBySlug, getBlogs } from "@/api/services/blog.service";
import { stripHtml } from "@/lib/html-content";
import type { BlogPost } from "@/api/types/blog.types";
import type { MediaItem } from "@/api/types/media.types";
import BlogMetaBar from "@/components/page_ui/BlogMetaBar.client";
import BlogProjectReference from "@/components/page_ui/BlogProjectReference";

const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"));

const BlogVideoEmbed = dynamic(() => import("@/components/page_ui/BlogVideoEmbed.client"));

const BlogReelStories = dynamic(() => import("@/components/page_ui/BlogReelStories.client"));

const ModelViewerBlock = dynamic(() => import("@/components/global_ui/model-viewer"), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-xs text-mid-gray">Loading 3D viewer…</div>
  ),
});

const RelatedArticles = dynamic(() => import("@/components/page_ui/RelatedArticles.client"), {
  loading: () => (
    <section className="bg-off-white py-16 sm:py-24">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-[10px] border border-[#e2e8f0] overflow-hidden bg-white">
              <div className="h-40 bg-[#e2e8f0] animate-pulse" />
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
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogBySlug(slug);
    if (!post) return { title: "Blog Not Found" };
    const description = post.meta_description || stripHtml(post.content || "").slice(0, 160) || post.title;
    return {
      title: post.meta_title || post.title,
      description,
      openGraph: {
        title: post.meta_title || post.title,
        description,
        type: "article",
        ...(post.image && { images: [{ url: post.image }] }),
      },
    };
  } catch {
    return { title: "Blog Not Found" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: BlogPost | null = null;
  try {
    post = await getBlogBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();


  const bannerImages: MediaItem[] = (post.banner_images ?? []).map((b) => ({
    id: b.id,
    url: b.url,
    alt: post.title,
    title: b.name,
  }));

  if (bannerImages.length === 0 && post.image) {
    bannerImages.push({ id: "hero", url: post.image, alt: post.title });
  }

  return (
    <>
      <section className="relative min-h-[75vh] flex items-end bg-brand-dark">
        <BannerCarousel
          initialBanners={bannerImages}
          overlay="linear-gradient(to top, rgba(15,37,87,0.8) 0%, rgba(15,37,87,0.3) 50%, transparent 100%)"
          carousel={bannerImages.length > 1}
          imgClassName="object-cover opacity-70"
        />
      </section>

      <BlogMetaBar
        title={post.title}
        author={post.author}
        authorImage={post.author_image}
        authorRole={post.author_role}
        date={post.date}
        category={post.category}
      />

      <BlogContent content={post.content ?? ""} />

      {post.model_3d_block && (
        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-brand-dark mb-6">3D Model</h2>
            <p className="text-sm text-mid-gray mb-4">Interact with the 3D model below — drag to rotate, scroll to zoom.</p>
            <div className="relative w-full aspect-[16/9] max-h-[500px] rounded-xl overflow-hidden bg-gray-100 border border-[#e8edf5]">
              <ModelViewerBlock src={post.model_3d_block}    />
            </div>
          </div>
        </section>
      )}

      {post.video_embed_url && <BlogVideoEmbed url={post.video_embed_url} />}

      {post.project && <BlogProjectReference project={post.project} />}

      {post.reel_blocks && post.reel_blocks.length > 0 && <BlogReelStories reels={post.reel_blocks} />}

      <RelatedArticles slug={slug} categorySlug={post.category?.slug ?? ""} />
    </>
  );
}
