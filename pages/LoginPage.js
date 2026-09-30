const {
  highlight,
  removeHighlight
} = require('../utils/action-highlighter');

const {
  saveCookiesToFile
} = require('../utils/cookie-helper');


class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {

    this.page = page;

    this.usernameInput =
      page.locator('#textfield-email');

    this.passwordInput =
      page.locator('#textfield-password');

    this.loginButton =
      page.locator("xpath=/html/body/div[1]/div/div/div[2]/div/div/div/div/div/div/div[2]/div/div[2]/div[2]/form/div[4]/button");
  }


  async open() {

    await this.page.goto('/');
  }


  async login(
    username,
    password
  ) {

    await highlight(
      this.usernameInput
    );

    await this.usernameInput.fill(
      username
    );

    await removeHighlight(
      this.usernameInput
    );

    await highlight(
      this.passwordInput
    );

    await this.passwordInput.fill(
      password
    );

    await removeHighlight(
      this.passwordInput
    );


    await highlight(
      this.loginButton
    );

    await this.loginButton.click();

    await removeHighlight(
      this.loginButton
    );


    await this.page.waitForTimeout(
      5000
    );

  }


  async saveCookiesToFile() {

    await saveCookiesToFile(
      this.page
    );

    return this;
  }

}


module.exports = {
  LoginPage
};