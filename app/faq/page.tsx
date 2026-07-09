import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPageBySlug } from "@/api/services/page.service";
import { LazyFeather } from "@/components/viewport/LazyFeather";
import { FaqContent } from "./_content";

const ParsedContent = dynamic(() => import("@/lib/Parse-Content"));

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const SLUG = "faq";
const faqPageP = getPageBySlug(SLUG).catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const page = await faqPageP;
  const url = `${SITE_URL}/${SLUG}`;
  return {
    title: page?.meta_title || "FAQ | Horizan Nepal",
    description: page?.meta_description || "Frequently asked questions about Horizan Nepal's services, design process, construction timeline, costing, and more.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "FAQ | Horizan Nepal",
      description: page?.meta_description || "Frequently asked questions about Horizan Nepal's services and process.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function FAQPage() {
  const page = await faqPageP;

  return (
    <>
      <LazyFeather />

      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[62svh] sm:min-h-[68svh]">
        <div className="absolute right-0 top-0 h-full w-full lg:w-[55%]">
          <Image
            src="/video-gif/Live-chatbot.svg"
            alt="FAQ chatbot illustration"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-contain object-center lg:object-right"
            priority
          />
          <div className="absolute inset-0 bg-[#0f2557]/80 lg:hidden" />
          <div className="absolute inset-y-0 left-0 w-56 hidden lg:block pointer-events-none" aria-hidden="true"
            style={{ background: "linear-gradient(to right, #0f2557 20%, transparent)" }} />
        </div>
        <div className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none" aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, #0f2557 5%, transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-24 z-10 pointer-events-none" aria-hidden="true"
          style={{ background: "linear-gradient(to top, #0f2557 10%, transparent)" }} />
        <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col justify-end min-h-[62svh] sm:min-h-[68svh] pb-10 sm:pb-14 pt-28">
          <div className="max-w-[520px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/70">FAQ</span>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h1 className="font-display font-black text-white leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Frequently<br /><span className="text-[#93c5fd]">Asked Questions</span>
            </h1>
            <p className="mt-4 text-white/70 text-sm sm:text-base max-w-[440px] leading-relaxed">
              Everything you need to know about working with Horizon Nepal — pricing, process, and timelines.
            </p>
            <div className="mt-6 flex items-center gap-5 flex-wrap">
              <a href="#faq-questions" className="inline-flex items-center gap-2 h-11 px-6 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2">
                Browse Questions <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="faq-questions">
        <Suspense fallback={<div className="py-16 sm:py-28" />}>
          <FaqContent />
        </Suspense>
      </div>

      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  );
}
