import { test, expect } from '@playwright/test'
import { generateOrderCode, searchOrder } from '../support/helpers'

test.describe('Consulta de Pedido', ()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // Test Data
        // const order = 'VLO-GXNL53'

        const order = {
            number: 'VLO-GXNL53',
            status: 'APROVADO',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Pepe Cannavaro',
                email: 'peca@dev.co'
            },
            payment: 'À Vista'
        }
    
        // Act
        await searchOrder(page, order.number)
    
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

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
              - img
              - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

            const statusBadge = page.getByRole('status').filter({ hasText: order.status })
            await expect(statusBadge).toHaveClass(/bg-green-100/)
            await expect(statusBadge).toHaveClass(/text-green-700/)

            const statusIcon = statusBadge.locator('svg')
            await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)
            
    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        const order = {
            number: 'VLO-YX5W8U',
            status: 'REPROVADO',
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'Carla Gilles',
                email: 'cagi@dev.com'
            },
            payment: 'À Vista'
        }
    
        await searchOrder(page, order.number)

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
              - img
              - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

            const statusBadge = page.getByRole('status').filter({ hasText: order.status })
            await expect(statusBadge).toHaveClass(/bg-red-100/)
            await expect(statusBadge).toHaveClass(/text-red-700/)

            const statusIcon = statusBadge.locator('svg')
            await expect(statusIcon).toHaveClass(/lucide-circle-x/)
    })

    test('deve consultar um pedido em analise', async ({ page }) => {

        const order = {
            number: 'VLO-Q4VV1T',
            status: 'EM_ANALISE',
            color: 'Lunar White',
            wheels: 'aero Wheels',
            customer: {
                name: 'Bruno Stampe',
                email: 'bstampe@dev.br'
            },
            payment: 'À Vista'
        }
    
        await searchOrder(page, order.number)

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
              - img
              - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

            const statusBadge = page.getByRole('status').filter({ hasText: order.status })
            await expect(statusBadge).toHaveClass(/bg-amber-100/)
            await expect(statusBadge).toHaveClass(/text-amber-700/)

            const statusIcon = statusBadge.locator('svg')
            await expect(statusIcon).toHaveClass(/lucide-clock/)
    })
    
    test('deve exibir mensagem quando o pedido não', async ({ page }) => {
    
        const order = generateOrderCode()
    
        await searchOrder(page, order)
    
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