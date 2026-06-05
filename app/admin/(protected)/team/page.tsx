"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useAdminStore, type TeamMember } from "@/stores/admin-store";
import { TeamService } from "@/api/services/team.service";

function makeInitials(name: string): string {
  return name.split(" ").filter(Boolean).map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

const emptyForm = {
  name: "", initials: "", role: "", specialisation: "",
  experience: "", email: "", linkedin: "",
};

const input =
  "w-full h-10 px-3 rounded-lg border border-light-gray bg-white text-sm text-brand-dark placeholder:text-mid-gray/60 focus:outline-none focus:border-brand-primary transition";
const lbl = "block text-xs font-medium text-mid-gray mb-1";

type View = "list" | "form";

export default function AdminTeamPage() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useAdminStore(useShallow((s) => ({ teamMembers: s.teamMembers, addTeamMember: s.addTeamMember, updateTeamMember: s.updateTeamMember, deleteTeamMember: s.deleteTeamMember })
  ));
  const [view, setView] = useState<View>("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    TeamService.adminList().then((res) => {
      useAdminStore.setState({ teamMembers: res.results ?? [] });
    });
  }, []);

  const openNew = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setView("form");
  };

  const openEdit = (item: TeamMember) => {
    const { id, ...rest } = item;
    setForm(rest);
    setEditingId(id);
    setView("form");
  };

  const back = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setView("list");
  };

  const save = async () => {
    if (!form.name.trim() || !form.role.trim()) return;
    setSaving(true);
    const initials = form.initials.trim() || makeInitials(form.name);
    const payload = { ...form, initials };
    try {
      if (editingId) {
        const updated = await TeamService.update(editingId, payload);
        updateTeamMember(editingId, updated);
      } else {
        const created = await TeamService.create(payload);
        addTeamMember(created);
      }
      back();
    } catch {
      // Toast or error handling
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async (id: string) => {
    try {
      await TeamService.delete(id);
      deleteTeamMember(id);
    } catch {
      // Toast or error handling
    }
    setDeleteId(null);
  };

  const f = (key: string, value: string) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "name" && !editingId ? { initials: makeInitials(value) } : {}),
    }));

  // ── List view ──────────────────────────────────────────────────────────────
  if (view === "list") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-brand-dark">Team</h1>
            <p className="text-sm text-mid-gray mt-0.5">
              {teamMembers.length} member{teamMembers.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-brand-primary text-white text-sm font-medium hover:brightness-110 transition"
          >
            <Plus className="size-3.5" /> New Member
          </button>
        </div>

        <div className="rounded-xl border border-light-gray bg-white overflow-hidden">
          {teamMembers.length === 0 ? (
            <div className="py-16 text-center text-sm text-mid-gray">
              No team members yet.
            </div>
          ) : (
            <div className="divide-y divide-light-gray">
              {teamMembers.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-light-gray/30 group transition cursor-pointer"
                  onClick={() => openEdit(item)}
                >
                  <div className="size-9 rounded-lg bg-brand-primary/8 flex items-center justify-center text-xs font-semibold text-brand-primary shrink-0 select-none">
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-brand-dark/70">{item.role}</span>
                      {item.experience && (
                        <>
                          <span className="text-mid-gray/50 text-xs">·</span>
                          <span className="text-xs text-brand-dark/70">{item.experience}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); openEdit(item); }}
                      className="p-1.5 rounded-md text-brand-dark/50 hover:text-brand-dark hover:bg-light-gray transition"
                      aria-label="Edit"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteId(item.id); }}
                      className="p-1.5 rounded-md text-brand-dark/50 hover:text-red-500 hover:bg-red-50 transition"
                      aria-label="Delete"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete confirm */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-xl border border-light-gray p-6 w-80">
              <p className="text-sm font-semibold text-brand-dark mb-1">Remove member?</p>
              <p className="text-sm text-mid-gray mb-5">This cannot be undone.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => confirmDelete(deleteId)}
                  className="flex-1 h-9 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Remove
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 h-9 rounded-lg border border-light-gray text-sm text-mid-gray hover:text-brand-dark transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Form view ──────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto">
      {/* Back */}
      <button
        onClick={back}
        className="flex items-center gap-1.5 text-sm text-mid-gray hover:text-brand-dark transition mb-6"
      >
        <ArrowLeft className="size-3.5" /> Back to team
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-brand-dark">
          {editingId ? "Edit Member" : "New Member"}
        </h1>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className={lbl}>Full Name</label>
            <input value={form.name} onChange={(e) => f("name", e.target.value)} className={input} placeholder="Jane Smith" />
          </div>
          <div>
            <label className={lbl}>Initials</label>
            <input value={form.initials} onChange={(e) => f("initials", e.target.value)} className={`${input} font-mono text-center`} placeholder="JS" maxLength={3} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={lbl}>Role / Title</label>
            <input value={form.role} onChange={(e) => f("role", e.target.value)} className={input} placeholder="Lead Engineer" />
          </div>
          <div>
            <label className={lbl}>Experience</label>
            <input value={form.experience} onChange={(e) => f("experience", e.target.value)} className={input} placeholder="10 yrs" />
          </div>
        </div>

        <div>
          <label className={lbl}>Specialisation</label>
          <input value={form.specialisation} onChange={(e) => f("specialisation", e.target.value)} className={input} placeholder="Structural design" />
        </div>

        <div>
          <label className={lbl}>Email</label>
          <input value={form.email} onChange={(e) => f("email", e.target.value)} className={input} type="email" placeholder="jane@example.com" />
        </div>

        <div>
          <label className={lbl}>LinkedIn URL</label>
          <input value={form.linkedin} onChange={(e) => f("linkedin", e.target.value)} className={input} placeholder="https://linkedin.com/in/…" />
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={save}
          disabled={!form.name.trim() || !form.role.trim() || saving}
          className="flex-1 h-10 rounded-lg bg-brand-primary text-white text-sm font-medium hover:brightness-110 transition disabled:opacity-40"
        >
          {saving ? "Saving..." : editingId ? "Update Member" : "Create Member"}
        </button>
        <button
          onClick={back}
          className="h-10 px-4 rounded-lg border border-light-gray text-sm text-mid-gray hover:text-brand-dark transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
