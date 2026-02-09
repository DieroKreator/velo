import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {

    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    await page.getByRole('textbox', { name: 'Número do pedido' }).fill('VLO-6E2J20') // Way more readable
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    await expect(page.getByText('VLO-GXNL53')).toBeVisible({ timeout: 30_000 })
    // expect(page.getByTestId('order-result-id')).toContainText('VLO-6E2J20')

    await expect(page.getByText('APROVADO')).toBeVisible()
    // expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})