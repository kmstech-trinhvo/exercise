import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  private page: Page;
  private completionMessageLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completionMessageLocator = page.locator('.complete-header');
  }

  async getCompletionMessage(): Promise<string | null> {
    // Wait for the completion message element to be visible
    await this.completionMessageLocator.waitFor({ state: 'visible', timeout: 60000 });
    return this.completionMessageLocator.textContent();
  }
}
