# PRD — Airindo Construction

**Produk:** Website Company Profile + Panel Admin (CMS) PT. Airindo Teknologi Perkasa
**Repo:** https://github.com/andifry7/airindo-construction
**Versi dokumen:** 1.0
**Terakhir diperbarui:** 2 November 2026
**Status:** Diskusi konteks — belum masuk implementasi

| Peran | Nama | Tanggung jawab |
|---|---|---|
| Frontend | Alfin (`andifry7`) | UI/UX, halaman publik, panel admin |
| Backend | Zacky (`AchmadZackyGZ`) | API, database, auth, storage, integrasi |
| Pemilik produk | Client | Hosting di Hostinger, keputusan bisnis |

---

## 1. Ringkasan

Website company profile untuk PT. Airindo Teknologi Perkasa — perusahaan fabrikasi perpipaan, kelistrikan, otomasi, dan perawatan pembangkit listrik. Situs terdiri dari halaman publik (beranda, tentang, layanan, proyek, kontak) dan satu panel admin untuk mengelola konten.

Frontend sudah dibangun oleh Alfin dan **sudah berjalan**, tetapi seluruh data masih statis. Backend dibangun oleh Zacky agar konten bisa dikelola tanpa mengubah kode.

---

## 2. Latar belakang & masalah

Hasil audit kode + observasi runtime (2 November 2026):

1. **Semua konten hardcoded** di `app/lib/data.js` (585 baris). Mengubah satu proyek berarti edit kode lalu deploy ulang.
2. **Panel admin tidak terhubung ke publik.** Admin menulis ke `localStorage`; halaman publik membaca `import` statis. Terbukti eksperimental: proyek baru tersimpan (5 item) tapi tidak muncul di `/proyek` maupun `/`, bahkan di browser yang sama.
3. **Auth palsu.** PIN `2013` di-hardcode di client, diverifikasi di browser, disimpan di `localStorage`. Bisa di-bypass lewat DevTools.
4. **Upload gambar = base64.** `FileReader` → dataURL → `localStorage`. Boros kuota (~5MB) dan tidak bisa dipakai lintas perangkat.
5. **Logo klien di admin rusak total.** 26/26 kotak kosong: kode meminta `.png` padahal file `.webp` (404).
6. **Modal RFQ tidak bisa dibuka.** Tiga pemanggil `onOpenQuote` semuanya jalur mati (`onConsult` tidak pernah dipanggil). Fitur RFQ praktis tidak ada.
7. **Section Estimator** (`ProjectEstimator.jsx`, 343 baris) tidak dirender di halaman mana pun.
8. **Semua rute statis.** `next build` menghasilkan 8/8 rute `○ Static` dengan `cacheComponents: true` — integrasi API wajib punya strategi revalidasi.

**Catatan penting dari client:** pengunjung biasanya langsung menghubungi via WhatsApp. Karena itu jalur RFQ/modal bukan prioritas; WhatsApp tetap kanal utama. Namun data lead tetap layak disimpan bila murah dilakukan.

---

## 3. Tujuan (v1)

- Admin dapat login dengan **username + password** dan mengelola konten tanpa menyentuh kode.
- Perubahan dari admin **benar-benar tampil** di situs publik.
- Gambar tersimpan di **object storage** (bukan base64), bisa diunggah ulang kapan saja.
- Hanya **satu akun admin**, dibuat lewat **seeder** — tanpa halaman register.
- Situs tetap cepat (target: halaman publik tetap static/ISR, bukan dynamic per request).

## 4. Non-tujuan (v1)

- Multi-admin, RBAC, atau audit log per user
- Halaman register / lupa password via email
- Multi-bahasa (site saat ini 100% Bahasa Indonesia)
- Blog / artikel / SEO engine
- E-commerce, pembayaran, atau kalkulator harga otomatis
- Aplikasi mobile

---

## 5. Lingkup fitur v1

