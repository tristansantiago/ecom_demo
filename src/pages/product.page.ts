import { expect, Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart() {
    const add = this.page.getByRole('link', { name: 'Add to cart' });
    await expect(add).toBeVisible();
    // Alert appears after clicking.
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      add.click(),
    ]);
    await dialog.accept();
  }
}
