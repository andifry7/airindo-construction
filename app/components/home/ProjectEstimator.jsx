"use client";

import { useState } from "react";
import {
  Calculator,
  CheckCircle2,
  Clock,
  Layers,
  Send,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HardHat,
  FileSpreadsheet,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

const serviceOptions = [
  {
    id: "piping",
    label: "Piping & Spool Fabrication",
    sub: "Pipa penstock, steam header, water intake",
    standard: "ASME B31.1 / B31.3",
    badge: "Mekanikal",
  },
  {
    id: "tank",
    label: "Storage Tank & Pressure Vessel",
    sub: "Tangki penyimpanan BBM, kimia, silo",
    standard: "API 650 / ASME Sec VIII",
    badge: "Fabrikasi",
  },
  {
    id: "electrical",
    label: "Electrical MV/LV & Switchgear",
    sub: "Panel distribusi, kabel daya, transformator",
    standard: "IEC 61439 & PUIL 2011",
    badge: "Kelistrikan",
  },
  {
    id: "automation",
    label: "PLC, SCADA & Otomasi Pembangkit",
    sub: "Sistem kendali Siemens/Schneider & HMI",
    standard: "IEC 61131-3 & ISA-88",
    badge: "Otomasi",
  },
];

const scaleOptions = [
  {
    id: "maintenance",
    label: "Modifikasi / Maintenance Rutin",
    durationEst: "2 - 4 Minggu",
    teamEst: "4 - 8 Personel",
    desc: "Perbaikan segmen pipa, re-tubing, kalibrasi instrumen, atau penggantian valve.",
  },
  {
    id: "medium",
    label: "Fasilitas Pabrik Menengah (F&B / Manufaktur)",
    durationEst: "1 - 3 Bulan",
    teamEst: "10 - 20 Personel",
    desc: "Instalasi jalur pipa utilitas baru, instalasi gardu panel, dan otomasi lini produksi.",
  },
  {
    id: "powerplant",
    label: "Mega Proyek / Pembangkit Listrik (PLTM/PLTU)",
    durationEst: "3 - 6+ Bulan",
    teamEst: "20 - 45+ Personel",
    desc: "Erection penstock gunung, water intake besar, sinkronisasi generator tegangan menengah.",
  },
];

const scopeChecks = [
  { id: "design", label: "Desain Engineering & Detail Drawing (Isometric/P&ID)" },
  { id: "fab", label: "Fabrikasi di Workshop (Cutting, Bending, Fit-Up, Welding)" },
  { id: "erection", label: "Mobilisasi & Erection di Lapangan / Site" },
  { id: "ndt", label: "Pengujian Tekanan (Hydrotest) & NDT (Radiography/UT)" },
  { id: "comm", label: "Testing & Commissioning Berkelanjutan" },
];

export default function ProjectEstimator({ onOpenQuote }) {
  const [selectedService, setSelectedService] = useState(serviceOptions[0].id);
  const [selectedScale, setSelectedScale] = useState(scaleOptions[1].id);
  const [selectedScopes, setSelectedScopes] = useState(["design", "fab", "erection", "ndt"]);
  const [timeline, setTimeline] = useState("reguler");

  const toggleScope = (id) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentServiceObj = serviceOptions.find((s) => s.id === selectedService) || serviceOptions[0];
  const currentScaleObj = scaleOptions.find((s) => s.id === selectedScale) || scaleOptions[1];

  const handleSendEstimateToWA = () => {
    const scopeNames = scopeChecks
      .filter((s) => selectedScopes.includes(s.id))
      .map((s) => `• ${s.label}`)
      .join("\n");

    const message = `*ESTIMASI KEBUTUHAN PROYEK - AIRINDO CONSTRUCTION*
Jenis Layanan: ${currentServiceObj.label} (${currentServiceObj.badge})
Skala Proyek: ${currentScaleObj.label}
Estimasi Waktu: ${currentScaleObj.durationEst}
Estimasi Tim Lapangan: ${currentScaleObj.teamEst}
Prioritas Waktu: ${timeline === "urgent" ? "Mendesak (< 1 Bulan)" : "Reguler (1 - 3 Bulan)"}
Standar Acuan: ${currentServiceObj.standard}

Lingkup Pekerjaan yang Dipilih:
${scopeNames}

Mohon dapat dihubungkan dengan tim estimator untuk jadwal survei lokasi / BoQ.`;

    window.open(company.whatsappUrl(message), "_blank");
  };

  return (
    <section id="estimator" className="scroll-mt-20 py-20 bg-slate-50 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Kalkulator Interaktif"
          title="Estimasi Kebutuhan & Lingkup Proyek Anda"
          description="Pilih parameter pekerjaan teknik Anda di bawah ini untuk melihat gambaran alur pengerjaan, estimasi durasi, alokasi tim teknis, dan standar pengujian yang relevan."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          {/* Controls Column */}
          <div className="space-y-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
            {/* Step 1: Jenis Layanan */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white text-[10px]">1</span>
                Pilih Kategori Pekerjaan
              </div>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {serviceOptions.map((opt) => {
                  const active = selectedService === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedService(opt.id)}
                      className={`text-left rounded-xl border p-3.5 transition-all ${
                        active
                          ? "border-brand bg-brand/5 shadow-sm ring-1 ring-brand"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase text-brand">
                        {opt.badge}
                      </span>
                      <h4 className="mt-1 text-sm font-bold text-brand-navy">{opt.label}</h4>
                      <p className="mt-1 text-[11px] text-brand-muted">{opt.sub}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Skala Proyek */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white text-[10px]">2</span>
                Pilih Skala Fasilitas
              </div>
              <div className="mt-3 space-y-2">
                {scaleOptions.map((scale) => {
                  const active = selectedScale === scale.id;
                  return (
                    <button
                      key={scale.id}
                      type="button"
                      onClick={() => setSelectedScale(scale.id)}
                      className={`w-full text-left rounded-xl border p-3.5 transition-all ${
                        active
                          ? "border-brand bg-brand/5 shadow-sm ring-1 ring-brand"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-brand-navy">{scale.label}</h4>
                        <span className="text-[11px] font-semibold text-brand bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                          {scale.durationEst}
                        </span>
                      </div>
                      <p className="mt-1 text-[11.5px] text-brand-muted">{scale.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Lingkup Pekerjaan */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white text-[10px]">3</span>
                Lingkup Pekerjaan yang Dibutuhkan
              </div>
              <div className="mt-3 space-y-2">
                {scopeChecks.map((sc) => {
                  const checked = selectedScopes.includes(sc.id);
                  return (
                    <label
                      key={sc.id}
                      onClick={() => toggleScope(sc.id)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-2.5 text-xs transition ${
                        checked
                          ? "border-blue-200 bg-blue-50/70 text-brand-navy font-semibold"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                      />
                      <span>{sc.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Urgensi Timeline */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white text-[10px]">4</span>
                Target Waktu Pelaksanaan
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTimeline("urgent")}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                    timeline === "urgent"
                      ? "bg-red-500 text-white shadow"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  ⚡ Mendesak (&lt; 1 Bulan / Emergency)
                </button>
                <button
                  type="button"
                  onClick={() => setTimeline("reguler")}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                    timeline === "reguler"
                      ? "bg-brand text-white shadow"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  🗓️ Reguler (1 - 3 Bulan)
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Dynamic Results Card */}
          <div className="sticky top-24 h-fit rounded-2xl border border-blue-200 bg-gradient-to-b from-[#0b2557] to-[#041a3d] p-6 sm:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light/20 px-3 py-1 text-xs font-semibold text-brand-light">
                <Sparkles size={13} /> Ringkasan Analisis Teknis
              </span>
              <span className="text-[11px] font-mono text-white/60">LIVE-PREVIEW</span>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-white/60">
                  Layanan Terpilih:
                </span>
                <h4 className="text-lg font-bold text-white">
                  {currentServiceObj.label}
                </h4>
                <p className="text-xs text-brand-light font-mono mt-0.5">
                  Standar Kode: {currentServiceObj.standard}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl bg-white/5 p-3.5 border border-white/10 text-xs">
                <div>
                  <span className="text-white/60 block">Estimasi Durasi:</span>
                  <strong className="text-white text-sm font-semibold flex items-center gap-1 mt-0.5">
                    <Clock size={13} className="text-amber-400" /> {currentScaleObj.durationEst}
                  </strong>
                </div>
                <div>
                  <span className="text-white/60 block">Alokasi Personel:</span>
                  <strong className="text-white text-sm font-semibold flex items-center gap-1 mt-0.5">
                    <HardHat size={13} className="text-blue-400" /> {currentScaleObj.teamEst}
                  </strong>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-white/60 block mb-2">
                  Cakupan Terverifikasi ({selectedScopes.length} Komponen):
                </span>
                <ul className="space-y-1.5 text-xs text-white/90">
                  {scopeChecks
                    .filter((sc) => selectedScopes.includes(sc.id))
                    .map((sc) => (
                      <li key={sc.id} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{sc.label}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-[11.5px] text-white/80">
                <div className="flex items-center gap-2 text-brand-light font-semibold mb-1">
                  <ShieldCheck size={14} /> Jaminan Kualitas Airindo:
                </div>
                Termasuk Welding Procedure Specification (WPS), Welder Qualification Record (WQR), inspeksi NDT, dan Manufacturer Data Report (MDR).
              </div>
            </div>

            <div className="mt-7 space-y-2.5">
              <button
                type="button"
                onClick={handleSendEstimateToWA}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-emerald-600"
              >
                <Send size={15} /> Kirim Estimasi ini ke WhatsApp Tim Teknis
              </button>

              <button
                type="button"
                onClick={() => onOpenQuote && onOpenQuote(currentServiceObj.label)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 py-3 text-xs font-bold text-white transition hover:bg-white/20"
              >
                <FileSpreadsheet size={15} /> Jadwalkan Site Survey &amp; BoQ Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
