const { test } = require('@playwright/test');

/**
 * Attach a screenshot of the current screen to the report (Allure + Playwright HTML),
 * so passing steps also show what the screen looked like.
 */
async function attachScreenshot(page, name) {
  await test.info().attach(name, {
    body: await page.screenshot({ fullPage: false }),
    contentType: 'image/png',
  });
}
async function pauseForDemo(page, ms = 3000) {
  if (process.env.HIGHLIGHT === '1') await page.waitForTimeout(ms);
}
module.exports = { attachScreenshot, pauseForDemo };
