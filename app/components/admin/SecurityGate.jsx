"use client";

import { useState } from "react";
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  KeyRound,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function SecurityGate({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const savedPin =
        typeof window !== "undefined"
          ? localStorage.getItem("airindo_admin_pin")
          : null;
      const currentPin = savedPin || "2013";

      if (pin === currentPin) {
        onUnlock();
      } else {
        setError("PIN akses salah. Silakan periksa kembali PIN Anda.");
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#041a3d] via-[#0b2557] to-[#081b38] flex items-center justify-center p-4 selection:bg-brand selection:text-white">
      {/* Background glowing effects */}
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
        {/* Brand header badge */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0b2557] to-brand text-white flex items-center justify-center shadow-lg shadow-brand/25 mb-4 ring-4 ring-blue-50">
            <Lock className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand text-xs font-semibold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Airindo Internal Portal
          </div>
          <h1 className="text-2xl font-bold text-[#0b2557] tracking-tight">
            Akses Panel Admin
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-xs">
            Halaman manajemen konten & portofolio proyek Airindo Construction.
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              PIN / Kunci Akses
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={10}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError("");
                }}
                placeholder="Masukkan PIN..."
                autoFocus
                className="w-full px-4 py-3.5 pl-11 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg font-mono tracking-widest text-[#0b2557] placeholder:text-slate-400 placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
              />
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-rose-600 mt-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand to-[#0b2557] hover:from-blue-600 hover:to-brand-navy text-white font-semibold text-sm shadow-md shadow-brand/20 hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Buka Panel Admin
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Helper / Hint */}
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
