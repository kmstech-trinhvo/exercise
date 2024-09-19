import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { InventoryPage } from '../page-objects/InventoryPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutStepOnePage } from '../page-objects/CheckOutStepOnePage';
import { CheckoutStepTwoPage } from '../page-objects/CheckOutStepTwoPage';
import { CheckoutCompletePage } from '../page-objects/CheckOutCompletePage';

export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkOutStepOnePage: CheckoutStepOnePage;
  checkOutStepTwoPage: CheckoutStepTwoPage;
  checkOutCompletePage: CheckoutCompletePage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkOutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkOutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },
  checkOutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});
