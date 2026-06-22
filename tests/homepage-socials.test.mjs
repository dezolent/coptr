import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const homeUrl = new URL('../src/components/HomePage.tsx', import.meta.url);
const socialsUrl = new URL('../src/data/socials.ts', import.meta.url);

const expectedSocials = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/1CDtx3RB970KejjPi8UxfB', image: '/social/spotify.webp' },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/coptr/1839103475', image: '/social/apple-music.webp' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/coptrmp3', image: '/social/soundcloud.webp' },
  { name: 'YouTube', url: 'https://youtube.com/@coptr.mp3?sub_confirmation=1', image: '/social/youtube.webp' },
  { name: 'Instagram', url: 'https://instagram.com/coptr.mp3/', image: '/social/instagram.webp' },
  { name: 'TikTok', url: 'https://tiktok.com/@coptr.mp3', image: '/social/titkok.webp' },
  { name: 'Facebook', url: 'https://www.facebook.com/coptrmp3/', image: '/social/facebook.webp' },
];

async function loadSocials() {
  assert.ok(existsSync(socialsUrl), 'src/data/socials.ts should exist');
  const source = await readFile(socialsUrl, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });

  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}

test('shared social data contains the requested links and assets', async () => {
  const { socials } = await loadSocials();
  assert.deepEqual(socials, expectedSocials);
});

test('homepage renders the shared social data', async () => {
  const source = await readFile(homeUrl, 'utf8');

  assert.match(source, /import \{ socials \} from ['"]\.\.\/data\/socials['"]/);
  assert.match(source, /socials\.map\(\(social\) =>/);
  assert.doesNotMatch(source, /const socials = \[/);
  assert.match(source, /aria-label=\{`Open Coptr on \$\{social\.name\}`\}/);
  assert.match(source, /<img\s+src=\{social\.image\}\s+alt=""/);
});
