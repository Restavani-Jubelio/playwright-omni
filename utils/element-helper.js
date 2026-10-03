const { highlight, removeHighlight } = require('./action-highlighter');

// Basic actions with highlighting. Unlike the old helpers, errors are NOT swallowed:
// if an action fails, the test fails at that step.

async function click(locator) {
  await highlight(locator);
  await locator.click();
  await removeHighlight(locator);
}

async function sendKeys(locator, value) {
  await highlight(locator);
  await locator.fill(String(value));
  await removeHighlight(locator);
}

/**
 * Type key by key (for fields that only react to real keystrokes, like scan and search boxes).
 * Pass { click: false } for fields that are already focused (e.g. the product picker's search box).
 */
async function typeKeys(locator, value, delay = 50, { click: clickFirst = true } = {}) {
  await highlight(locator);
  if (clickFirst) await locator.click();
  await locator.pressSequentially(String(value), { delay });
  await removeHighlight(locator);
}

async function check(locator) {
  await highlight(locator);
  await locator.check();
  await removeHighlight(locator);
}

async function getText(locator) {
  await highlight(locator);
  const text = (await locator.innerText()).trim();
  await removeHighlight(locator);
  return text;
}

module.exports = { click, sendKeys, typeKeys, check, getText };
