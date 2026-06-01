"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, FolderKanban, Tags, MessageCircle, Image as ImageIcon, Settings, Newspaper, Box, Calculator, FileText, Sun, Users, Building2, Star, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useAdminStore } from "@/stores/admin-store";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-brand-dark text-white shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="font-display font-bold text-lg">Horizan Admin</Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <FolderKanban className="size-4" />
            Projects
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <Tags className="size-4" />
            Categories
          </Link>
          <Link href="/admin/faq" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <MessageCircle className="size-4" />
            FAQ
          </Link>
          <Link href="/admin/media" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <ImageIcon className="size-4" />
            Media
          </Link>
          <Link href="/admin/blogs" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <Newspaper className="size-4" />
            Blogs
          </Link>
          <Link href="/admin/pages" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <FileText className="size-4" />
            Pages
          </Link>
          <Link href="/admin/reviews" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <Star className="size-4" />
            Reviews
          </Link>
          <Link href="/admin/models" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <Box className="size-4" />
            3D Models
          </Link>
          <Link href="/admin/calculator" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <Calculator className="size-4" />
            Calculator
          </Link>
          <Link href="/admin/consultation" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <PhoneCall className="size-4" />
            Consultation
          </Link>
          <Link href="/admin/vastu" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <Sun className="size-4" />
            Vastu
          </Link>
          <Link href="/admin/team" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <Users className="size-4" />
            Team
          </Link>
          <Link href="/admin/building-permit" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <Building2 className="size-4" />
            Building Permit
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
            <Settings className="size-4" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50 mb-2">Signed in as {user?.username || user?.email}</p>
          <button
            onClick={() => { logout(); router.push("/admin/login"); }}
            className="flex items-center gap-2 text-sm text-red-300 hover:text-red-200 transition w-full"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