| # | Fitur | Prioritas | Keterangan |
|---|---|---|---|
| F1 | Login admin (username + password) | Wajib | Menggantikan SecurityGate PIN |
| F2 | Logout + proteksi route admin | Wajib | Session cookie |
| F3 | Ganti password | Wajib | Menggantikan "Ganti PIN" di CompanySettings |
| F4 | CRUD Proyek | Wajib | + toggle `featured` |
| F5 | CRUD Klien (logo + sektor) | Wajib | Ganti key index → `id` |
| F6 | Edit Layanan | Wajib | Cukup 4 pilar yang ada — tanpa tambah/hapus (keputusan client) |
| F7 | Kelola Profil Perusahaan + Statistik | Wajib | Nomor WA, alamat, 4 counter |
| F8 | Upload media (gambar) | Wajib | Cloudinary, maks 5MB |
| F9 | Dashboard ringkasan | Wajib | Hitungan dari DB, bukan state lokal |
| F10 | Export JSON (backup) | Opsional | Sudah ada di frontend |
| F11 | Simpan lead RFQ/Kontak | Opsional | Client utamakan WhatsApp |
| F12 | Kelola FAQ / Workshop / Highlights | v1.1 | Belum ada UI admin-nya |
| F13 | Media library | v1.1 | Cukup upload per-entitas dulu |

---

## 6. Arsitektur target

```
┌──────────────────────────────────────────────────────────────┐
│                    BROWSER (pengunjung / admin)              │
└───────────────┬──────────────────────────────┬───────────────┘
                │                              │
        halaman publik                    panel admin
                │                              │
┌───────────────▼──────────────────────────────▼───────────────┐
│  FRONTEND — Next.js 16 (App Router, React 19, Tailwind v4)   │
│  • Server Components mengambil data dari API                 │
│  • ISR / cache tag + revalidate setelah admin menulis        │
│  • Halaman /login (username + password)                      │
└───────────────────────────┬──────────────────────────────────┘
                            │ HTTPS + cookie session
┌───────────────────────────▼──────────────────────────────────┐
│  BACKEND — Node.js + Express + TypeScript (Modular Monolith) │
│  modules/: auth, projects, services, clients, company,       │
│            leads, media                                      │
│  shared/: db (Prisma), middleware, errors, utils             │
└───────────┬───────────────────────────────┬──────────────────┘
            │                               │
   ┌────────▼────────┐            ┌─────────▼──────────┐
   │  PostgreSQL     │            │  Cloudinary (SaaS) │
   │  (data konten)  │            │  (gambar + CDN)    │
   └─────────────────┘            └────────────────────┘
```

**Topologi deploy yang direkomendasikan (1 domain):**

```
example.com          → Next.js  :3000
example.com/api/*    → Express  :4000   (reverse proxy Nginx)
```

Alasan: cookie session menjadi *first-party* (tidak perlu `SameSite=None`), tidak ada CORS, dan satu sertifikat TLS.

---

## 7. Tech stack

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Frontend | Next.js 16.4.2, React 19.3, Tailwind v4 | Sudah ada, jangan diganti |
| Bahasa backend | **TypeScript** (strict) | Wajib dari client; kontrak data jelas |
| Runtime | Node.js 22 LTS | Sudah terpasang, cocok dengan Next 16 |
| Framework | **Express 5** | Wajib dari client; ekosistem matang |
| Arsitektur | **Modular Monolith** | Wajib dari client; batas modul jelas, satu deploy |
| ORM | Prisma | Migrasi + type-safe + seeder mudah |
| Database | **PostgreSQL** | Wajib dari client; array & JSONB cocok untuk `tags`, `scope_points` |
| Validasi | Zod | Satu skema untuk validasi & tipe |
| Auth | Session cookie + bcrypt | Satu admin, logout instan, tanpa kompleksitas refresh token |
| Storage | Cloudinary (+ adapter) | Lihat ADR-04 |
| Upload | Multer (memory) → Cloudinary stream | Tanpa menulis file ke disk VPS |
| Logging | pino | Ringan, JSON, siap produksi |
| Keamanan | helmet, express-rate-limit, cors | Baseline wajib |

