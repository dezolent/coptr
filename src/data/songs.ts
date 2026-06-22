export type StreamingPlatform =
  | 'Amazon Music'
  | 'Anghami'
  | 'Apple Music'
  | 'Audiomack'
  | 'Bandcamp'
  | 'Beatport'
  | 'Deezer'
  | 'Pandora'
  | 'SoundCloud'
  | 'Spotify'
  | 'Tidal'
  | 'YouTube';

export interface StreamingLink {
  platform: StreamingPlatform;
  url: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  fanLink: `/stream/${string}`;
  streamingLinks: StreamingLink[];
  releaseDate?: string;
  youtubeId?: string;
  price?: number;
  genres?: string[];
  duration?: string;
}

export const platformLogos: Record<StreamingPlatform, string> = {
  'Amazon Music': '/platforms/amazon-music.webp',
  Anghami: '/platforms/anghami.webp',
  'Apple Music': '/platforms/apple-music.webp',
  Audiomack: '/platforms/audiomack.webp',
  Bandcamp: '/platforms/bandcamp.webp',
  Beatport: '/platforms/beatport.webp',
  Deezer: '/platforms/deezer.webp',
  Pandora: '/platforms/pandora.webp',
  SoundCloud: '/platforms/soundcloud.webp',
  Spotify: '/platforms/spotify.webp',
  Tidal: '/platforms/tidal.webp',
  YouTube: '/platforms/youtube.webp',
};

