import { chromium } from 'playwright-core';
import path from 'path';

const outDir = 'C:\\Users\\pritp\\.gemini\\antigravity-ide\\brain\\e0f603f9-d1c5-4097-b10f-d8753cc68f6e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function runWritingAudit() {
  console.log('Launching browser with Edge executable...');
  const browser = await chromium.launch({
    executablePath: edgePath,
    headless: true,
  });

  const baseUrl = 'http://localhost:3000';
  const writingUrl = `${baseUrl}/writing`;
  const essayUrl = `${baseUrl}/writing/ast-vs-regex-security-scanners`;
  const rssUrl = `${baseUrl}/rss.xml`;

  // 1. Audit RSS XML
  console.log('Auditing RSS feed at', rssUrl);
  const rssPage = await browser.newPage();
  const rssRes = await rssPage.goto(rssUrl);
  const rssStatus = rssRes.status();
  const rssText = await rssRes.text();
  console.log(`RSS Feed Check: Status = ${rssStatus}, Length = ${rssText.length} bytes`);
  console.log(`Contains 3 articles in RSS: ${rssText.includes('ast-vs-regex') && rssText.includes('low-latency-rag') && rssText.includes('building-a-regional-compiler') ? 'PASS' : 'FAIL'}`);
  await rssPage.close();

  // 2. Audit /writing Index at 4 Viewports
  const viewports = [
    { name: 'phone-375', width: 375, height: 812, isMobile: true },
    { name: 'tablet-768', width: 768, height: 1024, isMobile: false },
    { name: 'desktop-1280', width: 1280, height: 900, isMobile: false },
    { name: 'wide-1728', width: 1728, height: 1080, isMobile: false },
  ];

  for (const vp of viewports) {
    console.log(`Auditing /writing on ${vp.name}...`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
    });
    await page.goto(writingUrl, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(300);

    // Screenshot dark
    await page.screenshot({
      path: path.join(outDir, `writing_${vp.name}_dark.png`),
      fullPage: false,
    });

    // Check overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`  [Writing ${vp.name}] Overflow: scroll=${scrollWidth}, client=${clientWidth} -> ${scrollWidth <= clientWidth ? 'PASS' : 'OVERFLOW'}`);

    // If desktop-1280, also test Lightbox
    if (vp.name === 'desktop-1280') {
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(outDir, `writing_${vp.name}_lightbox.png`),
        fullPage: false,
      });
    }

    await page.close();
  }

  // 3. Audit Longform Essay /writing/ast-vs-regex-security-scanners
  for (const vp of viewports) {
    console.log(`Auditing /writing/[slug] on ${vp.name}...`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
    });
    await page.goto(essayUrl, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(300);

    // Screenshot top
    await page.screenshot({
      path: path.join(outDir, `essay_${vp.name}_dark.png`),
      fullPage: false,
    });

    // Scroll halfway to verify reading progress and sticky TOC
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(outDir, `essay_${vp.name}_scroll_dark.png`),
      fullPage: false,
    });

    // Check overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`  [Essay ${vp.name}] Overflow: scroll=${scrollWidth}, client=${clientWidth} -> ${scrollWidth <= clientWidth ? 'PASS' : 'OVERFLOW'}`);

    // Lightbox on desktop
    if (vp.name === 'desktop-1280') {
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(outDir, `essay_${vp.name}_lightbox.png`),
        fullPage: false,
      });
    }

    await page.close();
  }

  // 4. Test Interactive Elements (Code Copy, Heading Anchor)
  console.log('Testing Code block copy button and Heading anchor...');
  const interactivePage = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });
  await interactivePage.goto(essayUrl, { waitUntil: 'networkidle' });

  // Check code block
  const copyBtn = interactivePage.locator('button[title="Copy code"]').first();
  const copyBtnVisible = await copyBtn.isVisible();
  console.log(`  Code copy button visible: ${copyBtnVisible}`);

  // Check TOC
  const tocNav = interactivePage.locator('nav[aria-label="Table of Contents"]');
  const tocVisible = await tocNav.isVisible();
  console.log(`  Sticky TOC visible on desktop: ${tocVisible}`);

  // Check Heading copy link
  const headingAnchor = interactivePage.locator('a[aria-label*="Copy link to section"]').first();
  const anchorVisible = await headingAnchor.isVisible();
  console.log(`  Heading anchor link visible: ${anchorVisible}`);

  await interactivePage.close();
  await browser.close();

  console.log('Audit completed successfully!');
}

runWritingAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
