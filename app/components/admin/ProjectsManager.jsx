"use client";

import { useState, useRef } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Star,
  MapPin,
  Calendar,
  X,
  AlertTriangle,
  Upload,
  CheckCircle2,
} from "lucide-react";

export default function ProjectsManager({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onToggleFeatured
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef(null);

  // Default empty project form
  const initialForm = {
    title: "",
    category: "Fabrikasi & Instalasi",
    categoryKey: "fabrikasi",
    image: "",
    location: "",
    client: "",
    year: new Date().getFullYear().toString(),
    capacity: "",
    specs: "",
    scope: "",
    description: "",
    tags: "Engineering, Piping, Fabrikasi",
    featured: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const categories = [
    { key: "all", label: "Semua Kategori" },
    { key: "fabrikasi", label: "Fabrikasi & Instalasi" },
    { key: "pipa", label: "Fabrikasi Pipa Industri" },
    { key: "otomasi", label: "Otomasi & Kelistrikan" },
  ];

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" ||
      project.categoryKey === selectedCategory ||
      (selectedCategory === "pipa" && project.category.toLowerCase().includes("pipa"));

    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setUploadedFileName("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : (project.tags || ""),
    });
    setUploadedFileName("");
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Pilih file foto/gambar yang valid (JPG, PNG, atau WEBP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file gambar maksimal 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        image: event.target.result,
      }));
      setUploadedFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const tagsArray = typeof formData.tags === "string"
      ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : formData.tags || [];

    const projectPayload = {
      ...formData,
      id: editingProject ? editingProject.id : `proj-${Date.now()}`,
      tags: tagsArray,
    };

    if (editingProject) {
      onUpdateProject(projectPayload);
    } else {
      onAddProject(projectPayload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    onDeleteProject(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top action bar: Search, filter, view switcher, and Add Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari proyek, klien, lokasi, spesifikasi..."
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

        {/* Categories Filter & Add Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand hover:bg-[#0b2557] text-white text-xs font-semibold shadow-xs hover:shadow-md transition cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Proyek
          </button>
        </div>
      </div>

      {/* Result Count and Stats */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Menampilkan <strong>{filteredProjects.length}</strong> dari {projects.length} total proyek
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            {projects.filter((p) => p.featured).length} Proyek Unggulan di Homepage
          </span>
        </div>
      </div>

      {/* Projects List: Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Tidak ada proyek yang cocok</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau ganti filter kategori proyek di atas.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-3 py-1.5 text-xs text-brand font-semibold hover:underline cursor-pointer"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const isFeatured = !!project.featured;

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = "/images/projects/Penstock PLTM Aek Sibundong.jpeg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/10">
                      {project.category}
                    </span>

                    {/* Toggle Featured Button */}
                    <button
                      onClick={() => onToggleFeatured(project.id)}
                      title={isFeatured ? "Hapus dari Beranda" : "Tampilkan di Beranda"}
                      className={`p-1.5 rounded-lg backdrop-blur-md transition cursor-pointer flex items-center gap-1 text-[11px] font-bold ${
                        isFeatured
                          ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                          : "bg-black/50 text-white/70 hover:text-white"
                      }`}
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          isFeatured ? "fill-white" : ""
                        }`}
                      />
                      <span className="text-[10px]">
                        {isFeatured ? "Featured" : "Biasa"}
                      </span>
                    </button>
                  </div>

                  {/* Bottom Image Overlay: Year & Capacity */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                    <span className="flex items-center gap-1 drop-shadow-sm">
                      <Calendar className="w-3 h-3 text-blue-300" />
                      {project.year}
                    </span>
                    {project.capacity && (
                      <span className="bg-brand/80 px-2 py-0.5 rounded text-[10px] font-sans font-semibold drop-shadow-sm">
                        {project.capacity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{project.location || "Lokasi Proyek"}</span>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <strong className="text-slate-800">Klien:</strong> {project.client || "-"}
                      {project.specs && (
                        <div className="truncate mt-0.5">
                          <strong className="text-slate-800">Spek:</strong> {project.specs}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {Array.isArray(project.tags) && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                          >
                            #{tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Action footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenEditModal(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 text-slate-500" />
                      Edit Data
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(project.id)}
                      className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                      title="Hapus Proyek"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                  {editingProject ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingProject ? "Edit Portofolio Proyek" : "Tambah Proyek Baru"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Isi detail spesifikasi teknis dan dokumentasi lapangan
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {/* Judul Proyek */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama / Judul Proyek *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Penstock PLTM Aek Sibundong"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent font-medium"
                />
              </div>

              {/* Kategori & Tahun */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kategori Proyek
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      let key = "fabrikasi";
                      if (val.toLowerCase().includes("pipa")) key = "pipa";
                      if (val.toLowerCase().includes("otomasi")) key = "otomasi";
                      setFormData({ ...formData, category: val, categoryKey: key });
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="Fabrikasi & Instalasi">Fabrikasi & Instalasi</option>
                    <option value="Fabrikasi Pipa">Fabrikasi Pipa Industri</option>
                    <option value="Otomasi & Kelistrikan">Otomasi & Kelistrikan</option>
                    <option value="Power Plant Maintenance">Power Plant Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tahun Pengerjaan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 2023 - 2024"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Klien & Lokasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nama Klien / Pemilik Proyek
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PT. PLN / Pengembang IPP"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Lokasi Pekerjaan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Lahat, Sumatera Selatan"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Kapasitas & Spesifikasi Teknis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kapasitas Teknis
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 2 x 5 MW atau 150 MW"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Spesifikasi Utama (Specs)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pipa Ø 1.800 mm, Panjang 650 m"
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Foto Proyek: Upload File Sendiri */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Foto Dokumentasi Proyek *
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {formData.image ? (
                  <div className="relative rounded-xl border border-slate-200 bg-slate-50 overflow-hidden group">
                    <div className="relative h-48 bg-slate-100">
                      <img
                        src={formData.image}
                        alt="Preview foto proyek"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-2 rounded-lg bg-white/95 text-slate-900 font-semibold text-xs shadow-md hover:bg-white flex items-center gap-1.5 cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-brand" />
                          Ganti Foto
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, image: "" });
                            setUploadedFileName("");
                          }}
                          className="px-3.5 py-2 rounded-lg bg-rose-600 text-white font-semibold text-xs shadow-md hover:bg-rose-700 flex items-center gap-1.5 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Hapus Foto
                        </button>
                      </div>
                    </div>

                    <div className="p-2.5 flex items-center justify-between text-xs text-slate-600 bg-white border-t border-slate-100">
                      <span className="flex items-center gap-1.5 truncate text-[11px] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{uploadedFileName || "Foto telah dipilih"}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-brand font-semibold text-[11px] hover:underline cursor-pointer shrink-0"
                      >
                        Pilih berkas lain
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-brand/60 hover:bg-blue-50/20 rounded-2xl p-7 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2.5 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand flex items-center justify-center group-hover:scale-105 transition">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        Klik untuk memilih foto dari komputer
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Mendukung format JPG, PNG, atau WEBP (Maksimal 5MB)
                      </div>
                    </div>
                    <span className="mt-1 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-xs shadow-2xs group-hover:bg-brand group-hover:text-white group-hover:border-transparent transition">
                      Pilih Berkas Foto
                    </span>
                  </div>
                )}
              </div>

              {/* Ruang Lingkup (Scope) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ruang Lingkup Pekerjaan (Scope of Work)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Fabrikasi spools, transportasi jalur terjal, pengelasan ASME, NDT Radiography 100%, Hydrotest..."
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand leading-relaxed"
                />
              </div>

              {/* Deskripsi Tambahan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ringkasan / Catatan Teknis
                </label>
                <textarea
                  rows={2}
                  placeholder="Penjelasan singkat mengenai tantangan teknis atau hasil pengerjaan..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand leading-relaxed"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tags (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Penstock, Hydro Power, ASME Welder, NDT Tested"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              {/* Featured in Homepage Switch */}
              <div className="pt-2">
                <label className="flex items-center gap-3 p-3 bg-amber-50/70 border border-amber-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-brand rounded focus:ring-brand"
                  />
                  <div>
                    <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      Tampilkan Sebagai Proyek Unggulan di Beranda
                    </div>
                    <div className="text-[11px] text-amber-700">
                      Proyek ini akan langsung diprioritaskan tampil di slider halaman depan
                    </div>
                  </div>
                </label>
              </div>

              {/* Footer Save / Cancel */}
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
                  {editingProject ? "Simpan Perubahan" : "Tambahkan ke Portofolio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-sm w-full text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Hapus Proyek Ini?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Data proyek akan dihapus dari daftar portofolio website. Anda bisa mengembalikan data awal lewat tombol Reset Default sewaktu-waktu.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm cursor-pointer"
              >
                Ya, Hapus Proyek
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
