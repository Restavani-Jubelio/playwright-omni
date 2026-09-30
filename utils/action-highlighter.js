const HIGHLIGHT_STYLE = {
  outline: '3px dashed red',
  outlineOffset: '2px',
  transition: 'outline 0.1s ease'
};

async function highlight(locator) {
  try {
    await locator.evaluate((element, style) => {
      element.dataset.playwrightOriginalOutline =
        element.style.outline || '';

      element.dataset.playwrightOriginalOutlineOffset =
        element.style.outlineOffset || '';

      Object.assign(element.style, style);
    }, HIGHLIGHT_STYLE);
    await locator.page().waitForTimeout(150);

  } catch (error) {
    console.warn('[HIGHLIGHT] Unable to highlight element');
  }
}

async function removeHighlight(locator) {
  try {
    await locator.evaluate((element) => {
      element.style.outline =
        element.dataset.playwrightOriginalOutline || '';

      element.style.outlineOffset =
        element.dataset.playwrightOriginalOutlineOffset || '';

      delete element.dataset.playwrightOriginalOutline;
      delete element.dataset.playwrightOriginalOutlineOffset;
    });
  } catch (error) {
    // Ignore highlight cleanup errors
  }
}

module.exports = {
  highlight,
  removeHighlight
};