"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (href) => {
    if (typeof window !== "undefined") {
      if (href.includes("#")) {
        const cat = href.split("#")[1];
        window.dispatchEvent(new CustomEvent("airindo:select-category", { detail: cat }));
      } else if (href === "/layanan") {
        window.dispatchEvent(new CustomEvent("airindo:select-category", { detail: "all" }));
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#09234f]/95 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-gradient-to-r from-[#0a234f] via-[#0f3474] to-[#1258c7]"
      }`}
    >
      <div className="container-x flex h-[64px] items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[13px] font-semibold text-white">
            {navLinks.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  onClick={() => handleNavLinkClick(item.href)}
                  className="flex items-center gap-1.5 py-4 transition-colors hover:text-sky-300"
                >
                  {item.label}
                  {item.children && <ChevronDown size={12} className="transition-transform group-hover:rotate-180" />}
                </Link>
                {item.children && (
                  <ul className="invisible absolute left-0 top-full w-56 rounded-xl border border-slate-100 bg-white py-2 text-brand-navy opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={() => handleNavLinkClick(child.href)}
                          className="block px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-brand"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-lg border border-white/20 p-2 text-white transition hover:bg-white/10 lg:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#071d42]/95 backdrop-blur-lg lg:hidden">
          <nav aria-label="Navigasi mobile" className="container-x py-4">
            <ul className="space-y-2 text-sm font-semibold text-white">
              {navLinks.map((item) => (
                <li key={item.label} className="border-b border-white/10 pb-2.5 last:border-b-0 last:pb-0">
                  {item.children ? (
                    <div className="space-y-2">
                      <Link
                        href={item.href}
                        onClick={() => {
                          handleNavLinkClick(item.href);
                          setMobileOpen(false);
                        }}
                        className="block py-1 hover:text-sky-300"
                      >
                        {item.label}
                      </Link>
                      <ul className="ml-3 space-y-2 border-l border-white/15 pl-3">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={() => {
                                handleNavLinkClick(child.href);
                                setMobileOpen(false);
                              }}
                              className="block py-1 text-xs text-blue-100/80 hover:text-white"
                            >
                              • {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => {
                        handleNavLinkClick(item.href);
                        setMobileOpen(false);
                      }}
                      className="block py-1 hover:text-sky-300"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
