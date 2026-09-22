import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', workers: 1, timeout: 60000,
  use: { baseURL: 'http://127.0.0.1:4173/anymaker-builder/', viewport: { width: 1500, height: 960 }, launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } },
  webServer: { command: 'npm run test:serve', url: 'http://127.0.0.1:4173/anymaker-builder/', reuseExistingServer: false },
});
