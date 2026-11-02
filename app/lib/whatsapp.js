/**
 * Membangun tautan WhatsApp dari data perusahaan.
 *
 * Dulu `company.whatsappUrl()` adalah fungsi di dalam objek data. Karena data
 * sekarang datang dari API (JSON), fungsi tidak bisa ikut dikirim — jadi
 * tautan dibangun di sini.
 */
export function whatsappUrl(company, message) {
  const phone = String(company?.phoneRaw ?? "").replace(/\D/g, "");
  const text =
    message ||
    "Halo PT. Airindo Teknologi Perkasa, saya ingin berkonsultasi mengenai proyek konstruksi & engineering.";

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
