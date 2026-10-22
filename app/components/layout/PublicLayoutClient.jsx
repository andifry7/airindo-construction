"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuickQuoteModal from "@/components/ui/QuickQuoteModal";
import FloatingActionHub from "@/components/ui/FloatingActionHub";

export default function PublicLayoutClient({ children }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenQuote = (serviceName = "") => {
    setSelectedService(serviceName || "");
    setQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenQuote={handleOpenQuote} />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Global Interactive Modal */}
      <QuickQuoteModal
        isOpen={quoteOpen}
        onClose={handleCloseQuote}
        initialService={selectedService}
      />

      {/* Global Floating Action Hub (WhatsApp + Back to Top) */}
      <FloatingActionHub onOpenQuote={handleOpenQuote} />
    </div>
  );
}
