import { expect, test } from '../support/fixtures'
import { OrderDetails } from '../support/actions/orderLockupActions'
import { generateOrderCode } from '../support/helpers'
import { deleteOrderByNumber } from '../support/database/orderRepository'

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open('Velô Sprint', 'Consultar Pedido')
  })

  // VLO-GXNL53

  test('deve consultar um pedido aprovado', async ({ app }) => {

    const order: OrderDetails = {
      number: 'VLO-SE4R01',
      status: 'APROVADO' as const,
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Pepe Cannavaro',
        email: 'peca@dev.co'
      },
      payment: 'À Vista'
    }

    await deleteOrderByNumber(order.number)

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ app }) => {

    const order: OrderDetails = {
      number: 'VLO-SE4R02',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Carla Gilles',
        email: 'cagi@dev.com'
      },
      payment: 'À Vista'
    }

    await deleteOrderByNumber(order.number)

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-SE4R03',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Bruno Stampe',
        email: 'bstampe@dev.br'
      },
      payment: 'À Vista'
    }

    await deleteOrderByNumber(order.number)

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()
    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do ppedido está fora do padrão', async ({ app }) => {
    const orderCode = 'XYZ-999-INVALIDO'
    await app.orderLockup.searchOrder(orderCode)
    await app.orderLockup.validateOrderNotFound()
  })

  test('deve manter o botão de busca desabilitado com campo vazio ou apenas espaços', async ({ app }) => {
    const searchOrderBtn = app.orderLockup.elements.searchOrderBtn
    await expect(searchOrderBtn).toBeDisabled()

    const orderInput = app.orderLockup.elements.orderInput
    await orderInput.fill('    ')
    await expect(searchOrderBtn).toBeDisabled()
  })
})