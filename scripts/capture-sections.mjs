import { chromium } from 'playwright-core';
import path from 'path';

const outDir = 'C:\\Users\\pritp\\.gemini\\antigravity-ide\\brain\\e0f603f9-d1c5-4097-b10f-d8753cc68f6e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function captureSections() {
  const browser = await chromium.launch({ executablePath: edgePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(400);

  // Selected Work
  const selectedWork = page.locator('#selected-work');
  await selectedWork.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'home_selected_work.png'), fullPage: false });

  // Work with Me
  const workWithMe = page.locator('section[aria-label="Ways to Engage"]');
  await workWithMe.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'home_work_with_me.png'), fullPage: false });

  // Stack Matrix
  const stackMatrix = page.locator('section[aria-label="Technology Stack Matrix"]');
  await stackMatrix.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'home_stack_matrix.png'), fullPage: false });

  // Writing
  const writing = page.locator('section[aria-label="Recent Technical Writing"]');
  await writing.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'home_writing_teaser.png'), fullPage: false });

  await browser.close();
  console.log('Section screenshots complete!');
}

captureSections().catch((err) => {
  console.error(err);
  process.exit(1);
});
