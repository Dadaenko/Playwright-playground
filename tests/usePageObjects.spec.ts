import { test, expect } from '@playwright/test'
import { PageManager } from '../page-object/pageManager'
import {faker} from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({page}) =>{

    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()

})

test('Parametrized methods', async ({page}) => {
    
    const pm = new PageManager(page)

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('testing@is.nope', 'dgfhdjslirbvls97468273', 'Option 2')
    await page.screenshot({path: 'screenshots/formsLayoutPage.png'}) //for the whole page
    // const buffer = await page.screenshot()
    // console.log(buffer.toString('base64')) 
    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inLineForm.png'}) //for the area
    // await pm.navigateTo().datepickerPage()
    // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(31)
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(25, 35)

})

//Made updates to the branches and now should be able to commit to only master branch. 