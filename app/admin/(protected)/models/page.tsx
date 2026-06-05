"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "@google/model-viewer";
import { Plus, Pencil, Trash2, Upload, Eye, X, Box, Loader2, ExternalLink, ChevronRight } from "lucide-react";
import { Model3dService } from "@/api/services/model3d.service";
import { ProjectService } from "@/api/services/project.service";
import type { ModelItem, ModelItemCreate } from "@/api/types/model3d.types";
import type { Project } from "@/api/types/project.types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isModelViewable(url: string): boolean {
  return /\.(glb|gltf)$/i.test(url);
}

interface FormState {
  file: File | null;
  url: string;
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  projectId: string;
}

const EMPTY: FormState = {
  file: null, url: "", title: "", slug: "", description: "",
  metaTitle: "", metaDescription: "", keywords: "", projectId: "",
};

function toSnake(f: FormState): ModelItemCreate {
  return {
    url: f.url,
    title: f.title,
    slug: f.slug || "",
    description: f.description,
    meta_title: f.metaTitle,
    meta_description: f.metaDescription,
    keywords: f.keywords,
    project_id: f.projectId,
  };
}

function fromApi(a: ModelItem): FormState {
  return {
    file: null,
    url: a.url,
    title: a.title,
    slug: a.slug,
    description: a.description,
    metaTitle: a.meta_title,
    metaDescription: a.meta_description,
    keywords: a.keywords,
    projectId: a.project_id,
  };
}

// ─── Shared field components ─────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1.5">
      {children}
    </label>
  );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full h-9 px-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-md
        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
        placeholder:text-gray-300 transition ${className}`}
      {...props}
    />
  );
}

function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md
        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
        placeholder:text-gray-300 resize-none transition ${className}`}
      {...props}
    />
  );
}

