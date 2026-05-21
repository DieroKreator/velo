import { test, expect } from '../support/fixtures'

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/order')
    await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
  })

  test.describe('Validações de campos obrigatórios', () => {
    test('deve validar obrigatoriedade de todos os campos em branco', async ({ page, app }) => {

      // Act
      await app.checkout.submit()

      // Assert
      await expect(app.checkout.elements.nameAlert).toHaveText('Nome deve ter pelo menos 2 caracteres')
      await expect(app.checkout.elements.surnameAlert).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
      await expect(app.checkout.elements.emailAlert).toHaveText('Email inválido')
      await expect(app.checkout.elements.phoneAlert).toHaveText('Telefone inválido')
      await expect(app.checkout.elements.cpfAlert).toHaveText('CPF inválido')
      await expect(app.checkout.elements.storeAlert).toHaveText('Selecione uma loja')
      await expect(app.checkout.elements.termsAlert).toHaveText('Aceite os termos')
    })

    test('deve validar limite mínimo de caracteres para Nome e Sobrenome', async ({ page, app }) => {
      const nameAlert = page.getByTestId('error-name')
      const surnameAlert = page.getByTestId('error-lastname')

      const customer = {
        name: 'A',
        lastname: 'B',
        email: 'papito@teste.com',
        document: '00000014141',
        phone: '(11) 99999-9999'
      }

      // Arrange
      await app.checkout.fillCustomerlData(customer)
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(nameAlert).toHaveText('Nome deve ter pelo menos 2 caracteres')
      await expect(surnameAlert).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
    })

    test('deve exibir erro para e-mail com formato inválido', async ({ page, app }) => {
      const emailAlert = page.getByTestId('error-email')

      const customer = {
        name: 'Fernando',
        lastname: 'Papito',
        email: 'papito@.com',
        document: '00000014141',
        phone: '(11) 99999-9999'
      }

      // Arrange
      await app.checkout.fillCustomerlData(customer)
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(emailAlert).toHaveText('Email inválido')
    })

    test('deve exibir erro para CPF inválido', async ({ page, app }) => {
      const cpfAlert = page.getByTestId('error-document')

      const customer = {
        name: 'Fernando',
        lastname: 'Papito',
        email: 'papito@teste.com',
        document: '00000014199',
        phone: '(11) 99999-9999'
      }

      // Arrange
      await app.checkout.fillCustomerlData(customer)
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(cpfAlert).toHaveText('CPF inválido')
    })

    test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ page, app }) => {
      const termsAlert = page.getByTestId('error-terms')

      const customer = {
        name: 'Fernando',
        lastname: 'Papito',
        email: 'papito@test.com',
        document: '00000014199',
        phone: '(11) 99999-9999'
      }

      // Arrange
      await app.checkout.fillCustomerlData(customer)
      await app.checkout.selectStore('Velô Paulista')

      await expect(app.checkout.elements.terms).not.toBeChecked()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(termsAlert).toHaveText('Aceite os termos')
    })
  })
})