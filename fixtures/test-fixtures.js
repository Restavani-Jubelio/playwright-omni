// @ts-check

const fs = require('fs');
const path = require('path');

require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});

const base = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { Logger } = require('../utils/logger');

const {
  closeAuthorizationPopup
} = require('../utils/popup-handler');


const PROJECT_ROOT =
  path.resolve(__dirname, '..');


const AUTH_FILE =
  path.join(
    PROJECT_ROOT,
    'Resources/.auth/jubelio.json'
  );


const VIDEO_DIR =
  path.join(
    PROJECT_ROOT,
    'Resources/test-recordings'
  );


/**
 * @typedef {Object} CustomFixtures
 * @property {LoginPage} loginPage
 * @property {Logger} logger
 */

/**
 * @type {import('@playwright/test').TestType<CustomFixtures, {}>}
 */

const test = base.test.extend({

  // AUTHENTIC PAGE
  page: async ({ browser }, use, testInfo) => {

    const authExists =
      fs.existsSync(AUTH_FILE);


    console.log(
      `[ENV] BASE_URL: ${process.env.BASE_URL}`
    );

    console.log(
      `[AUTH] File: ${AUTH_FILE}`
    );

    console.log(
      `[AUTH] Exists: ${authExists}`
    );


    // CREATE VIDEO DIRECTORY

    if (!fs.existsSync(VIDEO_DIR)) {

      fs.mkdirSync(
        VIDEO_DIR,
        {
          recursive: true
        }
      );

    }


    // CREATE CONTEXT

    const context =
      await browser.newContext({

        baseURL:
          process.env.BASE_URL,

        storageState:
          authExists
            ? AUTH_FILE
            : undefined,

        viewport: null,

        recordVideo: {

          dir: VIDEO_DIR,

          size: {
            width: 1920,
            height: 1080
          }

        }

      });


    const page =
      await context.newPage();


    // GLOBAL POPUP AUTHORIZATION

    const originalGoto =
      page.goto.bind(page);


    page.goto = async (...args) => {

      const response =
        await originalGoto(...args);

      await closeAuthorizationPopup(
        page
      );

      return response;

    };


    // LOGIN JIKA SESSION BELUM ADA

    if (!authExists) {

      console.log(
        'Auth file belum ada. Login Jubelio...'
      );


      const loginPage =
        new LoginPage(page);


      await loginPage.open();


      await loginPage.login(
        process.env.USERNAME,
        process.env.PASSWORD
      );


      await loginPage.saveCookiesToFile();


      console.log(
        'Login berhasil. Session disimpan.'
      );

    }


    // USE PAGE

    await use(page);


    // GET VIDEO

    const video =
      page.video();

    let videoPath = null;


    if (video) {

      try {

        videoPath =
          await video.path();

      } catch (error) {

        console.error(
          '[VIDEO] Failed to get video path:',
          error instanceof Error
            ? error.message
            : String(error)
        );

      }

    }


    // CLEANUP

    await context.close();


    // ATTACH VIDEO TO ALLURE

    if (
      videoPath &&
      fs.existsSync(videoPath)
    ) {

      try {

        await testInfo.attach(
          'Full Page Video',
          {
            path: videoPath,
            contentType: 'video/webm'
          }
        );


        console.log(
          `[ALLURE] Video attached: ${videoPath}`
        );

      } catch (error) {

        console.error(
          '[ALLURE] Failed to attach video:',
          error instanceof Error
            ? error.message
            : String(error)
        );

      }

    } else {

      console.log(
        '[VIDEO] Video file tidak ditemukan.'
      );

    }

  },


  // LOGIN PAGE

  loginPage: async ({ page }, use) => {

    await use(
      new LoginPage(page)
    );

  },


  // LOGGER

  logger: async ({}, use) => {

    await use(
      new Logger()
    );

  }

});


module.exports = {
  test,
  expect: base.expect
};