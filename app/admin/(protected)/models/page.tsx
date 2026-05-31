"use client";

import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Upload, Eye, X, Box } from "lucide-react";
import { useAdminStore, type ModelItem } from "@/stores/admin-store";

function genId() {
  return crypto.randomUUID();
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function AdminModelsPage() {
  const { modelItems, projects, addModelItem, updateModelItem, deleteModelItem } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const emptyForm = (): ModelItem => ({
    id: "", url: "", title: "", slug: "", description: "", metaTitle: "", metaDescription: "", keywords: "", projectId: "",
  });

  const [form, setForm] = useState<ModelItem>(emptyForm());

  const resetForm = () => setForm(emptyForm());

  const startEdit = (item: ModelItem) => {
    setForm({ ...item });
    setEditingId(item.id);
    setSelectedId(null);
  };

  const startNew = () => {
    resetForm();
    setEditingId(null);
    setSelectedId(null);
  };

  const save = () => {
    if (!form.url.trim() || !form.title.trim()) return;
    if (editingId) {
      updateModelItem(editingId, form);
    } else {
      addModelItem({ ...form, id: genId() });
    }
    resetForm();
    setEditingId(null);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const dataUrl = await toBase64(file);
    setForm({ ...form, url: dataUrl });
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const selected = modelItems.find((m) => m.id === selectedId);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">3D Models</h1>
        <button onClick={startNew} className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition">
          <Plus className="size-4" /> New Model
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3">
          {modelItems.length === 0 ? (
            <p className="text-sm text-mid-gray py-8 text-center bg-white rounded-xl border border-light-gray/40">No 3D models yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {modelItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedId(item.id); setEditingId(null); }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-gray-100 group ${
                    selectedId === item.id ? "border-brand-primary" : "border-transparent"
                  }`}
                >
                  <div className="size-full flex items-center justify-center bg-gradient-to-br from-brand-dark/5 to-brand-secondary/10">
                    <Box className="size-12 text-brand-secondary/30" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                    <button onClick={(e) => { e.stopPropagation(); setPreviewUrl(item.url); }} className="p-1.5 rounded-md bg-white/90 text-brand-dark"><Eye className="size-3.5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); startEdit(item); }} className="p-1.5 rounded-md bg-white/90 text-brand-dark"><Pencil className="size-3.5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); deleteModelItem(item.id); }} className="p-1.5 rounded-md bg-white/90 text-red-500"><Trash2 className="size-3.5" /></button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-[11px] text-white truncate">{item.title}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Form / Detail */}
        <div className="lg:col-span-2">
          {editingId !== null || selectedId === null ? (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">{editingId ? "Edit Model" : "New Model"}</h2>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">3D Model File</label>
                  <div className="flex gap-2">
                    <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="flex-1 h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="URL or upload .glb" />
                    <input ref={fileRef} type="file" accept=".glb,.gltf" onChange={handleUpload} hidden />
                    <button onClick={() => fileRef.current?.click()} disabled={uploading} className="h-10 px-3 rounded-md border border-light-gray text-mid-gray hover:bg-gray-50 text-sm shrink-0">
                      {uploading ? "..." : <Upload className="size-4" />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Title</label>
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editingId ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Slug</label>
                    <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Meta Title</label>
                  <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Meta Description</label>
                  <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Keywords</label>
                  <input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="keyword1, keyword2" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Reference Project</label>
                  <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm">
                    <option value="">— None —</option>
                    {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>
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
          ) : selected ? (
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h2 className="font-bold text-brand-dark mb-4">Model Details</h2>
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-brand-dark/5 to-brand-secondary/10 border border-light-gray mb-4 flex items-center justify-center">
                <Box className="size-20 text-brand-secondary/20" />
              </div>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[11px] uppercase text-mid-gray">Title</dt><dd className="text-brand-dark font-medium">{selected.title}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Slug</dt><dd className="text-brand-dark">/{selected.slug}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Description</dt><dd className="text-brand-dark">{selected.description || "—"}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Meta Title</dt><dd className="text-brand-dark">{selected.metaTitle || "—"}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Meta Description</dt><dd className="text-brand-dark">{selected.metaDescription || "—"}</dd></div>
                <div><dt className="text-[11px] uppercase text-mid-gray">Keywords</dt><dd className="text-brand-dark">{selected.keywords || "—"}</dd></div>
                {selected.projectId && <div><dt className="text-[11px] uppercase text-mid-gray">Project</dt><dd className="text-brand-dark">{projects.find((p) => p.id === selected.projectId)?.title || "—"}</dd></div>}
              </dl>
              <button onClick={() => setPreviewUrl(selected.url)} className="mt-4 w-full h-10 rounded-lg border border-brand-primary text-brand-primary text-sm font-semibold hover:bg-brand-primary/5 transition flex items-center justify-center gap-2"><Eye className="size-4" /> View 3D</button>
              <button onClick={() => startEdit(selected)} className="mt-2 w-full h-10 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition">Edit</button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setPreviewUrl(null)}>
          <div className="relative w-full max-w-3xl aspect-square" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewUrl(null)} className="absolute -top-3 -right-3 size-8 rounded-full bg-white shadow-md flex items-center justify-center text-mid-gray hover:text-brand-dark z-10">
              <X className="size-4" />
            </button>
            <div className="w-full h-full rounded-xl overflow-hidden bg-black/40">
              <iframe src={previewUrl} className="w-full h-full" title="3D Model Preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
