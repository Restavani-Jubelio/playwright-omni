# Jubelio E2E (Playwright)

Test otomatis Jubelio: **login** dan **membuat pesanan penjualan** sampai diproses.

| Test | Yang dilakukan & dicek |
|------|------------------------|
| `tests/login/login.setup.js` | Login pakai akun `.env`, sesi disimpan ke `.auth/user.json` untuk dipakai test lain |
| `tests/sales/create-order.spec.js` | Penjualan › Tambah Pesanan: pelanggan, lokasi, Vani1 (*Scan produk*) + Vani2 (tombol *Tambah Baru (Ctrl+i)*), Sudah Lunas, kurir → **Simpan** (No. Pesanan `SO-…` dibuat Jubelio) → tab **Siap Proses** → **Proses Pesanan** |

> ⚠️ Test membuat pesanan **sungguhan** di akun yang dipakai. Gunakan akun testing.

## Setup

Butuh **Node.js** (LTS). Laporan Allure memakai Allure 3, **tanpa Java**.

```bash
npm install
npx playwright install chromium
cp .env.example .env    # isi EMAIL dan PASSWORD
```

| `.env` | Artinya |
|--------|---------|
| `EMAIL`, `PASSWORD` | Akun login Jubelio |
| `CUSTOMER`, `LOCATION`, `PRODUCTS`, `COURIER` | Data pesanan (opsional, default: `BLANJA`, `Vani Room`, `Vani1,Vani2`, `JNE REG`) |

## Menjalankan

```bash
npm test               # login + sales order (browser tidak kelihatan)
npm run test:headed    # browser kelihatan
npm run test:demo      # browser kelihatan + jeda 1 detik tiap aksi + elemen yang dipakai diberi kotak merah
npm run test:sales     # sales order saja (login tetap jalan duluan)
npm run report         # laporan bawaan Playwright (screenshot & video setiap test, trace kalau gagal)
```

## Laporan Allure

Setiap `npm test` / `test:headed` / `test:demo` / `test:sales` menghapus hasil lama, lalu mencatat hasil baru ke `allure-results/`.

```bash
npm run allure:serve      # buat laporan dan langsung buka di browser (Ctrl+C untuk menutup)
npm run allure:generate   # simpan laporan ke folder allure-report/
npm run allure:open       # buka laporan dari allure-report/
```

- Daftar test dikelompokkan **Jubelio › fitur › story** (diatur lewat `allure.epic/feature/story/severity` di awal setiap test dan `groupBy` di `allurerc.mjs`).
- Klik satu test → tab **Overview**: setiap `test.step` beserta screenshot-nya; tab **Attachments**: screenshot setiap step (`attachScreenshot` di `utils/report-helper.js`), screenshot akhir, dan **video** rekaman test.
- Laporan hanya menampilkan step bisnis (`detail: false` di `playwright.config.js`), bukan setiap klik internal.

## Struktur

```
tests/      APA yang dites — urutan langkah bisnis, tanpa locator
pages/      BAGAIMANA berinteraksi dengan halaman — locator di constructor + method per langkah
  LoginPage.js        halaman login
  SalesOrderPage.js   Penjualan › Transaksi Penjualan › Pesanan
utils/
  element-helper.js      aksi dasar: click, sendKeys, typeKeys, check, getText (+ highlight). Kalau gagal → test merah
  ui-helper.js           gabungan aksi: pilih dropdown, cari, centang baris, tambah produk, simpan form, tutup popup
  action-highlighter.js  kotak merah saat test:demo
  env.js                 baca data test dari .env
  report-helper.js       attachScreenshot: tempel screenshot ke laporan
allure-results/  (otomatis) catatan hasil run untuk laporan Allure
allurerc.mjs     pengaturan laporan Allure 3 (nama laporan, pengelompokan)
fixtures/   test-fixtures.js: setiap page otomatis menutup popup "Otorisasi Ulang Toko" dan membatalkan dialog hapus
scripts/    login.mjs: login manual (cadangan kalau tidak mau simpan password di .env)
```

Lapisannya: **test → page → ui-helper → element-helper**. Test hanya memanggil method page; page memakai locator miliknya + helper; helper melakukan aksi ke elemen.

## Locator

Locator memakai **ciri unik** elemen, bukan posisi (full XPath `/html/body/div[2]/...` rusak kalau layout bergeser):

```js
this.txtInputPelanggan = page.locator('xpath=//input[@placeholder="Pilih Pelanggan"]');
this.btnSimpan         = page.locator('xpath=//button[normalize-space()="Simpan"]');
```

Hindari id acak (`mui-1216`), class hasil generate (`css-2l1pj`), dan `nth-child`. Cek locator di Chrome DevTools (tab Elements → Cmd/Ctrl+F), harus **1 of 1**. Untuk mencari locator dengan cepat: `npx playwright codegen https://v2.jubelio.com`.

## Catatan

- Test **menunggu kondisi** (elemen muncul, request selesai), bukan `waitForTimeout`.
- Saat menambah produk lewat *Tambah Baru (Ctrl+i)*, Jubelio mengirim beberapa request daftar produk sekaligus; kalau pencarian diketik terlalu cepat, hasilnya bisa tertimpa. Test menunggu semua request selesai dulu (`pickProduct` di `utils/ui-helper.js`).
- Test tidak pernah menghapus data: kalau dialog hapus muncul, otomatis klik **Batal** dan test gagal.
