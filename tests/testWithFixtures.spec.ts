import { test} from '../test-options'
import {faker} from '@faker-js/faker'

// test.beforeEach(async ({ page }) => {
//     await page.goto('http://localhost:4200/')
// })

test('Parametrized methods', async ({pageManager}) => {
    
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    
    //await pm.navigateTo().formLayoutPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('testing@is.nope', 'dgfhdjslirbvls97468273', 'Option 2')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)

})

//Made updates to the branches and now should be able to commit to only master branch. 