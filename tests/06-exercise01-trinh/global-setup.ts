import { Browser, chromium, Page } from '@playwright/test';

async function globalSetup() {
  console.log("Performing global setup...");

  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("[type='submit']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({ path: './auth.json' });

  await browser.close();
}

export default globalSetup;
