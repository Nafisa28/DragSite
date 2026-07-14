"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PageData, Template } from "@/types/editor";
import { Layers, ArrowLeft, Search, Loader2 } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

const CATEGORIES = ["All", "Personal", "Business", "Marketing", "Food", "Creative", "Event", "Nonprofit"];

const CATEGORY_COLORS: Record<string, string> = {
  Personal: "bg-violet-500/20 text-violet-300",
  Business: "bg-blue-500/20 text-blue-300",
  Marketing: "bg-emerald-500/20 text-emerald-300",
  Food: "bg-amber-500/20 text-amber-300",
  Creative: "bg-pink-500/20 text-pink-300",
  Event: "bg-red-500/20 text-red-300",
  Nonprofit: "bg-cyan-500/20 text-cyan-300",
};

const TEMPLATE_GRADIENTS = [
  "from-violet-900 to-purple-800",
  "from-blue-900 to-cyan-800",
  "from-emerald-900 to-teal-800",
  "from-orange-900 to-amber-800",
  "from-rose-900 to-pink-800",
  "from-slate-800 to-gray-700",
  "from-indigo-900 to-blue-800",
  "from-green-900 to-emerald-800",
  "from-red-900 to-rose-800",
  "from-cyan-900 to-sky-800",
  "from-yellow-900 to-orange-800",
  "from-fuchsia-900 to-violet-800",
  "from-teal-900 to-cyan-800",
  "from-purple-900 to-indigo-800",
  "from-gray-900 to-slate-800",
];

interface Props {
  user: SupabaseUser;
  templates: Template[];
}

export default function TemplatesClient({ user, templates }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [creating, setCreating] = useState<string | null>(null);

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.description ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  function generateSlug(name: string) {
    return (
      name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") +
      "-" +
      Math.random().toString(36).slice(2, 7)
    );
  }

  function isUuid(value: string) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );
  }

  async function handleSelectTemplate(template: Template) {
    setCreating(template.id);

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session) {
      alert(
        "Session expired or missing. Please sign in again before creating a site."
      );
      setCreating(null);
      router.push("/auth/login");
      return;
    }

    const slug = generateSlug(template.name);
    const insertData: {
      user_id: string;
      name: string;
      slug: string;
      template_id?: string | null;
      status: string;
      page_data: PageData;
    } = {
      user_id: user.id,
      name: `My ${template.name} Site`,
      slug,
      status: "draft",
      page_data: template.page_data,
    };

    if (isUuid(template.id)) {
      insertData.template_id = template.id;
    }

    const { data: site, error } = await supabase
      .from("sites")
      .insert(insertData)
      .select()
      .single();

    if (error || !site) {
      alert("Failed to create site: " + (error?.message ?? "Unknown error"));
      setCreating(null);
      return;
    }

    router.push(`/editor/${site.id}`);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-white/5 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-white">Choose a Template</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start with a beautiful template
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Choose a polished starting point built for your niche, then customize every detail with live drag-and-drop.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No templates found. Try a different search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((template, idx) => (
              <TemplateCard
                key={template.id}
                template={template}
                gradient={TEMPLATE_GRADIENTS[idx % TEMPLATE_GRADIENTS.length]}
                categoryColor={CATEGORY_COLORS[template.category] ?? "bg-slate-500/20 text-slate-300"}
                creating={creating}
                onSelect={handleSelectTemplate}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function TemplateCard({
  template, gradient, categoryColor, creating, onSelect,
}: {
  template: Template;
  gradient: string;
  categoryColor: string;
  creating: string | null;
  onSelect: (t: Template) => void;
}) {
  const isCreating = creating === template.id;
  const isDisabled = creating !== null;

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-violet-500/30 transition-all">
      {/* Preview thumbnail */}
      <div className={`h-48 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
          <div className="text-4xl mb-2">
            {template.name === "Portfolio" ? "👤" :
             template.name === "Business" ? "🏢" :
             template.name === "Restaurant" ? "🍽️" :
             template.name === "Blog" ? "✍️" :
             template.name === "Landing Page" ? "🚀" :
             template.name === "Agency" ? "💼" :
             template.name === "Resume/CV" ? "📄" :
             template.name === "Event" ? "🎉" :
             template.name === "Photography" ? "📸" :
             template.name === "Wedding" ? "💍" :
             template.name === "Coming Soon" ? "⏳" :
             template.name === "SaaS Product" ? "⚡" :
             template.name === "Nonprofit" ? "❤️" :
             template.name === "E-commerce Lite" ? "🛍️" : "🌐"}
          </div>
          <span className="text-white font-bold text-lg drop-shadow">{template.name}</span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={() => onSelect(template)}
            disabled={isDisabled}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {isCreating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Layers className="w-4 h-4" />
            )}
            {isCreating ? "Creating..." : "Use Template"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white">{template.name}</h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
            {template.category}
          </span>
        </div>
        {template.description && (
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{template.description}</p>
        )}
        <button
          onClick={() => onSelect(template)}
          disabled={isDisabled}
          id={`use-template-${template.id}`}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Creating site...
            </>
          ) : (
            "Start with this template →"
          )}
        </button>
      </div>
    </div>
  );
}
