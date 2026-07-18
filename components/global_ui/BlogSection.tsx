"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { getBlogsSafe } from "@/api/services/blog.service";
import { stripHtml } from "@/lib/extractTocItems";
import type { BlogPost } from "@/api/types/blog.types";

function formatDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

function BlogCard({ post }: { post: BlogPost }) {
  const excerpt = post.content ? stripHtml(post.content).slice(0, 130) : "";

  return (
    <Link prefetch={false}
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
    >
      {/* ── Content — top ── */}
      <div className="flex flex-col gap-3 p-5">

        {/* Title */}
        <h3 className="text-[17px] font-bold text-[#111827] leading-[1.3] line-clamp-2 group-hover:text-brand-primary transition-colors duration-150">
          {post.title}
        </h3>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-[12px] text-[#9ca3af]">
          {post.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5 shrink-0" />
              {formatDate(post.date)}
            </span>
          )}
          {post.category?.name && (
            <span className="flex items-center gap-1.5 text-brand-primary font-medium">
              {post.category.name}
            </span>
          )}
        </div>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-[13.5px] leading-[1.72] text-[#6b7280] line-clamp-2">
            {excerpt}
          </p>
        )}

        {/* CTA button — outlined pill */}
        <div className="inline-flex items-center gap-2 self-start border border-[#111827] rounded-full px-4 py-2 text-[12.5px] font-semibold text-[#111827] group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white transition-colors duration-200 mt-1">
          Read Article
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>

      </div>

      {/* ── Image — bottom ── */}
      <div className="relative h-[210px] shrink-0 overflow-hidden bg-[#eef2f9]">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title ?? ""}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#dde6f8] to-[#c7d8f5]" />
        )}
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl bg-white shadow-sm overflow-hidden">
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <div className="h-5 w-full rounded-lg bg-[#eef2f9] animate-pulse" />
          <div className="h-5 w-4/5 rounded-lg bg-[#eef2f9] animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="h-3.5 w-20 rounded bg-[#eef2f9] animate-pulse" />
          <div className="h-3.5 w-16 rounded bg-[#eef2f9] animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-full rounded bg-[#eef2f9] animate-pulse" />
          <div className="h-3.5 w-3/4 rounded bg-[#eef2f9] animate-pulse" />
        </div>
        <div className="h-8 w-32 rounded-full bg-[#eef2f9] animate-pulse" />
      </div>
      <div className="h-[210px] bg-[#eef2f9] animate-pulse" />
    </div>
  );
}

export function BlogSection({ initialPosts }: { initialPosts?: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts ?? []);

  useEffect(() => {
    if (initialPosts) return;
    let mounted = true;
    getBlogsSafe()
      .then((items) => { if (mounted) setPosts(items); });
    return () => { mounted = false; };
  }, [initialPosts]);

  const visible = posts.slice(0, 3);

  return (
    <section className="bg-[#f5f8ff] py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-6 h-px bg-brand-primary shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-primary">
                Our Blog
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-brand-dark leading-[1.15]">
              Latest Insights
            </h2>
          </div>
          <Link prefetch={false}
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground hover:text-brand-primary transition-colors"
          >
            View all articles
            <ArrowRight className="size-3.5 shrink-0" />
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.length === 0
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : visible.map((post, i) => <BlogCard key={post.slug ?? i} post={post} />)}
        </div>

      </div>
    </section>
  );
}
