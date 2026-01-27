import {test} from '@playwright/test'

//test.beforeAll(() => {})

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
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

test.skip('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTitle('IoT Dashboard').click()

    await page.getByTestId('SignIn').click()
})

test('Locating child elements', async({page}) => {

    //await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    //alternatively this can be done by concatinating
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    //await page.locator('nb-card').nth(3).getByRole('button').click() - the least practical, try to avoid doing so
})
