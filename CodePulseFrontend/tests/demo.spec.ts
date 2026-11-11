import { expect, test } from '@playwright/test'

test('repository → PR → older review, including browser back', async ({
  page,
}) => {
  await page.goto('/#repositories')
  await expect(
    page.getByRole('heading', { name: 'Good code. Better together.' }),
  ).toBeVisible()
  await page
    .locator('.repository-card')
    .filter({
      has: page.getByRole('heading', { name: 'CodePulseTest', exact: true }),
    })
    .click()
  await page
    .getByRole('link', {
      name: 'Open PR #1: Add calculator division',
      exact: true,
    })
    .click()
  await expect(
    page.getByRole('heading', { name: 'Handle division by zero' }),
  ).toBeVisible()
  await page.getByRole('link', { name: /Review 2/ }).click()
  await expect(
    page.getByRole('heading', { name: 'Watch out for integer division' }),
  ).toBeVisible()
  await expect(
    page.getByText('You’re reading an earlier revision.'),
  ).toBeVisible()
  await page.goBack()
  await expect(
    page.getByRole('heading', { name: 'Handle division by zero' }),
  ).toBeVisible()
  await page.screenshot({
    path: `test-results/review-${test.info().project.name}.png`,
    fullPage: true,
  })
})

test('local search, language filtering, and no-results reset', async ({
  page,
}) => {
  await page.goto('/#repositories')
  await page
    .getByRole('textbox', { name: 'Search repositories' })
    .fill('portfolio')
  await expect(page.locator('.repository-card')).toHaveCount(1)
  await page
    .getByRole('combobox', { name: 'Filter by language' })
    .selectOption('Java')
  await expect(
    page.getByRole('heading', { name: 'No repositories found' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.locator('.repository-card').first()).toBeVisible()
})

test('pull request filters and a PR without reviews', async ({ page }) => {
  await page.goto('/#pull-requests')
  await page
    .getByRole('combobox', { name: 'Filter by state' })
    .selectOption('closed')
  await expect(page.locator('.pr-row')).toHaveCount(3)
  await page
    .getByRole('combobox', { name: 'Filter by repository' })
    .selectOption('1')
  await expect(page.locator('.pr-row')).toHaveCount(1)
  await page
    .getByRole('combobox', { name: 'Filter by state' })
    .selectOption('open')
  await page
    .getByRole('textbox', { name: 'Search pull requests' })
    .fill('README')
  await page.getByRole('link', { name: 'Open PR #3: Update README' }).click()
  await expect(
    page.getByRole('heading', { name: 'A fresh pair of eyes, coming soon' }),
  ).toBeVisible()
})

test('review history filters and deep links', async ({ page }) => {
  await page.goto('/#history')
  await page
    .getByRole('combobox', { name: 'Filter review versions' })
    .selectOption('older')
  await expect(page.locator('.history-row')).toHaveCount(2)
  await page.locator('.history-row').first().click()
  await expect(
    page.getByRole('heading', { name: 'Watch out for integer division' }),
  ).toBeVisible()
  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'Watch out for integer division' }),
  ).toBeVisible()
})

test('loading, empty, error, and recovery examples', async ({ page }) => {
  await page.goto('/#repositories')
  const scenario = page.getByRole('combobox', { name: 'Demo state' })
  await scenario.selectOption('loading')
  await expect(
    page.getByRole('status', { name: 'Loading demo workspace' }),
  ).toBeVisible()
  await scenario.selectOption('empty')
  await expect(
    page.getByRole('heading', { name: 'Every great project starts somewhere' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Back to the demo' }).click()
  await expect(page.locator('.repository-card').first()).toBeVisible()
  await scenario.selectOption('error')
  await expect(page.getByRole('alert')).toContainText('simulated loading error')
  await page.getByRole('button', { name: 'Try again' }).click()
  await expect(page.locator('.repository-card').first()).toBeVisible()
})

test('GitHub placeholder, continue reviewing, invalid links', async ({
  page,
}) => {
  await page.goto('/#repositories')
  await page.getByRole('button', { name: 'Log in with GitHub' }).click()
  await expect(page.getByRole('dialog')).toContainText('visual placeholder')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await page.locator('.continue-card').click()
  await expect(
    page.getByRole('heading', { name: 'Handle division by zero' }),
  ).toBeVisible()
  await page.goto('/#review/99999')
  await expect(
    page.getByRole('heading', { name: 'That page isn’t in this workspace' }),
  ).toBeVisible()
})

test('overview and review stay within viewport, with no external data requests', async ({
  page,
}) => {
  const externalRequests: string[] = []
  const errors: string[] = []
  page.on('request', (request) => {
    if (
      !request.url().startsWith('http://127.0.0.1:5173') &&
      !request.url().startsWith('data:')
    )
      externalRequests.push(request.url())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  for (const route of [
    '/',
    '/#repositories',
    '/#pull-requests',
    '/#history',
    '/#pull-request/101',
  ]) {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy()
  }
  await page.goto('/#repositories')
  await expect(page.locator('.repository-card').first()).toBeVisible()
  await page.screenshot({
    path: `test-results/overview-${test.info().project.name}.png`,
    fullPage: true,
  })
  expect(externalRequests).toEqual([])
  expect(errors).toEqual([])
})

test('empty repository and narrow/tablet layouts', async ({
  page,
}, testInfo) => {
  await page.goto('/#repositories')
  await page.getByRole('button', { name: 'View all 4' }).click()
  await expect(page.locator('.repository-card')).toHaveCount(4)
  await page
    .locator('.repository-card')
    .filter({ has: page.getByRole('heading', { name: 'weekend-experiments' }) })
    .click()
  await expect(
    page.getByRole('heading', { name: 'A clean slate, full of possibilities' }),
  ).toBeVisible()
  if (testInfo.project.name === 'desktop') {
    for (const width of [320, 600, 768, 1024]) {
      await page.setViewportSize({ width, height: 900 })
      for (const route of [
        '/',
        '/#repositories',
        '/#pull-requests',
        '/#history',
        '/#pull-request/101',
      ]) {
        await page.goto(route)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          `${route} should fit at ${width}px`,
        ).toBeTruthy()
      }
    }
  }
})
