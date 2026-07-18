import { ArrowUpRight, CalendarDays, Download, Headphones, Mail, MapPin, Plane, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { socials } from '../data/socials';
import { getSongById } from '../data/songs';
import PageSeo from './PageSeo';

const bookingEmail = 'paul.f.gerlach@gmail.com';
const bookingEmailUrl = 'mailto:paul.f.gerlach@gmail.com';
const epkPdfUrl = '/coptr-epk.pdf';
const sampleOpenerMixUrl = 'https://soundcloud.com/coptrmp3/support-mix-take1/s-UkMCcLh93Uo';
const epkSocialNames = new Set([
  'Spotify',
  'SoundCloud',
  'Apple Music',
  'YouTube',
  'Instagram',
  'TikTok',
]);

export default function EpkPage() {
  const cruisin = getSongById('cruisin');

  const iconLinks = [
    ...socials.filter((social) => epkSocialNames.has(social.name)),
    {
      name: 'Email',
      url: bookingEmailUrl,
      image: '',
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#01040a] px-4 pb-12 pt-28 text-white sm:px-6 lg:pt-32 print:bg-white print:p-0">
      <PageSeo page="epk" />
      <div className="pointer-events-none fixed inset-0 -z-10 print:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(112,255,223,0.16),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(253,70,240,0.16),transparent_30%),radial-gradient(circle_at_58%_78%,rgba(4,93,237,0.22),transparent_34%),linear-gradient(135deg,#01040a_0%,#071226_45%,#02030a_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(112,255,223,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(112,255,223,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="mx-auto mb-5 flex w-full max-w-[980px] justify-end print:hidden">
        <a
          href={epkPdfUrl}
          download="coptr-epk.pdf"
          aria-label="Download EPK as PDF"
          className="inline-flex items-center gap-2 rounded-full border border-[#70ffdf]/45 bg-[#70ffdf] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#030711] shadow-[0_16px_45px_rgba(112,255,223,0.2)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_55px_rgba(112,255,223,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01040a] motion-reduce:transform-none"
        >
          <Download size={18} aria-hidden="true" />
          <span>Download EPK PDF</span>
        </a>
      </div>

      <article className="relative mx-auto min-h-[1100px] w-full max-w-[980px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#030711]/95 shadow-[0_40px_120px_rgba(0,0,0,0.55)] print:min-h-[11in] print:w-[8.5in] print:max-w-none print:rounded-none print:border-0 print:shadow-none">
        <div className="absolute inset-0 -z-10">
          <img
            src="/profile/coptr-banner.webp"
            alt=""
            className="h-full w-full object-cover opacity-[0.13] mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,7,17,0.98)_0%,rgba(3,7,17,0.84)_44%,rgba(5,26,45,0.78)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(253,70,240,0.2),transparent_22%),radial-gradient(circle_at_60%_68%,rgba(112,255,223,0.12),transparent_28%)]" />
          <div className="absolute -right-32 -top-28 size-[28rem] rounded-full border border-[#70ffdf]/20" />
          <div className="absolute -right-16 -top-12 size-[18rem] rounded-full border border-[#70ffdf]/15" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#70ffdf] via-[#fd46f0] to-[#045ded]" />
        </div>

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <section className="relative z-10 flex flex-col justify-between">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.26em] text-[#70ffdf]">
                <span className="rounded-full border border-[#70ffdf]/35 bg-[#70ffdf]/10 px-3 py-1">
                  Electronic Press Kit
                </span>
                <span className="inline-flex items-center gap-2 text-white/60">
                  <MapPin size={14} className="text-[#fd46f0]" />
                  Brickell · Miami
                </span>
              </div>

              <h1>
                <img
                  src="/brand/coptr-white-text-logo.webp"
                  alt="Coptr"
                  className="h-auto w-full max-w-[23rem] drop-shadow-[0_0_26px_rgba(112,255,223,0.2)]"
                />
              </h1>

              <div className="mt-7 max-w-xl">
                <p className="text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                  Aviation-grade bass for Miami opening rooms.
                </p>
                <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
                  Brickell-based helicopter pilot turned DJ, building an aviation-inspired audiovisual identity through melodic hybrid dubstep, rock influences, and coastal night-drive energy — from beach roads to afterhours.
                </p>
              </div>


            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-white/10 bg-[linear-gradient(135deg,rgba(253,70,240,0.16),rgba(255,255,255,0.055))] p-5 shadow-[0_16px_45px_rgba(253,70,240,0.1)] backdrop-blur-sm">
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#fd46f0]">
                  FFO
                </p>
                <p className="text-sm font-semibold leading-6 text-white">
                  Virtual Riot, Subtronics, Crankdat, Tape B
                </p>
              </div>

              <div className="rounded-xl bg-[linear-gradient(135deg,rgba(112,255,223,0.18),rgba(4,93,237,0.12))] p-5 shadow-[0_16px_45px_rgba(112,255,223,0.08)] backdrop-blur-sm">
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#70ffdf]">
                  Local opening slots
                </p>
                <p className="text-sm font-semibold leading-6 text-white">
                  Built for support sets, club warmups, and local promoter lineups.
                </p>
              </div>
            </div>
          </section>

          <section className="relative min-h-[28rem] lg:min-h-[34rem]" aria-label="Coptr artist images">
            <img
              src="/brand/coptr-white-circle-logo.webp"
              alt=""
              className="absolute -right-10 -top-8 w-[70%] opacity-[0.07]"
            />

            <div className="absolute right-0 top-0 w-[78%] overflow-hidden rounded-xl border border-white/15 bg-[#071226] shadow-[0_28px_40px_rgba(4,93,237,0.10)]">
              <img
                src="/profile/coptr-sunglasses.webp"
                alt="Coptr wearing sunglasses"
                className="aspect-[4/5] w-full object-cover object-[50%_28%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030711]/85 via-transparent to-[#045ded]/10" />
              <div
                aria-hidden="true"
                className="absolute right-6 top-6 h-24 w-24 border-r border-t border-[#70ffdf]/70 shadow-[10px_-10px_24px_rgba(112,255,223,0.14)]"
              />
              <div
                aria-hidden="true"
                className="absolute right-6 top-6 h-px w-24 bg-gradient-to-l from-[#70ffdf] to-transparent"
              />
            </div>

            <div className="absolute bottom-9 left-0 w-[56%] overflow-hidden rounded-xl bg-black p-1.5">
              <img
                src="/profile/coptr-dj-performance-photo.webp"
                alt="Coptr performing behind DJ equipment"
                className="aspect-[16/11] w-full rounded-xl object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-4 rounded-xl border border-white/10 bg-black/45 px-4 py-3 text-right backdrop-blur-md">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-[#70ffdf]">
                flight plan
              </p>
              <p className="mt-1 text-xs font-semibold text-white/80">
                Brickell → beach roads → afterhours
              </p>
            </div>

          </section>
        </div>

        <div className="grid gap-6 px-6 pb-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">

          <section className="rounded-xl bg-[linear-gradient(135deg,rgba(4,93,237,0.26),rgba(253,70,240,0.18),rgba(112,255,223,0.12))] p-5 shadow-[0_24px_70px_rgba(4,93,237,0.18)] backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.26em] text-[#70ffdf]">
                  Listen / contact
                </p>
                <h2 className="mt-1 text-lg font-black">Quick links for booking</h2>
              </div>
              <a
                href={bookingEmailUrl}
                className="hidden rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-white/75 transition hover:border-[#70ffdf]/50 hover:text-[#70ffdf] sm:inline-flex"
              >
                {bookingEmail}
              </a>
            </div>

            <div className="mb-6 flex flex-wrap gap-2" aria-label="Coptr EPK icon links">
              {iconLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name === 'Email' ? undefined : '_blank'}
                  rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
                  aria-label={`Open ${link.name}`}
                  className="grid size-12 place-items-center rounded-2xl border border-white/15 bg-black/35 transition duration-300 hover:-translate-y-1 hover:border-[#70ffdf]/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] motion-reduce:transform-none"
                >
                  {link.image ? (
                    <img
                      src={link.image}
                      alt=""
                      className="size-7 object-contain"
                    />
                  ) : (
                    <Mail size={23} className="text-[#70ffdf]" />
                  )}
                </a>
              ))}
            </div>

            <div className="grid gap-3">
              <a
                  href={sampleOpenerMixUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative isolate flex min-h-28 max-w-xl items-center justify-between overflow-hidden rounded-xl  bg-[#fd46f0] px-5 py-5 text-black shadow-[0_22px_70px_rgba(253,70,240,0.28)] transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_85px_rgba(253,70,240,0.38)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fd46f0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030711] motion-reduce:transform-none"
              >
                <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(112,255,223,0.38),transparent_30%),linear-gradient(135deg,rgba(253,70,240,1),rgba(255,120,54,0.92))]" />
                <span>
                  <span className="mb-2 inline-flex rounded-full bg-black/20 px-2.5 py-1 text-[0.58rem] font-black uppercase tracking-[0.24em] text-white">
                    PRIMARY LISTEN
                  </span>
                  <span className="block text-2xl font-black leading-tight text-black">
                    Sample Opener Mix
                  </span>
                  <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em] text-black/65">
                    Opening-set preview for promoters
                  </span>
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-black text-[#70ffdf] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight size={23} />
                </span>
              </a>
              <Link
                to={cruisin?.fanLink ?? '/stream/cruisin'}
                className="group flex items-center gap-4 rounded-xl bg-white text-black transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#70ffdf]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] motion-reduce:transform-none"
              >
                <img
                  src={cruisin?.coverArt ?? '/covers/coptr-cruisin.webp'}
                  alt=""
                  className="size-28 rounded-l-xl object-cover"
                />
                <span className="min-w-0 flex-1 py-3 pr-3">
                  <span className="block text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#045ded]">
                    Latest track
                  </span>
                  <span className="mt-1 block truncate text-lg font-black">
                    {cruisin?.title ?? "CRUISIN'"}
                  </span>
                </span>
                <ArrowUpRight className="mr-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={21} />
              </Link>
            </div>
          </section>

          <section className="rounded-xl bg-[linear-gradient(150deg,rgba(255,255,255,0.075),rgba(4,93,237,0.12))] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <Plane className="text-[#70ffdf]" size={22} />
              <h2 className="text-lg font-black">Promoter snapshot</h2>
            </div>
            <div className="space-y-4 text-sm leading-6 text-slate-300">
              <p>
                Coptr is positioning locally as a reliable opener with a visual identity promoters can remember: helicopter pilot precision, neon Miami movement, and melodic bass with enough edge for late-night rooms.
              </p>
              <ul className="grid gap-3 text-white/90">
                <li className="flex gap-3">
                  <CalendarDays size={17} className="mt-1 shrink-0 text-[#fd46f0]" />
                  <span>Ready for short direct-support and early-night club sets.</span>
                </li>
                <li className="flex gap-3">
                  <Radio size={17} className="mt-1 shrink-0 text-[#fd46f0]" />
                  <span>Sound: melodic hybrid dubstep, rock influence, coastal night-drive energy.</span>
                </li>
                <li className="flex gap-3">
                  <Headphones size={17} className="mt-1 shrink-0 text-[#fd46f0]" />
                  <span>Audience fit: bass-forward local clubs, afterhours, and beach-road pregame bills.</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
