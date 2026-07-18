import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import ts from 'typescript';

const DEFAULT_ORIGIN = 'https://coptr.me';
const SITE_NAME = 'Coptr';
const SITE_LANGUAGE = 'en-US';
const SITE_LOCALE = 'en_US';
const OG_IMAGE_PATH = '/coptr-og.jpg';
const OG_IMAGE_ALT = 'Coptr, Miami DJ and helicopter pilot';
const ARTIST_DESCRIPTION =
  'Brickell-based helicopter pilot turned DJ creating melodic hybrid dubstep, rock-influenced bass music, and coastal night-drive energy.';
const ROBOTS_DIRECTIVE =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const DEFAULT_SOCIAL_PROFILES = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/1CDtx3RB970KejjPi8UxfB' },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/coptr/1839103475' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/coptrmp3' },
  { name: 'YouTube', url: 'https://youtube.com/@coptr.mp3?sub_confirmation=1' },
  { name: 'Instagram', url: 'https://instagram.com/coptr.mp3/' },
  { name: 'TikTok', url: 'https://tiktok.com/@coptr.mp3' },
  { name: 'Facebook', url: 'https://www.facebook.com/coptrmp3/' },
];
const DEFAULT_KEYWORDS = [
  'Coptr',
  'Coptr DJ',
  'Miami DJ',
  'Brickell DJ',
  'dubstep producer',
  'melodic dubstep',
  'hybrid dubstep',
  'helicopter pilot DJ',
  'electronic music',
];
const DEFAULT_PAGE_SEO = {
  home: {
    path: '/',
    title: 'Coptr | Miami DJ, Producer & Helicopter Pilot',
    description:
      'Official website of Coptr, a Brickell-based helicopter pilot and Miami DJ producing melodic hybrid dubstep and rock-influenced bass music.',
    keywords: DEFAULT_KEYWORDS,
    ogType: 'website',
  },
  music: {
    path: '/music',
    title: 'Coptr Music | Releases, Remixes & DJ Edits',
    description:
      'Stream Coptr releases, remixes, flips, and DJ edits. Explore official fanlinks for Spotify, Apple Music, SoundCloud, YouTube, and more.',
    keywords: [...DEFAULT_KEYWORDS, 'Coptr music', 'dubstep remixes', 'DJ edits'],
    ogType: 'website',
  },
  epk: {
    path: '/epk',
    title: 'Coptr EPK | Miami DJ & Opening Act',
    description:
      'Coptr electronic press kit for Miami booking agents and club promoters, featuring an opener mix, artist bio, latest track, and booking contact.',
    keywords: [...DEFAULT_KEYWORDS, 'Coptr EPK', 'Miami opening DJ', 'Miami club DJ'],
    ogType: 'profile',
  },
};

function normalizeOrigin(origin) {
  return origin.replace(/\/$/, '');
}

function absoluteUrl(origin, path) {
  const normalizedOrigin = normalizeOrigin(origin);
  return `${normalizedOrigin}${path === '/' ? '/' : path}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getIsoDuration(duration) {
  if (!duration) return undefined;
  const match = /^(\d+):(\d{2})$/.exec(duration);
  if (!match) return undefined;
  return `PT${Number(match[1])}M${Number(match[2])}S`;
}

function getSongSeo(song, origin) {
  return {
    title: `${song.artist} - ${song.title}`,
    description: `Listen to ${song.title} by ${song.artist}.`,
    image: absoluteUrl(origin, song.coverArt),
    imageAlt: `${song.title} cover art`,
    imageType: 'image/webp',
    imageWidth: '500',
    imageHeight: '500',
    url: absoluteUrl(origin, song.fanLink),
  };
}

function getArtistSchema(origin, socialUrls) {
  const normalizedOrigin = normalizeOrigin(origin);
  return {
    '@type': 'MusicGroup',
    '@id': `${normalizedOrigin}/#artist`,
    name: SITE_NAME,
    url: `${normalizedOrigin}/`,
    description: ARTIST_DESCRIPTION,
    image: `${normalizedOrigin}${OG_IMAGE_PATH}`,
    logo: `${normalizedOrigin}/brand/coptr-black-circle-logo.webp`,
    genre: ['Dubstep', 'Melodic Dubstep', 'Electronic music'],
    sameAs: socialUrls,
    email: 'paul.f.gerlach@gmail.com',
  };
}

