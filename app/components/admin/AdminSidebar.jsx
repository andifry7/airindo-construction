"use client";

import {
  LayoutDashboard,
  Briefcase,
  Building2,
  Wrench,
  Settings,
  ExternalLink,
  Lock,
  X,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
  onLock,
  statsCount,
}) {
  const menuItems = [
    {
      id: "overview",
      label: "Ringkasan",
      icon: LayoutDashboard,
      badge: null,
      desc: "Status & statistik umum",
    },
    {
      id: "projects",
      label: "Portofolio Proyek",
      icon: Briefcase,
      badge: statsCount?.projects || 0,
      desc: "CRUD proyek & spesifikasi",
    },
    {
      id: "clients",
      label: "Klien & Mitra",
      icon: Building2,
      badge: statsCount?.clients || 0,
      desc: "Logo & sektor industri",
    },
    {
      id: "services",
      label: "Layanan & Standar",
      icon: Wrench,
      badge: "4",
      desc: "Scope & sertifikasi ASME/ISO",
    },
    {
      id: "settings",
      label: "Profil & Kontak",
      icon: Settings,
      badge: null,
      desc: "WA PIC, hotline, & alamat",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#081a38] text-white flex flex-col border-r border-white/10 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/15 shadow-sm shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Logo Airindo Construction"
                width={32}
                height={32}
                priority
                className="w-auto h-auto max-h-7 max-w-7 object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                AIRINDO
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-brand/30 text-blue-300 border border-brand/40">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Content Management</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Manajemen Konten
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpenMobile(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition group cursor-pointer ${
                  isActive
                    ? "bg-brand text-white font-semibold shadow-lg shadow-brand/25"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-blue-400"
                    }`}
                  />
                  <div className="truncate">
                    <div className="text-sm leading-tight">{item.label}</div>
                    <div
                      className={`text-[11px] truncate ${
                        isActive ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>

                {item.badge !== null && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#051329]">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              Lihat Website Publik
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <button
            onClick={onLock}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-semibold transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            Kunci & Keluar Panel
          </button>
        </div>
      </aside>
    </>
  );
}
