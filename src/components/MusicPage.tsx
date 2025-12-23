import { ExternalLink } from 'lucide-react';

export default function MusicPage() {
  const releases = [
    {
      title: 'Ride or Die',
      artist: 'Coptr',
      url: 'https://ffm.to/coptr_rideordie',
      artwork: '/artwork/coptr-ride-or-die.jpeg',
    },
    {
      title: 'Lost Love',
      artist: 'Dezolent, Coptr, & Lillie Price Carter',
      url: 'https://ffm.to/lost-love',
      artwork: '/artwork/dezolent-and-coptr-lost-love-featuring-lillie-price-carter.jpg',
    },
    {
      title: 'Hot Start',
      artist: 'Coptr',
      url: 'https://ffm.to/hotstart',
      artwork: '/artwork/coptr-hot-start.jpeg',
    },
    {
      title: '2 Much (Coptr Flip)',
      artist: 'Justin Bieber',
      url: 'https://soundcloud.com/coptrmp3/justin-bieber-2-much-coptr-flip-free-dl',
      artwork: '/artwork/justin-bieber-2-much-coptr-flip.jpeg',
    },
    {
      title: 'Signal Machine (Coptr Edit)',
      artist: 'Porter Robinson, Rezz, & Grabbitz',
      url: 'https://soundcloud.com/coptrmp3/signal-machine-live-tool/s-YUcVLLHfYGm',
      artwork: '/artwork/coptr-signal-machine-flip.jpeg',
    },
    {
      title: 'Demo Mix',
      artist: 'Coptr',
      url: 'https://soundcloud.com/coptrmp3/demo-mix-3/s-zfr5ILcHd2X',
      artwork: '/artwork/coptr-demo-mix-2025.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#70ffdf] via-[#fd46f0] to-[#9d4dff] bg-clip-text text-transparent">
            Music
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the sonic journey of Coptr through releases, remixes, and live edits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <a
              key={index}
              href={release.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 border border-white/10 hover:border-[#70ffdf]/50 hover:shadow-2xl hover:shadow-[#70ffdf]/20 aspect-square"
            >
              <img
                src={release.artwork}
                alt={release.title}
                className="w-full h-full object-cover"
              />

              <ExternalLink
                className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                size={24}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {release.title}
                </h3>
                <h4 className="text-lg text-gray-300">
                  {release.artist}
                </h4>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-[#70ffdf]/0 to-[#fd46f0]/0 group-hover:from-[#70ffdf]/10 group-hover:to-[#fd46f0]/10 transition-all duration-500 pointer-events-none"></div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#70ffdf]">
            Stream Everywhere
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://open.spotify.com/artist/1CDtx3RB970KejjPi8UxfB"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#1DB954] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#1DB954]/50 transition-all duration-300 transform hover:scale-105"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com/us/artist/coptr/1839103475"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#FA243C] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#FA243C]/50 transition-all duration-300 transform hover:scale-105"
            >
              Apple Music
            </a>
            <a
              href="https://soundcloud.com/coptrmp3"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#FF5500] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#FF5500]/50 transition-all duration-300 transform hover:scale-105"
            >
              SoundCloud
            </a>
            <a
              href="https://youtube.com/@coptr.mp3"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#FF0000] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#FF0000]/50 transition-all duration-300 transform hover:scale-105"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
