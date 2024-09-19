import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private lblProducts: Locator;
  private btnCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lblProducts = page.locator(".inventory_item_description");
    this.btnCart = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productName: string) {
    const count = await this.lblProducts.count();
    for (let i = 0; i < count; ++i) {
      // Use XPath to locate the product name
      const productNameLocator = this.lblProducts.nth(i).locator(".inventory_item_name");
      const textContent = await productNameLocator.textContent();
      
      if (textContent === productName) {
        // Locate and click the Add to Cart button
        const addToCartButton = this.lblProducts.nth(i).locator(".btn.btn_primary");
        await addToCartButton.click();
        break;
      }
    }
  }

  async openCart() {
    await this.btnCart.click();
  }
}
