"use client";

import { useState } from "react";
import { MapPin, ExternalLink, Navigation, Building2, Factory } from "lucide-react";

export default function LocationMap({
  locations = [],
  title = "Peta Lokasi",
  defaultIndex = 0,
  height = "340px",
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  if (!locations || locations.length === 0) return null;

  const current = locations[activeIndex] || locations[0];
  const addressText = current.address || current.location || current.mapQuery;
  const query = addressText;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directMapsUrl = current.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(query)}`;

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card ${className}`}>
      {/* Tab switcher when multiple locations exist */}
      {locations.length > 1 && (
        <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {locations.map((loc, idx) => {
              const isActive = activeIndex === idx;
              const Icon = loc.type === "workshop" ? Factory : Building2;
              return (
                <button
                  key={loc.name || idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-brand text-white shadow-sm ring-1 ring-brand"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={13} className={isActive ? "text-white" : "text-brand"} />
                  <span>{loc.name || `Poin ${idx + 1}`}</span>
                </button>
              );
            })}
          </div>

          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:text-brand-navy"
            title="Buka di Google Maps"
          >
            <Navigation size={12} />
            <span>Buka Google Maps</span>
            <ExternalLink size={11} className="opacity-70" />
          </a>
        </div>
      )}

      {/* Embedded Google Maps showing address point marker */}
      <div className="relative w-full bg-slate-100" style={{ height }}>
        <iframe
          title={`Google Map - ${current.name || "Alamat"}`}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Floating Address Point - solely displays the address point */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md rounded-xl border border-white/90 bg-white/95 px-3.5 py-2.5 shadow-md backdrop-blur-md">
          <div className="flex items-start gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-600 mt-0.5">
              <MapPin size={14} />
            </span>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-brand-navy block truncate">
                {current.name}
              </span>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-600">
                {addressText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
