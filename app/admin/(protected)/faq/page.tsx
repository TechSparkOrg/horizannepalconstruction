"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { useAdminStore, type FaqItem } from "@/stores/admin-store";

function genId() {
  return crypto.randomUUID();
}

export default function AdminFaqPage() {
  const { faqItems, categories, addFaqItem, updateFaqItem, deleteFaqItem } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<FaqItem>({
    id: "", categoryId: "", questionEn: "", answerEn: "", questionNp: "", answerNp: "", order: 0,
  });

  const resetForm = () =>
    setForm({ id: "", categoryId: "", questionEn: "", answerEn: "", questionNp: "", answerNp: "", order: 0 });

  const startEdit = (item: FaqItem) => {
    setForm({ ...item });
    setEditingId(item.id);
  };

  const save = () => {
    if (!form.questionEn.trim() || !form.answerEn.trim() || !form.categoryId) return;
    if (editingId) {
      updateFaqItem(editingId, form);
    } else {
      addFaqItem({ ...form, id: genId() });
    }
    resetForm();
    setEditingId(null);
  };

  const getCategoryName = (id: string) => categories.find((c) => c.id === id)?.name || "—";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">FAQ</h1>
        <button
          onClick={() => { resetForm(); setEditingId(null); }}
          className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition"
        >
          <Plus className="size-4" /> New FAQ
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-light-gray/40">
          {faqItems.length === 0 ? (
            <p className="text-sm text-mid-gray py-8 text-center">No FAQs yet.</p>
          ) : (
            <div className="divide-y divide-light-gray/30">
              {faqItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 group">
                  <GripVertical className="size-4 text-mid-gray/30 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{item.questionEn}</p>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-[11px] bg-brand-secondary/10 text-brand-secondary px-2 py-0.5 rounded">{getCategoryName(item.categoryId)}</span>
                      <span className="text-[11px] text-mid-gray">#{item.order}</span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition">
                    <button onClick={() => startEdit(item)} className="p-1.5 rounded-md hover:bg-gray-200 text-mid-gray"><Pencil className="size-3.5" /></button>
                    <button onClick={() => deleteFaqItem(item.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-400"><Trash2 className="size-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-light-gray/40 p-5">
          {!editingId && faqItems.length > 0 && (
            <div className="mb-4 pb-4 border-b border-light-gray/40">
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Copy from existing</label>
              <select
                onChange={(e) => {
                  const src = faqItems.find((f) => f.id === e.target.value);
                  if (src) setForm({ ...src, id: "" });
                }}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
                defaultValue=""
              >
                <option value="">— Select to copy —</option>
                {faqItems.map((f) => (
                  <option key={f.id} value={f.id}>{f.questionEn}</option>
                ))}
              </select>
            </div>
          )}

          <h2 className="font-bold text-brand-dark mb-4">{editingId ? "Edit FAQ" : "New FAQ"}</h2>

          <div className="space-y-3 mb-5">
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Category</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm">
                <option value="">— Select Category —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Order</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <p className="text-sm font-semibold text-brand-secondary">English</p>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Question (EN)</label>
              <input value={form.questionEn} onChange={(e) => setForm({ ...form, questionEn: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Answer (EN)</label>
              <textarea value={form.answerEn} onChange={(e) => setForm({ ...form, answerEn: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <p className="text-sm font-semibold text-brand-secondary">नेपाली</p>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">प्रश्न (NP)</label>
              <input value={form.questionNp} onChange={(e) => setForm({ ...form, questionNp: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">जवाफ (NP)</label>
              <textarea value={form.answerNp} onChange={(e) => setForm({ ...form, answerNp: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
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
