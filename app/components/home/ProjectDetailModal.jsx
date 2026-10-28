"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, MapPin, Calendar, Briefcase, CheckCircle2, ShieldCheck, Send, ArrowRight } from "lucide-react";
import IndustrialVisual from "@/components/ui/IndustrialVisual";
import { company } from "@/lib/data";

export default function ProjectDetailModal({ project, onClose, onConsult }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleWhatsapp = () => {
    const message = `Halo Tim Airindo Construction, saya tertarik berdiskusi mengenai proyek serupa seperti: *${project.title}* (${project.location}). Mohon informasi kapabilitas dan penawarannya.`;
    window.open(company.whatsappUrl(message), "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="fixed inset-0 bg-[#03142e]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Technical Banner */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, 672px"
            />
          ) : (
            <IndustrialVisual
              type={project.categoryKey || "mechanical"}
              title={project.title}
              subtitle={project.location}
              className="h-full w-full"
            />
          )}
          <button
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className="absolute right-3 top-3 z-20 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-bold text-brand uppercase">
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-brand-muted">
              <Calendar size={13} /> {project.year}
            </span>
            <span className="flex items-center gap-1 text-xs text-brand-muted">
              <MapPin size={13} className="text-red-500" /> {project.location}
            </span>
          </div>

          <h3 id="project-modal-title" className="mt-3 text-2xl font-bold text-brand-navy">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            {project.description}
          </p>

          {/* Technical Specs Grid */}
          <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
              Parameter &amp; Spesifikasi Teknis
            </h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
              <div>
                <span className="text-brand-muted block">Klien / Pemilik Proyek:</span>
                <strong className="text-brand-navy">{project.client}</strong>
              </div>
              <div>
                <span className="text-brand-muted block">Kapasitas Fasilitas:</span>
                <strong className="text-brand-navy">{project.capacity}</strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-brand-muted block">Dimensi &amp; Material:</span>
                <strong className="text-brand-navy">{project.specs}</strong>
              </div>
            </div>
          </div>

          {/* Scope of Work */}
          <div className="mt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
              Lingkup Pekerjaan Utama
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-brand-muted bg-white p-3 rounded-lg border border-slate-200/60">
              {project.scope}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags?.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
              >
                <CheckCircle2 size={12} className="text-brand" /> {t}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
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
                <Send size={13} /> Diskusi Proyek via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
