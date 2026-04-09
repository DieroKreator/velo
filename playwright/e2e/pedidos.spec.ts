import { test } from '../support/fixtures'
import { OrderDetails } from '../support/actions/orderLockupActions'
import { generateOrderCode } from '../support/helpers'

test.describe('Consulta de Pedido', () => {
  
  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open('Velô Sprint', 'Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {

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

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ app }) => {

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

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {

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

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()
    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do ppedido está fora do padrão', async ({app}) => {
    const orderCode = 'XYZ-999-INVALIDO'
    await app.orderLockup.searchOrder(orderCode)
    await app.orderLockup.validateOrderNotFound()
  })
})