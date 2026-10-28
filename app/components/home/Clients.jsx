"use client";

import { useState } from "react";
import { Building2, ShieldCheck, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { clientFiles, clientSectors } from "@/lib/data";

function ClientCard({ client }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-xs transition-all hover:border-brand hover:shadow-md hover:-translate-y-0.5 cursor-default shrink-0">
      <div className="relative flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-100 p-1.5 transition-colors group-hover:border-blue-200">
        {client.logo && !imageError ? (
          <img
            src={client.logo}
            alt={`Logo ${client.name}`}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand font-bold text-xs group-hover:bg-brand group-hover:text-white transition-colors">
            <Building2 size={16} />
          </div>
        )}
      </div>
      <div>
        <h4 className="text-xs font-bold text-brand-navy tracking-tight group-hover:text-brand transition-colors whitespace-nowrap">
          {client.name}
        </h4>
        <span className="text-[10px] text-slate-500 font-medium block whitespace-nowrap">
          {client.sector}
        </span>
      </div>
    </div>
  );
}

export default function Clients() {
  const [activeSector, setActiveSector] = useState("Semua Sektor");

  const filteredClients =
    activeSector === "Semua Sektor"
      ? clientFiles
      : clientFiles.filter((c) => c.sector === activeSector);

  return (
    <section className="bg-gradient-to-b from-[#f4f8ff] via-white to-slate-50 py-20 md:py-24 overflow-hidden">
      <div className="container-x">
        <SectionHeading
          eyebrow="Mitra & Klien Industri"
          title="Dipercaya Perusahaan Terkemuka Nasional"
          titleClass="text-brand-navy"
          description="Menjalin kemitraan strategis dengan berbagai BUMN dan korporasi swasta lintas sektor energi, minyak & gas, manufaktur, hingga pengembang pembangkit listrik di Indonesia."
        />

        {/* Sector Filter Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {clientSectors.map((sector) => {
            const isActive = activeSector === sector;
            return (
              <button
                key={sector}
                type="button"
                onClick={() => setActiveSector(sector)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-brand text-white shadow-md shadow-brand/20"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {sector}
              </button>
            );
          })}
        </div>

        {/* Interactive Infinite Marquee Carousel */}
        <div className="mt-10 relative overflow-hidden py-4 select-none">
          {/* Gradient fade edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f4f8ff] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center gap-4">
            {/* Double the list to loop seamlessly */}
            {[...filteredClients, ...filteredClients].map((client, idx) => (
              <ClientCard key={`${client.name}-${idx}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
