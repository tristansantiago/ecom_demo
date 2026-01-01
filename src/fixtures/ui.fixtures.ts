import { test as base } from '@playwright/test';
import { HomePage } from '@/pages/home.page';
import { ProductPage } from '@/pages/product.page';
import { CartPage } from '@/pages/cart.page';
import { NavbarComponent } from '@/components/navbar.component';

export const test = base.extend<{
  home: HomePage;
  product: ProductPage;
  cart: CartPage;
  navbar: NavbarComponent;
}>({
  home: async ({ page }, use) => { await use(new HomePage(page)); },
  product: async ({ page }, use) => { await use(new ProductPage(page)); },
  cart: async ({ page }, use) => { await use(new CartPage(page)); },
  navbar: async ({ page }, use) => { await use(new NavbarComponent(page)); },
});

// export const expect = test.expect;
export { expect } from '@playwright/test';
