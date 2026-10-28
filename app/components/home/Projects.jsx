"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Search, Calendar, Filter, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import IndustrialVisual from "@/components/ui/IndustrialVisual";
import ProjectDetailModal from "@/components/home/ProjectDetailModal";
import { projects, projectCategories } from "@/lib/data";

export default function Projects({ onOpenQuote }) {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((p) => {
    const matchCategory =
      activeCategory === "semua" || p.categoryKey === activeCategory;
    const matchSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <section id="proyek" className="scroll-mt-20 py-20 md:py-28 bg-slate-50/70">
      <div className="container-x">
        <div className="sm:flex sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Portofolio Rekayasa Lapangan"
              title="Pengalaman Teruji di Proyek Nasional"
              description="Menangani pekerjaan fabrikasi pipa tekanan tinggi, penstock minihidro, tangki industri, dan gardu otomasi di berbagai wilayah Indonesia."
            />
          </div>

          {/* Quick Search */}
          <div className="mt-5 sm:mt-0 relative w-full sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari proyek / lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-brand-navy placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter size={13} /> Kategori:
          </span>
          {projectCategories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-brand text-white shadow-md shadow-brand/20"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="mt-8">
          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <Layers size={32} className="mx-auto text-slate-400" />
              <h4 className="mt-3 text-sm font-bold text-brand-navy">Tidak ada proyek yang sesuai kriteria pencarian</h4>
              <p className="mt-1 text-xs text-brand-muted">Coba ubah kata kunci atau pilih kategori lain.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("semua");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-lg bg-brand px-4 py-1.5 text-xs font-semibold text-white"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="card card-hover flex flex-col justify-between overflow-hidden group cursor-pointer"
                >
                  <div>
                    {/* Visual Card Banner */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <IndustrialVisual
                          type={p.categoryKey}
                          title={p.title}
                          subtitle={p.location}
                          className="h-full w-full"
                        />
                      )}
                      <div className="absolute inset-0 bg-brand-navy/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="rounded-full bg-white px-3.5 py-1 text-xs font-bold text-brand-navy shadow-lg">
                          Buka Lembar Teknis Proyek
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-brand border border-blue-100">
                          {p.category}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                          <Calendar size={12} /> {p.year}
                        </span>
                      </div>

                      <h3 className="mt-2.5 text-base font-bold text-brand-navy group-hover:text-brand transition-colors">
                        {p.title}
                      </h3>

                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-muted">
                        <MapPin size={13} className="text-red-500 shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </p>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {p.specs}
                      </p>

                      {/* Tag badges */}
                      <div className="mt-3.5 flex flex-wrap gap-1">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded bg-slate-100 px-2 py-0.5 text-[9.5px] font-medium text-slate-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="border-t border-slate-100 p-4 bg-slate-50/50 flex items-center justify-between text-xs font-semibold">
                    <span className="text-brand group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Lihat Spek &amp; Scope <ChevronRight size={14} />
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {p.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onConsult={(projTitle) => {
            if (onOpenQuote) onOpenQuote(`Proyek Serupa: ${projTitle}`);
          }}
        />
      )}
    </section>
  );
}
