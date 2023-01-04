# Playwright Demo

## Introduction

Playwright was created specifically to accommodate the needs of end-to-end testing. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, headless or headed with native mobile emulation of Google Chrome for Android and Mobile Safari.

## Playwright vs Cypress

?????

https://www.browserstack.com/guide/playwright-vs-cypress

- Testing Library style queries built into Playwright.
- Playwright comes with an official [VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) that can trigger test runs and debug tests.
- Writing tests is more akin to writing native scripts with the use of async/await and not having to rely on chaining and nested of commands like Cypress requires.
- Playwright has first-class support for parallel running of tests on a single machine both locally and on CI without a subscription or account required.
- Playwright can re-run code blocks until attached assertion is true (via [Polling](https://playwright.dev/docs/test-assertions#polling) or [Retrying](https://playwright.dev/docs/test-assertions#retrying)).
- Playwright supports multiple languages, including JavaScript, Java, Python, .NET, and C# where Cypress only supports JavaScript.
- Playwright has built-in ability to [launch a process](https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests) and wait for a chosen port to respond before running tests.

## Debugging Tests

https://playwright.dev/docs/debug

`--debug` flag starts headed and disables test timeouts.
Allows you to use a debugger and step through code.
You can also use the Playwright Test for VSCode extension to use the debugger within the IDE.

```shell
yarn playwright show-report
```

Once your test has finished running a reporter will have created HTML assets showing a full walkthrough of your tests allowing you to filter the report by browsers, passed tests, failed tests, skipped tests and flaky tests. You can click on each test and explore the test's errors as well as each step of the test and examine the DOM at that time.

Tests can also have a trace recorded which can be seen in the Trace Viewer. A trace contains a traversable timeline showing the actions of a test and their implications on the DOM, network requests, console logs and so on.

As the test runs a video (in WebM format) and screenshot (in PNG format) of the final frame can be created which get stored alongside the trace files. These are great tools to have for use in CI.

The traces, videos and screenshots will appear automatically linked to relevant tests within the HTML report.

## Useful Links

- [Assertions](https://playwright.dev/docs/test-assertions)
- [Authentication](https://playwright.dev/docs/auth)
- [Annotations](https://playwright.dev/docs/test-annotations)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [Emulation](https://playwright.dev/docs/emulation)
- [Environment Variables](https://playwright.dev/docs/test-parameterize#passing-environment-variables)
- [Locators](https://playwright.dev/docs/locators)
- [Pages](https://playwright.dev/docs/pages)
- [Screenshots](https://playwright.dev/docs/screenshots)
- [Videos](https://playwright.dev/docs/videos)
- [Example: Testing Multiple Roles](https://playwright.dev/docs/auth#testing-multiple-roles-together)

- https://alisterbscott.com/2021/10/27/five-reasons-why-playwright-is-better-than-cypress/
