class InventoryPage {
  /**
 * @param {import('@playwright/test').Page} page
 */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.backpackAddButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.btncart = page .getByTestId('shopping-cart-link')
  }

  async addBackpackToCart() {
    await this.backpackAddButton.click();
  }

  async getCartCount() {
    return this.cartBadge.textContent();
  }

  async movetoCart() {
    return this.btncart.click();
  }
}

module.exports = { InventoryPage };