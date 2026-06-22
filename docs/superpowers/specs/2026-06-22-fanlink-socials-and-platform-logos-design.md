# Fanlink Socials and Platform Logos Design

## Scope

Preserve the current fanlink page structure, palette, responsive layout, artwork treatment, metadata, streaming-card styling, and interactions. Add Coptr's social links beneath song metadata and replace the streaming cards' small icon-plus-text treatment with large platform logos.

## Shared Social Data

Create `src/data/socials.ts` as the single source for Coptr's seven profiles: Spotify, Apple Music, SoundCloud, YouTube, Instagram, TikTok, and Facebook. Each entry contains its name, URL, and existing `/social/*.webp` image path. The homepage and fanlink page will both consume this array.

## Fanlink Social Row

Render all seven social links immediately below the release date, duration, and genre metadata on desktop and mobile. The row will wrap on narrow screens and use compact 40–44px image links. Each link opens externally with `noopener noreferrer`, has an accessible label, and retains the fanlink page's cyan focus and restrained hover treatment.

Songs without metadata will still render the social row in the same location below the artist, so every fanlink exposes Coptr's profiles consistently.

## Streaming Platform Cards

Keep the current vertical cards, borders, spacing, arrow control, hover movement, focus treatment, and external-link behavior. Remove the separate platform text label and small white icon tile. Render the corresponding `/platforms/*.webp` image as the accessible platform identity, sized approximately 120–150px wide and up to 48px tall with `object-contain` so logos retain their native proportions.

## Verification

Add regression coverage for shared social data, homepage reuse, fanlink social placement and accessibility, and large logo-only streaming cards. Run all tests, TypeScript checks, ESLint, the production build, and responsive browser checks at mobile and desktop widths.
