import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://rozetka.com.ua/')
})

test('Click the Zoo category in the Catalogue and verify banner', async({page}) => {

    const catalogue = await page.getByRole('button', {name: 'Каталог'}).click()
    const category = await page.getByRole('link', { name: 'Зоотовари' }).click()
    expect(category).toBeTruthy
    const banner = page.locator('#rz-banner-img')
    expect(banner).toBeVisible

})