"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Quote } from "lucide-react";
import { useClientStore } from "@/stores/client-store";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = useClientStore((s) => s.blogDetail);
  const loading = useClientStore((s) => s.blogsLoading);
  const blogs = useClientStore((s) => s.blogs);
  const categories = useClientStore((s) => s.categories);
  const fetchBlogBySlug = useClientStore((s) => s.fetchBlogBySlug);
  const fetchBlogs = useClientStore((s) => s.fetchBlogs);
  const fetchCategories = useClientStore((s) => s.fetchCategories);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchBlogBySlug(slug);
    if (blogs.length === 0) fetchBlogs();
    if (categories.length === 0) fetchCategories();
  }, [slug, fetchBlogBySlug, fetchBlogs, blogs.length, fetchCategories, categories.length]);

  if (!mounted || (loading && !post)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="size-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) notFound();

  const catName = (id: string) => categories.find((c) => c.id === id)?.name;

  const related = blogs
    .filter((p) => p.slug !== slug && p.category_id === post.category_id)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end bg-brand-dark">
        <div className="absolute inset-0">
          <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover opacity-60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-transparent" />
        <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-brand-primary text-white px-3 py-1 rounded-full mb-3">
            {catName(post.category_id) || post.category_id}
          </span>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <User className="size-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {post.date}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="bg-white py-16 sm:py-24">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author Card */}
          <div className="flex items-center gap-4 pb-8 mb-10 border-b border-light-gray/40">
            <div className="relative size-14 rounded-full overflow-hidden shrink-0">
              {post.author_image ? (
                <Image src={post.author_image} alt={post.author} fill sizes="56px" className="object-cover" />
              ) : (
                <div className="size-full bg-gray-200 flex items-center justify-center text-mid-gray text-sm font-bold">
                  {post.author?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="font-bold text-brand-dark">{post.author}</p>
              <p className="text-xs text-mid-gray">{post.author_role}</p>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="space-y-6">
            {post.content.map((block, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={i} className="text-mid-gray leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: block.value || "" }} />
                  );
                case "heading":
                  return (
                    <h2 key={i} className="pt-4 font-display font-bold text-2xl sm:text-3xl text-brand-dark">{block.value}</h2>
                  );
                case "subheading":
                  return (
                    <h3 key={i} className="pt-2 font-display font-bold text-xl text-brand-secondary">{block.value}</h3>
                  );
                case "quote":
                  return (
                    <div key={i} className="relative pl-6 border-l-4 border-brand-primary bg-brand-primary/5 rounded-r-xl py-5 pr-5 my-8">
                      <Quote className="size-6 text-brand-primary/30 absolute top-3 left-3" />
                      <p className="text-lg italic text-brand-dark font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: `&ldquo;${block.value || ""}&rdquo;` }} />
                    </div>
                  );
                case "list":
                  return (
                    <ul key={i} className="space-y-3 my-6">
                      {block.items?.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-mid-gray">
                          <span className="size-1.5 rounded-full bg-brand-primary shrink-0 mt-2.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case "image":
                  return (
                    <figure key={i} className="my-8">
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                        <Image src={block.src || ""} alt={block.caption || ""} fill sizes="720px" className="object-cover" />
                      </div>
                      {block.caption && (
                        <figcaption className="mt-2 text-center text-xs text-mid-gray">{block.caption}</figcaption>
                      )}
                    </figure>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="bg-off-white py-16 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark text-center">Related Articles</h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-white rounded-xl border border-light-gray/40 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative h-44">
                    <Image src={r.image} alt={r.title} fill sizes="400px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">{catName(r.category_id) || r.category_id}</span>
                    <h3 className="mt-1.5 font-display font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{r.title}</h3>
                    <p className="mt-1.5 text-xs text-mid-gray flex items-center gap-1">
                      <Calendar className="size-3" />
                      {r.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
