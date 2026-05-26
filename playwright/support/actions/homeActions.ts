import { Page } from '@playwright/test'

export function createHomeActions(page: Page) {
    return {
        async open() {
            await page.goto('/')
        },

        async startConfigurator() {
            await page.goto('/')
            await page.getByRole('link', { name: /Configure Agora/i }).click()
        }
    }
}
