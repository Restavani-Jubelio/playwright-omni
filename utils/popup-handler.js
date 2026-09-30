const {
  highlight,
  removeHighlight
} = require('./action-highlighter');

const {
  screenshotElement
} = require('./screenshot-helper');

const allure =
  require('allure-js-commons');


async function closeAuthorizationPopup(
  page
) {

  const closeButton =
    page.locator(
      'xpath=//div[@class="d-flex p-3 flex-row align-item-center justify-content-end"]//*[name()="svg"]'
    );


  try {

    await page.waitForTimeout(1000);


    if (
      await closeButton
        .isVisible()
        .catch(() => false)
    ) {

      await allure.step(
        'Close Authorization Popup',
        async () => {

          await highlight(
            closeButton
          );


          const screenshotPath =
            await screenshotElement(
              closeButton,
              {
                fileName:
                  `authorization-popup-${Date.now()}.png`
              }
            );


          if (screenshotPath) {

            await allure.attachmentPath(
              'Authorization Popup',
              screenshotPath,
              {
                contentType: 'image/png',
                fileExtension: 'png'
              }
            );

          }


          await closeButton.click();


          await removeHighlight(
            closeButton
          );


          await page.waitForTimeout(
            500
          );


          await page.keyboard.press(
            'Escape'
          );


          await page.mouse.click(
            10,
            10
          );

        }
      );

    }

  } catch {}

}


module.exports = {
  closeAuthorizationPopup
};