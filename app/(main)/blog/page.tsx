"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { BlogHero } from "@/components/sections/BlogHero";
import { useClientStore } from "@/stores/client-store";

export default function BlogPage() {
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

  return (
    <>
      <BlogHero />
      <section className="bg-off-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading && blogs.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="size-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-xl border border-light-gray/40 shadow-sm hover:shadow-md overflow-hidden transition-all duration-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider bg-brand-primary text-white px-3 py-1 rounded-full">
                      {catName(post.category_id) || post.category_id}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <div className="flex items-center gap-1.5 text-xs text-mid-gray mb-2">
                      <Calendar className="size-3.5" />
                      {post.date}
                    </div>
                    <h3 className="font-display font-bold text-lg leading-snug text-brand-dark group-hover:text-brand-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed flex-1 text-mid-gray">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
                      Read article
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
