"use client";

import { useState, useEffect } from "react";
import { Star, Plus, Trash2, Loader2, Pencil, Languages } from "lucide-react";
import { getAdminReviews, revalidateAdminTag } from "@/app/actions/admin-cache";
import { ReviewAdmin } from "@/api/services/review.service";
import { cn } from "@/lib/utils";
import type { Review, ReviewCreate } from "@/api/types/review.types";

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
          <Star key={s} className={`size-4 ${s <= value ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
        </button>
      ))}
    </div>
  );
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

const emptyForm: ReviewCreate = {
  name: "", initials: "", role: "",
  quote: { en: "", np: "" }, rating: 5,
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ReviewCreate>({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getAdminReviews().then((res) => setReviews(res.results ?? []));
  }, []);

  const resetForm = () => { setForm({ ...emptyForm }); setShowForm(false); };

  const startEdit = (item: Review) => {
    setForm({ name: item.name, initials: item.initials, role: item.role, quote: { ...item.quote }, rating: item.rating });
    setEditingId(item.id);
    setShowForm(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.quote.en.trim()) return;
    setSaving(true);
    try {
      const initials = form.initials.trim() || makeInitials(form.name);
      const payload = { ...form, initials };
      if (editingId) {
        await ReviewAdmin.update(editingId, payload);
      } else {
        await ReviewAdmin.create(payload);
      }
      await revalidateAdminTag('admin-reviews');
      const res = await getAdminReviews();
      setReviews(res.results ?? []);
      resetForm();
      setEditingId(null);
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    await ReviewAdmin.delete(id);
    await revalidateAdminTag('admin-reviews');
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Reviews</h1>
        <button
          onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }}
          className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition"
        >
          <Plus className="size-4" /> New Review
        </button>
      </div>

      {/* Form panel */}
      {showForm && (
        <div className="mb-6 bg-white rounded-xl border border-light-gray/40 p-5">
          <h2 className="font-bold text-brand-dark mb-4">{editingId ? "Edit Review" : "New Review"}</h2>
          <div className="grid sm:grid-cols-2 gap-x-5 gap-y-3 mb-5">
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
                placeholder="Auto-generated"
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
            <button
              onClick={save}
              disabled={saving}
              className="h-10 px-6 rounded-lg bg-brand-primary text-white text-sm font-semibold inline-flex items-center gap-2 hover:brightness-110 transition disabled:opacity-60"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              {saving ? "Saving…" : (editingId ? "Update" : "Create")}
            </button>
            <button onClick={() => { resetForm(); setEditingId(null); }} className="h-10 px-5 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-light-gray/40 p-12 text-center">
          <Star className="size-12 mx-auto text-light-gray mb-3" />
          <p className="text-sm text-mid-gray">No reviews yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => {
            const isExpanded = expandedId === r.id;
            return (
              <div
                key={r.id}
                className="bg-white rounded-xl border border-light-gray/40 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="px-5 py-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-600 shrink-0">
                      {r.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-brand-dark truncate">{r.name}</h3>
                      <Stars value={r.rating} />
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(r)}
                      className="p-2 rounded-lg text-mid-gray hover:text-brand-dark hover:bg-gray-100 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      onClick={() => remove(r.id)}
                      className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quote */}
                <div className="px-5 pb-4">
                  <p className="text-xs text-mid-gray mb-1.5">{r.role}</p>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : r.id)}
                    className="w-full text-left"
                  >
                    <p
                      className={cn(
                        "text-sm text-brand-dark leading-relaxed",
                        !isExpanded && "line-clamp-3"
                      )}
                    >
                      &ldquo;{r.quote.en}&rdquo;
                    </p>
                    {r.quote.en.length > 180 && (
                      <span className="inline-block mt-2 text-xs font-medium text-brand-primary hover:underline">
                        {isExpanded ? "Show less" : "Show more"}
                      </span>
                    )}
                  </button>
                  {r.quote.np && (
                    <div className="mt-3 pt-3 border-t border-light-gray/40">
                      <div className="flex items-center gap-1.5 text-xs text-mid-gray mb-1">
                        <Languages className="size-3" /> NP
                      </div>
                      <p className="text-sm text-brand-dark leading-relaxed">
                        &ldquo;{r.quote.np}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
