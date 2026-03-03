import { test, expect } from '@playwright/test'
import {NavigationPage} from '../page-object/navigationPage'
import { formLayoutPage } from '../page-object/formLayoutsPage'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({page}) =>{

    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()

})

test('Parametrized methods', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onformLayoutPage = new formLayoutPage(page)

    await navigateTo.formLayoutPage()
    await onformLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOption('testing@is.nope', 'dgfhdjslirbvls97468273', 'Option 2')

    await navigateTo.formLayoutPage()
    await onformLayoutPage.submitInlineFormWithNameEmailAndCheckbox('Samba Di Janeiro', 'amber@sambissimo.com', true)

})