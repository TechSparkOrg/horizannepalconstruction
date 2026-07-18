"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/global_ui/BlogCard";
import { getBlogsByCategorySafe } from "@/api/services/blog.service";
import type { BlogPost } from "@/api/types/blog.types";

interface Props {
  slug: string;
  categorySlug: string;
}

export default function RelatedArticles({ slug, categorySlug }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) {
      setLoading(false);
      return;
    }
    let mounted = true;

    getBlogsByCategorySafe(categorySlug)
      .then((items) => {
        if (mounted) setPosts(items.filter((p) => p.slug !== slug).slice(0, 3));
      })

      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [slug, categorySlug]);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="bg-off-white py-16 sm:py-24">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark">
            Related Articles
          </h2>
          <Link prefetch={false}
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mid-gray hover:text-brand-primary transition-colors shrink-0"
          >
            View all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {loading ? (
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
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {posts.map((p) => (
              <BlogCard
                key={p.slug}
                post={p}
                variant="compact"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
