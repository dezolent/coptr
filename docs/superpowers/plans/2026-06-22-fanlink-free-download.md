# Fanlink Free Download Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a prominent external free-download action on fanlink pages for songs that define a download URL.

**Architecture:** Extend the shared `Song` interface with an optional `download` URL. `SongDetailsPage` conditionally renders one styled external link after the streaming-service cards, so songs without the field remain unchanged.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, lucide-react, Node.js built-in test runner

---

### Task 1: Add the download contract test

**Files:**
- Modify: `tests/song-details-page.test.mjs`

- [x] **Step 1: Write the failing test**

```js
test('song details page conditionally renders an external free download action', async () => {
  const source = await readFile(pageUrl, 'utf8');

  assert.match(source, /song\.download &&/);
  assert.match(source, /href=\{song\.download\}/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
  assert.match(source, />\s*Free Download\s*</);
});
```

- [x] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/song-details-page.test.mjs`

Expected: FAIL because the fanlink component does not reference `song.download`.

### Task 2: Add the conditional download action

**Files:**
- Modify: `src/data/songs.ts:18-31`
- Modify: `src/components/SongDetailsPage.tsx:1,150-181`

- [x] **Step 1: Extend the shared song type**

Add `download?: string;` to `Song` so existing catalog entries remain valid while CRUISIN' exposes its Hypeddit URL.

- [x] **Step 2: Render the free-download link**

Import `Download` from `lucide-react`. After the streaming-link list, render the following only when `song.download` is defined:

```tsx
{song.download && (
  <a
    href={song.download}
    target="_blank"
    rel="noopener noreferrer"
    className="group mt-6 flex min-h-16 w-full items-center justify-between rounded-2xl bg-gradient-to-r from-[#70ffdf] to-[#045ded] px-5 py-4 font-black text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#70ffdf]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
  >
    <span>Free Download</span>
    <Download size={22} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
  </a>
)}
```

- [x] **Step 3: Run the focused test and verify GREEN**

Run: `node --test tests/song-details-page.test.mjs`

Expected: all song-details tests pass.

### Task 3: Verify the application

**Files:**
- Modify only if verification exposes an issue: `src/data/songs.ts`, `src/components/SongDetailsPage.tsx`, `tests/song-details-page.test.mjs`

- [x] **Step 1: Run all automated checks**

Run: `node --test tests/*.test.mjs && npm run typecheck && npm run lint && npm run build`

Expected: every command exits successfully.

- [x] **Step 2: Inspect download and non-download fanlinks**

Verify `/stream/cruisin` shows the button at desktop and mobile sizes, `/stream/hot-start` does not show it, and neither page has horizontal overflow or console errors.

- [x] **Step 3: Review the diff**

Run: `git diff --check`.

Expected: no whitespace errors.
