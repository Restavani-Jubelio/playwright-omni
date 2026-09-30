const {
  test,
  expect
} = require('../../fixtures/test-fixtures');

const allure =
  require('allure-js-commons');

const {
  getTextCustom
} = require('../../utils/element-helper');


test.describe(
  'Warehouse - Picking',
  () => {

    test(
      '@smoke user can access Picking page without login',
      async ({ page, logger }) => {


        await allure.step(
          'Open Picking Page',
          async () => {

            logger.info(
              'Open Jubelio Warehouse Picking page'
            );


            await page.goto(
              '/warehouse/orders/picking'
            );

          }
        );


        await allure.step(
          'Validate Picking Page',
          async () => {

            const pageTitle =
              page.locator(
                'xpath=//h4[normalize-space()="Proses Pesanan"]'
              );


            const title =
              await getTextCustom(
                page,
                pageTitle,
                {
                  highlightElement: true,
                  screenshot: false
                }
              );


            expect(title).toBe(
              'Proses Pesanan'
            );


            logger.info(
              'Warehouse Picking page opened successfully'
            );

          }
        );

      }
    );

  }
);