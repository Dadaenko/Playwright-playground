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

test('Checkboxes', async({page}) => {

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

test('Lists and Dropdowns', async({page}) =>{

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

test('Tooltips', async ({page}) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await tooltipCard.getByRole('button', {name: "Top"}).hover

    page.getByRole('tooltip') //only works if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

})
