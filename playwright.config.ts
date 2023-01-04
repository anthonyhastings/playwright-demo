import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ debug: true });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  expect: {
    timeout: 10 * 1000,
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: 'test-results/',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [['html'], ['list'], ['junit', { outputFile: 'test-results.xml' }]],
  retries: process.env.CI ? 2 : 0,
  testDir: './tests',
  timeout: 5 * 60 * 1000,
  use: {
    actionTimeout: 0,
    screenshot: 'on',
    trace: 'on',
    video: 'on',
  },
  workers: process.env.CI ? 1 : undefined,
};

export default config;
