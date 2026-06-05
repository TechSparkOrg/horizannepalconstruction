"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Inbox, Plus, Trash2, Loader2 } from "lucide-react";
import { ConsultationService } from "@/api/services/consultation.service";
import type { ConsultationFormSettings, ConsultationSubmission } from "@/stores/admin-types";
import type { ConsultationSettings } from "@/api/types/consultation.types";
import { cn } from "@/lib/utils";

const TABS = ["Content", "Submissions"] as const;
type Tab = typeof TABS[number];

function toCamel(s: ConsultationSettings): ConsultationFormSettings {
  return {
    sectionLabel: s.section_label,
    heading: s.heading,
    description: s.description,
    formTitle: s.form_title,
    serviceOptions: s.service_options,
    privacyText: s.privacy_text,
    successHeading: s.success_heading,
    successMessage: s.success_message,
  };
}

function toSubmissionCamel(s: import("@/api/types/consultation.types").ConsultationSubmission): ConsultationSubmission {
  return {
    id: s.id,
    name: s.name,
    email: s.email,
    phone: s.phone,
    service: s.service,
    description: s.description,
    preferredDate: s.preferred_date,
    createdAt: s.created_at,
  };
}

function toSnakePatch(patch: Partial<ConsultationFormSettings>): Partial<ConsultationSettings> {
  const out: Record<string, unknown> = {};
  if ("sectionLabel" in patch) out.section_label = patch.sectionLabel;
  if ("heading" in patch) out.heading = patch.heading;
  if ("description" in patch) out.description = patch.description;
  if ("formTitle" in patch) out.form_title = patch.formTitle;
  if ("serviceOptions" in patch) out.service_options = patch.serviceOptions;
  if ("privacyText" in patch) out.privacy_text = patch.privacyText;
  if ("successHeading" in patch) out.success_heading = patch.successHeading;
  if ("successMessage" in patch) out.success_message = patch.successMessage;
  return out;
}

