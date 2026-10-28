"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  ShieldAlert,
  FileText,
  Send,
  ArrowRight,
  Award,
} from "lucide-react";
import IndustrialVisual from "@/components/ui/IndustrialVisual";
import { company } from "@/lib/data";

export default function ServiceDetailModal({ service, onClose, onConsult }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (service) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const handleWhatsapp = () => {
    const message = `Halo Tim Airindo, saya ingin menanyakan lebih lanjut mengenai layanan: *${service.title}*. Mohon informasi ketersediaan tim dan proposal penawaran.`;
    window.open(company.whatsappUrl(message), "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="fixed inset-0 bg-[#03142e]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, 672px"
            />
          ) : (
            <IndustrialVisual
              type={service.id || "mechanical"}
              title={service.title}
              subtitle={service.badge}
              className="h-full w-full"
            />
          )}
          <button
            onClick={onClose}
            aria-label="Tutup detail layanan"
            className="absolute right-3 top-3 z-20 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-bold text-brand uppercase">
              {service.badge}
            </span>
            <span className="text-xs text-brand-muted flex items-center gap-1 font-medium">
              <Award size={13} className="text-amber-500" /> Sertifikasi K3
              &amp; Industri
            </span>
          </div>

          <h3
            id="service-modal-title"
            className="mt-2 text-2xl font-bold text-brand-navy"
          >
            {service.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-700 font-medium">
            {service.lead}
          </p>

          <p className="mt-2 text-xs leading-relaxed text-brand-muted">
            {service.description}
          </p>

          {/* Scope Points */}
          <div className="mt-5 rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
              Cakupan &amp; Kemampuan Teknis (Scope of Capabilities)
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-700">
              {service.scopePoints?.map((sp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-brand"
                  />
                  <span>{sp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards & Highlights */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-3 bg-white">
              <span className="text-[11px] font-bold uppercase text-brand-navy block">
                Standar &amp; Kode Rujukan:
              </span>
              <div className="mt-2 flex flex-wrap gap-1">
                {service.standards?.map((std) => (
                  <span
                    key={std}
                    className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3">
              <span className="text-[11px] font-bold uppercase text-brand-navy block">
                Contoh Referensi Proyek:
              </span>
              <p className="mt-1 text-xs text-brand font-medium">
                {service.caseHighlight}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Tutup
            </button>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleWhatsapp}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-700"
              >
                <Send size={13} /> Minta Penawaran via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
