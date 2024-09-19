import { Browser, chromium, Page, BrowserContext } from '@playwright/test'; // Ensure necessary imports
import { promises as fs } from 'fs';

async function globalTeardown() {
  console.log("Performing global teardown...");

  const browser: Browser = await chromium.launch({ headless: true });
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  try {
    await page.goto("https://www.saucedemo.com/");
    await page.waitForLoadState('networkidle');

    // Verify if user is logged in by checking for a logged-in indicator
    const isLoggedIn = await page.locator("#menu_button_container").isVisible();

    if (isLoggedIn) {
      console.log("User is logged in, performing logout...");

      // Perform logout
      await page.locator("#menu_button_container").click(); // Open menu
      await page.locator("#logout_sidebar_link").click(); // Click logout

      // Wait for logout to complete and ensure login page is visible
      await page.waitForLoadState('networkidle');
      await page.locator("#login-button").waitFor({ state: 'visible' });

      console.log("User logged out successfully.");
    } else {
      console.log("Menu button is not visible. User may not be logged in.");
    }

    // Clear all cookies
    await context.clearCookies();
    console.log("Cleared all cookies.");

    // Clear local storage and session storage
    await page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    console.log("Cleared local storage and session storage.");

    // Ensure auth.json file is cleared of session data
    try {
      const authJsonPath = './auth.json';
      const authJson = await fs.readFile(authJsonPath, 'utf8');
      const authData = JSON.parse(authJson);

      // Only keep structure, clear contents
      const clearedAuthData = {
        cookies: [],
        origins: [],
      };

      await fs.writeFile(authJsonPath, JSON.stringify(clearedAuthData, null, 2));
      console.log("Cleared contents of auth.json file.");
    } catch (error) {
      console.warn("Failed to clear auth.json file:", error);
    }

  } catch (error) {
    console.error("Error during global teardown:", error);
  } finally {
    await browser.close();
  }
}

export default globalTeardown;
