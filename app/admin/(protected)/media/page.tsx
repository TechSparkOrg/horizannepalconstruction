"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Plus, Pencil, Trash2, ExternalLink, Upload, ImageIcon, Star,
  FolderOpen, X, Eye, Loader2, Search, Check, ArrowLeft,
} from "lucide-react";
import { getAdminMedia, revalidateAdminTag } from "@/app/actions/admin-cache";
import { MediaService } from "@/api/services/media.service";
import type { MediaItem } from "@/api/types/media.types";

const MAX_WORDS = 50;

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type PanelMode = "closed" | "creating" | "editing" | "viewing";
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

function emptyForm(banner: boolean): FormState {
  return {
    file: null, url: "", alt: "", metaTitle: "", description: "",
    keywords: "", projectLink: "", banner, groupTitle: "", customFields: [],
  };
}

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

interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

let toastId = 0;

// ─── Toast ──────────────────────────────────────────────────────
function Toasts({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 pointer-events-none" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={[
            "pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium",
            "animate-[slideIn_0.25s_ease-out] transition-all duration-300",
            t.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white",
          ].join(" ")}
        >
          {t.type === "success" ? <Check className="size-4 shrink-0" /> : <X className="size-4 shrink-0" />}
          <span className="flex-1">{t.message}</span>
          <button onClick={() => onDismiss(t.id)} className="shrink-0 opacity-70 hover:opacity-100 transition">
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Loading Skeleton ────────────────────────────────────────────
function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl bg-gray-100 aspect-video" />
      ))}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────
function EmptyState({
  tab,
  onNew,
}: {
  tab: MediaTab;
  onNew: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="size-16 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
        <ImageIcon className="size-7 text-brand-primary" />
      </div>
      <h3 className="font-display font-bold text-lg text-brand-dark mb-1">
        No {tab === "images" ? "images" : "banner groups"} yet
      </h3>
      <p className="text-sm text-mid-gray mb-6 text-center max-w-xs">
        {tab === "images"
          ? "Upload your first image to use across your site."
          : "Create a banner group to manage hero images by page."}
      </p>
      <button
        onClick={onNew}
        className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition"
      >
        <Plus className="size-4" />
        {tab === "images" ? "New Image" : "New Banner Group"}
      </button>
    </div>
  );
}

// ─── Preview Lightbox ────────────────────────────────────────────
function PreviewLightbox({
  url,
  items,
  currentIndex,
  onClose,
  onNavigate,
}: {
  url: string;
  items: { id: string; url: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const navRef = useRef(onNavigate);
  navRef.current = onNavigate;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "ArrowLeft" && currentIndex > 0) navRef.current(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < items.length - 1) navRef.current(currentIndex + 1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [currentIndex, items.length]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <div className="relative max-w-5xl w-full max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="absolute -top-3 -right-3 z-10 flex gap-2">
          {currentIndex > 0 && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="size-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-mid-gray hover:text-brand-dark transition"
              aria-label="Previous image"
            >
              <ArrowLeft className="size-4" />
            </button>
          )}
          {currentIndex < items.length - 1 && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="size-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-mid-gray hover:text-brand-dark transition"
              aria-label="Next image"
            >
              <ArrowLeft className="size-4 rotate-180" />
            </button>
          )}
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-mid-gray hover:text-brand-dark transition"
            aria-label="Close preview"
          >
            <X className="size-4" />
          </button>
        </div>
        <img
          src={url}
          alt={items[currentIndex]?.alt ?? ""}
          className="w-full h-full max-h-[85vh] object-contain rounded-xl"
        />
        {items[currentIndex]?.alt && (
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/40 px-3 py-1 rounded-full truncate max-w-[80%]">
            {items[currentIndex].alt}
          </p>
        )}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs">
          {currentIndex + 1} / {items.length}
        </div>
      </div>
    </div>
  );
}

