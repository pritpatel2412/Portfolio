import { chromium } from 'playwright-core';
import path from 'path';

const outDir = 'C:\\Users\\pritp\\.gemini\\antigravity-ide\\brain\\e0f603f9-d1c5-4097-b10f-d8753cc68f6e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function runPrompt6Audit() {
  console.log('Launching browser with Edge executable...');
  const browser = await chromium.launch({
    executablePath: edgePath,
    headless: true,
  });

  const baseUrl = 'http://localhost:3000';

  // 1. Audit Sitemap & Robots
  console.log('--- Checking Sitemap & Robots ---');
  const sitemapPage = await browser.newPage();
  const sitemapRes = await sitemapPage.goto(`${baseUrl}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  console.log(`Sitemap status: ${sitemapRes.status()}, length: ${sitemapText.length}`);
  console.log(`Sitemap contains /projects/redforge: ${sitemapText.includes('/projects/redforge') ? 'PASS' : 'FAIL'}`);
  console.log(`Sitemap contains /writing/ast-vs-regex: ${sitemapText.includes('ast-vs-regex') ? 'PASS' : 'FAIL'}`);
  await sitemapPage.close();

  const robotsPage = await browser.newPage();
  const robotsRes = await robotsPage.goto(`${baseUrl}/robots.txt`);
  const robotsText = await robotsRes.text();
  console.log(`Robots.txt status: ${robotsRes.status()}, allows /: ${robotsText.includes('Allow: /') ? 'PASS' : 'FAIL'}`);
  await robotsPage.close();

  // 2. Audit Dynamic OG Image Endpoint
  console.log('--- Checking Dynamic OpenGraph Endpoint ---');
  const ogPage = await browser.newPage();
  const ogRes = await ogPage.goto(`${baseUrl}/api/og?title=RedForge%20Security%20Scanner&category=COMPILERS`);
  const ogStatus = ogRes.status();
  const ogContentType = ogRes.headers()['content-type'];
  console.log(`OG image status: ${ogStatus}, content-type: ${ogContentType}`);
  await ogPage.close();

  // 3. Audit /contact Across 4 Viewports
  console.log('--- Checking Contact Page ---');
  const viewports = [
    { name: 'phone-375', width: 375, height: 812, isMobile: true },
    { name: 'tablet-768', width: 768, height: 1024, isMobile: false },
    { name: 'desktop-1280', width: 1280, height: 900, isMobile: false },
    { name: 'wide-1728', width: 1728, height: 1080, isMobile: false },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
    });
    await page.goto(`${baseUrl}/contact`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(300);

    // Overflow check
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`  [Contact ${vp.name}] Overflow: scroll=${scrollWidth}, client=${clientWidth} -> ${scrollWidth <= clientWidth ? 'PASS' : 'OVERFLOW'}`);

    // Screenshot
    await page.screenshot({
      path: path.join(outDir, `contact_${vp.name}_dark.png`),
      fullPage: false,
    });

    if (vp.name === 'desktop-1280') {
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(outDir, `contact_${vp.name}_lightbox.png`),
        fullPage: false,
      });
    }

    await page.close();
  }

  // 4. Test Contact Form Submission & Picks Pre-fill
  console.log('--- Testing Contact Form Interaction & Picks Pre-fill ---');
  const formPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await formPage.goto(`${baseUrl}/contact?picks=redforge,searchmind`, { waitUntil: 'networkidle' });

  // Verify picks indicator
  const hasPicksBadge = await formPage.locator('text=SHORTLISTED PICKS').first().isVisible();
  console.log(`  Picks indicator visible in form: ${hasPicksBadge}`);

  // Fill in form inputs
  await formPage.fill('#contact-name', 'Elena Rostova');
  await formPage.fill('#contact-email', 'elena@enterprise-sec.io');
  await formPage.click('button:has-text("$15k – $30k")');
  await formPage.click('button:has-text("Immediate")');

  // Submit form
  await formPage.click('button:has-text("DISPATCH MESSAGE")');
  await formPage.waitForTimeout(1000);

  // Check success state
  const hasSuccessTitle = await formPage.locator('text=Negative Received.').first().isVisible();
  console.log(`  M9 Success Developing state visible: ${hasSuccessTitle}`);
  await formPage.screenshot({
    path: path.join(outDir, 'contact_m9_success.png'),
    fullPage: false,
  });
  await formPage.close();

  // 5. Test 404 Blank Negative Page
  console.log('--- Checking 404 Page ---');
  const notFoundPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await notFoundPage.goto(`${baseUrl}/non-existent-overexposed-negative`, { waitUntil: 'networkidle' });
  await notFoundPage.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await notFoundPage.waitForTimeout(300);

  const has404Title = await notFoundPage.locator('text=Frame not found — this link was overexposed.').first().isVisible();
  const hasGreasePencil = await notFoundPage.locator('svg circle').first().isVisible();
  console.log(`  404 Title visible: ${has404Title}, Grease pencil X graphic: ${hasGreasePencil}`);

  await notFoundPage.screenshot({
    path: path.join(outDir, 'not_found_desktop_1280.png'),
    fullPage: false,
  });

  // Mobile 404
  await notFoundPage.setViewportSize({ width: 375, height: 812 });
  await notFoundPage.waitForTimeout(200);
  await notFoundPage.screenshot({
    path: path.join(outDir, 'not_found_mobile_375.png'),
    fullPage: false,
  });
  await notFoundPage.close();

  // 6. Test Keyboard Shortcuts (M12) & Console Hello (M11)
  console.log('--- Checking Keyboard Shortcuts & Console Hello ---');
  let consoleHelloLogged = false;
  const sysPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  sysPage.on('console', (msg) => {
    if (msg.type() === 'info' && msg.text().includes('PRIT PATEL')) {
      consoleHelloLogged = true;
    }
  });

  await sysPage.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await sysPage.waitForTimeout(400);
  console.log(`  M11 Console Hello logged in browser: ${consoleHelloLogged}`);

  // Press '?' to trigger shortcuts dialog
  await sysPage.keyboard.press('?');
  await sysPage.waitForTimeout(400);

  const shortcutsVisible = await sysPage.locator('#shortcuts-dialog-title').isVisible();
  const hasWcagToggle = await sysPage.locator('text=Disable single-key shortcuts').isVisible();
  console.log(`  M12 Shortcuts Dialog visible: ${shortcutsVisible}, WCAG 2.1.4 toggle present: ${hasWcagToggle}`);

  await sysPage.screenshot({
    path: path.join(outDir, 'shortcuts_modal_desktop.png'),
    fullPage: false,
  });

  await sysPage.close();
  await browser.close();

  console.log('Prompt 6 Audit Complete! All assertions finished.');
}

runPrompt6Audit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
