import { useEffect } from 'react';
import { ArrowUpRight, Headphones, Home, MapPinOff, RadioTower } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  SITE_IMAGE,
  SITE_IMAGE_ALT,
  SITE_IMAGE_HEIGHT,
  SITE_IMAGE_TYPE,
  SITE_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
} from '../data/siteSeo';

const NOT_FOUND_TITLE = '404 | Signal Lost | Coptr';
const NOT_FOUND_DESCRIPTION =
  'This flight path does not exist. Return to Coptr’s official website, music, or electronic press kit.';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
  element.dataset.coptrNotFound = 'true';
}

function useNotFoundSeo(pathname: string) {
  useEffect(() => {
    document.title = '404 | Signal Lost | Coptr';

    const metadata = [
      ['name', 'description', NOT_FOUND_DESCRIPTION],
      ['name', 'robots', 'noindex, follow'],
      ['property', 'og:type', 'website'],
      ['property', 'og:site_name', SITE_NAME],
      ['property', 'og:locale', SITE_LOCALE],
      ['property', 'og:title', NOT_FOUND_TITLE],
      ['property', 'og:description', NOT_FOUND_DESCRIPTION],
      ['property', 'og:url', window.location.href],
      ['property', 'og:image', SITE_IMAGE],
      ['property', 'og:image:type', SITE_IMAGE_TYPE],
      ['property', 'og:image:width', SITE_IMAGE_WIDTH],
      ['property', 'og:image:height', SITE_IMAGE_HEIGHT],
      ['property', 'og:image:alt', SITE_IMAGE_ALT],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', NOT_FOUND_TITLE],
      ['name', 'twitter:description', NOT_FOUND_DESCRIPTION],
      ['name', 'twitter:image', SITE_IMAGE],
      ['name', 'twitter:image:alt', SITE_IMAGE_ALT],
    ] as const;

    metadata.forEach(([attribute, key, content]) => upsertMeta(attribute, key, content));

    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.remove();
    document.head
      .querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')
      .forEach((schema) => schema.remove());
  }, [pathname]);
}

export default function NotFoundPage() {
  const location = useLocation();
  useNotFoundSeo(location.pathname);

  return (
    <main
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#02030a] px-5 pb-14 pt-28 text-white sm:px-8 sm:pt-32 lg:px-12"
      aria-labelledby="not-found-heading"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_72%_45%,rgba(4,93,237,0.24),transparent_32%),radial-gradient(circle_at_18%_82%,rgba(253,70,240,0.15),transparent_30%),linear-gradient(125deg,#02030a_0%,#070a1c_48%,#02030a_100%)]" />
      <div className="absolute inset-0 -z-20 opacity-35 [background-image:linear-gradient(rgba(112,255,223,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(112,255,223,0.07)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(circle_at_70%_45%,black,transparent_72%)]" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[0.04em] top-20 -z-10 select-none text-[clamp(11rem,32vw,31rem)] font-black leading-none tracking-[-0.1em] text-transparent opacity-20 [-webkit-text-stroke:1px_rgba(112,255,223,0.55)]"
      >
        404
      </span>

      <div className="pointer-events-none absolute -right-36 top-[52%] -z-10 aspect-square w-[min(92vw,48rem)] -translate-y-1/2 sm:-right-24 lg:right-[3vw]" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border border-[#70ffdf]/20 shadow-[0_0_80px_rgba(4,93,237,0.12)]" />
        <div className="absolute inset-[14%] rounded-full border border-[#70ffdf]/20" />
        <div className="absolute inset-[29%] rounded-full border border-[#70ffdf]/25" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#70ffdf]/35 to-transparent" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#70ffdf]/35 to-transparent" />
        <div className="absolute inset-[2%] overflow-hidden rounded-full opacity-80">
          <div className="absolute inset-0 origin-center bg-[conic-gradient(from_30deg,transparent_0deg,transparent_305deg,rgba(112,255,223,0.02)_318deg,rgba(112,255,223,0.38)_359deg,transparent_360deg)] motion-safe:animate-[spin_7s_linear_infinite] motion-reduce:animate-none" />
        </div>
        <div className="absolute left-[64%] top-[23%] size-2 rounded-full bg-[#fd46f0] shadow-[0_0_16px_4px_rgba(253,70,240,0.65)] motion-safe:animate-pulse motion-reduce:animate-none" />
        <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#70ffdf]/35 bg-[#02030a]/75 shadow-[0_0_45px_rgba(112,255,223,0.16)] backdrop-blur-sm sm:size-24">
          <img
            src="/brand/coptr-white-circle-logo.webp"
            alt=""
            className="size-12 object-contain opacity-80 sm:size-14"
          />
        </div>
      </div>



      <div className="mx-auto grid w-full max-w-7xl items-center lg:grid-cols-[minmax(0,0.86fr)_minmax(24rem,1.14fr)]">
        <section className="relative z-10 max-w-2xl">
          <div className="mb-7 flex items-center gap-3 text-[0.68rem] font-black uppercase tracking-[0.26em] text-[#70ffdf] sm:text-xs">
            <RadioTower size={17} aria-hidden="true" />
            <span>
              <span className="block sm:inline">Search &amp; Rescue //</span>
              <span className="block sm:inline"> Route Not Found</span>
            </span>
          </div>

          <p className="mb-3 text-sm font-black uppercase tracking-[0.32em] text-[#fd46f0]">
            SIGNAL LOST
          </p>
          <h1 id="not-found-heading" className="text-[clamp(2rem,9vw,4.5rem)] font-black leading-[0.92] tracking-[-0.05em] sm:text-7xl lg:text-[6.5rem]">
            <span className="block sm:inline">This flight</span>
            <span className="block sm:inline"> path</span>
            <span className="block bg-gradient-to-r from-white via-[#70ffdf] to-[#045ded] bg-clip-text text-transparent">
              <span className="block sm:inline">doesn’t</span>
              <span className="block sm:inline"> exist.</span>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            The coordinates may be outdated or the route was entered incorrectly. Rejoin Coptr’s official flight plan below.
          </p>

          <div className="mt-7 flex max-w-xl items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3.5 backdrop-blur-md sm:px-5">
            <MapPinOff className="mt-0.5 shrink-0 text-[#fd46f0]" size={19} aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/45">Last requested coordinate</p>
              <p className="mt-1 break-all font-mono text-sm text-white/80" aria-label={`Missing page: ${location.pathname}`}>
                {location.pathname}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#70ffdf] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-[#02030a] shadow-[0_16px_45px_rgba(112,255,223,0.18)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_55px_rgba(112,255,223,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] focus-visible:ring-offset-4 focus-visible:ring-offset-[#02030a] motion-reduce:transform-none"
            >
              <Home size={18} aria-hidden="true" />
              Return home
            </Link>
            <Link
              to="/music"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#fd46f0]/65 hover:bg-[#fd46f0]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fd46f0] focus-visible:ring-offset-4 focus-visible:ring-offset-[#02030a] motion-reduce:transform-none"
            >
              <Headphones size={18} aria-hidden="true" />
              Browse music
            </Link>
          </div>

          <Link
            to="/epk"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white/55 transition hover:text-[#70ffdf] focus:outline-none focus-visible:text-[#70ffdf]"
          >
            Promoters: open the EPK
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </section>

        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </main>
  );
}
