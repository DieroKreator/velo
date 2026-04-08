import { test, expect } from '@playwright/test'
import { Navbar } from '../support/components/Navbar'
import { LandingPage } from '../support/pages/LandingPage'
import { OrderDetails, OrderLockupPage } from '../support/pages/OrderLockupPage'
import { generateOrderCode } from '../support/helpers'

test.describe('Consulta de Pedido', () => {

  let orderLockupPage: OrderLockupPage
  
  test.beforeEach(async ({ page }) => {

    await new LandingPage(page).goto('Velô Sprint')
    await new Navbar(page).orderLockupLink()
    orderLockupPage = new OrderLockupPage(page)
    await new OrderLockupPage(page).validatePageIsLoaded('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-GXNL53',
      status: 'APROVADO' as const,
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Pepe Cannavaro',
        email: 'peca@dev.co'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-YX5W8U',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Carla Gilles',
        email: 'cagi@dev.com'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-Q4VV1T',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Bruno Stampe',
        email: 'bstampe@dev.br'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    await orderLockupPage.searchOrder(order)
    await orderLockupPage.validateOrderNotFound(order)
  })
})