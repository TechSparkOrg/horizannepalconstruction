import type { Metadata } from "next";
import Image from "next/image";
import { getPageBundle } from "@/api/services/page-bundle.service";
import dynamic from "next/dynamic";
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then((m) => ({ default: m.ConsultationForm })));
import { LdJson } from "@/components/global_ui/JsonLd";
import { breadcrumbList } from "@/lib/seo-utils";
import type { Category } from "@/api/types/category.types";

interface RequestBundle {
  categories: { results: Category[] };
}

export const metadata: Metadata = {
  title: "Request a Project | Horizan Nepal Construction",
  description:
    "Submit your construction or design project request to Horizan Nepal. Get a free consultation and tailored quote within 24 hours.",
  openGraph: {
    title: "Request a Project | Horizan Nepal Construction",
    description:
      "Submit your project request and receive a free consultation within 24 hours.",
    type: "website",
  },
};

const trustItems = [
  { val: "24h",   label: "Response Time"  },
  { val: "Free",  label: "Consultation"   },
  { val: "100%",  label: "Confidential"   },
];

const steps = [
  { num: "01", title: "Submit Request",    desc: "Fill in your project details — takes under 3 minutes."           },
  { num: "02", title: "We Review",         desc: "Our team reviews your brief and assigns the right specialist."   },
  { num: "03", title: "Free Consultation", desc: "We call or meet to finalise scope, budget, and timelines."       },
  { num: "04", title: "Proposal Ready",    desc: "You receive a clear, itemised quote with no hidden charges."     },
];

export default async function RequestPage() {
  const bundle = await getPageBundle<RequestBundle>("request", "request");
  const categories = bundle.categories?.results ?? [];

  return (
    <>
      <LdJson data={breadcrumbList("Request a Project", "request")} />

      {/* ── Hero ── */}
      <section
        className="relative bg-brand-dark overflow-hidden"
        aria-label="Request a project hero"
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          aria-hidden="true"
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cd2028] hidden lg:block" aria-hidden="true" />

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <div>
              <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.26em] uppercase mb-4 flex items-center gap-2.5">
                <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
                Project Request
              </p>
              <h1
                className="font-display font-black text-white leading-[1.04] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                Let&apos;s Build Your<br />
                <span className="text-[#3b82f6]">Vision Together</span>
              </h1>
              <p className="mt-5 text-white/60 text-[14.5px] leading-[1.75] max-w-[400px]">
                Share your project details with us. Our team reviews every request and responds within 24 hours with a tailored plan.
              </p>

              {/* Trust grid */}
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-xs">
                {trustItems.map((t) => (
                  <div
                    key={t.label}
                    className="rounded-xl bg-white/6 border border-white/10 px-3 py-4 text-center"
                  >
                    <p className="text-white font-black text-[20px] leading-none">{t.val}</p>
                    <p className="text-white/40 text-[9.5px] font-semibold mt-1 uppercase tracking-[0.14em]">
                      {t.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <Image
                  src="/video-gif/plan-making.svg"
                  alt="Project planning illustration"
                  width={380}
                  height={300}
                  className="w-[340px] h-auto object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[#f8fafc] py-14 sm:py-16 border-b border-[#e2e8f0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4 items-start">
                <span className="shrink-0 font-black text-[#cd2028] text-[22px] leading-none w-10 pt-0.5">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-display font-bold text-[14.5px] text-brand-dark">{s.title}</h3>
                  <p className="mt-1 text-[12.5px] text-[#64748b] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Consultation Form ── */}
      <ConsultationForm initialCategories={categories} />
    </>
  );
}
