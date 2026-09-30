# Playwright JavaScript Automation Framework v2

Enterprise-style starter framework for UI + API automation.

## Included

- JavaScript + Playwright Test
- Page Object Model
- Custom Fixtures
- UI + API automation
- Faker test data
- Environment variables with dotenv
- Reusable API helper
- Logger utility
- Authentication/storageState helper
- Smoke and regression tags
- Chromium + Firefox
- Parallel execution
- Retry on CI
- Screenshot/video/trace on failure
- HTML report
- Allure reporter
- GitHub Actions CI

## Setup

```bash
npm install
npm -v
npx playwright install
npm install sharp
cp .env.example .env
```

## Run

```bash
npm test
npm run test:headed
npm run test:debug
npm run test:smoke
npm run test:regression
npm run test:api
npm run test:ui
npm run report
```

## Allure

Install Allure CLI separately if needed, then:

```bash
npm run allure:generate
npm run allure:open
```

## FAQ 


