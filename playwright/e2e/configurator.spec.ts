import { expect, test } from '../support/fixtures'

test.describe('Configuração do Veículo', () => {
    test.beforeEach(async ({ app }) => {
        await app.configurator.open()
    })

    test('deve atualizar a imagem e manter o preço base ao trocar a cor do veículo', async ({ app }) => {
        await app.configurator.expectPrice('R$ 40.000,00')

        await app.configurator.selectColor('Midnight Black')
        await app.configurator.expectPrice('R$ 40.000,00')
        await app.configurator.expectCarImageSrc(/midnight-black-aero-wheels/)
    })

    test('deve atualizar o preço e a imagem ao alterar as rodas, e restaurar os valores padrão', async ({ app }) => {
        await app.configurator.expectPrice('R$ 40.000,00')

        await app.configurator.selectWheels(/Sport Wheels/)
        await app.configurator.expectPrice('R$ 42.000,00')
        await app.configurator.expectCarImageSrc(/glacier-blue-sport-wheels/)

        await app.configurator.selectWheels(/Aero Wheels/)
        await app.configurator.expectPrice('R$ 40.000,00')
        await app.configurator.expectCarImageSrc(/glacier-blue-aero-wheels/)
    })

    test('CT03 - deve atualizar o preço ao marcar opcionais e persistir os valores no checkout', async ({ app, page }) => {
        await app.configurator.expectPrice('R$ 40.000,00')

        await app.configurator.checkOptional(/Precision Park/)
        await expect(page.getByRole('checkbox', { name: /Precision Park/ })).toBeChecked()
        await app.configurator.expectPrice('R$ 45.500,00')

        await app.configurator.checkOptional(/Flux Capacitor/)
        await expect(page.getByRole('checkbox', { name: /Flux Capacitor/ })).toBeChecked()
        await app.configurator.expectPrice('R$ 50.500,00')

        await app.configurator.uncheckOptional(/Precision Park/)
        await app.configurator.uncheckOptional(/Flux Capacitor/)
        await expect(page.getByRole('checkbox', { name: /Precision Park/ })).not.toBeChecked()
        await expect(page.getByRole('checkbox', { name: /Flux Capacitor/ })).not.toBeChecked()
        await app.configurator.expectPrice('R$ 40.000,00')

        await app.configurator.finishConfigurator()
        await expect(page).toHaveURL(/\/order$/)
        await expect(page.getByRole('heading', { name: 'Resumo' })).toBeVisible()
        await expect(page.getByRole('button', { name: /À Vista/ })).toContainText('R$ 40.000,00')
        await expect(page.getByText('Total').locator('..')).toContainText('R$ 40.000,00')
    })
})