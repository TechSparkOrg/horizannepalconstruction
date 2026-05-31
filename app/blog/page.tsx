import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { BlogHero } from "@/components/sections/BlogHero";
import { posts } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  Architecture: "bg-brand-primary text-white",
  Guides: "bg-brand-secondary text-white",
  Design: "bg-amber-500 text-white",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <section className="bg-off-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.title}
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
                  <span className={`absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${categoryColors[post.category] || "bg-brand-primary text-white"}`}>
                    {post.category}
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
        </div>
      </section>
    </>
  );
}
