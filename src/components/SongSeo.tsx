import { useEffect } from 'react';
import type { Song } from '../data/songs';
import { getSongSeo } from '../utils/songSeo';

const DEFAULT_TITLE = 'Coptr | Official Website';

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

export default function SongSeo({ song }: SongSeoProps) {
  useEffect(() => {
    const seo = getSongSeo(song, window.location.origin);
    document.title = seo.title;

    const metadata: MetaDefinition[] = [
      { name: 'description', content: seo.description },
      { property: 'og:type', content: 'music.song' },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:url', content: seo.url },
      { property: 'og:image', content: seo.image },
      { property: 'og:image:alt', content: seo.imageAlt },
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
  }, [song]);

  return null;
}
