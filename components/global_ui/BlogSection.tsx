"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/global_ui/BlogCard";
import { getBlogs } from "@/api/services/blog.service";
import type { BlogPost } from "@/api/types/blog.types";

export function BlogSection({ initialPosts }: { initialPosts?: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts ?? []);

  useEffect(() => {
    if (initialPosts) return;
    getBlogs()
      .then((res) => setPosts(res.results ?? []))
      .catch(() => {});
  }, [initialPosts]);

  const featured = posts.slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between gap-4 mb-9 flex-wrap">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-primary mb-2">
              Our Blog
            </p>
            <h2 className="text-[30px] font-bold text-brand-dark tracking-tight leading-[1.1]">
              Latest Insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mid-gray hover:text-brand-primary transition-colors"
          >
            View all
            <ArrowRight className="size-3.5 shrink-0" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {featured.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-[10px] border border-[#e2e8f0] overflow-hidden bg-white">
                  <div className="h-[180px] bg-[#e2e8f0] animate-pulse" />
                  <div className="p-[18px] space-y-3">
                    <div className="h-2.5 w-16 rounded-full bg-[#e2e8f0] animate-pulse" />
                    <div className="h-4 w-3/4 rounded bg-[#e2e8f0] animate-pulse" />
                    <div className="h-3 w-full rounded bg-[#e2e8f0] animate-pulse" />
                    <div className="h-3 w-2/3 rounded bg-[#e2e8f0] animate-pulse" />
                  </div>
                </div>
              ))
            : featured.map((post) => (
                <BlogCard key={post.slug} post={post} variant="default" />
              ))}
        </div>

      </div>
    </section>
  );
}
