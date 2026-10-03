// Login Jubelio: log in with EMAIL/PASSWORD from .env and save the session for every test.
const { test: setup, expect } = require('@playwright/test');
const fs = require('fs');
const { LoginPage } = require('../../pages/LoginPage');

const AUTH_FILE = '.auth/user.json';

// If EMAIL/PASSWORD are empty, the session saved by `npm run login` is used instead.
setup('login Jubelio', async ({ page }) => {
  const { EMAIL, PASSWORD } = process.env;

  if (!EMAIL || !PASSWORD) {
    expect(fs.existsSync(AUTH_FILE), 'Isi EMAIL & PASSWORD di .env, atau jalankan `npm run login` dulu').toBe(true);
    return;
  }

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(EMAIL, PASSWORD);

  fs.mkdirSync('.auth', { recursive: true });
  await page.context().storageState({ path: AUTH_FILE });
});
