import { test as base } from '@playwright/test'

import { createCheckoutActions } from './actions/checkoutActions'
import { createConfiguratorActions } from './actions/configuratorActions'
import { createOrderLookupActions } from './actions/orderLookupActions'
import { createHeroActions } from './actions/heroActions'

import { mockCreditAnalysis } from './mock.api'
import { createSuccessActions } from './actions/successActions'

type App = {
  checkout: ReturnType<typeof createCheckoutActions>
  configurator: ReturnType<typeof createConfiguratorActions>
  orderLookup: ReturnType<typeof createOrderLookupActions>
  hero: ReturnType<typeof createHeroActions>
  mock: {
    creditAnalysis: (score: number) => Promise<void>
  }
  success: ReturnType<typeof createSuccessActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      checkout: createCheckoutActions(page),
      configurator: createConfiguratorActions(page),
      orderLookup: createOrderLookupActions(page),
      hero: createHeroActions(page),
      mock: {
        creditAnalysis: async (score: number) => await mockCreditAnalysis(page, score)
      },
      success: createSuccessActions(page)
    }
    await use(app)
  }
})

export { expect } from '@playwright/test'