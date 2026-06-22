# Homepage Social Icons Design

## Scope

Replace the homepage's current nine social cards with the seven social profiles supplied by the user: Spotify, Apple Music, SoundCloud, YouTube, Instagram, TikTok, and Facebook. Remove LinkTree and YouTube Music from the homepage social grid.

## Implementation

Keep the existing data-driven social card structure and visual layout. Replace each icon component and color value in the social data with an image path under `/public/social/`. Render the asset with an accessible `img` element while retaining each card's label, hover behavior, external-link target, and safe `rel` attributes.

The mappings are:

- Spotify: `/social/spotify.webp`
- Apple Music: `/social/apple-music.webp`
- SoundCloud: `/social/soundcloud.webp`
- YouTube: `/social/youtube.webp`
- Instagram: `/social/instagram.webp`
- TikTok: `/social/titkok.webp` (the filename currently present in the repository)
- Facebook: `/social/facebook.webp`

The cards will appear in the order above and use the exact URLs supplied by the user.

## Error Handling and Accessibility

Use the social name as the image alternative text so the linked icon has an accessible name alongside its visible text label. Static assets are repository-controlled, so no runtime fallback behavior is needed.

## Verification

Add a source-level regression test that initially fails against the current component and verifies all seven names, URLs, and image paths while confirming LinkTree and YouTube Music are absent. After implementation, run that test, TypeScript checking, linting, and the production build.
