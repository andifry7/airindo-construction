"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  User,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { authApi } from "@/lib/admin-api";

/**
 * Form login panel admin.
 * Menggantikan PIN gate lama — autentikasi kini diverifikasi server
 * lewat POST /api/v1/auth/login, dan sesi disimpan pada cookie httpOnly.
 */
export default function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.username.trim() || !form.password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authApi.login(form.username.trim(), form.password);
      onSuccess(result.user);
    } catch (err) {
      setError(err?.message || "Gagal masuk. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#041a3d] via-[#0b2557] to-[#081b38] flex items-center justify-center p-4 selection:bg-brand selection:text-white">
      {/* Latar dekoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10 text-slate-800">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0b2557] to-brand text-white flex items-center justify-center shadow-lg shadow-brand/25 mb-4 ring-4 ring-blue-50">
            <Lock className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand text-xs font-semibold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Airindo Internal Portal
          </div>
          <h1 className="text-2xl font-bold text-[#0b2557] tracking-tight">Masuk Panel Admin</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-xs">
            Gunakan akun admin yang terdaftar untuk mengelola konten website.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Username */}
          <div>
            <label
              htmlFor="admin-username"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
            >
              Username
            </label>
            <div className="relative">
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                autoFocus
                value={form.username}
                onChange={handleChange("username")}
                placeholder="Masukkan username..."
                className="w-full px-4 py-3 pl-11 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#0b2557] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
              />
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange("password")}
                placeholder="Masukkan password..."
                className="w-full px-4 py-3 pl-11 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#0b2557] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
              />
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="flex items-start gap-1.5 text-xs text-rose-600 font-medium bg-rose-50 border border-rose-100 rounded-lg px-3 py-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand to-[#0b2557] hover:from-blue-600 hover:to-brand-navy text-white font-semibold text-sm shadow-md shadow-brand/20 hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Masuk
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3">
          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-slate-600 font-medium transition inline-flex items-center gap-1"
            >
              ← Kembali ke Website Utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
