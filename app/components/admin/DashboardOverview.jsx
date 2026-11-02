"use client";

import {
  Briefcase,
  Building2,
  Wrench,
  Phone,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function DashboardOverview({
  projects,
  clients,
  companyData,
  counts,
  onNavigateTab,
  onOpenNewProject,
}) {
  // Angka utama memakai hitungan server; fallback ke data yang sudah dimuat.
  const totalProjects = counts?.projects ?? projects.length;
  const totalClients = counts?.clients ?? clients.length;
  const totalServices = counts?.services ?? 4;
  const featuredCount = counts?.featuredProjects ?? projects.filter((p) => p.featured).length;
  const uniqueSectors =
    counts?.sectors ?? Array.from(new Set(clients.map((c) => c.sector))).length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#071f45] via-[#0b2557] to-brand text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Selamat Datang di Admin Panel Airindo
          </h2>
          <p className="text-sm text-blue-150 leading-relaxed text-slate-300">
            Perbarui portofolio proyek konstruksi, kelola daftar logo klien
            industri terpercaya, serta pastikan hotline kontak WhatsApp
            marketing selalu mutakhir.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewProject}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0b2557] font-semibold text-xs shadow-md hover:bg-blue-50 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 text-brand" />
              Tambah Proyek Baru
            </button>
            <button
              onClick={() => onNavigateTab("settings")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              Periksa Nomor WhatsApp PIC
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <div className="w-full h-full bg-gradient-to-l from-white/20 to-transparent" />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div
          onClick={() => onNavigateTab("projects")}
          className="group p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-brand/40 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand flex items-center justify-center group-hover:scale-110 transition">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-brand flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
              Kelola <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {totalProjects}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Total Proyek Konstruksi
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Ditampilkan di Beranda:</span>
            <strong className="text-emerald-600 font-semibold">
              {featuredCount} Proyek
            </strong>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => onNavigateTab("clients")}
          className="group p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-brand/40 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-indigo-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
              Kelola <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {totalClients}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Klien & Mitra Industri
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Tersebar di:</span>
            <strong className="text-indigo-600 font-semibold">
              {uniqueSectors} Sektor Industri
            </strong>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onNavigateTab("services")}
          className="group p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-brand/40 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-amber-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
              Detail <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {totalServices} Pilar
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Layanan Spesialis
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Standar Utama:</span>
            <strong className="text-slate-700 font-semibold">
              ASME, API & IEC
            </strong>
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => onNavigateTab("settings")}
          className="group p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-brand/40 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
              Ubah <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 tracking-tight truncate font-mono">
            {companyData?.phone || "+62 878 7226 6146"}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            WhatsApp Hotline PIC
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Tujuan RFQ Web:</span>
            <strong className="text-emerald-600 font-semibold">
              Aktif & Siap
            </strong>
          </div>
        </div>
      </div>

      {/* Two Column: Recent Projects preview & Quick Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Project Highlights */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-[#0b2557] text-base">
                Daftar Proyek Unggulan Terkini
              </h3>
              <p className="text-xs text-slate-500">
                Proyek yang tampil pada section portofolio website
              </p>
            </div>
            <button
              onClick={() => onNavigateTab("projects")}
              className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Lihat Semua ({totalProjects})
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 truncate">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[11px] font-medium text-slate-600">
                        {p.category}
                      </span>
                      <span>•</span>
                      <span className="truncate">{p.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-medium text-slate-600 block">
                    {p.year}
                  </span>
                  {p.featured ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Featured
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Reguler</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Security & Architecture Tips */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#0b2557] text-base mb-2">
              Keamanan Akses via Secret Link
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed space-y-2">
              Panel ini dirancang tanpa tombol tautan di navbar publik agar
              tidak diakses pengunjung umum.
            </p>

            <div className="mt-4 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Secret Link:</strong> Anda bisa menyimpan tautan ini
                  di bookmark browser pribadi.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Login Terverifikasi Server:</strong> Sesi memakai JWT 24 jam
                  pada cookie httpOnly — tidak bisa dibaca JavaScript.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Penyimpanan Browser:</strong> Perubahan tersimpan
                  secara lokal dan dapat diunduh sebagai JSON.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/70">
            <button
              onClick={() => onNavigateTab("projects")}
              className="w-full py-2.5 px-4 rounded-xl bg-brand hover:bg-[#0b2557] text-white text-xs font-semibold shadow-sm transition text-center cursor-pointer"
            >
              Mulai Kelola Portofolio Proyek →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
