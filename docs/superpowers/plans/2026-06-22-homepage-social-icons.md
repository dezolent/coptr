# Homepage Social Icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's component-library social icons with the seven supplied social image assets and URLs.

**Architecture:** Keep the social cards data-driven inside `HomePage.tsx`, replacing component and color fields with static image paths. A small Node source regression test will validate the exact mappings and removal of excluded entries without adding a test framework dependency.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Node.js built-in test runner

---

### Task 1: Add the social mapping regression test

**Files:**
- Create: `tests/homepage-socials.test.mjs`

- [x] **Step 1: Write the failing test**

Create a Node test that reads `src/components/HomePage.tsx`, asserts the seven exact name/URL/image mappings, checks that the social data uses image paths, and confirms LinkTree and YouTube Music entries are absent.

- [x] **Step 2: Run the test to verify it fails**

Run: `node --test tests/homepage-socials.test.mjs`

Expected: FAIL because the current social entries use icon components and still include LinkTree and YouTube Music.

### Task 2: Render the supplied social assets

**Files:**
- Modify: `src/components/HomePage.tsx:1-18,85-101`

- [x] **Step 1: Replace the social data**

Remove unused social icon imports. Define exactly seven social entries, in the approved order, with `name`, `url`, and `image` fields matching the design specification.

- [x] **Step 2: Render image elements**

Replace `<social.icon>` with an `<img>` whose `src` is `social.image`, `alt` is `social.name`, and classes preserve the current 32-pixel presentation and hover scaling.

- [x] **Step 3: Run the regression test**

Run: `node --test tests/homepage-socials.test.mjs`

Expected: PASS with one successful test.

### Task 3: Verify the application

**Files:**
- Modify only if verification exposes an issue: `src/components/HomePage.tsx`, `tests/homepage-socials.test.mjs`

- [x] **Step 1: Run static checks**

Run: `npm run typecheck && npm run lint`

Expected: both commands exit successfully with no errors.

- [x] **Step 2: Run the production build**

Run: `npm run build`

Expected: Vite completes a production build successfully.

- [x] **Step 3: Review the final diff**

Run: `git diff --check && git diff -- src/components/HomePage.tsx tests/homepage-socials.test.mjs`

Expected: no whitespace errors; the diff is limited to the requested social mapping and test, alongside the user's pre-existing homepage asset-path edits.
