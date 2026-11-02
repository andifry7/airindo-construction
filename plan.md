# PLAN — Airindo Construction

**Tujuan dokumen:** menjaga progres tetap konsisten dan mudah dilanjutkan siapa pun (termasuk AI agent lain) bila sesi terputus.
**Sumber kebenaran konteks & keputusan:** [`prd.md`](./prd.md)
**Riwayat perubahan:** [`changelog.md`](./changelog.md)

---

## Cara memakai dokumen ini

1. Baca `prd.md` lebih dulu (konteks & keputusan), lalu `plan.md` (posisi pekerjaan).
2. Satu fase = satu rangkaian commit. Jangan lompat fase tanpa mencatat alasannya.
3. Setiap task selesai: centang `[x]`, tulis 1 baris di `changelog.md`, lalu commit.
4. Jika ada keputusan baru yang mengubah arah, perbarui `prd.md` **dan** catat di `changelog.md`.
5. Jika sesi terputus: baca bagian **Posisi Saat Ini** di bawah, lalu lanjutkan dari fase yang `[ ]` pertama.

## Legenda

- `[ ]` belum dikerjakan
- `[~]` sedang dikerjakan
- `[x]` selesai & terverifikasi
- `[!]` terblokir (tulis alasannya)

---

## Posisi saat ini

**Fase aktif:** Fase 7 — Hardening & QA
**Branch aktif:** `development`
**Terakhir diperbarui:** 2 November 2026
**Catatan:** Fase 0–6 **selesai**. Publik & admin sepenuhnya berbasis database, upload Cloudinary, revalidasi otomatis, konten pendukung bisa diedit dari panel. Sisa: Fase 7 (hardening & QA) lalu Fase 8 (persiapan deploy).

---

## Aturan branch & commit

| Branch | Fungsi |
|---|---|
| `master` | Produksi / stabil. Hanya menerima merge dari `development` |
| `development` | Integrasi. Pekerjaan frontend (Alfin & Zacky) |
| `backend-zacky` | Area kerja backend |

**Alur:** `backend-zacky` → `development` → `master`

**Format commit:** Conventional Commits
```
feat(backend): tambah modul projects dengan CRUD
fix(frontend): perbaiki slug logo klien .png -> .webp
docs: perbarui prd dan plan
chore: setup eslint backend
```

**Wajib:** commit setiap task selesai, dan catat di `changelog.md`.

---

## Fase 0 — Fondasi repo & dokumen

**Branch:** `development`

- [x] Clone repo frontend ke `D:/project-client/airindo-construction`
- [x] Audit kode + observasi runtime (npm install, dev, build, browser)
- [x] Konfirmasi remote: `https://github.com/andifry7/airindo-construction.git`
- [x] Buat branch `development`
- [x] Buat branch `backend-zacky`
- [x] Tulis `prd.md`
- [x] Tulis `plan.md`
- [x] Tulis `changelog.md`
- [x] Tulis aturan agent di `AGENTS.md`
- [x] Push `development` & `backend-zacky` ke origin
- [x] Siapkan PostgreSQL lokal — **via Podman** (user memakai Podman CLI, bukan Docker)
  - [x] Terdeteksi: `podman 6.1.1`, mesin `podman-machine-default` (WSL), socket `127.0.0.1:61127`
  - [x] VM dinyalakan user (`podman machine start`) → socket aktif
  - [x] `podman run` container `airindo-postgres` (`postgres:16-alpine`), port 5432, volume `airindo_pgdata`
  - [x] Database `airindo_construction` dibuat
  - [x] Verifikasi: **PostgreSQL 16.15**, port 5432 terbuka dari host Windows
  - [ ] Tulis `DATABASE_URL` ke `backend/.env` (saat Fase 2 membuat folder backend)

  Status container saat ini:
  | Item | Nilai |
  |---|---|
  | Nama container | `airindo-postgres` |
  | Image | `postgres:16-alpine` (PostgreSQL 16.15) |
  | User / DB | `airindo` / `airindo_construction` |
  | Port | `5432` → host `5432` |
  | Volume | `airindo_pgdata` |
  | Password dev | lihat catatan privat (tidak di-commit) |

  Perintah harian:

  ```bash
  podman start airindo-postgres     # setelah VM Podman hidup
  podman stop airindo-postgres
  podman logs -f airindo-postgres
  ```

  Perintah acuan pembuatan (password **jangan** ditulis di repo):

  ```bash
  podman run -d --name airindo-postgres \
    -e POSTGRES_USER=airindo \
    -e POSTGRES_PASSWORD=<dev-password> \
    -e POSTGRES_DB=airindo_construction \
    -p 5432:5432 \
    -v airindo_pgdata:/var/lib/postgresql/data \
    docker.io/library/postgres:16-alpine
  ```

  `DATABASE_URL` yang diharapkan:
  `postgresql://airindo:<dev-password>@localhost:5432/airindo_construction?schema=public`

