"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ChevronRight, ChevronDown, GripVertical, Loader2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useAdminStore, type AdminCategory, type SubService } from "@/stores/admin-store";
import { CategoryAdmin } from "@/api/services/category.service";
import { toSlug } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const { categories, setCategories } = useAdminStore(useShallow((s) => ({
    categories: s.categories,
    setCategories: s.setCategories,
  })));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const rootCategories = categories.filter((c) => !c.parentId);
  const childrenOf = (parentId: string) => categories.filter((c) => c.parentId === parentId);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const [form, setForm] = useState<AdminCategory>({
    id: "",
    name: "",
    nameNp: "",
    slug: "",
    iconName: "",
    parentId: null,
    services: [],
  });

  const resetForm = () =>
    setForm({ id: "", name: "", nameNp: "", slug: "", iconName: "", parentId: null, services: [] });

  const startEdit = (cat: AdminCategory) => {
    setForm({ ...cat, services: [...cat.services] });
    setEditingId(cat.id);
  };

  function toPayload() {
    return {
      name: form.name,
      name_np: form.nameNp,
      icon_name: form.iconName,
      parent_id: form.parentId,
      services: form.services,
    };
  }

  const refetchList = () =>
    CategoryAdmin.list().then((r) =>
      setCategories(
        (r.results ?? []).map((c) => ({
          id: c.id,
          name: c.name,
          nameNp: c.name_np ?? "",
          slug: c.slug,
          iconName: c.icon_name ?? "",
          parentId: c.parent_id,
          services: c.services ?? [],
        }))
      )
    );

  const save = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        await CategoryAdmin.update(editingId, toPayload());
        toast.success("Category updated");
      } else {
        await CategoryAdmin.create(toPayload());
        toast.success("Category created");
      }
      await refetchList();
      resetForm();
      setEditingId(null);
    } catch {
      toast.error("Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    setSaving(true);
    try {
      await CategoryAdmin.delete(id);
      await refetchList();
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    } finally {
      setSaving(false);
    }
  };

  const addService = () => {
    setForm({ ...form, services: [...form.services, { name: "", description: "" }] });
  };

  const updateService = (i: number, field: keyof SubService, value: string) => {
    const s = [...form.services];
    s[i] = { ...s[i], [field]: value };
    setForm({ ...form, services: s });
  };

  const removeService = (i: number) => {
    setForm({ ...form, services: form.services.filter((_, j) => j !== i) });
  };

  const renderCategory = (cat: AdminCategory, depth: number = 0) => {
    const kids = childrenOf(cat.id);
    const isOpen = expanded.has(cat.id);

    return (
      <div key={cat.id}>
        <div
          className="flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 rounded-lg group"
          style={{ paddingLeft: `${12 + depth * 24}px` }}
        >
          {kids.length > 0 ? (
            <button onClick={() => toggleExpand(cat.id)} className="text-mid-gray shrink-0">
              {isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            </button>
          ) : (
            <span className="size-4 shrink-0" />
          )}
          <GripVertical className="size-4 text-mid-gray/30 shrink-0" />
          <span className="flex-1 text-sm font-medium text-brand-dark">{cat.name}</span>
          <span className="text-xs text-mid-gray">/{cat.slug}</span>
          <span className="text-xs text-mid-gray bg-gray-100 px-2 py-0.5 rounded">{cat.services.length} services</span>
          <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition">
            <button onClick={() => startEdit(cat)} disabled={saving} className="p-1.5 rounded-md hover:bg-gray-200 text-mid-gray disabled:opacity-30"><Pencil className="size-3.5" /></button>
            <button onClick={() => remove(cat.id)} disabled={saving} className="p-1.5 rounded-md hover:bg-red-50 text-red-400 disabled:opacity-30"><Trash2 className="size-3.5" /></button>
          </div>
        </div>
        {isOpen && kids.map((k) => renderCategory(k, depth + 1))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Categories</h1>
        <button
          onClick={() => { resetForm(); setEditingId(null); }}
          disabled={saving}
          className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition disabled:opacity-60"
        >
          <Plus className="size-4" /> New Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-light-gray/40 p-4">
          {rootCategories.length === 0 ? (
            <p className="text-sm text-mid-gray py-8 text-center">No categories yet. Create one to get started.</p>
          ) : (
            rootCategories.map((cat) => renderCategory(cat))
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-light-gray/40 p-5">
          <h2 className="font-bold text-brand-dark mb-4">{editingId ? "Edit Category" : "New Category"}</h2>

          <div className="space-y-3 mb-5">
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Name (English)</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: toSlug(e.target.value) })}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Name (Nepali)</label>
              <input
                value={form.nameNp}
                onChange={(e) => setForm({ ...form, nameNp: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
                placeholder="e.g. आवासीय"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Slug</label>
              <input
                value={form.slug}
                readOnly
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm bg-gray-50 text-mid-gray"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Icon Name</label>
              <input
                value={form.iconName}
                onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
                placeholder="e.g. Home, Building2"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Parent Category</label>
              <select
                value={form.parentId || ""}
                onChange={(e) => setForm({ ...form, parentId: e.target.value || null })}
                className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
              >
                <option value="">— None (Root) —</option>
                {categories.filter((c) => c.id !== editingId).map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Services */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-brand-dark">Services</h3>
              <button onClick={addService} className="text-xs text-brand-primary font-semibold hover:underline">+ Add Service</button>
            </div>
            {form.services.length === 0 && (
              <p className="text-xs text-mid-gray">No services added yet.</p>
            )}
            {form.services.map((svc, i) => (
              <div key={i} className="mb-2 p-3 rounded-lg bg-gray-50 border border-light-gray/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-mid-gray uppercase">Service {i + 1}</span>
                  <button onClick={() => removeService(i)} className="text-xs text-red-400 hover:text-red-500">Remove</button>
                </div>
                <input
                  value={svc.name}
                  onChange={(e) => updateService(i, "name", e.target.value)}
                  placeholder="Service name"
                  className="w-full h-9 px-3 rounded-md border border-light-gray text-sm mb-1.5"
                />
                <textarea
                  value={svc.description}
                  onChange={(e) => updateService(i, "description", e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={saving}
              className="flex-1 h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-60"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              {saving ? "Saving…" : (editingId ? "Update" : "Create")}
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
