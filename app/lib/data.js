import {
  Briefcase,
  Clock3,
  ShieldCheck,
  MessageSquareText,
  MessagesSquare,
  BadgeCheck,
  Headset,
  Handshake,
  TrendingUp,
  Lightbulb,
  Users,
  Wrench,
  Zap,
  Cpu,
  Flame,
  Award,
  CheckCircle2,
  Building2,
  HardHat,
  Factory,
} from "lucide-react";

export const company = {
  name: "Airindo Construction",
  fullName: "PT. Airindo Teknologi Perkasa",
  tagline:
    "Solusi konstruksi dan engineering terintegrasi untuk kebutuhan industri dan energi.",
  phone: "+62 878 7226 6146",
  phoneRaw: "6287872266146",
  email: "Solution@atpindonesia.com",
  address:
    "Rukan Graha Cempaka Mas Blok A No. 10, Jl. Letjen Suprapto Kav. 3, Jakarta Pusat 10640",
  mapQuery: "Rukan Graha Cempaka Mas Blok A No. 10 Jakarta Pusat",
  mapsUrl: "https://maps.google.com/?q=Rukan+Graha+Cempaka+Mas+Jakarta+Pusat",
  establishedYear: 2013,
  whatsappUrl: (message) =>
    `https://wa.me/6287872266146?text=${encodeURIComponent(
      message ||
        "Halo PT. Airindo Teknologi Perkasa, saya ingin berkonsultasi mengenai proyek konstruksi & engineering.",
    )}`,
};

export const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  {
    label: "Layanan",
    href: "/layanan",
    children: [
      { label: "Mechanical & Piping", href: "/layanan#mechanical" },
      { label: "Electrical & Substation", href: "/layanan#electrical" },
      { label: "Process Automation & SCADA", href: "/layanan#automation" },
      { label: "Power Plant Equipments", href: "/layanan#power-plant" },
    ],
  },
  { label: "Proyek", href: "/proyek" },
  { label: "Kontak", href: "/kontak" },
];

export const footerLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Layanan Engineering", href: "/layanan" },
  { label: "Portofolio Proyek", href: "/proyek" },
  { label: "Hubungi Kami", href: "/kontak" },
];

export const legalLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang kami", href: "/about" },
  { label: "Proyek", href: "/proyek" },
];

export const companyStats = [
  {
    value: "13+",
    label: "Tahun Dedikasi",
    detail: "Berdiri sejak 2013 melayani industri nasional",
  },
  {
    value: "50+",
    label: "Proyek Selesai",
    detail: "Mekanikal, perpipaan & otomasi di seluruh Indonesia",
  },
  {
    value: "2",
    label: "Fasilitas Workshop",
    detail: "Sentul Bogor & Kawasan Industri Candi Semarang",
  },
  {
    value: "100%",
    label: "Kepatuhan K3 (HSE)",
    detail: "Standar keselamatan kerja & sertifikasi ASME/ISO",
  },
];

export const highlights = [
  {
    icon: Briefcase,
    title: "Tenaga Ahli Bersertifikat",
    text: "Didukung tenaga profesional berpengalaman dalam pelaksanaan proyek konstruksi dan instalasi industri.",
    badge: "Certified Engineers",
  },
  {
    icon: Clock3,
    title: "Presisi & Tepat Waktu",
    text: "Pengerjaan fabrikasi dan instalasi perpipaan dengan toleransi milimeter dan timeline ketat.",
    badge: "High Precision",
  },
  {
    icon: ShieldCheck,
    title: "Standar Kualitas & K3",
    text: "Menjalankan pekerjaan dengan memperhatikan standar kualitas, keselamatan kerja, dan ketentuan proyek.",
    badge: "ASME & ISO Compliant",
  },
  {
    icon: MessageSquareText,
    title: "Koordinasi Responsif 24/7",
    text: "Koordinasi yang jelas dan responsif untuk mendukung kelancaran setiap tahapan pekerjaan.",
    badge: "Direct Support",
  },
];