function Select({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full h-9 px-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-md
        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition ${className}`}
      {...props}
    />
  );
}

// ─── Model form (shared between create/edit) ──────────────────────────────────

interface ModelFormProps {
  form: FormState;
  projects: Project[];
  saving: boolean;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onFieldChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onFilePick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  mode: "create" | "edit";
  slugTouched: React.MutableRefObject<boolean>;
}

function ModelForm({
  form, projects, saving, fileRef, onFieldChange, onFilePick,
  onSubmit, onCancel, mode, slugTouched,
}: ModelFormProps) {
  return (
    <div className="space-y-4">
      {/* File / URL */}
      <div>
        <Label>Model File</Label>
        <div className="flex gap-2">
          <Input
            value={!form.file ? form.url : ""}
            onChange={(e) => {
              if (form.file) URL.revokeObjectURL(form.url);
              onFieldChange("file", null);
              onFieldChange("url", e.target.value);
            }}
            placeholder="Paste URL or upload .glb / .gltf"
          />
          <input ref={fileRef} type="file" accept=".glb,.gltf" onChange={onFilePick} hidden />
          <button
            onClick={() => fileRef.current?.click()}
            className="h-9 px-3 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition shrink-0 flex items-center gap-1.5"
          >
            <Upload className="size-3.5" />
            <span className="text-xs font-medium">Upload</span>
          </button>
        </div>
        {form.file && (
          <p className="mt-1.5 text-xs text-gray-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            {form.file.name}
          </p>
        )}
      </div>

      {/* Inline preview */}
      {form.url && isModelViewable(form.url) && (
        <div className="h-48 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
          <model-viewer
            src={form.url}
            alt={form.title}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            touch-action="pan-y"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* Title + Slug */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Title</Label>
          <Input
            value={form.title}
            onChange={(e) => onFieldChange("title", e.target.value)}
            placeholder="Model name"
          />
        </div>
        <div>
          <Label>Slug</Label>
          <div className="flex items-center">
            <span className="h-9 px-2.5 flex items-center text-sm text-gray-400 border border-r-0 border-gray-200 rounded-l-md bg-gray-50 select-none">/</span>
            <input
              value={form.slug}
              onChange={(e) => {
                slugTouched.current = true;
                onFieldChange("slug", e.target.value);
              }}
              className="flex-1 h-9 px-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-r-md
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                placeholder:text-gray-300 transition"
              placeholder="auto-generated"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          rows={2}
          placeholder="Short description of this model…"
        />
      </div>

      {/* SEO section */}
      <div className="pt-1 border-t border-gray-100">
        <p className="text-[11px] font-semibold tracking-wider text-gray-300 uppercase mb-3">SEO</p>
        <div className="space-y-3">
          <div>
            <Label>Meta Title</Label>
            <Input
              value={form.metaTitle}
              onChange={(e) => onFieldChange("metaTitle", e.target.value)}
              placeholder="Page title for search engines"
            />
          </div>
          <div>
            <Label>Meta Description</Label>
            <Textarea
              value={form.metaDescription}
              onChange={(e) => onFieldChange("metaDescription", e.target.value)}
              rows={2}
              placeholder="Search result description…"
            />
          </div>
          <div>
            <Label>Keywords</Label>
            <Input
              value={form.keywords}
              onChange={(e) => onFieldChange("keywords", e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </div>
      </div>

      {/* Project */}
      <div>
        <Label>Reference Project</Label>
        <Select value={form.projectId} onChange={(e) => onFieldChange("projectId", e.target.value)}>
          <option value="">None</option>
          {projects.map((p) => (
            <option key={p.id || p.slug} value={p.id || p.slug}>{p.title}</option>
          ))}
        </Select>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        {mode === "edit" && (
          <button
            onClick={onCancel}
            className="h-9 px-4 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        )}
        <button
          onClick={onSubmit}
          disabled={saving}
          className="flex-1 h-9 rounded-md bg-gray-900 text-white text-sm font-semibold
            hover:bg-gray-700 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          {saving && <Loader2 className="size-3.5 animate-spin" />}
          {saving ? "Saving…" : mode === "create" ? "Create Model" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminModelsPage() {
  const [items, setItems] = useState<ModelItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const slugTouched = useRef(false);
  const [form, setForm] = useState<FormState>(EMPTY);

  useEffect(() => {
    Promise.all([Model3dService.list(), ProjectService.adminList()]).then(
      ([modelsRes, projsRes]) => {
        setItems(modelsRes.results ?? []);
        setProjects(projsRes.results ?? []);
        setLoading(false);
      }
    );
  }, []);

  const selected = items.find((m) => m.id === selectedId);

  const resetForm = useCallback(() => {
    if (form.file) URL.revokeObjectURL(form.url);
    setForm(EMPTY);
    slugTouched.current = false;
  }, [form.file, form.url]);

  const startEdit = (item: ModelItem) => {
    setForm(fromApi(item));
    setEditingId(item.id);
    setSelectedId(null);
    slugTouched.current = true;
  };

  const startNew = () => {
    resetForm();
    setEditingId(null);
    setSelectedId(null);
  };

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugTouched.current) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (form.file) URL.revokeObjectURL(form.url);
    setForm((prev) => ({ ...prev, file, url: URL.createObjectURL(file) }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const create = async () => {
    if (!form.file && !form.url.trim()) return;
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = toSnake(form);
      const created = form.file
        ? await Model3dService.uploadModel(form.file, payload)
        : await Model3dService.create(payload);
      setItems((prev) => [...prev, created]);
      resetForm();
    } finally { setSaving(false); }
  };

  const saveEdit = async () => {
    if (!editingId || (!form.url.trim() && !form.file)) return;
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      let url = form.url;
      if (form.file) {
        const uploaded = await Model3dService.uploadModel(form.file, { title: form.title, slug: form.slug || undefined });
        url = uploaded.url;
      }
      const updated = await Model3dService.update(editingId, { ...toSnake(form), url });
      setItems((prev) => prev.map((m) => (m.id === editingId ? updated : m)));
      resetForm();
      setEditingId(null);
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    await Model3dService.delete(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
    if (editingId === id) setEditingId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="size-5 animate-spin text-gray-300" />
      </div>
    );
  }

  const rightPanelMode =
    editingId !== null ? "edit"
    : selectedId !== null ? "detail"
    : "create";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-900">3D Models</h1>
            <p className="text-xs text-gray-400 mt-0.5">{items.length} model{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={startNew}
            className="h-8 px-3.5 rounded-md bg-gray-900 text-white text-xs font-semibold
              hover:bg-gray-700 transition flex items-center gap-1.5"
          >
            <Plus className="size-3.5" />
            New Model
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-61px)]">
        {/* Left — model list */}
        <div className="w-72 border-r border-gray-200 bg-white overflow-y-auto shrink-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-6">
              <Box className="size-8 text-gray-200 mb-2" />
              <p className="text-sm text-gray-400">No models yet</p>
              <p className="text-xs text-gray-300 mt-0.5">Create one to get started</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => {
                const isActive = selectedId === item.id || editingId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => { setSelectedId(item.id); setEditingId(null); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left group transition
                        ${isActive ? "bg-gray-50" : "hover:bg-gray-50/70"}`}
                    >
                      {/* Thumbnail */}
                      <div className="size-10 rounded-md border border-gray-200 bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                        {isModelViewable(item.url) ? (
                          <model-viewer
                            src={item.url}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
                          />
                        ) : (
                          <Box className="size-4 text-gray-300" />
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate font-medium ${isActive ? "text-gray-900" : "text-gray-700"}`}>
                          {item.title}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">/{item.slug}</p>
                      </div>
                      {/* Row actions */}
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(item); }}
                          className="p-1.5 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                        >
                          <Pencil className="size-3" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); remove(item.id); }}
                          className="p-1.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                      {isActive && <ChevronRight className="size-3 text-gray-400 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Right — panel */}
        <div className="flex-1 overflow-y-auto">
          {rightPanelMode === "detail" && selected && (
            <div className="max-w-lg mx-auto py-8 px-6">
              {/* Model viewer */}
              <div className="w-full aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 mb-6">
                {isModelViewable(selected.url) ? (
                  <model-viewer
                    src={selected.url}
                    alt={selected.title}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    touch-action="pan-y"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="size-full flex flex-col items-center justify-center gap-2">
                    <Box className="size-10 text-gray-200" />
                    <p className="text-xs text-gray-400">External model</p>
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 underline flex items-center gap-1 hover:text-gray-900 transition"
                    >
                      Open URL <ExternalLink className="size-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">{selected.title}</h2>
                <p className="text-xs text-gray-400 mt-1">/{selected.slug}</p>
                {selected.description && (
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{selected.description}</p>
                )}
              </div>

              {/* Meta */}
              {(selected.meta_title || selected.keywords || selected.project_id) && (
                <div className="border border-gray-200 rounded-md divide-y divide-gray-100 mb-6">
                  {selected.meta_title && (
                    <div className="flex items-center gap-3 px-4 py-2.5">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase w-28 shrink-0">Meta Title</span>
                      <span className="text-sm text-gray-700 truncate">{selected.meta_title}</span>
                    </div>
                  )}
                  {selected.meta_description && (
                    <div className="flex items-start gap-3 px-4 py-2.5">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase w-28 shrink-0 pt-0.5">Meta Desc</span>
                      <span className="text-sm text-gray-700 line-clamp-2">{selected.meta_description}</span>
                    </div>
                  )}
                  {selected.keywords && (
                    <div className="flex items-center gap-3 px-4 py-2.5">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase w-28 shrink-0">Keywords</span>
                      <span className="text-sm text-gray-700 truncate">{selected.keywords}</span>
                    </div>
                  )}
                  {selected.project_id && (
                    <div className="flex items-center gap-3 px-4 py-2.5">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase w-28 shrink-0">Project</span>
                      <span className="text-sm text-gray-700">
                        {projects.find((p) => (p.id || p.slug) === selected.project_id)?.title ?? "—"}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {isModelViewable(selected.url) && (
                  <button
                    onClick={() => setPreviewUrl(selected.url)}
                    className="h-9 px-4 text-sm border border-gray-200 rounded-md text-gray-600
                      hover:bg-gray-50 hover:border-gray-300 transition flex items-center gap-1.5"
                  >
                    <Eye className="size-3.5" /> Preview
                  </button>
                )}
                <button
                  onClick={() => startEdit(selected)}
                  className="flex-1 h-9 rounded-md bg-gray-900 text-white text-sm font-semibold
                    hover:bg-gray-700 transition flex items-center justify-center gap-1.5"
                >
                  <Pencil className="size-3.5" /> Edit
                </button>
                <button
                  onClick={() => remove(selected.id)}
                  className="h-9 px-3 rounded-md border border-gray-200 text-red-400
                    hover:bg-red-50 hover:border-red-200 transition flex items-center gap-1.5"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          {(rightPanelMode === "create" || rightPanelMode === "edit") && (
            <div className="max-w-lg mx-auto py-8 px-6">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-gray-900">
                  {rightPanelMode === "create" ? "New Model" : "Edit Model"}
                </h2>
                {rightPanelMode === "edit" && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Editing: {items.find((i) => i.id === editingId)?.title}
                  </p>
                )}
              </div>

              <ModelForm
                form={form}
                projects={projects}
                saving={saving}
                fileRef={fileRef}
                onFieldChange={updateField}
                onFilePick={handleFilePick}
                onSubmit={rightPanelMode === "create" ? create : saveEdit}
                onCancel={() => { resetForm(); setEditingId(null); }}
                mode={rightPanelMode}
                slugTouched={slugTouched}
              />
            </div>
          )}

          {rightPanelMode === "detail" && !selected && (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <Box className="size-10 text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-400">Select a model</p>
              <p className="text-xs text-gray-300 mt-1">Choose from the list or create a new one</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative w-full max-w-2xl aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-3 right-3 z-10 size-7 rounded-md bg-white border border-gray-200
                flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition shadow-sm"
            >
              <X className="size-3.5" />
            </button>
            {isModelViewable(previewUrl) ? (
              <model-viewer
                src={previewUrl}
                alt="3D Model Preview"
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                touch-action="pan-y"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <iframe src={previewUrl} className="w-full h-full" title="3D Model Preview" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}