import puppeteer from 'puppeteer-core';

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';
const OUT = 'C:/Users/HP/OneDrive/Desktop/aariz proto/screenshots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const theme of ['light', 'dark']) {
  for (const width of [1440, 1300, 1024, 375]) {
    const page = await browser.newPage();
    await page.evaluateOnNewDocument((t) => {
      localStorage.setItem('aariz_theme', t);
    }, theme);
    await page.setViewport({ width, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(900);

    const info = await page.evaluate(() => {
      const sec = document.querySelector('#about');
      const card = document.querySelector('.hero-portrait');
      const h1 = document.querySelector('.hero-title');
      const cr = card.getBoundingClientRect();
      const hr = h1.getBoundingClientRect();
      const r = sec.getBoundingClientRect();
      const overlap = cr.left < hr.right && hr.left < cr.right && cr.top < hr.bottom && hr.top < cr.bottom;
      return {
        vw: document.documentElement.clientWidth,
        scrollW: document.documentElement.scrollWidth,
        card: { w: Math.round(cr.width), h: Math.round(cr.height), l: Math.round(cr.left), r: Math.round(cr.right), t: Math.round(cr.top) },
        h1: { l: Math.round(hr.left), r: Math.round(hr.right), t: Math.round(hr.top), b: Math.round(hr.bottom) },
        overlapsHeadline: overlap,
        pastRight: cr.right > document.documentElement.clientWidth + 1,
        theme: document.documentElement.getAttribute('data-theme'),
        clip: {
          x: 0,
          y: Math.round(r.top + window.scrollY),
          width: document.documentElement.clientWidth,
          height: Math.min(sec.offsetHeight, 860),
        },
      };
    });

    const { clip, ...rest } = info;
    await page.screenshot({ path: `${OUT}/portrait-${width}-${theme}.png`, clip });
    console.log(`${width}/${theme}`, JSON.stringify(rest));
    await page.close();
  }
}

await browser.close();
