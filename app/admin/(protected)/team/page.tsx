"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { useAdminStore, type TeamMember } from "@/stores/admin-store";

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

const emptyForm: TeamMember = {
  id: "", name: "", initials: "", role: "", specialisation: "",
  experience: "", email: "", linkedin: "",
};

export default function AdminTeamPage() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TeamMember>({ ...emptyForm });

  const resetForm = () => setForm({ ...emptyForm });
  const startEdit = (item: TeamMember) => {
    setForm({ ...item });
    setEditingId(item.id);
  };

  const save = () => {
    if (!form.name.trim() || !form.role.trim()) return;
    const initials = form.initials.trim() || makeInitials(form.name);
    if (editingId) {
      updateTeamMember(editingId, { ...form, initials });
    } else {
      addTeamMember({ ...form, id: genId(), initials });
    }
    resetForm();
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Team</h1>
        <button
          onClick={() => { resetForm(); setEditingId(null); }}
          className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition"
        >
          <Plus className="size-4" /> New Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-light-gray/40">
          {teamMembers.length === 0 ? (
            <p className="text-sm text-mid-gray py-8 text-center">No team members yet.</p>
          ) : (
            <div className="divide-y divide-light-gray/30">
              {teamMembers.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 group">
                  <div className="size-9 rounded-lg bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-xs font-bold text-brand-secondary shrink-0">
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{item.name}</p>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-[11px] bg-brand-secondary/10 text-brand-secondary px-2 py-0.5 rounded">{item.role}</span>
                      <span className="text-[11px] text-mid-gray">{item.experience}</span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition">
                    <button onClick={() => startEdit(item)} className="p-1.5 rounded-md hover:bg-gray-200 text-mid-gray"><Pencil className="size-3.5" /></button>
                    <button onClick={() => deleteTeamMember(item.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-400"><Trash2 className="size-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-light-gray/40 p-5">
          <h2 className="font-bold text-brand-dark mb-4">{editingId ? "Edit Member" : "New Member"}</h2>

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
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Specialisation</label>
              <input value={form.specialisation} onChange={(e) => setForm({ ...form, specialisation: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Experience</label>
              <input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" placeholder='e.g. "14 yrs"' />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" type="email" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">LinkedIn URL</label>
              <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="https://linkedin.com/in/..." />
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
