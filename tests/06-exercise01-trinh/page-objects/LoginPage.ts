import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private txtUserName: Locator;
  private txtPassword: Locator;
  private btnLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtUserName = page.locator("input[data-test='username']");
    this.txtPassword = page.locator("input[type='password']");
    this.btnLogin = page.locator("input[type='submit']");
  }

  async goToLoginPage(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle'); // Ensure page is fully loaded
  }

  async login(username: string, password: string) {
    await this.txtUserName.fill(username);
    await this.txtPassword.fill(password);
    await this.btnLogin.click();
    await this.page.waitForLoadState('networkidle');
  }
}
