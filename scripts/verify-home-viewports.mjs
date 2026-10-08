import { chromium } from 'playwright-core';
import path from 'path';

const outDir = 'C:\\Users\\pritp\\.gemini\\antigravity-ide\\brain\\e0f603f9-d1c5-4097-b10f-d8753cc68f6e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function runAudit() {
  console.log('Launching browser with Edge executable...');
  const browser = await chromium.launch({
    executablePath: edgePath,
    headless: true,
  });

  const url = 'http://localhost:3000/';

  // 1. Desktop 1280x900 (Darkroom)
  console.log('Capturing Desktop 1280px Darkroom...');
  const page1280 = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page1280.goto(url, { waitUntil: 'networkidle' });
  await page1280.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page1280.waitForTimeout(400);
  await page1280.screenshot({ path: path.join(outDir, 'home_1280_dark.png'), fullPage: false });

  // Audit 5-second test requirements in DOM
  const hasWordmark = await page1280.locator('text=PRIT PATEL').first().isVisible();
  const hasPositioning = await page1280.locator('text=I build resilient backend systems').first().isVisible();
  const hasProof = await page1280.locator('text=400+').first().isVisible();
  const hasContact = await page1280.locator('text=Get in touch').first().isVisible();
  console.log(`5-Second Test Criteria Check:
  - Name Visible: ${hasWordmark}
  - Positioning Visible: ${hasPositioning}
  - Proof Point Visible: ${hasProof}
  - Contact Reachable: ${hasContact}`);

  // Test Lightbox Theme
  console.log('Switching to Lightbox mode...');
  await page1280.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page1280.waitForTimeout(500);
  await page1280.screenshot({ path: path.join(outDir, 'home_1280_lightbox.png'), fullPage: false });

  // 2. Mobile 375x812 (Darkroom)
  console.log('Capturing Mobile 375px Darkroom...');
  const page375 = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });
  await page375.goto(url, { waitUntil: 'networkidle' });
  await page375.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page375.waitForTimeout(400);
  await page375.screenshot({ path: path.join(outDir, 'home_375_dark.png'), fullPage: false });

  // Check horizontal overflow
  const scrollWidth = await page375.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page375.evaluate(() => document.documentElement.clientWidth);
  console.log(`Mobile Overflow Check: scrollWidth=${scrollWidth}, clientWidth=${clientWidth} -> ${scrollWidth <= clientWidth ? 'PASS (No horizontal overflow)' : 'FAIL'}`);

  // 3. Tablet 768x1024 (Darkroom)
  console.log('Capturing Tablet 768px Darkroom...');
  const page768 = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await page768.goto(url, { waitUntil: 'networkidle' });
  await page768.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page768.waitForTimeout(400);
  await page768.screenshot({ path: path.join(outDir, 'home_768_dark.png'), fullPage: false });

  // 4. Large Desktop 1728x1080 (Darkroom)
  console.log('Capturing Large Desktop 1728px Darkroom...');
  const page1728 = await browser.newPage({ viewport: { width: 1728, height: 1080 } });
  await page1728.goto(url, { waitUntil: 'networkidle' });
  await page1728.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page1728.waitForTimeout(400);
  await page1728.screenshot({ path: path.join(outDir, 'home_1728_dark.png'), fullPage: false });

  // 5. Test Copy Email & Toast
  console.log('Testing Copy Email Toast...');
  await page1280.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  const copyBtn = page1280.locator('button[aria-label*="Copy email"]').first();
  await copyBtn.scrollIntoViewIfNeeded();
  await copyBtn.click();
  await page1280.waitForTimeout(400);
  const toastVisible = await page1280.locator('text=Copied. Say hi.').first().isVisible();
  console.log(`Toast "Copied. Say hi." Visible: ${toastVisible}`);
  await page1280.screenshot({ path: path.join(outDir, 'home_toast_active.png'), fullPage: false });

  await browser.close();
  console.log('Multi-viewport captures and verification complete!');
}

runAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
