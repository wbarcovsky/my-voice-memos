import { test, beforeAll, describe, expect, afterAll } from '@jest/globals';
import puppeteer, { Browser, Page } from 'puppeteer';
import { compareScreenshot } from '../../../e2e/utils/compareScreenshot';

describe('MainCard.test.ts', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
  });

  test('contains the welcome text', async () => {
    await page.goto('http://localhost:8080');
    await page.waitForSelector('[data-test-id=title]');
    const text = await page.$eval('[data-test-id=title]', (e) => e.textContent);
    expect(text).toContain('My voice memos!!!');
    await compareScreenshot(page, '1.png');
  });

  afterAll(() => browser.close());
});
