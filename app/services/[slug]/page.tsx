import type { Metadata } from "next"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import { getServiceCategoryDetail } from "@/api/services/category.service"
import { LdJson } from "@/components/global_ui/JsonLd"
import { breadcrumbList } from "@/lib/seo-utils"
import { stripHtml } from "@/lib/extractTocItems"

const ParsedContent = dynamic(() => import("@/lib/Parse-Content"))

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

      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-[#0f2557]">
        {detail.banner_images?.[0]?.url && (
          <Image
            src={detail.banner_images[0].url}
            alt={`${detail.name} banner`}
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2557]/90 via-[#0f2557]/40 to-transparent" />
        <div className="relative max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 pt-32">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-white/70 border border-white/20 px-3 py-1 rounded mb-4">
            Services
          </span>
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-[1.05] max-w-3xl">
            {detail.name}
          </h1>
        </div>
      </section>

      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ParsedContent description={detail.description} />
      </section>

      {(detail.roles.length > 0 || detail.attributes.length > 0) && (
        <section className="bg-off-white py-16">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {detail.roles.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-brand-dark/60 uppercase tracking-widest mb-4">Roles</h2>
                <div className="flex flex-wrap gap-2">
                  {detail.roles.map((r) => (
                    <span key={r.id} className="px-3 py-1.5 rounded-lg bg-white border border-light-gray text-sm text-mid-gray">
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {detail.attributes.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-brand-dark/60 uppercase tracking-widest mb-4">Attributes</h2>
                <div className="flex flex-wrap gap-2">
                  {detail.attributes.map((a) => (
                    <span key={a.id} className="px-3 py-1.5 rounded-lg bg-white border border-light-gray text-sm text-mid-gray">
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
