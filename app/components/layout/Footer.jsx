import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Play,
  Globe,
  Music2,
  Share2,
} from "lucide-react";
import Logo from "./Logo";
import { company, footerLinks, legalLinks } from "@/lib/data";

const currentYear = 2026;

const socials = [
  { label: "Instagram", icon: MessageCircle },
  { label: "TikTok", icon: Music2 },
  { label: "X", icon: Globe },
  { label: "Threads", icon: Share2 },
  { label: "YouTube", icon: Play },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#052a5e] to-[#021a40] text-white/70">
      <div className="container-x grid gap-10 pb-10 pt-16 md:grid-cols-[1.6fr_1fr_1.6fr_1fr] md:pt-20">
        <div>
          <Logo size="sm" />
          <p className="mt-4 max-w-[260px] text-[13px] leading-relaxed">
            {company.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-[13px] font-bold text-white">Navigasi</h3>
          <ul className="mt-5 space-y-3 text-[12.5px]">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold text-white">Hubungi Kami</h3>
          <ul className="mt-5 space-y-3 text-[12.5px]">
            <li>
              <a
                href={company.whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition"
              >
                <Phone size={13} className="text-emerald-400" />
                {company.phone} (WhatsApp)
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-2.5 hover:text-white transition"
              >
                <Mail size={13} className="text-brand-light" />
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={13} className="mt-0.5 shrink-0 text-brand-light" />
              <span className="max-w-[320px]">{company.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold text-white">Ikuti Kami</h3>
          <ul className="mt-5 flex gap-2.5">
            {socials.map(({ label, icon: Icon }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
                >
                  <Icon size={15} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-[11.5px] md:py-7">
        <p>
          © {currentYear} {company.name}. All rights reserved.
        </p>
        <ul className="flex items-center divide-x divide-white/20">
          {legalLinks.map((l) => (
            <li key={l.label} className="px-3 first:pl-0 last:pr-0">
              <Link href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
