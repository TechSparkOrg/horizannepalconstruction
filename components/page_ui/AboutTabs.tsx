"use client";

import { useState } from "react";
import { Target, Map, Play, CheckCircle2 } from "lucide-react";

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
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — left-aligned, consistent with site pattern */}
        <div className="max-w-xl mb-10">
          <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-3 flex items-center gap-2.5">
            <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
            Our Approach
          </p>
          <h2
            className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)" }}
          >
            Mission · Plan · Act
          </h2>
          <p className="mt-3 text-[#64748b] text-[14.5px] leading-relaxed">
            A clear, three-phase approach that guides every project from idea to completion.
          </p>
        </div>

        {/* Tab strip */}
        <div className="flex border-b border-[#e2e8f0]" role="tablist" aria-label="Our approach phases">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === i}
              aria-controls={`tab-panel-${t.id}`}
              onClick={() => setActive(i)}
              className={[
                "flex items-center gap-2 px-4 sm:px-7 py-3.5 text-[13px] font-semibold transition-colors duration-150 border-b-2 -mb-px",
                "focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2",
                active === i
                  ? "border-[#cd2028] text-[#cd2028]"
                  : "border-transparent text-[#64748b] hover:text-[#0f2557]",
              ].join(" ")}
            >
              <span
                className={[
                  "inline-flex items-center justify-center size-5 rounded-full text-[10px] font-bold transition-colors",
                  active === i
                    ? "bg-[#cd2028]/10 text-[#cd2028]"
                    : "bg-[#f1f5f9] text-[#64748b]",
                ].join(" ")}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <t.icon className="size-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div
          id={`tab-panel-${current.id}`}
          role="tabpanel"
          className="grid lg:grid-cols-[1fr_1.6fr] border border-t-0 border-[#e2e8f0] rounded-b-2xl overflow-hidden bg-[#e2e8f0]"
          style={{ gap: "1px" }}
        >
          {/* Left — icon + title */}
          <div className="bg-white p-6 sm:p-9">
            <div className="size-11 rounded-xl bg-[#0f2557]/8 flex items-center justify-center mb-5">
              <current.icon className="size-5 text-[#0f2557]" />
            </div>
            <h3
              className="font-display font-black text-[#0f2557] leading-snug tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              {current.title}
            </h3>
          </div>

          {/* Right — body + highlights */}
          <div className="flex flex-col gap-5 p-6 sm:p-9 bg-[#f8fafc]">
            <p className="text-[14px] leading-[1.78] text-[#475569]">
              {current.body}
            </p>

            <div className="rounded-xl overflow-hidden border border-[#e2e8f0] bg-white divide-y divide-[#e2e8f0]">
              {current.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 px-4 py-3.5">
                  <CheckCircle2 className="size-4 text-[#cd2028] shrink-0" />
                  <span className="text-[13.5px] font-medium text-[#0f2557]">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
