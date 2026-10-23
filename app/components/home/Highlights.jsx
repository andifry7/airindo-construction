"use client";

import { highlights } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export default function Highlights() {
  return (
    <section className="relative z-10 -mt-10 md:-mt-14">
      <div className="container-x">
        <ul className="card grid divide-y divide-slate-200/80 overflow-hidden sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x shadow-xl">
          {highlights.map(({ icon: Icon, title, text, badge }) => (
            <li
              key={title}
              className="group p-5 bg-white transition-all duration-300 hover:bg-blue-50/50 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-md group-hover:shadow-brand/30">
                  <Icon size={18} />
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9.5px] font-semibold text-slate-600 transition-colors group-hover:bg-blue-100/70 group-hover:text-brand-navy">
                  {badge}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-brand-navy group-hover:text-brand transition-colors">
                {title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-brand-muted">
                {text}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-brand">
                <CheckCircle2 size={12} /> Terverifikasi K3 &amp; QMS
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
