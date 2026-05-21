import { Page, expect } from '@playwright/test'

export function createCheckoutActions(page: Page) {

    const terms = page.getByTestId('checkout-terms')

    const nameAlert = page.getByTestId('error-name')
    const surnameAlert = page.getByTestId('error-lastname')
    const emailAlert = page.getByTestId('error-email')
    const phoneAlert = page.getByTestId('error-phone')
    const cpfAlert = page.getByTestId('error-document')
    const storeAlert = page.getByTestId('error-store')
    const termsAlert = page.getByTestId('error-terms')

    return {

        elements: {
            terms,
            nameAlert,
            surnameAlert,
            emailAlert,
            phoneAlert,
            cpfAlert,
            storeAlert,
            termsAlert
        },

        async expectLoaded() {
            await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
        },

        async expectSummaryTotal(price: string) {
            await expect(page.getByTestId('summary-total-price')).toHaveText(price)
        },

        async fillCustomerlData(data: {
            name: string
            lastname: string
            email: string
            phone: string
            document: string
        }) {
            await page.getByTestId('checkout-name').fill(data.name)
            await page.getByTestId('checkout-surname').fill(data.lastname)
            await page.getByTestId('checkout-email').fill(data.email)
            await page.getByTestId('checkout-phone').fill(data.phone)
            await page.getByTestId('checkout-cpf').fill(data.document)
        },

        async selectStore(storeName: string) {
            await page.getByTestId('checkout-store').click()
            await page.getByRole('option', { name: storeName }).click()
        },

        async acceptTerms() {
            await terms.check()
        },

        async submit() {
            await page.getByRole('button', { name: 'Confirmar Pedido' }).click()
        },
    }
}