# Changelog

Semua perubahan penting pada proyek ini dicatat di sini.
Format mengikuti [Keep a Changelog](https://keepachangelog.com/id/1.1.0/), versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

**Tujuan file ini:** jejak progres agar sesi bisa dilanjutkan oleh siapa pun — termasuk AI agent lain — tanpa kehilangan konteks. Setiap tugas yang selesai **wajib** menambah satu entri.

Kode kategori: `Added` (fitur baru), `Changed` (perubahan), `Fixed` (perbaikan bug), `Removed` (dihapus), `Security` (keamanan), `Docs` (dokumentasi).

---

## [Unreleased]

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
