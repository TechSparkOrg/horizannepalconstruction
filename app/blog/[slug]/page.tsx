import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlugSafe } from "@/api/services/blog.service";
import { getFaqsByGroupSlugSafe } from "@/api/services/faq.service";
import { stripHtml } from "@/lib/extractTocItems";
import type { MediaItem } from "@/api/types/media.types";
import { BlogPostInner } from "./_content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlugSafe(slug);
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
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlugSafe(slug);
  if (!post) notFound();
  
  // fetch FAQs if the post has a FAQ group
  let faqs: import("@/api/types/faq.types").FaqItem[] = [];
  if (post.faq_group_slug) {
    faqs = await getFaqsByGroupSlugSafe(post.faq_group_slug);
  }

  const bannerImages: MediaItem[] = (post.banner_images ?? []).map((b) => ({
    id: b.id, url: b.url, alt: post.title, title: b.name,
  }));

  return (
    <>
      <h1 className="sr-only">{post.title}</h1>
      {bannerImages.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}

      <section className="relative min-h-[75svh] sm:min-h-[80svh] flex items-end bg-[#0f2557] overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0a1a3d 0%, rgba(15,37,87,0.5) 45%, transparent 100%)" }} />
        {post.category && (
          <div className="absolute bottom-0 left-0 right-0 z-20 max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 pb-5">
            <div className="inline-flex items-center gap-2">
              <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">{post.category.name}</span>
              <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
          </div>
        )}
      </section>

      <Suspense fallback={<div className="py-16 bg-white" style={{ minHeight: 800 }} />}>
        <BlogPostInner post={post} slug={slug} faqs={faqs} />
      </Suspense>
    </>
  );
}
