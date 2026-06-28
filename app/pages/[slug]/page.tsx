import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ParsedContent from "@/lib/Parse-Content";
import { getPageBySlug } from "@/api/services/page.service";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import BlogContent from "@/components/page_ui/BlogContent.client";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = await getPageBySlug(slug);
    if (!page) return { title: "Page Not Found" };
    return {
      title: page.meta_title || page.title,
      description: page.meta_description || "",
    };
  } catch {
    return { title: "Page Not Found" };
  }
}

export default async function PageView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let page;
  try {
    page = await getPageBySlug(slug);
  } catch {
    notFound();
  }
  if (!page) notFound();

  const banners = page.banner_images ?? [];

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-brand-dark">
        {banners.length > 0 ? (
          <BannerCarousel
            slug={`${slug}-hero`}
            carousel
            imgClassName="object-cover opacity-60"
            initialBanners={banners}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 to-brand-dark/70" />
        )}
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-2 text-center">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">
            {page.title}
          </span>
          <h1
            className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            {page.title}
          </h1>
   
        </div>
      </section>

      {/* <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      

        <ParsedContent
          description={page.content ?? ""}
          className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-dark prose-a:text-brand-primary prose-img:rounded-xl"
        />
      </article> */}

      <BlogContent content={page.content ?? ""}/>
    </>
  );
}
