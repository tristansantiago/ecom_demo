import { test, expect } from '@/fixtures/ui.fixtures';

test('Add Product to Cart and Place Order', { tag: '@smoke' }, async ({ home, product, cart, page }) => {
  const productName = 'Samsung galaxy s6';

  await test.step('Navigate to Home Page', async () => {
    await home.goto();
  });

  await test.step('Open Category and Select Product', async () => {
    await home.openCategory('Phones');
    await home.openProduct(productName);
  });

  await test.step('Add Product to Cart', async () => {
    await product.addToCart();
  });

  await test.step('Open Cart and Verify Product Added', async () => {
    await cart.open();
    await cart.expectItemInCart(productName);
  });

  await test.step('Place Order and Confirm Return to Home Page', async () => {
    await cart.placeOrder({
      name: 'Tristan Test',
      country: 'USA',
      city: 'Atlanta',
      card: '4111111111111111',
      month: '12',
      year: '2026',
    });

    await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  });

});

test('Navigate Using Navbar Links', { tag: '@smoke' }, async ({ home, navbar, page }) => {
  const categories = ['Contact',];
  await test.step('Navigate to Home Page', async () => {
    await home.goto();
  });
});

test.describe('@smoke Categories', () => {
  const categories = ['Phones', 'Laptops', 'Monitors'] as const;

  for (const cat of categories) {
    test(`Category renders: ${cat}`, async ({ home, page }) => {
      await home.goto();
      await home.openCategory(cat);

      // At least one product tile visible for the category.
      await expect(page.locator('#tbodyid .card').first()).toBeVisible();
      // Category link stays highlighted/visible.
      await expect(page.getByRole('link', { name: cat })).toBeVisible();
    });
  }
});