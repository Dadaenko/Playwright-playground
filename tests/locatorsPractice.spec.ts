import {test, expect} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})

test('Find form picker field', async ({page}) => {

    await page.getByPlaceholder('Form Picker').click()
})

test('Find form picker header', async ({page}) => {

    await page.locator(':text-is("Common Datepicker")').click()
})

test('Find copyright', async ({page}) => {

   await page.locator('.created-by').click()
})

test('Find socials icons', async ({page}) => {

    await page.locator('.socials').click()
})

test.skip('Locator syntax rules', async({page}) => {
    //how to find locator by Tag name
    await page.locator('input').first().click()

    //how to find locator by ID
    page.locator('#inputEmail1')

    //how to find locator by class value
    page.locator('.shape-rectangle')

    //how to find locator by attribute
    page.locator('[placeholder="Email"]')

    //how to find locator by entire class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle')

    //find elements by XPath (but it is NOT RECOMMENDED). In Playwright documentation it says: "We recommend prioritizing 
    // user-visible locators like text or accessible role instead of using XPath that is tied to the implementation and 
    // easily break when the page changes."
    page.locator('//*[@id="inputEmail1"]')

    //find the element by partial text match
    page.locator(':text("Using")')

    //find the element by exact text match
    page.locator(':text-is("Using the Grid")')
})