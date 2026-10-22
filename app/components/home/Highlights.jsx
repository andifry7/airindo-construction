"use client";

import { useState } from "react";
import { highlights } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export default function Highlights() {
  const [activeHighlight, setActiveHighlight] = useState(0);

  return (
    <section className="relative z-10 -mt-10 md:-mt-14">
      <div className="container-x">
        <ul className="card grid divide-y divide-slate-200/80 overflow-hidden sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x shadow-xl">
          {highlights.map(({ icon: Icon, title, text, badge }, idx) => {
            const isSelected = activeHighlight === idx;
            return (
              <li
                key={title}
                onMouseEnter={() => setActiveHighlight(idx)}
                className={`p-5 transition-all duration-300 cursor-pointer ${
                  isSelected ? "bg-blue-50/50" : "bg-white hover:bg-slate-50/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                      isSelected ? "bg-brand text-white shadow-md shadow-brand/30" : "bg-blue-50 text-brand"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9.5px] font-semibold text-slate-600">
                    {badge}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-brand-navy">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-muted">{text}</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-brand">
                  <CheckCircle2 size={12} /> Terverifikasi K3 &amp; QMS
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
