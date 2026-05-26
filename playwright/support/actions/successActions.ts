import { Page, expect } from '@playwright/test'

export function createSuccessActions(page: Page) {
    return {
        async expectApproved() {
            await expect(page).toHaveURL(/\/success/)
            await expect(page.getByRole('heading', { name: /Pedido Aprovado/i })).toBeVisible()
        },

        async expectInReview() {
            await expect(page).toHaveURL(/\/success/)
            await expect(page.getByRole('heading', { name: /Pedido em Análise/i })).toBeVisible()
        },

        async expectRejected() {
            await expect(page).toHaveURL(/\/success/)
            await expect(page.getByRole('heading', { name: /Crédito Reprovado/i })).toBeVisible()
        }
    }
}
