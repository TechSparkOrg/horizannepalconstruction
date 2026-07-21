"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { CategoryBadge } from "@/components/global_ui/CategoryBadge";
import { stripHtml } from "@/lib/extractTocItems";
import type { BlogPost } from "@/api/types/blog.types";
import { useTrackAction } from "@/hooks/useTrackAction";
import { useTrackHover } from "@/hooks/useTrackHover";
import { Events } from "@/lib/tracking";

type BlogCardPost = Pick<BlogPost, "slug" | "title" | "image" | "category" | "date" | "content">;

interface BlogCardProps {
  post: BlogCardPost;
  variant?: "default" | "featured" | "compact";
}

function DateLine({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-1.5 text-white/55 text-[10.5px] leading-none mb-2">
      <Calendar className="size-3 shrink-0" strokeWidth={1.8} />
      {date}
    </div>
  );
}

function NoImage() {
  return <div className="absolute inset-0 bg-gradient-to-br from-[#0f2557] to-[#1a3a7a]" />;
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const category = post?.category ?? null;
  const description = post?.content ? stripHtml(post.content).slice(0, 180) : null;
  const track = useTrackAction();
  const hoverRef = useTrackHover<HTMLAnchorElement>(Events.BLOG_HOVER);

  const handleBlogClick = () => track(Events.BLOG_CLICK, { slug: post?.slug, title: post?.title });

  // ── Featured ─────────────────────────────────────────────────────────────────
  if (variant === "featured") {
    return (
      <Link
        prefetch={false}
        ref={variant === "featured" ? hoverRef : undefined}
        href={`/blog/${post?.slug}`}
        onClick={handleBlogClick}
        className="group relative block w-full overflow-hidden rounded-2xl"
        style={{ aspectRatio: "21/8" }}
      >
        {/* Image */}
        {post?.image ? (
          <Image
            src={post.image}
            alt={post?.title ?? ""}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority
          />
        ) : (
          <NoImage />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />

        {/* Category badge — top left */}
        {category && (
          <div className="absolute top-4 left-4">
            <CategoryBadge name={category.name ?? ""} slug={category.slug ?? undefined} />
          </div>
        )}

        {/* Content — bottom */}
        <div className="absolute inset-x-0 bottom-0 px-7 pb-8 sm:px-10 sm:pb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#cd2028]">Featured</span>
          </div>

          {post?.date && <DateLine date={post.date} />}

          <h3 className="text-white font-black leading-tight line-clamp-2 group-hover:text-[#f87171] transition-colors duration-200"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
            {post?.title}
          </h3>

          {description && (
            <p className="mt-2.5 text-white/60 text-[13.5px] leading-relaxed line-clamp-2 max-w-xl">
              {description}
            </p>
          )}

          <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors duration-200">
            Read article
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    );
  }

  // ── Compact ───────────────────────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <Link
        prefetch={false}
        href={`/blog/${post?.slug}`}
        onClick={handleBlogClick}
        className="group relative block overflow-hidden rounded-xl"
        style={{ aspectRatio: "4/3" }}
      >
        {post?.image ? (
          <Image
            src={post.image}
            alt={post?.title ?? ""}
            fill
            sizes="400px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <NoImage />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {category && (
          <div className="absolute top-3 left-3">
            <CategoryBadge name={category.name ?? ""} slug={category.slug ?? undefined} size="xs" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4">
          {post?.date && <DateLine date={post.date} />}
          <h3 className="text-white text-[13px] font-semibold leading-snug line-clamp-2 group-hover:text-[#f87171] transition-colors duration-200">
            {post?.title}
          </h3>
          <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white/60">
            Read <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </div>
      </Link>
    );
  }

  // ── Default ───────────────────────────────────────────────────────────────────
  return (
    <Link
      prefetch={false}
      href={`/blog/${post?.slug}`}
      onClick={handleBlogClick}
      className="group relative block overflow-hidden rounded-2xl"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Image */}
      {post?.image ? (
        <Image
          src={post.image}
          alt={post?.title ?? ""}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <NoImage />
      )}

      {/* Gradient — bottom 65% */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Category — top */}
      {category && (
        <div className="absolute top-4 left-4">
          <CategoryBadge name={category.name ?? ""} slug={category.slug ?? undefined} />
        </div>
      )}

      {/* Red accent line on hover */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#cd2028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
        {post?.date && <DateLine date={post.date} />}

        <h3 className="text-white font-bold text-[15px] leading-snug line-clamp-2 group-hover:text-[#f87171] transition-colors duration-200">
          {post?.title}
        </h3>

        {description && (
          <p className="mt-1.5 text-white/55 text-[12px] leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/70 group-hover:text-white transition-colors duration-200">
          Read article
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
