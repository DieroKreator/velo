import { Page, expect } from '@playwright/test'

export class LandingPage {
  constructor(private page: Page) {}

  async goto(titleText: string) {
    await this.page.goto('/')
    const titleLocator = this.page.getByTestId('hero-section').getByRole('heading')
    await expect(titleLocator).toContainText(titleText)
  }
}
