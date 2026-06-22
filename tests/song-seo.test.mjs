import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const generatorUrl = new URL('../scripts/generate-song-pages.mjs', import.meta.url);
const pageUrl = new URL('../src/components/SongDetailsPage.tsx', import.meta.url);
const seoComponentUrl = new URL('../src/components/SongSeo.tsx', import.meta.url);
const seoDataUrl = new URL('../src/utils/songSeo.ts', import.meta.url);
const packageUrl = new URL('../package.json', import.meta.url);

async function loadTypeScriptModule(url) {
  assert.ok(existsSync(url), `${url.pathname} should exist`);
  const source = await readFile(url, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });

  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}

const sampleSong = {
  artist: 'Coptr',
  title: "CRUISIN'",
  coverArt: '/covers/coptr-cruisin.webp',
  fanLink: '/stream/cruisin',
};

test('song SEO data uses artist-title format and an absolute cover image', async () => {
  const { getSongSeo } = await loadTypeScriptModule(seoDataUrl);
  const seo = getSongSeo(sampleSong, 'https://coptr.me/');

  assert.equal(seo.title, "Coptr - CRUISIN'");
  assert.equal(seo.image, 'https://coptr.me/covers/coptr-cruisin.webp');
  assert.equal(seo.url, 'https://coptr.me/stream/cruisin');
});

test('build-time song HTML contains featured image and social metadata', async () => {
  assert.ok(existsSync(generatorUrl), 'song page generator should exist');
  const { renderSongHtml } = await import(generatorUrl.href);
  const html = renderSongHtml(
    '<html><head><title>Coptr | Official Website</title></head><body></body></html>',
    sampleSong,
    'https://coptr.me',
  );

  assert.match(html, /<title>Coptr - CRUISIN&#39;<\/title>/);
  assert.match(html, /property="og:title" content="Coptr - CRUISIN&#39;"/);
  assert.match(html, /property="og:image" content="https:\/\/coptr\.me\/covers\/coptr-cruisin\.webp"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="twitter:image" content="https:\/\/coptr\.me\/covers\/coptr-cruisin\.webp"/);
  assert.match(html, /rel="canonical" href="https:\/\/coptr\.me\/stream\/cruisin"/);

  const packageJson = JSON.parse(await readFile(packageUrl, 'utf8'));
  assert.match(packageJson.scripts.build, /node scripts\/generate-song-pages\.mjs/);
});

test('song details page updates SEO during client-side navigation', async () => {
  assert.ok(existsSync(seoComponentUrl), 'SongSeo.tsx should exist');
  const pageSource = await readFile(pageUrl, 'utf8');
  const seoSource = await readFile(seoComponentUrl, 'utf8');

  assert.match(pageSource, /<SongSeo song=\{song\} \/>/);
  assert.match(seoSource, /document\.title = seo\.title/);
  assert.match(seoSource, /property: 'og:image'/);
  assert.match(seoSource, /name: 'twitter:image'/);
});
