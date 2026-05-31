import { Armchair, ArrowRight, Building2, Calendar, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ElementType } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const posts = [
  {
    title: "The Future of Sustainable Architecture in Nepal",
    excerpt: "Exploring how eco-friendly design practices are transforming the construction landscape across the country.",
    category: "Architecture",
    categoryColor: "oklch(0.55 0.15 35)",
    categoryBg: "oklch(0.97 0.03 35)",
    thumbBg: "oklch(0.97 0.03 35)",
    thumbColor: "oklch(0.75 0.10 35)",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    date: "May 15, 2026",
    slug: "/blog/the-future-of-sustainable-architecture-in-nepal",
  },
  {
    title: "Top 5 Things to Consider Before Building Your Dream Home",
    excerpt: "A practical guide to budgeting, site selection, design choices, and hiring the right team for your project.",
    category: "Guides",
    categoryColor: "oklch(0.45 0.15 240)",
    categoryBg: "oklch(0.96 0.03 240)",
    thumbBg: "oklch(0.96 0.03 240)",
    thumbColor: "oklch(0.68 0.12 240)",
    image: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600&q=80",
    date: "April 28, 2026",
    slug: "/blog/top-5-things-to-consider-before-building-your-dream-home",
  },
  {
    title: "Modern Interior Design Trends for Nepali Homes",
    excerpt: "From minimalist aesthetics to fusion designs — discover the latest interior trends reshaping Kathmandu Valley.",
    category: "Design",
    categoryColor: "oklch(0.45 0.18 275)",
    categoryBg: "oklch(0.96 0.04 275)",
    thumbBg: "oklch(0.96 0.04 275)",
    thumbColor: "oklch(0.68 0.14 275)",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80",
    date: "April 10, 2026",
    slug: "/blog/modern-interior-design-trends-for-nepali-homes",
  },
];

const categoryIcons: Record<string, ElementType> = {
  Architecture: Building2,
  Guides: Home,
  Design: Armchair,
};

export function BlogSection() {
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
          {posts.map((post) => {
            const Icon = categoryIcons[post.category];
            return (
              <Link
                key={post.title}
                href={post.slug}
                className="group flex flex-col bg-white rounded-xl border border-light-gray/40 shadow-sm hover:shadow-md overflow-hidden transition-all duration-200"
              >
                <div className="relative h-44 flex items-center justify-center overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center w-full h-full"
                      style={{ backgroundColor: post.thumbBg }}
                    >
                      <Icon className="size-14 opacity-60" style={{ color: post.thumbColor }} />
                    </div>
                  )}
                  <span
                    className="absolute top-3 left-3 text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: post.categoryColor }}
                  >
                    {post.category}
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
            );
          })}
        </div>

      </div>
    </section>
  );
}
