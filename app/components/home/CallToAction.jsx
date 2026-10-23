"use client";

import Link from "next/link";
import {
  ArrowRight,
  Send,
  PhoneCall,
  FileText,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { ctaPoints, company } from "@/lib/data";

export default function CallToAction({ onOpenQuote }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#031124] py-20 text-white md:py-24">
      {/* Background Photo - strictly covers and fits the section */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url("/images/sectionCTA.webp")`,
        }}
      />

      {/* Blue Gradient Overlay from the left */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#031124] via-[#051c3d]/95 via-45% to-[#072550]/40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#031124]/90 via-transparent to-[#041633]/60" />

      <div className="container-x relative z-10">
        <div className="max-w-3xl lg:ml-[10%]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-sky-300">
            Siap Bekerja Sama?
          </span>

          <h2 className="mt-4 text-[30px] font-extrabold leading-[1.15] sm:text-[38px] tracking-tight">
            Diskusikan Proyek Anda Bersama Tim Profesional Kami
          </h2>

          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-blue-100/90">
            Kami siap membantu mewujudkan kebutuhan konstruksi dan engineering
            Anda dengan solusi yang tepat, berkualitas, dan profesional.
          </p>

          {/* Interactive Feature Points */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {ctaPoints.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition hover:bg-white/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-white shadow-md shadow-brand/40">
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="text-xs font-bold text-white">{title}</h3>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-blue-100/75">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href={company.whatsappUrl(
                "Halo tim Airindo, saya ingin berkonsultasi & mengajukan RFQ penawaran proyek.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/40 transition hover:bg-emerald-700 hover:scale-105"
            >
              <Send size={15} /> Hubungi kami sekarang <ArrowRight size={15} />
            </a>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20 hover:scale-105"
            >
              <FileText size={15} /> Lihat profil perusahaan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
