"use client";

import { useState } from "react";
import { Star, Plus, Pencil, Trash2 } from "lucide-react";
import { useAdminStore, type Review } from "@/stores/admin-store";

function genId() {
  return crypto.randomUUID();
}

function makeInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Stars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(s)}
          className={`${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"} transition`}
        >
          <Star className={`size-4 ${s <= value ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
        </button>
      ))}
    </div>
  );
}

const emptyForm: Review = {
  id: "", name: "", initials: "", role: "",
  quote: { en: "", np: "" }, rating: 5,
};

export default function AdminReviewsPage() {
  const { reviews, addReview, updateReview, deleteReview } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Review>({ ...emptyForm });

  const resetForm = () => setForm({ ...emptyForm });
  const startEdit = (item: Review) => {
    setForm({ ...item, quote: { ...item.quote } });
    setEditingId(item.id);
  };

  const save = () => {
    if (!form.name.trim() || !form.quote.en.trim()) return;
    const initials = form.initials.trim() || makeInitials(form.name);
    if (editingId) {
      updateReview(editingId, { ...form, initials });
    } else {
      addReview({ ...form, id: genId(), initials });
    }
    resetForm();
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Reviews</h1>
        <button
          onClick={() => { resetForm(); setEditingId(null); }}
          className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition"
        >
          <Plus className="size-4" /> New Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-light-gray/40">
          {reviews.length === 0 ? (
            <p className="text-sm text-mid-gray py-8 text-center">No reviews yet.</p>
          ) : (
            <div className="divide-y divide-light-gray/30">
              {reviews.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 group">
                  <div className="size-9 rounded-lg bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-xs font-bold text-brand-secondary shrink-0">
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Stars value={item.rating} />
                      <span className="text-[11px] text-mid-gray truncate">{item.role}</span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition">
                    <button onClick={() => startEdit(item)} className="p-1.5 rounded-md hover:bg-gray-200 text-mid-gray"><Pencil className="size-3.5" /></button>
                    <button onClick={() => deleteReview(item.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-400"><Trash2 className="size-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-light-gray/40 p-5">
          <h2 className="font-bold text-brand-dark mb-4">{editingId ? "Edit Review" : "New Review"}</h2>

          <div className="space-y-3 mb-5">
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, initials: editingId ? form.initials : makeInitials(e.target.value) })}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Initials</label>
              <input
                value={form.initials}
                onChange={(e) => setForm({ ...form, initials: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm font-mono"
                placeholder="Auto-generated from name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Role / Title</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Rating</label>
              <Stars value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Quote (EN)</label>
              <textarea
                value={form.quote.en}
                onChange={(e) => setForm({ ...form, quote: { ...form.quote, en: e.target.value } })}
                rows={4}
                className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Quote (NP)</label>
              <textarea
                value={form.quote.np}
                onChange={(e) => setForm({ ...form, quote: { ...form.quote, np: e.target.value } })}
                rows={4}
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
