import {test} from '@playwright/test'

//test.beforeAll(() => {})

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

//test.afterAll - not a good practice to use them in test

//test.afterEach - same, can contrinute to the test flakiness

//can skip by using test.describe.skip
//or can run this test by using test.describe.only

test.describe('suite1', () => {
test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click()
})

test('the first test', async({page}) => {
    await page.getByText('Form Layouts').click()
})

test('navigate to datepicker page', async({page}) => {
    await page.getByText('Datepicker').click()
})

})

test.describe('suite2', () => {
test.beforeEach(async ({page}) => {
    await page.getByText('Charts').click()
})

test('the first test', async({page}) => {
    await page.getByText('Form Layouts').click()
})

test('navigate to datepicker page', async({page}) => {
    await page.getByText('Datepicker').click()
})

})