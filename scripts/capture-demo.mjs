// capture a demo walk-through of kindling.
// produces: docs/demo/*.png + docs/demo/walkthrough.webm
import { chromium } from 'playwright';
import { mkdirSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve(process.cwd(), 'docs/demo');
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

const BASE = process.env.DEMO_URL || 'http://localhost:5173';

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function shoot(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log(`  · captured ${name}.png`);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    recordVideo: { dir: OUT, size: { width: 1400, height: 900 } },
  });
  const page = await context.newPage();

  // wipe local storage between runs so demo is deterministic
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  console.log('1. empty shelf');
  await shoot(page, '01-empty-shelf');

  // scroll to the sample bookshelf
  console.log('2. samples bookshelf');
  await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'instant' }));
  await sleep(500);
  await shoot(page, '02-samples-shelf');

  // click maa spine
  console.log('3. opening maa');
  const maaSpine = page.locator('button[aria-label="open maa\'s notebook"]');
  await maaSpine.click();
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await sleep(400);
  await shoot(page, '03-maa-volume-top');

  // scroll to first entry with its margin note
  await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'instant' }));
  await sleep(600);
  await shoot(page, '04-maa-entry-margin');

  // scroll further to show a second entry
  await page.evaluate(() => window.scrollBy({ top: 520, behavior: 'instant' }));
  await sleep(600);
  await shoot(page, '05-maa-entries-more');

  // go back to top and click "ask kindling"
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await sleep(400);
  const askBtn = page.getByRole('button', { name: /ask kindling for a gift idea/i });
  await askBtn.click();
  await page.waitForTimeout(700);

  console.log('6. ask panel — pick birthday');
  const birthdayPill = page.getByRole('button', { name: /^birthday$/i });
  await birthdayPill.click();
  await sleep(500);
  // scroll to show the ask panel
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'instant' }));
  await sleep(300);
  await shoot(page, '06-ask-panel-open');

  const constraintsBox = page.locator('textarea').first();
  await constraintsBox.fill('£50 budget. goes home in may.');
  await sleep(500);
  await shoot(page, '07-ask-panel-filled');

  // press "ask kindling" inside the panel
  console.log('8. pencil-line loading');
  const askSubmit = page.getByRole('button', { name: /^ask kindling$/i });
  await askSubmit.click();
  await sleep(1400);
  await shoot(page, '08-ask-pencil-loading');

  // wait for result to fully render (2.8s delay + staged reveals)
  console.log('9. result revealed');
  await sleep(4200);
  await shoot(page, '09-ask-result');

  // scroll down for the do-not-get-them + verdict
  await page.evaluate(() => window.scrollBy({ top: 520, behavior: 'instant' }));
  await sleep(600);
  await shoot(page, '10-ask-result-full');

  // go back to shelf for a final frame — shelf with a populated volume
  console.log('11. shelf after interaction');
  const backBtn = page.getByRole('button', { name: /← back to shelf/i });
  await backBtn.click();
  await sleep(700);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await sleep(500);
  await shoot(page, '11-shelf-populated');

  // hover a spine for caption
  const riyaOrMaa = page.locator('button[aria-label^="open "]').first();
  await riyaOrMaa.hover();
  await sleep(900);
  await shoot(page, '12-shelf-hover-caption');

  console.log('closing…');
  await page.waitForTimeout(500);
  const video = page.video();
  await context.close();
  await browser.close();
  if (video) {
    const p = await video.path();
    console.log('video saved at:', p);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