function getWebsiteSchema(origin, homeDescription) {
  const normalizedOrigin = normalizeOrigin(origin);
  return {
    '@type': 'WebSite',
    '@id': `${normalizedOrigin}/#website`,
    url: `${normalizedOrigin}/`,
    name: SITE_NAME,
    description: homeDescription,
    inLanguage: SITE_LANGUAGE,
    publisher: { '@id': `${normalizedOrigin}/#artist` },
  };
}

function getSongSchema(song, origin) {
  const normalizedOrigin = normalizeOrigin(origin);
  const seo = getSongSeo(song, origin);
  const duration = getIsoDuration(song.duration);
  const streamingUrls = (song.streamingLinks ?? []).map((link) => link.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    '@id': `${seo.url}#recording`,
    name: song.title,
    url: seo.url,
    mainEntityOfPage: seo.url,
    description: seo.description,
    image: {
      '@type': 'ImageObject',
      url: seo.image,
      width: Number(seo.imageWidth),
      height: Number(seo.imageHeight),
      caption: seo.imageAlt,
    },
    byArtist: song.artist === SITE_NAME
      ? {
          '@type': 'MusicGroup',
          '@id': `${normalizedOrigin}/#artist`,
          name: SITE_NAME,
          url: `${normalizedOrigin}/`,
        }
      : { '@type': 'MusicGroup', name: song.artist },
    ...(song.releaseDate ? { datePublished: song.releaseDate } : {}),
    ...(duration ? { duration } : {}),
    ...(song.genres?.length ? { genre: song.genres } : {}),
    ...(streamingUrls.length
      ? {
          sameAs: streamingUrls,
          potentialAction: {
            '@type': 'ListenAction',
            target: streamingUrls,
          },
        }
      : {}),
  };
}

function getPageSchema(pageKey, songs, origin, pageSeo, socialUrls) {
  const normalizedOrigin = normalizeOrigin(origin);
  const definition = pageSeo[pageKey];
  const url = absoluteUrl(origin, definition.path);
  const website = getWebsiteSchema(origin, pageSeo.home.description);
  const artist = getArtistSchema(origin, socialUrls);

  if (pageKey === 'home') {
    return {
      '@context': 'https://schema.org',
      '@graph': [website, artist],
    };
  }

  if (pageKey === 'music') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        website,
        artist,
        {
          '@type': 'CollectionPage',
          '@id': `${url}#webpage`,
          url,
          name: definition.title,
          description: definition.description,
          isPartOf: { '@id': `${normalizedOrigin}/#website` },
          about: { '@id': `${normalizedOrigin}/#artist` },
          inLanguage: SITE_LANGUAGE,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: songs.length,
            itemListElement: songs.map((song, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'MusicRecording',
                name: song.title,
                url: absoluteUrl(origin, song.fanLink),
                image: absoluteUrl(origin, song.coverArt),
                byArtist: song.artist === SITE_NAME
                  ? { '@id': `${normalizedOrigin}/#artist` }
                  : { '@type': 'MusicGroup', name: song.artist },
              },
            })),
          },
        },
      ],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      artist,
      {
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: definition.title,
        description: definition.description,
        isPartOf: { '@id': `${normalizedOrigin}/#website` },
        mainEntity: { '@id': `${normalizedOrigin}/#artist` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${normalizedOrigin}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
        },
        inLanguage: SITE_LANGUAGE,
      },
    ],
  };
}

