"use client";

import { useState, useEffect, useRef } from "react";
import { Save, Plus, Trash2, Globe, FileText, GripVertical, Loader2, Upload, X } from "lucide-react";
import { PageService } from "@/api/services/page.service";
import { PageSectionService } from "@/api/services/page-section.service";
import { MediaService } from "@/api/services/media.service";
import type { Page as ApiPage, PageSection, PageSectionCreate } from "@/api/types/page.types";
import dynamic from "next/dynamic";
import { DynamicIcon } from "@/components/DynamicIcon";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

const LUCIDE_ICONS = [
  "Building2", "Ruler", "ClipboardList", "Armchair", "Package", "ShieldCheck",
  "Home", "Hotel", "Map", "Trees", "Landmark", "Building", "Globe",
  "Star", "Heart", "Zap", "Sun", "Moon", "Compass", "MapPin",
  "Phone", "Mail", "MessageCircle", "HelpCircle", "Info", "AlertCircle",
  "CheckCircle", "ArrowRight", "ArrowLeft", "ChevronRight", "ChevronDown",
  "Menu", "X", "Search", "Settings", "Users", "User", "Calendar",
  "Clock", "DollarSign", "ShoppingCart", "Camera", "Image", "Video",
  "Music", "FileText", "BookOpen", "Award", "Target", "TrendingUp",
  "BarChart", "PieChart", "Layout", "Grid", "List", "Square", "Circle",
  "Activity", "RefreshCw", "Share2", "Download", "Upload", "Trash2",
  "Edit", "Plus", "Minus", "MoreHorizontal", "MoreVertical", "Link",
];

