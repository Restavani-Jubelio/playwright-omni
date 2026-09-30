const fs = require('fs');
const path = require('path');

const PROJECT_ROOT =
  path.resolve(__dirname, '..');


async function screenshotElement(
  locator,
  options = {}
) {

  const {
    fileName = null
  } = options;

  try {

    await locator.scrollIntoViewIfNeeded();

    await locator.page().waitForTimeout(300);


    const screenshotDirectory =
      path.join(
        PROJECT_ROOT,
        'Resources/screenshots'
      );


    if (
      !fs.existsSync(
        screenshotDirectory
      )
    ) {

      fs.mkdirSync(
        screenshotDirectory,
        {
          recursive: true
        }
      );

    }


    const outputFile =
      fileName ||
      `${Date.now()}.png`;


    const filePath =
      path.join(
        screenshotDirectory,
        outputFile
      );


    await locator.screenshot({
      path: filePath,
      type: 'png'
    });


    return filePath;


  } catch (error) {

    console.error(
      '[SCREENSHOT] Failed:',
      error instanceof Error
        ? error.message
        : String(error)
    );

    return null;

  }

}


module.exports = {
  screenshotElement
};