import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BCRYPT_ROUNDS = 12;

// ─────────────────────────────────────────────────────────────
// Sumber data: disalin dari app/lib/data.js (frontend) agar konten
// yang sudah tayang tidak hilang saat pindah ke database.
// ─────────────────────────────────────────────────────────────

const COMPANY = {
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
  workshopAddress: "Sentul Bogor, Jawa Barat",
};

const COMPANY_STATS = [
  { value: "13+", label: "Tahun Dedikasi", detail: "Berdiri sejak 2013 melayani industri nasional" },
  { value: "50+", label: "Proyek Selesai", detail: "Mekanikal, perpipaan & otomasi di seluruh Indonesia" },
  { value: "1", label: "Fasilitas Workshop", detail: "Sentul Bogor, Jawa Barat" },
  { value: "100%", label: "Kepatuhan K3 (HSE)", detail: "Standar keselamatan kerja & sertifikasi ASME/ISO" },
];

const SERVICES = [
  {
    slug: "mechanical",
    title: "Mechanical & Piping Engineering",
    shortTitle: "Mechanical",
    icon: "Wrench",
    imageUrl: "/images/services/mechanical.webp",
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
    standards: ["ASME B31.1 (Power Piping)", "ASME B31.3 (Process Piping)", "API 650", "AWS D1.1"],
    caseHighlight: "Pengerjaan Penstock PLTM Aek Sibundong & Endikat",
  },
  {
    slug: "electrical",
    title: "Electrical & Substation Systems",
    shortTitle: "Electrical",
    icon: "Zap",
    imageUrl: "/images/services/electrical.avif",
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
    slug: "automation",
    title: "Process Automation & SCADA",
    shortTitle: "Automation",
    icon: "Cpu",
    imageUrl: "/images/services/processAutomation.avif",
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
    standards: ["ISA-88 / ISA-95", "IEC 61131-3", "Modbus / Profinet / EtherNet/IP"],
    caseHighlight: "Sistem Otomasi Kontrol Debit & Pintu Air Pembangkit",
  },
  {
    slug: "power-plant",
    title: "Power Plant Equipments & Maintenance",
    shortTitle: "Power Plant",
    icon: "Flame",
    imageUrl: "/images/services/powerPlantEquipments.jpg",
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
    standards: ["ISO 10816 (Vibration)", "ASME Boiler & Pressure Vessel", "IEEE 43"],
    caseHighlight: "Pemasangan Turbin Runner & Alignment Generator PLTM",
  },
];

const CLIENTS = [
  { name: "Pertamina", sector: "Migas & Energi", logo: "pertamina" },
  { name: "PLN", sector: "Pembangkit & Energi", logo: "pln" },
  { name: "Indonesia Power", sector: "Pembangkit & Energi", logo: "indonesia-power" },
  { name: "PJB", sector: "Pembangkit & Energi", logo: "pjb" },
  { name: "DSSP Power", sector: "Pembangkit & Energi", logo: "dssp-power" },
  { name: "ExxonMobil", sector: "Migas & Petrokimia", logo: "exxonmobil" },
  { name: "BP", sector: "Migas & Petrokimia", logo: "bp" },
  { name: "Shell", sector: "Migas & Petrokimia", logo: "shell" },
  { name: "Halliburton", sector: "Migas & Layanan Energi", logo: "halliburton" },
  { name: "Indocement", sector: "Industri Semen & Material", logo: "indocement" },
  { name: "SCG", sector: "Industri Semen & Material", logo: "scg" },
  { name: "AHM (Astra Honda)", sector: "Otomotif & Manufaktur", logo: "ahm" },
  { name: "GS Battery", sector: "Otomotif & Manufaktur", logo: "gs-battery" },
  { name: "Goodyear", sector: "Otomotif & Manufaktur", logo: "goodyear" },
  { name: "Indofood", sector: "Makanan & Minuman", logo: "indofood" },
  { name: "Mayora", sector: "Makanan & Minuman", logo: "mayora" },
  { name: "GarudaFood", sector: "Makanan & Minuman", logo: "garudafood" },
  { name: "Sosro", sector: "Makanan & Minuman", logo: "sosro" },
  { name: "Diamond", sector: "Makanan & Minuman", logo: "diamond" },
  { name: "Wilmar", sector: "Agroindustri & Kelapa Sawit", logo: "wilmar" },
  { name: "Sritex", sector: "Tekstil & Industri", logo: "sritex" },
  { name: "KAI (Kereta Api)", sector: "Transportasi & Infrastruktur", logo: "kai" },
  { name: "Bank BRI", sector: "Perbankan & Fasilitas", logo: "bri" },
  { name: "Westin Hotels", sector: "Komersial & Hospitality", logo: "westin" },
  { name: "Yuasa Battery", sector: "Otomotif & Manufaktur", logo: "yuasa" },
  { name: "Picolo", sector: "Makanan & Minuman", logo: "picolo" },
];