// ─── Image Card ──────────────────────────────────────────────────
function ImageCard({
  item,
  selected,
  onSelect,
  onPreview,
  onEdit,
  onDelete,
}: {
  item: MediaItem;
  selected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={[
        "relative aspect-video rounded-xl overflow-hidden bg-gray-100 group cursor-pointer",
        "transition-all duration-200",
        selected
          ? "ring-2 ring-brand-primary shadow-md"
          : "shadow-sm hover:shadow-md ring-1 ring-black/5 hover:ring-black/10",
      ].join(" ")}
      aria-label={item.alt || "Image"}
    >
      <img
        src={item.url}
        alt={item.alt}
        loading="lazy"
        className="size-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-200 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
        <button
          onClick={(e) => { e.stopPropagation(); onPreview(); }}
          className="p-1.5 rounded-md bg-white/90 text-brand-dark hover:bg-white transition shadow-sm"
          aria-label="Preview"
        >
          <Eye className="size-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="p-1.5 rounded-md bg-white/90 text-brand-dark hover:bg-white transition shadow-sm"
          aria-label="Edit"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1.5 rounded-md bg-white/90 text-red-500 hover:bg-white transition shadow-sm"
          aria-label="Delete"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-6">
        <p className="text-[11px] text-white/90 truncate font-medium">
          {item.alt || "No alt text"}
        </p>
      </div>
    </div>
  );
}

// ─── Banner Group Card ───────────────────────────────────────────
function BannerGroupCard({
  slug,
  title,
  items,
  onEdit,
}: {
  slug: string;
  title: string;
  items: MediaItem[];
  onEdit: () => void;
}) {
  const thumbnails = items.slice(0, 4);
  const remaining = items.length - 4;

  return (
    <div className="bg-white rounded-xl border border-light-gray/40 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between px-4 py-3 border-b border-light-gray/40">
        <div className="flex items-center gap-2 min-w-0">
          <FolderOpen className="size-4 text-brand-secondary shrink-0" />
          <span className="text-sm font-semibold text-brand-dark truncate">{title || slug}</span>
          <span className="text-[11px] text-mid-gray bg-gray-100 px-1.5 py-0.5 rounded font-medium shrink-0">
            {items.length}
          </span>
        </div>
        <button
          onClick={onEdit}
          className="shrink-0 h-8 px-3 rounded-lg border border-brand-primary/30 text-brand-primary text-xs font-semibold hover:bg-brand-primary/5 transition flex items-center gap-1.5"
        >
          <Pencil className="size-3" />
          Edit
        </button>
      </div>
      <div className="grid grid-cols-4 gap-px bg-gray-100">
        {thumbnails.map((item, i) => (
          <div key={item.id} className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
            <img
              src={item.url}
              alt={item.alt}
              loading="lazy"
              className="size-full object-cover"
            />
            {i === 3 && remaining > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm font-bold">+{remaining}</span>
              </div>
            )}
          </div>
        ))}
        {Array.from({ length: Math.max(0, 4 - thumbnails.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-[4/3] bg-gray-50" />
        ))}
      </div>
    </div>
  );
}

