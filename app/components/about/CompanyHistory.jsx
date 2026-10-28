"use client";

import { useState } from "react";
import {
  MapPin,
  ShieldCheck,
  Award,
  Factory,
  CheckCircle2,
  Building,
  Wrench,
} from "lucide-react";
import { aboutValues, workshops, company } from "@/lib/data";
import LocationMap from "@/components/ui/LocationMap";

const milestones = [
  {
    year: "2013",
    title: "Pendirian Perusahaan",
    desc: "Didirikan di Jakarta sebagai spesialis perpipaan dan mekanikal industri.",
  },
  {
    year: "2016",
    title: "Ekspansi Fasilitas Sentul",
    desc: "Membangun workshop fabrikasi pipa besar dan bejana tekan di Sentul Bogor.",
  },
  {
    year: "2019",
    title: "Sertifikasi K3 & Pembangkit",
    desc: "Menangani proyek penstock PLTM minihidro nasional dan otomasi SCADA.",
  },
  {
    year: "2023",
    title: "Fasilitas Candi Semarang",
    desc: "Perluasan workshop perakitan panel elektrikal dan machining di Jawa Tengah.",
  },
];

export default function CompanyHistory() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-x">
        {/* Header Section */}
        <div className="max-w-3xl">
          <span className="eyebrow">Profil &amp; Sejarah Perusahaan</span>
          <h1 className="mt-3 text-[32px] font-extrabold leading-tight text-brand-navy sm:text-[40px]">
            Keahlian Teknis &amp; Komitmen Kualitas Sejak 2013
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-muted">
            <strong className="text-brand-navy">{company.fullName}</strong>{" "}
            adalah perusahaan yang bergerak di bidang mekanikal dan elektrikal
            dengan pengalaman dalam menangani kebutuhan industri dan pembangkit
            listrik. <br />
            <br />
            Berdiri sejak tahun <strong>2013</strong>, kami menyediakan solusi
            terintegrasi melalui pekerjaan fabrikasi dan instalasi perpipaan,
            sistem mekanikal, elektrikal, otomasi proses, serta penyediaan
            peralatan untuk kebutuhan industri.
          </p>
        </div>

        {/* Core Values & Milestones Grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Values Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
              <ShieldCheck className="text-brand" size={20} /> Nilai Utama &amp;
              Standar Kerja
            </h2>
            <ul className="space-y-4">
              {aboutValues.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="card card-hover flex gap-4 p-5 sm:p-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/30">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-brand-navy">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-brand-muted">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Workshop Facilities Tab */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                <Factory className="text-brand" size={20} /> Fasilitas Workshop
                Mandiri
              </h2>
              <span className="text-xs font-semibold text-brand bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                2 Lokasi Strategis
              </span>
            </div>

            <p className="mt-2 text-xs text-brand-muted">
              Didukung peralatan bending pipa hidrolik, mesin las otomatis,
              crane overhead, dan area pengujian tekanan tinggi.
            </p>

            {/* Workshop Switcher Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              {workshops.map((w, idx) => {
                const active = selectedWorkshop === idx;
                return (
                  <button
                    key={w.name}
                    type="button"
                    onClick={() => setSelectedWorkshop(idx)}
                    className={`rounded-xl p-3 text-left transition-all ${
                      active
                        ? "bg-brand text-white shadow-md shadow-brand/20 ring-1 ring-brand"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase block opacity-80">
                      Fasilitas {idx + 1}
                    </span>
                    <strong className="text-xs block mt-0.5">
                      {w.name.split(" ")[0]} {w.name.split(" ")[1]}
                    </strong>
                  </button>
                );
              })}
            </div>

            {/* Active Workshop Card */}
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 text-xs text-brand-navy font-bold">
                  <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>{workshops[selectedWorkshop].name}</span>
                </div>
                <a
                  href={workshops[selectedWorkshop].mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-brand hover:bg-blue-100"
                >
                  Peta Google Maps
                </a>
              </div>
              <p className="mt-1 text-xs text-slate-600 pl-6">
                {workshops[selectedWorkshop].location}
              </p>
              <div className="mt-4 border-t border-slate-100 pt-3 pl-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand block mb-1">
                  Kapabilitas &amp; Alat Utama:
                </span>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {workshops[selectedWorkshop].features}
                </p>
              </div>
            </div>

            {/* Google Map Embed for Workshop */}
            <div className="mt-4">
              <LocationMap
                locations={[workshops[selectedWorkshop]]}
                height="220px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