export const songs: Song[] = [
  {
    id: 'hot-start',
    title: 'Hot Start',
    releaseDate: '2025-09-26',
    coverArt: '/covers/coptr-hot-start.webp',
    youtubeId: 'fQTpl9C0Kbc',
    genres: ['Dubstep'],
    duration: '3:41',
    fanLink: '/stream/hot-start',
    artist: 'Coptr',
    streamingLinks: [
      { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=fQTpl9C0Kbc' },
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/1CDtx3RB970KejjPi8UxfB' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/coptrmp3/hot-start' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/hot-start/1839469166?i=1839469167' },
      { platform: 'Amazon Music', url: 'https://music.amazon.com/tracks/B0FQMWR761' },
      { platform: 'Tidal', url: 'https://tidal.com/album/459887296/track/459887297' },
      { platform: 'Deezer', url: 'https://www.deezer.com/us/track/3551173421' },
      { platform: 'Bandcamp', url: 'https://coptr.bandcamp.com/track/hot-start-2' },
      { platform: 'Anghami', url: 'https://play.anghami.com/song/1229970737' },
      { platform: 'Pandora', url: 'https://www.pandora.com/artist/coptr/hot-start/hot-start/TRxbPZ757lwkJVX' },
    ],
  },
  {
    id: 'lost-love',
    title: 'Lost Love (feat. Lillie Price Carter)',
    releaseDate: '2025-10-15',
    coverArt: '/covers/lost-love.webp',
    youtubeId: 'OPSLabWS_bo',
    genres: ['Future Bass', 'Melodic Dubstep'],
    duration: '3:47',
    fanLink: '/stream/lost-love',
    artist: 'Dezolent & Coptr',
    streamingLinks: [
      { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=OPSLabWS_bo' },
      { platform: 'Spotify', url: 'https://open.spotify.com/track/2lq6HU67rZsB6iaBsJzDzt?si=eba226636436463a' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/dezolent/lost-love' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/lost-love-feat-lillie-price-carter-single/1842020087' },
      { platform: 'Amazon Music', url: 'https://amzn.to/3ODOSeC' },
      { platform: 'Beatport', url: 'https://www.beatport.com/release/lost-love-feat-lillie-price-carter/5420778' },
      { platform: 'Tidal', url: 'https://tidal.com/album/462586388/track/462586389' },
      { platform: 'Deezer', url: 'https://www.deezer.com/us/track/3570105491' },
      { platform: 'Bandcamp', url: 'https://dezolent.bandcamp.com/track/lost-love-feat-lillie-price-carter' },
      { platform: 'Audiomack', url: 'https://audiomack.com/dezolent/song/lost-love?utm_source=dezolent' },
      { platform: 'Anghami', url: 'https://play.anghami.com/song/1231520882' },
      { platform: 'Pandora', url: 'https://www.pandora.com/artist/dezolent-and-coptr/lost-love-feat-lillie-price-carter/lost-love-feat-lillie-price-carter/TRgwPr66Z36rk9V' },
    ],
  },
  {
    id: 'ride-or-die',
    title: 'Ride or Die',
    releaseDate: '2025-11-20',
    coverArt: '/covers/coptr-ride-or-die.webp',
    youtubeId: 'U4VL4Lm44MA',
    genres: ['Dubstep'],
    duration: '3:16',
    fanLink: '/stream/ride-or-die',
    artist: 'Coptr',
    streamingLinks: [
      { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=U4VL4Lm44MA' },
      { platform: 'Spotify', url: 'https://open.spotify.com/track/2PfUDFLg2CljNfGZQSJ7Sa' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/coptrmp3/674f5f00-57c4-4a2c-8472-69df3dec8e13' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/ride-or-die/1850032106?i=1850032107' },
      { platform: 'Amazon Music', url: 'https://music.amazon.com/tracks/B0FY381XW5/' },
      { platform: 'Tidal', url: 'https://tidal.com/track/469805662' },
      { platform: 'Deezer', url: 'https://www.deezer.com/us/track/3624805312' },
      { platform: 'Anghami', url: 'https://play.anghami.com/song/1236594392' },
      { platform: 'Pandora', url: 'https://www.pandora.com/artist/coptr/ride-or-die/ride-or-die/TRbgbgjVVp4lX2k' },
    ],
  },
  {
    id: 'gone-coptr-remix',
    title: 'Gone (feat. Mona Moua) [Coptr Remix]',
    releaseDate: '2026-03-25',
    coverArt: '/covers/gone-coptr-remix.webp',
    youtubeId: 'g6uKB4f9gww',
    genres: ['Dubstep', 'Future Bass'],
    duration: '2:51',
    fanLink: '/stream/gone-coptr-remix',
    artist: 'Dezolent & Coptr',
    streamingLinks: [
      { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=g6uKB4f9gww' },
      { platform: 'Spotify', url: 'https://open.spotify.com/track/4WwUShhdlCySFa04dPTxzy?si=2694197a9cf7495d' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/dezolent/gone-coptr-remix' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/song/gone-feat-mona-moua-coptr-remix/1879354025' },
      { platform: 'Amazon Music', url: 'https://amzn.to/4mFtORn' },
      { platform: 'Beatport', url: 'https://www.beatport.com/release/gone-feat-mona-moua-coptr-remix/5944943' },
      { platform: 'Bandcamp', url: 'https://dezolent.bandcamp.com/track/gone-feat-mona-moua-coptr-remix' },
      { platform: 'Tidal', url: 'https://tidal.com/album/500578339/track/500578340' },
      { platform: 'Deezer', url: 'https://www.deezer.com/us/track/3856046051' },
      { platform: 'Pandora', url: 'https://www.pandora.com/artist/dezolent/gone-feat-mona-moua-coptr-remix/gone-feat-mona-moua-coptr-remix/TRgZwxXmcg5jknw' },
      { platform: 'Audiomack', url: 'https://audiomack.com/dezolent/song/gone-coptr-remix?utm_source=dezolent' },
    ],
  },
  {
    id: 'cruisin',
    title: "CRUISIN'",
    releaseDate: '2026-06-19',
    coverArt: '/covers/coptr-cruisin.webp',
    youtubeId: 'h8DHTArICVo',
    genres: ['Dubstep'],
    duration: '2:45',
    fanLink: '/stream/cruisin',
    artist: 'Coptr',
    streamingLinks: [
      { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=h8DHTArICVo' },
      { platform: 'Spotify', url: 'https://open.spotify.com/track/57SoNztbS7ixeA1FMaoO0M' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/coptrmp3/cruisin' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/cruisin/6775275834?i=6775275835' },
      { platform: 'Amazon Music', url: 'https://music.amazon.com/tracks/B0FQMWR761' },
      { platform: 'Tidal', url: 'https://tidal.com/track/529542799/' },
      { platform: 'Deezer', url: 'https://www.deezer.com/us/track/4056258381' },
    ],
  },
  {
    id: '2-much-coptr-flip',
    title: '2 Much (Coptr Flip)',
    artist: 'Justin Bieber',
    coverArt: '/covers/justin-bieber-2-much-coptr-flip.webp',
    fanLink: '/stream/2-much-coptr-flip',
    streamingLinks: [
      { platform: 'SoundCloud', url: 'https://soundcloud.com/coptrmp3/justin-bieber-2-much-coptr-flip-free-dl' },
    ],
  },
  {
    id: 'signal-machine-coptr-edit',
    title: 'Signal Machine (Coptr Edit)',
    artist: 'Porter Robinson, Rezz, & Grabbitz',
    coverArt: '/covers/coptr-signal-machine-flip.webp',
    fanLink: '/stream/signal-machine-coptr-edit',
    streamingLinks: [
      { platform: 'SoundCloud', url: 'https://soundcloud.com/coptrmp3/signal-machine-live-tool/s-YUcVLLHfYGm' },
    ],
  },
  {
    id: 'demo-mix',
    title: 'Demo Mix',
    artist: 'Coptr',
    coverArt: '/covers/coptr-demo-mix-2025.webp',
    fanLink: '/stream/demo-mix',
    streamingLinks: [
      { platform: 'SoundCloud', url: 'https://soundcloud.com/coptrmp3/demo-mix-3/s-zfr5ILcHd2X' },
    ],
  },
];

export function getSongById(id: string | undefined) {
  return songs.find((song) => song.id === id);
}

export function getSongsByNewestRelease() {
  return [...songs].sort((a, b) => {
    if (!a.releaseDate && !b.releaseDate) return 0;
    if (!a.releaseDate) return 1;
    if (!b.releaseDate) return -1;
    return b.releaseDate.localeCompare(a.releaseDate);
  });
}
