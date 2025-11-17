import { expect, Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.demoblaze.com');
    await expect(this.page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  }

  async openCategory(name: 'Phones'|'Laptops'|'Monitors') {
    await this.page.getByRole('link', { name }).click();
  }

  async openProduct(productName: string) {
    await this.page.getByRole('link', { name: productName, exact: true }).click();
  }
}
