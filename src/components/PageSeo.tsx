import { useEffect } from 'react';
import { songs } from '../data/songs';
import { socials } from '../data/socials';
import {
  absoluteUrl,
  ARTIST_DESCRIPTION,
  ARTIST_ID,
  pageSeo,
  SITE_IMAGE,
  SITE_IMAGE_ALT,
  SITE_IMAGE_HEIGHT,
  SITE_IMAGE_TYPE,
  SITE_IMAGE_WIDTH,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  type PageSeoKey,
} from '../data/siteSeo';

type MetaDefinition =
  | { name: string; content: string }
  | { property: string; content: string };

interface PageSeoProps {
  page: PageSeoKey;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
  element.dataset.coptrSeo = 'true';
}

function getArtistSchema() {
  return {
    '@type': 'MusicGroup',
    '@id': ARTIST_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: ARTIST_DESCRIPTION,
    image: SITE_IMAGE,
    logo: `${SITE_URL}/brand/coptr-black-circle-logo.webp`,
    genre: ['Dubstep', 'Melodic Dubstep', 'Electronic music'],
    sameAs: socials.map((social) => social.url),
    email: 'paul.f.gerlach@gmail.com',
  };
}

function songListItem(song: (typeof songs)[number], position: number) {
  return {
    '@type': 'ListItem',
    position,
    item: {
      '@type': 'MusicRecording',
      name: song.title,
      url: absoluteUrl(song.fanLink),
      image: absoluteUrl(song.coverArt),
      byArtist: song.artist === SITE_NAME
        ? { '@id': ARTIST_ID }
        : { '@type': 'MusicGroup', name: song.artist },
    },
  };
}

function getPageSchema(page: PageSeoKey) {
  const definition = pageSeo[page];
  const url = absoluteUrl(definition.path);
  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: pageSeo.home.description,
    inLanguage: SITE_LANGUAGE,
    publisher: { '@id': ARTIST_ID },
  };
  const artist = getArtistSchema();

  if (page === 'home') {
    return {
      '@context': 'https://schema.org',
      '@graph': [website, artist],
    };
  }

  if (page === 'music') {
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
          isPartOf: { '@id': WEBSITE_ID },
          about: { '@id': ARTIST_ID },
          inLanguage: SITE_LANGUAGE,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: songs.length,
            itemListElement: songs.map(songListItem),
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
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': ARTIST_ID },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: SITE_IMAGE,
          width: Number(SITE_IMAGE_WIDTH),
          height: Number(SITE_IMAGE_HEIGHT),
        },
        inLanguage: SITE_LANGUAGE,
      },
    ],
  };
}

export default function PageSeo({ page }: PageSeoProps) {
  useEffect(() => {
    const definition = pageSeo[page];
    const url = absoluteUrl(definition.path);
    const metadata: MetaDefinition[] = [
      { name: 'description', content: definition.description },
      { name: 'keywords', content: definition.keywords.join(', ') },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { property: 'og:type', content: definition.ogType },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: SITE_LOCALE },
      { property: 'og:title', content: definition.title },
      { property: 'og:description', content: definition.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: SITE_IMAGE },
      { property: 'og:image:type', content: SITE_IMAGE_TYPE },
      { property: 'og:image:width', content: SITE_IMAGE_WIDTH },
      { property: 'og:image:height', content: SITE_IMAGE_HEIGHT },
      { property: 'og:image:alt', content: SITE_IMAGE_ALT },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: definition.title },
      { name: 'twitter:description', content: definition.description },
      { name: 'twitter:image', content: SITE_IMAGE },
      { name: 'twitter:image:alt', content: SITE_IMAGE_ALT },
    ];

    document.title = definition.title;
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
    canonical.href = url;
    canonical.dataset.coptrSeo = 'true';

    let schema = document.head.querySelector<HTMLScriptElement>(
      'script[data-coptr-schema="true"], script[data-route-seo="true"][type="application/ld+json"]',
    );
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.coptrSchema = 'true';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(getPageSchema(page));

    return () => {
      schema?.remove();
    };
  }, [page]);

  return null;
}