const PROJECTS = [
  {
    slug: "pltm-aek-sibundong",
    title: "Penstock PLTM Aek Sibundong",
    category: "Fabrikasi & Instalasi",
    categoryKey: "fabrikasi",
    imageUrl: "/images/projects/Penstock PLTM Aek Sibundong.jpeg",
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
    featured: true,
  },
  {
    slug: "pltm-endikat",
    title: "Penstock PLTM Endikat",
    category: "Fabrikasi & Instalasi",
    categoryKey: "fabrikasi",
    imageUrl: "/images/projects/Penstock PLTM Endikat.jpg",
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
    featured: true,
  },
  {
    slug: "water-intake-pasuruan",
    title: "Water Intake Pipe PLTU",
    category: "Fabrikasi Pipa",
    categoryKey: "pipa",
    imageUrl: "/images/projects/project-intake-pasuruan-1.webp",
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
    featured: false,
  },
  {
    slug: "scada-substation-pltm",
    title: "SCADA & Otomasi Gardu Induk Minihidro",
    category: "Otomasi & Kelistrikan",
    categoryKey: "otomasi",
    imageUrl: "/images/projects/SCADA & Otomasi Gardu Induk Minihidro.jpg",
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
    featured: false,
  },
];

const FAQS = [
  {
    question: "Apakah PT. Airindo Teknologi Perkasa melayani proyek di luar Pulau Jawa?",
    answer:
      "Ya, kami memiliki pengalaman menangani proyek di berbagai wilayah Indonesia seperti Sumatera (PLTM Aek Sibundong, PLTM Endikat), Kalimantan, Sulawesi, hingga kawasan timur Indonesia. Tim mobilisasi kami siap dikerahkan beserta peralatan kerja standar.",
  },
  {
    question: "Bagaimana kualifikasi welder dan sertifikasi pengelasan yang dimiliki?",
    answer:
      "Seluruh juru las (welder) kami memiliki sertifikasi resmi dari Depnaker dan kualifikasi WPS/PQR sesuai standar ASME Section IX untuk berbagai posisi pengelasan (1G hingga 6G/6GR) pada material Carbon Steel, Stainless Steel, maupun Chrome-Moly.",
  },
  {
    question: "Apakah setiap pekerjaan fabrikasi perpipaan disertai laporan pengujian (NDT)?",
    answer:
      "Tentu. Setiap proyek perpipaan tekanan tinggi dilengkapi dengan inspeksi ketat: visual inspection, uji penetrant (PT), magnetic particle (MT), ultrasonic test (UT), radiography (RT), serta hydrostatic pressure test yang dituangkan dalam Manufacturer's Data Report (MDR).",
  },
  {
    question: "Bagaimana alur kerja pengajuan penawaran harga atau tender?",
    answer:
      "Anda dapat mengirimkan gambar kerja (drawing/isometric), BoQ/RAB, atau TOR proyek ke email solution@atpindonesia.com atau melalui WhatsApp. Tim estimator kami akan menganalisis kebutuhan dan memberikan proposal penawaran teknis serta komersial dalam 1-3 hari kerja.",
  },
  {
    question: "Apakah melayani pekerjaan modifikasi dan perbaikan darurat (troubleshooting)?",
    answer:
      "Ya, selain proyek turnkey baru, kami menyediakan layanan maintenance, revamping sistem pipa lama, penggantian katup/valve, kalibrasi sistem kontrol PLC, dan inspeksi kebocoran darurat fasilitas industri.",
  },
];