export const services = [
  {
    id: "mechanical",
    title: "Mechanical & Piping Engineering",
    shortTitle: "Mechanical",
    icon: Wrench,
    badge: "Fabrikasi & Perpipaan",
    lead: "Desain, fabrikasi, dan instalasi perpipaan, tangki, serta struktur baja untuk mendukung infrastruktur industri dengan standar keamanan tinggi.",
    description:
      "Kami memiliki kapabilitas menyeluruh mulai dari fabrikasi spools perpipaan tekanan tinggi, instalasi penstock pembangkit listrik tenaga air (PLTM/PLTA), header uap PLTU, hingga tangki penyimpanan bahan bakar dan kimia. Didukung mesin bending, cutting, dan fasilitas workshop berstandar tinggi.",
    scopePoints: [
      "Fabrikasi & Instalasi Pipa Penstock, Water Intake & Steam Piping",
      "Fabrikasi Tangki Penyimpanan (Storage Tank) Standar API 650",
      "Pemasangan Struktur Baja, Pipe Rack, dan Platform Kerja",
      "Pengujian Tekanan (Hydrostatic Test & Pneumatic Test) & NDT Inspection",
      "Pengelasan Khusus Carbon Steel, Stainless Steel, dan Paduan Khusus",
    ],
    standards: [
      "ASME B31.1 (Power Piping)",
      "ASME B31.3 (Process Piping)",
      "API 650",
      "AWS D1.1",
    ],
    caseHighlight: "Pengerjaan Penstock PLTM Aek Sibundong & Endikat",
  },
  {
    id: "electrical",
    title: "Electrical & Substation Systems",
    shortTitle: "Electrical",
    icon: Zap,
    badge: "Kelistrikan & Distribusi",
    lead: "Pemasangan panel distribusi tegangan rendah hingga menengah, instalasi kabel, dan sistem grounding yang andal untuk fasilitas pembangkit.",
    description:
      "Penyediaan dan instalasi sistem kelistrikan lengkap untuk fasilitas pembangkit maupun pabrik manufaktur. Mencakup perakitan panel Medium Voltage (MV) & Low Voltage (LV), penarikan kabel daya, terminasi, sistem pentanahan (grounding), serta proteksi petir teruji.",
    scopePoints: [
      "Perakitan & Instalasi Switchgear MV / Panel Distribusi LV",
      "Kabel Tray, Cable Pulling & High Voltage Termination",
      "Instalasi Transformator Daya & Generator Set Synchronization",
      "Sistem Proteksi Petir (Lightning Protection) & Grounding Grid Grid",
      "Pengujian Tahanan Isolasi (Megger), Relai Proteksi & Commissioning",
    ],
    standards: ["IEC 61439", "PUIL 2011", "IEEE Standard", "SNI Kelistrikan"],
    caseHighlight: "Instalasi Gardu Hubung & Panel Kontrol Turbin",
  },
  {
    id: "automation",
    title: "Process Automation & SCADA",
    shortTitle: "Automation",
    icon: Cpu,
    badge: "Otomasi & Digitalisasi",
    lead: "Integrasi sistem PLC, SCADA, dan instrumentasi cerdas untuk mengoptimalkan efisiensi, monitoring, dan kontrol proses pabrik secara real-time.",
    description:
      "Transformasi fasilitas industri Anda dengan otomasi modern. Kami memprogram dan mengintegrasikan PLC (Siemens, Schneider, Allen-Bradley), membangun tampilan HMI/SCADA interaktif, memasang sensor instrumentasi (transmitter suhu, tekanan, debit, level), hingga integrasi IoT industri.",
    scopePoints: [
      "Programming PLC (Programmable Logic Controller) & HMI Interface",
      "Desain & Implementasi Sistem SCADA Terpusat Multi-Node",
      "Instalasi Transmitter Tekanan, Level, Flowmeter, dan Control Valve",
      "Sistem Alarm, Safety Instrumented Systems (SIS), dan Emergency Shutdown",
      "Kalibrasi Instrumentasi & Remote Monitoring Dashboard",
    ],
    standards: [
      "ISA-88 / ISA-95",
      "IEC 61131-3",
      "Modbus / Profinet / EtherNet/IP",
    ],
    caseHighlight: "Sistem Otomasi Kontrol Debit & Pintu Air Pembangkit",
  },
  {
    id: "power-plant",
    title: "Power Plant Equipments & Maintenance",
    shortTitle: "Power Plant",
    icon: Flame,
    badge: "Pembangkit & Energi",
    lead: "Suplai dan perawatan komponen kritis pembangkit listrik seperti turbin, generator, motor listrik, dan sistem transmisi daya berkualitas tinggi.",
    description:
      "Layanan spesialis untuk pembangkit listrik energi terbarukan (PLTM/PLTA) maupun termal (PLTU/PLTMG). Kami melayani penggantian runner turbin, perbaikan sudu turbin, alignment poros laser generator, overhaul motor bertegangan tinggi, hingga penyediaan suku cadang critical OEM.",
    scopePoints: [
      "Overhaul & Perawatan Rutin Turbin Air (Francis, Pelton, Crossflow)",
      "Laser Shaft Alignment & Balancing Dinamis Poros Generator",
      "Perbaikan & Rewinding Motor Listrik Industri Kapasitas Besar",
      "Suplai Katup Utama (Main Inlet Valve - MIV) & Governor Hidrolik",
      "Troubleshooting Getaran (Vibration Analysis) & Predictive Maintenance",
    ],
    standards: [
      "ISO 10816 (Vibration)",
      "ASME Boiler & Pressure Vessel",
      "IEEE 43",
    ],
    caseHighlight: "Pemasangan Turbin Runner & Alignment Generator PLTM",
  },
];

