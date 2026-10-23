"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import IndustrialVisual from "@/components/ui/IndustrialVisual";
import ServiceDetailModal from "@/components/home/ServiceDetailModal";
import { services } from "@/lib/data";

export default function Services({ onOpenQuote }) {
  const [selectedService, setSelectedService] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const validCategoryIds = services.map((s) => s.id);

  useEffect(() => {
    const syncFromUrl = (shouldScroll = false) => {
      if (typeof window === "undefined") return;

      const hash = window.location.hash.replace("#", "").trim().toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const queryCat = (
        searchParams.get("kategori") ||
        searchParams.get("category") ||
        ""
      ).toLowerCase();

      const target = hash || queryCat;

      if (target && validCategoryIds.includes(target)) {
        setFilterCategory(target);
        if (shouldScroll) {
          setTimeout(() => {
            const el = document.getElementById("layanan");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 80);
        }
      } else if (target === "" || target === "layanan" || target === "all") {
        setFilterCategory("all");
      }
    };

    syncFromUrl(true);

    const onHashChange = () => syncFromUrl(true);
    const onPopState = () => syncFromUrl(true);

    const onSelectCategory = (e) => {
      const cat = e.detail;
      if (cat && validCategoryIds.includes(cat)) {
        setFilterCategory(cat);
        setTimeout(() => {
          const el = document.getElementById("layanan");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 80);
      } else if (cat === "all") {
        setFilterCategory("all");
      }
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("airindo:select-category", onSelectCategory);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("airindo:select-category", onSelectCategory);
    };
  }, []);

  const handleFilterChange = (catId) => {
    setFilterCategory(catId);
    if (typeof window !== "undefined") {
      const newUrl =
        catId === "all"
          ? window.location.pathname
          : `${window.location.pathname}#${catId}`;
      window.history.replaceState(null, "", newUrl);
    }
  };

  const filteredServices =
    filterCategory === "all"
      ? services
      : services.filter((s) => s.id === filterCategory);

  return (
    <section id="layanan" className="scroll-mt-20 py-20 md:py-28 bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Solusi Engineering Terintegrasi"
          title="Layanan Spesialis untuk Kebutuhan Industri & Energi"
          description="Didukung fasilitas fabrikasi workshop mandiri di Sentul & Semarang, insinyur bersertifikasi, serta kepatuhan standar mutu ASME, API, dan IEC."
        />

        {/* Category Pills Filter */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleFilterChange("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              filterCategory === "all"
                ? "bg-brand text-white shadow-md shadow-brand/20"
                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Semua Layanan ({services.length})
          </button>
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleFilterChange(s.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                filterCategory === s.id
                  ? "bg-brand text-white shadow-md shadow-brand/20"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {s.shortTitle}
            </button>
          ))}
        </div>

        {/* Grid of Interactive Service Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredServices.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={s.id}
                className="card card-hover flex flex-col justify-between overflow-hidden group cursor-pointer"
                onClick={() => setSelectedService(s)}
              >
                <div>
                  {/* Visual Header */}
                  <div className="relative h-40 overflow-hidden bg-slate-900">
                    <IndustrialVisual
                      type={s.id}
                      title={s.shortTitle}
                      subtitle={s.badge}
                      className="h-full w-full"
                    />
                    <div className="absolute inset-0 bg-brand-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-brand-navy shadow">
                        Klik untuk Spesifikasi
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                        {s.badge}
                      </span>
                      <Icon size={16} className="text-brand-muted" />
                    </div>

                    <h3 className="mt-2 text-base font-bold text-brand-navy group-hover:text-brand transition-colors">
                      {s.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-brand-muted line-clamp-3">
                      {s.lead}
                    </p>

                    {/* Standard tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {s.standards.slice(0, 2).map((std) => (
                        <span
                          key={std}
                          className="rounded bg-slate-100 px-2 py-0.5 text-[9.5px] font-medium text-slate-600"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="border-t border-slate-100 p-4 bg-slate-50/50 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(s);
                    }}
                    className="font-bold text-brand hover:text-brand-navy inline-flex items-center gap-1"
                  >
                    Lihat Scope &amp; Standar <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onConsult={(serviceName) => {
            if (onOpenQuote) onOpenQuote(serviceName);
          }}
        />
      )}
    </section>
  );
}
