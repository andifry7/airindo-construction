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

**Fase aktif:** F0 — Fondasi repo & dokumen
**Branch aktif:** `development`
**Terakhir diperbarui:** 2 November 2026
**Catatan:** PostgreSQL lokal **siap** (`airindo-postgres`, PG 16.15, port 5432). Belum ada kode backend. Frontend berjalan (`npm run dev`, build sukses).

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

- [ ] Ubah `SecurityGate.jsx` menjadi form login: field **username** + **password**, tombol "Masuk", state loading & error
- [ ] Pertahankan gaya visual yang ada (kartu putih, latar gradien navy, ikon kunci)
- [ ] `/admin-portal` menampilkan form login bila belum ada sesi; menampilkan panel bila sesi valid
- [ ] State auth dari API (`/auth/me`), bukan state React semata
- [ ] `CompanySettings`: bagian "Ganti PIN" → "Ganti Password" (current + new + confirm)
- [ ] Hapus `localStorage` key `airindo_admin_pin` beserta seluruh logikanya
- [ ] Uji: login benar → panel; login salah → pesan error; logout → kembali ke form

**DoD:** tidak ada lagi referensi PIN di kode; login berfungsi terhadap backend; build & lint bersih.
**Catatan:** fase ini butuh endpoint auth dari Fase 3, jadi UI dibuat lebih dulu dengan mock, lalu disambungkan.

---

## Fase 2 — Backend: scaffold

**Branch:** `backend-zacky`

- [ ] `backend/` dengan `package.json`, `tsconfig.json` (strict), `.env.example`, `.gitignore`
- [ ] Dependensi: express, @prisma/client, prisma, zod, bcrypt, express-session, connect-pg-simple, helmet, cors, express-rate-limit, multer, cloudinary, pino, tsx, typescript
- [ ] Struktur `src/modules` + `src/shared` + `src/config`
- [ ] `app.ts` (middleware global) & `server.ts` (bootstrap + graceful shutdown)
- [ ] Error handler terpusat + `AppError` class + format respons seragam
- [ ] `GET /health` (cek DB)
- [ ] Skrip: `dev`, `build`, `start`, `db:migrate`, `db:seed`, `lint`

**DoD:** `npm run dev` jalan, `/health` balas 200, `tsc --noEmit` bersih.

---

## Fase 3 — Auth + seeder

**Branch:** `backend-zacky`

- [ ] Skema Prisma: `admin_users` (termasuk kolom `token_version`)
- [ ] Migrasi pertama
- [ ] `seed.ts`: buat admin `admin-airindo` / `airindo123123` (bcrypt), idempoten
- [ ] Modul `auth`: login (terbitkan JWT **24 jam** di cookie httpOnly), logout (hapus cookie), me, ganti password (naikkan `token_version`)
- [ ] Middleware `requireAuth` (verifikasi JWT + cek `token_version`)
- [ ] Rate limit login (5 / 15 menit)
- [ ] Uji manual: login → cookie ter-set → `/auth/me` → ganti password → token lama ditolak → logout

**DoD:** seeder menghasilkan 1 admin; endpoint auth lulus uji; tidak ada password di respons.

---

## Fase 4 — Modul konten + media

**Branch:** `backend-zacky`

- [ ] Skema Prisma: `projects`, `services`, `clients`, `company_profile`, `company_stats`, `media`, `faqs`, `workshops`, `highlights`, `about_values`, `cta_points`
- [ ] Seed konten awal dari `app/lib/data.js` (agar data tidak hilang saat migrasi)
- [ ] Modul `projects`: CRUD + toggle featured + filter publik
- [ ] Modul `services`: CRUD (icon sebagai string)
- [ ] Modul `clients`: CRUD (pakai `id`, bukan index)
- [ ] Modul `company`: GET/PUT profil + statistik
- [ ] Modul `media`: upload ke Cloudinary (multer memory, maks 5MB, whitelist MIME), hapus — **dipakai hanya untuk gambar proyek & logo klien**
- [ ] Endpoint `public/bootstrap` untuk beranda
- [ ] Endpoint `admin/dashboard` + `admin/export`

**DoD:** semua endpoint teruji (curl/REST client), upload menghasilkan URL Cloudinary yang bisa dibuka.

---

## Fase 5 — Integrasi frontend ke API

**Branch:** `development`

- [ ] `app/lib/api.ts` + tipe data bersama
- [ ] `next.config.ts`: `images.remotePatterns` untuk Cloudinary
- [ ] Ganti sumber data halaman publik (beranda, tentang, layanan, proyek, kontak) ke API
- [ ] `iconRegistry` untuk `services.icon`
- [ ] Sambungkan form login ke `/auth/login`
- [ ] Sambungkan CRUD admin ke endpoint admin
- [ ] Hapus penulisan `localStorage` untuk konten
- [ ] Revalidasi: endpoint `/api/revalidate` + pemanggilan setelah mutasi
- [ ] Perbaiki bug lama: logo klien `.png` → `logo_url`, `featured` dipakai di beranda

**DoD:** ubah proyek di admin → muncul di `/proyek` setelah revalidasi; gambar tampil dari Cloudinary.

---

## Fase 6 — Konten pendukung (FAQ, Workshop, Highlights)

**Branch:** `backend-zacky`
**Catatan:** lead/RFQ **tidak dibuat** — murni WhatsApp sesuai keputusan client.

- [ ] Modul `content` menangani 5 daftar sederhana: `faqs`, `workshops`, `highlights`, `about-values`, `cta-points`
- [ ] Endpoint publik `GET /public/content/:type` + admin `GET/PUT /admin/content/:type`
- [ ] Seed dari `app/lib/data.js`
- [ ] UI admin: 3 layar sederhana (FAQ, Workshop, Highlights) — pola serupa `ServicesManager`

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
| 2 Nov 2026 | F0 | Dokumen konteks + branch dibuat |
