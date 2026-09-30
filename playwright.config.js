const {
  defineConfig
} = require('@playwright/test');

require('dotenv').config();


module.exports = defineConfig({

  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 7 * 1000
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers:
    process.env.CI
      ? 2
      : undefined,


  reporter: [

    ['list'],

    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never'
      }
    ],

    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: false
      }
    ]

  ],


  use: {

    testIdAttribute:
      'data-testid',

    baseURL:
      process.env.BASE_URL,

    headless:
      process.env.HEADLESS !== 'false',

    launchOptions: {

      args: [
        '--start-maximized'
      ]

    },

    screenshot:
      'only-on-failure',

    trace:
      'retain-on-failure',

    actionTimeout:
      10 * 1000

  },


  projects: [

    {
      name: 'chromium',

      use: {}

    }

  ]

});