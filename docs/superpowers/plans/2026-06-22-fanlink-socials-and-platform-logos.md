# Fanlink Socials and Platform Logos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Coptr's social links below fanlink metadata and display large logo-only identities inside the existing streaming cards.

**Architecture:** Move the existing seven social profiles into `src/data/socials.ts` so HomePage and SongDetailsPage share one typed array. Preserve the fanlink layout and card structure while changing only the metadata-adjacent social row and the visual contents of each streaming card.

**Tech Stack:** React 18, TypeScript, React Router 7, Vite, Tailwind CSS, Node.js built-in test runner

---

### Task 1: Share social profile data

**Files:**
- Create: `src/data/socials.ts`
- Modify: `src/components/HomePage.tsx`
- Modify: `tests/homepage-socials.test.mjs`

- [x] **Step 1: Update the social regression test first**

Load the TypeScript social module in the Node test, assert the exact seven name/URL/image mappings, and assert HomePage imports and maps the shared `socials` array instead of declaring a local array.

- [x] **Step 2: Run the test and verify it fails**

Run: `node --test tests/homepage-socials.test.mjs`

Expected: FAIL because `src/data/socials.ts` does not exist and HomePage still defines local social data.

- [x] **Step 3: Create shared social data and update HomePage**

Export a `Social` interface and the seven approved profiles from `src/data/socials.ts`. Import `socials` into HomePage and remove its local social array without altering the existing homepage card markup.

- [x] **Step 4: Run the test and verify it passes**

Run: `node --test tests/homepage-socials.test.mjs`

Expected: PASS for exact shared social mappings and homepage reuse.

### Task 2: Add fanlink socials and large platform logos

**Files:**
- Modify: `src/components/SongDetailsPage.tsx`
- Modify: `tests/song-details-page.test.mjs`

- [x] **Step 1: Extend the fanlink regression test first**

Assert SongDetailsPage imports `socials`, maps them beneath the metadata block, uses accessible labels and safe external-link attributes, and renders each platform logo with large width/height classes. Assert the separate `{link.platform}` text node and small white tile are absent.

- [x] **Step 2: Run the test and verify it fails**

Run: `node --test tests/song-details-page.test.mjs`

Expected: FAIL because fanlink socials are absent and platform cards still use small icon tiles plus text.

- [x] **Step 3: Render the social row**

Import `socials` and render seven 40–44px image links immediately after the conditional metadata block. Use wrapping alignment on mobile and desktop, `aria-label`, `target="_blank"`, `rel="noopener noreferrer"`, cyan focus rings, and restrained hover lift.

- [x] **Step 4: Update platform card contents**

Remove the white icon tile and text label. Render `platformLogos[link.platform]` directly with the platform name as alt text and classes equivalent to `h-12 w-32 sm:w-36 object-contain object-left`, preserving the card and arrow markup.

- [x] **Step 5: Run the test and verify it passes**

Run: `node --test tests/song-details-page.test.mjs`

Expected: PASS for social placement/accessibility and large logo-only platform cards.

### Task 3: Verify responsive behavior and build integrity

**Files:**
- Modify only if verification reveals an issue: `src/data/socials.ts`, `src/components/HomePage.tsx`, `src/components/SongDetailsPage.tsx`

- [x] **Step 1: Run all regression tests**

Run: `node --test tests/*.test.mjs`

Expected: all tests pass with zero failures.

- [x] **Step 2: Run static checks and production build**

Run: `npm run typecheck && npm run lint && npm run build`

Expected: all commands exit successfully.

- [x] **Step 3: Verify fanlinks in the browser**

Inspect `/stream/cruisin` at 390px and 1440px widths. Confirm seven social icons appear after metadata, platform cards use large logos without separate text, artwork and existing layout remain intact, keyboard labels remain accessible, and no broken images, horizontal overflow, or console errors occur.

- [x] **Step 4: Review the final diff**

Run `git diff --check` and inspect only this plan's files while preserving unrelated staged and unstaged work.
