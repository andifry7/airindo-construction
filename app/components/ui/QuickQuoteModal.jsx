"use client";

import { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Phone, Mail, Building, FileText, ArrowRight } from "lucide-react";
import { company } from "@/lib/data";

export default function QuickQuoteModal({ isOpen, onClose, initialService = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contact: "",
    service: initialService || "Mechanical & Piping",
    location: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendWhatsapp();
    setSubmitted(true);
  };

  const handleSendWhatsapp = () => {
    const message = `*PERMINTAAN PENAWARAN (RFQ) - AIRINDO CONSTRUCTION*
Nama: ${formData.name || "-"}
Perusahaan: ${formData.company || "-"}
Kontak: ${formData.contact || "-"}
Layanan: ${formData.service}
Lokasi Proyek: ${formData.location || "-"}
Kebutuhan: ${formData.notes || "Konsultasi teknis & RAB"}`;

    window.open(company.whatsappUrl(message), "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#03142e]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-[#0b2557] to-[#1261d9] px-6 py-4 text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-light">
              Permintaan Penawaran Resmi
            </span>
            <h3 id="modal-title" className="text-lg font-bold">
              Konsultasi &amp; Request For Quotation (RFQ)
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="rounded-lg p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="mt-4 text-xl font-bold text-brand-navy">
              Permintaan Berhasil Dicatat!
            </h4>
            <p className="mt-2 text-sm text-brand-muted">
              Terima kasih, <strong>{formData.name || "Bapak/Ibu"}</strong>. Tim engineering PT. Airindo Teknologi Perkasa akan segera meninjau spesifikasi kebutuhan proyek Anda.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleSendWhatsapp}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700"
              >
                <Send size={15} /> Lanjutkan ke WhatsApp Cepat
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <p className="mb-4 text-xs text-brand-muted">
              Isi data awal proyek Anda di bawah ini. Tim estimator dan engineering kami akan menghubungi Anda untuk pembahasan gambar kerja dan BoQ.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-brand-navy">
                  Nama Lengkap *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Ir. Bambang"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy">
                  Perusahaan / Instansi *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: PT. Energi Nusantara"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy">
                  No. WhatsApp / Telepon *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy">
                  Pilihan Layanan
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  <option value="Mechanical & Piping">Mechanical &amp; Piping Engineering</option>
                  <option value="Electrical & Substation">Electrical &amp; Substation</option>
                  <option value="Process Automation & SCADA">Process Automation &amp; SCADA</option>
                  <option value="Power Plant Equipments">Power Plant Equipments</option>
                  <option value="Fabrikasi Tangki & Bejana">Fabrikasi Tangki &amp; Bejana Tekan</option>
                  <option value="Maintenance & Overhaul">Maintenance &amp; Overhaul</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-brand-navy">
                Lokasi Proyek / Fasilitas
              </label>
              <input
                type="text"
                placeholder="Contoh: Cilegon, Jawa Timur, Sumatera Utara, dsb."
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-brand-navy">
                Ringkasan Lingkup Kerja / Kebutuhan
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan kebutuhan spesifikasi, ukuran pipa, kapasitas tangki, atau jadwal yang diharapkan..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition"
              >
                <Send size={14} /> Kirim Permintaan via WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
