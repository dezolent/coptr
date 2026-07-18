# Homepage Hero Redesign

## Goal

Replace the existing centered, text-heavy homepage hero with a modern editorial composition that gives Coptr a stronger visual identity while preserving the latest-release call to action.

## Composition

The desktop hero uses an asymmetrical two-column layout. The left column contains the white Coptr wordmark, the helicopter pilot description, the latest-release call to action, and an icon-only social row. The right column features `coptr-secondary-profile.webp` as the dominant portrait, an oversized low-contrast circle-logo watermark, and `coptr-dj-performance-photo.webp` as a smaller overlapping performance card.

On mobile, the content appears first and the portrait composition follows. The performance card is reduced or removed where necessary so the primary portrait, copy, and call to action remain clear.

## Visual System

The hero retains the site's dark blue, cyan, and magenta identity. Cleaner gradients, restrained glass surfaces, soft image glows, and asymmetrical framing create depth without obscuring the supplied photography. Motion is subtle and decorative, with reduced-motion support.

## Content and Interaction

- Use the white Coptr brand wordmark and circle logo from `/public/brand`.
- Use supplied artist photography from `/public/profile`.
- Remove the genre heading.
- Include the helicopter pilot description.
- Preserve the current latest-release destination as the primary call to action.
- Render every social profile as an icon-only link using the existing shared social data and assets.
- Give image and social links accessible names, visible focus states, and meaningful alternative text.

## Verification

Add regression coverage for required content and asset usage, run the full test and production build suites, and visually inspect desktop and mobile breakpoints for overlap, clipping, readability, and horizontal overflow.