export function getCanonicalPages(
  songs,
  origin = DEFAULT_ORIGIN,
  options = {},
) {
  const normalizedOrigin = normalizeOrigin(origin);
  const pageSeo = options.pageSeo ?? DEFAULT_PAGE_SEO;
  const socialProfiles = options.socialProfiles ?? DEFAULT_SOCIAL_PROFILES;
  const socialUrls = options.socialUrls ?? socialProfiles.map((profile) => profile.url);
  const standardPages = ['home', 'music', 'epk'].map((pageKey) => {
    const definition = pageSeo[pageKey];
    const markdownPath = pageKey === 'home' ? '/index.md' : `${definition.path}.md`;
    return {
      kind: pageKey,
      path: definition.path,
      url: absoluteUrl(normalizedOrigin, definition.path),
      markdownPath,
      markdownUrl: absoluteUrl(normalizedOrigin, markdownPath),
      title: definition.title,
      label: pageKey === 'home' ? 'Coptr Official Website' : definition.title,
      description: definition.description,
      keywords: definition.keywords,
      ogType: definition.ogType,
      image: `${normalizedOrigin}${OG_IMAGE_PATH}`,
      imageAlt: OG_IMAGE_ALT,
      imageType: 'image/jpeg',
      imageWidth: '1200',
      imageHeight: '630',
      schema: getPageSchema(pageKey, songs, normalizedOrigin, pageSeo, socialUrls),
      socialProfiles,
    };
  });

  const songPages = songs.map((song) => {
    const seo = getSongSeo(song, normalizedOrigin);
    return {
      kind: 'song',
      path: song.fanLink,
      url: seo.url,
      markdownPath: `${song.fanLink}.md`,
      markdownUrl: absoluteUrl(normalizedOrigin, `${song.fanLink}.md`),
      title: seo.title,
      label: seo.title,
      description: seo.description,
      keywords: [song.artist, song.title, ...(song.genres ?? []), 'Coptr music', 'stream music'],
      ogType: 'music.song',
      image: seo.image,
      imageAlt: seo.imageAlt,
      imageType: seo.imageType,
      imageWidth: seo.imageWidth,
      imageHeight: seo.imageHeight,
      releaseDate: song.releaseDate,
      duration: song.duration,
      schema: getSongSchema(song, normalizedOrigin),
      song,
    };
  });

  return [...standardPages, ...songPages];
}

function stripRouteMetadata(html) {
  return html
    .replace(/\s*<meta\s+name="(?:description|keywords|robots)"[^>]*\/?>/g, '')
    .replace(/\s*<meta\s+property="(?:og|music):[^"]+"[^>]*\/?>/g, '')
    .replace(/\s*<meta\s+name="twitter:[^"]+"[^>]*\/?>/g, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*\/?>/g, '')
    .replace(/\s*<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '');
}

export function renderPageHtml(baseHtml, page) {
  const cleanHtml = stripRouteMetadata(baseHtml);
  const musicMetadata = page.kind === 'song'
    ? `${page.releaseDate ? `\n    <meta property="music:release_date" content="${escapeHtml(page.releaseDate)}" data-route-seo="true" />` : ''}${page.duration ? `\n    <meta property="music:duration" content="${String(page.duration.split(':').reduce((total, part) => total * 60 + Number(part), 0))}" data-route-seo="true" />` : ''}`
    : '';
  const metadata = `
    <meta name="description" content="${escapeHtml(page.description)}" data-route-seo="true" />
    <meta name="keywords" content="${escapeHtml(page.keywords.join(', '))}" data-route-seo="true" />
    <meta name="robots" content="${ROBOTS_DIRECTIVE}" data-route-seo="true" />
    <meta property="og:type" content="${escapeHtml(page.ogType)}" data-route-seo="true" />
    <meta property="og:site_name" content="${SITE_NAME}" data-route-seo="true" />
    <meta property="og:locale" content="${SITE_LOCALE}" data-route-seo="true" />
    <meta property="og:title" content="${escapeHtml(page.title)}" data-route-seo="true" />
    <meta property="og:description" content="${escapeHtml(page.description)}" data-route-seo="true" />
    <meta property="og:url" content="${escapeHtml(page.url)}" data-route-seo="true" />
    <meta property="og:image" content="${escapeHtml(page.image)}" data-route-seo="true" />
    <meta property="og:image:type" content="${escapeHtml(page.imageType)}" data-route-seo="true" />
    <meta property="og:image:width" content="${escapeHtml(page.imageWidth)}" data-route-seo="true" />
    <meta property="og:image:height" content="${escapeHtml(page.imageHeight)}" data-route-seo="true" />
    <meta property="og:image:alt" content="${escapeHtml(page.imageAlt)}" data-route-seo="true" />${musicMetadata}
    <meta name="twitter:card" content="summary_large_image" data-route-seo="true" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" data-route-seo="true" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" data-route-seo="true" />
    <meta name="twitter:image" content="${escapeHtml(page.image)}" data-route-seo="true" />
    <meta name="twitter:image:alt" content="${escapeHtml(page.imageAlt)}" data-route-seo="true" />
    <link rel="canonical" href="${escapeHtml(page.url)}" data-route-seo="true" />
    <script type="application/ld+json" data-route-seo="true">${JSON.stringify(page.schema)}</script>`;

  return cleanHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace('</head>', `${metadata}\n  </head>`);
}

