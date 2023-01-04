import { test, expect } from '@playwright/test';

const TABLE_DATA = [
  ['Joe', 'Bloggs', '37'],
  ['Janette', 'Bloggs', '33'],
  ['Billy', 'Bloggs', '7'],
];

test.describe('File upload interactions / assertions @form', () => {
  test('CSV can be uploaded and viewed', async ({ page }) => {
    await page.goto('https://csv-viewer-online.github.io/');
    await page.locator('#input-file').click();
    await page.locator('#input-file').setInputFiles('fixtures/people.csv');

    const tableData = await page
      .locator('.ht_master table tbody tr')
      .evaluateAll((rows) =>
        rows.map((row) =>
          Array.from(row.querySelectorAll('td')).map((cell) => cell.textContent)
        )
      );

    tableData.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        expect(cell).toStrictEqual(TABLE_DATA[rowIndex][cellIndex]);
      });
    });
  });
});
