/**
 * Screenshot the portfolio at desktop + mobile widths.
 *
 * Usage:
 *   npm run build && npm run preview   (terminal 1)
 *   node tools/screenshot.mjs          (terminal 2)
 *
 * Optional env: BASE_URL, CHROME_PATH
 */
import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const shots = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
];

for (const shot of shots) {
  const page = await browser.newPage();
  await page.setViewport({ width: shot.width, height: shot.height });
  await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(400);

  // Scroll through the page to trigger all IntersectionObserver reveals,
  // then return to top so the full-page screenshot captures everything.
  await page.evaluate(async () => {
    const step = 300;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({
    path: `screenshots/${shot.name}.png`,
    fullPage: true,
  });
  console.log(`Saved screenshots/${shot.name}.png`);
  await page.close();
}

await browser.close();
