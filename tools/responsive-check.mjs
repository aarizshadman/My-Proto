/**
 * Responsive layout audit for the portfolio.
 *
 * Usage:
 *   npm run build && npm run preview   (terminal 1)
 *   node tools/responsive-check.mjs    (terminal 2)
 *
 * Optional env: BASE_URL, CHROME_PATH
 */
import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';
const WIDTHS = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const HEIGHT = 900;

const NAV_ITEMS = 8;

const issues = [];
const add = (width, message) => issues.push(`[${width}px] ${message}`);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const auditPage = `(() => {
  const vw = document.documentElement.clientWidth;
  const offenders = [];
  const visible = (el) => {
    const rects = el.getClientRects();
    if (!rects.length) return false;
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || style.opacity === '0') return false;
    return true;
  };
  const describe = (el) => {
    const cls = (el.className && typeof el.className === 'string')
      ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.')
      : '';
    return el.tagName.toLowerCase() + cls;
  };
  // Decorative elements are allowed to bleed past the viewport when an
  // ancestor clips them (overflow hidden/clip) or they ignore pointer input.
  const isDecorative = (el) => {
    if (el.closest('.hero-glow, .band-deco, .squiggle-divider, .pathway-svg, .cube-float')) {
      return true;
    }
    let node = el;
    while (node && node !== document.body) {
      const s = getComputedStyle(node);
      if (s.pointerEvents === 'none') return true;
      if (s.overflowX === 'hidden' || s.overflowX === 'clip') return true;
      node = node.parentElement;
    }
    return false;
  };
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (r.right > vw + 1 || r.left < -1) {
      if (isDecorative(el)) continue;
      offenders.push({
        node: describe(el),
        left: Math.round(r.left),
        right: Math.round(r.right),
        text: (el.textContent || '').trim().slice(0, 48),
      });
    }
  }

  const rectOf = (sel) => {
    const el = document.querySelector(sel);
    if (!el || !el.getClientRects().length) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
  };

  const overlaps = (a, b) =>
    a && b && a.left < b.right - 1 && b.left < a.right - 1 &&
    a.top < b.bottom - 1 && b.top < a.bottom - 1;

  const headerItems = ['.brand-link', '.site-header nav[aria-label="Main Navigation"]', '.header-actions']
    .map((sel) => ({ sel, rect: rectOf(sel) }))
    .filter((i) => i.rect);

  const headerOverlaps = [];
  for (let i = 0; i < headerItems.length; i++) {
    for (let j = i + 1; j < headerItems.length; j++) {
      if (overlaps(headerItems[i].rect, headerItems[j].rect)) {
        headerOverlaps.push(headerItems[i].sel + ' <> ' + headerItems[j].sel);
      }
    }
  }

  const navLinks = [...document.querySelectorAll('.nav-links a')].filter(
    (el) => el.getClientRects().length
  );
  const navLinkOverlaps = [];
  for (let i = 0; i < navLinks.length; i++) {
    for (let j = i + 1; j < navLinks.length; j++) {
      if (overlaps(navLinks[i].getBoundingClientRect(), navLinks[j].getBoundingClientRect())) {
        navLinkOverlaps.push(navLinks[i].textContent + ' <> ' + navLinks[j].textContent);
      }
    }
  }

  const burger = rectOf('.mobile-nav-btn');
  const actions = rectOf('.header-actions');
  const brand = rectOf('.brand-link');
  const headerRect = rectOf('.site-header');

  return {
    vw,
    docScrollWidth: document.documentElement.scrollWidth,
    docClientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders,
    headerOverlaps,
    navLinkOverlaps,
    desktopNavVisible: navLinks.length > 0,
    desktopNavCount: navLinks.length,
    burgerVisible: !!burger,
    burgerInsideActions: !burger || !actions ||
      (burger.left >= actions.left - 1 && burger.right <= actions.right + 1),
    brandClearOfActions: !brand || !actions || brand.right <= actions.left + 1,
    headerFits: !headerRect || (headerRect.left >= -1 && headerRect.right <= vw + 1),
  };
})()`;

const report = (width, label, data) => {
  if (data.docScrollWidth > data.docClientWidth + 1) {
    add(width, `${label}: page horizontal overflow ${data.docScrollWidth} > ${data.docClientWidth}`);
  }
  for (const o of data.offenders.slice(0, 8)) {
    add(width, `${label}: element past viewport [${o.node}] ${o.left}..${o.right} "${o.text}"`);
  }
  if (data.headerOverlaps.length) {
    add(width, `${label}: header overlap ${data.headerOverlaps.join(', ')}`);
  }
  if (data.navLinkOverlaps.length) {
    add(width, `${label}: nav link overlap ${data.navLinkOverlaps.join(', ')}`);
  }
  if (!data.headerFits) add(width, `${label}: header exceeds viewport`);
  if (!data.brandClearOfActions) add(width, `${label}: brand collides with header actions`);
  if (!data.burgerInsideActions) add(width, `${label}: hamburger button escapes header actions`);
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1'],
  defaultViewport: { width: 1280, height: HEIGHT },
});

