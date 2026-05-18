### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin

To run the test by tag use command:
npx playwright test --project=chromium --grep @smoke

To run tests with different tags:
npx playwright test --project=chromium --grep "@smoke|@regression"