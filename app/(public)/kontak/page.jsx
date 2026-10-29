"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Navigation,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import LocationMap from "@/components/ui/LocationMap";
import { company, workshops } from "@/lib/data";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    subject: "Konsultasi Fabrikasi & Piping",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendWA();
    setSent(true);
  };

  const handleSendWA = () => {
    const text = `*FORMULIR KONTAK - WEBSITE AIRINDO*
Nama: ${formData.name || "-"}
Perusahaan: ${formData.companyName || "-"}
Kontak: ${formData.phone || formData.email || "-"}
Subjek: ${formData.subject}
Pesan: ${formData.message || "Ingin konsultasi proyek"}`;

    window.open(company.whatsappUrl(text), "_blank");
  };

  const allLocations = [
    {
      id: "head-office",
      name: "Kantor Pusat Jakarta",
      address: company.address,
      mapQuery: company.mapQuery,
      mapsUrl: company.mapsUrl,
      type: "office",
      features: "Administrasi, Manajemen Rekayasa Teknik & Estimasi Komersial",
    },
    ...workshops.map((w) => ({
      ...w,
      type: "workshop",
    })),
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-[#0b2557] to-[#1261d9] py-14 text-white">
        <div className="container-x">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
            Hubungi Tim Engineering
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            Konsultasi Proyek &amp; Penawaran Harga
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100">
            Kami siap berdiskusi mengenai gambar teknis, BoQ, jadwal pelaksanaan, hingga survei lokasi proyek di fasilitas Anda.
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-slate-50/60">
        <div className="container-x space-y-14">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1.3fr]">
            {/* Left: Contact Info & Facilities */}
            <div className="space-y-8">
              <div>
                <span className="eyebrow">Kantor Pusat</span>
                <h2 className="mt-2 text-2xl font-bold text-brand-navy">
                  PT. Airindo Teknologi Perkasa
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  Kunjungi kantor operasional kami atau hubungi kami melalui saluran komunikasi resmi berikut:
                </p>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-brand shrink-0 mt-0.5" size={18} />
                        <div>
                          <strong className="text-brand-navy block">Alamat Kantor Pusat:</strong>
                          <span className="text-slate-600 text-xs leading-relaxed">{company.address}</span>
                        </div>
                      </div>
                      <a
                        href={company.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-brand hover:bg-blue-100 transition"
                      >
                        <Navigation size={12} /> Google Maps
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <Phone className="text-emerald-600 shrink-0" size={18} />
                    <div>
                      <strong className="text-brand-navy block">Telepon / WhatsApp:</strong>
                      <a
                        href={company.whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-brand hover:underline"
                      >
                        {company.phone} (Fast Response)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <Mail className="text-blue-600 shrink-0" size={18} />
                    <div>
                      <strong className="text-brand-navy block">Email Resmi:</strong>
                      <a
                        href={`mailto:${company.email}`}
                        className="text-xs font-semibold text-brand hover:underline"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workshop locations list */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <Building size={16} className="text-brand" /> Fasilitas Workshop Mandiri
                  </h3>
                  <span className="text-[11px] font-semibold text-brand bg-blue-50 px-2 py-0.5 rounded-full">
                    Sentul, Bogor
                  </span>
                </div>
                <div className="mt-4 space-y-3.5 text-xs">
                  {workshops.map((w) => (
                    <div key={w.name} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <strong className="text-brand-navy block">{w.name}</strong>
                          <span className="text-slate-500 block mt-0.5">{w.location}</span>
                        </div>
                        <a
                          href={w.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-slate-700 hover:bg-blue-50 hover:text-brand transition"
                        >
                          <Navigation size={11} /> Peta
                        </a>
                      </div>
                      <span className="text-brand text-[11px] font-medium block mt-1">• {w.features}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Formulir Komunikasi Resmi
              </span>
              <h3 className="mt-1 text-xl font-bold text-brand-navy">
                Kirim Pesan atau Spesifikasi Kebutuhan
              </h3>
              <p className="mt-2 text-xs text-brand-muted">
                Silakan lengkapi formulir di bawah ini. Tim kami akan segera menanggapi dalam waktu 1x24 jam kerja.
              </p>

              {sent ? (
                <div className="mt-8 rounded-xl bg-emerald-50 p-6 text-center border border-emerald-200">
                  <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                  <h4 className="mt-3 text-base font-bold text-emerald-900">
                    Pesan Anda Telah Diterima!
                  </h4>
                  <p className="mt-1 text-xs text-emerald-700">
                    Terima kasih, {formData.name}. Tim teknis kami akan segera menghubungi Anda.
                  </p>
                  <button
                    type="button"
                    onClick={handleSendWA}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    <Send size={13} /> Kirim Juga ke WhatsApp Langsung
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-brand-navy">
                        Nama Lengkap *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Nama Anda"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-navy">
                        Perusahaan / Instansi *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Nama PT / CV"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-navy">
                        No. Telepon / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="08123456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-navy">
                        Alamat Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="nama@perusahaan.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy">
                      Topik Konsultasi
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs bg-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    >
                      <option value="Konsultasi Fabrikasi & Piping">Fabrikasi &amp; Instalasi Pipa (Piping / Penstock)</option>
                      <option value="Konsultasi Tangki API 650">Fabrikasi Tangki Penyimpanan &amp; Silo</option>
                      <option value="Konsultasi Kelistrikan & Panel">Instalasi Gardu &amp; Switchgear Panel</option>
                      <option value="Konsultasi SCADA & PLC">Otomasi Proses &amp; SCADA Pembangkit</option>
                      <option value="Permintaan Kunjungan Workshop">Jadwal Kunjungan &amp; Audit Fasilitas Workshop</option>
                      <option value="Tender / Pengadaan Resmi">Pengadaan Tender &amp; Rekanan Vendor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy">
                      Deskripsi Kebutuhan &amp; Spesifikasi Proyek
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Jelaskan kebutuhan spesifikasi material, lokasi proyek, kapasitas, atau jadwal pelaksanaan..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                    >
                      <Send size={14} /> Kirim Pesan via WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Interactive Google Map Section with Tabs */}
          <div>
            <SectionHeading
              eyebrow="Peta Lokasi"
              title="Poin Alamat Kantor &amp; Workshop"
              description="Titik alamat resmi Kantor Pusat di Jakarta Pusat serta fasilitas Workshop Fabrikasi di Sentul, Bogor."
            />

            <div className="mt-8">
              <LocationMap
                locations={allLocations}
                height="420px"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
