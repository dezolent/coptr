# Homepage Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's centered genre hero with an editorial split hero built from Coptr's supplied brand, profile, and social assets.

**Architecture:** Keep the change localized to `HomePage.tsx`, using the existing song and social data sources. Add a Node source-regression test first, then implement the responsive Tailwind composition and verify it at desktop and mobile sizes.

**Tech Stack:** React 18, TypeScript, React Router, Tailwind CSS, Vite, Node.js built-in test runner

---

### Task 1: Define the hero regression contract

**Files:**
- Create: `tests/homepage-hero.test.mjs`

- [x] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homeUrl = new URL('../src/components/HomePage.tsx', import.meta.url);

test('homepage hero uses the approved editorial assets and content', async () => {
  const source = await readFile(homeUrl, 'utf8');

  assert.match(source, /\/brand\/coptr-white-text-logo\.webp/);
  assert.match(source, /\/brand\/coptr-white-circle-logo\.webp/);
  assert.match(source, /\/profile\/coptr-secondary-profile\.webp/);
  assert.match(source, /\/profile\/coptr-dj-performance-photo\.webp/);
  assert.match(source, /Helicopter Pilot by Day, Bass Architect by Night/);
  assert.match(source, /to=\{latestReleases\[0\]\.fanLink\}/);
  assert.doesNotMatch(source, /MELODIC DUBSTEP|BROSTEP|BASS HOUSE/);
});

test('homepage hero social links are icon only and accessible', async () => {
  const source = await readFile(homeUrl, 'utf8');

  assert.match(source, /aria-label=\{`Open Coptr on \$\{social\.name\}`\}/);
  assert.match(source, /alt=""/);
  assert.doesNotMatch(source, /<span[^>]*>\s*\{social\.name\}\s*<\/span>/s);
});
```

- [x] **Step 2: Run the test and verify RED**

Run: `node --test tests/homepage-hero.test.mjs`

Expected: FAIL because the circle-logo watermark and profile composition are absent and social names are still rendered.

### Task 2: Build the editorial split hero

**Files:**
- Modify: `src/components/HomePage.tsx:10-105`

- [x] **Step 1: Replace the centered hero shell**

Use a `min-h-[100svh]` section with a `lg:grid-cols-[0.9fr_1.1fr]` content grid. Keep the dark base and add restrained cyan, blue, and magenta ambient gradients behind the content.

- [x] **Step 2: Build the content column**

Render `/brand/coptr-white-text-logo.webp`, the existing pilot description, and the existing `latestReleases[0].fanLink` CTA. Remove the genre heading completely.

- [x] **Step 3: Render icon-only social links**

```tsx
<div className="flex flex-wrap items-center gap-3" aria-label="Coptr social profiles">
  {socials.map((social) => (
    <a
      key={social.name}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open Coptr on ${social.name}`}
      className="group grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] transition hover:-translate-y-1 hover:border-[#70ffdf]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70ffdf]"
    >
      <img src={social.image} alt="" className="size-6 object-contain transition-transform group-hover:scale-110" />
    </a>
  ))}
</div>
```

- [x] **Step 4: Build the portrait composition**

Use `/brand/coptr-white-circle-logo.webp` as a low-opacity background watermark, `/profile/coptr-secondary-profile.webp` as the dominant portrait, and `/profile/coptr-dj-performance-photo.webp` as an overlapping landscape card. Add controlled cyan/magenta borders and shadows; hide or reduce the overlap below the medium breakpoint.

- [x] **Step 5: Respect reduced motion**

Use Tailwind `motion-safe:` variants for entrance, hover, and ambient animation. Avoid essential information depending on movement.

- [x] **Step 6: Run the focused tests and verify GREEN**

Run: `node --test tests/homepage-hero.test.mjs tests/homepage-socials.test.mjs`

Expected: all tests pass.

### Task 3: Verify behavior and presentation

**Files:**
- Modify only if verification exposes an issue: `src/components/HomePage.tsx`, `tests/homepage-hero.test.mjs`

- [x] **Step 1: Run the full automated suite**

Run: `node --test tests/*.test.mjs && npm run typecheck && npm run lint && npm run build`

Expected: every test passes and all commands exit successfully.

- [x] **Step 2: Inspect desktop presentation**

Run the development server and inspect at 1440 × 900. Confirm the content/image split is balanced, copy remains readable, image crops preserve the subject, and no horizontal overflow exists.

- [x] **Step 3: Inspect mobile presentation**

Inspect at 390 × 844. Confirm content appears before imagery, the CTA and all social icons fit comfortably, the portrait remains identifiable, and the performance card does not crowd the viewport.

- [x] **Step 4: Review the final diff**

Run: `git diff --check && git diff -- src/components/HomePage.tsx tests/homepage-hero.test.mjs`

Expected: no whitespace errors and only the approved hero/test changes appear.
