import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homeUrl = new URL('../src/components/HomePage.tsx', import.meta.url);

test('homepage hero uses the approved editorial assets and content', async () => {
  const source = await readFile(homeUrl, 'utf8');

  assert.match(source, /\/brand\/coptr-white-text-logo\.webp/);
  assert.match(source, /\/brand\/coptr-white-circle-logo\.webp/);
  assert.match(source, /\/profile\/coptr-sunglasses\.webp/);
  assert.match(source, /\/profile\/coptr-dj-performance-photo\.webp/);
  assert.match(source, /Helicopter Pilot by Day, Bass Architect by Night/);
  assert.match(source, /to=\{latestReleases\[0\]\.fanLink\}/);
  assert.doesNotMatch(source, /MELODIC DUBSTEP|BROSTEP|BASS HOUSE/);
});

test('homepage hero social links are icon only and accessible', async () => {
  const source = await readFile(homeUrl, 'utf8');

  assert.match(source, /aria-label=\{`Open Coptr on \$\{social\.name\}`\}/);
  assert.match(source, /alt=""/);
  assert.doesNotMatch(source, /<span[^>]*>\s*\{social\.name\}\s*<\/span>/s);
});
