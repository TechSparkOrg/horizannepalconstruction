import { Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqsSafe } from "@/api/services/faq.service";
import type { PublicMaterialDetail } from "@/api/types/material.types";

const MaterialContent = dynamic(() => import("@/components/page_ui/MaterialDetailContent.client"));
const VideoEmbed = dynamic(() => import("@/components/global_ui/VideoEmbed.client"));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));

export function MaterialDetailContent({ item }: { item: PublicMaterialDetail }) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      {item.description && <MaterialContent content={item.description} />}

      {item.variants && item.variants.length > 0 && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-[#f8fafc] min-h-[300px]")}>
          <section className="bg-[#f8fafc] py-12 sm:py-16">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-2">
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                  <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Options</p>
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                </div>
                <h2 className="font-display font-bold text-[#0f2557] text-xl sm:text-2xl tracking-tight">Available Variants</h2>
              </div>
              <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#0f2557]">
                        <th scope="col" className="px-5 py-3.5 text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white">Image</th>
                        <th scope="col" className="px-5 py-3.5 text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white">Variant</th>
                        <th scope="col" className="px-5 py-3.5 text-right text-[12px] font-bold uppercase tracking-[0.14em] text-white">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.variants.map((v, i) => (
                        <tr key={v.id}
                          className={[i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]", i < item.variants.length - 1 ? "border-b border-[#e2e8f0]" : ""].join(" ")}>
                          <td className="px-5 py-3.5">
                            {v.img ? (
                              <div className="relative size-10 rounded-lg overflow-hidden bg-[#f1f5f9]">
                                <Image src={v.img} alt={v.market_name || "Variant"} fill sizes="40px" className="object-cover" />
                              </div>
                            ) : (
                              <div className="size-10 rounded-lg bg-[#f1f5f9]" />
                            )}
                          </td>
                          <td className="px-5 py-3.5 text-[14px] font-semibold text-[#0f2557]">{v.market_name}</td>
                          <td className="px-5 py-3.5 text-right text-[14px] font-bold text-[#cd2028]">Rs.&nbsp;{v.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </ViewportSection>
      )}

      {item.video_url && (
        <ViewportSection fallback={F("py-10 bg-white min-h-[300px]")}>
          <VideoEmbed url={item.video_url} title={`${item.name} — Product Video`} />
        </ViewportSection>
      )}

      {item.faq_group_slug && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
            <MaterialDetailFaqInner faqGroupSlug={item.faq_group_slug} title="Frequently Asked Questions" />
          </Suspense>
        </ViewportSection>
      )}
    </>
  );
}

async function MaterialDetailFaqInner({ faqGroupSlug, title }: { faqGroupSlug: string; title?: string }) {
  const faqs = await getFaqsSafe({ group__slug: faqGroupSlug, page_size: 20 });
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} title={title} />;
}
