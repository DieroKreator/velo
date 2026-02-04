import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    // Act
    await page.getByTestId('search-order-id').fill('VLO-6E2J20')
    await page.getByTestId('search-order-button').click()

    // Assert
    expect(page.getByTestId('order-result-id')).toBeVisible()
    expect(page.getByTestId('order-result-id')).toContainText('VLO-6E2J20')

    expect(page.getByTestId('order-result-status')).toBeVisible()
    expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})