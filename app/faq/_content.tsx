import { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { getSvgUrl } from "@/lib/svg-utils";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqGroupsSafe } from "@/api/services/faq.service";

async function FaqGroupsSection() {
  const groups = await getFaqGroupsSafe();
  return <FAQTimeline initialGroups={groups} />;
}

const FAQTimeline = dynamic(() => import("@/components/page_ui/FAQTimeline").then((m) => ({ default: m.FAQTimeline })));
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then((m) => ({ default: m.ConsultationForm })));
const QuestionForm = dynamic(() => import("@/components/page_ui/QuestionForm").then((m) => ({ default: m.QuestionForm })));

export function FaqContent({ svgItems }: { svgItems?: import("@/api/types/page.types").PageSvgItem[] }) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <ViewportSection fallback={F("py-16 sm:py-28")}>
        <Suspense fallback={F("py-16 sm:py-28")}>
          <FaqGroupsSection />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={F("min-h-[600px] bg-[#f8fafc]")}>
        <ConsultationForm />
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-20 bg-[#0f2557]")}>
        <section className="relative bg-[#0f2557] overflow-hidden">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                  <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Still curious?</span>
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
              <div className="shrink-0 flex items-center justify-center">
                <Image
                  src={getSvgUrl(svgItems, 0, "/video-gif/business-questions.svg")}
                  alt="Ask us anything illustration"
                  width={320}
                  height={320}
                  unoptimized
                  className="w-[200px] sm:w-[280px] lg:w-[320px] h-auto object-contain"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 320px"
                />
              </div>
            </div>
          </div>
        </section>
      </ViewportSection>
    </>
  );
}