- [ ] Siapkan akun Cloudinary + kredensial (`CLOUD_NAME`, `API_KEY`, `API_SECRET` → simpan di `backend/.env`)

**DoD:** dua branch ada di origin, dokumen terbaca, PostgreSQL bisa diakses dari mesin lokal.

---

## Fase 1 — Frontend: form login di `/admin-portal`

**Branch:** `development`
**Tujuan:** mengganti PIN gate dengan login username + password, **di dalam `/admin-portal`** (tanpa rute `/login` terpisah, tanpa halaman register).

- [x] Ubah `SecurityGate.jsx` menjadi form login: field **username** + **password**, tombol "Masuk", state loading & error
- [x] Pertahankan gaya visual yang ada (kartu putih, latar gradien navy, ikon kunci)
- [x] `/admin-portal` menampilkan form login bila belum ada sesi; menampilkan panel bila sesi valid
- [x] State auth dari API (`/auth/me`), bukan state React semata
- [x] `CompanySettings`: bagian "Ganti PIN" → "Ganti Password" (current + new + confirm)
- [x] Hapus `localStorage` key `airindo_admin_pin` beserta seluruh logikanya
- [x] Uji: login benar → panel; login salah → pesan error; logout → kembali ke form

**DoD:** tidak ada lagi referensi PIN di kode; login berfungsi terhadap backend; build & lint bersih.
**Catatan:** fase ini butuh endpoint auth dari Fase 3, jadi UI dibuat lebih dulu dengan mock, lalu disambungkan.

### Cleanup frontend (sudah dikerjakan, 2 Nov 2026)

- [x] Hapus `app/components/home/ProjectEstimator.jsx` — tidak pernah dirender di halaman mana pun, dan client memilih fokus ke WhatsApp.
  - **Cara memulihkan bila client berubah pikiran:**
    ```bash
    git show 68fab02:app/components/home/ProjectEstimator.jsx > app/components/home/ProjectEstimator.jsx
    ```
- [ ] Putuskan nasib `estimatorData` di `app/lib/data.js` — masih ada, tidak terpakai. Sengaja belum disentuh karena `data.js` dipakai sebagai sumber seed (aturan AGENTS §2.8).

---

## Fase 2 — Backend: scaffold

**Branch:** `backend-zacky`

- [x] `backend/` dengan `package.json`, `tsconfig.json` (strict), `.env.example`, `.gitignore`
- [x] Dependensi: express 5, @prisma/client, prisma, zod, bcryptjs, jsonwebtoken, cookie-parser, helmet, cors, express-rate-limit, pino, pino-http, tsx, typescript
- [x] Struktur `src/modules` + `src/shared` + `src/config`
- [x] `app.ts` (middleware global) & `server.ts` (bootstrap + graceful shutdown)
- [x] Error handler terpusat + `AppError` class + format respons seragam
- [x] `GET /health` (cek DB)
- [x] Skrip: `dev`, `build`, `start`, `typecheck`, `db:generate`, `db:migrate`, `db:seed`, `db:studio`

