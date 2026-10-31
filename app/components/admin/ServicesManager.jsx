"use client";

import { useState } from "react";
import {
  Wrench,
  Zap,
  Cpu,
  Flame,
  Pencil,
  CheckCircle2,
  X,
  Plus,
} from "lucide-react";

export default function ServicesManager({ services, onUpdateService }) {
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortTitle: "",
    badge: "",
    lead: "",
    description: "",
    scopePoints: [],
    standards: [],
    caseHighlight: "",
  });

  const getServiceIcon = (id) => {
    switch (id) {
      case "mechanical":
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case "electrical":
        return <Zap className="w-5 h-5 text-amber-500" />;
      case "automation":
        return <Cpu className="w-5 h-5 text-emerald-500" />;
      case "power-plant":
        return <Flame className="w-5 h-5 text-orange-500" />;
      default:
        return <Wrench className="w-5 h-5 text-brand" />;
    }
  };

  const handleOpenEdit = (service) => {
    setEditingService(service);
    setFormData({
      ...service,
      scopePoints: service.scopePoints || [],
      standards: service.standards || [],
    });
    setIsModalOpen(true);
  };

  const handleScopeChange = (idx, value) => {
    const next = [...formData.scopePoints];
    next[idx] = value;
    setFormData({ ...formData, scopePoints: next });
  };

  const handleAddScopePoint = () => {
    setFormData({
      ...formData,
      scopePoints: [...formData.scopePoints, "Lingkup pengerjaan baru..."],
    });
  };

  const handleRemoveScopePoint = (idx) => {
    setFormData({
      ...formData,
      scopePoints: formData.scopePoints.filter((_, i) => i !== idx),
    });
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    onUpdateService({
      ...editingService,
      ...formData,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Intro info card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Layanan Spesialis & Standar Keteknikan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            4 pilar layanan utama yang dipresentasikan pada halaman Layanan dan beranda Airindo.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-brand border border-blue-100">
          4 Pilar Layanan Aktif
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {getServiceIcon(service.id)}
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-brand text-[11px] font-semibold border border-blue-100">
                  {service.badge || "Spesialis"}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">
                {service.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {service.lead}
              </p>

              {/* Scope highlights */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Ruang Lingkup ({service.scopePoints?.length || 0} Poin)
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {service.scopePoints?.slice(0, 3).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                      <span className="truncate">{point}</span>
                    </li>
                  ))}
                  {(service.scopePoints?.length || 0) > 3 && (
                    <li className="text-[11px] text-slate-400 italic pl-5">
                      +{service.scopePoints.length - 3} lingkup lainnya
                    </li>
                  )}
                </ul>
              </div>

              {/* Standards Tags */}
              {service.standards && service.standards.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.standards.map((std, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono font-medium"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                {service.caseHighlight}
              </span>
              <button
                onClick={() => handleOpenEdit(service)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 text-slate-500" />
                Edit Layanan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT SERVICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Edit {formData.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Perbarui judul, ringkasan dan poin lingkup pengerjaan teknis
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Judul Lengkap Layanan
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Label Badge Singkat
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ringkasan Pengantar (Lead)
                </label>
                <textarea
                  rows={2}
                  value={formData.lead}
                  onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Deskripsi Lengkap Kapabilitas
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              {/* Dynamic Scope of work */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Daftar Ruang Lingkup Pekerjaan
                  </label>
                  <button
                    type="button"
                    onClick={handleAddScopePoint}
                    className="text-xs text-brand font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Poin
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.scopePoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleScopeChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveScopePoint(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand hover:bg-[#0b2557] text-white font-semibold text-xs shadow-md transition cursor-pointer"
                >
                  Simpan Perubahan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
