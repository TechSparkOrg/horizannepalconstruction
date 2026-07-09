import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import dynamic from "next/dynamic";
import { getBlogBySlug } from "@/api/services/blog.service";
import { getFaqs } from "@/api/services/faq.service";
import { stripHtml } from "@/lib/extractTocItems";
import { BlogDetailClient } from "./_client";

const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getBlogBySlug(slug).catch(() => null);
  if (!post) notFound();

  const faqSlug = post.category?.slug ?? slug;

  return (
    <>
      <h1 className="sr-only">{post.title}</h1>
      <BlogDetailClient post={post} slug={slug} />
      <Suspense fallback={<div className="py-12 bg-white" />}>
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
