import Link from "next/link";
import { Layers, Zap, Globe, Download } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-3xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">DragSite</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-base text-slate-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="px-6 py-3 text-base font-semibold rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-cyan-500 shadow-[0_20px_80px_-40px_rgba(124,58,237,0.9)] transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-28">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-semibold mb-8 shadow-sm shadow-violet-500/10">
            <Zap className="w-4 h-4" />
            Build websites in minutes
          </div>

          <h1 className="text-5xl md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tight mb-6 leading-[0.92]">
            <span className="gradient-text">Drag. Drop.</span>
            <br />
            <span className="text-white">Launch with style.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Choose a beautiful starting point, customize in seconds, and publish a premium website with no code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="px-8 py-4 text-lg font-bold rounded-3xl bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-cyan-500 transition-all shadow-[0_25px_80px_-35px_rgba(124,58,237,0.9)] hover:-translate-y-0.5"
            >
              Start Building Free →
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 text-lg font-semibold rounded-3xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Layers className="w-6 h-6 text-violet-400" />,
              title: "Beautiful Templates",
              desc: "Professionally designed starting points for every niche — portfolio, restaurant, agency, and more.",
            },
            {
              icon: <Zap className="w-6 h-6 text-blue-400" />,
              title: "Drag & Drop Editor",
              desc: "Intuitive container-based editor. Sections, rows, columns, and widgets — all drag and droppable.",
            },
            {
              icon: <Globe className="w-6 h-6 text-emerald-400" />,
              title: "Publish Instantly",
              desc: "One click to go live. Your site gets a public URL instantly — no hosting setup required.",
            },
            {
              icon: <Download className="w-6 h-6 text-amber-400" />,
              title: "Export as ZIP",
              desc: "Download your site as clean HTML/CSS/JS you own. No lock-in, ever.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover:border-violet-500/20 transition-colors group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
