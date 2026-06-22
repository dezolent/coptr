import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const appUrl = new URL('../src/App.tsx', import.meta.url);
const pageUrl = new URL('../src/components/SongDetailsPage.tsx', import.meta.url);

test('app registers the dynamic song fanlink route', async () => {
  const source = await readFile(appUrl, 'utf8');

  assert.match(source, /import SongDetailsPage from ['"]\.\/components\/SongDetailsPage['"]/);
  assert.match(source, /<Route path="\/stream\/:songId" element=\{<SongDetailsPage \/>\} \/>/);
});

test('song details page renders mapped platform links and a not-found path', async () => {
  assert.ok(existsSync(pageUrl), 'SongDetailsPage.tsx should exist');
  const source = await readFile(pageUrl, 'utf8');

  assert.match(source, /useParams/);
  assert.match(source, /getSongById\(songId\)/);
  assert.match(source, /song\.streamingLinks\.map/);
  assert.match(source, /platformLogos\[link\.platform\]/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
  assert.match(source, /<Link\s+to="\/music"/);
});

test('song details page places accessible social icons after metadata', async () => {
  const source = await readFile(pageUrl, 'utf8');
  const metadataIndex = source.indexOf("song.genres.join(' / ')");
  const socialsIndex = source.indexOf('socials.map((social) =>');

  assert.match(source, /import \{ socials \} from ['"]\.\.\/data\/socials['"]/);
  assert.ok(metadataIndex >= 0 && socialsIndex > metadataIndex);
  assert.match(source, /aria-label=\{`Visit Coptr on \$\{social\.name\}`\}/);
  assert.match(source, /src=\{social\.image\}/);
  assert.match(source, /alt=""/);
  assert.match(source, /mt-6 flex flex-wrap justify-center gap-2 lg:justify-start/);
});

test('streaming cards use platform logos without separate text labels', async () => {
  const source = await readFile(pageUrl, 'utf8');

  assert.match(source, /src=\{platformLogos\[link\.platform\]\}/);
  assert.match(source, /alt=\{link\.platform\}/);
  assert.match(source, /className="h-8 w-32 object-contain object-left sm:w-36"/);
  assert.doesNotMatch(source, />\s*\{link\.platform\}\s*<\/span>/);
  assert.doesNotMatch(source, /rounded-xl bg-white p-2 shadow-inner/);
});

test('song details page conditionally renders an external free download action', async () => {
  const source = await readFile(pageUrl, 'utf8');

  assert.match(source, /song\.download &&/);
  assert.match(source, /href=\{song\.download\}/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
  assert.match(source, />\s*Free Download\s*</);
});