export default function AdminContentManagement() {
  const [pages, setPages] = useState<ApiPage[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [pageForm, setPageForm] = useState({
    title: "", titleNp: "", content: "", contentNp: "",
    iconName: "", metaTitle: "", metaTitleNp: "",
    metaDescription: "", metaDescriptionNp: "",
  });
  const [sections, setSections] = useState<PageSection[]>([]);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"en" | "np">("en");
  const [sectionTab, setSectionTab] = useState<"en" | "np">("en");
  const [sectionSaving, setSectionSaving] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [sectionForm, setSectionForm] = useState({
    sectionKey: "", titleEn: "", titleNp: "", contentEn: "", contentNp: "", iconName: "", images: [] as string[], sortOrder: 0,
  });
  const [sectionUploading, setSectionUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    PageService.adminList().then((res) => setPages(res.results ?? []));
  }, []);

  const loadPage = async (slug: string) => {
    if (!slug) return;
    try {
      const page = await PageService.adminGet(slug);
      setPageForm({
        title: page.title, titleNp: page.title_np,
        content: page.content, contentNp: page.content_np,
        iconName: page.icon_name,
        metaTitle: page.meta_title, metaTitleNp: page.meta_title_np,
        metaDescription: page.meta_description, metaDescriptionNp: page.meta_description_np,
      });
      const res = await PageSectionService.adminList(slug);
      setSections(res.results ?? []);
    } catch { setPageForm({
      title: "", titleNp: "", content: "", contentNp: "",
      iconName: "", metaTitle: "", metaTitleNp: "",
      metaDescription: "", metaDescriptionNp: "",
    }); setSections([]); }
  };

  const savePage = async () => {
    if (!selectedSlug) return;
    setSaving(true);
    try {
      await PageService.update(selectedSlug, {
        title: pageForm.title, title_np: pageForm.titleNp,
        content: pageForm.content, content_np: pageForm.contentNp,
        icon_name: pageForm.iconName,
        meta_title: pageForm.metaTitle, meta_title_np: pageForm.metaTitleNp,
        meta_description: pageForm.metaDescription, meta_description_np: pageForm.metaDescriptionNp,
      });
    } finally { setSaving(false); }
  };

  const selectPage = (slug: string) => {
    setSelectedSlug(slug);
    loadPage(slug);
  };

  const resetSectionForm = () => setSectionForm({
    sectionKey: "", titleEn: "", titleNp: "", contentEn: "", contentNp: "", iconName: "", images: [], sortOrder: sections.length,
  });

  const startEditSection = (s: PageSection) => {
    setEditingSection(s);
    setSectionForm({
      sectionKey: s.section_key, titleEn: s.title_en, titleNp: s.title_np,
      contentEn: s.content_en, contentNp: s.content_np,
      iconName: s.icon_name, images: s.images ?? [], sortOrder: s.sort_order,
    });
  };

  const saveSection = async () => {
    if (!selectedSlug || !sectionForm.sectionKey) return;
    setSectionSaving(true);
    try {
      const payload: PageSectionCreate = {
        page: selectedSlug,
        section_key: sectionForm.sectionKey,
        title_en: sectionForm.titleEn,
        title_np: sectionForm.titleNp,
        content_en: sectionForm.contentEn,
        content_np: sectionForm.contentNp,
        icon_name: sectionForm.iconName,
        images: sectionForm.images,
        sort_order: sectionForm.sortOrder,
      };
      if (editingSection) {
        await PageSectionService.update(editingSection.id, payload);
      } else {
        await PageSectionService.create(payload);
      }
      const res = await PageSectionService.adminList(selectedSlug);
      setSections(res.results ?? []);
      resetSectionForm();
      setEditingSection(null);
    } finally { setSectionSaving(false); }
  };

  const handleSectionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSectionUploading(true);
    try {
      const item = await MediaService.uploadImage(file, { alt: sectionForm.sectionKey || "section image" });
      setSectionForm((p) => ({ ...p, images: [...p.images, item.url] }));
    } finally {
      setSectionUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeSectionImage = (index: number) => {
    setSectionForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== index) }));
  };

  const deleteSection = async (id: string) => {
    try {
      await PageSectionService.delete(id);
      setSections((prev) => prev.filter((s) => s.id !== id));
      if (editingSection?.id === id) { resetSectionForm(); setEditingSection(null); }
    } catch {}
  };

  const selected = pages.find((p) => p.slug === selectedSlug);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-brand-dark">Content Management</h1>

      {/* Page selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-mid-gray shrink-0">Select Page:</label>
        <select
          value={selectedSlug}
          onChange={(e) => selectPage(e.target.value)}
          className="flex-1 max-w-sm rounded-lg border border-light-gray/60 bg-white px-3 py-2 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
        >
          <option value="">— Choose a page —</option>
          {pages.map((p) => (
            <option key={p.slug} value={p.slug}>{p.title} ({p.slug})</option>
          ))}
        </select>
      </div>

      {selected && (
        <>
          {/* Page Content */}
          <section className="bg-white rounded-xl border border-light-gray/40 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                <FileText className="size-5" />
                Page Content
              </h2>
              <button onClick={savePage} disabled={saving}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                Save Page
              </button>
            </div>

            {/* Language tabs */}
            <div className="flex gap-2 border-b border-light-gray/30 pb-2">
              <button onClick={() => setTab("en")} className={`px-4 py-1.5 text-sm font-medium rounded-t transition ${tab === "en" ? "bg-brand-primary text-white" : "text-mid-gray hover:text-brand-dark"}`}>
                <Globe className="size-3.5 inline mr-1" />English
              </button>
              <button onClick={() => setTab("np")} className={`px-4 py-1.5 text-sm font-medium rounded-t transition ${tab === "np" ? "bg-brand-primary text-white" : "text-mid-gray hover:text-brand-dark"}`}>
                <Globe className="size-3.5 inline mr-1" />नेपाली
              </button>
            </div>

            {tab === "en" ? (
              <>
                <input type="text" value={pageForm.title} onChange={(e) => setPageForm((p) => ({ ...p, title: e.target.value }))} placeholder="Page Title (EN)" className="w-full rounded-lg border border-light-gray/60 px-3 py-2 text-sm" />
                <div><RichEditor value={pageForm.content} onChange={(html: string) => setPageForm((p) => ({ ...p, content: html }))} /></div>
              </>
            ) : (
              <>
                <input type="text" value={pageForm.titleNp} onChange={(e) => setPageForm((p) => ({ ...p, titleNp: e.target.value }))} placeholder="पृष्ठ शीर्षक (NP)" className="w-full rounded-lg border border-light-gray/60 px-3 py-2 text-sm" />
                <div><RichEditor value={pageForm.contentNp} onChange={(html: string) => setPageForm((p) => ({ ...p, contentNp: html }))} /></div>
              </>
            )}

            {/* Icon selector */}
            <div>
              <label className="text-xs font-medium text-mid-gray mb-1 block">Icon</label>
              <div className="flex items-center gap-3">
                <select value={pageForm.iconName} onChange={(e) => setPageForm((p) => ({ ...p, iconName: e.target.value }))}
                  className="flex-1 rounded-lg border border-light-gray/60 px-3 py-2 text-sm">
                  <option value="">None</option>
                  {LUCIDE_ICONS.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                {pageForm.iconName && (
                  <div className="size-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    <DynamicIcon name={pageForm.iconName} className="size-5 text-brand-primary" />
                  </div>
                )}
              </div>
            </div>

            {/* SEO fields */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-off-white rounded-xl">
              <div>
                <label className="text-xs font-medium text-mid-gray">Meta Title (EN)</label>
                <input type="text" value={pageForm.metaTitle} onChange={(e) => setPageForm((p) => ({ ...p, metaTitle: e.target.value }))} className="w-full mt-1 rounded-lg border border-light-gray/60 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-mid-gray">Meta Title (NP)</label>
                <input type="text" value={pageForm.metaTitleNp} onChange={(e) => setPageForm((p) => ({ ...p, metaTitleNp: e.target.value }))} className="w-full mt-1 rounded-lg border border-light-gray/60 px-3 py-2 text-sm" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-mid-gray">Meta Description (EN)</label>
                <textarea value={pageForm.metaDescription} onChange={(e) => setPageForm((p) => ({ ...p, metaDescription: e.target.value }))} rows={2} className="w-full mt-1 rounded-lg border border-light-gray/60 px-3 py-2 text-sm" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-mid-gray">Meta Description (NP)</label>
                <textarea value={pageForm.metaDescriptionNp} onChange={(e) => setPageForm((p) => ({ ...p, metaDescriptionNp: e.target.value }))} rows={2} className="w-full mt-1 rounded-lg border border-light-gray/60 px-3 py-2 text-sm" />
              </div>
            </div>
          </section>

          {/* Page Sections */}
          <section className="bg-white rounded-xl border border-light-gray/40 p-6 space-y-5">
            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <GripVertical className="size-5" />
              Page Sections
            </h2>

            {/* Section list */}
            {sections.length > 0 && (
              <div className="space-y-2">
                {sections.map((s) => (
                  <div key={s.id} className="flex items-center justify-between bg-off-white rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {s.icon_name && <DynamicIcon name={s.icon_name} className="size-5 text-brand-primary shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-brand-dark truncate">{s.title_en || s.section_key}</p>
                        <p className="text-xs text-mid-gray">{s.section_key}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => startEditSection(s)} className="text-xs text-brand-primary hover:underline">Edit</button>
                      <button onClick={() => deleteSection(s.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Section form */}
            <div className="border border-light-gray/30 rounded-xl p-4 space-y-4">
              <h3 className="text-sm font-semibold text-brand-dark">
                {editingSection ? "Edit Section" : "New Section"}
              </h3>
              <input type="text" value={sectionForm.sectionKey} onChange={(e) => setSectionForm((p) => ({ ...p, sectionKey: e.target.value }))}
                placeholder="Section key (e.g. hero, features, cta)" className="w-full rounded-lg border border-light-gray/60 px-3 py-2 text-sm"
                disabled={!!editingSection}
              />

              <div className="flex gap-2 border-b border-light-gray/30 pb-2">
                <button onClick={() => setSectionTab("en")} className={`px-3 py-1 text-xs font-medium rounded-t transition ${sectionTab === "en" ? "bg-brand-primary text-white" : "text-mid-gray"}`}>English</button>
                <button onClick={() => setSectionTab("np")} className={`px-3 py-1 text-xs font-medium rounded-t transition ${sectionTab === "np" ? "bg-brand-primary text-white" : "text-mid-gray"}`}>नेपाली</button>
              </div>

              {sectionTab === "en" ? (
                <>
                  <input type="text" value={sectionForm.titleEn} onChange={(e) => setSectionForm((p) => ({ ...p, titleEn: e.target.value }))} placeholder="Title (EN)" className="w-full rounded-lg border border-light-gray/60 px-3 py-2 text-sm" />
                  <div><RichEditor value={sectionForm.contentEn} onChange={(html: string) => setSectionForm((p) => ({ ...p, contentEn: html }))} /></div>
                </>
              ) : (
                <>
                  <input type="text" value={sectionForm.titleNp} onChange={(e) => setSectionForm((p) => ({ ...p, titleNp: e.target.value }))} placeholder="शीर्षक (NP)" className="w-full rounded-lg border border-light-gray/60 px-3 py-2 text-sm" />
                  <div><RichEditor value={sectionForm.contentNp} onChange={(html: string) => setSectionForm((p) => ({ ...p, contentNp: html }))} /></div>
                </>
              )}

              <div className="flex items-center gap-3">
                <select value={sectionForm.iconName} onChange={(e) => setSectionForm((p) => ({ ...p, iconName: e.target.value }))} className="flex-1 rounded-lg border border-light-gray/60 px-3 py-2 text-sm">
                  <option value="">No icon</option>
                  {LUCIDE_ICONS.map((name) => (<option key={name} value={name}>{name}</option>))}
                </select>
                {sectionForm.iconName && <DynamicIcon name={sectionForm.iconName} className="size-5 text-brand-primary" />}
              </div>

              {/* Images */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-mid-gray block">Images</label>
                {sectionForm.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {sectionForm.images.map((url, i) => (
                      <div key={i} className="relative group aspect-[4/3] rounded-lg overflow-hidden border border-light-gray/30">
                        <img src={url} alt="" className="size-full object-cover" />
                        <button type="button" onClick={() => removeSectionImage(i)}
                          className="absolute top-1 right-1 size-5 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        ><X className="size-3" /></button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleSectionImageUpload} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={sectionUploading}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-light-gray/60 text-xs text-mid-gray hover:text-brand-dark transition disabled:opacity-50"
                  >
                    {sectionUploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                    Upload Image
                  </button>
                </div>
              </div>

              <input type="number" value={sectionForm.sortOrder} onChange={(e) => setSectionForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))} placeholder="Sort order" className="w-24 rounded-lg border border-light-gray/60 px-3 py-2 text-sm" />

              <div className="flex items-center gap-2">
                <button onClick={saveSection} disabled={sectionSaving}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {sectionSaving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                  {editingSection ? "Update Section" : "Add Section"}
                </button>
                {editingSection && (
                  <button onClick={() => { resetSectionForm(); setEditingSection(null); }}
                    className="h-9 px-4 rounded-lg border border-light-gray/60 text-sm text-mid-gray hover:text-brand-dark transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