---

## 8. Keputusan teknis (ADR ringkas)

### ADR-01 — Database: PostgreSQL
**Keputusan:** PostgreSQL, lokal saat development.
**Alasan:** permintaan client; dukungan `text[]` untuk `tags`/`scope_points`/`standards` menghindari tabel pivot yang tidak perlu.
**Konsekuensi:** Hostinger shared hosting umumnya hanya menyediakan MySQL. Deploy PostgreSQL butuh **VPS** (atau managed Postgres pihak ketiga). Perlu dikonfirmasi ke client.

### ADR-02 — Arsitektur: Modular Monolith
**Keputusan:** satu aplikasi Express, dipisah per modul bisnis.
**Aturan:** modul tidak boleh mengakses tabel milik modul lain langsung; komunikasi lewat service. Tujuannya agar bisa dipecah jadi service terpisah bila suatu saat perlu.
**Struktur:**
```
backend/
  src/
    modules/<nama>/{routes,controller,service,repository,schema,types}.ts
    shared/{db,middlewares,errors,utils}/
    config/
    app.ts
    server.ts
  prisma/{schema.prisma,seed.ts,migrations/}
```

### ADR-03 — Bahasa & framework: TypeScript + Express
**Keputusan:** TypeScript `strict: true`, Express 5, build via `tsc`, dev via `tsx watch`.
**Konsekuensi:** `noImplicitAny`, `strictNullChecks` aktif — DTO wajib didefinisikan.

### ADR-04 — Storage: Cloudinary (rekomendasi), dengan adapter
**Keputusan:** Cloudinary untuk v1 (disetujui client 2 November 2026), dibungkus `StorageProvider` interface.
**Alasan:**
1. Client hosting di Hostinger — MinIO butuh VPS + daemon tambahan + disk + backup + TLS. Beban operasional jatuh ke client.
2. Cloudinary memberi transformasi URL (`f_auto,q_auto,w_800`) → otomatis WebP/AVIF + resize. Ini sekaligus menyelesaikan masalah campur `.jpg/.jpeg/.webp` yang sekarang ada.
3. Free tier cukup untuk ~50–200 gambar skala company profile.
4. Tidak ada file yang perlu disimpan/di-backup di VPS.

**Kapan MinIO lebih baik:** client menuntut seluruh aset berada di server sendiri (data sovereignty), volume gambar sangat besar, atau ada larangan memakai layanan pihak ketiga. Saat itu terjadi, cukup tambah adapter `minio` tanpa mengubah modul lain.
**Konsekuensi:** butuh akun Cloudinary + 3 environment variable; URL gambar menunjuk domain `res.cloudinary.com` (perlu `remotePatterns` di `next.config.ts`).
**Alternatif yang dipertimbangkan:** MinIO (self-hosted), Cloudflare R2 (S3-compatible, tanpa biaya egress).

### ADR-05 — Auth: session cookie, bukan JWT
**Keputusan:** `express-session` + `connect-pg-simple` (session disimpan di PostgreSQL), cookie `httpOnly`, `sameSite=lax`, `secure` di produksi. Password di-hash bcrypt (cost 12).
**Alasan:** hanya satu admin; logout harus benar-benar mematikan sesi (JWT stateless butuh blacklist); tidak perlu refresh token.
**Konsekuensi:** butuh tabel `session`. Jika nanti ada aplikasi mobile, tambahkan endpoint token terpisah.

### ADR-06 — Topologi deploy: satu domain, Nginx reverse proxy
**Keputusan:** frontend dan backend di bawah satu domain (`/` → Next, `/api` → Express).
**Alasan:** cookie first-party, tanpa CORS, satu TLS.
**Konsekuensi:** jika client memilih frontend di Vercel dan backend di VPS, cookie menjadi cross-site (`SameSite=None; Secure`) dan CORS wajib dikonfigurasi — perlu keputusan terpisah.

