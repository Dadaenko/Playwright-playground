
import {test as base} from '@playwright/test'
import { PageManager } from './page-object/pageManager'

export type TestOptions = {
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    formLayoutsPage: [async({page}, use) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    }, {auto: true} ],

    pageManager: async({page}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})