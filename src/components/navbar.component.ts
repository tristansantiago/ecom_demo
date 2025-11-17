import { expect, Page } from '@playwright/test';

export class NavbarComponent {
  constructor(private readonly page: Page) { }

  private nav() {
    return this.page.locator('#navbarExample');
  }

  async openHome() {
    await this.nav().getByRole('link', { name: 'Home', exact: true }).first().click();
    await expect(this.page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  }

  async openCart() {
    // Guard: sometimes there are two Cart links; click the first visible one.
    const cartLink = this.nav().getByRole('link', { name: 'Cart', exact: true });
    await cartLink.first().click();
    await expect(this.page.getByRole('heading', { name: 'Products' })).toBeVisible();
  }

  async openContact() {
    await this.nav().getByRole('link', { name: 'Contact', exact: true }).first().click();
    await expect(this.page.getByRole('dialog')).toBeVisible(); // Demoblaze opens a modal.
  }
}
