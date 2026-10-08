import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/pritp/.gemini/antigravity-ide/brain/e0f603f9-d1c5-4097-b10f-d8753cc68f6e';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const VIEWPORTS = [
  { name: 'phone-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'wide-1728', width: 1728, height: 1080 },
];

async function run() {
  console.log('Launching browser for Motion Lab verification...');
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
  });

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'no-preference',
    });

    const page = await context.newPage();
    await page.goto('http://localhost:3000/dev/moments', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Darkroom theme screenshot
    const darkPath = path.join(ARTIFACTS_DIR, `moments_${vp.name}_dark.png`);
    await page.screenshot({ path: darkPath, fullPage: false });
    console.log(`Saved: ${darkPath}`);

    // Switch to Lightbox theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(300);

    const lightPath = path.join(ARTIFACTS_DIR, `moments_${vp.name}_light.png`);
    await page.screenshot({ path: lightPath, fullPage: false });
    console.log(`Saved: ${lightPath}`);

    // If desktop-1280: test interactive Picks mark button & modal tray
    if (vp.width === 1280) {
      console.log('Testing interactive M5 Picks mark button and tray...');
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });

      // Find first mark button in M5 stage
      const markButtons = await page.$$('button[aria-label*="Mark"]');
      if (markButtons.length > 0) {
        await markButtons[0].click();
        await page.waitForTimeout(500);

        // Capture screenshot of marked frame card with grease pencil ellipse
        const markedCardPath = path.join(ARTIFACTS_DIR, `moments_m5_marked_card.png`);
        await page.screenshot({ path: markedCardPath, fullPage: false });
        console.log(`Saved marked card screenshot: ${markedCardPath}`);

        // Scroll to top so fixed header is visible
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForTimeout(400);

        // Click picks chip in header
        const picksChip = await page.$('button[aria-label*="Open shortlisted project picks tray"]');
        if (picksChip) {
          await picksChip.click();
          await page.waitForTimeout(500);

          // Capture screenshot of open PicksTray dialog
          const trayPath = path.join(ARTIFACTS_DIR, `moments_m5_picks_tray_open.png`);
          await page.screenshot({ path: trayPath, fullPage: false });
          console.log(`Saved open picks tray screenshot: ${trayPath}`);

          // Test Escape key dismissal
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
        }
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('Verification completed successfully!');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
