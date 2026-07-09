"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/global_ui/BlogCard";
import type { BlogPost } from "@/api/types/blog.types";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  posts: BlogPost[];
  categories: CategoryItem[];
}

export default function BlogGrid({ posts, categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      const match = categories.find((c) => c.slug === catParam);
      setActive(match ? match.id : null);
    }
  }, [searchParams, categories]);

  const handleCategoryClick = (id: string | null) => {
    setActive(id);
    if (id) {
      const cat = categories.find((c) => c.id === id);
      router.push(cat ? `/blog?category=${cat.slug}` : "/blog", { scroll: false });
    } else {
      router.push("/blog", { scroll: false });
    }
  };

  const filtered = active
    ? posts.filter((p) => p.category?.id === active)
    : posts;

  const first = filtered[0] ?? null;
  const rest = first ? filtered.slice(1) : [];

  return (
    <section className="bg-[#f8fafc] py-10 sm:py-14">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">

        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <button
              onClick={() => handleCategoryClick(null)}
              className={cn(
                "h-8 px-3.5 text-[12px] font-semibold rounded-full transition-colors duration-150",
                active === null
                  ? "bg-[#0f2557] text-white"
                  : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0f2557]"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(active === cat.id ? null : cat.id)}
                className={cn(
                  "h-8 px-3.5 text-[12px] font-semibold rounded-full transition-colors duration-150",
                  active === cat.id
                    ? "bg-[#0f2557] text-white"
                    : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0f2557]"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {first && first.slug && (
          <div className="mb-6">
            <BlogCard
              key={first.slug}
              post={first}
              variant="featured"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {rest.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              variant="default"
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#64748b] py-20">No posts found in this category.</p>
        )}
      </div>
    </section>
  );
}
