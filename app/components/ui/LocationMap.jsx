"use client";

import { useState } from "react";
import { MapPin, ExternalLink, Copy, Check, Navigation, Building2, Factory } from "lucide-react";

export default function LocationMap({
  locations = [],
  title = "Peta Lokasi & Petunjuk Arah",
  subtitle = "Temukan fasilitas kantor dan workshop kami di Google Maps",
  defaultIndex = 0,
  height = "320px",
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [copied, setCopied] = useState(false);

  if (!locations || locations.length === 0) return null;

  const current = locations[activeIndex] || locations[0];
  const query = current.mapQuery || current.address || current.location;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const directMapsUrl = current.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(query)}`;

  const handleCopy = () => {
    const textToCopy = `${current.name ? current.name + " - " : ""}${current.address || current.location}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card ${className}`}>
      {/* Header bar */}
      <div className="border-b border-slate-100 bg-slate-50/70 p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-white shadow-sm">
                <MapPin size={14} />
              </span>
              <h4 className="text-sm font-bold text-brand-navy">{title}</h4>
            </div>
            {subtitle && (
              <p className="mt-1 text-xs text-brand-muted pl-8">{subtitle}</p>
            )}
          </div>

          {/* Quick Direct Link button */}
          <div className="flex items-center gap-2 pl-8 sm:pl-0">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              title="Salin alamat ke clipboard"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-slate-500" />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>

            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-navy transition"
            >
              <Navigation size={13} />
              <span>Buka Google Maps</span>
              <ExternalLink size={12} className="opacity-80" />
            </a>
          </div>
        </div>

        {/* Location switcher tabs (if multiple locations) */}
        {locations.length > 1 && (
          <div className="mt-3.5 flex flex-wrap gap-2 border-t border-slate-200/70 pt-3">
            {locations.map((loc, idx) => {
              const isActive = activeIndex === idx;
              const Icon = loc.type === "workshop" ? Factory : Building2;
              return (
                <button
                  key={loc.name || idx}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setCopied(false);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-brand text-white shadow-sm ring-1 ring-brand"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={13} className={isActive ? "text-white" : "text-brand"} />
                  <span>{loc.name || `Lokasi ${idx + 1}`}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Embedded Google Maps iframe */}
      <div className="relative w-full bg-slate-100" style={{ height }}>
        <iframe
          title={`Google Map - ${current.name || "Airindo Construction"}`}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-[15%] contrast-105"
        />

        {/* Floating Address Bar on Bottom of Map */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md rounded-xl border border-white/80 bg-white/95 p-3.5 shadow-lg backdrop-blur-md">
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-brand mt-0.5">
              <MapPin size={15} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-brand-navy">
                {current.name}
              </h5>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">
                {current.address || current.location}
              </p>
              {current.features && (
                <span className="mt-1 inline-block text-[10px] font-semibold text-brand">
                  • {current.features}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
