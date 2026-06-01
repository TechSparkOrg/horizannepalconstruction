"use client";

import { useState, useRef } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { useAdminStore, type VastuConfig, type VastuBilingualText } from "@/stores/admin-store";

const TABS = ["Hero & Tools", "Sections", "Rooms", "Directions"] as const;
type Tab = typeof TABS[number];

function BilingualEditor({ label, value, onChange }: {
  label: string;
  value: VastuBilingualText;
  onChange: (v: VastuBilingualText) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-mid-gray uppercase">{label}</label>
      <input value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} placeholder="English" className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      <input value={value.np} onChange={(e) => onChange({ ...value, np: e.target.value })} placeholder="नेपाली" className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
    </div>
  );
}

function ListEditor({ items, onChange }: {
  items: VastuBilingualText[];
  onChange: (items: VastuBilingualText[]) => void;
}) {
  const add = () => onChange([...items, { en: "", np: "" }]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, v: VastuBilingualText) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-1.5 items-start">
          <div className="flex-1 space-y-1">
            <input value={item.en} onChange={(e) => update(i, { ...item, en: e.target.value })} placeholder="English" className="w-full h-8 px-2 rounded border border-light-gray text-xs" />
            <input value={item.np} onChange={(e) => update(i, { ...item, np: e.target.value })} placeholder="नेपाली" className="w-full h-8 px-2 rounded border border-light-gray text-xs" />
          </div>
          <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs mt-1 px-1.5 py-0.5 rounded hover:bg-red-50">✕</button>
        </div>
      ))}
      <button onClick={add} className="text-xs text-brand-primary font-semibold hover:underline">+ Add item</button>
    </div>
  );
}

