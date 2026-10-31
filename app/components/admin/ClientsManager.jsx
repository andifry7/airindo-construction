"use client";

import { useState, useRef } from "react";
import {
  Plus,
  Search,
  Building2,
  Trash2,
  Pencil,
  X,
  AlertTriangle,
  Upload,
} from "lucide-react";

export default function ClientsManager({
  clients,
  onAddClient,
  onUpdateClient,
  onDeleteClient
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState(null);
  const logoInputRef = useRef(null);

  const initialForm = {
    name: "",
    sector: "Pembangkit & Energi",
    logo: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const sectors = [
    "Pembangkit & Energi",
    "Migas & Petrokimia",
    "Otomotif & Manufaktur",
    "Makanan & Minuman",
    "Industri Semen & Material",
    "Agroindustri & Kelapa Sawit",
    "Transportasi & Infrastruktur",
    "Komersial & Hospitality",
  ];

  // Filter clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "all" || client.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client, index) => {
    setEditingClient({ ...client, _index: index });
    setFormData({ ...client });
    setIsModalOpen(true);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Pilih file gambar logo yang valid (PNG, JPG, SVG, WEBP)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        logo: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingClient !== null) {
      onUpdateClient(editingClient._index, formData);
    } else {
      onAddClient(formData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    onDeleteClient(index);
    setDeleteConfirmIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama klien / partner industri..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand cursor-pointer"
          >
            <option value="all">Semua Sektor Industri</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand hover:bg-[#0b2557] text-white text-xs font-semibold shadow-xs hover:shadow-md transition cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Klien
          </button>
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Menampilkan <strong>{filteredClients.length}</strong> dari {clients.length} klien terdaftar
        </div>
      </div>

      {/* Clients Cards Grid */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
          <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800 text-sm">Klien tidak ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1">
            Gunakan filter lain atau tambah mitra korporasi baru.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredClients.map((client, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md hover:border-brand/40 transition flex flex-col justify-between group relative"
            >
              {/* Logo Area */}
              <div className="h-16 flex items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50/30 transition">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              {/* Client Info */}
              <div className="mt-3 text-center">
                <h4 className="font-bold text-xs text-slate-900 truncate">
                  {client.name}
                </h4>
                <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                  {client.sector}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-1.5 opacity-90 group-hover:opacity-100">
                <button
                  onClick={() => handleOpenEdit(client, idx)}
                  className="p-1 rounded-md text-slate-400 hover:text-brand hover:bg-slate-100 transition cursor-pointer"
                  title="Edit Klien"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmIndex(idx)}
                  className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Hapus Klien"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT CLIENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {editingClient ? "Edit Klien / Mitra" : "Tambah Klien Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Perusahaan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT. Pertamina (Persero)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sektor Industri
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {sectors.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Logo Perusahaan *
                </label>

                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />

                {formData.logo ? (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0">
                      <img
                        src={formData.logo}
                        alt="Preview logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {formData.name ? `${formData.name} Logo` : "Logo Terpilih"}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                        Siap disimpan
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => logoInputRef.current?.click()}
                          className="text-xs font-semibold text-brand hover:underline cursor-pointer"
                        >
                          Ganti Logo
                        </button>
                        <span className="text-slate-300">•</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, logo: "" })}
                          className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-brand/60 hover:bg-blue-50/20 rounded-xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand flex items-center justify-center group-hover:scale-105 transition">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        Klik untuk memilih berkas logo dari komputer
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Mendukung format PNG, JPG, SVG, atau WEBP
                      </div>
                    </div>
                  </div>
                )}
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
                  {editingClient ? "Simpan Perubahan" : "Tambahkan Klien"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirmIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-sm w-full text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Hapus Logo Klien?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Logo ini akan dihapus dari daftar klien yang ditampilkan pada homepage website.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                onClick={() => setDeleteConfirmIndex(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmIndex)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
