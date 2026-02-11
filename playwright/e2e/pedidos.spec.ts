import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

test.describe('Consulta de Pedido', ()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // Test Data
        const order = 'VLO-GXNL53'
    
        // Act
        await page.getByRole('textbox', { name: 'Número do pedido' }).fill(order) // Way more readable
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()
    
        // Assert
        // expect(page.getByTestId('order-result-id')).toContainText(order)
    
        // const containerPedido = page.getByRole('paragraph')
        //     .filter({ hasText: /^Pedido$/ }) //Aplicar regra de busqueda
        //     .locator('..') //Sobe um nivel e pega o pai do pedido
        // await expect(containerPedido).toContainText(order, { timeout: 10_000 })
    
        // // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-GXNL53"]')
        // // await expect(orderCode).toBeVisible({ timeout: 10_000 })
    
        // // expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
        // await expect(page.getByText('APROVADO')).toBeVisible()

        await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order}
            - img
            - text: APROVADO
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: Glacier Blue
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: aero Wheels
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: Pepe Cannavaro
            - paragraph: Email
            - paragraph: peca@dev.co
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);
    })
    
    test('deve exibir mensagem quando o pedido não', async ({ page }) => {
    
        const order = generateOrderCode()
    
        await page.getByRole('textbox', { name: 'Número do pedido' }).fill(order)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()
    
        // await expect(page.locator('#root')).toContainText('Pedido não encontrado')
        // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')
        //Better assertion
        // const title = page.getByRole('heading', {name: 'Pedido não encontrado'})
        // await expect(title).toBeVisible()
    
        // const message = page.getByRole('paragraph', {name: 'Verifique o número do pedido e tente novamente'})
        // const message = page.getByText('Verifique o número do pedido e tente novamente')
        // const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
        // await expect(message).toBeVisible()
    
        //Best and modern resource to verify this
        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
            `);
    })
})