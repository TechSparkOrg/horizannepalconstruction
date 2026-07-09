import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import { cacheLife } from "next/cache"
import { getServiceCategoryDetail } from "@/api/services/category.service"
import { getFaqs } from "@/api/services/faq.service"
import { LdJson } from "@/components/global_ui/JsonLd"
import { breadcrumbList } from "@/lib/seo-utils"
import { stripHtml } from "@/lib/extractTocItems"

const ParsedContent = dynamic(() => import("@/lib/Parse-Content"))
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"))

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const detail = await getServiceCategoryDetail(slug).catch(() => null)
  if (!detail) return {}
  return {
    title: detail.meta_title || `${detail.name} | Horizan Nepal`,
    description: detail.meta_description || stripHtml(detail.description).substring(0, 160),
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const detail = await getServiceCategoryDetail(slug).catch(() => null)
  if (!detail) notFound()

  return (
    <>
      <LdJson data={breadcrumbList(detail.name, `services/${detail.slug}`)} />

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#0f2557]">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />
        {detail.banner_images?.[0]?.url && (
          <Image
            src={detail.banner_images[0].url}
            alt={`${detail.name} banner`}
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3d]/95 via-[#0f2557]/50 to-transparent" />
        <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-14 sm:pb-18 pt-32">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Services</span>
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <h1
            className="font-display font-black text-white leading-[1.05] tracking-[-0.02em] max-w-3xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
          >
            {detail.name}
          </h1>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ParsedContent description={detail.description} />
      </section>

      {/* ── Roles & Attributes ── */}
      {((detail.roles?.length ?? 0) > 0 || (detail.attributes?.length ?? 0) > 0) && (
        <section className="bg-[#f8fafc] py-16 sm:py-20">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {(detail.roles?.length ?? 0) > 0 && (
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                  <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Roles</p>
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {detail.roles!.map((r) => (
                    <span
                      key={r.id}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-[13px] font-medium text-[#0f2557]"
                    >
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(detail.attributes?.length ?? 0) > 0 && (
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                  <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Attributes</p>
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {detail.attributes!.map((a) => (
                    <span
                      key={a.id}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-[13px] font-medium text-[#64748b]"
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <Suspense fallback={<div className="py-12 bg-white" />}>
        <ServiceFaqInner faqSlug={detail.faq_group_slug ?? detail.slug} />
      </Suspense>
    </>
  )
}

async function ServiceFaqInner({ faqSlug }: { faqSlug: string }) {
  "use cache"
  cacheLife("default")
  const res = await getFaqs({ group__slug: faqSlug, page_size: 20 }).catch(() => ({ results: [] }))
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }))
  return <FaqClient categorySlug={faqSlug} initialFaqs={faqs} />
}