### ADR-07 — Cache & revalidasi
**Keputusan:** halaman publik tetap static/ISR; setiap mutasi admin memicu revalidasi.
**Mekanisme:** backend memanggil webhook revalidasi Next (`POST /api/revalidate` dengan secret) setelah write berhasil, atau Next memakai `revalidateTag` lewat route handler internal.
**Konsekuensi:** perlu endpoint revalidasi + `REVALIDATE_SECRET`. Detail implementasi diverifikasi terhadap dokumentasi Next 16 (`cacheComponents`) saat fase integrasi.

### ADR-08 — Git workflow
**Keputusan:** tiga branch.
- `master` — produksi/stabil
- `development` — integrasi, tempat pekerjaan frontend
- `backend-zacky` — area kerja backend

**Alur:** `backend-zacky` → `development` → `master`.
**Aturan commit:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`). Wajib commit setiap tugas selesai. Wajib mencatat di `changelog.md`.

---

## 9. Model data (draft)

| Tabel | Field utama | Catatan |
|---|---|---|
| `admin_users` | id, username (unik), password_hash, display_name, last_login_at | 1 baris, dari seeder |
| `projects` | id, slug (unik), title, category, category_key, image_url, image_public_id, location, client, year, capacity, specs, scope, description, tags `text[]`, featured `bool`, sort_order | `tags` wajib array (hindari crash `.some()`) |
| `services` | id, slug (unik), title, short_title, **icon** `varchar`, image_url, image_public_id, badge, lead, description, scope_points `text[]`, standards `text[]`, case_highlight, sort_order | `icon` = nama ikon (`Wrench`/`Zap`/`Cpu`/`Flame`), dipetakan frontend |
| `clients` | id, name, sector, logo_url, logo_public_id, sort_order | Ganti key index → `id` |
| `company_profile` | id (tunggal), name, full_name, tagline, phone, phone_raw, email, address, map_query, maps_url, established_year, workshop_address | Satu baris |
| `company_stats` | id, value, label, detail, sort_order | 4 baris |
| `leads` | id, type (`rfq`/`contact`), name, company, contact, email, service, location, message, source_page, status, created_at | Opsional (F11) |
| `media` | id, provider, public_id, url, format, width, height, bytes, folder, uploaded_by, created_at | Jejak audit upload |
| `session` | sid, sess, expire | Diisi `connect-pg-simple` |

Tabel v1.1 (bila UI admin-nya dibuat): `faqs`, `workshops`, `highlights`, `about_values`, `cta_points`.

---

## 10. Rancangan API

Format respons seragam: `{ success: boolean, data?: T, meta?: {...}, error?: { code, message, details? } }`
Prefiks: `/api/v1`

**Publik**
| Method | Path | Fungsi |
|---|---|---|
| GET | `/public/bootstrap` | company + stats + services + clients + featured projects (1 request untuk beranda) |
| GET | `/public/projects` | filter `category`, `q`, `featured`, `page`, `limit` |
| GET | `/public/projects/:slug` | detail |
| GET | `/public/services` | daftar |
| GET | `/public/services/:slug` | detail |
| GET | `/public/clients` | daftar |
| GET | `/public/company` | profil + statistik |
| POST | `/public/leads` | simpan RFQ/kontak (rate-limited) |

**Auth**
| Method | Path | Fungsi |
|---|---|---|
| POST | `/auth/login` | `{ username, password }` → set cookie |
| POST | `/auth/logout` | hapus sesi |
| GET | `/auth/me` | cek sesi aktif |
| PATCH | `/auth/password` | `{ currentPassword, newPassword }` |

**Admin** (semua butuh sesi)
| Method | Path | Fungsi |
|---|---|---|
| GET/POST | `/admin/projects` | list + create |
| GET/PATCH/DELETE | `/admin/projects/:id` | detail + update + hapus |
| PATCH | `/admin/projects/:id/featured` | toggle unggulan |
| GET/POST | `/admin/clients` | list + create |
| PATCH/DELETE | `/admin/clients/:id` | update + hapus |
| GET/POST | `/admin/services` | list + create |
| PATCH/DELETE | `/admin/services/:id` | update + hapus |
| GET/PUT | `/admin/company` | profil + statistik |
| GET/PATCH | `/admin/leads`, `/admin/leads/:id` | daftar + ubah status |
| POST/DELETE | `/admin/media`, `/admin/media/:id` | upload + hapus |
| GET | `/admin/dashboard` | hitungan untuk kartu ringkasan |
| GET | `/admin/export` | backup JSON |

---

## 11. Keamanan

- Password: bcrypt cost 12; tidak pernah dikembalikan di respons API.
- Login: rate limit (mis. 5 percobaan / 15 menit / IP), pesan error generik.
- Cookie: `httpOnly`, `sameSite=lax`, `secure` (prod), `maxAge` 8 jam.
- Semua input divalidasi Zod; semua query lewat Prisma (anti SQL injection).
- Upload: whitelist MIME (`image/jpeg|png|webp|avif`), maks 5MB, nama file di-generate.
- `helmet` untuk header; CORS hanya origin yang diizinkan.
- Secret di `.env` (tidak pernah di-commit); `.env.example` disediakan.
- Endpoint publik diberi rate limit ringan agar tidak jadi sasaran spam lead.

---

## 12. Rencana integrasi frontend

1. `app/lib/api.ts` — klien fetch dengan `baseUrl` dari env.
2. Halaman publik: ganti `import { projects } from "@/lib/data"` menjadi pengambilan data server-side (Server Component) dengan cache tag.
3. `lib/data.js` **dipertahankan** sebagai seed/fallback, bukan dihapus.
4. `services.icon` (komponen React) → `iconRegistry[service.icon]` (string → komponen).
5. `SecurityGate` → halaman `/login` (username + password); `/admin-portal` hanya bisa diakses dengan sesi.
6. `CompanySettings` bagian "Ganti PIN" → "Ganti Password".
7. Setelah mutasi admin: panggil revalidasi agar halaman publik ter-update.
8. Perbaiki slug logo `.png` → pakai `logo_url` dari DB apa adanya.
9. `next.config.ts`: tambah `images.remotePatterns` untuk domain Cloudinary.

---

## 13. Deployment

- **Ditunda.** Paket Hostinger belum diketahui client. Pengembangan dilakukan di `localhost`; penyesuaian deploy dilakukan setelah client menjawab.
- Jika ternyata **shared hosting**: PostgreSQL tidak tersedia (hanya MySQL) → perlu VPS atau Postgres terkelola.
- Jika **VPS**: semua kebutuhan terpenuhi (Node, PostgreSQL, Nginx, PM2).
- Kebutuhan minimum: Node.js 22, PostgreSQL 15+, Nginx, PM2 (atau systemd), sertifikat TLS.
- Env backend: `DATABASE_URL`, `SESSION_SECRET`, `PORT`, `NODE_ENV`, `CORS_ORIGIN`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `REVALIDATE_URL`, `REVALIDATE_SECRET`.
- Env frontend: `NEXT_PUBLIC_API_BASE_URL` (atau path relatif `/api`), `REVALIDATE_SECRET`.
- Deploy adalah tanggung jawab client; kita menyediakan panduan + `.env.example`.

---

## 14. Risiko & mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Hostinger shared hosting tidak mendukung PostgreSQL | Backend tidak bisa deploy | Konfirmasi paket; siapkan opsi VPS atau managed Postgres |
| Frontend & backend beda domain | Cookie/CORS rumit | Rekomendasikan satu domain + reverse proxy |
| Halaman statis tidak ter-update setelah admin edit | Admin terasa "tidak bekerja" | Webhook revalidasi + uji end-to-end |
| `cacheComponents` Next 16 masih eksperimental | Perilaku cache berubah antar versi | Verifikasi ke dokumentasi Next 16 saat implementasi |
| Cloudinary free tier terlampaui | Upload gagal | Batas 5MB + kompresi + monitoring kuota; adapter siap diganti |
| Alfin mengubah `data.js` saat integrasi berjalan | Konflik merge | Branch terpisah + kontrak API tertulis di PRD ini |
| Kredensial admin bocor | Konten bisa diubah pihak lain | Password kuat, rate limit, ganti default sebelum produksi |

---

## 15. Keputusan dari client

| Topik | Keputusan | Tanggal |
|---|---|---|
| Modal RFQ yang tidak bisa dibuka | **Bukan masalah.** Client/pengunjung memang langsung menghubungi via WhatsApp. Backend RFQ tidak dibangun; WhatsApp tetap kanal utama. | 2 Nov 2026 |
| Isolasi data admin → publik | **Disetujui untuk diperbaiki** (inti pekerjaan backend). | 2 Nov 2026 |
| Gambar/logo klien rusak | **Dibuat fungsi upload** agar foto bisa diunggah ulang kapan saja. | 2 Nov 2026 |
| Auth | PIN dihapus, diganti **form login username + password di dalam `/admin-portal`** — tanpa halaman register, tanpa rute `/login` terpisah. Satu akun admin via **seeder**: `admin-airindo` / `airindo123123`. | 2 Nov 2026 |
| Database | **Wajib PostgreSQL**, lokal dulu. Deploy = urusan client. | 2 Nov 2026 |
| Backend | **Node.js + Express + TypeScript**, arsitektur **Modular Monolith**. | 2 Nov 2026 |
| Git | `master` / `development` / `backend-zacky`. Area kerja backend di `backend-zacky`. | 2 Nov 2026 |
| Storage gambar | **Cloudinary** (dipilih, bukan MinIO). | 2 Nov 2026 |
| Layanan | **Cukup edit 4 pilar** yang ada — tidak perlu tambah/hapus. Scope usaha client hanya 4 pilar. | 2 Nov 2026 |
| Hosting | **Ditunda.** Paket Hostinger belum diketahui; kerjakan di localhost dulu, sesuaikan setelah client menjawab. | 2 Nov 2026 |
| PostgreSQL lokal | **Podman container** (user memakai Podman CLI, bukan Docker). | 2 Nov 2026 |

## 15b. Pertanyaan yang masih terbuka

1. **Mekanisme auth:** session cookie (rekomendasi) atau JWT? — *belum dijawab; sementara jalan dengan rekomendasi.*
2. **Lead:** tetap disimpan ke DB, atau murni WhatsApp tanpa penyimpanan?
3. **Section Estimator** yang tidak pernah dirender: dihapus atau dibiarkan?
4. **Cakupan upload:** proyek, logo klien, gambar layanan — apakah hero slideshow & logo perusahaan juga?
5. **FAQ/Workshop/Highlights** masuk v1 atau v1.1?

---

## 16. Glosarium

| Istilah | Arti |
|---|---|
| Modular Monolith | Satu aplikasi deploy, kode dipisah per modul bisnis dengan batas jelas |
| ISR | Incremental Static Regeneration — halaman statis yang diperbarui berkala/on-demand |
| Revalidasi | Proses memaksa halaman statis mengambil data terbaru |
| BFF | Backend-for-Frontend — lapisan tipis di sisi frontend sebagai perantara API |
| First-party cookie | Cookie yang dikirim ke domain yang sama dengan halaman |
| Seeder | Skrip pengisi data awal (di sini: akun admin) |
| `text[]` | Tipe array bawaan PostgreSQL |
