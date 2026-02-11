import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = 'VLO-GXNL53'

    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    // Act
    await page.getByRole('textbox', { name: 'Número do pedido' }).fill(order) // Way more readable
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    // expect(page.getByTestId('order-result-id')).toContainText(order)

    const containerPedido = page.getByRole('paragraph')
        .filter({ hasText: /^Pedido$/ }) //Aplicar regra de busqueda
        .locator('..') //Sobe um nivel e pega o pai do pedido
    await expect(containerPedido).toContainText(order, { timeout: 10_000 })

    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-GXNL53"]')
    // await expect(orderCode).toBeVisible({ timeout: 10_000 })

    // expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
    await expect(page.getByText('APROVADO')).toBeVisible()
})