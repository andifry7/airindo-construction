"use client";

import { useState } from "react";
import Projects from "@/components/home/Projects";
import CallToAction from "@/components/home/CallToAction";
import QuickQuoteModal from "@/components/ui/QuickQuoteModal";

export default function ProyekPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenQuote = (service = "") => {
    setSelectedService(service || "");
    setQuoteOpen(true);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#0b2557] to-[#1261d9] py-14 text-white">
        <div className="container-x">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
            Track Record &amp; Portofolio
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            Pengalaman Proyek Fabrikasi &amp; Konstruksi Nasional
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100">
            Jelajahi rekam jejak pengerjaan pipa penstock PLTM, water intake PLTU, sistem perpipaan steam petrokimia, dan otomasi industri di seluruh penjuru Indonesia.
          </p>
        </div>
      </div>

      <Projects onOpenQuote={handleOpenQuote} />
      <CallToAction onOpenQuote={handleOpenQuote} />

      <QuickQuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        initialService={selectedService}
      />
    </>
  );
}