export const clientFiles = [
  {
    name: "Pertamina",
    sector: "Migas & Energi",
    logo: "/images/clients/pertamina.webp",
  },
  {
    name: "PLN",
    sector: "Pembangkit & Energi",
    logo: "/images/clients/pln.webp",
  },
  {
    name: "Indonesia Power",
    sector: "Pembangkit & Energi",
    logo: "/images/clients/indonesia-power.webp",
  },
  {
    name: "PJB",
    sector: "Pembangkit & Energi",
    logo: "/images/clients/pjb.webp",
  },
  {
    name: "DSSP Power",
    sector: "Pembangkit & Energi",
    logo: "/images/clients/dssp-power.webp",
  },
  {
    name: "ExxonMobil",
    sector: "Migas & Petrokimia",
    logo: "/images/clients/exxonmobil.webp",
  },
  { name: "BP", sector: "Migas & Petrokimia", logo: "/images/clients/bp.webp" },
  {
    name: "Shell",
    sector: "Migas & Petrokimia",
    logo: "/images/clients/shell.webp",
  },
  {
    name: "Halliburton",
    sector: "Migas & Layanan Energi",
    logo: "/images/clients/halliburton.webp",
  },
  {
    name: "Indocement",
    sector: "Industri Semen & Material",
    logo: "/images/clients/indocement.webp",
  },
  {
    name: "SCG",
    sector: "Industri Semen & Material",
    logo: "/images/clients/scg.webp",
  },
  {
    name: "AHM (Astra Honda)",
    sector: "Otomotif & Manufaktur",
    logo: "/images/clients/ahm.webp",
  },
  {
    name: "GS Battery",
    sector: "Otomotif & Manufaktur",
    logo: "/images/clients/gs-battery.webp",
  },
  {
    name: "Goodyear",
    sector: "Otomotif & Manufaktur",
    logo: "/images/clients/goodyear.webp",
  },
  {
    name: "Indofood",
    sector: "Makanan & Minuman",
    logo: "/images/clients/indofood.webp",
  },
  {
    name: "Mayora",
    sector: "Makanan & Minuman",
    logo: "/images/clients/mayora.webp",
  },
  {
    name: "GarudaFood",
    sector: "Makanan & Minuman",
    logo: "/images/clients/garudafood.webp",
  },
  {
    name: "Sosro",
    sector: "Makanan & Minuman",
    logo: "/images/clients/sosro.webp",
  },
  {
    name: "Diamond",
    sector: "Makanan & Minuman",
    logo: "/images/clients/diamond.webp",
  },
  {
    name: "Wilmar",
    sector: "Agroindustri & Kelapa Sawit",
    logo: "/images/clients/wilmar.webp",
  },
  {
    name: "Sritex",
    sector: "Tekstil & Industri",
    logo: "/images/clients/sritex.webp",
  },
  {
    name: "KAI (Kereta Api)",
    sector: "Transportasi & Infrastruktur",
    logo: "/images/clients/kai.webp",
  },
  {
    name: "Bank BRI",
    sector: "Perbankan & Fasilitas",
    logo: "/images/clients/bri.webp",
  },
  {
    name: "Westin Hotels",
    sector: "Komersial & Hospitality",
    logo: "/images/clients/westin.webp",
  },
  {
    name: "Yuasa Battery",
    sector: "Otomotif & Manufaktur",
    logo: "/images/clients/yuasa.webp",
  },
  {
    name: "Picolo",
    sector: "Makanan & Minuman",
    logo: "/images/clients/picolo.webp",
  },
];

