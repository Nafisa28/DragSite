"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Site } from "@/types/editor";
import {
  Layers, Plus, Globe, FileText, Trash2, Edit2,
  ExternalLink, LogOut, User, MoreVertical,
  Clock, Zap
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface Profile {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

interface Props {
  user: SupabaseUser;
  profile: Profile | null;
  initialSites: Site[];
}

export default function DashboardClient({ user, profile, initialSites }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const displayName = profile?.name ?? user.email?.split("@")[0] ?? "User";

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function handleDelete(siteId: string) {
    if (!confirm("Delete this site? This cannot be undone.")) return;
    setDeletingId(siteId);
    await supabase.from("sites").delete().eq("id", siteId);
    setSites((prev) => prev.filter((s) => s.id !== siteId));
    setDeletingId(null);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-white/5 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">DragSite</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                {displayName[0].toUpperCase()}
              </div>
              <span className="text-sm text-gray-300">{displayName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Welcome bar */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {displayName.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-400 mt-1">
              {sites.length === 0
                ? "Create your first site to get started"
                : `You have ${sites.length} site${sites.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Link
            href="/templates"
            id="create-new-site"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
          >
            <Plus className="w-4 h-4" />
            Create New Site
          </Link>
        </div>

        {/* Sites grid */}
        {sites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create new card */}
            <Link
              href="/templates"
              className="glass rounded-2xl border-dashed border-white/10 flex flex-col items-center justify-center p-10 gap-3 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all group min-h-[220px]"
            >
              <div className="w-12 h-12 rounded-xl border border-dashed border-white/20 group-hover:border-violet-500/50 flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-violet-400 transition-colors" />
              </div>
              <span className="text-sm text-gray-400 group-hover:text-violet-300 transition-colors font-medium">
                New Site
              </span>
            </Link>

            {/* Site cards */}
            {sites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                onDelete={handleDelete}
                deletingId={deletingId}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function SiteCard({
  site, openMenuId, setOpenMenuId, onDelete, deletingId, formatDate
}: {
  site: Site;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
  formatDate: (d: string) => string;
}) {
  const isOpen = openMenuId === site.id;

  return (
    <div className="glass rounded-2xl overflow-hidden hover:border-white/15 transition-all group">
      {/* Thumbnail */}
      <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="w-10 h-10 text-gray-600" />
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              site.status === "published"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
            }`}
          >
            {site.status === "published" ? "● Live" : "Draft"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{site.name}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {formatDate(site.updated_at)}
            </div>
          </div>

          {/* Context menu */}
          <div className="relative ml-2">
            <button
              onClick={() => setOpenMenuId(isOpen ? null : site.id)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {isOpen && (
              <div className="absolute right-0 top-8 w-44 glass rounded-xl overflow-hidden z-10 shadow-xl">
                <Link
                  href={`/editor/${site.id}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                  onClick={() => setOpenMenuId(null)}
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </Link>
                {site.status === "published" && (
                  <a
                    href={`/s/${site.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                    onClick={() => setOpenMenuId(null)}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View Live
                  </a>
                )}
                <button
                  onClick={() => { setOpenMenuId(null); onDelete(site.id); }}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors"
                  disabled={deletingId === site.id}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {deletingId === site.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/editor/${site.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </Link>
          {site.status === "published" ? (
            <a
              href={`/s/${site.slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> View
            </a>
          ) : (
            <Link
              href={`/editor/${site.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-sm font-medium transition-colors"
            >
              <Zap className="w-3.5 h-3.5" /> Publish
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center mb-6 border border-violet-500/20">
        <Layers className="w-10 h-10 text-violet-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">No sites yet</h2>
      <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
        Choose from 15 beautiful templates and start building your first website in minutes.
      </p>
      <Link
        href="/templates"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 font-semibold transition-all"
      >
        Browse Templates
      </Link>
    </div>
  );
}