export default function AdminConsultationPage() {
  const [consultationForm, setConsultationForm] = useState<ConsultationFormSettings | null>(null);
  const [submissions, setSubmissions] = useState<ConsultationSubmission[]>([]);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<Tab>("Content");

  useEffect(() => {
    Promise.all([
      ConsultationService.getSettings(),
      ConsultationService.listSubmissions(),
    ]).then(([settings, subs]) => {
      setConsultationForm(toCamel(settings));
      setSubmissions(subs.map(toSubmissionCamel));
    });
  }, []);

  if (!consultationForm) return null;

  const updateConsultationForm = (patch: Partial<ConsultationFormSettings>) => {
    setConsultationForm((prev) => prev ? { ...prev, ...patch } : prev);
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await ConsultationService.updateSettings(toSnakePatch(consultationForm));
    } finally {
      setSaving(false);
    }
  };

  const deleteSubmission = async (id: string) => {
    await ConsultationService.deleteSubmission(id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brand-dark mb-6">Consultation Form</h1>

      <div className="flex gap-1 mb-6 border-b border-light-gray/40">
        <button
          onClick={() => setTab("Content")}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px ${tab === "Content" ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"}`}
        >
          <MessageSquare className="size-4" /> Content
        </button>
        <button
          onClick={() => setTab("Submissions")}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px ${tab === "Submissions" ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"}`}
        >
          <Inbox className="size-4" /> Submissions ({submissions.length})
        </button>
      </div>

      {tab === "Content" && (
        <ContentTab config={consultationForm} onChange={updateConsultationForm} onSave={saveSettings} saving={saving} />
      )}
      {tab === "Submissions" && (
        <SubmissionsTab submissions={submissions} onDelete={deleteSubmission} />
      )}
    </div>
  );
}

function ContentTab({ config, onChange, onSave, saving }: {
  config: ConsultationFormSettings;
  onChange: (patch: Partial<ConsultationFormSettings>) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const [serviceInput, setServiceInput] = useState("");
  const addService = () => {
    if (!serviceInput.trim()) return;
    onChange({ serviceOptions: [...config.serviceOptions, serviceInput.trim()] });
    setServiceInput("");
  };

  return (
    <div className="max-w-7xl space-y-5 bg-white rounded-xl border border-light-gray/40 p-6">
      <p className="text-sm font-semibold text-brand-secondary">Left Panel — Hero Content</p>

      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Section Label</label>
        <input value={config.sectionLabel} onChange={(e) => onChange({ sectionLabel: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Heading</label>
        <input value={config.heading} onChange={(e) => onChange({ heading: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Description</label>
        <textarea value={config.description} onChange={(e) => onChange({ description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
      </div>

      <hr className="border-light-gray/40" />
      <p className="text-sm font-semibold text-brand-secondary">Form Panel</p>

      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Form Title</label>
        <input value={config.formTitle} onChange={(e) => onChange({ formTitle: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Service Options</label>
        <div className="space-y-1.5 mb-2">
          {config.serviceOptions.map((opt, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <input
                value={opt}
                onChange={(e) => {
                  const next = [...config.serviceOptions];
                  next[i] = e.target.value;
                  onChange({ serviceOptions: next });
                }}
                className="flex-1 h-8 px-2 rounded border border-light-gray text-xs"
              />
              <button
                onClick={() => onChange({ serviceOptions: config.serviceOptions.filter((_, idx) => idx !== i) })}
                className="h-8 px-2 rounded border border-red-200 text-red-400 text-xs font-semibold inline-flex items-center gap-1 hover:bg-red-50 hover:border-red-400 transition"
              >
                <Trash2 className="size-3" /> Delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <input value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addService(); } }} placeholder="Add option..." className="flex-1 h-8 px-2.5 rounded-md border border-light-gray text-xs" />
          <button onClick={addService} className="h-8 px-3 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:brightness-110 transition"><Plus className="size-3.5" /> Add</button>
        </div>
      </div>

      <hr className="border-light-gray/40" />
      <p className="text-sm font-semibold text-brand-secondary">Success State</p>

      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Success Heading</label>
        <input value={config.successHeading} onChange={(e) => onChange({ successHeading: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Success Message</label>
        <textarea value={config.successMessage} onChange={(e) => onChange({ successMessage: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Privacy Text</label>
        <input value={config.privacyText} onChange={(e) => onChange({ privacyText: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>

      <hr className="border-light-gray/40" />
      <div className="flex justify-end pt-2">
        <button
          onClick={onSave}
          disabled={saving}
          className="h-10 px-6 rounded-lg bg-brand-primary text-white text-sm font-semibold inline-flex items-center gap-2 hover:brightness-110 transition disabled:opacity-60"
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function SubmissionsTab({ submissions, onDelete }: {
  submissions: ConsultationSubmission[];
  onDelete: (id: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (submissions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-light-gray/40 p-12 text-center">
        <Inbox className="size-12 mx-auto text-light-gray mb-3" />
        <p className="text-sm text-mid-gray">No submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {submissions.map((s) => {
        const isExpanded = expandedId === s.id;

        return (
          <div
            key={s.id}
            className="bg-white rounded-xl border border-light-gray/40 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-brand-dark truncate">{s.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium shrink-0">
                    {s.service}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-mid-gray">
                  <span className="tabular-nums">{new Date(s.createdAt).toLocaleDateString()}</span>
                  <span className="w-px h-3 bg-light-gray/60" />
                  <span>{s.email}</span>
                  <span className="w-px h-3 bg-light-gray/60" />
                  <span className="tabular-nums">{s.phone}</span>
                  {s.preferredDate && (
                    <>
                      <span className="w-px h-3 bg-light-gray/60" />
                      <span className="tabular-nums">{s.preferredDate}</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => onDelete(s.id)}
                className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                title="Delete"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            {/* Description — the star of the show */}
            {s.description && (
              <div className="px-5 pb-4">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : s.id)}
                  className="w-full text-left"
                >
                  <p
                    className={cn(
                      "text-sm text-brand-dark leading-relaxed",
                      !isExpanded && "line-clamp-3"
                    )}
                  >
                    {s.description}
                  </p>
                  {s.description.length > 180 && (
                    <span className="inline-block mt-2 text-xs font-medium text-brand-primary hover:underline">
                      {isExpanded ? "Show less" : "Show more"}
                    </span>
                  )}
                </button>
              </div>
            )}

            {!s.description && (
              <div className="px-5 pb-4">
                <p className="text-sm text-light-gray italic">No project details provided.</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
