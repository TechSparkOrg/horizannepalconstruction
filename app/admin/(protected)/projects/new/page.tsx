"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2, Upload, ImageIcon, Eye, Box, X } from "lucide-react";
import { useAdminStore, type AdminProject } from "@/stores/admin-store";
import RichEditor from "@/components/admin/RichEditor";

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function toDateInput(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject, projects, categories, mediaItems, modelItems } = useAdminStore();
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState<"thumbnail" | "images" | "gallery" | null>(null);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [pickerIdx, setPickerIdx] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const modelFileRef = useRef<HTMLInputElement>(null);

  const galleryImages = mediaItems.filter((m) => !m.banner);

  const [form, setForm] = useState<Partial<AdminProject>>({
    title: "", slug: "", categoryId: "", file: "", location: "", startDate: "", completion: "", thumbnail: "", description: "",
    images: [""], materials: [{ name: "", desc: "" }], costEstimation: [{ item: "", amount: "" }],
    specs: [{ label: "", value: "" }], gallery: [""], socialLinks: [],
  });

  const update = <K extends keyof AdminProject>(key: K, value: AdminProject[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "thumbnail" | "file") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await toBase64(file);
    update(field, dataUrl);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleModelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await toBase64(file);
    update("file", dataUrl);
    if (modelFileRef.current) modelFileRef.current.value = "";
  };

  const save = () => {
    setSaving(true);
    const project: AdminProject = {
      id: crypto.randomUUID(),
      title: form.title || "",
      slug: form.slug || "",
      categoryId: form.categoryId || "",
      file: form.file || "",
      location: form.location || "",
      startDate: form.startDate || "",
      completion: form.completion || "",
      thumbnail: form.thumbnail || "",
      description: form.description || "",
      images: form.images?.filter(Boolean) || [],
      materials: form.materials?.filter((m) => m.name) || [],
      costEstimation: form.costEstimation?.filter((c) => c.item) || [],
      specs: form.specs?.filter((s) => s.label) || [],
      gallery: form.gallery?.filter(Boolean) || [],
      socialLinks: form.socialLinks || [],
    };
    addProject(project);
    router.push("/admin/projects");
  };

  return (
    <div>
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-mid-gray hover:text-brand-dark mb-4 transition">
        <ArrowLeft className="size-4" /> Back
      </button>

      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl text-brand-dark">New Project</h1>
        <button onClick={save} disabled={saving} className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition disabled:opacity-50">
          <Save className="size-4" /> {saving ? "Saving..." : "Save Project"}
        </button>
      </div>

      <div className="mt-6 max-w-3xl space-y-6">
        {/* Copy from existing */}
        {projects.length > 0 && (
          <div className="pb-4 border-b border-light-gray/40">
            <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Copy from existing</label>
            <select
              onChange={(e) => {
                const src = projects.find((p) => p.id === e.target.value);
                if (src) {
                  const { id, ...rest } = src;
                  setForm(rest);
                }
              }}
              className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
              defaultValue=""
            >
              <option value="">— Select to copy —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Basic Fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title" value={form.title || ""} onChange={(v) => { update("title", v); update("slug", v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")); }} />
          <Field label="Slug" value={form.slug || ""} onChange={(v) => update("slug", v)} />
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Category</label>
            <select value={form.categoryId || ""} onChange={(e) => update("categoryId", e.target.value)} className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-sm">
              <option value="">— None —</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <Field label="Location" value={form.location || ""} onChange={(v) => update("location", v)} />
          <DateField label="Start Date" value={form.startDate || ""} onChange={(v) => update("startDate", v)} />
          <DateField label="Completion Date" value={form.completion || ""} onChange={(v) => update("completion", v)} />
        </div>

        {/* GLB Model */}
        <div className="bg-off-white rounded-xl p-5 border border-light-gray/40">
          <h3 className="font-bold text-brand-dark text-sm mb-3">3D Model</h3>
          <div className="flex gap-2">
            <input value={form.file || ""} onChange={(e) => update("file", e.target.value)} className="flex-1 h-10 px-3 rounded-md border border-light-gray bg-white text-sm" placeholder="URL or upload .glb" />
            <input ref={modelFileRef} type="file" accept=".glb,.gltf" onChange={handleModelUpload} hidden />
            <button onClick={() => modelFileRef.current?.click()} className="h-10 px-3 rounded-md border border-light-gray bg-white text-mid-gray hover:bg-gray-50 text-sm shrink-0"><Upload className="size-4" /></button>
            <button onClick={() => setShowModelPicker(!showModelPicker)} className="h-10 px-3 rounded-md border border-light-gray bg-white text-mid-gray hover:bg-gray-50 text-sm shrink-0"><Box className="size-4" /></button>
          </div>
          {showModelPicker && modelItems.length > 0 && (
            <div className="mt-2 grid grid-cols-5 gap-1.5 max-h-28 overflow-y-auto">
              {modelItems.map((m) => (
                <button key={m.id} onClick={() => { update("file", m.url); setShowModelPicker(false); }} className={`aspect-square rounded overflow-hidden border-2 bg-gray-100 ${form.file === m.url ? "border-brand-primary" : "border-transparent"}`}>
                  <div className="size-full flex items-center justify-center bg-gradient-to-br from-brand-dark/5 to-brand-secondary/10"><Box className="size-6 text-brand-secondary/30" /></div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail */}
        <div className="bg-off-white rounded-xl p-5 border border-light-gray/40">
          <h3 className="font-bold text-brand-dark text-sm mb-3">Thumbnail</h3>
          <div className="flex gap-2">
            <input value={form.thumbnail || ""} onChange={(e) => update("thumbnail", e.target.value)} className="flex-1 h-10 px-3 rounded-md border border-light-gray bg-white text-sm" placeholder="URL or upload" />
            <input ref={fileRef} type="file" accept="image/*" onChange={(e) => handleUpload(e, "thumbnail")} hidden />
            <button onClick={() => fileRef.current?.click()} className="h-10 px-3 rounded-md border border-light-gray bg-white text-mid-gray hover:bg-gray-50 text-sm shrink-0"><Upload className="size-4" /></button>
            <button onClick={() => setShowMediaPicker(showMediaPicker === "thumbnail" ? null : "thumbnail")} className="h-10 px-3 rounded-md border border-light-gray bg-white text-mid-gray hover:bg-gray-50 text-sm shrink-0"><ImageIcon className="size-4" /></button>
            {form.thumbnail && <button onClick={() => setPreviewUrl(form.thumbnail!)} className="h-10 px-3 rounded-md border border-light-gray bg-white text-mid-gray hover:bg-gray-50 text-sm shrink-0"><Eye className="size-4" /></button>}
          </div>
          {showMediaPicker === "thumbnail" && galleryImages.length > 0 && (
            <div className="mt-2 grid grid-cols-5 gap-1.5 max-h-28 overflow-y-auto">
              {galleryImages.map((m) => (
                <button key={m.id} onClick={() => { update("thumbnail", m.url); setShowMediaPicker(null); }} className={`aspect-video rounded overflow-hidden border-2 ${form.thumbnail === m.url ? "border-brand-primary" : "border-transparent"}`}>
                  <img src={m.url} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {form.thumbnail && (
            <div className="mt-2 aspect-video rounded-lg overflow-hidden bg-gray-100 border border-light-gray">
              <img src={form.thumbnail} alt="" className="size-full object-cover" />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Description</label>
          <RichEditor value={form.description || ""} onChange={(v) => update("description", v)} />
        </div>

        {/* Images */}
        <div className="bg-off-white rounded-xl p-5 border border-light-gray/40">
          <h3 className="font-bold text-brand-dark text-sm mb-3">Images</h3>
          {(form.images || [""]).map((item, i) => (
            <div key={i} className="flex gap-2 mb-3">
              <input value={item} onChange={(e) => { const a = [...(form.images || [""])]; a[i] = e.target.value; update("images", a); }} className="flex-1 h-10 px-3 rounded-md border border-light-gray bg-white text-sm" placeholder="URL or upload" />
              <button onClick={() => { setShowMediaPicker(showMediaPicker === "images" ? null : "images"); setPickerIdx(i); }} className="h-10 px-3 rounded-md border border-light-gray bg-white text-mid-gray hover:bg-gray-50 shrink-0"><ImageIcon className="size-4" /></button>
              {item && <button onClick={() => setPreviewUrl(item)} className="h-10 px-3 rounded-md border border-light-gray bg-white text-mid-gray hover:bg-gray-50 shrink-0"><Eye className="size-4" /></button>}
              <button onClick={() => update("images", (form.images || []).filter((_, j) => j !== i))} className="size-10 grid place-items-center text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="size-4" /></button>
            </div>
          ))}
          {showMediaPicker === "images" && galleryImages.length > 0 && (
            <div className="mb-2 grid grid-cols-5 gap-1.5 max-h-28 overflow-y-auto">
              {galleryImages.map((m) => (
                <button key={m.id} onClick={() => { const a = [...(form.images || [""])]; a[pickerIdx!] = m.url; update("images", a); setShowMediaPicker(null); }} className={`aspect-video rounded overflow-hidden border-2 ${form.images?.[pickerIdx!] === m.url ? "border-brand-primary" : "border-transparent"}`}>
                  <img src={m.url} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <button onClick={() => update("images", [...(form.images || [""]), ""])} className="flex items-center gap-1.5 text-sm font-semibold text-brand-primary"><Plus className="size-4" />Add Image</button>
        </div>

        {/* Materials */}
        <div className="bg-off-white rounded-xl p-5 border border-light-gray/40">
          <h3 className="font-bold text-brand-dark text-sm mb-3">Materials</h3>
          {(form.materials || []).map((m, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <input value={m.name} onChange={(e) => { const a = [...(form.materials || [])]; a[i] = { ...a[i], name: e.target.value }; update("materials", a); }} placeholder="Material name" className="flex-1 h-10 px-3 rounded-md border border-light-gray bg-white text-sm" />
              <input value={m.desc} onChange={(e) => { const a = [...(form.materials || [])]; a[i] = { ...a[i], desc: e.target.value }; update("materials", a); }} placeholder="Description" className="flex-1 h-10 px-3 rounded-md border border-light-gray bg-white text-sm" />
              <button onClick={() => update("materials", (form.materials || []).filter((_, j) => j !== i))} className="size-10 grid place-items-center text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="size-4" /></button>
            </div>
          ))}
          <button onClick={() => update("materials", [...(form.materials || []), { name: "", desc: "" }])} className="flex items-center gap-1.5 text-sm font-semibold text-brand-primary"><Plus className="size-4" />Add Material</button>
        </div>

        {/* Cost Estimation */}
        <div className="bg-off-white rounded-xl p-5 border border-light-gray/40">
          <h3 className="font-bold text-brand-dark text-sm mb-3">Cost Estimation</h3>
          {(form.costEstimation || []).map((c, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <input value={c.item} onChange={(e) => { const a = [...(form.costEstimation || [])]; a[i] = { ...a[i], item: e.target.value }; update("costEstimation", a); }} placeholder="Item" className="flex-1 h-10 px-3 rounded-md border border-light-gray bg-white text-sm" />
              <input value={c.amount} onChange={(e) => { const a = [...(form.costEstimation || [])]; a[i] = { ...a[i], amount: e.target.value }; update("costEstimation", a); }} placeholder="NPR X,XX,XXX" className="flex-1 h-10 px-3 rounded-md border border-light-gray bg-white text-sm" />
              <button onClick={() => update("costEstimation", (form.costEstimation || []).filter((_, j) => j !== i))} className="size-10 grid place-items-center text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="size-4" /></button>
            </div>
          ))}
          <button onClick={() => update("costEstimation", [...(form.costEstimation || []), { item: "", amount: "" }])} className="flex items-center gap-1.5 text-sm font-semibold text-brand-primary"><Plus className="size-4" />Add Cost Item</button>
        </div>

        {/* Specs */}
        <div className="bg-off-white rounded-xl p-5 border border-light-gray/40">
          <h3 className="font-bold text-brand-dark text-sm mb-3">Specifications</h3>
          {(form.specs || []).map((s, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <input value={s.label} onChange={(e) => { const a = [...(form.specs || [])]; a[i] = { ...a[i], label: e.target.value }; update("specs", a); }} placeholder="Label" className="flex-1 h-10 px-3 rounded-md border border-light-gray bg-white text-sm" />
              <input value={s.value} onChange={(e) => { const a = [...(form.specs || [])]; a[i] = { ...a[i], value: e.target.value }; update("specs", a); }} placeholder="Value" className="flex-1 h-10 px-3 rounded-md border border-light-gray bg-white text-sm" />
              <button onClick={() => update("specs", (form.specs || []).filter((_, j) => j !== i))} className="size-10 grid place-items-center text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="size-4" /></button>
            </div>
          ))}
          <button onClick={() => update("specs", [...(form.specs || []), { label: "", value: "" }])} className="flex items-center gap-1.5 text-sm font-semibold text-brand-primary"><Plus className="size-4" />Add Spec</button>
        </div>
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setPreviewUrl(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewUrl(null)} className="absolute -top-3 -right-3 size-8 rounded-full bg-white shadow-md flex items-center justify-center text-mid-gray hover:text-brand-dark z-10"><X className="size-4" /></button>
            <img src={previewUrl} alt="" className="w-full h-full object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-dark mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
    </div>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-dark mb-1">{label}</label>
      <input type="date" value={toDateInput(value)} onChange={(e) => onChange(e.target.value)} className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-sm" />
    </div>
  );
}
