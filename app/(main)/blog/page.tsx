import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { BlogHero } from "@/components/sections/BlogHero";
import { getBlogs } from "@/api/cached/blog";
import { getCategories } from "@/api/cached/category";
import { LdJson } from "@/components/JsonLd";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Blog | Horizan Nepal",
  description:
    "Read the latest articles, insights, and updates from Horizan Nepal — architectural design tips, construction trends, and project stories from across Nepal.",
  openGraph: {
    title: "Blog | Horizan Nepal",
    description:
      "Read the latest articles, insights, and updates from Horizan Nepal — architectural design tips and construction trends.",
    type: "website",
    url: `${siteUrl}/blog`,
  },
  alternates: { canonical: `${siteUrl}/blog` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
  ],
};

export default async function BlogPage() {
  const [blogsRes, categoriesRes] = await Promise.allSettled([
    getBlogs(),
    getCategories(),
  ]);
  const blogs = blogsRes.status === "fulfilled" ? blogsRes.value.results ?? [] : [];
  const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value.results ?? [] : [];

  const catName = (id: string) => categories.find((c: { id: string }) => c.id === id)?.name;

  return (
    <>
      <LdJson data={breadcrumb} />
      <BlogHero />
      <section className="bg-off-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((post: { id: string; slug: string; image?: string; title: string; category_id: string; date?: string; excerpt?: string }) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-xl border border-light-gray/40 shadow-sm hover:shadow-md overflow-hidden transition-all duration-200"
              >
                <div className="relative h-48 overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image }
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full bg-gray-200" />
                  )}
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
        </div>
      </section>
    </>
  );
}
