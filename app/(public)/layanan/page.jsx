"use client";

import { useState } from "react";
import Services from "@/components/home/Services";
import CallToAction from "@/components/home/CallToAction";
import QuickQuoteModal from "@/components/ui/QuickQuoteModal";

export default function LayananPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState("");

  const handleOpenQuote = (service = "") => {
    setQuoteService(service || "");
    setQuoteOpen(true);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#0b2557] to-[#1261d9] py-14 text-white">
        <div className="container-x">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
            Bidang Kompetensi &amp; Layanan Teknik
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            Solusi Rekayasa Teknik &amp; Fabrikasi Terintegrasi
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100">
            Dari fabrikasi perpipaan bersuhu &amp; bertekanan tinggi hingga sistem kelistrikan gardu dan otomasi SCADA, kami siap memenuhi standar proyek industri Anda.
          </p>
        </div>
      </div>

      <Services onOpenQuote={handleOpenQuote} />
      <CallToAction onOpenQuote={handleOpenQuote} />

      <QuickQuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        initialService={quoteService}
      />
    </>
  );
}
