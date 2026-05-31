"use client";

import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, ExternalLink, Upload, ImageIcon, Star, FolderOpen, X, Eye } from "lucide-react";
import { useAdminStore, type MediaItem } from "@/stores/admin-store";

function genId() {
  return crypto.randomUUID();
}

const MAX_WORDS = 50;

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

type MediaTab = "images" | "banners";

interface BatchImage {
  file?: File;
  url: string;
  alt: string;
  metaTitle: string;
  description: string;
  keywords: string;
}

export default function AdminMediaPage() {
  const { mediaItems, addMediaItem, updateMediaItem, deleteMediaItem } = useAdminStore();
  const [tab, setTab] = useState<MediaTab>("images");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const batchRef = useRef<HTMLInputElement>(null);

  const isBannerTab = tab === "banners";
  const scopedItems = mediaItems.filter((m) => m.banner === isBannerTab);

  // Banner batch state
  const [batchTitle, setBatchTitle] = useState("");
  const [batchSlug, setBatchSlug] = useState("");
  const [batchImages, setBatchImages] = useState<BatchImage[]>([]);

  const emptyForm = (banner: boolean): MediaItem => ({
    id: "", url: "", alt: "", metaTitle: "", description: "", keywords: "", projectLink: "", banner, groupTitle: "", customFields: [],
  });

  const [form, setForm] = useState<MediaItem>(emptyForm(false));

  const resetForm = () => {
    setForm(emptyForm(isBannerTab));
    setBatchTitle("");
    setBatchSlug("");
    setBatchImages([]);
  };

  const startEdit = (item: MediaItem) => {
    setForm({ ...item, customFields: [...item.customFields] });
    setEditingId(item.id);
    setSelectedId(null);
  };

  const startNew = () => {
    resetForm();
    setEditingId(null);
    setSelectedId(null);
  };

  const save = () => {
    if (!form.url.trim()) return;
    if (editingId) {
      updateMediaItem(editingId, form);
    } else {
      addMediaItem({ ...form, id: genId() });
    }
    resetForm();
    setEditingId(null);
  };

  const saveBannerBatch = () => {
    if (!batchSlug.trim() || batchImages.length === 0) return;
    for (const img of batchImages) {
      if (!img.url.trim()) continue;
      addMediaItem({
        id: genId(),
        url: img.url,
        alt: img.alt,
        metaTitle: img.metaTitle,
        description: img.description,
        keywords: img.keywords,
        projectLink: batchSlug,
        banner: true,
        groupTitle: batchTitle,
        customFields: [],
      });
    }
    resetForm();
    setEditingId(null);
  };

  const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const dataUrl = await toBase64(file);
    setForm({ ...form, url: dataUrl });
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const dataUrls = await Promise.all(Array.from(files).map(toBase64));
    const newItems: BatchImage[] = dataUrls.map((url) => ({
      url, alt: "", metaTitle: "", description: "", keywords: "",
    }));
    setBatchImages((prev) => [...prev, ...newItems]);
    setUploading(false);
    if (batchRef.current) batchRef.current.value = "";
  };

  const removeBatchImage = (i: number) =>
    setBatchImages((prev) => prev.filter((_, j) => j !== i));

  const updateBatchImage = (i: number, field: keyof BatchImage, value: string) =>
    setBatchImages((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });

  const pickExisting = (item: MediaItem) => {
    setForm({ ...form, url: item.url });
    setShowPicker(false);
  };

  const switchTab = (t: MediaTab) => {
    setTab(t);
    setEditingId(null);
    setSelectedId(null);
    resetForm();
  };

  const addField = () =>
    setForm({ ...form, customFields: [...form.customFields, { key: "", value: "" }] });

  const updateField = (i: number, field: "key" | "value", val: string) => {
    const c = [...form.customFields];
    c[i] = { ...c[i], [field]: val };
    setForm({ ...form, customFields: c });
  };

  const removeField = (i: number) =>
    setForm({ ...form, customFields: form.customFields.filter((_, j) => j !== i) });

  const selected = scopedItems.find((m) => m.id === selectedId);

  // Group banners by slug
  const bannerGroups: Record<string, { title: string; items: MediaItem[] }> = {};
  if (isBannerTab) {
    for (const item of scopedItems) {
      const key = item.projectLink || "(no slug)";
      if (!bannerGroups[key]) bannerGroups[key] = { title: item.groupTitle || key, items: [] };
      bannerGroups[key].items.push(item);
    }
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brand-dark mb-6">Media</h1>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-light-gray mb-6">
        <button
          onClick={() => switchTab("images")}
          className={`px-5 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "images" ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"
          }`}
        >
          <ImageIcon className="size-4 inline mr-1.5 -mt-0.5" />
          Images ({mediaItems.filter((m) => !m.banner).length})
        </button>
        <button
          onClick={() => switchTab("banners")}
          className={`px-5 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "banners" ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"
          }`}
        >
          <Star className="size-4 inline mr-1.5 -mt-0.5" />
          Banners ({mediaItems.filter((m) => m.banner).length})
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-mid-gray">
          {tab === "images" ? "Manage product, gallery and content images" : "Manage banner groups — one slug, multiple images with individual metadata"}
        </p>
        <button onClick={startNew} className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition">
          <Plus className="size-4" /> New {tab === "banners" ? "Banner Group" : "Image"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Grid */}
        <div className="lg:col-span-3">
          {scopedItems.length === 0 ? (
            <p className="text-sm text-mid-gray py-8 text-center bg-white rounded-xl border border-light-gray/40">No {tab} yet.</p>
          ) : isBannerTab ? (
            <div className="space-y-3">
              {Object.entries(bannerGroups).map(([slug, group]) => (
                <div key={slug} className="bg-white rounded-xl border border-light-gray/40 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-light-gray/40 bg-gray-50/50">
                    <FolderOpen className="size-4 text-brand-secondary shrink-0" />
                    <span className="text-sm font-semibold text-brand-dark">{group.title || slug}</span>
                    <span className="text-[11px] text-mid-gray bg-gray-100 px-1.5 py-0.5 rounded">{group.items.length}</span>
                  </div>
                  <div className="flex gap-1.5 p-3 overflow-x-auto">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setSelectedId(item.id); setEditingId(null); }}
                        className={`relative shrink-0 size-20 sm:size-24 rounded-lg overflow-hidden border-2 bg-gray-100 group ${
                          selectedId === item.id ? "border-brand-primary" : "border-transparent"
                        }`}
                      >
                        <img src={item.url} alt={item.alt} className="size-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); setPreviewUrl(item.url); }} className="p-1 rounded bg-white/90 text-brand-dark"><Eye className="size-3" /></button>
                          <button onClick={(e) => { e.stopPropagation(); startEdit(item); }} className="p-1 rounded bg-white/90 text-brand-dark"><Pencil className="size-3" /></button>
                          <button onClick={(e) => { e.stopPropagation(); deleteMediaItem(item.id); }} className="p-1 rounded bg-white/90 text-red-500"><Trash2 className="size-3" /></button>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {scopedItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedId(item.id); setEditingId(null); }}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 bg-gray-100 group ${
                    selectedId === item.id ? "border-brand-primary" : "border-transparent"
                  }`}
                >
                  <img src={item.url} alt={item.alt} className="size-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                    <button onClick={(e) => { e.stopPropagation(); setPreviewUrl(item.url); }} className="p-1.5 rounded-md bg-white/90 text-brand-dark"><Eye className="size-3.5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); startEdit(item); }} className="p-1.5 rounded-md bg-white/90 text-brand-dark"><Pencil className="size-3.5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); deleteMediaItem(item.id); }} className="p-1.5 rounded-md bg-white/90 text-red-500"><Trash2 className="size-3.5" /></button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-[11px] text-white truncate">{item.alt || "No alt text"}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Form / Detail */}
        <div className="lg:col-span-2">
          {/* BANNER: batch form */}
          {isBannerTab && (editingId === null && selectedId === null) && (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">New Banner Group</h2>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Group Title</label>
                  <input value={batchTitle} onChange={(e) => setBatchTitle(e.target.value)} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="e.g. Homepage Hero" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Slug</label>
                  <input value={batchSlug} onChange={(e) => setBatchSlug(e.target.value)} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="e.g. homepage-hero" />
                </div>
              </div>

              {/* Upload box */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Upload Images</label>
                <input ref={batchRef} type="file" accept="image/*" multiple onChange={handleBatchUpload} hidden />
                <button
                  onClick={() => batchRef.current?.click()}
                  disabled={uploading}
                  className="w-full h-24 rounded-lg border-2 border-dashed border-light-gray flex flex-col items-center justify-center gap-1 text-mid-gray hover:border-brand-primary/40 hover:text-brand-primary transition"
                >
                  {uploading ? (
                    <span className="text-sm">Uploading...</span>
                  ) : (
                    <>
                      <Upload className="size-5" />
                      <span className="text-xs font-medium">Click to upload multiple images</span>
                    </>
                  )}
                </button>
              </div>

              {/* Batch image list */}
              {batchImages.length > 0 && (
                <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                  {batchImages.map((img, i) => (
                    <div key={i} className="p-3 rounded-lg bg-gray-50 border border-light-gray/40">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="size-14 shrink-0 rounded overflow-hidden bg-gray-200">
                          <img src={img.url} alt="" className="size-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <input value={img.alt} onChange={(e) => updateBatchImage(i, "alt", e.target.value)} placeholder="Alt text" className="w-full h-8 px-2 rounded border border-light-gray text-xs mb-1" />
                          <input value={img.metaTitle} onChange={(e) => updateBatchImage(i, "metaTitle", e.target.value)} placeholder="Meta title" className="w-full h-8 px-2 rounded border border-light-gray text-xs mb-1" />
                        </div>
                        <button onClick={() => removeBatchImage(i)} className="p-1 text-red-400 hover:text-red-500"><X className="size-3.5" /></button>
                      </div>
                      <textarea value={img.description} onChange={(e) => updateBatchImage(i, "description", e.target.value)} placeholder="Description" rows={1} className="w-full px-2 py-1 rounded border border-light-gray text-xs resize-none mb-1" />
                      <input value={img.keywords} onChange={(e) => updateBatchImage(i, "keywords", e.target.value)} placeholder="Keywords (comma separated)" className="w-full h-8 px-2 rounded border border-light-gray text-xs" />
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={saveBannerBatch}
                disabled={!batchSlug.trim() || batchImages.length === 0}
                className="w-full h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-40"
              >
                Save {batchImages.length} Banner{batchImages.length !== 1 ? "s" : ""}
              </button>
            </div>
          )}

          {/* BANNER: editing single */}
          {isBannerTab && editingId !== null && (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">Edit Banner</h2>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Group Title</label>
                  <input value={form.groupTitle} onChange={(e) => setForm({ ...form, groupTitle: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Slug</label>
                  <input value={form.projectLink} onChange={(e) => setForm({ ...form, projectLink: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Image URL</label>
                  <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                {form.url && (
                  <div className="aspect-[21/9] rounded-lg overflow-hidden bg-gray-100 border border-light-gray">
                    <img src={form.url} alt="" className="size-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Alt Text</label>
                  <input value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Meta Title</label>
                  <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Keywords</label>
                  <input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={save} className="flex-1 h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition">Update</button>
                <button onClick={() => { resetForm(); setEditingId(null); }} className="h-10 px-5 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition">Cancel</button>
              </div>
            </div>
          )}

          {/* IMAGES: standard form */}
          {!isBannerTab && (editingId !== null || selectedId === null) && (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">{editingId ? "Edit Image" : "New Image"}</h2>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Image</label>
                  <div className="flex gap-2">
                    <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="flex-1 h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="Paste URL" />
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleSingleUpload} hidden />
                    <button onClick={() => fileRef.current?.click()} disabled={uploading} className="h-10 px-3 rounded-md border border-light-gray text-mid-gray hover:bg-gray-50 text-sm shrink-0">
                      {uploading ? "..." : <Upload className="size-4" />}
                    </button>
                    <button onClick={() => setShowPicker(!showPicker)} className="h-10 px-3 rounded-md border border-light-gray text-mid-gray hover:bg-gray-50 text-sm shrink-0">
                      <ImageIcon className="size-4" />
                    </button>
                  </div>
                  {showPicker && (
                    <div className="mt-2 rounded-lg border border-light-gray bg-gray-50 p-2">
                      <p className="text-[10px] font-medium text-mid-gray mb-1.5 uppercase">Select existing</p>
                      <div className="grid grid-cols-4 gap-1.5 max-h-28 overflow-y-auto">
                        {scopedItems.map((item) => (
                          <button key={item.id} onClick={() => pickExisting(item)} className={`aspect-video rounded overflow-hidden border-2 ${form.url === item.url ? "border-brand-primary" : "border-transparent"}`}>
                            <img src={item.url} alt="" className="size-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {form.url && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border border-light-gray">
                    <img src={form.url} alt="" className="size-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Alt Text</label>
                  <input value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Meta Title</label>
                  <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">
                    Description <span className="font-normal text-mid-gray">({wordCount(form.description)}/{MAX_WORDS} words)</span>
                  </label>
                  <textarea value={form.description} onChange={(e) => {
                    const words = e.target.value.trim() ? e.target.value.trim().split(/\s+/) : [];
                    if (words.length <= MAX_WORDS) setForm({ ...form, description: e.target.value });
                  }} rows={3} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Keywords</label>
                  <input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="keyword1, keyword2" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Project Link</label>
                  <input value={form.projectLink} onChange={(e) => setForm({ ...form, projectLink: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="/project-details/slug" />
                </div>
              </div>

              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-brand-dark">Custom Fields</h3>
                  <button onClick={addField} className="text-xs text-brand-primary font-semibold hover:underline">+ Add Field</button>
                </div>
                {form.customFields.length === 0 && <p className="text-xs text-mid-gray">None.</p>}
                {form.customFields.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={f.key} onChange={(e) => updateField(i, "key", e.target.value)} placeholder="Key" className="flex-1 h-9 px-3 rounded-md border border-light-gray text-sm" />
                    <input value={f.value} onChange={(e) => updateField(i, "value", e.target.value)} placeholder="Value" className="flex-1 h-9 px-3 rounded-md border border-light-gray text-sm" />
                    <button onClick={() => removeField(i)} className="px-2 text-xs text-red-400 hover:text-red-500">✕</button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={save} className="flex-1 h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition">
                  {editingId ? "Update" : "Create"}
                </button>
                {editingId && (
                  <button onClick={() => { resetForm(); setEditingId(null); }} className="h-10 px-5 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Detail view */}
          {selected && (editingId === null) && (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">Details</h2>
              <div className={`rounded-lg overflow-hidden bg-gray-100 border border-light-gray mb-4 ${isBannerTab ? "aspect-[21/9]" : "aspect-video"}`}>
                <img src={selected.url} alt={selected.alt} className="size-full object-cover" />
              </div>
              {isBannerTab && (
                <div className="flex gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] bg-brand-secondary/10 text-brand-secondary font-semibold px-2 py-0.5 rounded"><FolderOpen className="size-3" /> {selected.groupTitle || selected.projectLink}</span>
                  <span className="text-[11px] text-mid-gray">/ {selected.projectLink}</span>
                </div>
              )}
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[11px] uppercase text-mid-gray">Alt</dt><dd className="text-brand-dark">{selected.alt || "—"}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Meta Title</dt><dd className="text-brand-dark">{selected.metaTitle || "—"}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Description</dt><dd className="text-brand-dark">{selected.description || "—"}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Keywords</dt><dd className="text-brand-dark">{selected.keywords || "—"}</dd></div>
                {selected.projectLink && (
                  <div><dt className="text-[11px] uppercase text-mid-gray">Link</dt><dd><a href={selected.projectLink} className="text-brand-primary flex items-center gap-1 hover:underline"><ExternalLink className="size-3" /> {selected.projectLink}</a></dd></div>
                )}
                {selected.customFields.map((f, i) => (
                  <div key={i}><dt className="text-[11px] uppercase text-mid-gray">{f.key}</dt><dd className="text-brand-dark">{f.value}</dd></div>
                ))}
              </dl>
              <button onClick={() => startEdit(selected)} className="mt-4 w-full h-10 rounded-lg border border-brand-primary text-brand-primary text-sm font-semibold hover:bg-brand-primary/5 transition">Edit</button>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setPreviewUrl(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewUrl(null)} className="absolute -top-3 -right-3 size-8 rounded-full bg-white shadow-md flex items-center justify-center text-mid-gray hover:text-brand-dark z-10">
              <X className="size-4" />
            </button>
            <img src={previewUrl} alt="" className="w-full h-full object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
