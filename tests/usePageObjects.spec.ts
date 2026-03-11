import { test, expect } from '@playwright/test'
import { PageManager } from '../page-object/pageManager'

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

    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('testing@is.nope', 'dgfhdjslirbvls97468273', 'Option 2')
    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('Samba Di Janeiro', 'amber@sambissimo.com', true)
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(31)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(25, 35)

})
