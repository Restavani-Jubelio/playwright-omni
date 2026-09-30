const {
  test,
  expect
} = require('../../fixtures/test-fixtures');
const {
  closeAuthorizationPopup
} = require('../../utils/popup-handler');

const {
  LoginPage
} = require('../../pages/LoginPage');


test.describe(
  'Login',
  () => {

    test(
      '@smoke user can login to Jubelio',
      async ({ page }) => {

        const loginPage =
          new LoginPage(page);


        await test.step(
          'Open Login Page',
          async () => {

            await loginPage.open();

          }
        );


        await test.step(
          'Login',
          async () => {

            await loginPage.login(
              process.env.USERNAME,
              process.env.PASSWORD
            );

          }
        );
        await test.step(
  'Close Authorization Popup',
  async () => {

    await closeAuthorizationPopup(page);

  }
);
    await test.step(
          'Save Login Session',
          async () => {

            await loginPage.saveCookiesToFile();

          }
        );
        // await test.step(
        //   'Verify Login Success',
        //   async () => {

        //     await expect(
        //       page
        //     ).toHaveURL(
        //       /v2\.jubelio\.com/
        //     );

        //   }
        // );

      }
    );

  }
);