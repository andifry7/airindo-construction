"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Wrench,
  Zap,
  Cpu,
  Flame,
  CheckCircle2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { company, companyStats } from "@/lib/data";

const heroImages = [
  "/images/hero/hero 1.webp",
  "/images/hero/hero 2.webp",
  "/images/hero/hero 3.webp",
];

const heroTabs = [
  {
    id: "piping",
    label: "Mechanical & Piping",
    icon: Wrench,
    summary:
      "Spesialis fabrikasi pipa penstock tekanan tinggi, steam header, and tangki industri standar ASME & API.",
    tag: "High-Pressure Piping",
  },
  {
    id: "electrical",
    label: "Electrical & Substation",
    icon: Zap,
    summary:
      "Instalasi gardu distribusi tegangan menengah, switchgear, sistem pentanahan, dan proteksi petir.",
    tag: "MV / LV Distribution",
  },
  {
    id: "automation",
    label: "Process Automation",
    icon: Cpu,
    summary:
      "Integrasi PLC Siemens/Schneider, SCADA terpusat, telemetry, dan instrumentasi cerdas real-time.",
    tag: "SCADA & PLC Control",
  },
  {
    id: "power-plant",
    label: "Power Plant Solutions",
    icon: Flame,
    summary:
      "Suplai suku cadang turbin, overhaul generator, laser alignment, dan pemeliharaan pembangkit minihidro.",
    tag: "Hydro & Thermal",
  },
];

export default function Hero({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState(heroTabs[0].id);
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentTab = heroTabs.find((t) => t.id === activeTab) || heroTabs[0];

  return (
    <section className="relative isolate overflow-hidden bg-[#051733] pb-24 pt-16 text-white md:pb-28 md:pt-24">
      {/* Background Slideshow Images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {heroImages.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
              idx === currentBg
                ? "opacity-75 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{
              backgroundImage: `url("${encodeURI(src)}")`,
            }}
          />
        ))}

        {/* Natural Dark Gradient for Clean Text Readability without Heavy Blue Tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030914]/90 via-[#030914]/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#041226]/95" />
      </div>

      <div className="container-x relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
          {/* Left Column: Headlines & CTA */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-200 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>PT. Airindo Teknologi Perkasa • Sejak 2013</span>
            </div>

            <h1 className="mt-5 text-[34px] font-extrabold leading-[1.12] sm:text-[44px] lg:text-[48px] tracking-tight">
              Industrial Piping &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                Integrated Engineering
              </span>{" "}
              Solutions
            </h1>

            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-blue-100/90 sm:text-[15.5px]">
              Berpengalaman dalam pekerjaan fabrikasi dan instalasi perpipaan
              skala industri, sistem mekanikal dan elektrikal, serta otomasi
              untuk mendukung kebutuhan pembangkit listrik dan fasilitas
              industri.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/proyek"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/40 transition hover:bg-blue-600 hover:scale-105"
              >
                Lihat Proyek Kami <ArrowRight size={16} />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Tentang Kami
              </Link>
            </div>

            {/* Background Slide Indicators */}
            <div className="mt-4 flex items-center gap-2">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentBg(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentBg
                      ? "w-7 bg-cyan-400"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Slide foto hero ${idx + 1}`}
                />
              ))}
            </div>

            {/* Quick Guarantees */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-xs text-blue-100/80">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={14} className="text-emerald-400" /> Welder
                Lisensi ASME
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck size={14} className="text-blue-300" /> Standar K3
                Zero Accident
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={14} className="text-emerald-400" /> 100% NDT
                &amp; Hydrotest
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quick-Service Peek Card */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 sm:p-7 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                <Sparkles size={13} /> Eksplorasi Cepat Bidang Layanan
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono text-white/70">
                AIRINDO-4PILAR
              </span>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {heroTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 rounded-xl p-2.5 text-left text-xs font-bold transition-all ${
                      isActive
                        ? "bg-brand text-white shadow-md shadow-brand/40 ring-1 ring-white/30"
                        : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <TabIcon
                      size={15}
                      className={isActive ? "text-white" : "text-sky-300"}
                    />
                    <span className="truncate">{tab.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Preview Content */}
            <div className="mt-5 rounded-xl border border-white/15 bg-black/25 p-4 transition-all">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <currentTab.icon size={16} className="text-sky-400" />
                  {currentTab.label}
                </h4>
                <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-200 border border-blue-400/20">
                  {currentTab.tag}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-blue-100/80">
                {currentTab.summary}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                <Link
                  href={`/layanan#${currentTab.id === "piping" ? "mechanical" : currentTab.id}`}
                  className="inline-flex items-center gap-1 text-sky-300 font-semibold hover:text-white"
                >
                  Detail Kapabilitas <ArrowRight size={12} />
                </Link>
                <a
                  href={company.whatsappUrl(
                    `Halo tim Airindo, saya ingin berkonsultasi & minta penawaran untuk layanan: ${currentTab.label}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white/15 px-3 py-1 font-semibold text-white hover:bg-white/25"
                >
                  Minta Penawaran
                </a>
              </div>
            </div>

            {/* Quick Contact Hotline */}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#064e3b] border border-emerald-500/60 p-3 text-xs text-emerald-100 shadow-md">
              <span className="flex items-center gap-1.5 font-medium">
                <MessageCircle size={14} className="text-emerald-400" /> Hotline
                Proyek / WhatsApp:
              </span>
              <a
                href={company.whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white underline hover:text-emerald-300"
              >
                {company.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Live Industrial Metrics Counters */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {companyStats.map((stat) => (
            <div
              key={stat.label}
              className="card-hover rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm text-center sm:text-left transition"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-blue-300 font-mono">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-bold text-white tracking-wide">
                {stat.label}
              </div>
              <p className="mt-0.5 text-[11px] text-blue-200/70 hidden sm:block leading-snug">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
