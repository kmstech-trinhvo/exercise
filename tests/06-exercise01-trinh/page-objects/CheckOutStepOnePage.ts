import { Page, Locator } from '@playwright/test';

export class CheckoutStepOnePage {
  private page: Page;
  private txtFirstName: Locator;
  private txtLastName: Locator;
  private txtZip: Locator;
  private btnContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtFirstName = page.locator("//input[@data-test='firstName']");
    this.txtLastName = page.locator("//input[@data-test='lastName']");
    this.txtZip = page.locator("//input[@data-test='postalCode']");
    this.btnContinue = page.locator("//input[contains(@class,'submit-button btn')]")
  }

  async fillDetails(firstName: string, lastName: string, zip: string) {
    await this.txtFirstName.fill(firstName);
    await this.txtLastName.fill(lastName);
    await this.txtZip.fill(zip);
    await this.btnContinue.click();
  }
}
