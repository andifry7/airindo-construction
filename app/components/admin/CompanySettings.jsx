"use client";

import { useState } from "react";
import {
  Phone,
  TrendingUp,
  Save,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  AlertCircle,
  RotateCcw,
  Lock
} from "lucide-react";

export default function CompanySettings({
  companyData,
  companyStats,
  onSaveSettings
}) {
  const [formData, setFormData] = useState({
    name: companyData?.name || "Airindo Construction",
    fullName: companyData?.fullName || "PT. Airindo Teknologi Perkasa",
    tagline: companyData?.tagline || "Solusi konstruksi dan engineering terintegrasi untuk kebutuhan industri dan energi.",
    phone: companyData?.phone || "+62 878 7226 6146",
    phoneRaw: companyData?.phoneRaw || "6287872266146",
    email: companyData?.email || "Solution@atpindonesia.com",
    address: companyData?.address || "Rukan Graha Cempaka Mas Blok A No. 10, Jl. Letjen Suprapto Kav. 3, Jakarta Pusat 10640",
    workshopAddress: "Sentul Bogor, Jawa Barat",
    mapsUrl: companyData?.mapsUrl || "https://maps.google.com/?q=Rukan+Graha+Cempaka+Mas+Jakarta+Pusat",
    stats: companyStats || [
      { value: "13+", label: "Tahun Dedikasi", detail: "Berdiri sejak 2013 melayani industri nasional" },
      { value: "50+", label: "Proyek Selesai", detail: "Mekanikal, perpipaan & otomasi di seluruh Indonesia" },
      { value: "1", label: "Fasilitas Workshop", detail: "Sentul Bogor, Jawa Barat" },
      { value: "100%", label: "Kepatuhan K3 (HSE)", detail: "Standar keselamatan kerja & sertifikasi ASME/ISO" },
    ],
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Change PIN State
  const [pinForm, setPinForm] = useState({
    oldPin: "",
    newPin: "",
    confirmPin: "",
  });
  const [pinError, setPinError] = useState("");
  const [pinSuccess, setPinSuccess] = useState("");

  const handleUpdatePin = (e) => {
    e.preventDefault();
    setPinError("");
    setPinSuccess("");

    const currentSavedPin =
      typeof window !== "undefined"
        ? localStorage.getItem("airindo_admin_pin") || "2013"
        : "2013";

    if (pinForm.oldPin !== currentSavedPin) {
      setPinError("PIN lama yang Anda masukkan salah.");
      return;
    }

    if (pinForm.newPin.length < 4) {
      setPinError("PIN baru harus minimal 4 karakter/digit.");
      return;
    }

    if (pinForm.newPin !== pinForm.confirmPin) {
      setPinError("Konfirmasi PIN baru tidak sesuai.");
      return;
    }

    localStorage.setItem("airindo_admin_pin", pinForm.newPin);
    setPinSuccess("PIN akses admin berhasil diganti!");
    setPinForm({ oldPin: "", newPin: "", confirmPin: "" });

    setTimeout(() => {
      setPinSuccess("");
    }, 4000);
  };

  const handleResetPinDefault = () => {
    if (window.confirm("Kembalikan PIN akses admin ke PIN bawaan (2013)?")) {
      localStorage.removeItem("airindo_admin_pin");
      setPinSuccess("PIN berhasil dikembalikan ke bawaan: 2013");
      setPinError("");
      setPinForm({ oldPin: "", newPin: "", confirmPin: "" });
      setTimeout(() => {
        setPinSuccess("");
      }, 4000);
    }
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...formData.stats];
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value,
    };
    setFormData({ ...formData, stats: updatedStats });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const testWaUrl = `https://wa.me/${formData.phoneRaw}?text=${encodeURIComponent(
    "Tes pesan dari Admin Panel Airindo Construction"
  )}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Banner with Save button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Pengaturan Informasi & Kontak Perusahaan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Perubahan pada nomor WhatsApp atau alamat akan langsung berlaku di seluruh tombol kontak & footer website.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-[#0b2557] text-white font-semibold text-xs shadow-md transition cursor-pointer shrink-0"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              Tersimpan!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Simpan Pengaturan
            </>
          )}
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Pengaturan profil perusahaan berhasil diperbarui dan disimpan secara lokal.</span>
        </div>
      )}

      {/* Section 1: Kontak & WhatsApp Marketing */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Hotline WhatsApp & Kontak Resmi
            </h3>
            <p className="text-xs text-slate-500">
              Nomor tujuan formulir Quick Quote & tombol floating WhatsApp
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Display Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nomor WhatsApp Display (Teks Publik)
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+62 878 7226 6146"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Raw Phone for WA.me API */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Format Nomor WA Sistem (Angka Saja dengan Kode Negara 62)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.phoneRaw}
                onChange={(e) => setFormData({ ...formData, phoneRaw: e.target.value.replace(/\D/g, "") })}
                placeholder="6287872266146"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <a
                href={testWaUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1 border border-emerald-200 shrink-0"
              >
                <span>Tes WA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Resmi Penawaran
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Solution@atpindonesia.com"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Google Maps Link */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tautan Google Maps Kantor
            </label>
            <input
              type="url"
              value={formData.mapsUrl}
              onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
              placeholder="https://maps.google.com/?q=..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Alamat Kantor Pusat (Head Office Jakarta)
          </label>
          <textarea
            rows={2}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      {/* Section 2: Counter Statistik Publik */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Angka Statistik Pencapaian (Counter)
            </h3>
            <p className="text-xs text-slate-500">
              Angka yang dipamerkan di beranda untuk membangun kredibilitas calon klien
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.stats.map((stat, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Item #{idx + 1}
                </span>
                <span className="text-xs font-mono font-bold text-brand bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {stat.value}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-[10px] text-slate-400 font-semibold mb-1">
                    Angka / Nilai
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] text-slate-400 font-semibold mb-1">
                    Label Judul
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-semibold mb-1">
                  Deskripsi Singkat
                </label>
                <input
                  type="text"
                  value={stat.detail}
                  onChange={(e) => handleStatChange(idx, "detail", e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Keamanan & Ganti PIN Admin */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Keamanan & Ganti PIN Admin
              </h3>
              <p className="text-xs text-slate-500">
                Ubah PIN kunci akses yang diminta setiap kali tautan panel admin dibuka
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetPinDefault}
            className="text-[11px] font-semibold text-slate-500 hover:text-purple-600 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset ke PIN Default (2013)
          </button>
        </div>

        {pinSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{pinSuccess}</span>
          </div>
        )}

        {pinError && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{pinError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              PIN Saat Ini
            </label>
            <input
              type="password"
              placeholder="Masukkan PIN lama..."
              maxLength={10}
              value={pinForm.oldPin}
              onChange={(e) => {
                setPinForm({ ...pinForm, oldPin: e.target.value });
                setPinError("");
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              PIN Baru (Min. 4 Digit)
            </label>
            <input
              type="password"
              placeholder="PIN baru..."
              maxLength={10}
              value={pinForm.newPin}
              onChange={(e) => {
                setPinForm({ ...pinForm, newPin: e.target.value });
                setPinError("");
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Konfirmasi PIN Baru
            </label>
            <input
              type="password"
              placeholder="Ulangi PIN baru..."
              maxLength={10}
              value={pinForm.confirmPin}
              onChange={(e) => {
                setPinForm({ ...pinForm, confirmPin: e.target.value });
                setPinError("");
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleUpdatePin}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0b2557] hover:bg-brand text-white font-semibold text-xs shadow-xs transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            Simpan PIN Baru
          </button>
        </div>
      </div>
    </form>
  );
}
