import type { Song } from '../data/songs';

const DEFAULT_ORIGIN = 'https://coptr.me';

export function getSongSeo(
  song: Pick<Song, 'artist' | 'title' | 'coverArt' | 'fanLink'>,
  origin = DEFAULT_ORIGIN,
) {
  const normalizedOrigin = origin.replace(/\/$/, '');

  return {
    title: `${song.artist} - ${song.title}`,
    description: `Listen to ${song.title} by ${song.artist}.`,
    image: `${normalizedOrigin}${song.coverArt}`,
    imageAlt: `${song.title} cover art`,
    imageType: 'image/webp',
    imageWidth: '500',
    imageHeight: '500',
    url: `${normalizedOrigin}${song.fanLink}`,
  };
}

export function getIsoDuration(duration: string | undefined) {
  if (!duration) return undefined;
  const match = /^(\d+):(\d{2})$/.exec(duration);
  if (!match) return undefined;
  return `PT${Number(match[1])}M${Number(match[2])}S`;
}
