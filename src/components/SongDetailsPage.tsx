import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, Download, Tag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { socials } from '../data/socials';
import { getSongById, platformLogos } from '../data/songs';
import NotFoundPage from './NotFoundPage';
import SongSeo from './SongSeo';

function formatReleaseDate(releaseDate: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${releaseDate}T00:00:00Z`));
}

export default function SongDetailsPage() {
  const { songId } = useParams();
  const song = getSongById(songId);

  if (!song) {
    return <NotFoundPage />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 pb-20 pt-28 text-white sm:px-6 sm:pt-32">
      <SongSeo song={song} />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#1d269b]/35 blur-[110px]" />
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#fd46f0]/15 blur-[100px]" />
        <div className="absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-[#70ffdf]/15 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(112,255,223,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(112,255,223,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <Link
          to="/music"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#70ffdf] focus:outline-none focus-visible:text-[#70ffdf] sm:mb-10"
        >
          <ArrowLeft size={17} />
          All music
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] lg:gap-16">
          <section className="lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-2 translate-x-2 translate-y-2 rounded-[1.75rem] bg-gradient-to-br from-[#70ffdf] via-[#045ded] to-[#fd46f0] opacity-75 blur-sm" />
              <img
                src={song.coverArt}
                alt={`${song.title} cover art`}
                className="relative aspect-square w-full rounded-3xl object-cover shadow-2xl shadow-[#045ded]/30"
              />
            </div>

            <div className="mt-8 text-center lg:text-left">
              <p className="mb-3 text-xs font-bold tracking-[0.3em] text-[#70ffdf]">
                COPTR // OFFICIAL FANLINK
              </p>
              <h1 className="text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl">
                {song.title}
              </h1>
              <p className="mt-4 text-lg font-medium text-gray-300">{song.artist}</p>

              {(song.releaseDate || song.duration || song.genres) && (
                <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-gray-400 lg:justify-start">
                  {song.releaseDate && (
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={16} className="text-[#70ffdf]" />
                      {formatReleaseDate(song.releaseDate)}
                    </span>
                  )}
                  {song.duration && (
                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={16} className="text-[#70ffdf]" />
                      {song.duration}
                    </span>
                  )}
                  {song.genres && (
                    <span className="inline-flex items-center gap-2">
                      <Tag size={16} className="text-[#70ffdf]" />
                      {song.genres.join(' / ')}
                    </span>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Coptr on ${social.name}`}
                    className="group rounded-xl transition duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(112,255,223,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <img
                      src={social.image}
                      alt=""
                      className="h-10 w-10 object-contain transition duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
                    />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section aria-labelledby="streaming-heading" className="min-w-0">
            <div className="mb-5 flex items-end justify-between border-b border-white/10 pb-4">
              <div>
                <p className="mb-2 text-[0.65rem] font-bold tracking-[0.28em] text-[#fd46f0]">
                  CHOOSE A SERVICE
                </p>
                <h2 id="streaming-heading" className="text-2xl font-black sm:text-3xl">
                  Listen now
                </h2>
              </div>
              <span className="text-sm tabular-nums text-gray-500">
                {song.streamingLinks.length} {song.streamingLinks.length === 1 ? 'link' : 'links'}
              </span>
            </div>
            
            <div className="space-y-3">
              {song.download && (
                  <a
                      href={song.download}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group  flex min-h-16 w-full items-center justify-between rounded-2xl bg-gradient-to-r from-[#70ffdf] to-[#045ded] px-5 py-4 font-black text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#70ffdf]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transform-none"
                  >
                    <span>Free Download</span>
                    <Download
                        size={22}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-y-0.5 motion-reduce:transform-none"
                    />
                  </a>
              )}
              {song.streamingLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 w-full items-center gap-4 rounded-2xl border border-white/10 bg-white px-4 py-3 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#70ffdf]/55 hover:bg-white/[0.09] hover:shadow-lg hover:shadow-[#045ded]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] sm:px-5"
                >
                  <img
                    src={platformLogos[link.platform]}
                    alt={link.platform}
                    className="h-8 w-32 object-contain object-left sm:w-36"
                  />
                  <span className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition group-hover:border-[#70ffdf]/40 group-hover:text-[#70ffdf]">
                    <ArrowUpRight size={19} />
                  </span>
                </a>
              ))}
            </div>


          </section>
        </div>
      </div>
    </main>
  );
}