const WORKSHOPS = [
  {
    name: "Workshop Sentul Bogor",
    location: "Kawasan Sirkuit Sentul, Bogor, Jawa Barat",
    mapQuery: "Sirkuit Sentul Bogor",
    mapsUrl: "https://maps.google.com/?q=Sentul+International+Circuit+Bogor",
    features:
      "Fasilitas Fabrikasi Pipa Besar, Bending, Sandblasting, Machining Presisi & Area Assembly Spool",
  },
];

const HIGHLIGHTS = [
  {
    icon: "Briefcase",
    title: "Tenaga Ahli Bersertifikat",
    text: "Didukung tenaga profesional berpengalaman dalam pelaksanaan proyek konstruksi dan instalasi industri.",
    badge: "Certified Engineers",
  },
  {
    icon: "Clock3",
    title: "Presisi & Tepat Waktu",
    text: "Pengerjaan fabrikasi dan instalasi perpipaan dengan toleransi milimeter dan timeline ketat.",
    badge: "High Precision",
  },
  {
    icon: "ShieldCheck",
    title: "Standar Kualitas & K3",
    text: "Menjalankan pekerjaan dengan memperhatikan standar kualitas, keselamatan kerja, dan ketentuan proyek.",
    badge: "ASME & ISO Compliant",
  },
  {
    icon: "MessageSquareText",
    title: "Koordinasi Responsif 24/7",
    text: "Koordinasi yang jelas dan responsif untuk mendukung kelancaran setiap tahapan pekerjaan.",
    badge: "Direct Support",
  },
];

const ABOUT_VALUES = [
  {
    icon: "TrendingUp",
    title: "Pertumbuhan Unggul",
    text: "Menjadi perusahaan dengan pertumbuhan berkelanjutan melalui kualitas kerja, pelayanan profesional, dan hubungan jangka panjang dengan pelanggan.",
  },
  {
    icon: "Lightbulb",
    title: "Solusi & Inovasi",
    text: "Menghadirkan solusi melalui inovasi, teknologi, dan keahlian teknis untuk memenuhi kebutuhan serta tantangan pelanggan.",
  },
  {
    icon: "Users",
    title: "Kesejahteraan Bersama",
    text: "Mengedepankan kualitas serta kesejahteraan bersama bagi karyawan dan seluruh pihak yang menjadi bagian dari pertumbuhan perusahaan.",
  },
];

const CTA_POINTS = [
  {
    icon: "MessagesSquare",
    title: "Konsultasi Teknis Gratis",
    text: "Dapatkan solusi terbaik untuk proyek Anda.",
  },
  {
    icon: "BadgeCheck",
    title: "Jaminan Mutu & Garansi",
    text: "Didukung sertifikat material (MTC), laporan uji NDT, dan garansi pekerjaan.",
  },
  {
    icon: "Headset",
    title: "Respon Cepat Tim Ahli",
    text: "Tim estimasi teknis siap memberikan proposal penawaran terperinci.",
  },
  {
    icon: "Handshake",
    title: "Kemitraan Jangka Panjang",
    text: "Kami tumbuh bersama kesuksesan Anda.",
  },
];

// ─────────────────────────────────────────────────────────────
// Seeder
// ─────────────────────────────────────────────────────────────