export const clientSectors = [
  "Semua Sektor",
  "Pembangkit & Energi",
  "Migas & Petrokimia",
  "Otomotif & Manufaktur",
  "Makanan & Minuman",
  "Industri Semen & Material",
];

export const clients = clientFiles.map((c) => ({
  ...c,
  logo: `/images/clients/${c.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.png`,
}));

export const projects = [
  {
    id: "pltm-aek-sibundong",
    title: "Penstock PLTM Aek Sibundong",
    category: "Fabrikasi & Instalasi",
    categoryKey: "fabrikasi",
    location: "Humbang Hasundutan, Sumatera Utara",
    client: "Pengembang Pembangkit Swasta (IPP)",
    year: "2021 - 2022",
    capacity: "2 x 5 MW",
    specs: "Pipa Baja Tekanan Tinggi Ø 1.800 mm, Panjang 650 m",
    scope:
      "Fabrikasi spools, transportasi jalur terjal, pengelasan ASME, NDT Radiography 100%, Hydrotest, Sandblasting & Epoxy Coating.",
    description:
      "Pekerjaan fabrikasi dan erection pipa penstock bertekanan tinggi di medan pegunungan curam. Proyek diselesaikan dengan zero incident dan uji tekan sempurna tanpa kebocoran.",
    tags: ["Hydro Power", "Penstock", "ASME Welder", "NDT Tested"],
  },
  {
    id: "pltm-endikat",
    title: "Penstock PLTM Endikat",
    category: "Fabrikasi & Instalasi",
    categoryKey: "fabrikasi",
    location: "Lahat, Sumatera Selatan",
    client: "Konsorsium Energi Terbarukan",
    year: "2022 - 2023",
    capacity: "3 x 2.8 MW",
    specs: "Penstock Ø 1.600 mm & Bifurcation Unit, Head 85 m",
    scope:
      "Fabrikasi cabang bifurcation, ekspansi joint, pemasangan saddle support, anchor block, serta pengelasan posisi medan ekstrem.",
    description:
      "Instalasi pipa penstock dan percabangan (bifurcation) yang mengalirkan air bertekanan menuju turbin air. Ketelitian perakitan memastikan aliran hidrolik optimal dengan getaran minimal.",
    tags: ["Penstock", "Bifurcation", "Erection", "Hydro Energy"],
  },
  {
    id: "water-intake-pasuruan",
    title: "Water Intake Pipe PLTU",
    category: "Fabrikasi Pipa",
    categoryKey: "pipa",
    location: "Pasuruan, Jawa Timur",
    client: "Fasilitas Pembangkit Industri",
    year: "2023",
    capacity: "Sistem Sirkulasi Pendingin 150 MW",
    specs: "Pipa Baja Karbon Ø 2.200 mm dengan Internal Lining Anti-Karat",
    scope:
      "Fabrikasi segmen pipa intake berdimensi besar, penyambungan flange besar, pengujian dimensi, dan instalasi di area pesisir.",
    description:
      "Penyediaan jalur pipa intake utama untuk pasokan air pendingin turbin uap. Diberikan perlindungan coating ganda tahan korosi air laut untuk keandalan operasional jangka panjang.",
    tags: ["Water Intake", "Piping Besar", "Anti-Corrosion", "PLTU"],
  },
  {
    id: "steam-header-pabrik",
    title: "High Pressure Steam Piping Header",
    category: "Fabrikasi Pipa",
    categoryKey: "pipa",
    location: "Cilegon, Banten",
    client: "Pabrik Petrokimia Nasional",
    year: "2023 - 2024",
    capacity: "Tekanan 42 Bar, Temperatur 380°C",
    specs: "Seamless Alloy Steel A335 P11/P22 Schedule 80",
    scope:
      "Perhitungan tegangan pipa (stress analysis), fabrikasi spool berinsulasi tinggi, stress relief (PWHT), dan pengujian radiografi 100%.",
    description:
      "Instalasi perpipaan uap bersuhu dan bertekanan ekstrem untuk jalur distribusi boiler utama, memenuhi standar ketat keselamatan ASME B31.1.",
    tags: ["High Pressure", "Steam Piping", "PWHT", "Petrochemical"],
  },
  {
    id: "scada-substation-pltm",
    title: "SCADA & Otomasi Gardu Induk Minihidro",
    category: "Otomasi & Kelistrikan",
    categoryKey: "otomasi",
    location: "Sumatera Barat",
    client: "Pengelola PLTM",
    year: "2024",
    capacity: "2 x 4.5 MW Synchronous Generator",
    specs: "PLC Siemens S7-1500, HMI WinCC, Modbus TCP/IP ke PLN Dispatcher",
    scope:
      "Desain sistem kendali terintegrasi, sinkronisasi otomatis generator ke jaringan PLN 20 kV, perlindungan relai numerik, dan remote telemetry.",
    description:
      "Pembangunan otomasi menyeluruh dari pintu air, governor turbin, sinkronisasi beban, hingga pelaporan data real-time ke ruang kendali utama.",
    tags: ["SCADA", "PLC Siemens", "Substation", "Remote Telemetry"],
  },
  {
    id: "chilled-water-piping",
    title: "Chilled Water & HVAC Distribution",
    category: "Fabrikasi Pipa",
    categoryKey: "pipa",
    location: "Karawang, Jawa Barat",
    client: "Fasilitas Manufaktur Otomotif",
    year: "2024 - 2025",
    capacity: "4.000 TR Chiller System",
    specs: "Jalur Pipa Sirkulasi Air Dingin 14-inch Insulasi Polyurethane",
    scope:
      "Pemasangan instalasi pipa header, pompa sirkulasi berkapasitas tinggi, katup kontrol modulating, dan sistem penyeimbang aliran hidronik.",
    description:
      "Pekerjaan instalasi pendingin terpusat untuk menjaga temperatur presisi pada ruang produksi komponen otomotif dengan efisiensi energi terdepan.",
    tags: ["Chilled Water", "Industrial HVAC", "Hydronic Balancing"],
  },
];

