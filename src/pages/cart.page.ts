import { expect, Locator, Page } from '@playwright/test';
import { NavbarComponent } from '@/components/navbar.component';

export type Order = {
    name: string;
    country: string;
    city: string;
    card: string;
    month: string;
    year: string;
};

export class CartPage {
    constructor(private readonly page: Page, private readonly navbar: NavbarComponent = new NavbarComponent(page)) {
        this.orderDialog = page.locator('#orderModal');
        this.sweetAlert = page.locator('.sweet-alert');
    }

    private readonly orderDialog: Locator;
    private readonly sweetAlert: Locator;

    async open() {
        await this.navbar.openCart();
    }

    async expectItemInCart(productName: string) {
        await expect(this.page.locator('#tbodyid tr').filter({ hasText: productName })).toBeVisible();
    }


    async placeOrder(order: Order) {
        await this.page.getByRole('button', { name: 'Place Order' }).click();
        await expect(this.orderDialog).toBeVisible();
        const fill = async (label: string, value: string) => {
            await this.orderDialog.getByLabel(label).fill(value);
        };
        await fill('Name:', order.name);
        await fill('Country:', order.country);
        await fill('City:', order.city);
        await fill('Credit card:', order.card);
        await fill('Month:', order.month);
        await fill('Year:', order.year);
        await this.orderDialog.getByRole('button', { name: 'Purchase' }).click();

        // Confirmation uses a modal with text "Thank you for your purchase!"
        const conf = this.sweetAlert.filter({ hasText: 'Thank you for your purchase!' });
        await expect(conf).toBeVisible();
        await conf.getByRole('button', { name: 'OK' }).click();
    }
}