async function seedAdmin(): Promise<void> {
  const username = process.env.SEED_ADMIN_USERNAME ?? "admin-airindo";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "airindo123123";
  const displayName = process.env.SEED_ADMIN_NAME ?? "Administrator Airindo";

  const existing = await prisma.adminUser.findUnique({ where: { username } });
  if (existing) {
    console.log(`[seed] Admin "${username}" sudah ada — dilewati (tidak diubah).`);
    return;
  }

  await prisma.adminUser.create({
    data: { username, passwordHash: await bcrypt.hash(password, BCRYPT_ROUNDS), displayName },
  });
  console.log(`[seed] Admin "${username}" berhasil dibuat.`);
}

async function seedCompany(): Promise<void> {
  const existing = await prisma.companyProfile.findUnique({ where: { id: "singleton" } });
  if (existing) {
    console.log("[seed] Profil perusahaan sudah ada — dilewati.");
  } else {
    await prisma.companyProfile.create({ data: { id: "singleton", ...COMPANY } });
    console.log("[seed] Profil perusahaan dibuat.");
  }

  if ((await prisma.companyStat.count()) === 0) {
    await prisma.companyStat.createMany({
      data: COMPANY_STATS.map((stat, index) => ({ ...stat, sortOrder: index })),
    });
    console.log(`[seed] ${COMPANY_STATS.length} statistik perusahaan dibuat.`);
  }
}

async function seedServices(): Promise<void> {
  for (const [index, service] of SERVICES.entries()) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: { ...service, sortOrder: index },
    });
  }
  console.log(`[seed] ${SERVICES.length} layanan disiapkan.`);
}

async function seedClients(): Promise<void> {
  if ((await prisma.client.count()) > 0) {
    console.log("[seed] Klien sudah ada — dilewati.");
    return;
  }

  await prisma.client.createMany({
    data: CLIENTS.map((client, index) => ({
      name: client.name,
      sector: client.sector,
      logoUrl: `/images/clients/${client.logo}.webp`,
      sortOrder: index,
    })),
  });
  console.log(`[seed] ${CLIENTS.length} klien dibuat.`);
}

async function seedProjects(): Promise<void> {
  for (const [index, project] of PROJECTS.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: { ...project, sortOrder: index },
    });
  }
  console.log(`[seed] ${PROJECTS.length} proyek disiapkan.`);
}

async function seedContentLists(): Promise<void> {
  if ((await prisma.faq.count()) === 0) {
    await prisma.faq.createMany({
      data: FAQS.map((faq, index) => ({ ...faq, sortOrder: index })),
    });
    console.log(`[seed] ${FAQS.length} FAQ dibuat.`);
  }

  if ((await prisma.workshop.count()) === 0) {
    await prisma.workshop.createMany({
      data: WORKSHOPS.map((workshop, index) => ({ ...workshop, sortOrder: index })),
    });
    console.log(`[seed] ${WORKSHOPS.length} workshop dibuat.`);
  }

  if ((await prisma.highlight.count()) === 0) {
    await prisma.highlight.createMany({
      data: HIGHLIGHTS.map((item, index) => ({ ...item, sortOrder: index })),
    });
    console.log(`[seed] ${HIGHLIGHTS.length} highlight dibuat.`);
  }

  if ((await prisma.aboutValue.count()) === 0) {
    await prisma.aboutValue.createMany({
      data: ABOUT_VALUES.map((item, index) => ({ ...item, sortOrder: index })),
    });
    console.log(`[seed] ${ABOUT_VALUES.length} nilai perusahaan dibuat.`);
  }

  if ((await prisma.ctaPoint.count()) === 0) {
    await prisma.ctaPoint.createMany({
      data: CTA_POINTS.map((item, index) => ({ ...item, sortOrder: index })),
    });
    console.log(`[seed] ${CTA_POINTS.length} poin CTA dibuat.`);
  }
}

async function main(): Promise<void> {
  await seedAdmin();
  await seedCompany();
  await seedServices();
  await seedClients();
  await seedProjects();
  await seedContentLists();
  console.log("[seed] Selesai.");
}

main()
  .catch((error) => {
    console.error("[seed] Gagal:", error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
