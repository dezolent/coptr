# Song Data and Fanlink Pages Design

## Scope

Move song metadata into one typed application data module based on the supplied `songs.ts`. Extend it with the existing 2 Much, Signal Machine, and Demo Mix entries, each using its currently known SoundCloud URL as its only streaming link. Use this data to render the Music page, the homepage's latest-release cards, and individual fanlink pages.

## Data Model

Create `src/data/songs.ts` with exported `StreamingLink` and `Song` types plus the exported `songs` array. Preserve all supplied fields and links. Add stable URL-safe IDs and `/stream/<id>` fanlinks for the three missing songs.

Songs will remain in one explicit display order for the Music page. Homepage latest releases will be derived by sorting a copy by release date descending and selecting the first three, avoiding mutation of the shared array.

## Routing and Lookup

Add a dynamic React Router route at `/stream/:songId`. `SongDetailsPage` will read the route parameter and find the matching song by `id`. Known IDs render the fanlink; unknown IDs render a branded not-found state with a link back to `/music`.

Homepage and Music page cards will use React Router `Link` components targeting each song's `fanLink`. The homepage hero listen button will target the newest song's fanlink. External streaming buttons continue to open in a new tab with `noopener noreferrer`.

## Fanlink Page

The page will be mobile-first and consistent with the existing black, cyan, blue, pink, and purple visual language. It will show:

- Square album artwork
- Song title and artist
- Release date, plus duration and genres where supplied
- A vertically stacked, full-width streaming button for every `streamingLinks` entry
- The matching logo from `/public/platforms`

Platform names map to lowercase kebab-case asset names, including `apple-music.webp` and `amazon-music.webp`. Every platform in the data has a corresponding existing asset.

## Music and Homepage Cards

The Music page will render all eight data entries and retain its existing responsive card treatment. The homepage will render the three newest songs by release date using the same shared data. Internal navigation will replace external anchors for song cards, and the external-link glyph will be replaced with a navigation-appropriate arrow.

## Verification

Implement test-first source/data regression coverage for:

- All eight songs and required fanlink IDs
- SoundCloud-only links for the three added entries
- Platform asset mappings
- Dynamic route registration and unknown-song handling
- Homepage and Music page use of shared song data and internal fanlinks

Then run the regression tests, TypeScript checks, ESLint, a production Vite build, and browser checks at mobile and desktop widths.
