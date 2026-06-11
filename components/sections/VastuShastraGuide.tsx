"use client";

import { useState } from "react";
import type { VastuConfig } from "@/stores/admin-store";

const FALLBACK_ICONS: Record<string, string> = {
  overview: "🪷",
  elements: "🌍",
  land: "🏞️",
  entrance: "🚪",
  "room-placement": "🏠",
  "kitchen-dining": "🍳",
};

export default function VastuShastraGuide({ data }: { data: VastuConfig }) {
  const sections = data.sections || {};
  const rooms = data.rooms || {};
  const directions = data.directions || {};
  const sectionKeys = data.section_keys?.length ? data.section_keys : Object.keys(data.sections || {});
  const sectionIcons = data.section_icons || {};
  const roomOptions = data.room_options?.length ? data.room_options : Object.keys(data.rooms || {}).map((id) => ({ id, label: id, labelNp: id }));
  const directionOptions = data.direction_options?.length ? data.direction_options : Object.keys(data.directions || {}).map((id) => ({ id, label: id, subtitle: "" }));
  const qt = data.quick_tools || {};
  const icon = (key: string) => sectionIcons[key] || FALLBACK_ICONS[key] || "📄";
  const [activeSection, setActiveSection] = useState<string>(sectionKeys[0] || "");
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]?.id || "");
  const [selectedDirection, setSelectedDirection] = useState(directionOptions[0]?.id || "");
  const [showRoomResult, setShowRoomResult] = useState(false);
  const [showDirResult, setShowDirResult] = useState(false);

  const section = sections?.[activeSection];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28">
      {/* Section Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {sectionKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeSection === key
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                : "bg-off-white text-brand-dark hover:bg-brand-secondary/10 border border-light-gray/40"
            }`}
          >
            <span>{icon(key)}</span>
            <span className="hidden sm:inline">{sections?.[key]?.title || key}</span>
            <span className="sm:hidden">{sections?.[key]?.titleNp || ""}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-8 mb-20">
        {/* Sidebar - Section Navigation */}
        <div className="space-y-1">
          {sectionKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === key
                  ? "bg-brand-primary/10 text-brand-primary border-l-4 border-brand-primary"
                  : "text-mid-gray hover:bg-off-white border-l-4 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{icon(key)}</span>
                <div>
                  <p className="font-semibold">{sections?.[key]?.title || key}</p>
                  <p className="text-xs text-mid-gray">{sections?.[key]?.titleNp || ""}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-light-gray/40 p-6 sm:p-8">
          <h2 className="font-display font-bold text-2xl text-brand-secondary mb-2">{section?.title || activeSection}</h2>
          <p className="text-sm text-mid-gray mb-6 pb-4 border-b border-light-gray/40">{section?.titleNp || ""}</p>
          <div className="space-y-6">
            {(section?.content || []).map((para, i) => (
              <div key={i}>
                <p className="text-mid-gray leading-relaxed">{para.en}</p>
                <p className="text-mid-gray text-sm mt-2 leading-relaxed border-l-2 border-brand-primary/20 pl-3">{para.np}</p>
              </div>
            ))}
          </div>

          {section?.customTopics && (
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {section.customTopics.map((topic) => (
                <div key={topic.title} className="rounded-xl border border-light-gray/50 bg-off-white p-4">
                  <h3 className="font-display font-bold text-base text-brand-dark">{topic.title}</h3>
                  <p className="mt-0.5 text-xs text-mid-gray">{topic.titleNp}</p>
                  <div className="mt-4 space-y-3">
                    {topic.items.map((item, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <span className="mt-1 size-1.5 rounded-full bg-brand-primary shrink-0" />
                        <div>
                          <p className="text-mid-gray leading-relaxed">{item.en}</p>
                          <p className="text-xs text-mid-gray leading-relaxed">{item.np}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Tools Section */}
      <div className="border-t border-light-gray/40 pt-16">
        <div className="text-center mb-10">
          {qt.badge && <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">{qt.badge}</span>}
          <h2 className="mt-3 font-display font-bold text-3xl text-brand-dark">{qt.title || "Vastu Analysis Tools"}</h2>
          {qt.description && <p className="mt-2 text-mid-gray">{qt.description}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Room Specific Vastu */}
          <div className="bg-white rounded-2xl border border-light-gray/40 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🛋️</span>
              <div>
                  <h3 className="font-display font-bold text-lg text-brand-dark">{qt.roomToolTitle || "Room-Specific Vastu"}</h3>
                {qt.roomToolDesc && <p className="text-xs text-mid-gray">{qt.roomToolDesc}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <label htmlFor="vastu-room-select" className="sr-only">Select a room</label>
              <select
                id="vastu-room-select"
                value={selectedRoom}
                onChange={(e) => { setSelectedRoom(e.target.value); setShowRoomResult(false); }}
                className="flex-1 px-3 py-2.5 rounded-xl border border-light-gray/60 text-sm text-brand-dark bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              >
                {roomOptions.map((r) => (
                  <option key={r.id} value={r.id}>{r.label} ({r.labelNp})</option>
                ))}
              </select>
              <button
                onClick={() => setShowRoomResult(true)}
                className="px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary/90 transition-colors whitespace-nowrap"
              >
                Analyze Room
              </button>
            </div>

            {showRoomResult && rooms[selectedRoom] && (
              <div className="mt-6 space-y-5">
                <div className="bg-brand-secondary/5 rounded-xl p-4 border border-brand-secondary/10">
                  <p className="text-xs font-semibold text-brand-secondary uppercase tracking-wide mb-1">Ideal Direction</p>
                  <p className="text-sm text-mid-gray">{rooms[selectedRoom]?.idealDirection?.en ?? ""}</p>
                  <p className="text-xs text-mid-gray mt-1 border-l-2 border-brand-secondary/20 pl-2">{rooms[selectedRoom]?.idealDirection?.np ?? ""}</p>
                </div>
                <div className="bg-brand-primary/5 rounded-xl p-4 border border-brand-primary/10">
                  <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide mb-1">Facing Direction</p>
                  <p className="text-sm text-mid-gray">{rooms[selectedRoom]?.facingDirection?.en ?? ""}</p>
                  <p className="text-xs text-mid-gray mt-1 border-l-2 border-brand-primary/20 pl-2">{rooms[selectedRoom]?.facingDirection?.np ?? ""}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <span>✓</span> Tips (Do&apos;s)
                  </p>
                  <div className="space-y-1.5">
                    {(rooms[selectedRoom]?.tips ?? []).map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="size-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                        <div>
                          <p className="text-mid-gray">{t.en}</p>
                          <p className="text-xs text-mid-gray">{t.np}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <span>✗</span> Avoid (Don&apos;ts)
                  </p>
                  <div className="space-y-1.5">
                    {(rooms[selectedRoom]?.avoid ?? []).map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="size-4 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✗</span>
                        <div>
                          <p className="text-mid-gray">{a.en}</p>
                          <p className="text-xs text-mid-gray">{a.np}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Direction Analysis */}
          <div className="bg-white rounded-2xl border border-light-gray/40 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🧭</span>
              <div>
                <h3 className="font-display font-bold text-lg text-brand-dark">{qt.directionToolTitle || "Directional Analysis"}</h3>
                {qt.directionToolDesc && <p className="text-xs text-mid-gray">{qt.directionToolDesc}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <label htmlFor="vastu-direction-select" className="sr-only">Select a direction</label>
              <select
                id="vastu-direction-select"
                value={selectedDirection}
                onChange={(e) => { setSelectedDirection(e.target.value); setShowDirResult(false); }}
                className="flex-1 px-3 py-2.5 rounded-xl border border-light-gray/60 text-sm text-brand-dark bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              >
                {directionOptions.map((d) => (
                  <option key={d.id} value={d.id}>{d.label} — {d.subtitle}</option>
                ))}
              </select>
              <button
                onClick={() => setShowDirResult(true)}
                className="px-5 py-2.5 bg-brand-secondary text-white text-sm font-semibold rounded-xl hover:bg-brand-secondary/90 transition-colors whitespace-nowrap"
              >
                Analyze Direction
              </button>
            </div>

            {showDirResult && directions[selectedDirection] && (
              <div className="mt-6 space-y-5">
                <div className="bg-brand-secondary/5 rounded-xl p-4 border border-brand-secondary/10">
                  <div className="flex gap-3 text-xs text-mid-gray mb-2">
                    <span><strong className="text-brand-dark">Deity:</strong> {directions[selectedDirection].deity}</span>
                    <span><strong className="text-brand-dark">Element:</strong> {directions[selectedDirection].element}</span>
                  </div>
                  <p className="text-sm text-mid-gray">{directions[selectedDirection]?.description?.en ?? ""}</p>
                  <p className="text-xs text-mid-gray mt-1 border-l-2 border-brand-secondary/20 pl-2">{directions[selectedDirection]?.description?.np ?? ""}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <span>✓</span> Recommended (Do&apos;s)
                  </p>
                  <div className="space-y-1.5">
                    {(directions[selectedDirection]?.recommended ?? []).map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="size-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                        <div>
                          <p className="text-mid-gray">{r.en}</p>
                          <p className="text-xs text-mid-gray">{r.np}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <span>✗</span> Avoid (Don&apos;ts)
                  </p>
                  <div className="space-y-1.5">
                    {(directions[selectedDirection]?.avoid ?? []).map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="size-4 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✗</span>
                        <div>
                          <p className="text-mid-gray">{a.en}</p>
                          <p className="text-xs text-mid-gray">{a.np}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
