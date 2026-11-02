"use client";

import {
  Menu,
  Download,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function AdminHeader({
  activeTab,
  onOpenMobile,
  onExportJson,
}) {
  const getTabTitle = () => {
    switch (activeTab) {
      case "overview":
        return { title: "Ringkasan Portal", subtitle: "Pantau metrik dan konten aktif Airindo Construction" };
      case "projects":
        return { title: "Portofolio Proyek", subtitle: "Kelola rekam jejak, foto lapangan, dan spesifikasi teknis" };
      case "clients":
        return { title: "Klien & Mitra Industri", subtitle: "Atur daftar logo klien korporasi dan sektor industri" };
      case "services":
        return { title: "Layanan & Standar Teknik", subtitle: "Perbarui lingkup pengerjaan mekanikal, perpipaan, dan otomasi" };
      case "content":
        return { title: "Konten Pendukung", subtitle: "Kelola FAQ, workshop, highlight, nilai perusahaan, dan poin CTA" };
      case "settings":
        return { title: "Profil & Informasi Perusahaan", subtitle: "Pengaturan nomor WhatsApp, hotline, alamat, dan counter statistik" };
      default:
        return { title: "Admin Portal", subtitle: "Manajemen website" };
    }
  };

  const current = getTabTitle();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Buka navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#0b2557] tracking-tight">
                {current.title}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Export JSON */}
          <button
            onClick={onExportJson}
            title="Download cadangan data dalam format JSON"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">Cadangkan JSON</span>
          </button>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* Visit public site */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand hover:bg-[#0b2557] rounded-lg shadow-sm shadow-brand/20 transition"
          >
            <span>Buka Web</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
