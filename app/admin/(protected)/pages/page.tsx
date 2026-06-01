"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import { useAdminStore, type AdminPagePolicy } from "@/stores/admin-store";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

function genId() {
  return crypto.randomUUID();
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminPagesPage() {
  const { pages, addPage, updatePage, deletePage } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<AdminPagePolicy>({
    id: "", title: "", slug: "", content: "", metaTitle: "", metaDescription: "", createdAt: "",
  });

  const resetForm = () =>
    setForm({ id: "", title: "", slug: "", content: "", metaTitle: "", metaDescription: "", createdAt: "" });

  const startEdit = (item: AdminPagePolicy) => {
    setForm({ ...item });
    setEditingId(item.id);
  };

  const save = () => {
    if (!form.title.trim()) return;
    const slug = form.slug.trim() || toSlug(form.title);
    if (editingId) {
      updatePage(editingId, { ...form, slug });
    } else {
      addPage({ ...form, id: genId(), slug, createdAt: new Date().toISOString() });
    }
    resetForm();
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Pages</h1>
        <button
          onClick={() => { resetForm(); setEditingId(null); }}
          className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition"
        >
          <Plus className="size-4" /> New Page
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-light-gray/40">
          {pages.length === 0 ? (
            <p className="text-sm text-mid-gray py-8 text-center">No pages yet.</p>
          ) : (
            <div className="divide-y divide-light-gray/30">
              {pages.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 group">
                  <FileText className="size-4 text-mid-gray/30 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{item.title}</p>
                    <p className="text-xs text-mid-gray mt-0.5">/{item.slug}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition">
                    <button onClick={() => startEdit(item)} className="p-1.5 rounded-md hover:bg-gray-200 text-mid-gray"><Pencil className="size-3.5" /></button>
                    <button onClick={() => deletePage(item.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-400"><Trash2 className="size-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-light-gray/40 p-5">
          <h2 className="font-bold text-brand-dark mb-4">{editingId ? "Edit Page" : "New Page"}</h2>

          <div className="space-y-3 mb-5">
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value, slug: editingId ? form.slug : toSlug(e.target.value) })}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Content</label>
              <RichEditor
                value={form.content}
                onChange={(html) => setForm({ ...form, content: html })}
                minHeight={240}
              />
            </div>
          </div>

          <div className="space-y-3 mb-5 pt-4 border-t border-light-gray/40">
            <p className="text-sm font-semibold text-brand-secondary">SEO / Meta</p>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Meta Title</label>
              <input
                value={form.metaTitle}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Meta Description</label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none"
              />
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
      </div>
    </div>
  );
}
