import { expect } from '@playwright/test';
import { test as myFixtureTest } from '../fixture/my-fixture'; 
import dataset from '../data/dataExercise01.json';

myFixtureTest.describe('@exercise_fixture @smoke @regression', () => {
    for (const data of dataset) {
        myFixtureTest(`Complete purchase flow with products: ${data.products.join(', ')}`, async ({
            loginPage,
            inventoryPage,
            cartPage,
            checkOutStepOnePage,
            checkOutStepTwoPage,
            checkOutCompletePage,
        }) => {
            // Navigate to the login page
            await loginPage.goToLoginPage(data.loginPageUrl);

            // Login “https://www.saucedemo.com/” by standard_user (standard_user/secret_sauce)
            await loginPage.login(data.username, data.password);

            // At the inventory page, perform "Add to cart" two products (example: Sauce Labs Backpack, Sauce Labs Bike Light) 
            for (const product of data.products) {
                await inventoryPage.addProductToCart(product);
            }

            // Click to open the cart
            await inventoryPage.openCart();

            // Go to cart page, verify two selected products at step 2) is displayed, then click Checkout button
            await cartPage.proceedToCheckout();

            // At checkout-step-one page, input the first name, last name and zip/postal code, then press Continue button 
            await checkOutStepOnePage.fillDetails(data.firstName, data.lastName, data.zip);

            // At checkout-step-two page, calculate the total price of two selected products at step 2) is displayed in UI correctly. Please refer: Total = Price Total + Tax (Price Total = Price of product 1 + Price of product 2, Tax = Price Total* 8%)
            const displayedTotal = await checkOutStepTwoPage.getDisplayedTotal();
            const priceTotal = data.productPrices.reduce((a, b) => a + b, 0);
            const tax = priceTotal * 0.08;
            const calculatedTotal = priceTotal + tax;

            // Check if the displayed total is close to the calculated total
            expect(displayedTotal).toBeCloseTo(calculatedTotal, 2);

            // Click finish to complete the checkout
            await checkOutStepTwoPage.clickFinish();

            // At the checkout-complete page, verify the message "Thank you for your order!" is displayed
            const completionMessage = await checkOutCompletePage.getCompletionMessage();
            expect(completionMessage).toBe('Thank you for your order!');
        });
    }
});