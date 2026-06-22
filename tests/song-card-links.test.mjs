import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homeUrl = new URL('../src/components/HomePage.tsx', import.meta.url);
const musicUrl = new URL('../src/components/MusicPage.tsx', import.meta.url);

test('music cards use all shared songs and internal fanlinks', async () => {
  const source = await readFile(musicUrl, 'utf8');

  assert.match(source, /import \{ Link \} from ['"]react-router-dom['"]/);
  assert.match(source, /getSongsByNewestRelease\(\)/);
  assert.match(source, /songs\.map\(\(song\) =>/);
  assert.match(source, /<Link\s+key=\{song\.id\}\s+to=\{song\.fanLink\}/);
  assert.doesNotMatch(source, /const releases =/);
  assert.doesNotMatch(source, /target="_blank"[\s\S]*song\.fanLink/);
});

test('homepage uses the newest three shared songs and internal fanlinks', async () => {
  const source = await readFile(homeUrl, 'utf8');

  assert.match(source, /import \{ Link \} from ['"]react-router-dom['"]/);
  assert.match(source, /getSongsByNewestRelease\(\)/);
  assert.match(source, /\.slice\(0, 3\)/);
  assert.match(source, /latestReleases\.map\(\(song\) =>/);
  assert.match(source, /<Link\s+key=\{song\.id\}\s+to=\{song\.fanLink\}/);
  assert.match(source, /to=\{latestReleases\[0\]\.fanLink\}/);
  assert.doesNotMatch(source, /const latestReleases = \[/);
});
