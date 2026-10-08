// Contrast verification script per Brief §4 and §10
// Tests WCAG 2.1 AA/AAA contrast ratios for all Darkroom & Lightbox token pairs.

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function sRgbToLinear(c) {
  const norm = c / 255;
  return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * sRgbToLinear(r) +
    0.7152 * sRgbToLinear(g) +
    0.0722 * sRgbToLinear(b)
  );
}

function getContrast(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const tests = [
  // Darkroom (Dark)
  { theme: 'Darkroom', name: 'Text on Canvas Bg', fg: '#EDE8DF', bg: '#0A0908', target: 4.5 },
  { theme: 'Darkroom', name: 'Text on Surface', fg: '#EDE8DF', bg: '#14110F', target: 4.5 },
  { theme: 'Darkroom', name: 'Text on Surface-2', fg: '#EDE8DF', bg: '#1D1916', target: 4.5 },
  { theme: 'Darkroom', name: 'Text-Dim on Canvas Bg', fg: '#A39B8F', bg: '#0A0908', target: 4.5 },
  { theme: 'Darkroom', name: 'Safelight on Canvas Bg (UI/Hero)', fg: '#FF5B2E', bg: '#0A0908', target: 3.0 },
  { theme: 'Darkroom', name: 'Bg Text on Safelight Button Fill', fg: '#0A0908', bg: '#FF5B2E', target: 4.5 },

  // Lightbox (Light)
  { theme: 'Lightbox', name: 'Text on Canvas Bg', fg: '#14110F', bg: '#F1EDE4', target: 4.5 },
  { theme: 'Lightbox', name: 'Text on Surface', fg: '#14110F', bg: '#FAF8F3', target: 4.5 },
  { theme: 'Lightbox', name: 'Text on Surface-2', fg: '#14110F', bg: '#E8E2D6', target: 4.5 },
  { theme: 'Lightbox', name: 'Text-Dim on Canvas Bg', fg: '#5E574E', bg: '#F1EDE4', target: 4.5 },
  { theme: 'Lightbox', name: 'Safelight on Canvas Bg (UI/Accent)', fg: '#C22E09', bg: '#F1EDE4', target: 4.5 },
  { theme: 'Lightbox', name: 'Canvas Bg on Safelight Button Fill', fg: '#F1EDE4', bg: '#C22E09', target: 4.5 },
];

console.log('------------------------------------------------------------');
console.log('DARKROOM DESIGN SYSTEM — CONTRAST RATIO AUDIT (WCAG 2.1 AA)');
console.log('------------------------------------------------------------\n');

let allPassed = true;

for (const test of tests) {
  const ratio = getContrast(test.fg, test.bg);
  const passed = ratio >= test.target;
  const status = passed ? '✓ PASS' : '✗ FAIL';
  if (!passed) allPassed = false;

  console.log(
    `[${test.theme.padEnd(8)}] ${test.name.padEnd(35)} : ${ratio.toFixed(2)}:1 (Min ${test.target}:1) -> ${status}`
  );
}

console.log('\n------------------------------------------------------------');
if (allPassed) {
  console.log('RESULT: ALL 12 TOKEN CONTRAST PAIRS PASSED WCAG 2.1 AA GATES.');
  process.exit(0);
} else {
  console.error('RESULT: SOME CONTRAST PAIRS FAILED. PLEASE ADJUST TOKENS.');
  process.exit(1);
}
