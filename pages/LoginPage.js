const { expect } = require('@playwright/test');
const { click, sendKeys } = require('../utils/element-helper');

/** Halaman login Jubelio */
class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.txtInputEmail = page.locator('#textfield-email');
    this.txtInputPassword = page.locator('#textfield-password');
    this.btnLogin = page.locator('xpath=//form//button[normalize-space()="Login"]');
    // The main menu only shows once the user is logged in
    this.menuGudang = page.getByText('Gudang', { exact: true }).first();
  }

  async open() {
    await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' });
  }

  async login(email, password) {
    await sendKeys(this.txtInputEmail, email);
    await sendKeys(this.txtInputPassword, password);
    await click(this.btnLogin);
    await expect(this.menuGudang).toBeVisible({ timeout: 30000 });
  }
}

module.exports = { LoginPage };