for (const width of WIDTHS) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push('pageerror: ' + err.message));

  await page.setViewport({ width, height: HEIGHT, deviceScaleFactor: 1 });
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 30000 });
  await sleep(500);

  report(width, 'page', await page.evaluate(auditPage));

  // ---- Navigation mode -------------------------------------------------
  const navMode = await page.evaluate(() => {
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.mobile-nav-btn');
    const navVisible = !!nav && nav.getClientRects().length > 0;
    const burgerVisible = !!burger && burger.getClientRects().length > 0;
    return { navVisible, burgerVisible };
  });

  if (width >= 1024) {
    if (!navMode.navVisible) add(width, 'desktop navigation is hidden at desktop width');
    if (navMode.burgerVisible) add(width, 'hamburger button is visible at desktop width');
    const count = await page.$$eval('.nav-links a', (els) => els.length);
    if (count !== NAV_ITEMS) add(width, `expected ${NAV_ITEMS} nav links, found ${count}`);
  } else {
    if (navMode.navVisible) add(width, 'desktop navigation still shown below 1024px');
    if (!navMode.burgerVisible) add(width, 'hamburger button missing below 1024px');

    // Open drawer
    await page.click('.mobile-nav-btn');
    await sleep(250);
    const drawer = await page.evaluate(() => {
      const d = document.querySelector('.mobile-menu-drawer');
      if (!d || !d.getClientRects().length) return null;
      const r = d.getBoundingClientRect();
      const links = [...d.querySelectorAll('a.mobile-menu-link')];
      const vw = document.documentElement.clientWidth;
      return {
        count: links.length,
        labels: links.map((a) => a.textContent.trim()),
        overflows: r.right > vw + 1 || r.left < -1,
        expanded: document.querySelector('.mobile-nav-btn')?.getAttribute('aria-expanded'),
      };
    });
    if (!drawer) add(width, 'mobile drawer did not open');
    else {
      if (drawer.count !== NAV_ITEMS) add(width, `drawer has ${drawer.count} links, expected ${NAV_ITEMS}`);
      if (drawer.overflows) add(width, 'drawer overflows the viewport');
      if (drawer.expanded !== 'true') add(width, 'hamburger aria-expanded not set to true');
      report(width, 'drawer-open', await page.evaluate(auditPage));
    }

    // Escape closes it
    await page.keyboard.press('Escape');
    await sleep(200);
    const afterEsc = await page.$('.mobile-menu-drawer');
    if (afterEsc) add(width, 'drawer stayed open after Escape');

    // Outside click closes it
    await page.click('.mobile-nav-btn');
    await sleep(200);
    await page.mouse.click(Math.floor(width / 2), HEIGHT - 120);
    await sleep(250);
    const afterOutside = await page.$('.mobile-menu-drawer');
    if (afterOutside) add(width, 'drawer stayed open after outside click');

    // Keyboard focus reaches the drawer links
    await page.click('.mobile-nav-btn');
    await sleep(200);
    const focusPath = await page.evaluate(async () => {
      const first = document.querySelector('.mobile-menu-drawer a.mobile-menu-link');
      if (!first) return 'missing';
      first.focus();
      return document.activeElement === first ? 'ok' : 'not-focused';
    });
    if (focusPath !== 'ok') add(width, `drawer link focus failed (${focusPath})`);
    // Closing by activating a link
    await page.keyboard.press('Enter');
    await sleep(300);
    const afterLink = await page.$('.mobile-menu-drawer');
    if (afterLink) add(width, 'drawer stayed open after activating a link');
  }

  // ---- Command palette -------------------------------------------------
  await page.keyboard.down('Control');
  await page.keyboard.press('k');
  await page.keyboard.up('Control');
  await sleep(300);
  const cmdOpen = await page.$('.cmd-palette-modal');
  if (!cmdOpen) add(width, 'command palette did not open with Ctrl+K');
  else {
    report(width, 'command-palette', await page.evaluate(auditPage));
    await page.keyboard.press('Escape');
    await sleep(250);
  }

  // ---- Project modal ---------------------------------------------------
  await page.evaluate(() => {
    const btn = document.querySelector('.project-action-link');
    if (btn) btn.click();
  });
  await sleep(350);
  const projectModal = await page.$('.modal-container');
  if (!projectModal) add(width, 'project modal did not open');
  else {
    report(width, 'project-modal', await page.evaluate(auditPage));
    await page.keyboard.press('Escape');
    await sleep(250);
  }

  // ---- Essay modal -----------------------------------------------------
  await page.evaluate(() => {
    const card = document.querySelector('.essay-card');
    if (card) card.click();
  });
  await sleep(350);
  const essayModal = await page.$('.modal-container');
  if (!essayModal) add(width, 'essay modal did not open');
  else {
    report(width, 'essay-modal', await page.evaluate(auditPage));
    await page.keyboard.press('Escape');
    await sleep(250);
  }

  // ---- CV / resume modal ----------------------------------------------
  const cvVisible = await page.evaluate(
    () => !!document.querySelector('.cv-quick-btn')?.getClientRects().length
  );
  if (cvVisible) {
    await page.click('.cv-quick-btn');
  } else {
    await page.click('.mobile-nav-btn');
    await sleep(250);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('.mobile-menu-drawer button')].find((b) =>
        b.textContent.includes('Resume')
      );
      if (btn) btn.click();
    });
  }
  await sleep(350);
  const cvModal = await page.$('.modal-container');
  if (!cvModal) add(width, 'CV modal did not open');
  else {
    report(width, 'cv-modal', await page.evaluate(auditPage));
    await page.keyboard.press('Escape');
    await sleep(250);
  }

  // ---- Console ---------------------------------------------------------
  for (const err of consoleErrors) add(width, `console error: ${err}`);

  await page.close();
}

await browser.close();

if (issues.length) {
  console.log('ISSUES FOUND:\n');
  for (const i of issues) console.log(' - ' + i);
  console.log(`\n${issues.length} issue(s).`);
  process.exit(1);
} else {
  console.log('All responsive checks passed at: ' + WIDTHS.join(', '));
}
