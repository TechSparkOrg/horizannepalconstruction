"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Pencil, Trash2, ExternalLink, Upload, ImageIcon, Star, FolderOpen, X, Eye, Loader2 } from "lucide-react";
import { MediaService } from "@/api/services/media.service";
import type { MediaItem } from "@/api/types/media.types";

const MAX_WORDS = 50;

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type MediaTab = "images" | "banners";

interface BatchImage {
  file: File;
  url: string;
  alt: string;
  metaTitle: string;
  description: string;
  keywords: string;
}

interface GroupEditItem {
  id: string;
  url: string;
  alt: string;
  meta_title: string;
  description: string;
  keywords: string;
  _deleted?: boolean;
  _new?: boolean;
  _file?: File;
}

interface FormState {
  file: File | null;
  url: string;
  alt: string;
  metaTitle: string;
  description: string;
  keywords: string;
  projectLink: string;
  banner: boolean;
  groupTitle: string;
  customFields: { key: string; value: string }[];
}

const emptyForm = (banner: boolean): FormState => ({
  file: null, url: "", alt: "", metaTitle: "", description: "", keywords: "", projectLink: "", banner, groupTitle: "", customFields: [],
});

function toSnake(f: FormState) {
  return {
    url: f.url,
    alt: f.alt,
    meta_title: f.metaTitle,
    description: f.description,
    keywords: f.keywords,
    project_link: f.projectLink,
    banner: f.banner,
    group_title: f.groupTitle,
    custom_fields: f.customFields,
  };
}

