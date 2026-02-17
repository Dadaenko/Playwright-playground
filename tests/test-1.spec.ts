import { test, expect } from '@playwright/test';

test('Trying the record and playback', async ({ page }) => {
  await page.goto('http://localhost:4200/pages');
  await page.getByRole('link', { name: 'Charts', exact: true }).click();
  await page.getByRole('link', { name: 'Echarts' }).click();
  await page.locator('ngx-echarts-pie canvas').click({
    position: {
      x: 131,
      y: 128
    }
  });
});