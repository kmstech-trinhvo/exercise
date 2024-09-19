import { Page, Locator } from '@playwright/test';

export class CartPage {
  private page: Page;
  private btnCheckout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnCheckout = page.locator("//button[@data-test='checkout']");
  }

  async proceedToCheckout() {
    await this.btnCheckout.click();
  }

  getProductByName(productName: string): Locator {
    return this.page.locator(`div[data-test="inventory-item-name"]:text("${productName}")`);
  }
}
