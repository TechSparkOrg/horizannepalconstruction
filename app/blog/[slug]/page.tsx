import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/api/services/blog.service";
import { stripHtml } from "@/lib/extractTocItems";
import { BlogDetailClient } from "./_client";

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

  let post = await getBlogBySlug(slug).catch(() => null);
  if (!post) notFound();

  return (
    <>
      <h1 className="sr-only">{post.title}</h1>
      <BlogDetailClient post={post} slug={slug} />
    </>
  );
}