**DoD:** `npm run dev` jalan, `/health` balas 200, `tsc --noEmit` bersih.

---

## Fase 3 — Auth + seeder

**Branch:** `backend-zacky`

- [x] Skema Prisma: `admin_users` (termasuk kolom `token_version`)
- [x] Migrasi pertama (`20261102104357_init_admin_users`)
- [x] `seed.ts`: buat admin `admin-airindo` / `airindo123123` (bcrypt), idempoten
- [x] Modul `auth`: login (terbitkan JWT **24 jam** di cookie httpOnly), logout (hapus cookie), me, ganti password (naikkan `token_version`)
- [x] Middleware `requireAuth` (verifikasi JWT + cek `token_version`)
- [x] Rate limit login (5 / 15 menit)
- [x] Uji manual: login → cookie ter-set → `/auth/me` → ganti password → token lama ditolak → logout

**DoD:** seeder menghasilkan 1 admin; endpoint auth lulus uji; tidak ada password di respons.

---

## Fase 4 — Modul konten + media

**Branch:** `backend-zacky`

- [x] Skema Prisma: `projects`, `services`, `clients`, `company_profile`, `company_stats`, `media`, `faqs`, `workshops`, `highlights`, `about_values`, `cta_points`
- [x] Seed konten awal dari `app/lib/data.js` (agar data tidak hilang saat migrasi)
- [x] Modul `projects`: CRUD + toggle featured + filter publik
- [x] Modul `services`: edit-only (GET + PATCH, ikon sebagai string) — sesuai keputusan client
- [x] Modul `clients`: CRUD (pakai `id`, bukan index)
- [x] Modul `company`: GET/PUT profil + statistik
- [x] Modul `media`: upload ke Cloudinary (multer memory, maks 5MB, whitelist MIME), hapus — **dipakai hanya untuk gambar proyek & logo klien**
- [x] Endpoint `public/bootstrap` untuk beranda
- [x] Endpoint `admin/dashboard` + `admin/export`

**DoD:** semua endpoint teruji (curl/REST client), upload menghasilkan URL Cloudinary yang bisa dibuka.

---

## Fase 5 — Integrasi frontend ke API

**Branch:** `development`

- [x] `app/lib/api.ts` + tipe data bersama → diimplementasikan sebagai `app/lib/site-content.js` + `ContentProvider`
- [x] `next.config.ts`: `images.remotePatterns` untuk Cloudinary
- [x] Ganti sumber data halaman publik (beranda, tentang, layanan, proyek, kontak) ke API
- [x] `iconRegistry` untuk `services.icon`
- [ ] Sambungkan form login ke `/auth/login` → **dikerjakan di Fase 1**
- [ ] Sambungkan CRUD admin ke endpoint admin → **dikerjakan di Fase 5b**
- [ ] Hapus penulisan `localStorage` untuk konten → **dikerjakan di Fase 5b**
- [x] Revalidasi: endpoint `/api/revalidate` + pemanggilan otomatis setelah mutasi
- [x] Perbaiki bug lama: logo klien memakai `logoUrl` dari DB (bukan slug `.png`), dan `featured` kini benar-benar dipakai beranda

**DoD:** ubah proyek di admin → muncul di `/proyek` setelah revalidasi; gambar tampil dari Cloudinary.

---

## Fase 5b — Sambungkan panel admin ke API

**Branch:** `development`
**Prasyarat:** Fase 1 (form login) selesai.

- [x] `app/lib/admin-api.js` — klien fetch dengan `credentials: "include"` + penanganan 401
- [x] `admin-portal/page.jsx`: hapus seluruh `localStorage`, ambil data dari API
- [x] `ProjectsManager`: create/update/delete/toggle featured → endpoint admin; upload foto → `/admin/media`
- [x] `ClientsManager`: CRUD berbasis `id` (bukan index) + upload logo
- [x] `ServicesManager`: PATCH saja (4 pilar)
- [x] `CompanySettings`: PUT profil + statistik; bagian "Ganti PIN" → "Ganti Password"
- [x] `DashboardOverview`: angka dari `/admin/dashboard`
- [x] Tombol "Cadangkan JSON" → `/admin/export`
- [x] Hapus `SecurityGate` lama, ganti form login (lihat Fase 1)
- [x] `lib/data.js` tidak lagi diimpor oleh komponen publik maupun admin

