import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('2test2@test.com', {delay: 500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('2test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('2test2@test.com')
    })

    test('Radio buttons', async({page}) => {

        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        //await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

         await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
         expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy() //means it's unselected
         expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy() //means it is indeed selected

    })
})

test.skip('Checkboxes', async({page}) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true}) //if the box is already unchecked, it doesn't do anything.
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true}) //if the box is empty, it will check it. 

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        // await box.check({force: true})
        // expect(await box.isChecked()).toBeTruthy // all the boxes are checked
        
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy //all the boxes are unchecked
        

    }
})

test.skip('Lists and Dropdowns', async({page}) =>{

    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') //can be used when the list has a UL tag - parent container
    page.getByRole('listitem') //can be used when the list LI tag - all the list itemsin the array

    //const optionList = page.getByRole('list').locator('nb-option')

    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
    
    await dropDownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate")
            await dropDownMenu.click()
    }
})

test.skip('Tooltips', async ({page}) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await tooltipCard.getByRole('button', {name: "Top"}).hover

    page.getByRole('tooltip') //only works if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

})

test.skip('Dialogue box', async ({page}) => {

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

})

test.skip('Dialog', async ({page}) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()

    // await page.getByRole('button', { name: 'Open Dialog with template' }).click()
    // const dialog = page.locator('nb-dialog-container')
    // await expect(dialog).toBeVisible()
    // await dialog.getByRole('button', { name: 'CLOSE DIALOG' }).click()
    // await expect(dialog).toBeHidden()


    await page.getByRole('button', { name: 'Open Dialog with backdrop click' }).click()
    const dialog2 = page.locator('nb-dialog-container')
    await expect(dialog2).toBeVisible()
    await dialog2.getByRole('button', { name: 'DISMISS DIALOG' }).click()
    await expect(dialog2).toBeHidden()



})
test.skip('Web Tables part 1', async ({page}) =>{

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //get the row by any text in this row

    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('34')
    await page.locator('.nb-checkmark').click()

    //get the row based on the value in the specific column

    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('testing@for.money.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('testing@for.money.com')
})

test.skip('Web Tables part 2', async ({page}) => {

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //test filter of the table
    const ages = ["20", "30", "40", "200"]

    for(let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()){
            
            const cellValue = await row.locator('td').last().textContent()

            if(age == "200"){

                expect(await page.getByRole('table').textContent()).toContain('No data found')

            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('Date picker, part 1', async ({page}) => {

    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
    await expect(calendarInputField).toHaveValue('Feb 1, 2026')
})

test('Date picker, part 2', async ({page}) => {
    
})