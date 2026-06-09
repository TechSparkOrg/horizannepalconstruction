"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { PageService } from "@/api/services/page.service";
import { BannerCarousel } from "@/components/BannerCarousel";
import type { Page } from "@/api/types/page.types";

export default function PageView() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [banners, setBanners] = useState(0);

  useEffect(() => {
    if (!slug) return;
    PageService.getBySlug(slug)
      .then(setPage)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-24 text-center">
        <FileText className="size-12 text-light-gray mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-brand-dark mb-2">Page not found</h1>
        <p className="text-mid-gray text-sm mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline">
          <ArrowLeft className="size-3.5" /> Back to Home
        </Link>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-24 text-center">
        <div className="size-10 rounded-full border-2 border-brand-primary/30 border-t-brand-primary animate-spin mx-auto" />
        <p className="text-sm text-mid-gray mt-4">Loading…</p>
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-brand-dark">
        <BannerCarousel
          slug={`${slug}-page-hero`}
          carousel
          imgClassName="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 to-brand-dark/70" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">
            {page.title}
          </span>
          <h1
            className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            {page.title}
          </h1>
          {page.meta_description && (
            <p className="mt-6 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">
              {page.meta_description}
            </p>
          )}
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-mid-gray hover:text-brand-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-3.5" /> Back to Home
        </Link>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-dark font-bold leading-tight mb-8">
          {page.title}
        </h2>

        <div
          className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-dark prose-a:text-brand-primary prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: page.content ?? "" }}
        />
      </article>
    </>
  );
}
