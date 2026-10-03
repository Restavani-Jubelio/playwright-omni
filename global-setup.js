const fs = require('fs');

/**
 * Runs once before every test run (npm test, npx playwright test, UI mode):
 * clears the previous Allure results so the report only shows the latest run.
 */
module.exports = async () => {
  fs.rmSync('allure-results', { recursive: true, force: true });
};
