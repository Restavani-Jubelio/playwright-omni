const { expect } = require('@playwright/test');
const { click, sendKeys, typeKeys, check } = require('./element-helper');

/** Open a page and give the "Otorisasi Ulang Toko" popup a moment to appear and be closed before filling forms. */
async function open(page, url) {
  // Don't wait for the 'load' event: third-party trackers can keep it pending for a long time
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  const reauth = page.getByRole('dialog').filter({ hasText: 'Otorisasi Ulang Toko' });
  try {
    await reauth.waitFor({ state: 'visible', timeout: 5000 });
    await reauth.waitFor({ state: 'hidden', timeout: 10000 }); // closed by autoDismissPopups
  } catch {
    // popup did not show up
  }
}

/** Auto-close the "Otorisasi Ulang Toko" popup whenever it shows up. */
async function autoDismissPopups(page) {
  const reauth = page.getByRole('dialog').filter({ hasText: 'Otorisasi Ulang Toko' });
  await page.addLocatorHandler(reauth, async (dialog) => {
    await page.keyboard.press('Escape');
    if (await dialog.isVisible()) {
      // X button in the top-right corner
      const box = await dialog.boundingBox();
      if (box) await page.mouse.click(box.x + box.width - 25, box.y + 25);
    }
    await dialog.waitFor({ state: 'hidden', timeout: 5000 });
  });
}

/** Safety net: tests never delete data. If a delete confirmation ever shows up, cancel it. */
async function neverConfirmDelete(page) {
  const confirmDelete = page.getByRole('dialog').filter({ hasText: /Yakin ingin menghapus/i });
  await page.addLocatorHandler(confirmDelete, async (dialog) => {
    await dialog.getByRole('button', { name: 'Batal' }).click();
    throw new Error('A delete confirmation appeared and was cancelled: the test clicked a delete button by mistake');
  });
}

/** Type into a MUI autocomplete and pick the matching option. */
async function pickOption(page, input, text) {
  const option = page.getByRole('option').filter({ hasText: text }).first();
  // Retried in case the dropdown closes (e.g. a popup appeared)
  await expect(async () => {
    await click(input);
    await sendKeys(input, text);
    await expect(option).toBeVisible({ timeout: 5000 });
    await click(option);
  }).toPass({ timeout: 30000 });
}

/** Click a status filter chip, e.g. "Belum Mulai", "Diproses", "Selesai", "Siap Kirim". */
async function filterStatus(page, status) {
  // Chips are tabs, sometimes with a count badge ("Siap Proses 28")
  const name = new RegExp(`^${status}( \\d+)?$`);
  await click(page.getByRole('tab', { name }).or(page.getByRole('button', { name })).first());
}

/** Type into a list's search box and press Enter. */
async function search(searchBox, keyword) {
  await sendKeys(searchBox, keyword);
  await searchBox.press('Enter');
}

/** Table row containing the given text (usually a document number). */
function row(page, text) {
  return page.locator('xpath=//tr | //*[@role="row"]').filter({ hasText: text }).first();
}

/** Tick a row and make sure the "1 Item terpilih" bar shows (the table can re-render after a search). */
async function selectRow(page, text) {
  const r = row(page, text);
  await expect(r).toBeVisible();
  await expect(async () => {
    await check(r.getByRole('checkbox').first());
    await expect(page.getByText(/1 Item terpilih/i).first()).toBeVisible({ timeout: 3000 });
  }).toPass({ timeout: 20000 });
}

/** Count in-flight requests matching a URL pattern (used to wait until the app stops refetching). */
function inflightRequests(page, url) {
  let count = 0;
  page.on('request', (r) => { if (url.test(r.url())) count++; });
  const done = (r) => { if (url.test(r.url())) count--; };
  page.on('requestfinished', done);
  page.on('requestfailed', done);
  return () => Math.max(count, 0);
}

/**
 * Add a product through the "Scan produk" field (exact barcode/SKU lookup).
 * Typed key by key: fill() races with the app's own product requests and can add the wrong item.
 */
async function scanProduct(page, txtScanProduk, sku, pendingProductRequests, summary) {
  await expect.poll(pendingProductRequests, { timeout: 20000 }).toBe(0);
  await typeKeys(txtScanProduk, sku);
  await txtScanProduk.press('Enter');
  await expect(page.getByText(summary)).toBeVisible();
  await expect(page.getByText(sku, { exact: true })).toBeVisible();
}

/**
 * Add a product through "Tambah Baru (Ctrl+i)" -> search -> pick the exact SKU.
 * The picker fires several unfiltered product requests when it opens; if we type before they finish,
 * a late unfiltered response overwrites our search results. So: wait for them, type, wait for our search.
 */
async function pickProduct(page, btnTambahProduk, sku, pendingProductRequests, summary) {
  await click(btnTambahProduk);
  const picker = page.getByRole('tooltip').filter({ has: page.getByRole('textbox') });
  await expect(picker.getByText(/QTY Tersedia|\$|!/).first()).toBeVisible();
  await expect.poll(pendingProductRequests, { timeout: 20000 }).toBe(0);

  const searchResult = page.waitForResponse((r) => r.url().includes(`q=${encodeURIComponent(sku)}&`));
  // The search only reacts to real keystrokes, so type instead of fill()
  await typeKeys(picker.getByRole('textbox'), sku, 50, { click: false }); // already focused when the picker opens
  await searchResult;
  await expect.poll(pendingProductRequests, { timeout: 20000 }).toBe(0);

  await click(picker.getByText(sku, { exact: true }));
  await expect(page.getByText(summary)).toBeVisible();
  await expect(page.getByText(sku, { exact: true })).toBeVisible();
}

/** Click Simpan on a form (retried: the first click can land while a dropdown is still closing) and return the saved id. */
async function saveForm(page, btnSimpan, saveUrl, listHeading) {
  let saved;
  await expect(async () => {
    if (!saved) {
      const response = page.waitForResponse((r) => saveUrl.test(r.url()) && r.request().method() === 'POST', { timeout: 10000 });
      await click(btnSimpan);
      saved = await response;
    }
    await expect(page.getByRole('heading', { name: listHeading })).toBeVisible({ timeout: 10000 });
  }).toPass({ timeout: 40000 });
  const body = await saved.json();
  expect(body.id, `save response of ${saveUrl}`).toBeTruthy();
  return String(body.id);
}

module.exports = {
  open,
  autoDismissPopups,
  neverConfirmDelete,
  pickOption,
  filterStatus,
  search,
  row,
  selectRow,
  inflightRequests,
  scanProduct,
  pickProduct,
  saveForm,
};
