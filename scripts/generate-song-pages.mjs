import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const DEFAULT_ORIGIN = 'https://coptr.me';

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getSongSeo(song, origin) {
  const normalizedOrigin = origin.replace(/\/$/, '');
  return {
    title: `${song.artist} - ${song.title}`,
    description: `Listen to ${song.title} by ${song.artist}.`,
    image: `${normalizedOrigin}${song.coverArt}`,
    imageAlt: `${song.title} cover art`,
    url: `${normalizedOrigin}${song.fanLink}`,
  };
}

export function renderSongHtml(baseHtml, song, origin = DEFAULT_ORIGIN) {
  const seo = getSongSeo(song, origin);
  const metadata = `
    <meta name="description" content="${escapeHtml(seo.description)}" data-song-seo="true" />
    <meta property="og:type" content="music.song" data-song-seo="true" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" data-song-seo="true" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" data-song-seo="true" />
    <meta property="og:url" content="${escapeHtml(seo.url)}" data-song-seo="true" />
    <meta property="og:image" content="${escapeHtml(seo.image)}" data-song-seo="true" />
    <meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" data-song-seo="true" />
    <meta name="twitter:card" content="summary_large_image" data-song-seo="true" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" data-song-seo="true" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" data-song-seo="true" />
    <meta name="twitter:image" content="${escapeHtml(seo.image)}" data-song-seo="true" />
    <meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}" data-song-seo="true" />
    <link rel="canonical" href="${escapeHtml(seo.url)}" data-song-seo="true" />`;

  return baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace('</head>', `${metadata}\n  </head>`);
}

async function loadSongs() {
  const source = await readFile(resolve('src/data/songs.ts'), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
  const { songs } = await import(moduleUrl);
  return songs;
}

async function generateSongPages() {
  const indexPath = resolve('dist/index.html');
  const baseHtml = await readFile(indexPath, 'utf8');
  const songs = await loadSongs();
  const origin = process.env.SITE_URL || DEFAULT_ORIGIN;

  await Promise.all(
    songs.map(async (song) => {
      const outputPath = resolve('dist', song.fanLink.slice(1), 'index.html');
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, renderSongHtml(baseHtml, song, origin));
    }),
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await generateSongPages();
}
