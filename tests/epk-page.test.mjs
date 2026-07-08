import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const appUrl = new URL('../src/App.tsx', import.meta.url);
const navigationUrl = new URL('../src/components/Navigation.tsx', import.meta.url);
const epkUrl = new URL('../src/components/EpkPage.tsx', import.meta.url);
const cssUrl = new URL('../src/index.css', import.meta.url);

test('app exposes the EPK page at the primary EPK route and existing press-kit alias', async () => {
  const source = await readFile(appUrl, 'utf8');

  assert.match(source, /import EpkPage from ['"]\.\/components\/EpkPage['"]/);
  assert.match(source, /<Route path="\/epk" element=\{<EpkPage \/>\} \/>/);
  assert.match(source, /<Route path="\/press-kit" element=\{<EpkPage \/>\} \/>/);
});

test('navigation uses EPK as the promoter-facing label', async () => {
  const source = await readFile(navigationUrl, 'utf8');

  assert.match(source, /\{ path: '\/epk', label: 'EPK' \}/);
  assert.doesNotMatch(source, /\{ path: '\/press-kit', label: 'Press Kit' \}/);
});

test('EPK page is a single-sheet promoter brief with the requested positioning copy', async () => {
  assert.ok(existsSync(epkUrl), 'EpkPage.tsx should exist');
  const source = await readFile(epkUrl, 'utf8');

  assert.match(source, /max-w-\[980px\]/);
  assert.match(source, /print:w-\[8\.5in\]/);
  assert.match(source, /print:min-h-\[11in\]/);
  assert.match(source, /Brickell-based helicopter pilot turned DJ/);
  assert.match(source, /aviation-inspired audiovisual identity/);
  assert.match(source, /Virtual Riot, Subtronics, Crankdat, Tape B/);
  assert.match(source, /Local opening slots/);
});

test('EPK page uses layered Coptr imagery with Miami and aviation cues', async () => {
  const source = await readFile(epkUrl, 'utf8');

  assert.match(source, /\/brand\/coptr-white-text-logo\.webp/);
  assert.match(source, /\/brand\/coptr-white-circle-logo\.webp/);
  assert.match(source, /\/profile\/coptr-sunglasses\.webp/);
  assert.match(source, /\/profile\/coptr-dj-performance-photo\.webp/);
  assert.match(source, /\/profile\/coptr-banner\.webp/);
  assert.match(source, /Miami/);
  assert.match(source, /flight plan/i);
  assert.match(source, /aria-hidden="true"\s+className="absolute right-6 top-6 h-24 w-24/);
  assert.match(source, /aria-hidden="true"\s+className="absolute right-6 top-6 h-px w-24/);
});

test('EPK page includes icon links for socials, email, opener mix, and CRUISIN fanlink', async () => {
  const source = await readFile(epkUrl, 'utf8');

  assert.match(source, /import \{ socials \} from ['"]\.\.\/data\/socials['"]/);
  assert.match(source, /Spotify/);
  assert.match(source, /SoundCloud/);
  assert.match(source, /Apple Music/);
  assert.match(source, /YouTube/);
  assert.match(source, /Instagram/);
  assert.match(source, /TikTok/);
  assert.match(source, /mailto:paul\.f\.gerlach@gmail\.com/);
  assert.match(source, /support-mix-take1\/s-UkMCcLh93Uo/);
  assert.match(source, /const cruisin = getSongById\('cruisin'\)/);
  assert.match(source, /to=\{cruisin\?\.fanLink \?\? '\/stream\/cruisin'\}/);
  assert.match(source, /aria-label=\{`Open \$\{link\.name\}`\}/);
  assert.match(source, /src=\{link\.image\}/);
});

test('EPK page visually prioritizes the support mix and separates reader sections', async () => {
  const source = await readFile(epkUrl, 'utf8');

  assert.match(source, /PRIMARY LISTEN/);
  assert.match(source, /Sample Opener Mix/);
  assert.match(source, /shadow-\[0_22px_70px_rgba\(253,70,240,0\.28\)\]/);
  assert.match(source, /bg-\[linear-gradient\(135deg,rgba\(4,93,237,0\.26\),rgba\(253,70,240,0\.18\),rgba\(112,255,223,0\.12\)\)\]/);
});

test('EPK page includes a direct PDF download action outside the EPK sheet', async () => {
  const source = await readFile(epkUrl, 'utf8');

  assert.match(source, /Download/);
  assert.match(source, /aria-label="Download EPK as PDF"/);
  assert.match(source, /const epkPdfUrl = '\/coptr-epk\.pdf'/);
  assert.match(source, /href=\{epkPdfUrl\}/);
  assert.match(source, /download="coptr-epk\.pdf"/);
  assert.match(source, />\s*Download EPK PDF\s*</);
  assert.match(source, /print:hidden/);
  assert.doesNotMatch(source, /window\.print\(\)/);
});

test('print styles preserve the EPK design and hide site chrome from the PDF', async () => {
  const [cssSource, navigationSource] = await Promise.all([
    readFile(cssUrl, 'utf8'),
    readFile(navigationUrl, 'utf8'),
  ]);

  assert.match(cssSource, /@page\s*\{/);
  assert.match(cssSource, /size: letter/);
  assert.match(cssSource, /margin: 0/);
  assert.match(cssSource, /-webkit-print-color-adjust: exact/);
  assert.match(cssSource, /print-color-adjust: exact/);
  assert.match(navigationSource, /print:hidden/);
});
