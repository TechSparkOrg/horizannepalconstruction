"use client";

import { useEffect } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useClientStore } from "@/stores/client-store";

export function BlogSection() {
  const blogs = useClientStore((s) => s.blogs);
  const loading = useClientStore((s) => s.blogsLoading);
  const categories = useClientStore((s) => s.categories);
  const fetchBlogs = useClientStore((s) => s.fetchBlogs);
  const fetchCategories = useClientStore((s) => s.fetchCategories);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [fetchBlogs, fetchCategories]);

  const catName = (id: string) => categories.find((c) => c.id === id)?.name;
  const posts = blogs.slice(0, 3);

  return (
    <section className="py-16 sm:py-28 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Our Blog</SectionLabel>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-brand-dark">
              Latest Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary"
          >
            View all posts
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && posts.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <div className="size-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-xl border border-light-gray/40 shadow-sm hover:shadow-md overflow-hidden transition-all duration-200"
              >
                <div className="relative h-44 overflow-hidden">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute top-3 left-3 text-xs font-medium uppercase tracking-wider bg-brand-primary text-white px-3 py-1 rounded-full">
                    {catName(post.category_id) || post.category_id}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <div className="flex items-center gap-1.5 text-xs mb-2 text-mid-gray">
                    <Calendar className="size-3.5" />
                    {post.date}
                  </div>
                  <h3 className="font-display text-lg leading-snug group-hover:underline decoration-black/20 text-brand-dark">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed flex-1 text-mid-gray">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary">
                    Read article
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
