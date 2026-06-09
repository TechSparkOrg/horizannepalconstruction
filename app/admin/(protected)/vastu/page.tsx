"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useAdminStore } from "@/stores/admin-store";
import { VastuService } from "@/api/services/vastu.service";
import { toBase64 } from "@/lib/utils";
import type { VastuConfig, VastuBilingualText } from "@/stores/admin-types";

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
  const safe = items ?? [];
  const add = () => onChange([...safe, { en: "", np: "" }]);
  const remove = (i: number) => onChange(safe.filter((_, idx) => idx !== i));
  const update = (i: number, v: VastuBilingualText) => {
    const next = [...safe];
    next[i] = v;
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {safe.map((item, i) => (
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
  const keys = config.section_keys || [];
  const [active, setActive] = useState<string>(keys[0] || "");
  const [showAdd, setShowAdd] = useState(false);
  const [newKey, setNewKey] = useState("");
  const section = active ? config.sections?.[active] : null;
  const updateSection = (key: string, patch: Partial<typeof config.sections[string]>) => {
    onChange({ ...config, sections: { ...config.sections, [key]: { ...config.sections[key], ...patch } } });
  };
  const addSection = () => {
    const key = newKey.trim().toLowerCase().replace(/\s+/g, "-");
    if (!key || config.sections?.[key]) return;
    onChange({ ...config, section_keys: [...keys, key], sections: { ...config.sections, [key]: { title: "", titleNp: "", content: [], customTopics: [] } } });
    setActive(key);
    setNewKey("");
    setShowAdd(false);
  };
  return (
    <div className="space-y-4">
      {keys.length === 0 && (
        <p className="text-xs text-mid-gray py-4 text-center">No sections found.</p>
      )}
      {keys.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {keys.map((key) => (
            <button key={key} onClick={() => setActive(key)} className={`px-3 py-1.5 rounded text-xs font-semibold transition ${active === key ? "bg-brand-primary text-white" : "bg-gray-100 text-mid-gray hover:bg-gray-200"}`}>
              {config.sections?.[key]?.title?.slice(0, 18) || key}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 mt-3 mb-2">
        {showAdd ? (
          <div className="flex items-center gap-1.5">
            <input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="Section key (e.g. introduction)" className="h-8 w-56 px-2.5 rounded border border-light-gray text-xs" onKeyDown={(e) => e.key === "Enter" && addSection()} />
            <button onClick={addSection} className="h-7 px-2.5 rounded bg-brand-primary text-white text-xs font-semibold">Add</button>
            <button onClick={() => { setShowAdd(false); setNewKey(""); }} className="h-7 px-2.5 rounded border border-light-gray text-xs text-mid-gray">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setShowAdd(true)} className="text-xs text-brand-primary font-semibold hover:underline">+ Add Section</button>
        )}
        {active && (
          <button
            onClick={() => {
              const nextKeys = keys.filter((k) => k !== active);
              const { [active]: _, ...restSections } = config.sections || {};
              onChange({ ...config, section_keys: nextKeys, sections: restSections });
              setActive(nextKeys[0] || "");
            }}
            className="text-xs text-red-400 hover:text-red-600 font-semibold hover:underline"
          >
            Remove "{active}"
          </button>
        )}
      </div>
      {section && (
        <div className="space-y-4 border border-light-gray/40 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Title (EN)</label>
              <input value={section.title || ""} onChange={(e) => updateSection(active, { title: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Title (NP)</label>
              <input value={section.titleNp || ""} onChange={(e) => updateSection(active, { titleNp: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Content paragraphs</label>
            <ListEditor items={section.content || []} onChange={(content) => updateSection(active, { content })} />
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Custom topics</label>
            {(section.customTopics || []).map((topic, ti) => (
              <div key={ti} className="border border-light-gray/30 rounded-lg p-3 mb-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input value={topic.title} onChange={(e) => {
                    const customTopics = [...(section.customTopics || [])];
                    customTopics[ti] = { ...customTopics[ti], title: e.target.value };
                    updateSection(active, { customTopics });
                  }} placeholder="Topic title (EN)" className="h-8 px-2 rounded border border-light-gray text-xs" />
                  <input value={topic.titleNp} onChange={(e) => {
                    const customTopics = [...(section.customTopics || [])];
                    customTopics[ti] = { ...customTopics[ti], titleNp: e.target.value };
                    updateSection(active, { customTopics });
                  }} placeholder="Topic title (NP)" className="h-8 px-2 rounded border border-light-gray text-xs" />
                </div>
                <ListEditor items={topic.items} onChange={(items) => {
                  const customTopics = [...(section.customTopics || [])];
                  customTopics[ti] = { ...customTopics[ti], items };
                  updateSection(active, { customTopics });
                }} />
                <button onClick={() => {
                  const customTopics = (section.customTopics || []).filter((_, i) => i !== ti);
                  updateSection(active, { customTopics });
                }} className="text-xs text-red-400 hover:text-red-600">Remove topic</button>
              </div>
            ))}
            <button onClick={() => {
              updateSection(active, { customTopics: [...(section.customTopics || []), { title: "", titleNp: "", items: [] }] });
            }} className="text-xs text-brand-primary font-semibold hover:underline">+ Add topic</button>
          </div>
        </div>
      )}
    </div>
  );
}

function RoomEditor({ config, onChange }: { config: VastuConfig; onChange: (c: VastuConfig) => void }) {
  const roomOptions = config.room_options || [];
  const [active, setActive] = useState(roomOptions[0]?.id || "");
  const [showAdd, setShowAdd] = useState(false);
  const [newId, setNewId] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newLabelNp, setNewLabelNp] = useState("");
  const room = active ? config.rooms?.[active] : null;
  const updateRoom = (key: string, patch: Partial<typeof config.rooms[string]>) => {
    onChange({ ...config, rooms: { ...config.rooms, [key]: { ...config.rooms[key], ...patch } } });
  };
  const addRoom = () => {
    const id = newId.trim().toLowerCase().replace(/\s+/g, "-");
    if (!id || config.rooms?.[id]) return;
    const label = newLabel.trim() || id;
    const labelNp = newLabelNp.trim() || id;
    onChange({ ...config, room_options: [...roomOptions, { id, label, labelNp }], rooms: { ...config.rooms, [id]: { idealDirection: { en: "", np: "" }, facingDirection: { en: "", np: "" }, tips: [], avoid: [] } } });
    setActive(id);
    setNewId(""); setNewLabel(""); setNewLabelNp(""); setShowAdd(false);
  };
  return (
    <div className="space-y-4">
      {roomOptions.length === 0 && (
        <p className="text-xs text-mid-gray py-4 text-center">No rooms configured.</p>
      )}
      {roomOptions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {roomOptions.map((r) => (
            <button key={r.id} onClick={() => setActive(r.id)} className={`px-3 py-1.5 rounded text-xs font-semibold transition ${active === r.id ? "bg-brand-primary text-white" : "bg-gray-100 text-mid-gray hover:bg-gray-200"}`}>
              {r.label?.slice(0, 16) || r.id}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 mt-3 mb-2">
        {showAdd ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <input value={newId} onChange={(e) => setNewId(e.target.value)} placeholder="ID (e.g. kitchen)" className="h-8 w-32 px-2 rounded border border-light-gray text-xs" onKeyDown={(e) => e.key === "Enter" && addRoom()} />
            <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Label (EN)" className="h-8 w-32 px-2 rounded border border-light-gray text-xs" onKeyDown={(e) => e.key === "Enter" && addRoom()} />
            <input value={newLabelNp} onChange={(e) => setNewLabelNp(e.target.value)} placeholder="Label (NP)" className="h-8 w-32 px-2 rounded border border-light-gray text-xs" onKeyDown={(e) => e.key === "Enter" && addRoom()} />
            <button onClick={addRoom} className="h-7 px-2.5 rounded bg-brand-primary text-white text-xs font-semibold">Add</button>
            <button onClick={() => { setShowAdd(false); setNewId(""); setNewLabel(""); setNewLabelNp(""); }} className="h-7 px-2.5 rounded border border-light-gray text-xs text-mid-gray">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setShowAdd(true)} className="text-xs text-brand-primary font-semibold hover:underline">+ Add Room</button>
        )}
        {active && (
          <button
            onClick={() => {
              const nextOptions = roomOptions.filter((r) => r.id !== active);
              const { [active]: _, ...restRooms } = config.rooms || {};
              onChange({ ...config, room_options: nextOptions, rooms: restRooms });
              setActive(nextOptions[0]?.id || "");
            }}
            className="text-xs text-red-400 hover:text-red-600 font-semibold hover:underline"
          >
            Remove "{active}"
          </button>
        )}
      </div>
      {room && (
        <div className="space-y-4 border border-light-gray/40 rounded-xl p-4">
          <BilingualEditor label="Ideal Direction" value={room.idealDirection || { en: "", np: "" }} onChange={(v) => updateRoom(active, { idealDirection: v })} />
          <BilingualEditor label="Facing Direction" value={room.facingDirection || { en: "", np: "" }} onChange={(v) => updateRoom(active, { facingDirection: v })} />
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Tips (Do's)</label>
            <ListEditor items={room.tips || []} onChange={(tips) => updateRoom(active, { tips })} />
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Avoid (Don'ts)</label>
            <ListEditor items={room.avoid || []} onChange={(avoid) => updateRoom(active, { avoid })} />
          </div>
        </div>
      )}
    </div>
  );
}

function DirectionEditor({ config, onChange }: { config: VastuConfig; onChange: (c: VastuConfig) => void }) {
  const directionOptions = config.direction_options || [];
  const [active, setActive] = useState(directionOptions[0]?.id || "");
  const [showAdd, setShowAdd] = useState(false);
  const [newId, setNewId] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const direction = active ? config.directions?.[active] : null;
  const updateDir = (key: string, patch: Partial<typeof config.directions[string]>) => {
    onChange({ ...config, directions: { ...config.directions, [key]: { ...config.directions[key], ...patch } } });
  };
  const addDirection = () => {
    const id = newId.trim().toLowerCase().replace(/\s+/g, "-");
    if (!id || config.directions?.[id]) return;
    const label = newLabel.trim() || id;
    const subtitle = newSubtitle.trim() || "";
    onChange({ ...config, direction_options: [...directionOptions, { id, label, subtitle }], directions: { ...config.directions, [id]: { deity: "", element: "", description: { en: "", np: "" }, recommended: [], avoid: [] } } });
    setActive(id);
    setNewId(""); setNewLabel(""); setNewSubtitle(""); setShowAdd(false);
  };
  return (
    <div className="space-y-4">
      {directionOptions.length === 0 && (
        <p className="text-xs text-mid-gray py-4 text-center">No directions configured.</p>
      )}
      {directionOptions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {directionOptions.map((d) => (
            <button key={d.id} onClick={() => setActive(d.id)} className={`px-3 py-1.5 rounded text-xs font-semibold transition ${active === d.id ? "bg-brand-primary text-white" : "bg-gray-100 text-mid-gray hover:bg-gray-200"}`}>
              {d.label?.slice(0, 16) || d.id}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 mt-3 mb-2">
        {showAdd ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <input value={newId} onChange={(e) => setNewId(e.target.value)} placeholder="ID (e.g. north)" className="h-8 w-28 px-2 rounded border border-light-gray text-xs" onKeyDown={(e) => e.key === "Enter" && addDirection()} />
            <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Label (EN)" className="h-8 w-28 px-2 rounded border border-light-gray text-xs" onKeyDown={(e) => e.key === "Enter" && addDirection()} />
            <input value={newSubtitle} onChange={(e) => setNewSubtitle(e.target.value)} placeholder="Subtitle" className="h-8 w-28 px-2 rounded border border-light-gray text-xs" onKeyDown={(e) => e.key === "Enter" && addDirection()} />
            <button onClick={addDirection} className="h-7 px-2.5 rounded bg-brand-primary text-white text-xs font-semibold">Add</button>
            <button onClick={() => { setShowAdd(false); setNewId(""); setNewLabel(""); setNewSubtitle(""); }} className="h-7 px-2.5 rounded border border-light-gray text-xs text-mid-gray">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setShowAdd(true)} className="text-xs text-brand-primary font-semibold hover:underline">+ Add Direction</button>
        )}
        {active && (
          <button
            onClick={() => {
              const nextOptions = directionOptions.filter((d) => d.id !== active);
              const { [active]: _, ...restDirections } = config.directions || {};
              onChange({ ...config, direction_options: nextOptions, directions: restDirections });
              setActive(nextOptions[0]?.id || "");
            }}
            className="text-xs text-red-400 hover:text-red-600 font-semibold hover:underline"
          >
            Remove "{active}"
          </button>
        )}
      </div>
      {direction && (
        <div className="space-y-4 border border-light-gray/40 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Deity</label>
              <input value={direction.deity || ""} onChange={(e) => updateDir(active, { deity: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Element</label>
              <input value={direction.element || ""} onChange={(e) => updateDir(active, { element: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
          </div>
          <BilingualEditor label="Description" value={direction.description || { en: "", np: "" }} onChange={(v) => updateDir(active, { description: v })} />
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Recommended (Do's)</label>
            <ListEditor items={direction.recommended || []} onChange={(recommended) => updateDir(active, { recommended })} />
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Avoid (Don'ts)</label>
            <ListEditor items={direction.avoid || []} onChange={(avoid) => updateDir(active, { avoid })} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminVastuPage() {
  const { mediaItems } = useAdminStore(useShallow((s) => ({ mediaItems: s.mediaItems })));
  const [vastuConfig, setVastuConfig] = useState<VastuConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<Tab>("Hero & Tools");
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    VastuService.getPublic()
      .then((data) => {
        if (!data.section_keys?.length && data.sections) {
          data.section_keys = Object.keys(data.sections);
        }
        if (!data.room_options?.length && data.rooms) {
          data.room_options = Object.keys(data.rooms).map((id) => ({
            id,
            label: data.rooms[id]?.idealDirection?.en?.slice(0, 20) || id,
            labelNp: data.rooms[id]?.idealDirection?.np?.slice(0, 20) || id,
          }));
        }
        if (!data.direction_options?.length && data.directions) {
          data.direction_options = Object.keys(data.directions).map((id) => ({
            id,
            label: data.directions[id]?.deity || id,
            subtitle: data.directions[id]?.element || "",
          }));
        }
        setVastuConfig(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (patch: Partial<VastuConfig>) => {
    setVastuConfig((prev) => prev ? { ...prev, ...patch } : prev);
  };

  const handleSave = async () => {
    if (!vastuConfig) return;
    setSaving(true);
    try {
      const updated = await VastuService.update(vastuConfig);
      setVastuConfig(updated);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !vastuConfig) return;
    setUploading(true);
    const dataUrl = await toBase64(file);
    update({ hero: { ...(vastuConfig.hero || { title: "", subtitle: "", badge: "", bgImage: "" }), bgImage: dataUrl } });
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const selectFromMedia = (url: string) => {
    if (!vastuConfig) return;
    update({ hero: { ...vastuConfig.hero, bgImage: url } });
    setShowMediaPicker(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-mid-gray" />
      </div>
    );
  }

  if (!vastuConfig) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-mid-gray">Failed to load vastu config.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Vastu Shastra</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-60 inline-flex items-center gap-2"
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

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

          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1.5 block">Background Image</label>
            <div className="flex items-start gap-3">
              {vastuConfig.hero?.bgImage && (
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
                  value={vastuConfig.hero?.bgImage || ""}
                  onChange={(e) => update({ hero: { ...(vastuConfig.hero || { title: "", subtitle: "", badge: "", bgImage: "" }), bgImage: e.target.value } })}
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
                        className={`aspect-video rounded overflow-hidden border-2 transition ${vastuConfig.hero?.bgImage === m.url ? "border-brand-primary" : "border-transparent hover:border-gray-300"}`}
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
              <input value={vastuConfig.hero?.badge || ""} onChange={(e) => update({ hero: { ...(vastuConfig.hero || { title: "", subtitle: "", badge: "", bgImage: "" }), badge: e.target.value } })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Title</label>
              <input value={vastuConfig.hero?.title || ""} onChange={(e) => update({ hero: { ...(vastuConfig.hero || { title: "", subtitle: "", badge: "", bgImage: "" }), title: e.target.value } })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Subtitle</label>
            <textarea value={vastuConfig.hero?.subtitle || ""} onChange={(e) => update({ hero: { ...(vastuConfig.hero || { title: "", subtitle: "", badge: "", bgImage: "" }), subtitle: e.target.value } })} rows={3} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
          </div>
          <div className="pt-4 border-t border-light-gray/40">
            <p className="text-sm font-semibold text-brand-secondary mb-3">Quick Tools</p>
            <div className="grid grid-cols-2 gap-3">
              {(["badge", "title", "description", "roomToolTitle", "roomToolDesc", "directionToolTitle", "directionToolDesc"] as const).map((f) => (
                <div key={f} className={f === "description" ? "col-span-2" : ""}>
                  <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                  {f === "description" ? (
                    <textarea value={vastuConfig.quick_tools?.[f] || ""} onChange={(e) => update({ quick_tools: { ...(vastuConfig.quick_tools || {} as any), [f]: e.target.value } })} rows={2} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
                  ) : (
                    <input value={vastuConfig.quick_tools?.[f] || ""} onChange={(e) => update({ quick_tools: { ...(vastuConfig.quick_tools || {} as any), [f]: e.target.value } })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "Sections" && (
        <div className="bg-white rounded-xl border border-light-gray/40 p-6">
          <SectionEditor config={vastuConfig} onChange={setVastuConfig} />
        </div>
      )}

      {tab === "Rooms" && (
        <div className="bg-white rounded-xl border border-light-gray/40 p-6">
          <RoomEditor config={vastuConfig} onChange={setVastuConfig} />
        </div>
      )}

      {tab === "Directions" && (
        <div className="bg-white rounded-xl border border-light-gray/40 p-6">
          <DirectionEditor config={vastuConfig} onChange={setVastuConfig} />
        </div>
      )}
    </div>
  );
}