export function renderNotFoundHtml(baseHtml, origin = DEFAULT_ORIGIN) {
  const cleanHtml = stripRouteMetadata(baseHtml);
  const normalizedOrigin = normalizeOrigin(origin);
  const title = '404 | Signal Lost | Coptr';
  const description =
    'This flight path does not exist. Return to Coptr’s official website, music, or electronic press kit.';
  const metadata = `
    <meta name="description" content="${escapeHtml(description)}" data-route-seo="true" />
    <meta name="robots" content="noindex, follow" data-route-seo="true" />
    <meta property="og:type" content="website" data-route-seo="true" />
    <meta property="og:site_name" content="${SITE_NAME}" data-route-seo="true" />
    <meta property="og:locale" content="${SITE_LOCALE}" data-route-seo="true" />
    <meta property="og:title" content="${title}" data-route-seo="true" />
    <meta property="og:description" content="${escapeHtml(description)}" data-route-seo="true" />
    <meta property="og:image" content="${normalizedOrigin}${OG_IMAGE_PATH}" data-route-seo="true" />
    <meta property="og:image:type" content="image/jpeg" data-route-seo="true" />
    <meta property="og:image:width" content="1200" data-route-seo="true" />
    <meta property="og:image:height" content="630" data-route-seo="true" />
    <meta property="og:image:alt" content="${OG_IMAGE_ALT}" data-route-seo="true" />
    <meta name="twitter:card" content="summary_large_image" data-route-seo="true" />
    <meta name="twitter:title" content="${title}" data-route-seo="true" />
    <meta name="twitter:description" content="${escapeHtml(description)}" data-route-seo="true" />
    <meta name="twitter:image" content="${normalizedOrigin}${OG_IMAGE_PATH}" data-route-seo="true" />
    <meta name="twitter:image:alt" content="${OG_IMAGE_ALT}" data-route-seo="true" />`;

  return cleanHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace('</head>', `${metadata}\n  </head>`);
}

export function renderSongHtml(baseHtml, song, origin = DEFAULT_ORIGIN) {
  const songPage = getCanonicalPages([song], origin).find((page) => page.kind === 'song');
  return renderPageHtml(baseHtml, songPage);
}

