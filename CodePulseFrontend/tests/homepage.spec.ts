import { expect, test } from '@playwright/test'

test('public homepage, shared login placeholder, and dashboard access', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Good code.Better together.',
  )
  await expect(page.getByText('AI-POWERED CODE REVIEW')).toBeVisible()
  await expect(page.locator('.hero-description')).toHaveText(
    'Automatically review your GitHub pull requests, catch potential issues, and get actionable feedback.',
  )
  await expect(page.locator('.repository-card')).toHaveCount(0)
  await expect(page.getByRole('combobox', { name: 'Demo state' })).toHaveCount(
    0,
  )

  const loginButtons = page.getByRole('button', { name: 'Log in with GitHub' })
  await expect(loginButtons).toHaveCount(2)
  for (const button of await loginButtons.all()) {
    await button.click()
    await expect(page.getByRole('dialog')).toContainText('visual placeholder')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(button).toBeFocused()
    await expect(page).toHaveURL(/\/$/)
  }

  for (const label of ['Features', 'About', 'Docs']) {
    await page.getByRole('link', { name: label, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`#${label.toLowerCase()}$`))
    await expect(page.locator(`#${label.toLowerCase()}`)).toBeInViewport()
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  }
  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'Take a look around.' }),
  ).toBeInViewport()
  await page.getByRole('link', { name: 'Explore the dashboard' }).click()
  await expect(page).toHaveURL(/#repositories$/)
  await expect(page.locator('.repository-card').first()).toBeVisible()
  await page.goBack()
  await expect(page.locator('.hero-content')).toBeAttached()
  await page.getByRole('link', { name: 'CodePulse home' }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport()
})

test('homepage matches the desktop composition and fits smaller screens', async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  if (testInfo.project.name === 'desktop') {
    await page.setViewportSize({ width: 1708, height: 921 })
  }
  await expect(page.locator('.hero-login')).toBeInViewport()
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      }),
  )
  await page.screenshot({
    path: `test-results/homepage-${testInfo.project.name}.png`,
    fullPage: testInfo.project.name === 'mobile',
  })
  if (testInfo.project.name === 'desktop') {
    const heading = await page.locator('#hero-heading').boundingBox()
    expect(heading?.x).toBeGreaterThan(130)
    expect(heading?.y).toBeLessThan(310)
    const sections = await page.locator('.landing-details').boundingBox()
    expect(sections!.y).toBeGreaterThanOrEqual(921)
    for (const width of [320, 375, 600, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await expect(page.locator('.landing-header .landing-login')).toBeVisible()
      await expect(page.locator('.hero-login')).toBeInViewport()
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `Homepage should fit at ${width}px`,
      ).toBeTruthy()
    }
  }
  expect(errors).toEqual([])
})