function fromApi(a: MediaItem): FormState {
  return {
    file: null,
    url: a.url,
    alt: a.alt,
    metaTitle: a.meta_title,
    description: a.description,
    keywords: a.keywords,
    projectLink: a.project_link,
    banner: a.banner,
    groupTitle: a.group_title,
    customFields: a.custom_fields ?? [],
  };
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [tab, setTab] = useState<MediaTab>("images");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedGroupSlug, setSelectedGroupSlug] = useState<string | null>(null);
  const [groupEditTitle, setGroupEditTitle] = useState("");
  const [groupEditSlug, setGroupEditSlug] = useState("");
  const [groupEditItems, setGroupEditItems] = useState<GroupEditItem[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const batchRef = useRef<HTMLInputElement>(null);
  const groupEditFileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(emptyForm(false));

  const [batchTitle, setBatchTitle] = useState("");
  const [batchSlug, setBatchSlug] = useState("");
  const [batchImages, setBatchImages] = useState<BatchImage[]>([]);

  useEffect(() => {
    MediaService.list(1).then((res) => {
      setItems(res.results ?? []);
      setPage(1);
      setHasMore(res.next !== null);
      setLoading(false);
    });
  }, []);

  const isBannerTab = tab === "banners";
  const scopedItems = items.filter((m) => m.banner === isBannerTab);
  const selected = scopedItems.find((m) => m.id === selectedId);
  const formPreviewUrl = form.file ? form.url : (form.url || "");

  const revokeBatchUrls = useCallback(() => {
    batchImages.forEach((img) => URL.revokeObjectURL(img.url));
  }, [batchImages]);

  const resetForm = useCallback(() => {
    if (form.file) URL.revokeObjectURL(form.url);
    setForm(emptyForm(isBannerTab));
    setBatchTitle("");
    setBatchSlug("");
    revokeBatchUrls();
    setBatchImages([]);
  }, [form.file, form.url, isBannerTab, revokeBatchUrls]);

  const startEdit = (item: MediaItem) => {
    setForm(fromApi(item));
    setEditingId(item.id);
    setSelectedId(null);
  };

  const startNew = () => {
    resetForm();
    setEditingId(null);
    setSelectedId(null);
    setSelectedGroupSlug(null);
    setGroupEditItems([]);
  };

  const saveGroupEdit = async () => {
    setSaving(true);
    try {
      for (const item of groupEditItems) {
        if (item._deleted && !item._new) {
          await MediaService.delete(item.id);
        }
      }
      for (const item of groupEditItems) {
        if (item._deleted) continue;
        const payload = {
          alt: item.alt,
          meta_title: item.meta_title,
          description: item.description,
          keywords: item.keywords,
          group_title: groupEditTitle,
          project_link: groupEditSlug,
          banner: true,
        };
        if (item._new && item._file) {
          await MediaService.uploadImage(item._file, payload);
        } else {
          await MediaService.update(item.id, payload);
        }
      }
      groupEditItems.forEach((item) => { if (item._new) URL.revokeObjectURL(item.url); });
      const res = await MediaService.list(1);
      setItems(res.results ?? []);
      setPage(1);
      setHasMore(res.next !== null);
      setSelectedGroupSlug(null);
      setGroupEditItems([]);
    } finally {
      setSaving(false);
    }
  };

  const create = async () => {
    if (!form.file && !form.url.trim()) return;
    setSaving(true);
    try {
      const created = form.file
        ? await MediaService.uploadImage(form.file, toSnake(form))
        : await MediaService.create(toSnake(form));
      setItems((prev) => [...prev, created]);
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const saveEdit = async () => {
    if (!editingId || (!form.url.trim() && !form.file)) return;
    setSaving(true);
    try {
      let url = form.url;
      if (form.file) {
        const uploaded = await MediaService.uploadImage(form.file, { alt: form.alt, banner: form.banner });
        url = uploaded.url;
      }
      const updated = await MediaService.update(editingId, { ...toSnake(form), url });
      setItems((prev) => prev.map((m) => (m.id === editingId ? updated : m)));
      resetForm();
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const saveBannerBatch = async () => {
    if (!batchSlug.trim() || batchImages.length === 0) return;
    setSaving(true);
    try {
      for (const img of batchImages) {
        await MediaService.uploadImage(img.file, {
          alt: img.alt,
          meta_title: img.metaTitle,
          description: img.description,
          keywords: img.keywords,
          project_link: batchSlug,
          banner: true,
          group_title: batchTitle,
        });
      }
      const res = await MediaService.list(1);
      setItems(res.results ?? []);
      setPage(1);
      setHasMore(res.next !== null);
      revokeBatchUrls();
      resetForm();
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (form.file) URL.revokeObjectURL(form.url);
    setForm({ ...form, file, url: URL.createObjectURL(file) });
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleBatchPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newItems: BatchImage[] = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      alt: "", metaTitle: "", description: "", keywords: "",
    }));
    setBatchImages((prev) => [...prev, ...newItems]);
    if (batchRef.current) batchRef.current.value = "";
  };

  const handleGroupEditFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newItems: GroupEditItem[] = Array.from(files).map((file, i) => ({
      id: `_new_${Date.now()}_${i}`,
      url: URL.createObjectURL(file),
      alt: "", meta_title: "", description: "", keywords: "",
      _new: true,
      _file: file,
      _deleted: false,
    }));
    setGroupEditItems((prev) => [...prev, ...newItems]);
    if (groupEditFileRef.current) groupEditFileRef.current.value = "";
  };

  const remove = async (id: string) => {
    await MediaService.delete(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const removeBatchImage = (i: number) => {
    URL.revokeObjectURL(batchImages[i].url);
    setBatchImages((prev) => prev.filter((_, j) => j !== i));
  };

  const updateBatchImage = (i: number, field: keyof BatchImage, value: string) =>
    setBatchImages((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });

  const startGroupEdit = (slug: string) => {
    const group = bannerGroups[slug];
    if (!group) return;
    setSelectedGroupSlug(slug);
    setSelectedId(null);
    setEditingId(null);
    setGroupEditTitle(group.title);
    setGroupEditSlug(slug);
    setGroupEditItems(group.items.map((item) => ({ ...item, _deleted: false })));
  };

  const switchTab = (t: MediaTab) => {
    setTab(t);
    setEditingId(null);
    setSelectedId(null);
    setSelectedGroupSlug(null);
    setGroupEditItems([]);
    setPage(1);
    setHasMore(false);
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

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const res = await MediaService.list(page + 1);
      setItems((prev) => [...prev, ...(res.results ?? [])]);
      setPage((prev) => prev + 1);
      setHasMore(res.next !== null);
    } finally {
      setLoadingMore(false);
    }
  };

  const bannerGroups: Record<string, { title: string; items: MediaItem[] }> = {};
  if (isBannerTab) {
    for (const item of scopedItems) {
      const key = item.project_link || "(no slug)";
      if (!bannerGroups[key]) bannerGroups[key] = { title: item.group_title || key, items: [] };
      bannerGroups[key].items.push(item);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-mid-gray" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brand-dark mb-6">Media</h1>

      <div className="flex gap-1 border-b border-light-gray mb-6">
        <button
          onClick={() => switchTab("images")}
          className={`px-5 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "images" ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"
          }`}
        >
          <ImageIcon className="size-4 inline mr-1.5 -mt-0.5" />
          Images ({items.filter((m) => !m.banner).length})
        </button>
        <button
          onClick={() => switchTab("banners")}
          className={`px-5 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "banners" ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"
          }`}
        >
          <Star className="size-4 inline mr-1.5 -mt-0.5" />
          Banners ({items.filter((m) => m.banner).length})
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-mid-gray">
          {tab === "images" ? "Manage images" : "Manage banner groups"}
        </p>
        <button onClick={startNew} className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition">
          <Plus className="size-4" /> New {tab === "banners" ? "Banner Group" : "Image"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
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
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => { startGroupEdit(slug); }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startGroupEdit(slug); } }}
                        className={`relative shrink-0 size-20 sm:size-24 rounded-lg overflow-hidden border-2 bg-gray-100 group cursor-pointer ${
                          selectedGroupSlug === slug ? "border-brand-primary" : "border-transparent"
                        }`}
                      >
                        <img src={item.url} alt={item.alt} className="size-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); setPreviewUrl(item.url); }} className="p-1 rounded bg-white/90 text-brand-dark"><Eye className="size-3" /></button>
                          <button onClick={(e) => { e.stopPropagation(); startGroupEdit(slug); }} className="p-1 rounded bg-white/90 text-brand-dark"><Pencil className="size-3" /></button>
                          <button onClick={(e) => { e.stopPropagation(); remove(item.id); }} className="p-1 rounded bg-white/90 text-red-500"><Trash2 className="size-3" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {scopedItems.map((item) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => { setSelectedId(item.id); setEditingId(null); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(item.id); setEditingId(null); } }}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 bg-gray-100 group cursor-pointer ${
                    selectedId === item.id ? "border-brand-primary" : "border-transparent"
                  }`}
                >
                  <img src={item.url} alt={item.alt} className="size-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                    <button onClick={(e) => { e.stopPropagation(); setPreviewUrl(item.url); }} className="p-1.5 rounded-md bg-white/90 text-brand-dark"><Eye className="size-3.5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); startEdit(item); }} className="p-1.5 rounded-md bg-white/90 text-brand-dark"><Pencil className="size-3.5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); remove(item.id); }} className="p-1.5 rounded-md bg-white/90 text-red-500"><Trash2 className="size-3.5" /></button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-[11px] text-white truncate">{item.alt || "No alt text"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center pt-2 pb-4">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="h-10 px-6 rounded-lg border border-light-gray text-sm font-medium text-mid-gray hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center gap-2"
              >
                {loadingMore ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {isBannerTab && selectedGroupSlug === null && editingId === null && selectedId === null && (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">New Banner Group</h2>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Group Title</label>
                  <input
                    value={batchTitle}
                    onChange={(e) => { setBatchTitle(e.target.value); setBatchSlug(toSlug(e.target.value)); }}
                    className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
                    placeholder="e.g. Homepage Hero"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Slug</label>
                  <div className="w-full h-10 px-3 rounded-md border border-light-gray text-sm flex items-center text-mid-gray bg-gray-50">
                    {batchSlug || <span className="italic text-mid-gray/50">auto-generated</span>}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Upload Images</label>
                <input ref={batchRef} type="file" accept="image/*" multiple onChange={handleBatchPick} hidden />
                <button
                  onClick={() => batchRef.current?.click()}
                  className="w-full h-24 rounded-lg border-2 border-dashed border-light-gray flex flex-col items-center justify-center gap-1 text-mid-gray hover:border-brand-primary/40 hover:text-brand-primary transition"
                >
                  <Upload className="size-5" />
                  <span className="text-xs font-medium">Click to select multiple images</span>
                </button>
              </div>

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
                disabled={!batchSlug.trim() || batchImages.length === 0 || saving}
                className="w-full h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-40 inline-flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                {saving ? "Uploading..." : `Save ${batchImages.length} Banner${batchImages.length !== 1 ? "s" : ""}`}
              </button>
            </div>
          )}

          {isBannerTab && selectedGroupSlug !== null && (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">Edit Banner Group</h2>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Group Title</label>
                  <input
                    value={groupEditTitle}
                    onChange={(e) => setGroupEditTitle(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Slug</label>
                  <input
                    value={groupEditSlug}
                    onChange={(e) => setGroupEditSlug(toSlug(e.target.value))}
                    className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Add Images</label>
                <input ref={groupEditFileRef} type="file" accept="image/*" multiple onChange={handleGroupEditFilePick} hidden />
                <button
                  onClick={() => groupEditFileRef.current?.click()}
                  className="w-full h-20 rounded-lg border-2 border-dashed border-light-gray flex flex-col items-center justify-center gap-1 text-mid-gray hover:border-brand-primary/40 hover:text-brand-primary transition"
                >
                  <Upload className="size-5" />
                  <span className="text-xs font-medium">Click to add more images</span>
                </button>
              </div>

              {groupEditItems.filter((item) => !item._deleted).length === 0 ? (
                <p className="text-sm text-mid-gray py-4 text-center">No images in this group.</p>
              ) : (
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {groupEditItems.map((item) =>
                    item._deleted ? null : (
                      <div key={item.id} className="p-3 rounded-lg bg-gray-50 border border-light-gray/40">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="size-14 shrink-0 rounded overflow-hidden bg-gray-200">
                            <img src={item.url} alt="" className="size-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <input
                              value={item.alt}
                              onChange={(e) =>
                                setGroupEditItems((prev) =>
                                  prev.map((x) => (x.id === item.id ? { ...x, alt: e.target.value } : x))
                                )
                              }
                              placeholder="Alt text"
                              className="w-full h-8 px-2 rounded border border-light-gray text-xs mb-1"
                            />
                            <input
                              value={item.meta_title}
                              onChange={(e) =>
                                setGroupEditItems((prev) =>
                                  prev.map((x) => (x.id === item.id ? { ...x, meta_title: e.target.value } : x))
                                )
                              }
                              placeholder="Meta title"
                              className="w-full h-8 px-2 rounded border border-light-gray text-xs mb-1"
                            />
                          </div>
                          <button
                            onClick={() =>
                              setGroupEditItems((prev) =>
                                prev.map((x) => (x.id === item.id ? { ...x, _deleted: true } : x))
                              )
                            }
                            className="p-1 text-red-400 hover:text-red-500"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            setGroupEditItems((prev) =>
                              prev.map((x) => (x.id === item.id ? { ...x, description: e.target.value } : x))
                            )
                          }
                          placeholder="Description"
                          rows={1}
                          className="w-full px-2 py-1 rounded border border-light-gray text-xs resize-none mb-1"
                        />
                        <input
                          value={item.keywords}
                          onChange={(e) =>
                            setGroupEditItems((prev) =>
                              prev.map((x) => (x.id === item.id ? { ...x, keywords: e.target.value } : x))
                            )
                          }
                          placeholder="Keywords (comma separated)"
                          className="w-full h-8 px-2 rounded border border-light-gray text-xs"
                        />
                      </div>
                    )
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={saveGroupEdit}
                  disabled={saving || groupEditItems.every((x) => x._deleted)}
                  className="flex-1 h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="size-4 animate-spin" />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => { setSelectedGroupSlug(null); setGroupEditItems([]); }}
                  className="h-10 px-5 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isBannerTab && editingId !== null && (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">Edit Image</h2>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Image</label>
                  <div className="flex gap-2">
                    <input
                      value={!form.file ? form.url : ""}
                      onChange={(e) => {
                        if (form.file) URL.revokeObjectURL(form.url);
                        setForm({ ...form, file: null, url: e.target.value });
                      }}
                      className="flex-1 h-10 px-3 rounded-md border border-light-gray text-sm"
                      placeholder="URL or upload"
                    />
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFilePick} hidden />
                    <button onClick={() => fileRef.current?.click()} className="h-10 px-3 rounded-md border border-light-gray text-mid-gray hover:bg-gray-50 text-sm shrink-0">
                      <Upload className="size-4" />
                    </button>
                  </div>
                </div>
                {formPreviewUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border border-light-gray">
                    <img src={formPreviewUrl} alt="" className="size-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
              </div>
              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={saving} className="flex-1 h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-60 inline-flex items-center justify-center gap-2">
                  {saving && <Loader2 className="size-4 animate-spin" />}
                  {saving ? "Saving..." : "Update"}
                </button>
                <button onClick={() => { resetForm(); setEditingId(null); }} className="h-10 px-5 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition">Cancel</button>
              </div>
            </div>
          )}

          {!isBannerTab && editingId === null && selectedId === null && (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">New Image</h2>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Image</label>
                  <div className="flex gap-2">
                    <input
                      value={!form.file ? form.url : ""}
                      onChange={(e) => {
                        if (form.file) URL.revokeObjectURL(form.url);
                        setForm({ ...form, file: null, url: e.target.value });
                      }}
                      className="flex-1 h-10 px-3 rounded-md border border-light-gray text-sm"
                      placeholder="Paste URL or pick a file"
                    />
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFilePick} hidden />
                    <button onClick={() => fileRef.current?.click()} className="h-10 px-3 rounded-md border border-light-gray text-mid-gray hover:bg-gray-50 text-sm shrink-0">
                      <Upload className="size-4" />
                    </button>
                  </div>
                </div>
                {formPreviewUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border border-light-gray">
                    <img src={formPreviewUrl} alt="" className="size-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
              </div>
              <button onClick={create} disabled={saving} className="w-full h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-60 inline-flex items-center justify-center gap-2">
                {saving && <Loader2 className="size-4 animate-spin" />}
                {saving ? "Saving..." : "Create"}
              </button>
            </div>
          )}

          {selected && editingId === null && !isBannerTab && (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">Details</h2>
              <div className={`rounded-lg overflow-hidden bg-gray-100 border border-light-gray mb-4 ${isBannerTab ? "aspect-[21/9]" : "aspect-video"}`}>
                <img src={selected.url} alt={selected.alt} className="size-full object-cover" />
              </div>
              {isBannerTab && (
                <div className="flex gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] bg-brand-secondary/10 text-brand-secondary font-semibold px-2 py-0.5 rounded"><FolderOpen className="size-3" /> {selected.group_title || selected.project_link}</span>
                  <span className="text-[11px] text-mid-gray">/ {selected.project_link}</span>
                </div>
              )}
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[11px] uppercase text-mid-gray">Alt</dt><dd className="text-brand-dark">{selected.alt || "—"}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Meta Title</dt><dd className="text-brand-dark">{selected.meta_title || "—"}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Description</dt><dd className="text-brand-dark">{selected.description || "—"}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Keywords</dt><dd className="text-brand-dark">{selected.keywords || "—"}</dd></div>
                {selected.project_link && (
                  <div><dt className="text-[11px] uppercase text-mid-gray">Link</dt><dd><a href={selected.project_link} className="text-brand-primary flex items-center gap-1 hover:underline"><ExternalLink className="size-3" /> {selected.project_link}</a></dd></div>
                )}
                {selected.custom_fields.map((f, i) => (
                  <div key={i}><dt className="text-[11px] uppercase text-mid-gray">{f.key}</dt><dd className="text-brand-dark">{f.value}</dd></div>
                ))}
              </dl>
              <button onClick={() => startEdit(selected)} className="mt-4 w-full h-10 rounded-lg border border-brand-primary text-brand-primary text-sm font-semibold hover:bg-brand-primary/5 transition">Edit</button>
            </div>
          )}
        </div>
      </div>

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
