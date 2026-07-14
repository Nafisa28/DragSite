"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Site } from "@/types/editor";
import {
  Layers, Plus, Globe, FileText, Trash2, Edit2,
  ExternalLink, LogOut, MoreVertical,
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
  const [publishingId, setPublishingId] = useState<string | null>(null);

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

  async function handlePublish(siteId: string) {
    setPublishingId(siteId);
    const { data, error } = await supabase
      .from("sites")
      .update({ status: "published", updated_at: new Date().toISOString() })
      .eq("id", siteId)
      .select()
      .single();

    if (!error && data) {
      setSites((prev) => prev.map((site) => (site.id === siteId ? { ...site, ...data } : site)));
    }

    setPublishingId(null);
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
            <h1 className="text-4xl font-bold text-white lg:text-5xl">
              Welcome back, {displayName.split(" ")[0]} 👋
            </h1>
            <p className="text-slate-300 mt-2 text-base">
              {sites.length === 0
                ? "Create your first website and start building with confidence."
                : `You have ${sites.length} site${sites.length !== 1 ? "s" : ""}. Ready to refine your next launch?`}
            </p>
          </div>
          <Link
            href="/templates"
            id="create-new-site"
            className="flex items-center gap-2 px-6 py-3 rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-cyan-500 font-semibold text-base transition-all shadow-[0_20px_80px_-45px_rgba(124,58,237,0.9)] hover:shadow-[0_0_35px_rgba(124,58,237,0.4)]"
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
                onPublish={handlePublish}
                deletingId={deletingId}
                publishingId={publishingId}
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
  site, openMenuId, setOpenMenuId, onDelete, onPublish, deletingId, publishingId, formatDate
}: {
  site: Site;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  deletingId: string | null;
  publishingId: string | null;
  formatDate: (d: string) => string;
}) {
  const isOpen = openMenuId === site.id;

  return (
    <div className="glass rounded-2xl overflow-hidden hover:border-white/15 transition-all group">
      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden shadow-lg shadow-slate-950/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.35),_transparent_30%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="w-12 h-12 text-slate-500" />
        </div>
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold tracking-[0.16em] ${
              site.status === "published"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-violet-500/15 text-violet-200 border border-violet-500/30"
            }`}
          >
            {site.status === "published" ? "Live" : "Draft"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-xl text-white truncate">{site.name}</h3>
            <div className="mt-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(site.updated_at)}
              </span>
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
        <div className="flex flex-col gap-3 mt-5 sm:flex-row">
          <Link
            href={`/editor/${site.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-3xl bg-white/10 hover:bg-white/15 text-base font-semibold text-white transition-colors"
          >
            <Edit2 className="w-4 h-4" /> Edit
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
            <button
              onClick={() => onPublish(site.id)}
              disabled={publishingId === site.id}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Zap className="w-3.5 h-3.5" />
              {publishingId === site.id ? "Publishing..." : "Publish"}
            </button>
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
      <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
        Browse polished templates and start building your first website with style and speed.
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
