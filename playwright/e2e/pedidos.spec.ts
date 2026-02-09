import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    // Act
    // await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-6E2J20') // XPAth como ultimo recurso
    await page.getByRole('textbox', { name: 'Número do pedido' }).fill('VLO-6E2J20') // Way more readable
    // await page.getByTestId('search-order-button').click()
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
    // await page.locator('//button[text()="Buscar Pedido"]').click()

    // Assert
    // await page.waitForTimeout(10000) // Evite Timeouts Implicitos

    expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 30_000 })
    expect(page.getByTestId('order-result-id')).toContainText('VLO-6E2J20')

    expect(page.getByTestId('order-result-status')).toBeVisible()
    expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})