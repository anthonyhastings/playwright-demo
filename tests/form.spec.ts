import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const typeOptions = { delay: 75 };

test.describe('Form related interactions / assertions @form', () => {
  test('Form can be traversed and populated', async ({ page }) => {
    const fakeUser = {
      city: faker.address.city(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      state: faker.address.stateAbbr(),
      streetAddress: faker.address.streetAddress(),
      zipCode: faker.address.zipCode(),
    };

    test.info().annotations.push({
      type: 'generatedUser',
      description: JSON.stringify(fakeUser),
    });

    await page.goto(
      'https://mui.com/material-ui/getting-started/templates/checkout/'
    );

    await page.getByLabel(/first name/i).type(fakeUser.firstName, typeOptions);
    await page.getByLabel(/last name/i).type(fakeUser.lastName, typeOptions);
    await page
      .getByLabel(/address line 1/i)
      .type(fakeUser.streetAddress, typeOptions);
    await page.getByLabel(/city/i).type(fakeUser.city, typeOptions);
    await page.getByLabel(/state/i).type(fakeUser.state, typeOptions);
    await page.getByLabel(/zip/i).type(fakeUser.zipCode, typeOptions);
    await page.getByLabel(/country/i).type('U.S.', typeOptions);
    await page
      .getByLabel(/use this address for payment details/i)
      .setChecked(true);

    await page.getByRole('button', { name: /next/i }).click();

    await page.getByLabel(/name on card/i).type('Mr Joe Bloggs', typeOptions);
    await page.getByLabel(/card number/i).type('4545454545454545', typeOptions);
    await page.getByLabel(/expiry date/i).type('12/25', typeOptions);
    await page.getByLabel(/cvv/i).type('151', typeOptions);
    await page
      .getByLabel(/remember credit card details for next time/i)
      .setChecked(true);
    await page.getByRole('button', { name: /next/i }).click();

    await page.getByRole('button', { name: /place order/i }).click();
    await expect(
      page.getByRole('heading', { name: /thank you for your order/i })
    ).toBeVisible();
  });

  test('Form can be asserted upon', async ({ page }) => {
    await page.goto('https://getbootstrap.com/docs/4.0/content/reboot/#forms');

    ////
    // Text controls.
    ////
    const textInputControl = page.getByLabel(/example input/i);
    await expect(textInputControl).toBeEmpty();
    await textInputControl.type('Hello World', typeOptions);
    await expect(textInputControl).toHaveValue('Hello World');

    const textareaControl = page.getByLabel(/example textarea/i);
    await expect(textareaControl).toBeEmpty();
    await textareaControl.type('Foo Bar\nHello World', typeOptions);
    await expect(textareaControl).toHaveValue('Foo Bar\nHello World');

    ////
    // Disabled controls.
    ////
    await expect(
      page.getByRole('radio', { name: /option three/i })
    ).toBeDisabled();

    await expect(
      page.getByRole('button', { name: /button submit/i, disabled: true })
    ).toBeDisabled();

    ////
    // Checkbox controls.
    ////
    const checkboxControl = page.getByLabel(/check this checkbox/i);
    await checkboxControl.check();
    await expect(checkboxControl).toBeChecked();

    ////
    // Radio controls.
    ////
    await expect(page.getByRole('radio', { checked: true })).toHaveValue(
      'option1'
    );

    await expect(
      page.getByRole('radio', { name: /option one/i })
    ).toBeChecked();
  });

  test('Select controls (native) can be interacted with', async ({ page }) => {
    await page.goto(
      'https://interactive-examples.mdn.mozilla.net/pages/tabbed/select.html'
    );

    const dropdown = page.getByLabel(/choose a pet/i);
    await dropdown.selectOption({ label: 'Hamster' });
    await expect(dropdown).toHaveValue('hamster');
  });

  test('Select controls (MUI) can be interacted with', async ({ page }) => {
    await page.goto('https://4tnuch.csb.app/');

    await page.getByRole('button', { name: /age/i }).click();
    await page.getByRole('option', { name: /thirty/i }).click();
  });
});