export const projectCategories = [
  { key: "semua", label: "Semua Proyek" },
  { key: "fabrikasi", label: "Fabrikasi & Instalasi" },
  { key: "pipa", label: "Fabrikasi Pipa Industri" },
  { key: "otomasi", label: "Otomasi & Kelistrikan" },
];

export const ctaPoints = [
  {
    icon: MessagesSquare,
    title: "Konsultasi Teknis Gratis",
    text: "Dapatkan solusi terbaik untuk proyek Anda.",
  },
  {
    icon: BadgeCheck,
    title: "Jaminan Mutu & Garansi",
    text: "Didukung sertifikat material (MTC), laporan uji NDT, dan garansi pekerjaan.",
  },
  {
    icon: Headset,
    title: "Respon Cepat Tim Ahli",
    text: "Tim estimasi teknis siap memberikan proposal penawaran terperinci.",
  },
  {
    icon: Handshake,
    title: "Kemitraan Jangka Panjang",
    text: "Kami tumbuh bersama kesuksesan Anda.",
  },
];

export const aboutValues = [
  {
    icon: TrendingUp,
    title: "Pertumbuhan Berkelanjutan",
    text: "Menjadi mitra rekayasa teknik terdepan yang berkontribusi nyata pada ketahanan energi dan efisiensi industri manufaktur di Indonesia.",
  },
  {
    icon: Lightbulb,
    title: "Inovasi & Presisi Teknis",
    text: "Mengintegrasikan teknologi fabrikasi modern, otomasi digital, serta metodologi engineering berstandar internasional dalam setiap tahapan proyek.",
  },
  {
    icon: Users,
    title: "Keselamatan Kerja (K3) Prioritas Utama",
    text: "Menjamin keselamatan seluruh personel dengan penerapan Zero Accident Policy dan kepatuhan penuh terhadap standar regulasi ketenagakerjaan.",
  },
];

export const workshops = [
  {
    id: "sentul",
    name: "Workshop Sentul (Utama)",
    location: "Kawasan Sirkuit Sentul, Bogor, Jawa Barat",
    mapQuery: "Sirkuit Sentul Bogor",
    mapsUrl: "https://maps.google.com/?q=Sentul+International+Circuit+Bogor",
    features:
      "Fasilitas Fabrikasi Pipa Besar, Bending, Sandblasting, dan Area Assembly Spool",
  },
  {
    id: "candi",
    name: "Workshop Candi Semarang",
    location: "Kawasan Industri Candi, Semarang, Jawa Tengah",
    mapQuery: "Kawasan Industri Candi Semarang",
    mapsUrl: "https://maps.google.com/?q=Kawasan+Industri+Candi+Semarang",
    features:
      "Fasilitas Machining Presisi, Fabrikasi Panel Listrik, dan Perakitan Sistem Otomasi",
  },
];

