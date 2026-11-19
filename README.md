# SAMARA M0

Landing page statis untuk venue SAMARA di Cibogo, Cianjur. Konten, tarif, dan pemilihan aset mengacu pada [brief v1.2](SAMARA_Landing_Page_M0_v1.2_Full_Corrected_Brief.md) dan [manifest foto](SAMARA_M0_v1.2_Corrected_Assets/asset_manifest.csv).

## Jalankan lokal

Gunakan Node.js 22.23.4 atau lebih baru.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Hasil build ada di `dist/`. Semua CTA menggunakan nomor resmi 0813-2217-2075. Form menyusun pesan di browser dan membuka WhatsApp tanpa mengirim isian ke server situs.

## Aset v1.2

Paket `SAMARA_M0_v1.2_Corrected_Assets/` menyimpan 14 file ZIP terbaru dan 8 foto pendamping dalam format master. Situs mengimpor WebP dari `web_zip_14/`. Astro membuat varian `srcset` dengan rasio sumber. Pemotongan bingkai terjadi lewat CSS, dan lightbox membuka WebP utuh.

Hero desktop dan ponsel memakai `Vine-Covered Garden Event Seating.webp`. Pilihan **Semua Foto** menampilkan ke-13 WebP dari ZIP terbaru. Foto pendamping, foto ruang keluarga, dan poster lama tersimpan di paket aset. Header dan favicon menggunakan turunan dari logo resmi dalam folder `branding/`. Open Graph memakai `Bright White House with Golden Trim.webp` dengan logo.

## Pengaturan publikasi

Salin `.env.example` ke `.env` atau atur variabel berikut di lingkungan build.

| Variabel | Isi |
| --- | --- |
| `SITE_URL` | URL publik halaman. Mengaktifkan canonical, URL Open Graph absolut, dan entri home di sitemap. Build tanpa nilai ini memakai `noindex`. |
| `SAMARA_MAPS_URL` | Opsional, untuk mengganti [pin Google Maps SAMARA](https://maps.app.goo.gl/pRW6bfU7FuKyu4Lj7) yang dipakai di bagian Lokasi dan footer. |

Pemilik mengonfirmasi bahwa foto yang tampil mendokumentasikan kondisi venue dan penataan acara di SAMARA. Sebelum publikasi, konfirmasi izin untuk materi dekorasi yang menampilkan nama, turunan logo header dan favicon, serta detail operasional dalam brief. Integrasi GA4 dan Meta Pixel menunggu konfigurasi akun.
