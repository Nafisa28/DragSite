"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Layers, Loader2, ArrowLeft, Check } from "lucide-react";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mb-4">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Reset password</h1>
          <p className="text-gray-400 text-sm mt-1">We&apos;ll send you a reset link</p>
        </div>

        <div className="glass rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="text-white font-semibold mb-2">Check your inbox</p>
              <p className="text-gray-400 text-sm">
                A reset link was sent to <strong className="text-white">{email}</strong>
              </p>
              <Link href="/auth/login" className="inline-flex items-center gap-1.5 mt-6 text-violet-400 hover:text-violet-300 text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="auth-input"
                />
              </div>
              <button
                id="reset-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Send Reset Link
              </button>
              <Link href="/auth/login" className="flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-white mt-2">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
