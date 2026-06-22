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
    url: `${normalizedOrigin}${song.fanLink}`,
  };
}
