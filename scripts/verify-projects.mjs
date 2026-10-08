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
  console.log('Launching browser for Projects & Case Study verification...');
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
  });

  // 1. Verify /projects index across viewports & themes
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'no-preference',
    });

    const page = await context.newPage();
    await page.goto('http://localhost:3000/projects', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Darkroom screenshot
    const darkPath = path.join(ARTIFACTS_DIR, `projects_${vp.name}_dark.png`);
    await page.screenshot({ path: darkPath, fullPage: false });
    console.log(`Saved: ${darkPath}`);

    // Lightbox screenshot
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(200);

    const lightPath = path.join(ARTIFACTS_DIR, `projects_${vp.name}_light.png`);
    await page.screenshot({ path: lightPath, fullPage: false });
    console.log(`Saved: ${lightPath}`);

    // If desktop-1280: test List View and Filter interactions
    if (vp.width === 1280) {
      console.log('Testing /projects List View toggle and filters...');
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });

      // Switch to List View
      const listBtn = await page.$('button[aria-label="List view"]');
      if (listBtn) {
        await listBtn.click();
        await page.waitForTimeout(400);

        const listPath = path.join(ARTIFACTS_DIR, `projects_list_view_desktop.png`);
        await page.screenshot({ path: listPath, fullPage: false });
        console.log(`Saved: ${listPath}`);

        // Switch back to grid
        const gridBtn = await page.$('button[aria-label="Contact sheet view"]');
        if (gridBtn) await gridBtn.click();
      }

      // Filter by Security
      const secBtn = await page.$('button:has-text("Security")');
      if (secBtn) {
        await secBtn.click();
        await page.waitForTimeout(500);

        const filterPath = path.join(ARTIFACTS_DIR, `projects_filtered_security.png`);
        await page.screenshot({ path: filterPath, fullPage: false });
        console.log(`Saved: ${filterPath}`);
      }
    }

    await context.close();
  }

  // 2. Verify Full Case Study (/projects/redforge) across viewports & lightbox
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'no-preference',
    });

    const page = await context.newPage();
    await page.goto('http://localhost:3000/projects/redforge', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const csPath = path.join(ARTIFACTS_DIR, `casestudy_redforge_${vp.name}_dark.png`);
    await page.screenshot({ path: csPath, fullPage: false });
    console.log(`Saved: ${csPath}`);

    // Test Lightbox on desktop-1280
    if (vp.width === 1280) {
      console.log('Testing case study Lightbox on RedForge...');
      // Scroll to screens section
      await page.evaluate(() => {
        const el = document.getElementById('screens');
        if (el) el.scrollIntoView();
      });
      await page.waitForTimeout(500);

      const archPath = path.join(ARTIFACTS_DIR, `casestudy_redforge_architecture_screens.png`);
      await page.screenshot({ path: archPath, fullPage: false });
      console.log(`Saved: ${archPath}`);

      const imgBtn = await page.$('button[aria-label*="Open lightbox"]');
      if (imgBtn) {
        await imgBtn.click();
        await page.waitForTimeout(400);

        const lbPath = path.join(ARTIFACTS_DIR, `casestudy_redforge_lightbox_open.png`);
        await page.screenshot({ path: lbPath, fullPage: false });
        console.log(`Saved: ${lbPath}`);

        // Dismiss via Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
      }
    }

    await context.close();
  }

  // 3. Verify Short Variant (/projects/kemlang)
  const shortContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const shortPage = await shortContext.newPage();
  await shortPage.goto('http://localhost:3000/projects/kemlang', { waitUntil: 'networkidle' });
  await shortPage.waitForTimeout(500);

  const shortPath = path.join(ARTIFACTS_DIR, `casestudy_kemlang_short_variant.png`);
  await shortPage.screenshot({ path: shortPath, fullPage: false });
  console.log(`Saved: ${shortPath}`);
  await shortContext.close();

  await browser.close();
  console.log('Projects and Case Studies verification complete!');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
