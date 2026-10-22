"use client";

import { useState } from "react";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import Services from "@/components/home/Services";
import Clients from "@/components/home/Clients";
import Projects from "@/components/home/Projects";
import Faq from "@/components/home/Faq";
import CallToAction from "@/components/home/CallToAction";
import QuickQuoteModal from "@/components/ui/QuickQuoteModal";

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenQuote = (service = "") => {
    setSelectedService(service || "");
    setQuoteModalOpen(true);
  };

  return (
    <>
      <Hero onOpenQuote={handleOpenQuote} />
      <Highlights />
      <Services onOpenQuote={handleOpenQuote} />
      <Clients />
      <Projects onOpenQuote={handleOpenQuote} />
      <Faq />
      <CallToAction onOpenQuote={handleOpenQuote} />

      <QuickQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedService}
      />
    </>
  );
}
