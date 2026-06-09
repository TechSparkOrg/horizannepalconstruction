"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, ArrowLeft, Upload, X } from "lucide-react";
import { BlogAdmin } from "@/api/services/blog.service";
import { MediaService } from "@/api/services/media.service";
import type { AdminCategory } from "@/stores/admin-types";
import type { ContentBlock, BlogPost } from "@/api/types/blog.types";
import ContentBlockEditor from "./ContentBlockEditor";
import { EMPTY_FORM, BLOCK_TYPES, toForm, toPayload } from "./types";

interface Props {
  editingSlug: string | null;
  categories: AdminCategory[];
  projects: { slug: string; title: string }[];
  onSaved: (post: BlogPost) => void;
  onBack: () => void;
}

const input = "w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition bg-white";
const select = "w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition bg-white appearance-none cursor-pointer";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-gray-500 mb-1.5">{children}</label>;
}

function Divider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{title}</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

function ImageUploadField({
  value,
  onChange,
  onUpload,
  uploading,
  preview,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onUpload: () => void;
  uploading: boolean;
  preview?: "rect" | "avatar";
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "Paste image URL…"}
          className={input}
        />
        <button
          type="button"
          onClick={onUpload}
          disabled={uploading}
          className="h-10 px-3.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 inline-flex items-center gap-1.5 transition disabled:opacity-50 shrink-0"
        >
          {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
          Upload
        </button>
      </div>
      {value && preview === "rect" && (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-50">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 size-6 rounded-md bg-black/50 text-white grid place-items-center hover:bg-black/70 transition"
          >
            <X className="size-3" />
          </button>
        </div>
      )}
      {value && preview === "avatar" && (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
            <img src={value} alt="" className="size-full object-cover" />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-gray-400 hover:text-gray-600 transition"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default function BlogForm({ editingSlug, categories, projects, onSaved, onBack }: Props) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingAuthorImg, setUploadingAuthorImg] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const authorImgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editingSlug) return;
    BlogAdmin.adminGet(editingSlug).then((post) => setForm(toForm(post)));
  }, [editingSlug]);

  const set = (patch: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...patch }));

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = toPayload(form);
      const post = editingSlug
        ? await BlogAdmin.update(editingSlug, payload)
        : await BlogAdmin.create(payload);
      onSaved(post);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "image" | "authorImage") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const setter = field === "image" ? setUploadingImg : setUploadingAuthorImg;
    setter(true);
    try {
      const media = await MediaService.uploadImage(file);
      set({ [field]: media.url });
    } finally {
      setter(false);
      if (e.target) e.target.value = "";
    }
  };

  const addBlock = (type: ContentBlock["type"]) =>
    set({ content: [...form.content, { type, value: "", items: [] }] });

  const updateBlock = (i: number, field: string, value: unknown) => {
    const c = [...form.content];
    c[i] = { ...c[i], [field]: value } as ContentBlock;
    set({ content: c });
  };

  const removeBlock = (i: number) =>
    set({ content: form.content.filter((_, j) => j !== i) });

  const moveBlock = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= form.content.length) return;
    const c = [...form.content];
    [c[i], c[j]] = [c[j], c[i]];
    set({ content: c });
  };

  const handleBlockImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, blockIdx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const media = await MediaService.uploadImage(file);
    updateBlock(blockIdx, "src", media.url);
    if (e.target) e.target.value = "";
  };

  return (
    <div className="max-w-8xl p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="size-8 grid place-items-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <p className="text-xs text-gray-400 leading-none mb-0.5">Blogs</p>
            <h1 className="text-base font-semibold text-gray-900 leading-none">
              {editingSlug ? form.title || "Edit Post" : "New Post"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="h-9 px-4 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition">
            Discard
          </button>
          <button
            onClick={save}
            disabled={saving || uploadingImg || uploadingAuthorImg}
            className="h-9 px-5 rounded-lg bg-brand-primary text-white text-sm font-medium inline-flex items-center gap-1.5 hover:brightness-105 transition disabled:opacity-50"
          >
            {saving && <Loader2 className="size-3.5 animate-spin" />}
            {saving ? "Saving…" : editingSlug ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">

        {/* Title + Excerpt */}
        <div className="p-5 space-y-4">
          <Divider title="Post Content" />
          <div>
            <Label>Title</Label>
            <input
              value={form.title}
              onChange={(e) => set({ title: e.target.value })}
              placeholder="Enter post title"
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition bg-white"
            />
          </div>
          <div>
            <Label>Excerpt</Label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set({ excerpt: e.target.value })}
              rows={3}
              placeholder="Short summary shown in preview cards"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:border-gray-400 transition bg-white"
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="p-5 space-y-4">
          <Divider title="Featured Image" />
          <input ref={imgRef} type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "image")} hidden />
          <ImageUploadField
            value={form.image}
            onChange={(v) => set({ image: v })}
            onUpload={() => imgRef.current?.click()}
            uploading={uploadingImg}
            preview="rect"
            placeholder="Paste featured image URL…"
          />
        </div>

        {/* Meta */}
        <div className="p-5 space-y-4">
          <Divider title="Meta" />
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Date</Label>
              <input type="date" value={form.date} onChange={(e) => set({ date: e.target.value })} className={input} />
            </div>
            <div>
              <Label>Category</Label>
              <select value={form.categoryId} onChange={(e) => set({ categoryId: e.target.value })} className={select}>
                <option value="">— Select —</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <Label>Related Project</Label>
              <select value={form.projectId} onChange={(e) => set({ projectId: e.target.value })} className={select}>
                <option value="">— None —</option>
                {projects.map((p: any) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="p-5 space-y-4">
          <Divider title="Author" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <input value={form.author} onChange={(e) => set({ author: e.target.value })} placeholder="Author name" className={input} />
            </div>
            <div>
              <Label>Role</Label>
              <input value={form.authorRole} onChange={(e) => set({ authorRole: e.target.value })} placeholder="e.g. Architect" className={input} />
            </div>
          </div>

        </div>

        {/* Content Blocks */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <Divider title="Content Blocks" />
            <div className="flex gap-1.5 flex-wrap justify-end ml-4">
              {BLOCK_TYPES.map((bt) => (
                <button
                  key={bt.value}
                  onClick={() => addBlock(bt.value)}
                  className="h-7 px-2.5 text-xs font-medium rounded-md border border-gray-200 text-gray-500 hover:border-brand-primary hover:text-brand-primary transition"
                >
                  + {bt.label}
                </button>
              ))}
            </div>
          </div>
          {form.content.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No blocks yet. Add one above.</p>
          ) : (
            <div className="space-y-3">
              {form.content.map((block, i) => (
                <ContentBlockEditor
                  key={i}
                  block={block}
                  index={i}
                  isFirst={i === 0}
                  isLast={i === form.content.length - 1}
                  onUpdate={updateBlock}
                  onRemove={removeBlock}
                  onMove={moveBlock}
                  onImageUpload={handleBlockImageUpload}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}