import { test, expect } from '@playwright/test';

const weatherAppRegex = /api\.openweathermap\.org\/data\/2\.5\/forecast\/daily/;

const weatherFixture = {
  city: {
    name: 'Gotham',
    country: 'USA',
    population: 60385,
  },
  list: [
    {
      dt: 1672228800,
      sunrise: 1672217141,
      sunset: 1672243342,
      temp: {
        day: 8.85,
        min: 5.78,
        max: 10.47,
        night: 6.52,
        eve: 8.92,
        morn: 5.83,
      },
      pressure: 985,
      humidity: 97,
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
    },
    {
      dt: 1672315200,
      sunrise: 1672303544,
      sunset: 1672329797,
      temp: {
        day: 6.05,
        min: 3.72,
        max: 7.33,
        night: 5.29,
        eve: 3.9,
        morn: 6.6,
      },
      pressure: 989,
      humidity: 77,
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
    },
    {
      dt: 1672401600,
      sunrise: 1672389942,
      sunset: 1672416254,
      temp: {
        day: 8.04,
        min: 3.91,
        max: 9.47,
        night: 7.08,
        eve: 7.18,
        morn: 8.1,
      },
      pressure: 986,
      humidity: 81,
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
    },
    {
      dt: 1672488000,
      sunrise: 1672476337,
      sunset: 1672502716,
      temp: {
        day: 6.28,
        min: 5.84,
        max: 9.26,
        night: 6.18,
        eve: 6.31,
        morn: 9.26,
      },
      pressure: 993,
      humidity: 84,
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
    },
    {
      dt: 1672574400,
      sunrise: 1672562728,
      sunset: 1672589181,
      temp: {
        day: 5.51,
        min: 4.37,
        max: 7.21,
        night: 5.62,
        eve: 5.3,
        morn: 4.37,
      },
      pressure: 1000,
      humidity: 87,
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
    },
    {
      dt: 1672660800,
      sunrise: 1672649115,
      sunset: 1672675649,
      temp: {
        day: 4.34,
        min: 2.77,
        max: 4.55,
        night: 3.67,
        eve: 3.61,
        morn: 2.99,
      },
      pressure: 1017,
      humidity: 81,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d',
        },
      ],
    },
    {
      dt: 1672747200,
      sunrise: 1672735498,
      sunset: 1672762120,
      temp: {
        day: 7.53,
        min: 3.97,
        max: 7.53,
        night: 6.14,
        eve: 6.39,
        morn: 6.27,
      },
      pressure: 1025,
      humidity: 70,
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
    },
  ],
};

test.describe('Network intercepting', () => {
  test('Fulfills network request using stubbed data', async ({ page }) => {
    await page.route(weatherAppRegex, (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(weatherFixture),
      });
    });

    await page.goto('https://monitor-weather.netlify.app/');

    await page.getByRole('textbox').type('Bangor, N.I.', { delay: 75 });

    const requestPromise = page.waitForRequest((request) => {
      return request.method() === 'GET' && weatherAppRegex.test(request.url());
    });

    const responsePromise = page.waitForResponse((response) => {
      const request = response.request();
      return request.method() === 'GET' && weatherAppRegex.test(request.url());
    });

    await page.keyboard.press('Enter');

    const request = await requestPromise;
    const requestQueryParams = new URLSearchParams(request.url().split('?')[1]);
    expect(requestQueryParams.get('q')).toEqual('Bangor, N.I.');
    expect(requestQueryParams.get('units')).toEqual('metric');

    const response = await responsePromise;
    const responseBody = await response.json();
    expect(responseBody.city.name).toEqual('Gotham');

    await expect(
      page.getByRole('heading', { name: /gotham, usa/i })
    ).toBeVisible();
  });
});
