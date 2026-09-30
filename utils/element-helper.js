const {
  highlight,
  removeHighlight
} = require('./action-highlighter');

const {
  screenshotElement
} = require('./screenshot-helper');

const {
  ReadAndWriteFile
} = require('./read-write-file');


async function isElementVisible(
  locator,
  timeout = 10000
) {

  try {

    await locator.waitFor({
      state: 'visible',
      timeout
    });

    return true;

  } catch {

    return false;

  }
}


async function getTextCustom(
  page,
  locator,
  options = {}
) {

  const {
    highlightElement = true,
    waitTimeout = 10000,
    screenshot = false
  } = options;

  let text = '';

  try {

    console.log(
      '[GET TEXT] Getting text from element'
    );

    const noDataElement = page.locator(
      'xpath=//*[text()="Belum ada data!"]'
    );

    if (
      await isElementVisible(
        noDataElement,
        1000
      )
    ) {

      console.log(
        '[GET TEXT] No data available: Belum ada data!'
      );

      return '';
    }

    await locator.waitFor({
      state: 'visible',
      timeout: waitTimeout
    });

await locator.evaluate((element) => {
  element.scrollIntoView({
    behavior: 'instant',
    block: 'center',
    inline: 'center'
  });
});

await locator.page().waitForTimeout(500);

    if (
      !await locator.isVisible()
    ) {

      console.log(
        '[GET TEXT] Element is not displayed'
      );

      return '';
    }

    console.log(
      '[GET TEXT] Element is displayed'
    );

    if (highlightElement) {

      await highlight(locator);

    }

    if (screenshot) {

      await screenshotElement(
        locator
      );

    }

    text =
      await locator.textContent();

    text =
      text
        ? text.trim()
        : '';

    if (highlightElement) {

      await removeHighlight(locator);

    }

    return text;

  } catch (error) {

    console.error(
      '[GET TEXT] Error:',
      error instanceof Error
        ? error.message
        : String(error)
    );

    try {

      if (highlightElement) {

        await removeHighlight(locator);

      }

    } catch {}

    return text || '';
  }
}


async function getTextCustomWithSavingData(
  page,
  locator,
  fileName,
  options = {}
) {

  const {
    highlightElement = true,
    waitTimeout = 10000,
    screenshot = false
  } = options;

  let text = '';

  try {

    console.log(
      '[GET TEXT SAVE] Getting text from element'
    );

    const noDataElement = page.locator(
      'xpath=//*[text()="Belum ada data!"]'
    );

    if (
      await isElementVisible(
        noDataElement,
        1000
      )
    ) {

      console.log(
        '[GET TEXT SAVE] No data available: Belum ada data!'
      );

      return '';
    }

    await locator.waitFor({
      state: 'visible',
      timeout: waitTimeout
    });

    await locator.scrollIntoViewIfNeeded();

    if (
      !await locator.isVisible()
    ) {

      console.log(
        '[GET TEXT SAVE] Element is not displayed'
      );

      return '';
    }

    console.log(
      '[GET TEXT SAVE] Element is displayed'
    );

    if (highlightElement) {

      await highlight(locator);

    }

    if (screenshot) {

      await screenshotElement(
        locator
      );

    }

    text =
      await locator.textContent();

    text =
      text
        ? text.trim()
        : '';

    ReadAndWriteFile.writeString(
      fileName,
      text
    );

    if (highlightElement) {

      await removeHighlight(locator);

    }

    return text;

  } catch (error) {

    console.error(
      '[GET TEXT SAVE] Error:',
      error instanceof Error
        ? error.message
        : String(error)
    );

    try {

      if (highlightElement) {

        await removeHighlight(locator);

      }

    } catch {}

    return text || '';
  }
}


async function click(
  locator,
  options = {}
) {

  const {
    highlightElement = true,
    screenshot = false,
    waitTimeout = 10000
  } = options;

  try {

    console.log(
      '[CLICK] Clicking element'
    );

    await locator.waitFor({
      state: 'visible',
      timeout: waitTimeout
    });

    await locator.evaluate((element) => {
      element.scrollIntoView({
        behavior: 'instant',
        block: 'center',
        inline: 'center'
      });
    });

    await locator.page().waitForTimeout(500);

    if (
      !await locator.isVisible()
    ) {

      console.log(
        '[CLICK] Element is not displayed'
      );

      return '';
    }

    if (highlightElement) {
      await highlight(locator);
    }

    if (screenshot) {

      try {

        await screenshotElement(
          locator
        );

      } catch {

        console.warn(
          '[CLICK] Failed to capture screenshot'
        );

      }
    }

    await locator.click({
      timeout: waitTimeout
    });

    if (highlightElement) {
      await removeHighlight(locator);
    }

    return '';

  } catch (error) {

    console.error(
      `[CLICK] Error: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`
    );

    try {

      if (highlightElement) {
        await removeHighlight(locator);
      }

    } catch {}

    return '';
  }
}


async function sendKeys(
  locator,
  value,
  options = {}
) {

  const {
    highlightElement = true,
    screenshot = true,
    waitTimeout = 10000
  } = options;

  try {

    console.log(
      `[SEND KEYS] Typing ${value}`
    );

    await locator.waitFor({
      state: 'visible',
      timeout: waitTimeout
    });

    await locator.scrollIntoViewIfNeeded();

    if (
      !await locator.isVisible()
    ) {

      console.log(
        '[SEND KEYS] Element is not displayed'
      );

      return;
    }

    if (highlightElement) {

      await highlight(locator);

    }

    if (screenshot) {

      await screenshotElement(
        locator
      );

    }

    await locator.fill(value);

    if (highlightElement) {

      await removeHighlight(locator);

    }

  } catch (error) {

    console.error(
      '[SEND KEYS] Error:',
      error instanceof Error
        ? error.message
        : String(error)
    );

    try {

      if (highlightElement) {

        await removeHighlight(locator);

      }

    } catch {}

  }
}


module.exports = {
  isElementVisible,
  getTextCustom,
  getTextCustomWithSavingData,
  click,
  sendKeys
};