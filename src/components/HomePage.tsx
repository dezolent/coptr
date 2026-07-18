import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { socials } from '../data/socials';
import { getSongsByNewestRelease } from '../data/songs';


export default function HomePage() {
  const latestReleases = getSongsByNewestRelease().slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#02030a] px-5 pb-16 pt-28 sm:px-8 lg:flex lg:items-center lg:px-12 lg:pb-20 lg:pt-24">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_24%,rgba(4,93,237,0.35),transparent_32%),radial-gradient(circle_at_22%_76%,rgba(253,70,240,0.18),transparent_30%),linear-gradient(135deg,#02030a_0%,#080b22_48%,#02030a_100%)]" />
        <div className="absolute inset-0 -z-20 opacity-30 [background-image:linear-gradient(rgba(112,255,223,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(112,255,223,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="absolute -left-32 top-1/3 -z-10 size-80 rounded-full bg-[#fd46f0]/20 blur-[110px] motion-safe:animate-pulse" />
        <div className="absolute -right-32 top-16 -z-10 size-[28rem] rounded-full bg-[#045ded]/25 blur-[130px] motion-safe:animate-pulse" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 xl:gap-20">
          <div className="relative z-20 max-w-xl text-left">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-[#70ffdf]" />
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#70ffdf]">
                Artist · Producer · Pilot
              </span>
            </div>

            <h1>
              <img
                src="/brand/coptr-white-text-logo.webp"
                alt="Coptr"
                className="h-auto w-full max-w-[28rem] drop-shadow-[0_0_28px_rgba(112,255,223,0.16)]"
              />
            </h1>

            <p className="mt-8 max-w-lg text-xl font-medium leading-relaxed text-white sm:text-2xl">
              Helicopter Pilot by Day, Bass Architect by Night
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
              Precision shaped in the air. Energy engineered for the dance floor.
            </p>

            <div className="mt-9">
              <Link
                to={latestReleases[0].fanLink}
                className="group inline-flex items-center gap-3 rounded-full bg-[#70ffdf] px-6 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-[#02030a] shadow-[0_16px_50px_rgba(112,255,223,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_60px_rgba(112,255,223,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] focus-visible:ring-offset-4 focus-visible:ring-offset-[#02030a] motion-reduce:transform-none sm:px-8 sm:py-4"
              >
                Listen to “{latestReleases[0].title}”
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3" aria-label="Coptr social profiles">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open Coptr on ${social.name}`}
                  className="group grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#70ffdf]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] motion-reduce:transform-none"
                >
                  <img
                    src={social.image}
                    alt=""
                    className="size-6 object-contain transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[42rem] lg:mx-0 lg:justify-self-end">
            <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-[#045ded]/30 via-transparent to-[#fd46f0]/25 blur-3xl" />
            <img
              src="/brand/coptr-white-circle-logo.webp"
              alt=""
              className="absolute -right-[12%] -top-[9%] -z-10 w-[72%] opacity-[0.07]"
            />

            <div className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-[2rem] border border-white/15 bg-[#080b22] shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:w-[78%] lg:w-[82%]">
              <img
                src="/profile/coptr-sunglasses.webp"
                alt="Coptr, electronic music artist and helicopter pilot"
                className="h-full w-full object-cover object-[50%_28%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02030a]/85 via-transparent to-[#045ded]/10" />
              <div className="absolute bottom-5 right-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
                Miami · FL
              </div>
            </div>

            <div className="absolute -bottom-8 left-0 w-[58%] overflow-hidden rounded-2xl border border-[#70ffdf]/35 bg-[#080b22] p-1.5 shadow-[0_22px_70px_rgba(4,93,237,0.35)] sm:-bottom-10 sm:w-[62%] lg:-left-5">
              <img
                src="/profile/coptr-dj-performance-photo.webp"
                alt="Coptr performing behind a DJ controller"
                className="aspect-[16/10] w-full rounded-xl object-cover"
              />
            </div>

            <div className="absolute right-[5%] top-[12%] h-20 w-px bg-gradient-to-b from-transparent via-[#70ffdf] to-transparent" />
            <div className="absolute right-[5%] top-[12%] h-px w-20 bg-gradient-to-r from-transparent via-[#70ffdf] to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-[#1d269b]/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-[#70ffdf] to-[#fd46f0] bg-clip-text text-transparent">
            Latest Releases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {latestReleases.map((song) => (
              <Link
                key={song.id}
                to={song.fanLink}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 border border-white/10 hover:border-[#70ffdf]/50 hover:shadow-2xl hover:shadow-[#70ffdf]/20 aspect-square"
              >
                <img
                  src={song.coverArt}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />

                <ArrowUpRight
                  className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  size={24}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {song.title}
                  </h3>
                  <h4 className="text-lg text-gray-300">
                    {song.artist}
                  </h4>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-[#70ffdf]/0 to-[#fd46f0]/0 group-hover:from-[#70ffdf]/10 group-hover:to-[#fd46f0]/10 transition-all duration-500 pointer-events-none"></div>
              </Link>
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
              Coptr's sonic vision is directly influenced by his career as a helicopter pilot. The scientific yet artistic precision, broad range of operations, and the dynamic energy of Miami as seen from above are woven into every beat, evoking constant climb and descent in a meticulous soundscape. This connection to the essence of flight ensures an always-energetic, commanding presence in his music.
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
