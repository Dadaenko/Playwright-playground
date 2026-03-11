import { Page, expect } from '@playwright/test'
import {NavigationPage} from '../page-object/navigationPage'
import { formLayoutPage } from '../page-object/formLayoutsPage'
import { DatepickerPage } from '../page-object/datepickerPage'

export class PageManager{

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutPage: formLayoutPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutPage = new formLayoutPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutPage
    }

    onDatepickerPage(){
        return this.datepickerPage
    }
}