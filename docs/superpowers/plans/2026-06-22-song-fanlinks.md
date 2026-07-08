# Song Data and Fanlink Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Drive homepage and Music page song cards from one typed song catalog and provide a mobile-first fanlink page for every song at `/stream/:songId`.

**Architecture:** `src/data/songs.ts` owns song metadata, lookup helpers, release sorting, and explicit platform-logo mappings. `SongDetailsPage` consumes the route ID and catalog, while HomePage and MusicPage consume shared sorted selectors and use internal React Router links.

**Tech Stack:** React 18, TypeScript, React Router 7, Vite, Tailwind CSS, Node.js built-in test runner

---

### Task 1: Create and validate the shared song catalog

**Files:**
- Create: `src/data/songs.ts`
- Create: `tests/song-catalog.test.mjs`

- [x] **Step 1: Write a failing catalog test**

Use TypeScript's `transpileModule` in a Node test to load `src/data/songs.ts`. Assert eight unique IDs and fanlinks, the supplied metadata, the three added SoundCloud-only songs, newest-release selection, song lookup, and platform logo paths.

- [x] **Step 2: Verify the catalog test fails**

Run: `node --test tests/song-catalog.test.mjs`

Expected: FAIL because `src/data/songs.ts` does not exist.

- [x] **Step 3: Implement the catalog**

Define `StreamingPlatform`, `StreamingLink`, and `Song`. Export `platformLogos`, all eight `songs`, `getSongById(id)`, and `getSongsByNewestRelease()`. Optional metadata fields cover missing dates and supplied duration, genre, and price values. Undated songs sort after dated releases without mutating `songs`.

- [x] **Step 4: Verify the catalog test passes**

Run: `node --test tests/song-catalog.test.mjs`

Expected: PASS with catalog data, sorting, lookup, and platform mappings validated.

### Task 2: Add the dynamic fanlink route and page

**Files:**
- Create: `src/components/SongDetailsPage.tsx`
- Modify: `src/App.tsx`
- Create: `tests/song-details-page.test.mjs`

- [x] **Step 1: Write a failing route/page source test**

Assert `App.tsx` registers `/stream/:songId`, the page uses `useParams`, `getSongById`, `platformLogos`, maps every song streaming link, uses safe external anchors, and renders a `/music` not-found link.

- [x] **Step 2: Verify the page test fails**

Run: `node --test tests/song-details-page.test.mjs`

Expected: FAIL because the route and component do not exist.

- [x] **Step 3: Implement the mobile-first fanlink page**

Build a centered responsive page with album art, title, artist, conditional release metadata, and full-width platform buttons. Each button renders the mapped `/platforms/*.webp` logo and opens its external URL safely. Render a branded unknown-song state when lookup fails.

- [x] **Step 4: Register the route**

Import `SongDetailsPage` in `App.tsx` and add `<Route path="/stream/:songId" element={<SongDetailsPage />} />`.

- [x] **Step 5: Verify the page test passes**

Run: `node --test tests/song-details-page.test.mjs`

Expected: PASS for route, streaming buttons, platform logos, and not-found behavior.

### Task 3: Drive Music and homepage cards from the catalog

**Files:**
- Modify: `src/components/MusicPage.tsx`
- Modify: `src/components/HomePage.tsx`
- Create: `tests/song-card-links.test.mjs`

- [x] **Step 1: Write a failing shared-card test**

Assert both pages import the shared catalog selector, render cards from song data, use React Router `Link` to `song.fanLink`, and no longer contain hardcoded release arrays or external song-card targets. Assert HomePage selects the first three newest releases and its hero CTA uses the newest fanlink.

- [x] **Step 2: Verify the card test fails**

Run: `node --test tests/song-card-links.test.mjs`

Expected: FAIL because both pages still hardcode their song cards.

- [x] **Step 3: Refactor MusicPage**

Import `Link`, `ArrowUpRight`, and `getSongsByNewestRelease`. Render all eight songs from the selector and link each card internally to `song.fanLink`, retaining the existing responsive artwork treatment and artist labels.

- [x] **Step 4: Refactor HomePage**

Import `Link`, `ArrowUpRight`, and `getSongsByNewestRelease`. Select the newest three songs, use `song.coverArt`, and point both cards and the hero CTA to internal fanlinks.

- [x] **Step 5: Verify the card test passes**

Run: `node --test tests/song-card-links.test.mjs`

Expected: PASS for shared data use and internal navigation.

### Task 4: Verify functionality and responsive rendering

**Files:**
- Modify only if verification identifies an issue: `src/data/songs.ts`, `src/components/SongDetailsPage.tsx`, `src/components/MusicPage.tsx`, `src/components/HomePage.tsx`, `src/App.tsx`

- [x] **Step 1: Run all regression tests**

Run: `node --test tests/*.test.mjs`

Expected: all tests pass with zero failures.

- [x] **Step 2: Run static checks and production build**

Run: `npm run typecheck && npm run lint && npm run build`

Expected: all commands exit successfully.

- [x] **Step 3: Verify in the browser**

Start the Vite development server and inspect `/music`, `/stream/cruisin`, `/stream/2-much-coptr-flip`, and `/stream/does-not-exist` at mobile and desktop widths. Confirm artwork, internal navigation, platform logos, full-width tap targets, metadata, and the not-found state render without horizontal overflow or console errors.

- [x] **Step 4: Review the final diff**

Run: `git diff --check` and inspect only the files in this plan, preserving unrelated working-tree changes.
