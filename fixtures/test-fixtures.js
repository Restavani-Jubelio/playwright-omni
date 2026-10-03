const base = require('@playwright/test');
const { autoDismissPopups, neverConfirmDelete, inflightRequests } = require('../utils/ui-helper');

/**
 * Same `test` as Playwright's, but every page:
 * - closes the "Otorisasi Ulang Toko" popup automatically
 * - cancels any delete confirmation (tests never delete data)
 *
 * Extra fixture `pendingProductRequests`: number of product-list requests still in flight
 * (see pickProduct in utils/ui-helper.js).
 */
const test = base.test.extend({
  page: async ({ page }, use) => {
    await autoDismissPopups(page);
    await neverConfirmDelete(page);
    await use(page);
  },
  pendingProductRequests: async ({ page }, use) => {
    await use(inflightRequests(page, /inventory\/items/));
  },
});

module.exports = { test, expect: base.expect };
