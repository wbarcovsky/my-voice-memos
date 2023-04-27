import fs from 'fs';
import path from 'path';
import { Page, ScreenshotOptions } from 'puppeteer';
import looksSame, { LooksSameOptions } from 'looks-same';
import { expect } from '@jest/globals';

const fileExists = async (filepath: string): Promise<boolean> => {
  try {
    await fs.promises.readFile(filepath);
    return true;
  } catch (e) {
    return false;
  }
};

function getFilePath(filename: string, postfix: string = null): string {
  let newFileName = filename;
  if (postfix !== null) {
    const parts = filename.split('.');
    parts.splice(parts.length - 1, 0, postfix);
    newFileName = parts.join('.');
  }
  return path.join(__dirname, '..', 'screenshots', newFileName);
}

export async function compareScreenshot(page: Page, originalName: string, options: ScreenshotOptions = {}) {
  const originalPath = getFilePath(originalName);
  if (!(await fileExists(originalPath))) {
    throw new Error(`Image with name ${originalName} not found in ${originalPath}`);
  }
  const testImagePath = getFilePath(originalName, 'test-0');
  if (await fileExists(testImagePath)) {
    await fs.promises.unlink(testImagePath);
  }
  await page.screenshot({ path: testImagePath, ...options });
  const looksOptions: LooksSameOptions = {
    strict: false,
    tolerance: 2.5,
    antialiasingTolerance: 0,
    ignoreAntialiasing: true, // ignore antialising by default
    ignoreCaret: true
  };

  const res = await looksSame(originalPath, testImagePath, looksOptions);
  if (!res.equal) {
    await looksSame.createDiff({
      highlightColor: '#ff00ff', // color to highlight the differences
      reference: originalPath,
      current: testImagePath,
      diff: getFilePath(originalName, 'test-diff'),
      ...options
    });
  }
  expect(res.equal).toBeTruthy();
}
