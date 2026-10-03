const { expect } = require('@playwright/test');
const { click, check, getText } = require('../utils/element-helper');
const { open, pickOption, scanProduct, pickProduct, saveForm, filterStatus, search, selectRow, row } = require('../utils/ui-helper');
const { highlight } = require('../utils/action-highlighter');

/** Penjualan > Transaksi Penjualan > Pesanan */
class SalesOrderPage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {() => number} pendingProductRequests
   */
  constructor(page, pendingProductRequests) {
    this.page = page;
    this.pendingProductRequests = pendingProductRequests;

    // List page
    this.lblTransaksiPenjualan = page.getByRole('heading', { name: 'Transaksi Penjualan' });
    this.btnTambahBaru = page.locator('xpath=//button[normalize-space()="Tambah Baru"]');
    this.txtCariPesanan = page.locator('xpath=//input[@placeholder="Cari Pesanan"]');
   

    // Tambah Pesanan form
    this.lblTambahPesanan = page.getByRole('heading', { name: 'Tambah Pesanan' });
    this.txtInputPelanggan = page.locator('xpath=//input[@placeholder="Pilih Pelanggan"]');
    this.txtInputLokasi = page.locator('xpath=//input[@placeholder="Pilih Lokasi"]');
    this.txtScanProduk = page.locator('xpath=//input[@placeholder="Scan produk"]');
    this.btnTambahProduk = page.locator('xpath=//button[contains(., "Tambah Baru") and contains(., "Ctrl+i")]');
    this.switchSudahLunas = page.locator('xpath=//input[@name="is_paid"]');
    this.txtInputKurir = page.locator('xpath=//input[@placeholder="Pilih Kurir" or @placeholder="Pilih kurir"]');
    this.btnSimpan = page.locator('xpath=//button[normalize-space()="Simpan"]');

    // Detail page heading, e.g. "Pesanan - SO-000006866"
    this.lblDetailPesanan = page.getByRole('heading', { name: /Pesanan - SO-\d+/ });
  }

  async openList() {
    await open(this.page, '/sales/transactions/orders');
    await expect(this.lblTransaksiPenjualan).toBeVisible();
  }

  async startNewOrder() {
    await click(this.btnTambahBaru);
    await expect(this.lblTambahPesanan).toBeVisible();
  }

  async fillHeader(customer, location) {
    await pickOption(this.page, this.txtInputPelanggan, customer);
    await pickOption(this.page, this.txtInputLokasi, location);
  }

  /** First product via "Scan produk", the rest via "Tambah Baru (Ctrl+i)" (as in the recording). */
  async addProducts(skus) {
    const summary = (n) => `Qty Total (${n} Produk)`;
    const [scanned, ...picked] = skus;
    await scanProduct(this.page, this.txtScanProduk, scanned, this.pendingProductRequests, summary(1));
    for (const [i, sku] of picked.entries()) {
      await pickProduct(this.page, this.btnTambahProduk, sku, this.pendingProductRequests, summary(i + 2));
    }
  }

  async setSudahLunas() {
    await check(this.switchSudahLunas);
  }

  /** Set the courier here so shipping doesn't fail later with "no courier". */
  async setCourier(courier) {
    await pickOption(this.page, this.txtInputKurir, courier);
  }

  /** Save and return the order id and the number Jubelio generated ([auto], e.g. SO-000006865). */
  async save() {
    const id = await saveForm(this.page, this.btnSimpan, /core-api\/sales\/orders\/?$/, 'Transaksi Penjualan');
    await open(this.page, `/sales/transactions/orders/detail/${id}`);
    const no = (await getText(this.lblDetailPesanan)).match(/SO-\d+/)[0];
    await this.openList();
    return { id, no };
  }

 /** Siap Proses -> search the order and make sure it shows up (and stays after the list reloads) */
async findInSiapProses(orderNo) {
  await filterStatus(this.page, 'Siap Proses');
  await search(this.txtCariPesanan, orderNo);

  const orderRow = row(this.page, orderNo);
  await expect(orderRow).toBeVisible();
  // The list can reload once more after a search: wait until it is done, then check again
  await this.page.waitForLoadState('networkidle');
  await expect(orderRow).toBeVisible();
  // Red box around the found row in demo mode
  await highlight(orderRow);
}
}

module.exports = { SalesOrderPage };
