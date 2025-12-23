import { ExternalLink, Music } from 'lucide-react';

export default function MusicPage() {
  const releases = [
    {
      title: 'Hot Start',
      type: 'Single',
      url: 'http://ffm.to/hotstart',
      description: 'Debut release available on all platforms',
      artwork: '/artwork/coptr-hot-start.jpeg',
      featured: true,
    },
    {
      title: 'Lost Love ft. Lillie Price Carter',
      type: 'Collaboration with Dezolent',
      url: 'https://soundcloud.com/dezolent/lost-love/s-beJGNKM3pu1',
      description: 'Emotional melodic dubstep collaboration',
      artwork: '/artwork/dezolent-and-coptr-lost-love-featuring-lillie-price-carter.jpg',
    },
    {
      title: 'Ride or Die',
      type: 'Original',
      url: 'https://soundcloud.com/coptrmp3/ride-or-die/s-Jm5tfhP1IEb',
      description: 'High-energy brostep anthem',
      artwork: '/artwork/coptr-ride-or-die.jpeg',
    },
    {
      title: '2 Much (Coptr Flip)',
      type: 'Remix',
      url: 'https://soundcloud.com/coptrmp3/justin-bieber-2-much-coptr-flip/s-HbvSz7QKU4N',
      description: 'Justin Bieber remix with heavy bass',
      artwork: '/artwork/justin-bieber-2-much-coptr-flip.jpeg',
    },
    {
      title: 'Signal Machine',
      type: 'Mashup Remix',
      url: 'https://soundcloud.com/coptrmp3/signal-machine-live-tool/s-YUcVLLHfYGm',
      description: 'Coptr mashup remix of Sad Machine by Porter Robinson and Signal by Rezz featuring Grabbitz',
      artwork: '/artwork/coptr-signal-machine-flip.jpeg',
    },
    {
      title: 'Demo Mix',
      type: '20 Minute Mix',
      url: 'https://soundcloud.com/coptrmp3/demo-mix-3/s-zfr5ILcHd2X',
      description: 'Full showcase of Coptr\'s sound',
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
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 ${
                release.featured
                  ? 'md:col-span-2 lg:col-span-3'
                  : ''
              } backdrop-blur-sm border border-white/10 hover:border-[#70ffdf]/50 hover:shadow-2xl hover:shadow-[#70ffdf]/20`}
            >
              <div className={`relative ${release.featured ? 'md:flex md:items-center' : ''}`}>
                <div className={`relative ${release.featured ? 'md:w-1/2' : 'w-full'} overflow-hidden`}>
                  <img
                    src={release.artwork}
                    alt={release.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      release.featured ? 'h-[400px] md:h-[500px]' : 'h-64'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>

                <div className={`relative p-8 ${release.featured ? 'md:w-1/2 md:p-12' : 'absolute inset-0 flex flex-col justify-end'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Music className="text-[#70ffdf]" size={release.featured ? 32 : 24} />
                        <span className="text-sm font-medium text-[#fd46f0] uppercase tracking-wider">
                          {release.type}
                        </span>
                      </div>
                      <h3 className={`font-bold text-white mb-2 ${
                        release.featured ? 'text-3xl sm:text-4xl' : 'text-2xl'
                      }`}>
                        {release.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {release.description}
                      </p>
                    </div>
                    <ExternalLink
                      className="text-[#70ffdf] opacity-0 group-hover:opacity-100 transition-opacity ml-4 flex-shrink-0"
                      size={24}
                    />
                  </div>

                  {release.featured && (
                    <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#70ffdf] to-[#045ded] text-black font-bold rounded-full group-hover:shadow-xl group-hover:shadow-[#70ffdf]/50 transition-all">
                      <Music size={20} />
                      <span>LISTEN NOW</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-br from-[#70ffdf]/0 to-[#fd46f0]/0 group-hover:from-[#70ffdf]/10 group-hover:to-[#fd46f0]/10 transition-all duration-500 pointer-events-none`}></div>
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
