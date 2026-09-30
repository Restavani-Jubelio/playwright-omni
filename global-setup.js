const { chromium } = require('@playwright/test');
const { environment } = require('./config/environment');
const { authFilePath } = require('./utils/auth');

module.exports = async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(environment.baseUrl);
  await page.locator('[data-test="username"]').fill(environment.username);
  await page.locator('[data-test="password"]').fill(environment.password);
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('https://v2.jubelio.com/shared/notification');

  await page.context().storageState({ path: authFilePath() });
  await browser.close();
};