export const faqs = [
  {
    q: "Apakah PT. Airindo Teknologi Perkasa melayani proyek di luar Pulau Jawa?",
    a: "Ya, kami memiliki pengalaman menangani proyek di berbagai wilayah Indonesia seperti Sumatera (PLTM Aek Sibundong, PLTM Endikat), Kalimantan, Sulawesi, hingga kawasan timur Indonesia. Tim mobilisasi kami siap dikerahkan beserta peralatan kerja standar.",
  },
  {
    q: "Bagaimana kualifikasi welder dan sertifikasi pengelasan yang dimiliki?",
    a: "Seluruh juru las (welder) kami memiliki sertifikasi resmi dari Depnaker dan kualifikasi WPS/PQR sesuai standar ASME Section IX untuk berbagai posisi pengelasan (1G hingga 6G/6GR) pada material Carbon Steel, Stainless Steel, maupun Chrome-Moly.",
  },
  {
    q: "Apakah setiap pekerjaan fabrikasi perpipaan disertai laporan pengujian (NDT)?",
    a: "Tentu. Setiap proyek perpipaan tekanan tinggi dilengkapi dengan inspeksi ketat: visual inspection, uji penetrant (PT), magnetic particle (MT), ultrasonic test (UT), radiography (RT), serta hydrostatic pressure test yang dituangkan dalam Manufacturer's Data Report (MDR).",
  },
  {
    q: "Bagaimana alur kerja pengajuan penawaran harga atau tender?",
    a: "Anda dapat mengirimkan gambar kerja (drawing/isometric), BoQ/RAB, atau TOR proyek ke email solution@atpindonesia.com atau melalui WhatsApp. Tim estimator kami akan menganalisis kebutuhan dan memberikan proposal penawaran teknis serta komersial dalam 1-3 hari kerja.",
  },
  {
    q: "Apakah melayani pekerjaan modifikasi dan perbaikan darurat (troubleshooting)?",
    a: "Ya, selain proyek turnkey baru, kami menyediakan layanan maintenance, revamping sistem pipa lama, penggantian katup/valve, kalibrasi sistem kontrol PLC, dan inspeksi kebocoran darurat fasilitas industri.",
  },
];

export const estimatorData = {
  services: [
    {
      id: "piping",
      label: "Fabrikasi & Instalasi Pipa (Piping)",
      multiplier: 1.2,
      unit: "Jalur Pipa",
    },
    {
      id: "tank",
      label: "Fabrikasi Tangki & Storage Vessel",
      multiplier: 1.35,
      unit: "Unit Tangki",
    },
    {
      id: "electrical",
      label: "Kelistrikan & Panel Switchgear",
      multiplier: 1.15,
      unit: "Sistem Kelistrikan",
    },
    {
      id: "automation",
      label: "Otomasi PLC & SCADA Pembangkit",
      multiplier: 1.25,
      unit: "Node Kontrol",
    },
    {
      id: "overhaul",
      label: "Overhaul Turbin & Maintenance",
      multiplier: 1.1,
      unit: "Unit Pembangkit",
    },
  ],
  scales: [
    {
      id: "small",
      label: "Skala Perbaikan / Modifikasi Fasilitas",
      desc: "Pengerjaan cepat pada segmen pipa / panel tertentu",
    },
    {
      id: "medium",
      label: "Skala Menengah (Pabrik Manufaktur / F&B)",
      desc: "Pemasangan jalur produksi atau utilitas baru",
    },
    {
      id: "large",
      label: "Skala Besar (Pembangkit Listrik / Petrokimia)",
      desc: "Instalasi skala penuh, penstock, atau gardu induk",
    },
  ],
  schedules: [
    {
      id: "urgent",
      label: "Mendesak (< 1 Bulan)",
      note: "Mobilisasi tim cepat & shift lembur",
    },
    {
      id: "standard",
      label: "Reguler (1 - 3 Bulan)",
      note: "Jadwal pengerjaan standar proyek",
    },
    {
      id: "planning",
      label: "Perencanaan Masa Depan (> 3 Bulan)",
      note: "Tahap tender atau studi kelayakan",
    },
  ],
};
