const fs = require('fs');
const path = require('path');

const PROJECT_ROOT =
  path.resolve(__dirname, '..');

const COOKIE_FILE_PATH =
  path.join(
    PROJECT_ROOT,
    'Resources/.auth/jubelio.json'
  );

async function saveCookiesToFile(page) {
  try {
    const filePath = COOKIE_FILE_PATH;
    const parentDir = path.dirname(filePath);

    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    await page.context().storageState({
      path: filePath
    });

    console.log(`Cookies saved to: ${filePath}`);

  } catch (error) {
    console.error('Failed to save cookies:', error);
    throw error;
  }
}

module.exports = {
  saveCookiesToFile
};