export function renderSitemap(pages) {
  const entries = pages
    .map((page) => `  <url>
    <loc>${escapeHtml(page.url)}</loc>
    <image:image>
      <image:loc>${escapeHtml(page.image)}</image:loc>
      <image:title>${escapeHtml(page.imageAlt)}</image:title>
    </image:image>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>
`;
}

export function renderRobots(origin = DEFAULT_ORIGIN) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${normalizeOrigin(origin)}/sitemap.xml\n`;
}

function markdownLine(page) {
  return `- [${page.label}](${page.markdownUrl}): ${page.description}`;
}

function renderSocialProfiles(profiles) {
  return profiles.map((profile) => `- [${profile.name}](${profile.url})`).join('\n');
}

export function renderPageMarkdown(page, pages) {
  const songPages = pages.filter((candidate) => candidate.kind === 'song');

  if (page.kind === 'home') {
    return `# Coptr

> ${page.description}

## Artist Snapshot

${ARTIST_DESCRIPTION}

- Based in Brickell, Miami, Florida
- Artist, producer, DJ, and helicopter pilot
- Sound: melodic hybrid dubstep, rock-influenced bass music, and coastal night-drive energy

## Music

- [Explore Coptr Music](${pages.find((candidate) => candidate.kind === 'music').markdownUrl}): Releases, remixes, flips, edits, and official streaming fanlinks.
- [Booking EPK](${pages.find((candidate) => candidate.kind === 'epk').markdownUrl}): Promoter-focused artist information, opener mix, and booking contact.

## Official Profiles

${renderSocialProfiles(page.socialProfiles)}

## Contact

- [Email Coptr](mailto:paul.f.gerlach@gmail.com)
- [Canonical website](${page.url})
`;
  }

  if (page.kind === 'music') {
    return `# Coptr Music

> ${page.description}

## Releases, Remixes, and DJ Edits

${songPages.map(markdownLine).join('\n')}

## Artist

- [Coptr Official Website](${pages.find((candidate) => candidate.kind === 'home').markdownUrl})
- [Canonical music page](${page.url})
`;
  }

  if (page.kind === 'epk') {
    const latestTrack = songPages.find((candidate) => candidate.song?.id === 'cruisin') ?? songPages[0];
    return `# Coptr EPK

> ${page.description}

## Artist Bio

Brickell-based helicopter pilot turned DJ, building an aviation-inspired audiovisual identity through melodic hybrid dubstep, rock influences, and coastal night-drive energy — from beach roads to afterhours.

## Promoter Snapshot

- Based in Brickell, Miami, Florida
- Available for local opening slots, direct support, club warmups, and early-night lineups
- For fans of Virtual Riot, Subtronics, Crankdat, and Tape B

## Primary Listen

- [Sample Opener Mix](https://soundcloud.com/coptrmp3/support-mix-take1/s-UkMCcLh93Uo): Opening-set preview for promoters.
- [Latest Track: ${latestTrack.label}](${latestTrack.markdownUrl})

## Booking and Official Links

- [Booking Email](mailto:paul.f.gerlach@gmail.com)
${renderSocialProfiles(page.socialProfiles)}
- [Download the Coptr EPK PDF](${new URL(page.url).origin}/coptr-epk.pdf)
- [Canonical EPK page](${page.url})
`;
  }

  const song = page.song;
  const metadata = [
    song.releaseDate ? `- Release date: ${song.releaseDate}` : undefined,
    song.duration ? `- Duration: ${song.duration}` : undefined,
    song.genres?.length ? `- Genres: ${song.genres.join(', ')}` : undefined,
  ].filter(Boolean);
  const streamingLinks = (song.streamingLinks ?? [])
    .map((link) => `- [${link.platform}](${link.url})`)
    .join('\n');

  return `# ${page.title}

> ${page.description}

![${page.imageAlt}](${page.image})

## Track Information

- Artist: ${song.artist}
- Title: ${song.title}${metadata.length ? `\n${metadata.join('\n')}` : ''}

## Streaming Links

${streamingLinks || '- No public streaming links are currently listed.'}${song.download ? `\n\n## Download\n\n- [Free Download](${song.download})` : ''}

## Official Page

- [Open the canonical fanlink](${page.url})
- [Browse all Coptr music](${pages.find((candidate) => candidate.kind === 'music').markdownUrl})
`;
}

export function renderLlmsTxt(pages) {
  const mainPages = pages.filter((page) => page.kind !== 'song');
  const songPages = pages.filter((page) => page.kind === 'song');
  const origin = new URL(pages[0].url).origin;
  return `# Coptr

> Official website for Coptr, a Brickell-based helicopter pilot and Miami DJ creating melodic hybrid dubstep, rock-influenced bass music, and coastal night-drive energy.

Coptr is an electronic music artist and DJ based in Miami. Use the canonical pages below for factual information, music fanlinks, booking materials, and official social profiles.

## Main Pages

${mainPages.map(markdownLine).join('\n')}

## Music

${songPages.map(markdownLine).join('\n')}

## Resources

- [XML Sitemap](${origin}/sitemap.xml): Complete canonical URL inventory for search crawlers.
- [Coptr EPK PDF](${origin}/coptr-epk.pdf): Downloadable one-page electronic press kit for booking inquiries.
`;
}

function renderManifest(origin = DEFAULT_ORIGIN, description = DEFAULT_PAGE_SEO.home.description) {
  return JSON.stringify(
    {
      name: 'Coptr Official Website',
      short_name: 'Coptr',
      description,
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#02030a',
      theme_color: '#02030a',
      lang: SITE_LANGUAGE,
      id: `${normalizeOrigin(origin)}/`,
      icons: [
        { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    null,
    2,
  );
}

function makeIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0);
  entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, pngBuffer]);
}

export async function writeFaviconAssets(outputDirectory) {
  const source = resolve('public/brand/coptr-black-circle-logo.webp');
  const sizes = [16, 32, 180, 192, 512];
  const rendered = new Map();

  await Promise.all(
    sizes.map(async (size) => {
      const buffer = await sharp(source)
        .resize(size, size, { fit: 'contain' })
        .png({ compressionLevel: 9 })
        .toBuffer();
      rendered.set(size, buffer);
    }),
  );

  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(resolve(outputDirectory, 'favicon-16x16.png'), rendered.get(16)),
    writeFile(resolve(outputDirectory, 'favicon-32x32.png'), rendered.get(32)),
    writeFile(resolve(outputDirectory, 'apple-touch-icon.png'), rendered.get(180)),
    writeFile(resolve(outputDirectory, 'icon-192x192.png'), rendered.get(192)),
    writeFile(resolve(outputDirectory, 'icon-512x512.png'), rendered.get(512)),
    writeFile(resolve(outputDirectory, 'favicon.ico'), makeIco(rendered.get(32), 32)),
  ]);
}

async function loadTypeScriptDataModule(path) {
  const source = await readFile(resolve(path), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
  return import(moduleUrl);
}

async function writeRoutePage(baseHtml, page) {
  const relativePath = page.path === '/' ? 'index.html' : `${page.path.slice(1)}/index.html`;
  const outputPath = resolve('dist', relativePath);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderPageHtml(baseHtml, page));
}

async function writeMarkdownPage(page, pages) {
  const outputPath = resolve('dist', page.markdownPath.slice(1));
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderPageMarkdown(page, pages));
}

async function generateSiteSeo() {
  const [baseHtml, songData, socialData, siteData] = await Promise.all([
    readFile(resolve('dist/index.html'), 'utf8'),
    loadTypeScriptDataModule('src/data/songs.ts'),
    loadTypeScriptDataModule('src/data/socials.ts'),
    loadTypeScriptDataModule('src/data/siteSeo.ts'),
  ]);
  const origin = process.env.SITE_URL || siteData.SITE_URL || DEFAULT_ORIGIN;
  const pages = getCanonicalPages(songData.songs, origin, {
    pageSeo: siteData.pageSeo,
    socialProfiles: socialData.socials,
  });
  const epkPage = pages.find((page) => page.kind === 'epk');
  const pressKitPage = { ...epkPage, path: '/press-kit' };

  await Promise.all([
    ...pages.map((page) => writeRoutePage(baseHtml, page)),
    ...pages.map((page) => writeMarkdownPage(page, pages)),
    writeRoutePage(baseHtml, pressKitPage),
    writeFile(resolve('dist/sitemap.xml'), renderSitemap(pages)),
    writeFile(resolve('dist/robots.txt'), renderRobots(origin)),
    writeFile(resolve('dist/llms.txt'), renderLlmsTxt(pages)),
    writeFile(resolve('dist', '404.html'), renderNotFoundHtml(baseHtml, origin)),
    writeFile(resolve('dist/site.webmanifest'), renderManifest(origin, siteData.pageSeo.home.description)),
    writeFaviconAssets(resolve('dist')),
    writeFaviconAssets(resolve('public')),
  ]);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await generateSiteSeo();
}
