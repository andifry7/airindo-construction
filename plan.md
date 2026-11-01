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
**Catatan:** belum ada kode backend. Frontend berjalan (`npm run dev`, build sukses).

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
- [ ] Siapkan PostgreSQL lokal
- [ ] Siapkan akun Cloudinary + kredensial

**DoD:** dua branch ada di origin, dokumen terbaca, PostgreSQL bisa diakses dari mesin lokal.

---

## Fase 1 — Frontend: halaman login

**Branch:** `development`
**Tujuan:** mengganti PIN gate dengan login username + password, tanpa halaman register.

- [ ] Buat halaman `/login` bergaya konsisten dengan situs (kartu putih, latar gradien navy)
- [ ] Form: username + password, tombol "Masuk", state loading & error
- [ ] Hapus/retire `SecurityGate.jsx` (atau ubah jadi form login)
- [ ] Proteksi `/admin-portal` — redirect ke `/login` bila belum ada sesi
- [ ] Simpan state auth lewat API (`/auth/me`), bukan state React semata
- [ ] `CompanySettings`: bagian "Ganti PIN" → "Ganti Password"
- [ ] Hapus `localStorage` key `airindo_admin_pin` beserta logikanya
- [ ] Uji: login benar → masuk; login salah → pesan error; logout → kembali ke `/login`

**DoD:** tidak ada lagi referensi PIN di kode; login berfungsi terhadap backend; build & lint bersih.
**Catatan:** fase ini butuh endpoint auth dari Fase 3, jadi UI bisa dibuat lebih dulu dengan mock, lalu disambungkan.

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

- [ ] Skema Prisma: `admin_users`, `session`
- [ ] Migrasi pertama
- [ ] `seed.ts`: buat admin `admin-airindo` / `airindo123123` (bcrypt), idempoten
- [ ] Modul `auth`: login, logout, me, ganti password
- [ ] Middleware `requireAuth`
- [ ] Rate limit login (5 / 15 menit)
- [ ] Uji manual: login → cookie ter-set → `/auth/me` → logout

**DoD:** seeder menghasilkan 1 admin; endpoint auth lulus uji; tidak ada password di respons.

---

## Fase 4 — Modul konten + media

**Branch:** `backend-zacky`

- [ ] Skema Prisma: `projects`, `services`, `clients`, `company_profile`, `company_stats`, `media`
- [ ] Seed konten awal dari `app/lib/data.js` (agar data tidak hilang saat migrasi)
- [ ] Modul `projects`: CRUD + toggle featured + filter publik
- [ ] Modul `services`: CRUD (icon sebagai string)
- [ ] Modul `clients`: CRUD (pakai `id`, bukan index)
- [ ] Modul `company`: GET/PUT profil + statistik
- [ ] Modul `media`: upload ke Cloudinary (multer memory, maks 5MB, whitelist MIME), hapus
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

## Fase 6 — Lead (opsional)

**Branch:** `backend-zacky`

- [ ] Skema `leads` + modul + rate limit
- [ ] Sambungkan form kontak (dan RFQ bila dipertahankan)
- [ ] Halaman daftar lead di admin (bila diminta)

**DoD:** submit form tersimpan di DB dan terlihat di admin.

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
