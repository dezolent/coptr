export const SITE_URL = 'https://coptr.me';
export const SITE_NAME = 'Coptr';
export const SITE_LOCALE = 'en_US';
export const SITE_LANGUAGE = 'en-US';
export const SITE_IMAGE = `${SITE_URL}/coptr-og.jpg`;
export const SITE_IMAGE_ALT = 'Coptr, Miami DJ and helicopter pilot';
export const SITE_IMAGE_TYPE = 'image/jpeg';
export const SITE_IMAGE_WIDTH = '1200';
export const SITE_IMAGE_HEIGHT = '630';
export const ARTIST_ID = `${SITE_URL}/#artist`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const ARTIST_DESCRIPTION =
  'Brickell-based helicopter pilot turned DJ creating melodic hybrid dubstep, rock-influenced bass music, and coastal night-drive energy.';

export const SITE_KEYWORDS = [
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

export type PageSeoKey = 'home' | 'music' | 'epk';

export interface PageSeoDefinition {
  path: '/' | '/music' | '/epk';
  title: string;
  description: string;
  keywords: string[];
  ogType: 'website' | 'profile';
}

export const pageSeo: Record<PageSeoKey, PageSeoDefinition> = {
  home: {
    path: '/',
    title: 'Coptr | Miami DJ, Producer & Helicopter Pilot',
    description:
      'Official website of Coptr, a Brickell-based helicopter pilot and Miami DJ producing melodic hybrid dubstep and rock-influenced bass music.',
    keywords: SITE_KEYWORDS,
    ogType: 'website',
  },
  music: {
    path: '/music',
    title: 'Coptr Music | Releases, Remixes & DJ Edits',
    description:
      'Stream Coptr releases, remixes, flips, and DJ edits. Explore official fanlinks for Spotify, Apple Music, SoundCloud, YouTube, and more.',
    keywords: [...SITE_KEYWORDS, 'Coptr music', 'dubstep remixes', 'DJ edits'],
    ogType: 'website',
  },
  epk: {
    path: '/epk',
    title: 'Coptr EPK | Miami DJ & Opening Act',
    description:
      'Coptr electronic press kit for Miami booking agents and club promoters, featuring an opener mix, artist bio, latest track, and booking contact.',
    keywords: [...SITE_KEYWORDS, 'Coptr EPK', 'Miami opening DJ', 'Miami club DJ'],
    ogType: 'profile',
  },
};

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}
