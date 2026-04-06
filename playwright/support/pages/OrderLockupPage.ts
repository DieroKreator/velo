import { Page } from "@playwright/test"

export class OrderLockupPage {
    constructor(private page: Page) {}
  
    async buscarPedido(numero: string) {
      await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(numero)
      await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
    }
  }