**DoD:** tidak ada lagi `localStorage` untuk konten; semua CRUD admin menulis ke database dan memicu revalidasi.

---

## Fase 6 — Konten pendukung (FAQ, Workshop, Highlights)

**Branch:** `backend-zacky`
**Catatan:** lead/RFQ **tidak dibuat** — murni WhatsApp sesuai keputusan client.

- [x] Modul `content` menangani 5 daftar sederhana: `faqs`, `workshops`, `highlights`, `about-values`, `cta-points`
- [x] Endpoint publik `GET /public/content/:type` + admin `GET/PUT /admin/content/:type`
- [x] Seed dari `app/lib/data.js`
- [x] UI admin: satu tab "Konten Pendukung" dengan 5 sub-tab (FAQ, Workshop, Highlight, Nilai Perusahaan, Poin CTA)

**DoD:** admin bisa mengubah FAQ/workshop/highlights, dan tampil di halaman publik setelah revalidasi.

---

## Fase 7 — Hardening & QA

- [ ] Validasi Zod di semua endpoint
- [ ] Uji negatif: akses admin tanpa sesi, upload file salah tipe, payload kosong
- [ ] Cek N+1 query & indeks (`slug`, `featured`, `category_key`)
- [ ] `npm run build` frontend + `tsc` backend bersih
- [ ] Lighthouse halaman publik
- [ ] Uji di viewport mobile

**DoD:** tidak ada error konsol, tidak ada endpoint admin yang bisa diakses tanpa sesi.

---

## Fase 8 — Persiapan deploy

- [ ] `.env.example` lengkap (backend & frontend)
- [ ] Panduan deploy Hostinger (Nginx reverse proxy, PM2, TLS, PostgreSQL)
- [ ] Skrip migrasi & seed untuk produksi
- [ ] Backup/restore DB
- [ ] Ganti password default admin sebelum produksi

**DoD:** panduan bisa diikuti dari nol oleh client/teknisi lain.

---

## Definition of Done (berlaku semua fase)

1. Kode lolos `tsc --noEmit` (backend) dan `npm run build` (frontend).
2. Tidak ada secret yang ter-commit.
3. `changelog.md` diperbarui.
4. Perubahan diuji minimal secara manual (disebutkan caranya di changelog).
5. Commit dengan pesan sesuai konvensi.

---

## Log progres

| Tanggal | Fase | Catatan |
|---|---|---|
| 1 Nov 2026 | — | Clone repo, audit kode, observasi runtime |
| 2 Nov 2026 | F0 | Dokumen konteks + branch dibuat; PostgreSQL via Podman siap |
| 2 Nov 2026 | F2 | Scaffold backend Express + TS, error handler, `/health` |
| 2 Nov 2026 | F3 | Auth JWT 24 jam, seeder admin, rate limit — teruji end-to-end |
| 2 Nov 2026 | F4 | 11 tabel konten, seed dari frontend, modul projects/services/clients/company/content/media, upload Cloudinary terverifikasi |
| 2 Nov 2026 | F5 | Halaman publik membaca API via `getSiteContent()` + `ContentProvider`; revalidasi otomatis terbukti di mode produksi |
| 2 Nov 2026 | F1 | PIN dihapus, form login username + password, ganti password via API — teruji |
| 2 Nov 2026 | F5b | Panel admin baca/tulis database, upload Cloudinary, revalidasi otomatis — teruji end-to-end |
| 2 Nov 2026 | F6 | Tab "Konten Pendukung": 5 daftar (FAQ, workshop, highlight, nilai, CTA) bisa diedit dari panel |
