import { Page, Locator, expect } from '@playwright/test';

export class CheckoutStepTwoPage {
  private page: Page;
  private btnFinish: Locator;
  private txtLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnFinish = page.locator("//button[@data-test='finish']");
    this.txtLocator = page.locator("//div[@class='summary_tax_label']/following-sibling::div[1]");

  }

  async getDisplayedTotal(): Promise<number | null> {
    const text = await this.txtLocator.textContent();
    if (text) {
      const match = text.match(/Total: \$(\d+\.\d+)/);
      if (match) {
        return parseFloat(match[1]);
      }
    }
    return null;
  }

  async clickFinish() {
    await this.btnFinish.click();
  }
}
