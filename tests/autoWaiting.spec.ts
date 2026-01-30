import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout +2000)
})

test('Auto-waiting', async ({page}) => {

    const successButton = page.locator('.bg-success')

    //await successButton.click()

    //const text = await successButton.textContent()

    // await successButton.waitFor({state: "attached"})
    //const text = await successButton.allTextContents() //allTextContents doesn't have the auto-waiting feature within
    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('Alternative waits', async ({page}) => {

    const successButton = page.locator('.bg-success')

    //___wait for element
    //await page.waitForSelector('.bg-success')

    //___wait for particular response
   // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___wait for networks calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents() 
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('Timeouts', async ({page}) => {

    //in case I want to override timeout for the particular test:
    //test.setTimeout(10000)

    //in case I know my test is flacky because it needs more time, this command will icrease my timout time x3 
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()

})