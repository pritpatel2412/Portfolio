import { chromium } from 'playwright-core';
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
  console.log('Launching browser for Experience, About, and Résumé verification...');
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
  });

  // 1. Verify /experience
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/experience', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const darkPath = path.join(ARTIFACTS_DIR, `experience_${vp.name}_dark.png`);
    await page.screenshot({ path: darkPath, fullPage: false });
    console.log(`Saved: ${darkPath}`);

    // If desktop-1280: test keyboard expand on role
    if (vp.width === 1280) {
      const headerBtns = await page.$$('header[role="button"]');
      if (headerBtns.length > 1) {
        await headerBtns[1].press('Enter');
        await page.waitForTimeout(300);
        const expPath = path.join(ARTIFACTS_DIR, `experience_keyboard_expanded.png`);
        await page.screenshot({ path: expPath, fullPage: false });
        console.log(`Saved: ${expPath}`);
      }
    }

    await context.close();
  }

  // 2. Verify /about
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const aboutDark = path.join(ARTIFACTS_DIR, `about_${vp.name}_dark.png`);
    await page.screenshot({ path: aboutDark, fullPage: false });
    console.log(`Saved: ${aboutDark}`);

    await context.close();
  }

  // 3. Verify /resume (screen and print simulation)
  const resumeContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const resumePage = await resumeContext.newPage();
  await resumePage.goto('http://localhost:3000/resume', { waitUntil: 'networkidle' });
  await resumePage.waitForTimeout(400);

  // Screen view
  const resScreen = path.join(ARTIFACTS_DIR, `resume_desktop_screen.png`);
  await resumePage.screenshot({ path: resScreen, fullPage: false });
  console.log(`Saved: ${resScreen}`);

  // Print simulation (A4 / Letter single-page layout check)
  await resumePage.emulateMedia({ media: 'print' });
  await resumePage.waitForTimeout(300);
  const resPrint = path.join(ARTIFACTS_DIR, `resume_print_emulation_a4.png`);
  await resumePage.screenshot({ path: resPrint, fullPage: true });
  console.log(`Saved print emulation: ${resPrint}`);

  // Verify Person JSON-LD
  const jsonLdScript = await resumePage.$('script[type="application/ld+json"]');
  if (jsonLdScript) {
    const rawText = await jsonLdScript.innerText();
    const parsed = JSON.parse(rawText);
    console.log('Verified Person JSON-LD in DOM:', parsed['@type'], parsed.name);
  }

  await resumeContext.close();
  await browser.close();
  console.log('Profile routes verification completed successfully!');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
