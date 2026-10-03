// Draws a red dashed outline around the element the test is about to use, so a headed run is easy to follow.
// Only active with HIGHLIGHT=1 (e.g. `npm run test:demo`); normal runs skip it to stay fast.

const HIGHLIGHT_ENABLED = process.env.HIGHLIGHT === '1';

const HIGHLIGHT_STYLE = {
  outline: '3px dashed red',
  outlineOffset: '2px',
  transition: 'outline 0.1s ease',
};

async function highlight(locator) {
  if (!HIGHLIGHT_ENABLED) return;
  try {
    await locator.evaluate((element, style) => {
      element.dataset.playwrightOriginalOutline = element.style.outline || '';
      element.dataset.playwrightOriginalOutlineOffset = element.style.outlineOffset || '';
      Object.assign(element.style, style);
    }, HIGHLIGHT_STYLE, { timeout: 5000 });
    await locator.page().waitForTimeout(300);
  } catch {
    // Highlighting is cosmetic: never fail a test because of it
  }
}

async function removeHighlight(locator) {
  if (!HIGHLIGHT_ENABLED) return;
  try {
    await locator.evaluate((element) => {
      element.style.outline = element.dataset.playwrightOriginalOutline || '';
      element.style.outlineOffset = element.dataset.playwrightOriginalOutlineOffset || '';
      delete element.dataset.playwrightOriginalOutline;
      delete element.dataset.playwrightOriginalOutlineOffset;
    }, undefined, { timeout: 1000 });
  } catch {
    // The element may be gone after the action (e.g. a dialog closed)
  }
}

module.exports = { highlight, removeHighlight };