function SectionEditor({ config, onChange }: { config: VastuConfig; onChange: (c: VastuConfig) => void }) {
  const [active, setActive] = useState<string>(config.sectionKeys[0]);
  const updateSection = (key: string, patch: Partial<typeof config.sections[string]>) => {
    onChange({ ...config, sections: { ...config.sections, [key]: { ...config.sections[key], ...patch } } });
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {config.sectionKeys.map((key) => (
          <button key={key} onClick={() => setActive(key)} className={`px-3 py-1.5 rounded text-xs font-semibold transition ${active === key ? "bg-brand-primary text-white" : "bg-gray-100 text-mid-gray hover:bg-gray-200"}`}>
            {config.sections[key].title.slice(0, 18)}
          </button>
        ))}
      </div>
      {active && config.sections[active] && (
        <div className="space-y-4 border border-light-gray/40 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Title (EN)</label>
              <input value={config.sections[active].title} onChange={(e) => updateSection(active, { title: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Title (NP)</label>
              <input value={config.sections[active].titleNp} onChange={(e) => updateSection(active, { titleNp: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Content paragraphs</label>
            <ListEditor items={config.sections[active].content} onChange={(content) => updateSection(active, { content })} />
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Custom topics</label>
            {config.sections[active].customTopics.map((topic, ti) => (
              <div key={ti} className="border border-light-gray/30 rounded-lg p-3 mb-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input value={topic.title} onChange={(e) => {
                    const next = [...config.sections[active].customTopics];
                    next[ti] = { ...next[ti], title: e.target.value };
                    updateSection(active, { customTopics: next });
                  }} placeholder="Topic title (EN)" className="h-8 px-2 rounded border border-light-gray text-xs" />
                  <input value={topic.titleNp} onChange={(e) => {
                    const next = [...config.sections[active].customTopics];
                    next[ti] = { ...next[ti], titleNp: e.target.value };
                    updateSection(active, { customTopics: next });
                  }} placeholder="Topic title (NP)" className="h-8 px-2 rounded border border-light-gray text-xs" />
                </div>
                <ListEditor items={topic.items} onChange={(items) => {
                  const next = [...config.sections[active].customTopics];
                  next[ti] = { ...next[ti], items };
                  updateSection(active, { customTopics: next });
                }} />
                <button onClick={() => {
                  const next = config.sections[active].customTopics.filter((_, i) => i !== ti);
                  updateSection(active, { customTopics: next });
                }} className="text-xs text-red-400 hover:text-red-600">Remove topic</button>
              </div>
            ))}
            <button onClick={() => {
              updateSection(active, { customTopics: [...config.sections[active].customTopics, { title: "", titleNp: "", items: [] }] });
            }} className="text-xs text-brand-primary font-semibold hover:underline">+ Add topic</button>
          </div>
        </div>
      )}
    </div>
  );
}

function RoomEditor({ config, onChange }: { config: VastuConfig; onChange: (c: VastuConfig) => void }) {
  const [active, setActive] = useState(config.roomOptions[0]?.id || "");
  const updateRoom = (key: string, patch: Partial<typeof config.rooms[string]>) => {
    onChange({ ...config, rooms: { ...config.rooms, [key]: { ...config.rooms[key], ...patch } } });
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {config.roomOptions.map((r) => (
          <button key={r.id} onClick={() => setActive(r.id)} className={`px-3 py-1.5 rounded text-xs font-semibold transition ${active === r.id ? "bg-brand-primary text-white" : "bg-gray-100 text-mid-gray hover:bg-gray-200"}`}>
            {r.label.slice(0, 16)}
          </button>
        ))}
      </div>
      {active && config.rooms[active] && (
        <div className="space-y-4 border border-light-gray/40 rounded-xl p-4">
          <BilingualEditor label="Ideal Direction" value={config.rooms[active].idealDirection} onChange={(v) => updateRoom(active, { idealDirection: v })} />
          <BilingualEditor label="Facing Direction" value={config.rooms[active].facingDirection} onChange={(v) => updateRoom(active, { facingDirection: v })} />
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Tips (Do's)</label>
            <ListEditor items={config.rooms[active].tips} onChange={(tips) => updateRoom(active, { tips })} />
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Avoid (Don'ts)</label>
            <ListEditor items={config.rooms[active].avoid} onChange={(avoid) => updateRoom(active, { avoid })} />
          </div>
        </div>
      )}
    </div>
  );
}

function DirectionEditor({ config, onChange }: { config: VastuConfig; onChange: (c: VastuConfig) => void }) {
  const [active, setActive] = useState(config.directionOptions[0]?.id || "");
  const updateDir = (key: string, patch: Partial<typeof config.directions[string]>) => {
    onChange({ ...config, directions: { ...config.directions, [key]: { ...config.directions[key], ...patch } } });
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {config.directionOptions.map((d) => (
          <button key={d.id} onClick={() => setActive(d.id)} className={`px-3 py-1.5 rounded text-xs font-semibold transition ${active === d.id ? "bg-brand-primary text-white" : "bg-gray-100 text-mid-gray hover:bg-gray-200"}`}>
            {d.label.slice(0, 16)}
          </button>
        ))}
      </div>
      {active && config.directions[active] && (
        <div className="space-y-4 border border-light-gray/40 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Deity</label>
              <input value={config.directions[active].deity} onChange={(e) => updateDir(active, { deity: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Element</label>
              <input value={config.directions[active].element} onChange={(e) => updateDir(active, { element: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
          </div>
          <BilingualEditor label="Description" value={config.directions[active].description} onChange={(v) => updateDir(active, { description: v })} />
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Recommended (Do's)</label>
            <ListEditor items={config.directions[active].recommended} onChange={(recommended) => updateDir(active, { recommended })} />
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Avoid (Don'ts)</label>
            <ListEditor items={config.directions[active].avoid} onChange={(avoid) => updateDir(active, { avoid })} />
          </div>
        </div>
      )}
    </div>
  );
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function AdminVastuPage() {
  const { vastuConfig, mediaItems, updateVastuConfig } = useAdminStore();
  const [tab, setTab] = useState<Tab>("Hero & Tools");
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (patch: Partial<VastuConfig>) => updateVastuConfig(patch);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const dataUrl = await toBase64(file);
    update({ hero: { ...vastuConfig.hero, bgImage: dataUrl } });
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const selectFromMedia = (url: string) => {
    update({ hero: { ...vastuConfig.hero, bgImage: url } });
    setShowMediaPicker(false);
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brand-dark mb-6">Vastu Shastra</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-light-gray/40">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px ${tab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Hero & Tools" && (
        <div className="max-w-2xl space-y-5 bg-white rounded-xl border border-light-gray/40 p-6">
          <p className="text-sm font-semibold text-brand-secondary">Hero Section</p>

          {/* Image manager */}
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1.5 block">Background Image</label>
            <div className="flex items-start gap-3">
              {vastuConfig.hero.bgImage && (
                <div className="size-20 rounded-lg overflow-hidden border border-light-gray shrink-0">
                  <img src={vastuConfig.hero.bgImage} alt="" className="size-full object-cover" />
                </div>
              )}
              <div className="space-y-1.5 flex-1">
                <div className="flex gap-1.5">
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} hidden />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="h-8 px-3 rounded-lg border border-light-gray/50 text-xs font-semibold text-mid-gray hover:bg-gray-50 flex items-center gap-1.5 transition"
                  >
                    <Upload className="size-3.5" />
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMediaPicker(!showMediaPicker)}
                    className="h-8 px-3 rounded-lg border border-light-gray/50 text-xs font-semibold text-mid-gray hover:bg-gray-50 flex items-center gap-1.5 transition"
                  >
                    <ImageIcon className="size-3.5" />
                    Select from Media
                  </button>
                </div>
                <input
                  value={vastuConfig.hero.bgImage}
                  onChange={(e) => update({ hero: { ...vastuConfig.hero, bgImage: e.target.value } })}
                  placeholder="Or paste image URL..."
                  className="w-full h-8 px-2.5 rounded-md border border-light-gray text-xs"
                />
              </div>
            </div>
            {showMediaPicker && (
              <div className="mt-2 rounded-lg border border-light-gray bg-gray-50 p-2">
                <p className="text-[10px] font-medium text-mid-gray mb-1.5 uppercase">Select existing image</p>
                {mediaItems.length === 0 ? (
                  <p className="text-xs text-mid-gray py-2 text-center">No media items yet.</p>
                ) : (
                  <div className="grid grid-cols-6 gap-1.5 max-h-32 overflow-y-auto">
                    {mediaItems.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => selectFromMedia(m.url)}
                        className={`aspect-video rounded overflow-hidden border-2 transition ${vastuConfig.hero.bgImage === m.url ? "border-brand-primary" : "border-transparent hover:border-gray-300"}`}
                      >
                        <img src={m.url} alt="" className="size-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Badge</label>
              <input value={vastuConfig.hero.badge} onChange={(e) => update({ hero: { ...vastuConfig.hero, badge: e.target.value } })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Title</label>
              <input value={vastuConfig.hero.title} onChange={(e) => update({ hero: { ...vastuConfig.hero, title: e.target.value } })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Subtitle</label>
            <textarea value={vastuConfig.hero.subtitle} onChange={(e) => update({ hero: { ...vastuConfig.hero, subtitle: e.target.value } })} rows={3} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
          </div>
          <div className="pt-4 border-t border-light-gray/40">
            <p className="text-sm font-semibold text-brand-secondary mb-3">Quick Tools</p>
            <div className="grid grid-cols-2 gap-3">
              {(["badge", "title", "description", "roomToolTitle", "roomToolDesc", "directionToolTitle", "directionToolDesc"] as const).map((f) => (
                <div key={f} className={f === "description" ? "col-span-2" : ""}>
                  <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                  {f === "description" ? (
                    <textarea value={vastuConfig.quickTools[f]} onChange={(e) => update({ quickTools: { ...vastuConfig.quickTools, [f]: e.target.value } })} rows={2} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
                  ) : (
                    <input value={vastuConfig.quickTools[f]} onChange={(e) => update({ quickTools: { ...vastuConfig.quickTools, [f]: e.target.value } })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "Sections" && (
        <div className="bg-white rounded-xl border border-light-gray/40 p-6">
          <SectionEditor config={vastuConfig} onChange={update} />
        </div>
      )}

      {tab === "Rooms" && (
        <div className="bg-white rounded-xl border border-light-gray/40 p-6">
          <RoomEditor config={vastuConfig} onChange={update} />
        </div>
      )}

      {tab === "Directions" && (
        <div className="bg-white rounded-xl border border-light-gray/40 p-6">
          <DirectionEditor config={vastuConfig} onChange={update} />
        </div>
      )}
    </div>
  );
}
