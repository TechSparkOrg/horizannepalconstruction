import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LdJson } from "@/components/global_ui/JsonLd";
import { FAQTimeline } from "@/components/page_ui/FAQTimeline";
import { ConsultationForm } from "@/components/global_ui/ConsultationForm";
import { QuestionForm } from "@/components/page_ui/QuestionForm";
import { getFaqGroups } from "@/api/services/faq.service";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";
import { LazyFeather } from "@/app/_components/LazyFeather";

const ParsedContent = dynamic(() => import("@/lib/Parse-Content"))

const SLUG = "faq"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch(() => null)
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "FAQ | Horizan Nepal",
    description: page?.meta_description || "Frequently asked questions about Horizan Nepal's services, design process, construction timeline, costing, and more.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "FAQ | Horizan Nepal",
      description: page?.meta_description || "Frequently asked questions about Horizan Nepal's services and process.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function FAQPage() {
  const [pageData, faqRes] = await Promise.allSettled([
    getPageBySlug(SLUG),
    getFaqGroups(),
  ]);
  const page = pageData.status === "fulfilled" ? pageData.value : null
  const initialGroups = faqRes.status === "fulfilled" ? faqRes.value.results ?? [] : []
  const totalFaqs = initialGroups.reduce((acc, g) => acc + (g.items?.length ?? 0), 0)

  return (
    <>
      <LdJson data={breadcrumbList("FAQ", "faq")} />
      <LazyFeather />

      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[62svh] sm:min-h-[68svh]">
        {/* SVG — right panel on desktop, faded bg on mobile */}
        <div className="absolute right-0 top-0 h-full w-full lg:w-[55%]">
          <Image
            src="/video-gif/Live-chatbot.svg"
            alt="FAQ chatbot illustration"
            fill
            className="object-contain object-center lg:object-right"
            unoptimized
            priority
          />
          {/* mobile: darken so text stays readable */}
          <div className="absolute inset-0 bg-[#0f2557]/80 lg:hidden" />
          {/* desktop: blend left edge into content panel */}
          <div
            className="absolute inset-y-0 left-0 w-56 hidden lg:block pointer-events-none"
            aria-hidden="true"
            style={{ background: "linear-gradient(to right, #0f2557 20%, transparent)" }}
          />
        </div>

        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none"
          aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, #0f2557 5%, transparent)" }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 z-10 pointer-events-none"
          aria-hidden="true"
          style={{ background: "linear-gradient(to top, #0f2557 10%, transparent)" }}
        />

        {/* Content — left-anchored */}
        <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col justify-end min-h-[62svh] sm:min-h-[68svh] pb-10 sm:pb-14 pt-28">
          <div className="max-w-[520px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/70">
                FAQ
              </span>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>

            <h1
              className="font-display font-black text-white leading-none tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Frequently<br />
              <span className="text-[#93c5fd]">Asked Questions</span>
            </h1>

            <p className="mt-4 text-white/70 text-sm sm:text-base max-w-[440px] leading-relaxed">
              Everything you need to know about working with Horizon Nepal — pricing, process, and timelines.
            </p>

            <div className="mt-6 flex items-center gap-5 flex-wrap">
              <a
                href="#faq-questions"
                className="inline-flex items-center gap-2 h-11 px-6 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2"
              >
                Browse Questions
                <ArrowRight className="size-4" />
              </a>
              {totalFaqs > 0 && (
                <span className="text-white/60 text-sm">
                  <span className="font-semibold text-white/80">{totalFaqs}</span> answers ready
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div id="faq-questions">
        <FAQTimeline initialGroups={initialGroups} />
      </div>

      <ConsultationForm />

      {/* ── Question Me — feather lands here ── */}
      <section id="question-me" className="relative bg-[#0f2557] py-16 sm:py-20 overflow-hidden">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left: text + form */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">
                  Still curious?
                </span>
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight">
                Ask Us <span className="text-[#93c5fd]">Anything</span>
              </h2>
              <p className="mt-3 text-white/60 text-sm sm:text-base max-w-[460px] leading-relaxed">
                Didn&apos;t find your answer? Type your question below and our team will respond within 24 hours.
              </p>
              <QuestionForm />
            </div>

            {/* Right: Poetry.svg */}
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/video-gif/business-questions.svg"
                alt="Ask us anything illustration"
                width={320}
                height={320}
                className="w-[200px] sm:w-[280px] lg:w-[320px] h-auto object-contain"
                unoptimized
              />
            </div>

          </div>
        </div>
      </section>

      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}

    </>
  );
}
