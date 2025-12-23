import { Music, Instagram, Facebook, Youtube, Apple, Play, Cloud, Music2, ExternalLink } from 'lucide-react';
import { RiSoundcloudFill } from "react-icons/ri";


export default function HomePage() {
  const socials = [
    { name: 'LinkTree', url: 'https://linktr.ee/coptr.mp3', icon: Music, color: '#70ffdf' },
    { name: 'Spotify', url: 'https://open.spotify.com/artist/1CDtx3RB970KejjPi8UxfB', icon: Music, color: '#1DB954' },
    { name: 'Apple Music', url: 'https://music.apple.com/us/artist/coptr/1839103475', icon: Apple, color: '#FA243C' },
    { name: 'SoundCloud', url: 'https://soundcloud.com/coptrmp3', icon: RiSoundcloudFill, color: '#FF5500' },
    { name: 'YouTube', url: 'https://youtube.com/@coptr.mp3', icon: Youtube, color: '#FF0000' },
    { name: 'YouTube Music', url: 'https://music.youtube.com/channel/UCZD-gIJ0TCD4mouGZIGHE5g', icon: Play, color: '#FF0000' },
    { name: 'Instagram', url: 'https://instagram.com/coptr.mp3/', icon: Instagram, color: '#E4405F' },
    { name: 'Facebook', url: 'https://www.facebook.com/coptrmp3/', icon: Facebook, color: '#1877F2' },
    { name: 'TikTok', url: 'https://tiktok.com/@coptr.mp3', icon: Music2, color: '#000000' },
  ];

  const latestReleases = [
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
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1d269b] to-[#000000]"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 -left-20 w-96 h-96 bg-[#70ffdf] rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#045ded] rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-32 left-1/3 w-[400px] h-[400px] bg-[#fd46f0] rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9d4dff] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(112,255,223,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(112,255,223,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(112,255,223,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8">
            <img
              src="/coptr-white-text-logo.png"
              alt="Coptr"
              className="h-24 sm:h-32 md:h-40 mx-auto mb-6 drop-shadow-2xl"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-wide text-[#70ffdf]">
            MELODIC DUBSTEP • BROSTEP • BASS HOUSE
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Coast Guard helicopter pilot by day, bass architect by night
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="https://ffm.to/lost-love"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-[#70ffdf] to-[#045ded] text-black font-bold rounded-full hover:shadow-xl hover:shadow-[#70ffdf]/50 transition-all duration-300 transform hover:scale-105"
            >
              LISTEN TO "LOST LOVE"
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[#70ffdf]/50 hover:shadow-lg hover:shadow-[#70ffdf]/20"
              >
                <social.icon
                  size={32}
                  className="mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: social.color }}
                />
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors text-center">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#70ffdf] rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#70ffdf] rounded-full"></div>
          </div>
        </div>
      </div>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-[#1d269b]/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-[#70ffdf] to-[#fd46f0] bg-clip-text text-transparent">
            Latest Releases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {latestReleases.map((release, index) => (
              <a
                key={index}
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#70ffdf]/50 hover:shadow-2xl hover:shadow-[#70ffdf]/20"
              >
                <div className="relative">
                  <img
                    src={release.artwork}
                    alt={release.title}
                    className="w-full h-[500px] object-cover"
                  />
                  <ExternalLink
                    className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    size={24}
                  />
                </div>

                <div className="p-6 text-center bg-black">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {release.title}
                  </h3>
                  <h4 className="text-lg text-gray-400">
                    {release.artist}
                  </h4>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-[#70ffdf]/0 to-[#fd46f0]/0 group-hover:from-[#70ffdf]/10 group-hover:to-[#fd46f0]/10 transition-all duration-500 pointer-events-none"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-[#1d269b]/20 to-[#1d269b]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[#70ffdf] to-[#fd46f0] bg-clip-text text-transparent">
            About Coptr
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Emerging from vibrant Miami, Coptr is the EDM project of producer and DJ Paul Gerlach. His signature sound is an intense sonic journey of Melodic Dubstep and Brostep, blending in energetic Bass House and Drum and Bass. With a highly technical, melodic complexity reminiscent of Virtual Riot and the arcade-inspired energy of Barely Alive, Coptr crafts tracks designed to offer a euphoric escape for a wide audience.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Coptr's sonic vision is directly influenced by his career as a Coast Guard helicopter pilot. The scientific yet artistic precision, broad range of operations, and the dynamic energy of Miami as seen from above are woven into every beat, evoking constant climb and descent in a meticulous soundscape. This connection to the essence of flight ensures an always-energetic, commanding presence in his music.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-[#1d269b]/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-[#fd46f0] to-[#9d4dff] bg-clip-text text-transparent">
            Contact
          </h2>
          <div className="space-y-4">
            <a
              href="mailto:paul.f.gerlach@gmail.com"
              className="block text-xl text-[#70ffdf] hover:text-[#fd46f0] transition-colors"
            >
              paul.f.gerlach@gmail.com
            </a>
            <a
              href="tel:+16093324347"
              className="block text-xl text-[#70ffdf] hover:text-[#fd46f0] transition-colors"
            >
              (609) 332-4347
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
