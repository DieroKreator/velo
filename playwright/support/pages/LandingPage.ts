import { Page, expect } from '@playwright/test'

export class LandingPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/')
  }

  async validateHeroTitle(title: string) {
    await expect(
      this.page.getByTestId('hero-section').getByRole('heading')
    ).toContainText(title)
  }
}
