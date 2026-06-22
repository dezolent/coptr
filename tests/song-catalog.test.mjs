import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const catalogUrl = new URL('../src/data/songs.ts', import.meta.url);

async function loadCatalog() {
  assert.ok(existsSync(catalogUrl), 'src/data/songs.ts should exist');

  const source = await readFile(catalogUrl, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });

  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}

test('catalog contains eight unique songs with internal fanlinks', async () => {
  const { songs } = await loadCatalog();
  const ids = songs.map((song) => song.id);

  assert.equal(songs.length, 8);
  assert.equal(new Set(ids).size, 8);
  assert.deepEqual(
    songs.map((song) => song.fanLink),
    ids.map((id) => `/stream/${id}`),
  );
});

test('added catalog songs use their existing SoundCloud links', async () => {
  const { getSongById } = await loadCatalog();
  const expected = new Map([
    ['2-much-coptr-flip', 'https://soundcloud.com/coptrmp3/justin-bieber-2-much-coptr-flip-free-dl'],
    ['signal-machine-coptr-edit', 'https://soundcloud.com/coptrmp3/signal-machine-live-tool/s-YUcVLLHfYGm'],
    ['demo-mix', 'https://soundcloud.com/coptrmp3/demo-mix-3/s-zfr5ILcHd2X'],
  ]);

  for (const [id, url] of expected) {
    assert.deepEqual(getSongById(id)?.streamingLinks, [
      { platform: 'SoundCloud', url },
    ]);
  }
});

test('catalog lookup and newest release sorting are deterministic', async () => {
  const { getSongById, getSongsByNewestRelease } = await loadCatalog();

  assert.equal(getSongById('cruisin')?.title, "CRUISIN'");
  assert.equal(getSongById('missing'), undefined);
  assert.deepEqual(
    getSongsByNewestRelease().slice(0, 3).map((song) => song.id),
    ['cruisin', 'gone-coptr-remix', 'ride-or-die'],
  );
});

test('every streaming platform maps to an existing logo path', async () => {
  const { platformLogos, songs } = await loadCatalog();
  const expectedPlatforms = new Set(
    songs.flatMap((song) => song.streamingLinks.map((link) => link.platform)),
  );

  for (const platform of expectedPlatforms) {
    const logo = platformLogos[platform];
    assert.match(logo, /^\/platforms\/[a-z0-9-]+\.webp$/);
    assert.ok(
      existsSync(new URL(`../public${logo}`, import.meta.url)),
      `${platform} logo should exist at public${logo}`,
    );
  }
});
