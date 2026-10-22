"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, Search } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs, company } from "@/lib/data";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-x max-w-4xl">
        <SectionHeading
          eyebrow="Tanya Jawab Teknis"
          title="Pertanyaan yang Sering Diajukan"
          description="Informasi penting mengenai kualifikasi welder, standar pengujian NDT, jangkauan wilayah operasional, dan alur tender proyek bersama PT. Airindo Teknologi Perkasa."
        />

        {/* Quick Search */}
        <div className="mt-8 relative max-w-md mx-auto">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari topik (misal: welder, ASME, tender, NDT)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-brand-navy placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Accordion List */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-xs text-brand-muted">
              Tidak ditemukan pertanyaan terkait &quot;{searchQuery}&quot;. Tim kami siap menjawab pertanyaan spesifik Anda secara langsung.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className={`overflow-hidden rounded-xl border transition-all ${
                    isOpen ? "border-brand/40 bg-blue-50/20 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3 text-sm font-bold text-brand-navy">
                      <HelpCircle size={16} className={`shrink-0 ${isOpen ? "text-brand" : "text-slate-400"}`} />
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-xs leading-relaxed text-brand-muted">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-brand-navy">Masih memiliki pertanyaan teknis lainnya?</h4>
            <p className="mt-1 text-xs text-brand-muted">Insinyur kami siap berdiskusi langsung mengenai spesifikasi proyek Anda.</p>
          </div>
          <a
            href={company.whatsappUrl("Halo tim Airindo, saya ingin menanyakan hal teknis seputar layanan engineering.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-brand-navy sm:mt-0"
          >
            <MessageSquare size={14} /> Tanya Tim Kami
          </a>
        </div>
      </div>
    </section>
  );
}