// ─── Slide-Over Panel (images only) ──────────────────────────────
function SlideOverPanel({
  open,
  mode,
  form,
  previewUrl,
  saving,
  onClose,
  onFormChange,
  onFilePick,
  onSave,
  onDelete,
  selectedItem,
}: {
  open: boolean;
  mode: PanelMode;
  form: FormState;
  previewUrl: string;
  saving: boolean;
  onClose: () => void;
  onFormChange: (patch: Partial<FormState>) => void;
  onFilePick: (file: File) => void;
  onSave: () => void;
  onDelete?: () => void;
  selectedItem?: MediaItem;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!open) return null;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isViewing = mode === "viewing";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={[
          "fixed lg:sticky top-0 right-0 z-50 lg:z-0",
          "w-full sm:w-[480px] h-full lg:h-auto",
          "bg-white lg:rounded-xl lg:border lg:border-light-gray/40",
          "shadow-2xl lg:shadow-none",
          "overflow-y-auto",
          "animate-[slideInRight_0.2s_ease-out]",
        ].join(" ")}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-light-gray/40 px-5 py-3 flex items-center justify-between">
          <h2 className="font-bold text-brand-dark text-base">
            {mode === "creating" ? "New Image" : mode === "editing" ? "Edit Image" : "Image Details"}
          </h2>
          <button
            onClick={onClose}
            className="size-8 rounded-lg flex items-center justify-center text-mid-gray hover:text-brand-dark hover:bg-gray-100 transition"
            aria-label="Close panel"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {isViewing && selectedItem ? (
            <>
              <div className="rounded-xl overflow-hidden bg-gray-100 border border-light-gray/40">
                <img src={selectedItem.url} alt={selectedItem.alt} className="w-full aspect-video object-cover" />
              </div>
              <dl className="space-y-3 text-sm">
                <FieldDisplay label="Alt text" value={selectedItem.alt} />
                <FieldDisplay label="Meta title" value={selectedItem.meta_title} />
                <FieldDisplay label="Description" value={selectedItem.description} />
                <FieldDisplay label="Keywords" value={selectedItem.keywords} />
                {selectedItem.project_link && (
                  <FieldLink label="Link" value={selectedItem.project_link} />
                )}
                {selectedItem.custom_fields.map((f, i) => (
                  <FieldDisplay key={i} label={f.key} value={f.value} />
                ))}
              </dl>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => onFormChange({})}
                  className="flex-1 h-10 rounded-lg border border-brand-primary text-brand-primary text-sm font-semibold hover:bg-brand-primary/5 transition"
                >
                  Edit
                </button>
                {onDelete && (
                  <button
                    onClick={onDelete}
                    className="h-10 px-4 rounded-lg border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wider">
                  Image
                </label>
                <div className="flex gap-2">
                  <input
                    value={!form.file ? form.url : ""}
                    onChange={(e) => {
                      if (form.file) URL.revokeObjectURL(form.url);
                      onFormChange({ file: null, url: e.target.value });
                    }}
                    className="flex-1 h-10 px-3 rounded-lg border border-light-gray text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
                    placeholder="Paste URL or upload a file"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onFilePick(file);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    hidden
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="h-10 px-3 rounded-lg border border-light-gray text-mid-gray hover:bg-gray-50 hover:border-gray-300 transition text-sm shrink-0"
                    aria-label="Upload file"
                  >
                    <Upload className="size-4" />
                  </button>
                </div>
              </div>

              {previewUrl && (
                <div className="rounded-xl overflow-hidden bg-gray-100 border border-light-gray/40">
                  <img
                    src={previewUrl}
                    alt=""
                    className="w-full aspect-video object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}

              <FieldInput
                label="Alt text"
                value={form.alt}
                onChange={(v) => onFormChange({ alt: v })}
                placeholder="Describe the image for accessibility"
              />
              <FieldInput
                label="Meta title"
                value={form.metaTitle}
                onChange={(v) => onFormChange({ metaTitle: v })}
                placeholder="SEO title"
              />
              <FieldTextarea
                label={`Description (${wordCount(form.description)}/${MAX_WORDS} words)`}
                value={form.description}
                onChange={(v) => {
                  const words = v.trim() ? v.trim().split(/\s+/) : [];
                  if (words.length <= MAX_WORDS) onFormChange({ description: v });
                }}
                placeholder="Brief description of this image"
              />
              <FieldInput
                label="Keywords"
                value={form.keywords}
                onChange={(v) => onFormChange({ keywords: v })}
                placeholder="keyword1, keyword2"
              />

              {form.customFields.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase tracking-wider">
                    Custom Fields
                  </label>
                  {form.customFields.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        value={f.key}
                        onChange={(e) => {
                          const c = [...form.customFields];
                          c[i] = { ...c[i], key: e.target.value };
                          onFormChange({ customFields: c });
                        }}
                        className="flex-1 h-9 px-2.5 rounded-lg border border-light-gray text-xs"
                        placeholder="Key"
                      />
                      <input
                        value={f.value}
                        onChange={(e) => {
                          const c = [...form.customFields];
                          c[i] = { ...c[i], value: e.target.value };
                          onFormChange({ customFields: c });
                        }}
                        className="flex-1 h-9 px-2.5 rounded-lg border border-light-gray text-xs"
                        placeholder="Value"
                      />
                      <button
                        onClick={() => {
                          const c = form.customFields.filter((_, j) => j !== i);
                          onFormChange({ customFields: c });
                        }}
                        className="p-1.5 text-red-400 hover:text-red-500"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => onFormChange({ customFields: [...form.customFields, { key: "", value: "" }] })}
                className="text-xs font-medium text-brand-primary hover:underline"
              >
                + Add custom field
              </button>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onSave}
                  disabled={saving || (!form.file && !form.url.trim())}
                  className="flex-1 h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="size-4 animate-spin" />}
                  {saving ? "Saving..." : mode === "creating" ? "Create" : "Update"}
                </button>
                <button
                  onClick={onClose}
                  className="h-10 px-5 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function FieldDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-mid-gray font-medium mb-0.5">{label}</dt>
      <dd className="text-brand-dark">{value || "\u2014"}</dd>
    </div>
  );
}

function FieldLink({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-mid-gray font-medium mb-0.5">{label}</dt>
      <dd>
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary flex items-center gap-1 hover:underline text-sm"
        >
          <ExternalLink className="size-3" />
          {value}
        </a>
      </dd>
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wider">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 rounded-lg border border-light-gray text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
      />
    </div>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wider">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition resize-none"
      />
    </div>
  );
}

// ─── Banner Group Dialog (modal) ────────────────────────────────
function BannerGroupDialog({
  open,
  title,
  slug,
  items,
  saving,
  onClose,
  onTitleChange,
  onSlugChange,
  onItemChange,
  onItemDelete,
  onFilePick,
  onSave,
}: {
  open: boolean;
  title: string;
  slug: string;
  items: GroupEditItem[];
  saving: boolean;
  onClose: () => void;
  onTitleChange: (v: string) => void;
  onSlugChange: (v: string) => void;
  onItemChange: (id: string, field: string, value: string) => void;
  onItemDelete: (id: string) => void;
  onFilePick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!open) return null;

  const activeItems = items.filter((x) => !x._deleted);
  const hasChanges = activeItems.length > 0;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-[5vh] pb-8 px-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit banner group"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-light-gray/40 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-brand-dark text-base">Banner Group</h2>
            <p className="text-xs text-mid-gray mt-0.5">Edit images and group metadata</p>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-lg flex items-center justify-center text-mid-gray hover:text-brand-dark hover:bg-gray-100 transition"
            aria-label="Close dialog"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Group metadata */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wider">Group Title</label>
              <input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-light-gray text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
                placeholder="e.g. Homepage Hero"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wider">Slug</label>
              <input
                value={slug}
                onChange={(e) => onSlugChange(toSlug(e.target.value))}
                className="w-full h-10 px-3 rounded-lg border border-light-gray text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
                placeholder="page-slug"
              />
            </div>
          </div>

          {/* Add images */}
          <div>
            <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wider">
              Images{" "}
              <span className="font-normal normal-case text-mid-gray">({activeItems.length})</span>
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onFilePick}
              hidden
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full py-8 rounded-xl border-2 border-dashed border-light-gray flex flex-col items-center justify-center gap-1.5 text-mid-gray hover:border-brand-primary/40 hover:text-brand-primary transition"
            >
              <Upload className="size-6" />
              <span className="text-xs font-medium">Click to add more images</span>
            </button>
          </div>

          {/* Image list */}
          {activeItems.length === 0 ? (
            <p className="text-sm text-mid-gray text-center py-6 bg-gray-50 rounded-xl">
              No images in this group. Add images above.
            </p>
          ) : (
            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1 -mr-1">
              {activeItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-light-gray/30"
                >
                  <div className="size-16 shrink-0 rounded-lg overflow-hidden bg-gray-200 shadow-sm">
                    <img src={item.url} alt="" className="size-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <input
                      value={item.alt}
                      onChange={(e) => onItemChange(item.id, "alt", e.target.value)}
                      placeholder="Alt text"
                      className="w-full h-8 px-2.5 rounded-lg border border-light-gray text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
                    />
                    <input
                      value={item.meta_title}
                      onChange={(e) => onItemChange(item.id, "meta_title", e.target.value)}
                      placeholder="Meta title"
                      className="w-full h-8 px-2.5 rounded-lg border border-light-gray text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
                    />
                    <div className="flex gap-1.5">
                      <textarea
                        value={item.description}
                        onChange={(e) => onItemChange(item.id, "description", e.target.value)}
                        placeholder="Description"
                        rows={1}
                        className="flex-1 px-2.5 py-1 rounded-lg border border-light-gray text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition resize-none"
                      />
                      <input
                        value={item.keywords}
                        onChange={(e) => onItemChange(item.id, "keywords", e.target.value)}
                        placeholder="Keywords"
                        className="w-[120px] h-8 px-2.5 rounded-lg border border-light-gray text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
                      />
                      <button
                        onClick={() => onItemDelete(item.id)}
                        className="p-1.5 text-red-400 hover:text-red-500 shrink-0 self-start mt-0.5"
                        aria-label="Remove image"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-light-gray/40 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving || !hasChanges}
            className="h-10 px-6 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-50 inline-flex items-center gap-2"
          >
            {saving && <Loader2 className="size-4 animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [tab, setTab] = useState<MediaTab>("images");
  const [searchQuery, setSearchQuery] = useState("");

  const [panelMode, setPanelMode] = useState<PanelMode>("closed");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm(false));

  const [selectedGroupSlug, setSelectedGroupSlug] = useState<string | null>(null);
  const [groupEditTitle, setGroupEditTitle] = useState("");
  const [groupEditSlug, setGroupEditSlug] = useState("");
  const [groupEditItems, setGroupEditItems] = useState<GroupEditItem[]>([]);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewItems, setPreviewItems] = useState<{ id: string; url: string; alt: string }[]>([]);

  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addToast = useCallback((type: "success" | "error", message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    getAdminMedia(1).then((res) => {
      setItems(res.results ?? []);
      setPage(1);
      setHasMore(res.next !== null);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      addToast("error", "Failed to load media");
    });
  }, [addToast]);

  const isBannerTab = tab === "banners";
  const scopedItems = useMemo(
    () => items.filter((m) => m.banner === isBannerTab),
    [items, isBannerTab]
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return scopedItems;
    const q = searchQuery.toLowerCase();
    return scopedItems.filter(
      (m) =>
        m.alt.toLowerCase().includes(q) ||
        m.meta_title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.keywords.toLowerCase().includes(q)
    );
  }, [scopedItems, searchQuery]);

  const selectedItem = useMemo(
    () => scopedItems.find((m) => m.id === selectedId) ?? scopedItems.find((m) => m.id === editingId),
    [scopedItems, selectedId, editingId]
  );

  const formPreviewUrl = form.file ? form.url : form.url;

  const bannerGroups = useMemo(() => {
    if (!isBannerTab) return {};
    const groups: Record<string, { title: string; items: MediaItem[] }> = {};
    for (const item of scopedItems) {
      const key = item.project_link || "(no slug)";
      if (!groups[key]) groups[key] = { title: item.group_title || key, items: [] };
      groups[key].items.push(item);
    }
    return groups;
  }, [scopedItems, isBannerTab]);

  const openImagePreview = useCallback((item: MediaItem, allItems: MediaItem[]) => {
    const mapped = allItems.map((m) => ({ id: m.id, url: m.url, alt: m.alt }));
    const idx = mapped.findIndex((m) => m.id === item.id);
    setPreviewItems(mapped);
    setPreviewIndex(idx);
    setPreviewUrl(item.url);
  }, []);

  const closePanel = useCallback(() => {
    if (form.file) URL.revokeObjectURL(form.url);
    setPanelMode("closed");
    setSelectedId(null);
    setEditingId(null);
    setForm(emptyForm(isBannerTab));
  }, [form.file, form.url, isBannerTab]);

  const openNewForm = useCallback(() => {
    if (form.file) URL.revokeObjectURL(form.url);
    setPanelMode("creating");
    setSelectedId(null);
    setEditingId(null);
    setForm(emptyForm(isBannerTab));
    setSelectedGroupSlug(null);
  }, [form.file, form.url, isBannerTab]);

  const openEditForm = useCallback((item: MediaItem) => {
    if (form.file) URL.revokeObjectURL(form.url);
    setPanelMode("editing");
    setEditingId(item.id);
    setSelectedId(null);
    setForm(fromApi(item));
  }, [form]);

  const openDetailView = useCallback((item: MediaItem) => {
    setPanelMode("viewing");
    setSelectedId(item.id);
    setEditingId(null);
  }, []);

  const handleImageSelect = useCallback((item: MediaItem) => {
    setSelectedGroupSlug(null);
    setGroupEditItems([]);
    if (selectedId === item.id) {
      openEditForm(item);
    } else {
      openDetailView(item);
    }
  }, [selectedId, openDetailView, openEditForm]);

  const switchTab = useCallback((t: MediaTab) => {
    setTab(t);
    closePanel();
    setSelectedGroupSlug(null);
    setGroupEditItems([]);
    setSearchQuery("");
    setPage(1);
    setHasMore(false);
  }, [closePanel]);

  const handleFilePick = useCallback((file: File) => {
    if (form.file) URL.revokeObjectURL(form.url);
    setForm({ ...form, file, url: URL.createObjectURL(file) });
  }, [form]);

  const handleCreate = useCallback(async () => {
    if (!form.file && !form.url.trim()) return;
    setSaving(true);
    try {
      const created = form.file
        ? await MediaService.uploadImage(form.file, toSnake(form))
        : await MediaService.create(toSnake(form));
      await revalidateAdminTag("admin-media");
      setItems((prev) => [...prev, created]);
      addToast("success", "Image created successfully");
      closePanel();
    } catch {
      addToast("error", "Failed to create image");
    } finally {
      setSaving(false);
    }
  }, [form, addToast, closePanel]);

  const handleUpdate = useCallback(async () => {
    if (!editingId || (!form.url.trim() && !form.file)) return;
    setSaving(true);
    try {
      let url = form.url;
      if (form.file) {
        const uploaded = await MediaService.uploadImage(form.file, {
          alt: form.alt,
          banner: form.banner,
        });
        url = uploaded.url;
      }
      const updated = await MediaService.update(editingId, { ...toSnake(form), url });
      await revalidateAdminTag("admin-media");
      setItems((prev) => prev.map((m) => (m.id === editingId ? updated : m)));
      addToast("success", "Image updated successfully");
      closePanel();
    } catch {
      addToast("error", "Failed to update image");
    } finally {
      setSaving(false);
    }
  }, [editingId, form, addToast, closePanel]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await MediaService.delete(id);
      await revalidateAdminTag("admin-media");
      setItems((prev) => prev.filter((m) => m.id !== id));
      addToast("success", "Image deleted");
      if (selectedId === id || editingId === id) closePanel();
    } catch {
      addToast("error", "Failed to delete image");
    }
  }, [addToast, closePanel, selectedId, editingId]);

  const handleGroupEditSave = useCallback(async () => {
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
      await revalidateAdminTag("admin-media");
      const res = await MediaService.list(1);
      setItems(res.results ?? []);
      setPage(1);
      setHasMore(res.next !== null);
      setSelectedGroupSlug(null);
      setGroupEditItems([]);
      addToast("success", "Banner group saved");
    } catch {
      addToast("error", "Failed to save banner group");
    } finally {
      setSaving(false);
    }
  }, [groupEditItems, groupEditTitle, groupEditSlug, addToast]);

  const startGroupEdit = useCallback((slug: string) => {
    const group = bannerGroups[slug];
    if (!group) return;
    setSelectedGroupSlug(slug);
    closePanel();
    setGroupEditTitle(group.title);
    setGroupEditSlug(slug);
    setGroupEditItems(group.items.map((item) => ({ ...item, _deleted: false })));
  }, [bannerGroups, closePanel]);

  const handleGroupEditItemChange = useCallback((id: string, field: string, value: string) => {
    setGroupEditItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, [field]: value } : x))
    );
  }, []);

  const handleGroupEditItemDelete = useCallback((id: string) => {
    setGroupEditItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, _deleted: true } : x))
    );
  }, []);

  const handleGroupFilePick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const loadMore = useCallback(async () => {
    setLoadingMore(true);
    try {
      const res = await getAdminMedia(page + 1);
      setItems((prev) => [...prev, ...(res.results ?? [])]);
      setPage((prev) => prev + 1);
      setHasMore(res.next !== null);
    } catch {
      addToast("error", "Failed to load more");
    } finally {
      setLoadingMore(false);
    }
  }, [page, addToast]);

  const deleteConfirmed = useCallback((id: string) => {
    if (window.confirm("Delete this image permanently?")) {
      handleDelete(id);
    }
  }, [handleDelete]);

  if (loading) {
    return (
      <div>
        <div className="h-8 w-40 bg-gray-100 rounded-lg animate-pulse mb-6" />
        <div className="h-10 w-64 bg-gray-50 rounded-lg animate-pulse mb-6" />
        <SkeletonGrid count={6} />
      </div>
    );
  }

  return (
    <div>
      <Toasts toasts={toasts} onDismiss={dismissToast} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Media Manager</h1>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-mid-gray/60 pointer-events-none" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images\u2026"
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-light-gray text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mid-gray/50 hover:text-mid-gray transition"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={openNewForm}
            className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition shrink-0"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">New {isBannerTab ? "Group" : "Image"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-light-gray mb-6">
        <button
          onClick={() => switchTab("images")}
          className={`px-5 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "images"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-mid-gray hover:text-brand-dark"
          }`}
        >
          <ImageIcon className="size-4 inline mr-1.5 -mt-0.5" />
          Images{" "}
          <span className="text-xs opacity-60">({items.filter((m) => !m.banner).length})</span>
        </button>
        <button
          onClick={() => switchTab("banners")}
          className={`px-5 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "banners"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-mid-gray hover:text-brand-dark"
          }`}
        >
          <Star className="size-4 inline mr-1.5 -mt-0.5" />
          Banners{" "}
          <span className="text-xs opacity-60">({items.filter((m) => m.banner).length})</span>
        </button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Gallery */}
        <div className={`${panelMode !== "closed" ? "hidden lg:block" : ""} lg:col-span-3`}>
          {filteredItems.length === 0 && !loading ? (
            <EmptyState tab={tab} onNew={openNewForm} />
          ) : isBannerTab ? (
            <div className="space-y-3">
              {Object.entries(bannerGroups).map(([slug, group]) => (
                <BannerGroupCard
                  key={slug}
                  slug={slug}
                  title={group.title}
                  items={group.items}
                  onEdit={() => startGroupEdit(slug)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredItems.map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  selected={selectedId === item.id || editingId === item.id}
                  onSelect={() => handleImageSelect(item)}
                  onPreview={() => openImagePreview(item, filteredItems)}
                  onEdit={() => openEditForm(item)}
                  onDelete={() => deleteConfirmed(item.id)}
                />
              ))}
            </div>
          )}

          {hasMore && filteredItems.length > 0 && (
            <div className="flex justify-center pt-4 pb-4">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="h-10 px-6 rounded-lg border border-light-gray text-sm font-medium text-mid-gray hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center gap-2"
              >
                {loadingMore ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Plus className="size-4" />
                )}
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>

        {/* Slide-over panel (images tab only) */}
        {!isBannerTab && (
          <div className={`${panelMode === "closed" ? "hidden lg:hidden" : ""} lg:col-span-2 lg:block`}>
            {panelMode === "closed" ? (
              <div className="hidden lg:flex flex-col items-center justify-center h-full py-16 bg-white rounded-xl border border-light-gray/40 px-6">
                <ImageIcon className="size-10 text-mid-gray/30 mb-3" />
                <p className="text-sm text-mid-gray text-center">Select an image to view or edit its details</p>
              </div>
            ) : (
              <SlideOverPanel
                open={true}
                mode={panelMode}
                form={form}
                previewUrl={formPreviewUrl}
                saving={saving}
                onClose={closePanel}
                onFormChange={(patch) => {
                  if (Object.keys(patch).length === 0 && panelMode === "viewing") {
                    // switching to edit mode — reload form from selected item
                    if (selectedItem) setForm(fromApi(selectedItem));
                    setPanelMode("editing");
                    setEditingId(selectedItem?.id ?? null);
                    setSelectedId(null);
                    return;
                  }
                  setForm((prev) => ({ ...prev, ...patch }));
                }}
                onFilePick={handleFilePick}
                onSave={panelMode === "creating" ? handleCreate : handleUpdate}
                onDelete={panelMode !== "creating" && editingId ? () => deleteConfirmed(editingId) : undefined}
                selectedItem={selectedItem}
              />
            )}
          </div>
        )}
      </div>

      {/* Banner group dialog modal */}
      <BannerGroupDialog
        open={selectedGroupSlug !== null}
        title={groupEditTitle}
        slug={groupEditSlug}
        items={groupEditItems}
        saving={saving}
        onClose={() => {
          setSelectedGroupSlug(null);
          setGroupEditItems([]);
        }}
        onTitleChange={setGroupEditTitle}
        onSlugChange={setGroupEditSlug}
        onItemChange={handleGroupEditItemChange}
        onItemDelete={handleGroupEditItemDelete}
        onFilePick={handleGroupFilePick}
        onSave={handleGroupEditSave}
      />

      {/* Preview lightbox */}
      {previewUrl && previewItems.length > 0 && (
        <PreviewLightbox
          url={previewUrl}
          items={previewItems}
          currentIndex={previewIndex}
          onClose={() => { setPreviewUrl(null); setPreviewItems([]); }}
          onNavigate={(i) => {
            setPreviewIndex(i);
            setPreviewUrl(previewItems[i].url);
          }}
        />
      )}
    </div>
  );
}
