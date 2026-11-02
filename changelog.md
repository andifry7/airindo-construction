# Changelog

Semua perubahan penting pada proyek ini dicatat di sini.
Format mengikuti [Keep a Changelog](https://keepachangelog.com/id/1.1.0/), versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

**Tujuan file ini:** jejak progres agar sesi bisa dilanjutkan oleh siapa pun — termasuk AI agent lain — tanpa kehilangan konteks. Setiap tugas yang selesai **wajib** menambah satu entri.

Kode kategori: `Added` (fitur baru), `Changed` (perubahan), `Fixed` (perbaikan bug), `Removed` (dihapus), `Security` (keamanan), `Docs` (dokumentasi).

---

## [Unreleased]

### Added — 2 November 2026 (Fase 6 — konten pendukung di panel admin)
- **Added** `app/components/admin/ContentManager.jsx` — editor generik untuk 5 daftar konten: FAQ, Workshop, Highlight, Nilai Perusahaan, Poin CTA. Mendukung tambah, hapus, ubah urutan (naik/turun), dan simpan sekaligus.
- **Added** field ikon dengan saran nama dari registry (`Wrench`, `ShieldCheck`, …) agar tidak salah tulis.
- **Changed** `AdminSidebar` — menu baru **"Konten Pendukung"**.
- **Changed** `AdminHeader` — judul & subjudul untuk tab konten.
- **Changed** `admin-portal/page.jsx` — memuat 5 daftar konten dari API, tab internal untuk memilih jenis, dan `PUT /admin/content/:type` saat menyimpan (otomatis memicu revalidasi).
- **Changed** `next.config.ts` — `distDir` bisa diarahkan lewat env `NEXT_DIST_DIR` (workaround bila folder `.next` terkunci di mesin ini); `.next-run/` masuk `.gitignore`.

### Verified — uji Fase 6 (2 November 2026)

| Uji | Hasil |
|---|---|
| Tab Konten Pendukung | 5 tab: FAQ · Workshop · Highlight · Nilai Perusahaan · Poin CTA |
| FAQ | 5 item, 10 textarea (pertanyaan + jawaban) |
| **Ubah pertanyaan dari UI → simpan** | tersimpan di **database** (dicek via API publik) |
| Kembalikan pertanyaan | berhasil |
| Highlight | 4 item, 12 input teks |
| Workshop | 1 item — field nama, lokasi, query maps, URL maps, kapabilitas |
| Tambah lalu hapus item (CTA) | 4 → 5 → 4 |
| Error halaman | **0** |

### Changed — 2 November 2026 (Fase 5b — panel admin memakai API)
- **Added** `app/lib/admin-mappers.js` — pemetaan `imageUrl`→`image`, `logoUrl`→`logo`, `question/answer`→`q/a`, dan sebaliknya.
- **Changed** `app/lib/admin-api.js` — ditambah `adminApi` (projects, clients, services, company, content, media, dashboard, export) + helper `buildQuery` dan upload multipart.
- **Changed** `app/admin-portal/page.jsx` — **seluruh `localStorage` dihapus**. Konten dimuat dari API setelah sesi valid; setiap mutasi memanggil endpoint lalu memuat ulang data agar tampilan = isi database.
- **Changed** `ProjectsManager` — create/update/delete/toggle featured lewat API; foto diunggah ke Cloudinary (`/admin/media`) menggantikan `FileReader` base64; tombol simpan menampilkan status & menolak submit ganda.
- **Changed** `ClientsManager` — CRUD berbasis **`id`** (bukan index array); logo diunggah ke Cloudinary.
- **Changed** `ServicesManager` — PATCH ke API, ikon dipilih berdasarkan `slug`.
- **Changed** `CompanySettings` — `PUT /admin/company` (profil + statistik); field `mapQuery`, `establishedYear`, dan `workshopAddress` kini diambil dari database (sebelumnya `workshopAddress` hardcoded).
- **Changed** `DashboardOverview` — angka memakai `/admin/dashboard`, dengan fallback ke data yang dimuat.
- **Changed** `AdminHeader` — tombol "Reset Default" dihapus (tidak relevan lagi karena data di database).
- **Changed** "Cadangkan JSON" — mengunduh hasil `GET /admin/export` dari server, bukan menyusun dari state browser.

### Verified — uji Fase 5b (2 November 2026)

| Uji | Hasil |
|---|---|
| Login → panel | terbuka, konten dimuat dari API |
| Dashboard | 26 klien · 4 proyek (angka dari server) |
| Daftar proyek | 4 kartu dari database |
| **Edit judul proyek dari UI** | tersimpan di **database** (diverifikasi lewat API publik) |
| Kembalikan judul | berhasil, data uji bersih |
| Logo klien di admin | **26/26 termuat** (sebelumnya 0/26 karena slug `.png`) |
| Nomor WhatsApp | terisi dari database |
| **Upload foto via UI** | masuk ke Cloudinary (`airindo/projects/...`), `imagePublicId` tersimpan |
| Buat proyek baru | tersimpan, muncul di daftar |
| Hapus proyek | hilang dari database |
| Export JSON | berhasil diunduh dari server |
| Error konsol (selain 401 sesi) | **0** |

Catatan lingkungan: `next dev` dan `next build` sempat gagal `EPERM` pada `.next/dev/types/*.d.ts` karena lapisan *file system shim* di mesin ini. Server tetap bisa berjalan setelah percobaan ulang; ini bukan masalah kode.

### Changed — 2 November 2026 (Fase 1 — form login menggantikan PIN)
- **Added** `app/lib/admin-api.js` — klien API admin (`credentials: "include"`), kelas `ApiError` dengan properti `isUnauthorized`, penanganan error jaringan.
- **Added** `app/components/admin/LoginForm.jsx` — form **username + password** bergaya sama dengan situs (kartu putih, latar navy, ikon kunci), toggle lihat password, state loading & error.
- **Removed** `app/components/admin/SecurityGate.jsx` — PIN gate lama dihapus total.
- **Changed** `app/admin-portal/page.jsx` — sesi diverifikasi ke `GET /auth/me` saat panel dibuka; belum punya sesi → form login, sudah punya → panel. Logout memanggil `POST /auth/logout`.
- **Changed** `CompanySettings` — bagian "Ganti PIN" menjadi **"Keamanan & Ganti Password"** (password saat ini / baru / konfirmasi) yang memanggil `PATCH /auth/password`; setelah sukses otomatis keluar ke form login karena `token_version` naik.
- **Changed** `DashboardOverview` — teks "Perlindungan PIN (default 2013)" diganti keterangan JWT 24 jam di cookie httpOnly.
- **Removed** seluruh logika `localStorage` untuk `airindo_admin_pin`.
- **Added** `NEXT_PUBLIC_API_BASE_URL` di `.env.example` (dipakai browser); boleh dikosongkan bila frontend & backend satu domain.

### Verified — uji Fase 1 (2 November 2026)

| Uji | Hasil |
|---|---|
| Buka `/admin-portal` tanpa sesi | form login tampil (username + password), **tidak ada** teks "PIN" |
| Login password salah | pesan "Username atau password salah." |
| Login benar | masuk panel |
| Reload halaman | sesi bertahan (cookie) |
| Cookie `airindo_session` | `httpOnly=true`, `SameSite=Lax`, kedaluwarsa ±24 jam |
| Tombol "Kunci & Keluar Panel" | kembali ke form login |
| Buka ulang `/admin-portal` setelah logout | form login |
| Ganti password lewat Settings | pesan sukses, otomatis logout |
| Password lama setelah diganti | ditolak (`401`) — terverifikasi via API |
| Password baru | diterima (`200`) |
| Password dikembalikan ke default | `airindo123123` aktif kembali |

Catatan: browser mencatat 401 di konsol saat pengecekan sesi — itu normal untuk pemeriksaan autentikasi, bukan error aplikasi.

### Added — 2 November 2026 (Fase 5 — integrasi halaman publik ke API)
- **Added** `app/lib/site-content.js` — `getSiteContent()` memakai `'use cache'` + `cacheTag('site-content')` + `cacheLife('hours')`, mengambil `/api/v1/public/bootstrap`. Bila API tidak terjangkau, otomatis memakai data statis `app/lib/data.js` (situs tidak pernah kosong).
- **Added** `app/components/providers/ContentProvider.jsx` — satu kali fetch di layout, dibagikan ke seluruh komponen lewat context. Tidak ada prop drilling.
- **Added** `app/lib/icons.js` — registry nama ikon → komponen lucide, karena database hanya menyimpan nama (`"Wrench"`, `"Zap"`, …).
- **Added** `app/lib/whatsapp.js` — `whatsappUrl(company, message)` menggantikan `company.whatsappUrl()` yang tidak bisa dikirim lewat JSON.
- **Added** `app/api/revalidate/route.js` — `POST /api/revalidate` dengan header `x-revalidate-secret`; memanggil `revalidateTag('site-content', 'max')`.
- **Changed** `app/(public)/layout.jsx` menjadi async Server Component yang mengambil konten lalu membungkusnya dengan `ContentProvider`.
- **Changed** 13 komponen kini membaca data dari `useContent()` (Hero, Highlights, Services, Clients, Projects, Faq, CallToAction, ServiceDetailModal, ProjectDetailModal, QuickStartModal, FloatingActionHub, Footer, CompanyHistory) dan halaman `/kontak`.
- **Changed** `next.config.ts` — `images.remotePatterns` untuk `res.cloudinary.com`.
- **Added** `.env.example` untuk frontend (`API_BASE_URL`, `REVALIDATE_SECRET`) dan pengecualian `!.env.example` di `.gitignore`.
- **Added** backend `shared/utils/revalidate.ts` — setiap mutasi (projects, clients, services, company, content) otomatis memicu revalidasi frontend. Kegagalan revalidasi tidak menggagalkan penyimpanan.

### Verified — uji Fase 5 (2 November 2026, mode produksi `npm start`)

| Uji | Hasil |
|---|---|
| Build frontend | sukses; rute publik `Revalidate 1h / Expire 1d`, `/api/revalidate` dinamis |
| Beranda dari API | 26 logo klien, judul proyek, statistik, layanan — semua muncul di HTML server |
| Ikon layanan | 4 kartu menampilkan Wrench/Zap/Cpu/Flame dengan benar (registry bekerja) |
| Halaman lain | `/about`, `/layanan`, `/kontak` → `200`, konten dari DB (workshop "Sentul Bogor" tampil) |
| Error konsol browser | **0** |
| Ubah judul proyek di admin → publik | tetap lama (cache bekerja) |
| Panggil `/api/revalidate` dengan secret | `200` → publik berubah ke judul baru |
| `/api/revalidate` tanpa secret | `401` |
| Ubah judul **tanpa** revalidate manual | publik berubah otomatis (backend memicu revalidasi) |
| Kembalikan judul asli | berhasil, data uji bersih |

### Added — 2 November 2026 (Fase 4 — modul konten + media)
- **Added** 11 tabel konten: `projects`, `services`, `clients`, `company_profile`, `company_stats`, `media`, `faqs`, `workshops`, `highlights`, `about_values`, `cta_points`. Migrasi `20261102105149_content_tables`.
- **Added** seeder konten dari `app/lib/data.js` — 4 proyek, 4 layanan, 26 klien, profil perusahaan, 4 statistik, 5 FAQ, 1 workshop, 4 highlight, 3 nilai perusahaan, 4 poin CTA. Idempoten.
- **Added** modul `projects` — CRUD penuh + toggle `featured` + filter publik (`category`, `q`, `featured`, pagination).
- **Added** modul `services` — **edit-only** sesuai keputusan client (GET + PATCH, tanpa create/delete).
- **Added** modul `clients` — CRUD penuh berbasis `id` (bukan index array seperti versi lama).
- **Added** modul `company` — profil + statistik; penggantian statistik dibungkus transaksi.
- **Added** modul `content` — 5 daftar pendukung lewat `/public/content/:type` dan `/admin/content/:type`.
- **Added** modul `media` — upload ke Cloudinary (multer memory, maks 5MB, whitelist MIME) + hapus; hanya folder `projects` dan `clients`.
- **Added** adapter storage `shared/storage/cloudinary.storage.ts` agar provider bisa ditukar nanti.
- **Added** `GET /public/bootstrap` — satu permintaan untuk seluruh kebutuhan halaman publik.
- **Added** `GET /admin/dashboard` (hitungan dari DB) dan `GET /admin/export` (cadangan JSON).
- **Fixed** mengubah judul proyek tidak lagi mengubah `slug` — URL yang sudah beredar tetap aman. Slug hanya berubah bila dikirim eksplisit.
- **Fixed** error handler kini menangani `MulterError` (`LIMIT_FILE_SIZE` → 422 dengan pesan jelas).

### Verified — uji Fase 4 (2 November 2026)

| Uji | Hasil |
|---|---|
| `GET /public/bootstrap` | 4 layanan · 26 klien · 4 proyek (2 unggulan) · 4 highlight · 3 values · 4 CTA · 5 FAQ · 1 workshop |
| `GET /public/projects?category=pipa` | 1 hasil (Water Intake Pipe PLTU) |
| `GET /public/projects?featured=true` | 2 hasil |
| `GET /public/projects/:slug` | detail benar; slug tidak ada → `404` |
| Admin tanpa sesi | `401` |
| CRUD proyek (create → toggle featured → update → delete) | semua `200`; total kembali ke 4 |
| `PATCH /admin/services/:id` | `200`, `icon` tetap |
| `PUT /admin/company` | `200`, statistik utuh |
| `PUT /admin/content/faqs` | `200`, 5 item, `sortOrder` 0..4 |
| Tipe konten salah | `422` + daftar tipe yang valid |
| Upload Cloudinary | `200` — `airindo/projects/*.webp`, 1181x733, 156 KB; URL publik `200 image/webp` |
| Hapus media | baris DB `0`; aset hilang dari Cloudinary Admin API (`resources: []`) |
| `GET /admin/dashboard` | `{projects:4, featuredProjects:2, clients:26, services:4, faqs:5, workshops:1, sectors:12}` |
| `GET /admin/export` | 9 kunci, 4 proyek · 26 klien · 4 layanan · 5 FAQ |

### Added — 2 November 2026 (Fase 2 — scaffold backend)
- **Added** folder `backend/` — Express 5 + TypeScript (`strict`, `noUncheckedIndexedAccess`), arsitektur **modular monolith** (`src/modules`, `src/shared`, `src/config`).
- **Added** validasi environment dengan Zod di `src/config/env.ts` — aplikasi gagal cepat bila `DATABASE_URL` atau `JWT_SECRET` tidak valid.
- **Added** lapisan `src/shared/`: singleton Prisma, `AppError`, error handler terpusat (menangani `AppError`, `ZodError`, dan error Prisma `P2002`/`P2025`), `notFound`, `validate` (Zod), `requireAuth`, logger pino, dan envelope respons `{ success, data, meta?, error? }`.
- **Added** `GET /health` — mengecek koneksi database; balas `503` bila database mati.
- **Added** skrip: `dev`, `build`, `start`, `typecheck`, `db:generate`, `db:migrate`, `db:deploy`, `db:seed`, `db:studio`.
- **Added** `backend/.env.example` (tanpa nilai rahasia) dan `backend/.gitignore`.
- **Verified** `npm run typecheck` dan `npm run build` lolos; `dist/app.js` dapat dimuat.

### Added — 2 November 2026 (Fase 3 — auth JWT + seeder)
- **Added** model Prisma `AdminUser` (`admin_users`) dengan kolom `token_version`; migrasi `20261102104357_init_admin_users`.
- **Added** seeder idempoten `prisma/seed.ts` — membuat `admin-airindo` dengan bcrypt cost 12; tidak menimpa bila sudah ada.
- **Added** endpoint auth di `/api/v1/auth`:
  - `POST /login` — JWT **24 jam** (`expiresInSeconds: 86400`), dikirim lewat cookie `httpOnly` + `sameSite=lax` (+ `secure` di produksi). Token **tidak** dikirim di body.
  - `POST /logout` — hapus cookie.
  - `GET /me` — profil admin (butuh sesi).
  - `PATCH /password` — verifikasi password lama, hash baru, **naikkan `token_version`**, lalu hapus cookie.
- **Added** middleware `requireAuth` — verifikasi JWT + cocokkan `token_version` dengan database.
- **Added** rate limit login: 5 percobaan gagal / 15 menit per IP.
- **Security** pesan error login selalu generik ("Username atau password salah.") dan waktu respons disamakan dengan bcrypt tiruan saat username tidak ditemukan.

### Verified — uji end-to-end Fase 2–3 (2 November 2026)

| Uji | Hasil |
|---|---|
| `GET /health` | `200` — `database: connected` |
| Login password salah | `401` — pesan generik |
| Login benar | `200` — cookie `airindo_session` (HttpOnly), `expiresInSeconds: 86400` |
| `GET /me` dengan cookie | `200` |
| `GET /me` tanpa cookie | `401` |
| Payload tanpa password | `422` + detail field |
| Ganti password | `200` — cookie lama langsung ditolak (`401` "Sesi sudah tidak berlaku") |
| Login dengan password lama setelah ganti | `401` |
| Login dengan password baru | `200` |
| Logout | `200` → `/me` jadi `401` |
| Rate limit (percobaan gagal berulang) | `429` setelah 5 kegagalan |

Password admin dikembalikan ke nilai default `airindo123123` setelah pengujian.

### Removed — 2 November 2026
- **Removed** `app/components/home/ProjectEstimator.jsx` (343 baris) — komponen kalkulator estimasi yang tidak pernah dirender di halaman mana pun. Keputusan client: fokus ke WhatsApp.
  - **Arsip:** tersimpan di commit `68fab02` (`feat: initialize Next.js project structure...`).
  - **Pulihkan:** `git show 68fab02:app/components/home/ProjectEstimator.jsx > app/components/home/ProjectEstimator.jsx`
  - Tidak ada referensi lain yang tersisa (`grep` bersih), sehingga build tidak terpengaruh.

### Docs — 2 November 2026 (keputusan putaran kedua)
- **Changed** `prd.md`: **ADR-05 diganti** — auth memakai **JWT 24 jam** di cookie httpOnly (bukan session), ditambah mitigasi `token_version` untuk logout paksa saat ganti password.
- **Added** `prd.md` **ADR-09**: struktur repo **monorepo** — frontend di root, backend di `backend/`; alasan, konsekuensi, dan kapan sebaiknya dipecah.
- **Changed** `prd.md`: **lead/RFQ tidak dibuat** (murni WhatsApp) → tabel `leads` & endpoint-nya dihapus dari rancangan; tabel `session` dihapus karena JWT stateless.
- **Changed** `prd.md`: cakupan upload dipersempit ke **gambar proyek & logo klien** saja.
- **Changed** `prd.md`: **FAQ / Workshop / Highlights masuk v1** → 5 tabel konten pendukung (`faqs`, `workshops`, `highlights`, `about_values`, `cta_points`) + endpoint `/public/content/:type` dan `/admin/content/:type`.
- **Changed** `plan.md`: Fase 3 (JWT + `token_version`), Fase 4 (skema konten + batas upload), Fase 6 diubah dari "Lead" menjadi "Konten pendukung".

### Infrastructure — 2 November 2026
- **Added** container `airindo-postgres` (`postgres:16-alpine`, **PostgreSQL 16.15**) via Podman; port `5432` → host, volume persisten `airindo_pgdata`.
- **Added** database `airindo_construction` (owner `airindo`).
- **Verified** koneksi: port 5432 terbuka dari Windows host; `select version()` berhasil.
- **Added** `backend/.env` (di-ignore git) berisi `DATABASE_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `JWT_SECRET`.
- **Verified** kredensial Cloudinary: `GET /v1_1/odo7lnkt/ping` → `200 {"status":"ok"}`. Catatan: cloud name sempat salah baca (`odo7inkt`), yang benar `odo7lnkt`.

### Docs — 2 November 2026 (sesi lanjutan)
- **Changed** `prd.md`: mencatat 5 keputusan client — storage **Cloudinary** dipilih; auth berupa **form login di dalam `/admin-portal`** (tanpa rute `/login`); **layanan cukup edit 4 pilar** (tanpa tambah/hapus); **hosting ditunda**, kerja di localhost; **PostgreSQL lokal via Podman**.
- **Changed** `prd.md`: fitur F6 dari "CRUD Layanan" → "Edit Layanan"; endpoint `/admin/services` disesuaikan (hanya GET + PATCH, tanpa create/delete); ADR-04 dan seksi Deployment disesuaikan; pertanyaan terbuka menyusut dari 10 menjadi 5.
- **Changed** `plan.md`: Fase 1 diubah dari "halaman `/login`" menjadi "form login di `/admin-portal`"; Fase 0 mencatat status Podman.
- **Note** terblokir: `podman machine start` membutuhkan `wsl.exe` yang diblokir kebijakan sandbox agent — perlu dijalankan user dari terminal sendiri.

### Docs — 2 November 2026
- **Added** `prd.md`: konteks produk, hasil audit frontend, arsitektur target, tech stack, 8 ADR (PostgreSQL, modular monolith, Express+TS, Cloudinary, session cookie, topologi deploy, cache/revalidasi, git workflow), draft model data, rancangan API, keamanan, risiko, dan 10 pertanyaan terbuka.
- **Added** `plan.md`: 9 fase kerja (F0–F8), aturan branch & commit, Definition of Done, dan log progres.
- **Added** `changelog.md`: file ini.
- **Changed** `AGENTS.md`: menambahkan aturan kerja proyek (commit wajib, changelog wajib, alur branch, larangan menyentuh folder lain) di atas blok aturan Next.js yang sudah ada.

### Repo — 2 November 2026
- **Added** branch `development` (integrasi, area kerja frontend).
- **Added** branch `backend-zacky` (area kerja backend).
- **Changed** branch aktif dari `master` ke `development`.
- **Pushed** kedua branch ke `origin` (kredensial GitHub sudah tersedia di mesin ini).

### Observasi — 1 November 2026
- **Added** `node_modules` (364 paket) via `npm install`; `package-lock.json` tidak berubah.
- **Verified** `npm run dev` siap dalam 4,7 detik; 7 rute balas 200, `/admin` 307 → `/admin-portal`.
- **Verified** `npm run build` sukses (compile 39,3 detik); 8/8 rute `○ Static`.
- **Verified** `next start` produksi normal.
- **Fixed** tidak ada — sesi ini murni observasi, tidak mengubah kode produk.

### Temuan audit (belum diperbaiki)
Dicatat agar tidak hilang; perbaikannya dijadwalkan di `plan.md`.

- **Bug** panel admin menulis ke `localStorage` sementara halaman publik membaca `import` statis → perubahan admin tidak pernah tampil. Terbukti: proyek baru tersimpan (5 item) tetapi `/proyek` tetap 4 kartu, bahkan di konteks browser yang sama.
- **Bug** 26/26 logo klien di panel admin kosong — kode meminta `.png`, file aslinya `.webp` (404).
- **Bug** `QuickQuoteModal` tidak bisa dibuka: tiga pemanggil `onOpenQuote` semuanya jalur mati (`onConsult` tidak pernah dipanggil di `ProjectDetailModal`/`ServiceDetailModal`).
- **Bug** `featured` tidak dibaca `Projects.jsx` → toggle "tampilkan di beranda" tidak berefek.
- **Security** auth PIN `2013` di-hardcode di client, diverifikasi di browser, disimpan di `localStorage`.
- **Security** upload gambar via `FileReader` → base64 → `localStorage` (kuota ~5MB).
- **Removed (usulan)** `ProjectEstimator.jsx` (343 baris) tidak dirender di halaman mana pun; `estimatorData` di `data.js` nol referensi.
- **Note** `services.icon` adalah komponen React — tidak bisa dikirim lewat JSON; perlu icon registry berbasis string.
- **Note** `clients` tidak punya `id`; update/hapus memakai index array.
- **Note** 9 file logo orphan di `public/images/clients/` (typo: `exxon.webp`, `haliburton.webp`, `dssp power.webp`, `indonesia power.webp`, `tiga roda.webp`, dll).
- **Note** ESLint: 3 error — semuanya di folder tooling `.agents/`, kode aplikasi 0 error / 49 warning.
- **Note** error dev-only `/admin`: `Could not validate "instant"` (NEXT_REDIRECT + `cacheComponents`); tidak muncul di produksi.
