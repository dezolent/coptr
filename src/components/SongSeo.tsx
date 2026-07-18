import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ARTIST_ID, SITE_LOCALE, SITE_NAME, SITE_URL } from '../data/siteSeo';
import type { Song } from '../data/songs';
import { getIsoDuration, getSongSeo } from '../utils/songSeo';

const DEFAULT_TITLE = 'Coptr | Miami DJ, Producer & Helicopter Pilot';

interface SongSeoProps {
  song: Song;
}

type MetaDefinition =
  | { name: string; content: string }
  | { property: string; content: string };

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
  element.dataset.songSeo = 'true';
}

function getSongSchema(song: Song) {
  const seo = getSongSeo(song, SITE_URL);
  const streamingUrls = song.streamingLinks.map((link) => link.url);
  const duration = getIsoDuration(song.duration);

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
      ? { '@type': 'MusicGroup', '@id': ARTIST_ID, name: SITE_NAME, url: `${SITE_URL}/` }
      : { '@type': 'MusicGroup', name: song.artist },
    ...(song.releaseDate ? { datePublished: song.releaseDate } : {}),
    ...(duration ? { duration } : {}),
    ...(song.genres?.length ? { genre: song.genres } : {}),
    ...(streamingUrls.length ? {
      sameAs: streamingUrls,
      potentialAction: {
        '@type': 'ListenAction',
        target: streamingUrls,
      },
    } : {}),
  };
}

export default function SongSeo({ song }: SongSeoProps) {
  const seo = getSongSeo(song, SITE_URL);
  const schema = getSongSchema(song);

  useEffect(() => {
    document.head
      .querySelector<HTMLScriptElement>('script[data-route-seo="true"][type="application/ld+json"]')
      ?.remove();
    document.title = seo.title;

    const metadata: MetaDefinition[] = [
      { name: 'description', content: seo.description },
      { name: 'keywords', content: [song.artist, song.title, ...(song.genres ?? []), 'Coptr music', 'stream music'].join(', ') },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { property: 'og:type', content: 'music.song' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: SITE_LOCALE },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:url', content: seo.url },
      { property: 'og:image', content: seo.image },
      { property: 'og:image:type', content: seo.imageType },
      { property: 'og:image:width', content: seo.imageWidth },
      { property: 'og:image:height', content: seo.imageHeight },
      { property: 'og:image:alt', content: seo.imageAlt },
      ...(song.releaseDate ? [{ property: 'music:release_date', content: song.releaseDate } as const] : []),
      ...(song.duration ? [{ property: 'music:duration', content: String(song.duration.split(':').reduce((minutes, part) => minutes * 60 + Number(part), 0)) } as const] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
      { name: 'twitter:image', content: seo.image },
      { name: 'twitter:image:alt', content: seo.imageAlt },
    ];

    metadata.forEach((meta) => {
      if ('property' in meta) {
        upsertMeta('property', meta.property, meta.content);
      } else {
        upsertMeta('name', meta.name, meta.content);
      }
    });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seo.url;
    canonical.dataset.songSeo = 'true';

    return () => {
      document.title = DEFAULT_TITLE;
      document.head.querySelectorAll('[data-song-seo="true"]').forEach((element) => element.remove());
    };
  }, [seo, song]);

  return createPortal(
    <script type="application/ld+json" data-coptr-schema="song">
      {JSON.stringify(schema)}
    </script>,
    document.head,
  );
}
