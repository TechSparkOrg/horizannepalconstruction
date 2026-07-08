"use client";

import { useState } from "react";
import { Target, Map, Play } from "lucide-react";
import { Label } from "@/components/ui/label";

const tabs = [
  {
    id: "mission",
    label: "Mission",
    icon: Target,
    title: "To build Nepal's future with integrity and innovation",
    body: "We are committed to delivering architectural and construction solutions that elevate communities. Every project we undertake is guided by a deep sense of responsibility — to our clients, to the environment, and to the people who will live, work, and grow within the spaces we create. Our mission is to make quality design and construction accessible across Nepal, from the capital to the countryside.",
    highlights: [
      "Client-first approach at every stage",
      "Sustainable and context-sensitive designs",
      "Transparent pricing and timelines",
    ],
  },
  {
    id: "plan",
    label: "Plan",
    icon: Map,
    title: "Every great structure starts with a thoughtful plan",
    body: "Before we break ground, we invest time in understanding your vision, your site, and your budget. Our planning phase brings together architects, engineers, and project managers to create a detailed roadmap — covering design concepts, material selection, regulatory approvals, and construction timelines. We believe thorough planning is the foundation of a stress-free building experience.",
    highlights: [
      "Site analysis and feasibility studies",
      "Concept design and 3D visualization",
      "Permits, approvals, and compliance handled end-to-end",
    ],
  },
  {
    id: "act",
    label: "Act",
    icon: Play,
    title: "From blueprint to built — with precision and care",
    body: "Execution is where plans become reality. Our experienced construction teams, rigorous quality checks, and on-site project management ensure every detail is delivered to specification. We keep you informed at every milestone, adapting to challenges as they arise without compromising on quality or timeline.",
    highlights: [
      "Dedicated project manager on every site",
      "Regular quality audits and safety inspections",
      "Post-completion support and maintenance",
    ],
  },
];

export function AboutTabs() {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <Label className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1d4ed8] bg-[#1d4ed8]/8 px-3 py-1 rounded-full">Our Approach</Label>
          <h2 className="mt-3 font-display text-2xl sm:text-4xl lg:text-5xl text-[#0f2557]">
            Mission · Plan · Act
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#334155]">
            A clear, three-phase approach that guides every project from idea to completion.
          </p>
        </div>

        <div className="mt-10">
          {/* Tab strip */}
          <div className="flex border-b border-[#e2e8f0]" role="tablist">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3.5 text-[13px] sm:text-sm font-medium transition-colors duration-150 border-b-2 -mb-px ${
                  active === i
                    ? "border-[#1d4ed8] text-[#1d4ed8]"
                    : "border-transparent text-[#334155] hover:text-[#0f2557]"
                }`}
              >
                <span
                  className={`flex items-center justify-center size-5 rounded-full text-[10px] font-semibold transition-colors ${
                    active === i
                      ? "bg-[#1d4ed8]/10 text-[#1d4ed8]"
                      : "bg-[#e2e8f0] text-[#334155]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <t.icon className="size-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="grid lg:grid-cols-[1fr_1.5fr] rounded-b-2xl overflow-hidden border border-t-0 border-[#e2e8f0] bg-[#e2e8f0]"
            style={{ gap: "1px" }}
            role="tabpanel"
          >
            {/* Left */}
            <div className="bg-white p-5 sm:p-8">
              <div className="size-12 rounded-xl bg-[#1d4ed8]/10 flex items-center justify-center mb-5">
                <current.icon className="size-6 text-[#1d4ed8]" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl leading-snug text-[#0f2557]">
                {current.title}
              </h3>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-5 p-5 sm:p-8 bg-[#f8fafc]">
              <p className="text-sm leading-relaxed text-[#334155]">
                {current.body}
              </p>

              {/* Highlights list */}
              <div className="rounded-xl overflow-hidden border divide-y bg-white border-[#e2e8f0]">
                {current.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#0f2557]">
                    <span className="size-1.5 rounded-full bg-[#1d4ed8] shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}