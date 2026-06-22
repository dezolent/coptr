import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const appUrl = new URL('../src/App.tsx', import.meta.url);
const navigationUrl = new URL('../src/components/Navigation.tsx', import.meta.url);
const galleryUrl = new URL('../src/components/GalleryPage.tsx', import.meta.url);

test('gallery page, route, import, and navigation entry are removed', async () => {
  const [appSource, navigationSource] = await Promise.all([
    readFile(appUrl, 'utf8'),
    readFile(navigationUrl, 'utf8'),
  ]);

  assert.equal(existsSync(galleryUrl), false);
  assert.doesNotMatch(appSource, /GalleryPage|\/gallery/i);
  assert.doesNotMatch(navigationSource, /Gallery|\/gallery/i);
});
