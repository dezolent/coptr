# Remove Gallery Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the Gallery page and every application reference to it so `/gallery` follows the router's existing fallback behavior.

**Architecture:** Delete the standalone Gallery component, remove its route registration from `App.tsx`, and remove its shared navigation entry. Add a source-level regression test that guards against reintroducing the route, navigation item, import, or component file.

**Tech Stack:** React 18, TypeScript, React Router, Node.js built-in test runner

---

### Task 1: Define the Gallery-removal contract

**Files:**
- Create: `tests/gallery-removal.test.mjs`

- [x] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const appUrl = new URL('../src/App.tsx', import.meta.url);
const navigationUrl = new URL('../src/components/Navigation.tsx', import.meta.url);
const galleryUrl = new URL('../src/components/GalleryPage.tsx', import.meta.url);

test('gallery page, route, import, and navigation entry are removed', async () => {
  const [appSource, navigationSource] = await Promise.all([
    readFile(appUrl, 'utf8'),
    readFile(navigationUrl, 'utf8'),
  ]);

  assert.equal(existsSync(galleryUrl), false);
  assert.doesNotMatch(appSource, /GalleryPage|\/gallery/i);
  assert.doesNotMatch(navigationSource, /Gallery|\/gallery/i);
});
```

- [x] **Step 2: Run the test and verify RED**

Run: `node --test tests/gallery-removal.test.mjs`

Expected: FAIL because `GalleryPage.tsx`, its import, route, and navigation item still exist.

### Task 2: Remove the Gallery feature

**Files:**
- Delete: `src/components/GalleryPage.tsx`
- Modify: `src/App.tsx:5,16`
- Modify: `src/components/Navigation.tsx:12`

- [x] **Step 1: Remove the route and import**

Delete `import GalleryPage from './components/GalleryPage';` and `<Route path="/gallery" element={<GalleryPage />} />` from `src/App.tsx` without adding a replacement route.

- [x] **Step 2: Remove the navigation entry**

Delete `{ path: '/gallery', label: 'Gallery' },` from the shared `navItems` array so it disappears from desktop and mobile navigation.

- [x] **Step 3: Delete the component**

Delete `src/components/GalleryPage.tsx`; retain the profile images because they are also used elsewhere.

- [x] **Step 4: Run the focused test and verify GREEN**

Run: `node --test tests/gallery-removal.test.mjs`

Expected: one passing test.

### Task 3: Verify the application

**Files:**
- Modify only if verification exposes an issue: `src/App.tsx`, `src/components/Navigation.tsx`, `tests/gallery-removal.test.mjs`

- [x] **Step 1: Search for residual references**

Run: `rg -n -i "gallery|/gallery" src tests --glob '!tests/gallery-removal.test.mjs'`.

Expected: no matches.

- [x] **Step 2: Run all automated checks**

Run: `node --test tests/*.test.mjs && npm run typecheck && npm run lint && npm run build`.

Expected: every command exits successfully.

- [x] **Step 3: Review the diff**

Run: `git diff --check`.

Expected: no whitespace errors.
